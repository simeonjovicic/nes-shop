import assert from "node:assert/strict";
import { test } from "node:test";
import { PRODUCTS } from "../src/products.js";
import { MAX_QUANTITY, getProductSlug, normalizeBag, normalizeWishlist } from "../src/shopState.js";

test("restoring a bag discards stale products, invalid sizes and malformed quantities", () => {
  const value = [null, {}, { productId: 999, size: "M", qty: 1 },
    { productId: 13, size: "42", qty: 1 }, { productId: 13, size: "M", qty: -2 },
    { productId: 13, size: "M", qty: "2" }, { productId: 13, size: "M", qty: 1.5 },
    { productId: 13, size: "M", qty: 2 }];
  assert.deepEqual(normalizeBag(value, PRODUCTS), [{ productId: 13, size: "M", qty: 2 }]);
  assert.deepEqual(normalizeBag({ productId: 13 }, PRODUCTS), []);
});

test("restoring a bag merges duplicate variants, limits quantities and preserves distinct sizes", () => {
  const value = [{ productId: 13, size: "M", qty: 70 }, { productId: 13, size: "M", qty: 50 },
    { productId: 13, size: "L", qty: 1 }, { productId: 12, size: "M", qty: 2 }];
  const original = structuredClone(value);
  assert.deepEqual(normalizeBag(value, PRODUCTS), [
    { productId: 13, size: "M", qty: MAX_QUANTITY }, { productId: 13, size: "L", qty: 1 },
    { productId: 12, size: "M", qty: 2 },
  ]);
  assert.deepEqual(value, original);
});

test("a saved wishlist keeps only unique catalogue products", () => {
  assert.deepEqual(normalizeWishlist([13, 13, null, 999, "13", 12], PRODUCTS), [13, 12]);
  assert.deepEqual(normalizeWishlist("invalid", PRODUCTS), []);
});

test("every catalogue item has a unique shareable product slug", () => {
  const slugs = PRODUCTS.map(getProductSlug);
  assert.equal(new Set(slugs).size, PRODUCTS.length);
  assert(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));
  assert.equal(getProductSlug(PRODUCTS.find((product) => product.id === 13)), "pully-orange");
});
