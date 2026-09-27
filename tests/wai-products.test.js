import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { PRODUCTS } from "../src/products.js";
import { WAI_PRODUCTS } from "../src/waiProducts.js";
import { groupProductFamilies, getProductVariants, getProductSlug, getLinePrice, getBagTotal, compareProductPrices, normalizeBag } from "../src/shopState.js";

test("26 WAI variants produce six storefront cards with matching, existing images", () => {
  assert.equal(WAI_PRODUCTS.length, 26);
  assert.equal(new Set(WAI_PRODUCTS.map(product => product.sku)).size, 26);
  const cards = groupProductFamilies(WAI_PRODUCTS);
  assert.equal(cards.length, 6);
  assert(cards.every(product => product.familyDefault));
  for (const product of WAI_PRODUCTS) {
    assert.equal(product.image, `/shop/products/wai/${product.sku.toLowerCase()}-cutout-v1.webp`);
    assert(existsSync(new URL(`../public${product.image}`, import.meta.url)));
    assert(getProductVariants(product, PRODUCTS).every(variant => variant.familyId === product.familyId));
  }
});

test("filtering for a color retains that variant instead of replacing it with a family default", () => {
  const matches = WAI_PRODUCTS.filter(product => product.color.en === "Camo");
  assert.equal(groupProductFamilies(matches).length, 3);
  assert(groupProductFamilies(matches).every(product => product.color.en === "Camo"));
});

test("variant URLs and saved bag lines preserve different colors and valid paired sizes", () => {
  const black = WAI_PRODUCTS.find(product => product.sku === "SLABLK1");
  const soft = WAI_PRODUCTS.find(product => product.sku === "SLABLK7");
  assert.notEqual(getProductSlug(black), getProductSlug(soft));
  assert.deepEqual(black.sizes, ["38/39", "42/43"]);
  assert.deepEqual(normalizeBag([
    { productId: black.id, size: "36/37", qty: 1 },
    { productId: black.id, size: "38/39", qty: 1 },
    { productId: soft.id, size: "38/39", qty: 2 },
  ], PRODUCTS), [
    { productId: black.id, size: "38/39", qty: 1 },
    { productId: soft.id, size: "38/39", qty: 2 },
  ]);
});

test("unconfirmed prices never become a zero price or an understated bag total", () => {
  const unknown = WAI_PRODUCTS[0];
  const priced = PRODUCTS.find(product => product.id === 12);
  assert.equal(getLinePrice(unknown, 3), null);
  assert.equal(getLinePrice(priced, 2), 438);
  assert.equal(getBagTotal([{ productId: unknown.id, qty: 2 }, { productId: priced.id, qty: 1 }], PRODUCTS), null);
  assert.equal(getBagTotal([{ productId: priced.id, qty: 2 }], PRODUCTS), 438);
  for (const descending of [false, true]) {
    assert.deepEqual([unknown, priced].sort((a,b) => compareProductPrices(a,b,descending)), [priced, unknown]);
  }
});
