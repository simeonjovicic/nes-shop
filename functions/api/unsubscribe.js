import { getSiteUrl, hashToken, normalizeLocale } from "../../server/newsletter.js";

export async function onRequestGet({ request, env }) {
  const siteUrl = getSiteUrl(env, request);
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const locale = normalizeLocale(url.searchParams.get("lang"));

  if (env.NEWSLETTER_DB && token.length >= 32) {
    const tokenHash = await hashToken(token);
    const now = new Date().toISOString();
    await env.NEWSLETTER_DB
      .prepare(`
        UPDATE newsletter_subscribers
        SET status = 'unsubscribed', unsubscribed_at = ?, updated_at = ?
        WHERE unsubscribe_token_hash = ?
      `)
      .bind(now, now, tokenHash)
      .run();
  }

  const destination = new URL(siteUrl);
  destination.searchParams.set("newsletter", "unsubscribed");
  destination.searchParams.set("lang", locale);
  destination.hash = "join";
  return Response.redirect(destination.toString(), 302);
}
