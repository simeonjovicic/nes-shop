import {
  getInquiryNotificationEmail,
  jsonResponse,
  normalizeLocale,
  sendEmail,
} from "../../server/newsletter.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 20_000;

function singleLine(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function messageText(value, maxLength) {
  return String(value || "").replace(/\r\n?/g, "\n").trim().slice(0, maxLength);
}

async function ensureInquiryTable(database) {
  await database
    .prepare(`
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
      )
    `)
    .run();
  await database
    .prepare(`
      CREATE INDEX IF NOT EXISTS inquiry_created_at_idx
      ON inquiries (created_at)
    `)
    .run();
}

async function storeInquiry(database, inquiry, requestId, receivedAt, notificationStatus) {
  await ensureInquiryTable(database);
  await database
    .prepare(`
      INSERT INTO inquiries (
        request_id, name, email, company, phone, role, topic, brand, message,
        newsletter_requested, locale, source, consent_at, notification_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      requestId,
      inquiry.name,
      inquiry.email,
      inquiry.company,
      inquiry.phone,
      inquiry.role,
      inquiry.topic,
      inquiry.brand,
      inquiry.message,
      inquiry.newsletter ? 1 : 0,
      inquiry.locale,
      inquiry.source,
      receivedAt,
      notificationStatus,
      receivedAt,
    )
    .run();
}

async function updateNotificationStatus(database, requestId, status, notifiedAt = null) {
  await database
    .prepare(`
      UPDATE inquiries
      SET notification_status = ?, notified_at = ?
      WHERE request_id = ?
    `)
    .bind(status, notifiedAt, requestId)
    .run();
}

export async function onRequestPost({ request, env }) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413);
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

  if (payload.website || payload.company_website) {
    return jsonResponse({ ok: true, status: "received" }, 202);
  }

  const inquiry = {
    name: singleLine(payload.name, 120),
    email: singleLine(payload.email, 254).toLowerCase(),
    company: singleLine(payload.company, 160),
    phone: singleLine(payload.phone, 60),
    role: singleLine(payload.role, 100),
    topic: singleLine(payload.topic, 140),
    brand: singleLine(payload.brand, 100),
    message: messageText(payload.message, 4_000),
    newsletter: payload.newsletter === true,
    locale: normalizeLocale(payload.locale),
    source: singleLine(payload.source || "nes-inquiry", 80),
  };

  if (!inquiry.name || !EMAIL_PATTERN.test(inquiry.email) || payload.consent !== true) {
    return jsonResponse({ ok: false, error: "invalid_inquiry" }, 422);
  }

  const notificationRecipient =
    env.INQUIRY_NOTIFY_TO || env.NEWSLETTER_NOTIFY_TO || env.NEWSLETTER_REPLY_TO;
  const canStore = Boolean(env.NEWSLETTER_DB);
  const canNotify = Boolean(
    env.RESEND_API_KEY && env.NEWSLETTER_FROM && notificationRecipient,
  );

  if (!canStore && !canNotify) {
    return jsonResponse({ ok: false, error: "inquiry_not_configured" }, 503);
  }

  const requestId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  let stored = false;
  let notified = false;

  if (canStore) {
    try {
      await storeInquiry(
        env.NEWSLETTER_DB,
        inquiry,
        requestId,
        receivedAt,
        canNotify ? "pending" : "unavailable",
      );
      stored = true;
    } catch (error) {
      console.error("Unable to store inquiry", error);
    }
  }

  if (canNotify) {
    const emailContent = getInquiryNotificationEmail({ inquiry, receivedAt });
    try {
      await sendEmail(env, {
        to: notificationRecipient,
        replyTo: inquiry.email,
        ...emailContent,
        idempotencyKey: `nes-inquiry-${requestId}`,
      });
      notified = true;
      if (stored) {
        await updateNotificationStatus(env.NEWSLETTER_DB, requestId, "sent", receivedAt);
      }
    } catch (error) {
      console.error("Unable to send inquiry notification", error);
      if (stored) {
        try {
          await updateNotificationStatus(env.NEWSLETTER_DB, requestId, "failed");
        } catch (statusError) {
          console.error("Unable to update inquiry notification status", statusError);
        }
      }
    }
  }

  if (!stored && !notified) {
    return jsonResponse({ ok: false, error: "inquiry_delivery_failed" }, 502);
  }

  return jsonResponse(
    {
      ok: true,
      status: "received",
      stored,
      notified,
    },
    202,
  );
}

export function onRequest() {
  return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
}
