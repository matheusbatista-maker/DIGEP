CREATE TABLE IF NOT EXISTS pontuacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  unidade TEXT NOT NULL DEFAULT '',
  pontuacao INTEGER NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pontuacoes_pontuacao ON pontuacoes (pontuacao DESC);

CREATE TABLE IF NOT EXISTS acessos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pagina TEXT NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_acessos_criado_em ON acessos (criado_em);

-- histórico de migrações aplicadas manualmente:
-- migration_unidade.sql -> ALTER TABLE pontuacoes ADD COLUMN unidade TEXT NOT NULL DEFAULT '';
-- migration_acessos.sql -> cria a tabela acessos (contador de visitas do site)
