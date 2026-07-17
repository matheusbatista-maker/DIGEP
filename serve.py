"""
Servidor local para testar o site — igual ao "python -m http.server", mas
com suporte a "Range requests" (necessário pro áudio da página de Música
permitir avançar/voltar a faixa; o http.server padrão do Python não
implementa isso e o seek fica quebrado).

Uso: python serve.py [porta]  (porta padrão: 8730)
"""
import http.server
import os
import re
import sys


class RangeRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path) or not os.path.exists(path):
            return super().send_head()

        range_header = self.headers.get('Range')
        file_size = os.path.getsize(path)
        if not range_header:
            self.send_response(200)
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Content-Length', str(file_size))
            self.send_header('Content-Type', self.guess_type(path))
            self.end_headers()
            return open(path, 'rb')

        match = re.match(r'bytes=(\d*)-(\d*)', range_header)
        start_s, end_s = match.groups()
        start = int(start_s) if start_s else 0
        end = int(end_s) if end_s else file_size - 1
        end = min(end, file_size - 1)
        length = end - start + 1

        f = open(path, 'rb')
        f.seek(start)

        self.send_response(206)
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(length))
        self.send_header('Content-Type', self.guess_type(path))
        self.end_headers()

        self._range_length = length
        return f

    def copyfile(self, source, outputfile):
        if hasattr(self, '_range_length'):
            remaining = self._range_length
            while remaining > 0:
                chunk = source.read(min(64 * 1024, remaining))
                if not chunk:
                    break
                outputfile.write(chunk)
                remaining -= len(chunk)
        else:
            super().copyfile(source, outputfile)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8730
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    http.server.test(HandlerClass=RangeRequestHandler, port=port)
