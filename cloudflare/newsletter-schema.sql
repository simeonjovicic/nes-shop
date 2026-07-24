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

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE,
  company TEXT,
  phone TEXT,
  role TEXT,
  topic TEXT,
  brand TEXT,
  message TEXT,
  newsletter_requested INTEGER NOT NULL DEFAULT 0,
  locale TEXT NOT NULL DEFAULT 'de',
  source TEXT NOT NULL DEFAULT 'nes-inquiry',
  consent_at TEXT NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'pending',
  notified_at TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS inquiry_created_at_idx
  ON inquiries (created_at);
