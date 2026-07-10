-- Enquiries submitted through the native contact form (/api/contact).
-- Applied with wrangler d1 migrations (see package.json db:migrate scripts).

CREATE TABLE IF NOT EXISTS enquiries (
  id               TEXT PRIMARY KEY,
  created_at       TEXT NOT NULL,
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  company          TEXT,
  selected_service TEXT,
  message          TEXT NOT NULL,
  user_agent       TEXT,
  referrer         TEXT,
  ip               TEXT,
  status           TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status);
