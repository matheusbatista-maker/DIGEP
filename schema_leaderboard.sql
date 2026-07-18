CREATE TABLE IF NOT EXISTS pontuacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  pontuacao INTEGER NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pontuacoes_pontuacao ON pontuacoes (pontuacao DESC);
