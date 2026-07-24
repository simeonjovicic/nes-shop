// Shared by the Cloudflare Pages Functions; kept outside /functions so it does not become a route.
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const EMAIL_COPY = {
  de: {
    confirmation: {
      subject: "Bitte bestätige deine Anmeldung bei NES",
      preheader: "Ein Klick, dann bist du auf der NES Liste.",
      eyebrow: "MESSE OFFENBACH · NES",
      title: "Nur noch ein Schritt.",
      body:
        "Bestätige kurz deine E-Mail-Adresse. Danach erhältst du als Erstes den Messetermin, neue Drops und ausgewählte Einblicke von NES.",
      action: "E-Mail bestätigen",
      note: "Falls du dich nicht angemeldet hast, kannst du diese E-Mail einfach ignorieren.",
      fallbackPrefix: "Falls der Button nicht funktioniert,",
      fallbackAction: "hier klicken.",
    },
    welcome: {
      subject: "Du bist auf der NES Liste",
      preheader: "Willkommen bei NES — wir melden uns, wenn es etwas zu erzählen gibt.",
      eyebrow: "WILLKOMMEN BEI NES",
      title: "Du bist dabei.",
      body:
        "Von jetzt an erfährst du zuerst vom nächsten Messetermin, ausgewählten Neuheiten und Early Access. Ruhig, relevant und nur dann, wenn es etwas zu erzählen gibt.",
      action: "NES entdecken",
      note: "Offenbach · 50.100° N | 8.705° E",
      unsubscribe: "Abmelden",
    },
  },
  en: {
    confirmation: {
      subject: "Confirm your NES subscription",
      preheader: "One click and you are on the NES list.",
      eyebrow: "OFFENBACH TRADE FAIR · NES",
      title: "One last step.",
      body:
        "Please confirm your email address. You will then be the first to receive the fair date, new drops and considered updates from NES.",
      action: "Confirm email",
      note: "If you did not request this, you can simply ignore this email.",
      fallbackPrefix: "If the button does not work,",
      fallbackAction: "use this link.",
    },
    welcome: {
      subject: "You are on the NES list",
      preheader: "Welcome to NES — we will write when there is something worth knowing.",
      eyebrow: "WELCOME TO NES",
      title: "You are on the list.",
      body:
        "From now on, you will hear first about the next fair date, selected drops and early access. Calm, relevant and only when there is something worth knowing.",
      action: "Discover NES",
      note: "Offenbach · 50.100° N | 8.705° E",
      unsubscribe: "Unsubscribe",
    },
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell({
  locale,
  preheader,
  eyebrow,
  title,
  body,
  action,
  actionUrl,
  note,
  fallbackPrefix,
  fallbackAction,
  unsubscribeLabel,
  unsubscribeUrl,
}) {
  const safeActionUrl = escapeHtml(actionUrl);
  const secondaryLink = fallbackAction
    ? `<p style="margin:28px 0 0;color:#777167;font-family:Arial,sans-serif;font-size:11px;line-height:1.65;">${escapeHtml(fallbackPrefix)} <a href="${safeActionUrl}" style="color:#17342a;text-decoration:underline;">${escapeHtml(fallbackAction)}</a></p>`
    : "";
  const unsubscribe = unsubscribeUrl
    ? `<a href="${escapeHtml(unsubscribeUrl)}" style="color:#8b857a;text-decoration:underline;">${escapeHtml(unsubscribeLabel)}</a>`
    : "";

  return `<!doctype html>
<html lang="${escapeHtml(locale)}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#e9e4d8;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#e9e4d8;">
      <tr>
        <td align="center" style="padding:34px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#f5f2e9;border:1px solid #d9d2c4;">
            <tr>
              <td style="height:4px;background:#17342a;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:52px 54px 46px;">
                <p style="margin:0;color:#a6813f;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;line-height:1.5;">${escapeHtml(eyebrow)}</p>
                <p style="margin:30px 0 0;color:#17342a;font-family:Georgia,'Times New Roman',serif;font-size:44px;font-weight:400;letter-spacing:8px;line-height:1;">N.E.S</p>
                <div style="width:54px;height:1px;margin:38px 0 34px;background:#a6813f;font-size:0;line-height:0;">&nbsp;</div>
                <h1 style="margin:0;color:#17342a;font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:400;letter-spacing:-1px;line-height:1.08;">${escapeHtml(title)}</h1>
                <p style="margin:24px 0 0;color:#514d46;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;">${escapeHtml(body)}</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:34px;">
                  <tr>
                    <td bgcolor="#17342a">
                      <a href="${safeActionUrl}" style="display:inline-block;padding:17px 27px;color:#f5f2e9;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;line-height:1;text-decoration:none;text-transform:uppercase;">${escapeHtml(action)}</a>
                    </td>
                  </tr>
                </table>
                ${secondaryLink}
                <p style="margin:36px 0 0;padding-top:25px;border-top:1px solid #d9d2c4;color:#777167;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;">${escapeHtml(note)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 54px;background:#eee9dd;color:#8b857a;font-family:Arial,sans-serif;font-size:10px;letter-spacing:1px;line-height:1.6;">
                N.E.S · OFFENBACH · 50.100° N | 8.705° E${unsubscribe ? ` &nbsp;·&nbsp; ${unsubscribe}` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function normalizeLocale(value) {
  return value === "de" ? "de" : "en";
}

export function createToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export async function hashToken(token) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function getSiteUrl(env, request) {
  return (env.PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, "");
}

export function getConfirmationEmail({ locale, confirmationUrl }) {
  const normalizedLocale = normalizeLocale(locale);
  const copy = EMAIL_COPY[normalizedLocale].confirmation;
  return {
    subject: copy.subject,
    html: emailShell({
      ...copy,
      locale: normalizedLocale,
      actionUrl: confirmationUrl,
    }),
    text: `${copy.title}\n\n${copy.body}\n\n${copy.action}: ${confirmationUrl}\n\n${copy.note}`,
  };
}

export function getWelcomeEmail({ locale, siteUrl, unsubscribeUrl }) {
  const normalizedLocale = normalizeLocale(locale);
  const copy = EMAIL_COPY[normalizedLocale].welcome;
  return {
    subject: copy.subject,
    html: emailShell({
      ...copy,
      locale: normalizedLocale,
      actionUrl: siteUrl,
      unsubscribeLabel: copy.unsubscribe,
      unsubscribeUrl,
    }),
    text: `${copy.title}\n\n${copy.body}\n\n${copy.action}: ${siteUrl}\n\n${copy.note}\n${copy.unsubscribe}: ${unsubscribeUrl}`,
  };
}

export function getSignupNotificationEmail({
  email,
  locale,
  source,
  confirmedAt,
}) {
  const confirmedDate = new Date(confirmedAt);
  const displayedConfirmedAt = Number.isNaN(confirmedDate.valueOf())
    ? confirmedAt
    : new Intl.DateTimeFormat("de-AT", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Vienna",
      }).format(confirmedDate);
  const safeEmail = escapeHtml(email);
  const fields = [
    ["E-Mail", `<a href="${escapeHtml(`mailto:${email}`)}" style="color:#17342a;text-decoration:underline;">${safeEmail}</a>`],
    ["Sprache", escapeHtml(normalizeLocale(locale).toUpperCase())],
    ["Quelle", escapeHtml(source || "nes-landing")],
    ["Bestätigt", escapeHtml(displayedConfirmedAt)],
  ];
  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 18px 12px 0;border-bottom:1px solid #d9d2c4;color:#8b857a;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;">${label}</td>
          <td style="padding:12px 0;border-bottom:1px solid #d9d2c4;color:#514d46;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;vertical-align:top;">${value}</td>
        </tr>`,
    )
    .join("");

  return {
    subject: "Neue bestätigte Newsletter-Anmeldung",
    html: `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Neue bestätigte Newsletter-Anmeldung</title>
  </head>
  <body style="margin:0;padding:0;background:#e9e4d8;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#e9e4d8;">
      <tr>
        <td align="center" style="padding:34px 12px;">
          <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px;background:#f5f2e9;border:1px solid #d9d2c4;">
            <tr><td style="height:4px;background:#17342a;font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr>
              <td style="padding:44px 46px;">
                <p style="margin:0;color:#a6813f;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;">N.E.S · NEWSLETTER</p>
                <h1 style="margin:28px 0 0;color:#17342a;font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:400;line-height:1.12;">Neue Anmeldung.</h1>
                <p style="margin:18px 0 24px;color:#514d46;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;">Diese Adresse hat die Newsletter-Anmeldung per Double-Opt-in bestätigt.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows}</table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text:
      `Neue bestätigte Newsletter-Anmeldung\n\n`
      + `E-Mail: ${email}\n`
      + `Sprache: ${normalizeLocale(locale).toUpperCase()}\n`
      + `Quelle: ${source || "nes-landing"}\n`
      + `Bestätigt: ${displayedConfirmedAt}`,
  };
}

export function getInquiryNotificationEmail({
  inquiry,
  receivedAt,
}) {
  const receivedDate = new Date(receivedAt);
  const displayedReceivedAt = Number.isNaN(receivedDate.valueOf())
    ? receivedAt
    : new Intl.DateTimeFormat("de-AT", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Vienna",
      }).format(receivedDate);
  const optionalValue = (value) => escapeHtml(value || "—");
  const emailLink = `<a href="${escapeHtml(`mailto:${inquiry.email}`)}" style="color:#17342a;text-decoration:underline;">${escapeHtml(inquiry.email)}</a>`;
  const phoneLink = inquiry.phone
    ? `<a href="${escapeHtml(`tel:${inquiry.phone}`)}" style="color:#17342a;text-decoration:underline;">${escapeHtml(inquiry.phone)}</a>`
    : "—";
  const fields = [
    ["Name", escapeHtml(inquiry.name)],
    ["E-Mail", emailLink],
    ["Unternehmen", optionalValue(inquiry.company)],
    ["Telefon", phoneLink],
    ["Rolle", optionalValue(inquiry.role)],
    ["Anliegen", optionalValue(inquiry.topic)],
    ["Marke", optionalValue(inquiry.brand)],
    ["Newsletter", inquiry.newsletter ? "Ja – im Formular ausgewählt" : "Nein"],
    ["Sprache", escapeHtml(normalizeLocale(inquiry.locale).toUpperCase())],
    ["Eingegangen", escapeHtml(displayedReceivedAt)],
  ];
  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:11px 18px 11px 0;border-bottom:1px solid #d9d2c4;color:#8b857a;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;vertical-align:top;">${label}</td>
          <td style="padding:11px 0;border-bottom:1px solid #d9d2c4;color:#514d46;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;vertical-align:top;">${value}</td>
        </tr>`,
    )
    .join("");
  const message = inquiry.message
    ? `<div style="margin-top:28px;padding:20px;background:#eee9dd;">
        <p style="margin:0;color:#8b857a;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Nachricht</p>
        <p style="margin:12px 0 0;color:#514d46;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</p>
      </div>`
    : "";

  return {
    subject: `Neue N.E.S Anfrage · ${inquiry.name}`,
    html: `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Neue N.E.S Anfrage</title>
  </head>
  <body style="margin:0;padding:0;background:#e9e4d8;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#e9e4d8;">
      <tr>
        <td align="center" style="padding:34px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#f5f2e9;border:1px solid #d9d2c4;">
            <tr><td style="height:4px;background:#17342a;font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr>
              <td style="padding:44px 46px;">
                <p style="margin:0;color:#a6813f;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;">N.E.S · PARTNERANFRAGE</p>
                <h1 style="margin:28px 0 0;color:#17342a;font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:400;line-height:1.12;">Neue Anfrage.</h1>
                <p style="margin:18px 0 24px;color:#514d46;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;">Die Anfrage wurde über nes-shop.at gesendet. Eine direkte Antwort auf diese E-Mail geht an ${escapeHtml(inquiry.name)}.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows}</table>
                ${message}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text:
      `Neue N.E.S Anfrage\n\n`
      + `Name: ${inquiry.name}\n`
      + `E-Mail: ${inquiry.email}\n`
      + `Unternehmen: ${inquiry.company || "—"}\n`
      + `Telefon: ${inquiry.phone || "—"}\n`
      + `Rolle: ${inquiry.role || "—"}\n`
      + `Anliegen: ${inquiry.topic || "—"}\n`
      + `Marke: ${inquiry.brand || "—"}\n`
      + `Newsletter: ${inquiry.newsletter ? "Ja" : "Nein"}\n`
      + `Sprache: ${normalizeLocale(inquiry.locale).toUpperCase()}\n`
      + `Eingegangen: ${displayedReceivedAt}\n\n`
      + `Nachricht:\n${inquiry.message || "—"}`,
  };
}

export async function sendEmail(
  env,
  { to, subject, html, text, idempotencyKey, replyTo },
) {
  const payload = {
    from: env.NEWSLETTER_FROM,
    to: [to],
    subject,
    html,
    text,
  };

  const resolvedReplyTo = replyTo || env.NEWSLETTER_REPLY_TO;
  if (resolvedReplyTo) payload.reply_to = resolvedReplyTo;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "User-Agent": "nes-shop-newsletter/1.0",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email provider rejected the request (${response.status}): ${details}`);
  }

  return response.json();
}

export function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
