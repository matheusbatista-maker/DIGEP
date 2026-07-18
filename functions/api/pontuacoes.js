// API do placar do "Voo da Arara" — Cloudflare Pages Function + D1.
// GET  /api/pontuacoes  -> top 10 pontuações
// POST /api/pontuacoes  -> { nome, unidade, pontuacao } grava uma nova pontuação

const MAX_NOME = 20;
const MAX_UNIDADE = 40;
const MAX_PONTUACAO = 999999;
const SELECT_TOP10 = 'SELECT nome, unidade, pontuacao FROM pontuacoes ORDER BY pontuacao DESC, criado_em ASC LIMIT 10';

export async function onRequestGet(context) {
  const { results } = await context.env.DB.prepare(SELECT_TOP10).all();
  return Response.json(results);
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

  const { results } = await context.env.DB.prepare(SELECT_TOP10).all();
  return Response.json(results, { status: 201 });
}
