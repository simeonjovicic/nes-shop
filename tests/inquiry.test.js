import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";

import { onRequestPost as submitInquiry } from "../functions/api/inquiry.js";

class InquiryD1 {
  constructor() {
    this.inquiries = new Map();
  }

  prepare(sql) {
    const database = this;
    const normalizedSql = sql.replace(/\s+/g, " ").trim();

    return {
      values: [],
      bind(...values) {
        this.values = values;
        return this;
      },
      async run() {
        if (
          normalizedSql.startsWith("CREATE TABLE IF NOT EXISTS inquiries")
          || normalizedSql.startsWith("CREATE INDEX IF NOT EXISTS inquiry_created_at_idx")
        ) {
          return { success: true };
        }

        if (normalizedSql.startsWith("INSERT INTO inquiries")) {
          const [
            requestId,
            name,
            email,
            company,
            phone,
            role,
            topic,
            brand,
            message,
            newsletterRequested,
            locale,
            source,
            consentAt,
            notificationStatus,
            createdAt,
          ] = this.values;

          database.inquiries.set(requestId, {
            requestId,
            name,
            email,
            company,
            phone,
            role,
            topic,
            brand,
            message,
            newsletterRequested,
            locale,
            source,
            consentAt,
            notificationStatus,
            notifiedAt: null,
            createdAt,
          });
          return { success: true };
        }

        if (normalizedSql.startsWith("UPDATE inquiries")) {
          const [notificationStatus, notifiedAt, requestId] = this.values;
          const inquiry = database.inquiries.get(requestId);
          assert.ok(inquiry);
          inquiry.notificationStatus = notificationStatus;
          inquiry.notifiedAt = notifiedAt;
          return { success: true };
        }

        throw new Error(`Unhandled run() query: ${normalizedSql}`);
      },
    };
  }
}

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;

afterEach(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

function createEnv() {
  return {
    NEWSLETTER_DB: new InquiryD1(),
    RESEND_API_KEY: "re_test",
    NEWSLETTER_FROM: "N.E.S <office@nes-shop.at>",
    NEWSLETTER_REPLY_TO: "office@nes-shop.at",
  };
}

function inquiryRequest(body) {
  return new Request("https://nes-shop.at/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function validInquiry(overrides = {}) {
  return {
    name: "Anna Beispiel",
    email: "anna@example.com",
    company: "Beispiel Schuhe",
    phone: "+43 123 456",
    role: "Fachhändler",
    topic: "Wiederverkauf & Konditionen",
    brand: "Green Comfort",
    message: "Bitte sendet mir weitere Informationen.",
    newsletter: true,
    locale: "de",
    source: "nes-inquiry",
    consent: true,
    website: "",
    ...overrides,
  };
}

describe("partner enquiry automation", () => {
  test("stores a valid enquiry and notifies office with direct reply-to", async () => {
    const env = createEnv();
    const sentEmails = [];
    globalThis.fetch = async (_url, options) => {
      sentEmails.push({
        headers: options.headers,
        payload: JSON.parse(options.body),
      });
      return Response.json({ id: "email-1" });
    };

    const response = await submitInquiry({
      request: inquiryRequest(
        validInquiry({ message: "Hallo <script>alert('x')</script>" }),
      ),
      env,
    });
    const result = await response.json();
    const storedInquiry = [...env.NEWSLETTER_DB.inquiries.values()][0];

    assert.equal(response.status, 202);
    assert.deepEqual(result, {
      ok: true,
      status: "received",
      stored: true,
      notified: true,
    });
    assert.equal(env.NEWSLETTER_DB.inquiries.size, 1);
    assert.equal(storedInquiry.email, "anna@example.com");
    assert.equal(storedInquiry.newsletterRequested, 1);
    assert.equal(storedInquiry.notificationStatus, "sent");
    assert.ok(storedInquiry.notifiedAt);
    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].payload.to[0], "office@nes-shop.at");
    assert.equal(sentEmails[0].payload.reply_to, "anna@example.com");
    assert.match(sentEmails[0].payload.subject, /Anna Beispiel/);
    assert.match(sentEmails[0].payload.html, /&lt;script&gt;/);
    assert.doesNotMatch(sentEmails[0].payload.html, /<script>alert/);
    assert.match(sentEmails[0].headers["Idempotency-Key"], /^nes-inquiry-/);
  });

  test("rejects invalid or non-consented enquiries", async () => {
    const env = createEnv();
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return Response.json({ id: "email-1" });
    };

    const response = await submitInquiry({
      request: inquiryRequest(validInquiry({ email: "invalid", consent: false })),
      env,
    });

    assert.equal(response.status, 422);
    assert.equal(env.NEWSLETTER_DB.inquiries.size, 0);
    assert.equal(fetchCalls, 0);
  });

  test("silently ignores honeypot submissions", async () => {
    const env = createEnv();
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return Response.json({ id: "email-1" });
    };

    const response = await submitInquiry({
      request: inquiryRequest(validInquiry({ website: "https://spam.example" })),
      env,
    });

    assert.equal(response.status, 202);
    assert.equal(env.NEWSLETTER_DB.inquiries.size, 0);
    assert.equal(fetchCalls, 0);
  });

  test("keeps the enquiry stored when notification delivery fails", async () => {
    const env = createEnv();
    console.error = () => {};
    globalThis.fetch = async () => new Response("provider unavailable", { status: 503 });

    const response = await submitInquiry({
      request: inquiryRequest(validInquiry({ newsletter: false })),
      env,
    });
    const result = await response.json();
    const storedInquiry = [...env.NEWSLETTER_DB.inquiries.values()][0];

    assert.equal(response.status, 202);
    assert.equal(result.stored, true);
    assert.equal(result.notified, false);
    assert.equal(storedInquiry.notificationStatus, "failed");
  });
});
