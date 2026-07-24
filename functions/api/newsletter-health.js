import { jsonResponse } from "../../server/newsletter.js";

export function onRequestGet({ env }) {
  const services = {
    database: Boolean(env.NEWSLETTER_DB),
    emailProvider: Boolean(env.RESEND_API_KEY),
    sender: Boolean(env.NEWSLETTER_FROM),
    replyTo: Boolean(env.NEWSLETTER_REPLY_TO),
    siteUrl: Boolean(env.PUBLIC_SITE_URL),
  };
  const ok = Object.values(services).every(Boolean);

  return jsonResponse({ ok, services }, ok ? 200 : 503);
}

export function onRequest() {
  return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
}
