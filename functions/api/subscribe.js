import {
  createToken,
  getConfirmationEmail,
  getSiteUrl,
  hashToken,
  jsonResponse,
  normalizeLocale,
  sendEmail,
} from "../../server/newsletter.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;

function isConfigured(env) {
  return env.NEWSLETTER_DB && env.RESEND_API_KEY && env.NEWSLETTER_FROM;
}

export async function onRequestPost({ request, env }) {
  if (!isConfigured(env)) {
    return jsonResponse({ ok: false, error: "newsletter_not_configured" }, 503);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  if (payload.company) return jsonResponse({ ok: true, status: "confirmation_sent" }, 202);

  const email = String(payload.email || "").trim().toLowerCase();
  const locale = normalizeLocale(payload.locale);
  const source = String(payload.source || "nes-landing").slice(0, 80);

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return jsonResponse({ ok: false, error: "invalid_email" }, 422);
  }

  const existing = await env.NEWSLETTER_DB
    .prepare("SELECT status, updated_at FROM newsletter_subscribers WHERE email = ? COLLATE NOCASE")
    .bind(email)
    .first();

  if (existing?.status === "confirmed") {
    return jsonResponse({ ok: true, status: "confirmation_sent" }, 202);
  }

  if (
    existing?.status === "pending"
    && Date.now() - Date.parse(existing.updated_at) < RESEND_COOLDOWN_MS
  ) {
    return jsonResponse({ ok: true, status: "confirmation_sent" }, 202);
  }

  const token = createToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_LIFETIME_MS).toISOString();
  const now = new Date().toISOString();

  await env.NEWSLETTER_DB
    .prepare(`
      INSERT INTO newsletter_subscribers (
        email, locale, source, status, confirmation_token_hash,
        confirmation_expires_at, created_at, updated_at
      ) VALUES (?, ?, ?, 'pending', ?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        locale = excluded.locale,
        source = excluded.source,
        status = 'pending',
        confirmation_token_hash = excluded.confirmation_token_hash,
        confirmation_expires_at = excluded.confirmation_expires_at,
        unsubscribe_token_hash = NULL,
        confirmed_at = NULL,
        unsubscribed_at = NULL,
        updated_at = excluded.updated_at
    `)
    .bind(email, locale, source, tokenHash, expiresAt, now, now)
    .run();

  const siteUrl = getSiteUrl(env, request);
  const confirmationUrl = `${siteUrl}/api/confirm?token=${encodeURIComponent(token)}&lang=${locale}`;
  const emailContent = getConfirmationEmail({
    locale,
    confirmationUrl,
  });

  try {
    await sendEmail(env, {
      to: email,
      ...emailContent,
      idempotencyKey: `nes-confirm-${tokenHash.slice(0, 32)}`,
    });
  } catch (error) {
    console.error("Unable to send confirmation email", error);
    return jsonResponse({ ok: false, error: "email_delivery_failed" }, 502);
  }

  return jsonResponse({ ok: true, status: "confirmation_sent" }, 202);
}

export function onRequestGet({ env }) {
  const services = {
    database: Boolean(env.NEWSLETTER_DB),
    emailProvider: Boolean(env.RESEND_API_KEY),
    sender: Boolean(env.NEWSLETTER_FROM),
    replyTo: Boolean(env.NEWSLETTER_REPLY_TO),
    inquiryRecipient: Boolean(
      env.INQUIRY_NOTIFY_TO || env.NEWSLETTER_NOTIFY_TO || env.NEWSLETTER_REPLY_TO,
    ),
    siteUrl: Boolean(env.PUBLIC_SITE_URL),
  };
  const ok = Object.values(services).every(Boolean);

  return jsonResponse({ ok, services }, ok ? 200 : 503);
}

export function onRequest() {
  return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
}
