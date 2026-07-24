# NES newsletter setup — Cloudflare Pages

The code is prepared for a double-opt-in flow:

1. `POST /api/subscribe` validates the address, stores it as pending and sends the confirmation email.
2. `GET /api/confirm` confirms the address and sends the welcome email.
3. `GET /api/unsubscribe` removes consent while retaining the minimal suppression record.

Live sending remains off until `VITE_NEWSLETTER_ENDPOINT=/api/subscribe` is added to the Pages build variables.

## 1. Decide the sender

Recommended structure:

- From: `N.E.S <office@nes-shop.at>`
- Reply-To: `office@nes-shop.at`

The visible sender and Reply-To address are both the real Hostinger inbox at `office@nes-shop.at`. Resend sends on behalf of the verified `nes-shop.at` domain, while incoming replies continue to be handled by Hostinger.

The authoritative nameservers for `nes-shop.at` are already at Cloudflare. Add the SPF and DKIM records shown by Resend in **Cloudflare → DNS → Records**. Do not replace the existing Hostinger MX records or the existing Hostinger SPF record. Add only the additional records and hostnames supplied by Resend.

## 2. Create and bind D1

In Cloudflare, create a D1 database named `nes-newsletter`, open its Console and execute:

`cloudflare/newsletter-schema.sql`

Then open the Pages project and add a D1 binding:

- Variable name: `NEWSLETTER_DB`
- Database: `nes-newsletter`

Apply the binding to both Preview and Production if preview deployments should be testable.

## 3. Add Pages secrets and variables

Under **Workers & Pages → the Pages project → Settings → Variables and Secrets**, add:

- Secret `RESEND_API_KEY`
- Variable `NEWSLETTER_FROM`: `N.E.S <office@nes-shop.at>`
- Variable `NEWSLETTER_REPLY_TO`: `office@nes-shop.at`
- Variable `PUBLIC_SITE_URL`: `https://nes-shop.at`

Redeploy after changing bindings or secrets.

## 4. Activate the frontend after approval

Add this Pages **build variable** and redeploy:

```text
VITE_NEWSLETTER_ENDPOINT=/api/subscribe
```

Until that variable exists, the current development build only stores test submissions locally in the browser and no email is sent.

## 5. Preview locally

The visual email draft is available at:

```text
/email-preview.html
```

For end-to-end Function testing, install/use Wrangler and run the built site with a local D1 binding. Keep real API keys in `.dev.vars`, which is ignored by Git.
