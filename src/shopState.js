export const MAX_QUANTITY = 99;

export function getProductSlug(product) {
  return product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function groupProductFamilies(products) {
  const groups = new Map();
  for (const product of products) {
    const key = product.familyId || product.id;
    if (!groups.has(key) || product.familyDefault) groups.set(key, product);
  }
  return [...groups.values()];
}

export function getProductVariants(product, products) {
  if (product.familyId) return products.filter((item) => item.familyId === product.familyId);
  return product.brandId === "montechiaro" ? products.filter((item) => item.brandId === "montechiaro") : [product];
}

export function getLinePrice(product, quantity = 1) {
  return Number.isFinite(product?.price) ? product.price * quantity : null;
}

export function getBagTotal(bag, products) {
  let total = 0;
  for (const item of bag) {
    const price = getLinePrice(products.find((product) => product.id === item.productId), item.qty);
    if (price === null) return null;
    total += price;
  }
  return total;
}

export function compareProductPrices(a, b, descending = false) {
  if (!Number.isFinite(a.price)) return Number.isFinite(b.price) ? 1 : 0;
  if (!Number.isFinite(b.price)) return -1;
  return descending ? b.price - a.price : a.price - b.price;
}

export function readStored(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Shopping still works when browser storage is unavailable.
  }
}

export function normalizeBag(value, products) {
  if (!Array.isArray(value)) return [];
  return value.reduce((bag, item) => {
    const product = products.find((candidate) => candidate.id === item?.productId);
    if (!product || !product.sizes.includes(item.size) || !Number.isSafeInteger(item.qty) || item.qty < 1) return bag;
    const existing = bag.find((line) => line.productId === item.productId && line.size === item.size);
    if (existing) existing.qty = Math.min(MAX_QUANTITY, existing.qty + item.qty);
    else bag.push({ productId: item.productId, size: item.size, qty: Math.min(MAX_QUANTITY, item.qty) });
    return bag;
  }, []);
}

export function normalizeWishlist(value, products) {
  return Array.isArray(value)
    ? [...new Set(value.filter((id) => products.some((product) => product.id === id)))]
    : [];
}
