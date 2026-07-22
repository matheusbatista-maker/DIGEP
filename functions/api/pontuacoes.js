// API do placar do "Voo da Arara" — Cloudflare Pages Function + D1.
// GET  /api/pontuacoes?page=1&pageSize=20  -> { items, page, pageSize, total }
// POST /api/pontuacoes  -> { nome, unidade, pontuacao } grava uma nova pontuação

const MAX_NOME = 20;
const MAX_UNIDADE = 40;
// teto folgado (recorde real até agora é bem menor) -- só existe pra barrar
// alguém colando um valor absurdo tipo 999999 direto no console, sem jogar.
const MAX_PONTUACAO = 5000;
const MAX_PAGE_SIZE = 50;
const COOKIE_NOME = 'digep_sid';
const JANELA_MIN_SEGUNDOS = 5; // intervalo mínimo entre envios da mesma sessão

// lista curta de termos ofensivos comuns em pt-BR -- não é exaustiva, é só
// pra barrar a piada mais óbvia num placar que fica público durante o
// lançamento (nome/unidade são texto livre).
const PALAVRAS_BLOQUEADAS = [
  'porra', 'merda', 'caralho', 'puta', 'buceta', 'cacete', 'foda', 'fdp',
  'arrombado', 'arrombada', 'desgraca', 'viado', 'cuzao', 'otario', 'imbecil',
  'retardado', 'babaca', 'corno', 'safado', 'safada', 'vagabundo', 'vagabunda',
  'piranha', 'vadia', 'cu ', ' cu', 'pau no cu', 'filho da puta', 'racista',
  'macaco', 'nazista'
];

function lerCookie(header, nome) {
  if (!header) return null;
  const m = header.match(new RegExp('(?:^|;\\s*)' + nome + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function normalizar(texto) {
  const semAcento = texto.toLowerCase().normalize('NFD');
  let limpo = '';
  for (const ch of semAcento) {
    const code = ch.codePointAt(0);
    if (code < 0x0300 || code > 0x036f) limpo += ch;
  }
  return limpo;
}

function contemTermoBloqueado(texto) {
  const t = normalizar(texto);
  return PALAVRAS_BLOQUEADAS.some((p) => t.includes(p));
}

// GABDIGEP não entra na contagem do ranking (é a equipe que fez o jogo), mas a
// linha continua aparecendo na lista -- "rankReal" é a posição só entre quem
// não é GABDIGEP; sai NULL pras linhas do GABDIGEP (o front mostra X nelas).
const SELECT_PAGE = `
  SELECT nome, unidade, pontuacao,
    CASE WHEN UPPER(TRIM(unidade)) = 'GABDIGEP' THEN NULL ELSE (
      SELECT COUNT(*) + 1 FROM pontuacoes p2
      WHERE UPPER(TRIM(p2.unidade)) != 'GABDIGEP'
        AND (p2.pontuacao > pontuacoes.pontuacao
             OR (p2.pontuacao = pontuacoes.pontuacao AND p2.criado_em < pontuacoes.criado_em))
    ) END AS rankReal
  FROM pontuacoes
  ORDER BY pontuacao DESC, criado_em ASC
  LIMIT ? OFFSET ?
`;

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page'), 10) || 1);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(url.searchParams.get('pageSize'), 10) || 20));
  const offset = (page - 1) * pageSize;

  const [{ results: items }, totalRow] = await Promise.all([
    context.env.DB.prepare(SELECT_PAGE).bind(pageSize, offset).all(),
    context.env.DB.prepare('SELECT COUNT(*) AS total FROM pontuacoes').first()
  ]);

  return Response.json({ items, page, pageSize, total: totalRow.total });
}

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ erro: 'JSON inválido.' }, { status: 400 });
  }

  const nome = String(body.nome ?? '').trim().slice(0, MAX_NOME);
  const unidade = String(body.unidade ?? '').trim().slice(0, MAX_UNIDADE);
  const pontuacao = Math.trunc(Number(body.pontuacao));

  if (!nome) {
    return Response.json({ erro: 'Nome é obrigatório.' }, { status: 400 });
  }
  if (!unidade) {
    return Response.json({ erro: 'Unidade é obrigatória.' }, { status: 400 });
  }
  if (!Number.isFinite(pontuacao) || pontuacao < 0 || pontuacao > MAX_PONTUACAO) {
    return Response.json({ erro: 'Pontuação inválida.' }, { status: 400 });
  }
  if (contemTermoBloqueado(nome) || contemTermoBloqueado(unidade)) {
    return Response.json({ erro: 'Nome ou unidade contém termo não permitido.' }, { status: 400 });
  }

  // sessão é obrigatória pro rate-limit valer -- sem isso, bastava omitir o
  // cookie (fácil de fazer num script) pra pular o limite inteiro.
  const sessaoId = lerCookie(context.request.headers.get('Cookie'), COOKIE_NOME);
  if (!sessaoId) {
    return Response.json({ erro: 'Sessão inválida. Recarregue a página e tente novamente.' }, { status: 400 });
  }
  const recente = await context.env.DB.prepare(
    "SELECT COUNT(*) AS total FROM pontuacoes WHERE sessao_id = ? AND criado_em > datetime('now', ?)"
  ).bind(sessaoId, `-${JANELA_MIN_SEGUNDOS} seconds`).first();
  if (recente.total > 0) {
    return Response.json({ erro: 'Aguarde alguns segundos antes de enviar outra pontuação.' }, { status: 429 });
  }

  // mesma pessoa (nome + unidade, sem diferenciar maiúsculas/espaços) só
  // aparece uma vez no placar -- guarda sempre a maior pontuação dela em vez
  // de acumular uma linha por partida jogada.
  const existente = await context.env.DB.prepare(
    'SELECT id, pontuacao FROM pontuacoes WHERE UPPER(TRIM(nome)) = UPPER(TRIM(?)) AND UPPER(TRIM(unidade)) = UPPER(TRIM(?))'
  ).bind(nome, unidade).first();

  if (existente) {
    if (pontuacao > existente.pontuacao) {
      await context.env.DB.prepare(
        "UPDATE pontuacoes SET pontuacao = ?, sessao_id = ?, criado_em = datetime('now') WHERE id = ?"
      ).bind(pontuacao, sessaoId, existente.id).run();
    }
  } else {
    await context.env.DB.prepare(
      'INSERT INTO pontuacoes (nome, unidade, pontuacao, sessao_id) VALUES (?, ?, ?, ?)'
    ).bind(nome, unidade, pontuacao, sessaoId).run();
  }

  return Response.json({ ok: true }, { status: 201 });
}
