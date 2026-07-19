// API de estatísticas de acesso do site — Cloudflare Pages Function + D1.
// GET /api/acessos -> { total, hoje, ultimos7dias, porDia, recentes }
// Só é chamada pelo painel admin (não tem link público pra ela).

// criado_em é gravado em UTC (datetime('now') do SQLite); Tocantins é UTC-3
// o ano todo (sem horário de verão), então "-3 hours" converte pro dia local
// certo -- sem isso, acessos à noite apareciam contados no dia seguinte.
const FUSO = '-3 hours';

export async function onRequestGet(context) {
  const db = context.env.DB;

  const [totalRow, hojeRow, semanaRow, porDia, recentes] = await Promise.all([
    db.prepare('SELECT COUNT(*) AS n FROM acessos').first(),
    db.prepare(`SELECT COUNT(*) AS n FROM acessos WHERE date(criado_em, '${FUSO}') = date('now', '${FUSO}')`).first(),
    db.prepare("SELECT COUNT(*) AS n FROM acessos WHERE criado_em >= datetime('now', '-7 days')").first(),
    db.prepare(
      `SELECT date(criado_em, '${FUSO}') AS dia, COUNT(*) AS total FROM acessos GROUP BY dia ORDER BY dia DESC LIMIT 14`
    ).all(),
    db.prepare(
      'SELECT pagina, criado_em FROM acessos ORDER BY criado_em DESC LIMIT 20'
    ).all()
  ]);

  return Response.json({
    total: totalRow.n,
    hoje: hojeRow.n,
    ultimos7dias: semanaRow.n,
    porDia: porDia.results,
    recentes: recentes.results
  });
}
