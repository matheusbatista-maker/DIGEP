// API do placar do "Voo da Arara" — Cloudflare Pages Function + D1.
// GET  /api/pontuacoes?page=1&pageSize=20  -> { items, page, pageSize, total }
// POST /api/pontuacoes  -> { nome, unidade, pontuacao } grava uma nova pontuação

const MAX_NOME = 20;
const MAX_UNIDADE = 40;
const MAX_PONTUACAO = 999999;
const MAX_PAGE_SIZE = 50;
const SELECT_PAGE = 'SELECT nome, unidade, pontuacao FROM pontuacoes ORDER BY pontuacao DESC, criado_em ASC LIMIT ? OFFSET ?';

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

  await context.env.DB.prepare(
    'INSERT INTO pontuacoes (nome, unidade, pontuacao) VALUES (?, ?, ?)'
  ).bind(nome, unidade, pontuacao).run();

  return Response.json({ ok: true }, { status: 201 });
}
