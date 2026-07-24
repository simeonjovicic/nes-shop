import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";

import { onRequestGet as confirmSubscription } from "../functions/api/confirm.js";
import { onRequestGet as newsletterHealth } from "../functions/api/newsletter-health.js";
import { onRequestPost as subscribe } from "../functions/api/subscribe.js";
import { onRequestGet as unsubscribe } from "../functions/api/unsubscribe.js";

class MemoryD1 {
  constructor() {
    this.nextId = 1;
    this.subscribers = new Map();
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
      async first() {
        if (normalizedSql.startsWith("SELECT status, updated_at")) {
          const subscriber = database.subscribers.get(this.values[0].toLowerCase());
          return subscriber
            ? { status: subscriber.status, updated_at: subscriber.updated_at }
            : null;
        }

        if (normalizedSql.includes("WHERE confirmation_token_hash = ?")) {
          const subscriber = [...database.subscribers.values()].find(
            (entry) =>
              entry.confirmation_token_hash === this.values[0]
              && entry.status === "pending",
          );
          return subscriber
            ? {
                id: subscriber.id,
                email: subscriber.email,
                locale: subscriber.locale,
                confirmation_expires_at: subscriber.confirmation_expires_at,
              }
            : null;
        }

        throw new Error(`Unhandled first() query: ${normalizedSql}`);
      },
      async run() {
        if (normalizedSql.startsWith("INSERT INTO newsletter_subscribers")) {
          const [email, locale, source, tokenHash, expiresAt, createdAt, updatedAt] =
            this.values;
          const key = email.toLowerCase();
          const current = database.subscribers.get(key);

          database.subscribers.set(key, {
            ...current,
            id: current?.id || database.nextId++,
            email,
            locale,
            source,
            status: "pending",
            confirmation_token_hash: tokenHash,
            confirmation_expires_at: expiresAt,
            unsubscribe_token_hash: null,
            confirmed_at: null,
            unsubscribed_at: null,
            created_at: current?.created_at || createdAt,
            updated_at: updatedAt,
          });
          return { success: true };
        }

        if (normalizedSql.includes("SET status = 'confirmed'")) {
          const [confirmedAt, updatedAt, unsubscribeTokenHash, id, confirmationTokenHash] =
            this.values;
          const subscriber = [...database.subscribers.values()].find(
            (entry) =>
              entry.id === id
              && entry.status === "pending"
              && entry.confirmation_token_hash === confirmationTokenHash,
          );
          if (!subscriber) return { success: true, meta: { changes: 0 } };
          Object.assign(subscriber, {
            status: "confirmed",
            confirmed_at: confirmedAt,
            updated_at: updatedAt,
            confirmation_token_hash: null,
            confirmation_expires_at: null,
            unsubscribe_token_hash: unsubscribeTokenHash,
          });
          return { success: true, meta: { changes: 1 } };
        }

        if (normalizedSql.includes("SET status = 'unsubscribed'")) {
          const [unsubscribedAt, updatedAt, tokenHash] = this.values;
          const subscriber = [...database.subscribers.values()].find(
            (entry) => entry.unsubscribe_token_hash === tokenHash,
          );
          if (subscriber) {
            Object.assign(subscriber, {
              status: "unsubscribed",
              unsubscribed_at: unsubscribedAt,
              updated_at: updatedAt,
            });
          }
          return { success: true };
        }

        throw new Error(`Unhandled run() query: ${normalizedSql}`);
      },
    };
  }
}

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function createEnv() {
  return {
    NEWSLETTER_DB: new MemoryD1(),
    RESEND_API_KEY: "re_test",
    NEWSLETTER_FROM: "N.E.S <office@nes-shop.at>",
    NEWSLETTER_REPLY_TO: "office@nes-shop.at",
    PUBLIC_SITE_URL: "https://nes-shop.at",
  };
}

