import {
  createToken,
  getSignupNotificationEmail,
  getSiteUrl,
  getWelcomeEmail,
  hashToken,
  normalizeLocale,
  sendEmail,
} from "../../server/newsletter.js";

function redirectToSite(siteUrl, state, locale) {
  const url = new URL(siteUrl);
  url.searchParams.set("newsletter", state);
  url.searchParams.set("lang", locale);
  url.hash = "join";
  return Response.redirect(url.toString(), 302);
}

export async function onRequestGet({ request, env }) {
  const siteUrl = getSiteUrl(env, request);
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const requestedLocale = normalizeLocale(url.searchParams.get("lang"));

  if (!env.NEWSLETTER_DB || !env.RESEND_API_KEY || !env.NEWSLETTER_FROM || token.length < 32) {
    return redirectToSite(siteUrl, "invalid", requestedLocale);
  }

  const tokenHash = await hashToken(token);
  const subscriber = await env.NEWSLETTER_DB
    .prepare(`
      SELECT id, email, locale, source, confirmation_expires_at
      FROM newsletter_subscribers
      WHERE confirmation_token_hash = ? AND status = 'pending'
    `)
    .bind(tokenHash)
    .first();

  if (!subscriber) return redirectToSite(siteUrl, "invalid", requestedLocale);

  const locale = normalizeLocale(subscriber.locale);
  const confirmationExpiresAt = Date.parse(subscriber.confirmation_expires_at);
  if (!Number.isFinite(confirmationExpiresAt) || confirmationExpiresAt < Date.now()) {
    return redirectToSite(siteUrl, "expired", locale);
  }

  const unsubscribeToken = createToken();
  const unsubscribeTokenHash = await hashToken(unsubscribeToken);
  const confirmedAt = new Date().toISOString();

  const confirmationResult = await env.NEWSLETTER_DB
    .prepare(`
      UPDATE newsletter_subscribers
      SET status = 'confirmed', confirmed_at = ?, updated_at = ?,
          confirmation_token_hash = NULL, confirmation_expires_at = NULL,
          unsubscribe_token_hash = ?
      WHERE id = ? AND status = 'pending' AND confirmation_token_hash = ?
    `)
    .bind(confirmedAt, confirmedAt, unsubscribeTokenHash, subscriber.id, tokenHash)
    .run();

  if (confirmationResult.meta?.changes !== 1) {
    return redirectToSite(siteUrl, "invalid", locale);
  }

  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}&lang=${locale}`;
  const emailContent = getWelcomeEmail({
    locale,
    siteUrl,
    unsubscribeUrl,
  });

  try {
    await sendEmail(env, {
      to: subscriber.email,
      ...emailContent,
      idempotencyKey: `nes-welcome-${subscriber.id}-${unsubscribeTokenHash.slice(0, 32)}`,
    });
  } catch (error) {
    console.error("Unable to send welcome email", error);
  }

  const notificationRecipient = env.NEWSLETTER_NOTIFY_TO || env.NEWSLETTER_REPLY_TO;
  if (notificationRecipient) {
    const notificationContent = getSignupNotificationEmail({
      email: subscriber.email,
      locale,
      source: subscriber.source,
      confirmedAt,
    });

    try {
      await sendEmail(env, {
        to: notificationRecipient,
        ...notificationContent,
        idempotencyKey: `nes-signup-notify-${subscriber.id}-${unsubscribeTokenHash.slice(0, 24)}`,
      });
    } catch (error) {
      console.error("Unable to send signup notification", error);
    }
  }

  return redirectToSite(siteUrl, "confirmed", locale);
}
