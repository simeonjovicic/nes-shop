import { PRODUCTS } from "./products";
import { WAI_FAMILIES } from "./waiProducts";

// Homepage photography and colour choices; product details come from the catalogue.
const image = (src, width, height) => ({ src, width, height });

const waiFeatured = WAI_FAMILIES.map((family) => {
  const variants = PRODUCTS.filter((product) => product.familyId === family.id);
  const product = variants.find((variant) => variant.familyDefault);
  return {
    id: family.id, sourceProductId: product.id, brand: product.brand,
    name: family.name, category: "shoes", familyId: family.id,
    images: [image(product.image, 1122, 1402)],
    colors: [product, ...variants.filter((variant) => variant.id !== product.id)].map((variant) => ({
      sourceProductId: variant.id, name: variant.color.de, hex: variant.hex, swatch: variant.swatch,
      image: variant.image, width: 1122, height: 1402,
    })),
  };
});

export const featuredProducts = [
  ...waiFeatured,
  {
    id: "pully-rosso",
    sourceProductId: 12,
    brand: "Montechiaro",
    name: "Pully Rosso",
    subtitle: "Signature Jacquard Knit",
    category: "knitwear",
    images: [image("/shop/pully-red-front.webp", 1535, 2144), image("/shop/pully-red-side.webp", 1536, 2614)],
    colors: [
      { sourceProductId: 12, name: "Rosso", hex: "#743b40", image: "/shop/pully-red-front.webp" },
    ],
    slug: "pully-rosso",
  },
  {
    id: "prince-loafer",
    sourceProductId: 7,
    brand: "Vehon",
    name: "Prince Loafer",
    subtitle: "3D Knit Loafer",
    category: "shoes",
    images: [image("/shop/products/prince-loafer-cutout-front-v1.webp", 1122, 1402), image("/shop/products/prince-loafer-cutout-side-v1.webp", 1122, 1402)],
    colors: [{ name: "Nero", hex: "#1f1f1d", image: "/shop/products/prince-loafer-cutout-front-v1.webp" }],
    slug: "prince-loafer",
  },
  {
    id: "pully-dark-blue",
    sourceProductId: 16,
    brand: "Montechiaro",
    name: "Pully Dark Blue",
    subtitle: "Signature Jacquard Knit",
    badge: { de: "Neu", en: "New" },
    category: "knitwear",
    images: [image("/shop/products/pully-dark-blue/front.webp", 1122, 1402), image("/shop/products/pully-dark-blue/side.webp", 1122, 1402)],
    colors: [
      { sourceProductId: 16, name: "Dark Blue", hex: "#202c4e", image: "/shop/products/pully-dark-blue/front.webp" },
      { sourceProductId: 15, name: "Blue", hex: "#526e91", image: "/shop/products/pully-blue/front.webp", width: 1122, height: 1402, hoverImage: "/shop/products/pully-blue/side.webp", hoverWidth: 1122, hoverHeight: 1402 },
    ],
    slug: "pully-dark-blue",
  },
  {
    id: "pully-orange",
    sourceProductId: 13,
    brand: "Montechiaro",
    name: "Pully Orange",
    subtitle: "Signature Jacquard Knit",
    category: "knitwear",
    images: [image("/shop/products/pully-orange/front.webp", 1122, 1402), image("/shop/products/pully-orange/side.webp", 1122, 1402)],
    colors: [
      { sourceProductId: 13, name: "Orange", hex: "#bf8a34", image: "/shop/products/pully-orange/front.webp" },
    ],
    slug: "pully-orange",
  },
  {
    id: "pully-dark",
    sourceProductId: 14,
    brand: "Montechiaro",
    name: "Pully Dark",
    subtitle: "Signature Jacquard Knit",
    badge: { de: "Neu", en: "New" },
    category: "knitwear",
    images: [image("/shop/products/pully-dark/front.webp", 1122, 1402), image("/shop/products/pully-dark/side.webp", 1122, 1402)],
    colors: [{ name: "Dark Multicolor", hex: "#1f1f1d", image: "/shop/products/pully-dark/front.webp" }],
    slug: "pully-dark",
  },
  {
    id: "pully-blue",
    sourceProductId: 15,
    brand: "Montechiaro",
    name: "Pully Blue",
    subtitle: "Signature Jacquard Knit",
    badge: { de: "Neu", en: "New" },
    category: "knitwear",
    images: [image("/shop/products/pully-blue/front.webp", 1122, 1402), image("/shop/products/pully-blue/side.webp", 1122, 1402)],
    colors: [{ name: "Blue", hex: "#354b69", image: "/shop/products/pully-blue/front.webp" }],
    slug: "pully-blue",
  },
].map((featured) => {
  const product = PRODUCTS.find((item) => item.id === featured.sourceProductId);
  return { ...featured, name: product.name, price: product.price, sizes: product.sizes };
});
