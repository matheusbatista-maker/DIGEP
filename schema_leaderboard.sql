CREATE TABLE IF NOT EXISTS pontuacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  unidade TEXT NOT NULL DEFAULT '',
  pontuacao INTEGER NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pontuacoes_pontuacao ON pontuacoes (pontuacao DESC);

-- cada linha é uma navegação de página; "sessao_nova"=1 marca a 1ª página
-- vista numa sessão (cookie de 30min) -- dá pra contar tanto visitas
-- (sessões únicas) quanto visualizações de página (todas as linhas).
CREATE TABLE IF NOT EXISTS acessos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pagina TEXT NOT NULL,
  sessao_nova INTEGER NOT NULL DEFAULT 1,
  sessao_id TEXT,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_acessos_criado_em ON acessos (criado_em);

-- eventos de engajamento: qual faixa tocou, qual jogo jogou, qual edição do
-- gibi abriu. "tipo" é um dos: musica_play | game_play | gibi_leitura.
-- "detalhe" identifica o quê (nome da faixa, game1/game2, número da edição).
CREATE TABLE IF NOT EXISTS eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL,
  detalhe TEXT NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_eventos_tipo ON eventos (tipo, detalhe);

-- histórico de migrações aplicadas manualmente:
-- migration_unidade.sql -> ALTER TABLE pontuacoes ADD COLUMN unidade TEXT NOT NULL DEFAULT '';
-- migration_acessos.sql -> cria a tabela acessos (contador de visitas do site)
-- migration_sessao.sql -> ALTER TABLE acessos ADD COLUMN sessao_nova / sessao_id
--   (deduplica visitas da mesma pessoa navegando entre abas)
-- migration_eventos.sql -> cria a tabela eventos (plays de música/game/gibi)
