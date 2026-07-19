// API de eventos de engajamento — Cloudflare Pages Function + D1.
// POST /api/evento -> { tipo, detalhe } grava um evento (chamado pelo site público)
// GET  /api/evento  -> agregados por tipo, pro painel admin
//
// tipo: 'musica_play' | 'game_play' | 'gibi_leitura'
// detalhe: nome da faixa | 'game1'/'game2' | número da edição do gibi

const TIPOS_VALIDOS = ['musica_play', 'game_play', 'gibi_leitura'];
const MAX_DETALHE = 60;

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ erro: 'JSON inválido.' }, { status: 400 });
  }

  const tipo = String(body.tipo ?? '');
  const detalhe = String(body.detalhe ?? '').trim().slice(0, MAX_DETALHE);

  if (!TIPOS_VALIDOS.includes(tipo) || !detalhe) {
    return Response.json({ erro: 'tipo/detalhe inválidos.' }, { status: 400 });
  }

  await context.env.DB.prepare(
    'INSERT INTO eventos (tipo, detalhe) VALUES (?, ?)'
  ).bind(tipo, detalhe).run();

  return Response.json({ ok: true }, { status: 201 });
}

export async function onRequestGet(context) {
  const db = context.env.DB;

  const [musica, jogos, gibi] = await Promise.all([
    db.prepare(
      "SELECT detalhe, COUNT(*) AS total FROM eventos WHERE tipo = 'musica_play' GROUP BY detalhe ORDER BY total DESC"
    ).all(),
    db.prepare(
      "SELECT detalhe, COUNT(*) AS total FROM eventos WHERE tipo = 'game_play' GROUP BY detalhe ORDER BY total DESC"
    ).all(),
    db.prepare(
      "SELECT detalhe, COUNT(*) AS total FROM eventos WHERE tipo = 'gibi_leitura' GROUP BY detalhe ORDER BY detalhe ASC"
    ).all()
  ]);

  return Response.json({
    musica: musica.results,
    jogos: jogos.results,
    gibi: gibi.results
  });
}
