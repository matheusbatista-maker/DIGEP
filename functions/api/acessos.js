// API de estatísticas de acesso do site — Cloudflare Pages Function + D1.
// GET /api/acessos -> ver forma da resposta no final do arquivo.
// Só é chamada pelo painel admin (não tem link público pra ela).
//
// "Visita" = sessão única (cookie de 30min, ver functions/_middleware.js).
// "Visualização de página" = toda navegação, mesmo repetida na mesma sessão.

// criado_em é gravado em UTC (datetime('now') do SQLite); Tocantins é UTC-3
// o ano todo (sem horário de verão), então "-3 hours" converte pro dia local
// certo -- sem isso, acessos à noite apareciam contados no dia seguinte.
const FUSO = '-3 hours';

export async function onRequestGet(context) {
  const db = context.env.DB;

  const [
    visualizacoesTotal, visitasTotal, visitasHoje, visitasSemana,
    porDia, paginasMaisVisitadas, recentes
  ] = await Promise.all([
    db.prepare('SELECT COUNT(*) AS n FROM acessos').first(),
    db.prepare('SELECT COUNT(*) AS n FROM acessos WHERE sessao_nova = 1').first(),
    db.prepare(`SELECT COUNT(*) AS n FROM acessos WHERE sessao_nova = 1 AND date(criado_em, '${FUSO}') = date('now', '${FUSO}')`).first(),
    db.prepare("SELECT COUNT(*) AS n FROM acessos WHERE sessao_nova = 1 AND criado_em >= datetime('now', '-7 days')").first(),
    db.prepare(
      `SELECT date(criado_em, '${FUSO}') AS dia, COUNT(*) AS total FROM acessos WHERE sessao_nova = 1 GROUP BY dia ORDER BY dia DESC LIMIT 14`
    ).all(),
    db.prepare(
      'SELECT pagina, COUNT(*) AS total FROM acessos GROUP BY pagina ORDER BY total DESC LIMIT 8'
    ).all(),
    db.prepare(
      'SELECT pagina, criado_em FROM acessos WHERE sessao_nova = 1 ORDER BY criado_em DESC LIMIT 20'
    ).all()
  ]);

  const visitas = visitasTotal.n;
  const paginas = visualizacoesTotal.n;
  const mediaPaginasPorVisita = visitas > 0 ? Math.round((paginas / visitas) * 10) / 10 : 0;

  return Response.json({
    visitas: { total: visitas, hoje: visitasHoje.n, ultimos7dias: visitasSemana.n },
    paginasVistas: { total: paginas },
    mediaPaginasPorVisita,
    porDia: porDia.results,
    paginasMaisVisitadas: paginasMaisVisitadas.results,
    recentes: recentes.results
  });
}
