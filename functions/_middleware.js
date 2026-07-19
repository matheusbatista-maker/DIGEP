// Roda em toda requisição do Pages antes de servir o arquivo estático.
// Registra uma linha por navegação de página real (não conta imagens, PDF,
// JS/CSS, chamadas de API etc.) -- identifica "página real" pelo cabeçalho
// Accept que o navegador manda ao navegar (contém text/html).
//
// Deduplicação de visitas: um cookie de sessão (30min, renovado a cada
// navegação) marca se essa é a 1ª página vista nessa sessão. Sem isso,
// alguém clicando entre Início/Gibi/Game/Música contaria como vários
// "acessos" em vez de uma única visita.

const PAGINAS_IGNORADAS = ['/login', '/admin'];
const COOKIE_NOME = 'digep_sid';
const SESSAO_SEGUNDOS = 1800; // 30 minutos

function lerCookie(header, nome) {
  if (!header) return null;
  const m = header.match(new RegExp('(?:^|;\\s*)' + nome + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

// normaliza "/gibi.html" e "/gibi" (URL limpa, pra onde o Pages redireciona
// .html) pro mesmo valor -- sem isso cada navegação virava 2 linhas: uma
// pro .html (que dá 308) e outra pro destino final.
function normalizarPagina(pathname) {
  let p = pathname || '/';
  if (p === '/index.html') p = '/';
  else if (p.endsWith('.html')) p = p.slice(0, -5);
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const accept = request.headers.get('Accept') || '';

  const ehNavegacaoDePagina =
    request.method === 'GET' &&
    accept.includes('text/html') &&
    !url.pathname.startsWith('/api/');

  const response = await context.next();

  // só conta a resposta final (200) -- um 308 pra URL limpa não é uma
  // página de verdade sendo servida, é só um passo intermediário.
  if (!ehNavegacaoDePagina || !response.ok) return response;

  const pagina = normalizarPagina(url.pathname);
  if (PAGINAS_IGNORADAS.includes(pagina)) return response;

  const sidAtual = lerCookie(request.headers.get('Cookie'), COOKIE_NOME);
  const sessaoNova = sidAtual ? 0 : 1;
  const sid = sidAtual || crypto.randomUUID();

  context.waitUntil(
    env.DB.prepare('INSERT INTO acessos (pagina, sessao_nova, sessao_id) VALUES (?, ?, ?)')
      .bind(pagina, sessaoNova, sid).run().catch(() => {})
  );

  const novaResposta = new Response(response.body, response);
  novaResposta.headers.append('Set-Cookie', `${COOKIE_NOME}=${sid}; Path=/; Max-Age=${SESSAO_SEGUNDOS}; SameSite=Lax`);
  return novaResposta;
}
