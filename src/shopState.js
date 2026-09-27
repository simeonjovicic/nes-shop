export const MAX_QUANTITY = 99;

export function getProductSlug(product) {
  return product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
