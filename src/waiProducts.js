const imageFor = (sku) => `/shop/products/wai/${sku.toLowerCase()}-cutout-v1.webp`;
export const WAI_SIZE_LABELS = ["36/37", "38/39", "40/41", "42/43", "44/45", "46/47"];

// One storefront card per cut; each stock code remains a distinct selectable item.
export const WAI_FAMILIES = [
  { id: "wai-mocassin", name: "WAI Mocassin", defaultSku: "LMADNM5", subtitle: { de: "Leichter Stoff-Mocassin", en: "Lightweight textile moccasin" } },
  { id: "wai-slip-on", name: "WAI Slip-on", defaultSku: "LOWGYN4", subtitle: { de: "Weicher Stoff-Slip-on", en: "Soft textile slip-on" } },
  { id: "wai-high", name: "WAI High", defaultSku: "LLWPDP8", subtitle: { de: "Knöchelhoher Feel Shoe", en: "Ankle-high feel shoe" } },
  { id: "wai-sport-low", name: "WAI Sport Low", defaultSku: "SSABLK1", subtitle: { de: "Flacher Sport Feel Shoe", en: "Low-cut sport feel shoe" } },
  { id: "wai-sport-high", name: "WAI Sport High", defaultSku: "SLAG012", subtitle: { de: "Knöchelhoher Sport Feel Shoe", en: "Ankle-high sport feel shoe" } },
  { id: "wai-sport-slip-on", name: "WAI Sport Slip-on", defaultSku: "SOAG052", subtitle: { de: "Leichter Sport Slip-on", en: "Lightweight sport slip-on" } },
];

const camo = "conic-gradient(from 30deg, #9bbdb0, #447765, #6e9181, #bacfc0, #547b78, #9bbdb0)";
const pdp = "repeating-conic-gradient(#242b36 0% 25%, #e8e8e4 0% 50%) 0 / 8px 8px";
// Size availability is from the supplied stock snapshot; no live quantities or
// unconfirmed prices are inferred. A null price is displayed as 'Price on request'.
const variants = [
  [101, "SSABLK1", "wai-sport-low", "Black", "Feines Stretch-Textil", "#242323", [17,23,24,5,22,12]],
  [102, "SSABLK7", "wai-sport-low", "Black · Soft", "Strukturiertes Soft-Textil", "#343432", [4,6,6,4,11,3]],
  [103, "SSAPRM7", "wai-sport-low", "Primula · Soft", "Strukturiertes Soft-Textil", "#cc319b", [2,6,10,34,8,3]],
  [104, "SLABLK1", "wai-sport-high", "Black", "Feines Stretch-Textil", "#242323", [0,6,0,1,0,0]],
  [105, "SLABLK7", "wai-sport-high", "Black · Soft", "Strukturiertes Soft-Textil", "#343432", [12,33,9,31,7,2]],
  [106, "SLAPRM7", "wai-sport-high", "Primula · Soft", "Strukturiertes Soft-Textil", "#cc319b", [3,8,13,32,10,2]],
  [107, "SLAG012", "wai-sport-high", "Deep Blue", "Bedrucktes Textil", "#086590", [0,2,0,2,0,1]],
  [108, "SLAG022", "wai-sport-high", "Smash", "Bedrucktes Textil", "#d1b82c", [2,14,1,18,0,0], "linear-gradient(35deg, #d7bd35 30%, #f3f0d9 30% 65%, #df3934 65%)"],
  [109, "SLAG042", "wai-sport-high", "Mandala", "Bedrucktes Textil", "#68a6bd", [2,15,5,21,0,0], "repeating-radial-gradient(circle, #eaeae4 0 2px, #4995b3 2px 3px)"],
  [110, "SLAG052", "wai-sport-high", "Camo", "Bedrucktes Textil", "#668d78", [0,11,3,4,0,5], camo],
  [111, "SOAG012", "wai-sport-slip-on", "Deep Blue", "Bedrucktes Textil", "#086ba7", [0,14,3,8,1,0]],
  [112, "SOAG052", "wai-sport-slip-on", "Camo", "Bedrucktes Textil", "#668d78", [0,1,1,11,14,1], camo],
  [113, "SOAG062", "wai-sport-slip-on", "Yellow PDP", "Bedrucktes Textil", "#b7d965", [0,4,0,8,3,1], "repeating-conic-gradient(#b3d75d 0% 25%, #f4f3eb 0% 50%) 0 / 8px 8px"],
  [114, "SOAG072", "wai-sport-slip-on", "Red Passion", "Bedrucktes Textil", "#dd2546", [0,3,3,16,3,2]],
  [115, "LMAG032", "wai-mocassin", "Black PDP", "Bedrucktes Textil", "#353e4c", [15,0,2,10,6,4], pdp],
  [116, "LMAG052", "wai-mocassin", "Camo", "Bedrucktes Textil", "#668d78", [3,8,2,1,3,1], camo],
  [117, "LMANVG3", "wai-mocassin", "Cotton Navy", "Baumwolle", "#222d4d", [5,9,6,0,0,0]],
  [118, "LMAOLV6", "wai-mocassin", "Schoeller Olive", "Schoeller-Textil", "#666358", [5,13,0,10,6,4]],
  [119, "LMADNM5", "wai-mocassin", "Denim", "Denim", "#5a667b", [5,11,4,16,15,6]],
  [120, "LMWGYN4", "wai-mocassin", "Wool Grey", "Wolltextil", "#898987", [2,4,1,13,18,7]],
  [121, "LMWPDP8", "wai-mocassin", "Wool PDP", "Wolltextil", "#41413f", [4,4,1,2,3,0], pdp],
  [122, "LOANVG3", "wai-slip-on", "Cotton Navy", "Baumwolle", "#222d4d", [0,8,1,13,12,8]],
  [123, "LOWGYN4", "wai-slip-on", "Wool Grey", "Wolltextil", "#898987", [4,3,5,9,9,1]],
  [124, "LLANVG3", "wai-high", "Cotton Navy", "Baumwolle", "#222d4d", [8,16,14,39,22,5]],
  [125, "LLWGYN4", "wai-high", "Wool Grey", "Wolltextil", "#898987", [8,10,8,11,11,2]],
  [126, "LLWPDP8", "wai-high", "Wool PDP", "Wolltextil", "#41413f", [6,14,6,26,19,12], pdp],
];

