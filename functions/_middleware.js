// Roda em toda requisição do Pages antes de servir o arquivo estático.
// Registra uma visita por carregamento de página real (não conta imagens,
// PDF, JS/CSS, chamadas de API etc.) -- identifica "página real" pelo
// cabeçalho Accept que o navegador manda ao navegar (contém text/html).

const PAGINAS_IGNORADAS = ['/login', '/admin', '/login.html', '/admin.html'];

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const accept = request.headers.get('Accept') || '';

  const ehNavegacaoDePagina =
    request.method === 'GET' &&
    accept.includes('text/html') &&
    !url.pathname.startsWith('/api/');

  if (ehNavegacaoDePagina) {
    let pagina = url.pathname;
    if (pagina === '' ) pagina = '/';
    if (!PAGINAS_IGNORADAS.includes(pagina)) {
      context.waitUntil(
        env.DB.prepare('INSERT INTO acessos (pagina) VALUES (?)').bind(pagina).run().catch(() => {})
      );
    }
  }

  return context.next();
}
