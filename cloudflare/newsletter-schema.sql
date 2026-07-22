CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  locale TEXT NOT NULL DEFAULT 'de' CHECK (locale IN ('de', 'en')),
  source TEXT NOT NULL DEFAULT 'nes-landing',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token_hash TEXT,
  confirmation_expires_at TEXT,
  unsubscribe_token_hash TEXT,
  confirmed_at TEXT,
  unsubscribed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS newsletter_confirmation_token_idx
  ON newsletter_subscribers (confirmation_token_hash);

CREATE INDEX IF NOT EXISTS newsletter_unsubscribe_token_idx
  ON newsletter_subscribers (unsubscribe_token_hash);

CREATE INDEX IF NOT EXISTS newsletter_status_idx
  ON newsletter_subscribers (status);