const englishMaterials = {
  "Feines Stretch-Textil": "Fine stretch textile", "Strukturiertes Soft-Textil": "Textured soft textile",
  "Bedrucktes Textil": "Printed textile", Baumwolle: "Cotton", "Schoeller-Textil": "Schoeller textile", Wolltextil: "Wool textile", Denim: "Denim",
};

// Use cases per line, as printed in the WAI FEELSHOES brochure.
const USE_CASES = {
  sport: { de: "Für Pilates, Fitness, Aqua-Training und den Strand.", en: "Made for pilates, fitness, aqua training and the beach." },
  lifestyle: { de: "Für Zuhause und unterwegs, im Flugzeug, im Hotel oder auf dem Boot.", en: "For home and on the go: on the plane, in the hotel or on a boat." },
};

export const WAI_PRODUCTS =variants.map(([id, sku, familyId, color, material, hex, stock, swatch]) => {
  const family = WAI_FAMILIES.find((item) => item.id === familyId);
  const image = imageFor(sku);
  const line = familyId.startsWith("wai-sport") ? "sport" : "lifestyle";
  return {
    id, sku, familyId, name: family.name, slug: `${familyId}-${sku.toLowerCase()}`,
    familyDefault: sku === family.defaultSku,
    brand: "WAI by Vehon", brandId: "vehon", subtitle: family.subtitle,
    price: null, color: { de: color, en: color }, material,
    materialLabel: { de: material, en: englishMaterials[material] }, hex, swatch,
    category: { de: "Feel Shoes", en: "Feel shoes" },
    image, gallery: [{ src: image, fit: "contain" }], fit: "contain",
    sizes: WAI_SIZE_LABELS.filter((_, index) => stock[index] > 0),
    sizeOptions: WAI_SIZE_LABELS.map((label, index) => ({ label, available: stock[index] > 0 })),
    description: {
      de: `${family.subtitle.de} aus nahtlosem, elastischem Stoff. Die flexible Sohle aus recyceltem PU ist mit exklusiver CCT-Technologie direkt aufgespritzt. Leicht, faltbar und maschinenwaschbar, mit Care Bag. ${USE_CASES[line].de} Ausführung: ${color}.`,
      en: `${family.subtitle.en} in seamless, elastic fabric. The flexible recycled-PU sole is over-injected directly onto it using exclusive CCT technology. Lightweight, foldable and machine washable, with a care bag. ${USE_CASES[line].en} Variation: ${color}.`,
    },
  };
});
