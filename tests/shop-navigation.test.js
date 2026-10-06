import assert from "node:assert/strict";
import { test } from "node:test";
import { PRODUCTS } from "../src/products.js";
import { AUDIENCES, ACTIVITIES, audienceFromLocation, activityFromLocation, matchesAudience, matchesActivity } from "../src/shopNavigation.js";
import { getServicePage } from "../src/serviceContent.js";

test("navigation filters only accept known audiences and activities", () => {
  assert.equal(audienceFromLocation(new URL("https://nes.test/shop?for=women")), "women");
  assert.equal(audienceFromLocation(new URL("https://nes.test/shop?for=kids")), "all");
  assert.equal(activityFromLocation(new URL("https://nes.test/shop?activity=training")), "training");
  assert.equal(activityFromLocation(new URL("https://nes.test/shop?activity=running")), "all");
});

test("every product is listed for at least one audience and every activity has products", () => {
  assert(PRODUCTS.every((product) => AUDIENCES.some((audience) => matchesAudience(product, audience.id))));
  assert(ACTIVITIES.every((activity) => PRODUCTS.some((product) => matchesActivity(product, activity.id))));
});

test("Vehon is listed for men only and WAI sport styles for training", () => {
  const vehon = PRODUCTS.filter((product) => product.brand === "Vehon");
  assert(vehon.every((product) => matchesAudience(product, "men") && !matchesAudience(product, "women")));
  const training = PRODUCTS.filter((product) => matchesActivity(product, "training"));
  assert(training.length > 0 && training.every((product) => product.familyId?.startsWith("wai-sport")));
});

test("fit guide and FAQ pages are reachable", () => {
  assert.equal(getServicePage("/service/passform")?.id, "fit");
  assert.equal(getServicePage("/service/faq/")?.id, "faq");
});
