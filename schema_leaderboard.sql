CREATE TABLE IF NOT EXISTS pontuacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  unidade TEXT NOT NULL DEFAULT '',
  pontuacao INTEGER NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pontuacoes_pontuacao ON pontuacoes (pontuacao DESC);

-- histórico de migrações aplicadas manualmente:
-- migration_unidade.sql -> ALTER TABLE pontuacoes ADD COLUMN unidade TEXT NOT NULL DEFAULT '';