function emailRequest(body) {
  return new Request("https://nes-shop.at/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("newsletter automation", () => {
  test("reports deployment bindings without exposing their values", async () => {
    const incomplete = await newsletterHealth({
      env: {
        NEWSLETTER_FROM: "N.E.S <office@nes-shop.at>",
        PUBLIC_SITE_URL: "https://nes-shop.at",
      },
    });
    const configured = await newsletterHealth({ env: createEnv() });

    assert.equal(incomplete.status, 503);
    assert.deepEqual(await incomplete.json(), {
      ok: false,
      services: {
        database: false,
        emailProvider: false,
        sender: true,
        replyTo: false,
        siteUrl: true,
      },
    });
    assert.equal(configured.status, 200);
    assert.equal((await configured.json()).ok, true);
  });

  test("rejects an incomplete deployment configuration", async () => {
    const response = await subscribe({
      request: emailRequest({ email: "person@example.com" }),
      env: {},
    });

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      ok: false,
      error: "newsletter_not_configured",
    });
  });

  test("handles malformed and invalid input without contacting Resend", async () => {
    const env = createEnv();
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return Response.json({ id: "email-id" });
    };

    const malformed = await subscribe({
      request: new Request("https://nes-shop.at/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "null",
      }),
      env,
    });
    const invalid = await subscribe({
      request: emailRequest({ email: "not-an-email" }),
      env,
    });

    assert.equal(malformed.status, 400);
    assert.equal(invalid.status, 422);
    assert.equal(fetchCalls, 0);
  });

  test("completes subscribe, double opt-in, welcome and unsubscribe", async () => {
    const env = createEnv();
    const sentEmails = [];
    globalThis.fetch = async (_url, options) => {
      sentEmails.push({
        headers: options.headers,
        payload: JSON.parse(options.body),
      });
      return Response.json({ id: `email-${sentEmails.length}` });
    };

    const subscribeResponse = await subscribe({
      request: emailRequest({
        email: "Visitor@Example.com",
        locale: "de",
        source: "nes-landing-hero",
      }),
      env,
    });

    assert.equal(subscribeResponse.status, 202);
    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].payload.to[0], "visitor@example.com");
    assert.equal(sentEmails[0].payload.reply_to, "office@nes-shop.at");
    assert.match(sentEmails[0].headers["Idempotency-Key"], /^nes-confirm-/);

    const confirmationUrl = sentEmails[0].payload.text.match(
      /https:\/\/nes-shop\.at\/api\/confirm\?token=[^\s]+/,
    )?.[0];
    assert.ok(confirmationUrl);

    const confirmResponse = await confirmSubscription({
      request: new Request(confirmationUrl),
      env,
    });

    assert.equal(confirmResponse.status, 302);
    assert.equal(
      confirmResponse.headers.get("location"),
      "https://nes-shop.at/?newsletter=confirmed&lang=de#join",
    );
    assert.equal(sentEmails.length, 2);
    assert.match(sentEmails[1].headers["Idempotency-Key"], /^nes-welcome-/);

    const unsubscribeUrl = sentEmails[1].payload.text.match(
      /https:\/\/nes-shop\.at\/api\/unsubscribe\?token=[^\s]+/,
    )?.[0];
    assert.ok(unsubscribeUrl);

    const unsubscribeResponse = await unsubscribe({
      request: new Request(unsubscribeUrl),
      env,
    });

    assert.equal(unsubscribeResponse.status, 302);
    assert.equal(
      unsubscribeResponse.headers.get("location"),
      "https://nes-shop.at/?newsletter=unsubscribed&lang=de#join",
    );
    assert.equal(env.NEWSLETTER_DB.subscribers.get("visitor@example.com").status, "unsubscribed");
  });

  test("silently throttles repeated pending requests", async () => {
    const env = createEnv();
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return Response.json({ id: `email-${fetchCalls}` });
    };

    const first = await subscribe({
      request: emailRequest({ email: "person@example.com", locale: "en" }),
      env,
    });
    const repeated = await subscribe({
      request: emailRequest({ email: "person@example.com", locale: "en" }),
      env,
    });

    assert.equal(first.status, 202);
    assert.equal(repeated.status, 202);
    assert.equal(fetchCalls, 1);
  });

  test("does not confirm a subscription with an invalid expiry value", async () => {
    const env = createEnv();
    const sentEmails = [];
    globalThis.fetch = async (_url, options) => {
      sentEmails.push(JSON.parse(options.body));
      return Response.json({ id: `email-${sentEmails.length}` });
    };

    await subscribe({
      request: emailRequest({ email: "expired@example.com", locale: "en" }),
      env,
    });
    const confirmationUrl = sentEmails[0].text.match(
      /https:\/\/nes-shop\.at\/api\/confirm\?token=[^\s]+/,
    )?.[0];
    env.NEWSLETTER_DB.subscribers.get("expired@example.com").confirmation_expires_at =
      "not-a-date";

    const response = await confirmSubscription({
      request: new Request(confirmationUrl),
      env,
    });

    assert.equal(
      response.headers.get("location"),
      "https://nes-shop.at/?newsletter=expired&lang=en#join",
    );
    assert.equal(sentEmails.length, 1);
    assert.equal(env.NEWSLETTER_DB.subscribers.get("expired@example.com").status, "pending");
  });

  test("allows only one welcome email for concurrent confirmation requests", async () => {
    const env = createEnv();
    const sentEmails = [];
    globalThis.fetch = async (_url, options) => {
      sentEmails.push(JSON.parse(options.body));
      return Response.json({ id: `email-${sentEmails.length}` });
    };

    await subscribe({
      request: emailRequest({ email: "race@example.com", locale: "de" }),
      env,
    });
    const confirmationUrl = sentEmails[0].text.match(
      /https:\/\/nes-shop\.at\/api\/confirm\?token=[^\s]+/,
    )?.[0];

    const responses = await Promise.all([
      confirmSubscription({ request: new Request(confirmationUrl), env }),
      confirmSubscription({ request: new Request(confirmationUrl), env }),
    ]);
    const destinations = responses.map((response) => response.headers.get("location"));

    assert.equal(sentEmails.length, 2);
    assert.equal(
      destinations.filter((destination) => destination.includes("newsletter=confirmed")).length,
      1,
    );
    assert.equal(
      destinations.filter((destination) => destination.includes("newsletter=invalid")).length,
      1,
    );
  });
});
