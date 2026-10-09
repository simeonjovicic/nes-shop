// Editorial choices use the current catalogue and existing campaign imagery.
// Founder biographies and manufacturing claims need supplied source material.
export const BRANDS = [
  {
    id: "wai", name: "WAI", signature: "by Vehon", filter: "wai", index: "01",
    hero: "/shop/gallery/wai-ground.webp", position: "center",
    cardImage: "/shop/gallery/wai-stone-lounge.webp", cardPosition: "20% center",
    previewIds: [119, 123, 126],
    de: {
      category: "Textile Feel Shoes", title: "Wenig Schuh. Viel Gefühl.",
      intro: "Nahtloser Stoff, eine flexible, direkt aufgespritzte Sohle und sechs Formen für Sport, Zuhause und Reise. Designed and engineered in Italy.",
      imageAlt: "Blauer WAI Feel Shoe am Fuß auf einem Stein",
      cardAlt: "Blaue WAI Feel Shoes auf einer dunklen Holzbank neben einer Steinschale",
      story: "Denim, Baumwolle, Wolltextil oder feiner Stretch: Bei WAI verändert das Material den Ausdruck. Die leichte Konstruktion bleibt der gemeinsame Gedanke — vom flachen Mocassin bis zur knöchelhohen Form.",
      selection: "Alle WAI-Modelle",
    },
    en: {
      category: "Textile feel shoes", title: "Less shoe. More feeling.",
      intro: "Seamless fabric, a flexible over-injected sole and six shapes for sport, home and travel. Designed and engineered in Italy.",
      imageAlt: "Blue WAI feel shoe worn on a stone",
      cardAlt: "Blue WAI feel shoes on a dark wooden bench beside a stone bowl",
      story: "Denim, cotton, wool textile or fine stretch: each material gives WAI a different expression. A light construction connects them all, from the low moccasin to the ankle-high shape.",
      selection: "All WAI styles",
    },
  },
  {
    id: "vehon", name: "Vehon", signature: "Mocassini & Loafers", filter: "vehon-models", index: "02",
    hero: "/shop/featured/prince-loafer-editorial-v1.webp", position: "center 58%",
    previewIds: [7, 6, 8],
    de: {
      category: "Loafer, Mocassini & Pantofole", title: "Form mit Gelassenheit.",
      intro: "Klare Silhouetten, dunkle Töne und Materialien mit Tiefe. Vehon verbindet die Form des Loafers mit Strick und Velvet.",
      imageAlt: "Schwarze Vehon Prince Loafer mit grauer Hose auf einer hellen Steintreppe",
      story: "Beim Prince zeichnet das gestrickte Obermaterial die Form. Beim Duke und beim Velluto bestimmt Velvet die Oberfläche. Drei Modelle, deren Charakter sich beim genaueren Hinsehen zeigt.",
      selection: "Alle Vehon-Modelle",
    },
    en: {
      category: "Loafers, moccasins & slippers", title: "Shape with composure.",
      intro: "Clean silhouettes, dark tones and materials with depth. Vehon brings knit and velvet to the familiar loafer form.",
      imageAlt: "Black Vehon Prince loafers worn with grey trousers on pale stone steps",
      story: "On the Prince, the knitted upper defines the shape. On the Duke and Velluto, velvet gives the surface its character. Three styles that reward a closer look.",
      selection: "All Vehon styles",
    },
  },
  {
    id: "montechiaro", name: "Montechiaro", signature: "Italian Knitwear", filter: "montechiaro", index: "03",
    hero: "/shop/montechiaro-editorial.webp", position: "15% center",
    previewIds: [12, 13, 16],
    de: {
      category: "Jacquard & Italian Knitwear", title: "Strick, der etwas sagt.",
      intro: "Markante Muster, spürbare Struktur und Farbe mit eigener Haltung. Montechiaro gibt alltäglichen Kombinationen einen Mittelpunkt.",
      imageAlt: "Montechiaro Jacquard-Pullover in einer Cafészene",
      story: "Farb- und Musterbahnen laufen durch den Strick. Reliefartige Strukturen treffen auf klare Schnitte und gerippte Bündchen. Von Rosso bis Dark Blue bekommt jedes Modell seinen eigenen Rhythmus.",
      selection: "Alle Montechiaro-Modelle",
    },
    en: {
      category: "Jacquard & Italian knitwear", title: "Knitwear with a voice.",
      intro: "Distinctive patterns, tactile structure and colour with character. Montechiaro gives everyday combinations a focal point.",
      imageAlt: "Montechiaro jacquard knitwear in a café setting",
      story: "Bands of colour and pattern run through the knit. Sculptural textures meet clean cuts and ribbed trims. From Rosso to Dark Blue, each style has its own rhythm.",
      selection: "All Montechiaro styles",
    },
  },
];

export function getBrandForProduct(product) {
  return BRANDS.find(brand => brand.id === (product.familyId || product.brand === "WAI by Vehon" ? "wai" : product.brandId));
}

export function brandIdFromPath(pathname) {
  return pathname.match(/^\/brands\/([^/]+)\/?$/)?.[1] ?? null;
}
