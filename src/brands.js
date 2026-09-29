// Editorial choices use the current catalogue and existing campaign imagery.
// Founder biographies and manufacturing claims need supplied source material.
export const BRANDS = [
  {
    id: "wai", name: "WAI", signature: "by Vehon", filter: "wai", index: "01",
    hero: "/shop/gallery/wai-ground.webp", position: "center",
    detail: "/shop/gallery/wai-home-step.webp", detailPosition: "center",
    previewIds: [119, 123, 126],
    de: {
      category: "Textile Feel Shoes", title: "Wenig Schuh. Viel Gefühl.",
      intro: "Sehr dünner Stoff, eine flache, flexible Sohle und sechs unterschiedliche Formen. WAI bringt Leichtigkeit in den Alltag.",
      imageAlt: "Blauer WAI Feel Shoe am Fuß auf einem Stein", detailAlt: "WAI Feel Shoes in einem lichtdurchfluteten Innenraum",
      storyTitle: "Der Stoff gibt den Ton an.",
      story: "Denim, Baumwolle, Wolltextil oder feiner Stretch: Bei WAI verändert das Material den Ausdruck. Die leichte Konstruktion bleibt der gemeinsame Gedanke — vom flachen Mocassin bis zur knöchelhohen Form.",
      reason: "Wir mögen die Verbindung aus vertrauten Schuhformen und einer ungewöhnlich leichten Konstruktion. Zu markantem Strick setzt WAI einen ruhigen, unkomplizierten Gegenpol.",
      features: [["Dünner Stoff", "Weiches Obermaterial, das die textile Konstruktion sichtbar macht."], ["Flache Sohle", "Flexibel und auf eine schlanke Silhouette reduziert."], ["Sechs Formen", "Mocassin, Slip-on und High — jeweils auch als Sport-Modell."]],
      collection: "Sechs Formen. Ihr WAI.", selection: "Alle WAI-Modelle", note: "Farben, Stoffe und verfügbare Doppelgrößen finden Sie direkt am Modell.",
    },
    en: {
      category: "Textile feel shoes", title: "Less shoe. More feeling.",
      intro: "Very thin fabric, a flat, flexible sole and six distinct shapes. WAI brings lightness to the everyday.",
      imageAlt: "Blue WAI feel shoe worn on a stone", detailAlt: "WAI feel shoes in a sunlit interior",
      storyTitle: "Let the fabric speak.",
      story: "Denim, cotton, wool textile or fine stretch: each material gives WAI a different expression. A light construction connects them all, from the low moccasin to the ankle-high shape.",
      reason: "We like the pairing of familiar shoe shapes and an unusually light construction. Alongside expressive knitwear, WAI brings a quiet, easy balance.",
      features: [["Thin fabric", "Soft uppers that reveal the textile construction."], ["Flat sole", "Flexible and pared back to a slim silhouette."], ["Six shapes", "Moccasin, slip-on and high — each with a sport counterpart."]],
      collection: "Six shapes. Your WAI.", selection: "All WAI styles", note: "Explore colours, fabrics and available paired sizes within each style.",
    },
  },
  {
    id: "vehon", name: "Vehon", signature: "Mocassini & Loafers", filter: "vehon-models", index: "02",
    hero: "/shop/featured/prince-loafer-editorial-v1.webp", position: "center 58%",
    detail: "/shop/products/vehon-duke-velvet-side.webp", detailPosition: "center",
    previewIds: [7, 6, 8],
    de: {
      category: "Loafer, Mocassini & Pantofole", title: "Form mit Gelassenheit.",
      intro: "Klare Silhouetten, dunkle Töne und Materialien mit Tiefe. Vehon verbindet die Form des Loafers mit Strick und Velvet.",
      imageAlt: "Schwarze Vehon Prince Loafer mit grauer Hose auf einer hellen Steintreppe", detailAlt: "Seitliche Ansicht des Vehon Duke Velvet",
      storyTitle: "Ein leiser Auftritt.",
      story: "Beim Prince zeichnet das gestrickte Obermaterial die Form. Beim Duke und beim Velluto bestimmt Velvet die Oberfläche. Drei Modelle, deren Charakter sich beim genaueren Hinsehen zeigt.",
      reason: "Vehon ergänzt unsere Auswahl um klare, zurückhaltende Formen. Die dunklen Materialien lassen sich mit den Farben und Mustern von Montechiaro kombinieren.",
      features: [["Prince", "Die Loafer-Silhouette mit einem Obermaterial aus 3D-Strick."], ["Duke", "Ein Mocassino in Velvet mit weicher Oberflächenstruktur."], ["Velluto", "Eine reduzierte Pantofola in schwarzem Velvet."]],
      collection: "Drei eigene Charaktere.", selection: "Alle Vehon-Modelle", note: "Entdecken Sie die Materialien und Ansichten der einzelnen Modelle.",
    },
    en: {
      category: "Loafers, moccasins & slippers", title: "Shape with composure.",
      intro: "Clean silhouettes, dark tones and materials with depth. Vehon brings knit and velvet to the familiar loafer form.",
      imageAlt: "Black Vehon Prince loafers worn with grey trousers on pale stone steps", detailAlt: "Side view of the Vehon Duke Velvet",
      storyTitle: "A quiet presence.",
      story: "On the Prince, the knitted upper defines the shape. On the Duke and Velluto, velvet gives the surface its character. Three styles that reward a closer look.",
      reason: "Vehon brings clean, understated shapes to our selection. Its dark materials sit easily alongside Montechiaro’s colours and patterns.",
      features: [["Prince", "A loafer silhouette with a 3D-knitted upper."], ["Duke", "A velvet moccasin with a soft surface texture."], ["Velluto", "A pared-back slipper in black velvet."]],
      collection: "Three distinct characters.", selection: "All Vehon styles", note: "Explore the materials and individual views of each style.",
    },
  },
  {
    id: "montechiaro", name: "Montechiaro", signature: "Italian Knitwear", filter: "montechiaro", index: "03",
    hero: "/shop/montechiaro-editorial.webp", position: "15% center",
    detail: "/shop/products/pully-orange/texture.jpg", detailPosition: "center",
    previewIds: [12, 13, 16],
    de: {
      category: "Jacquard & Italian Knitwear", title: "Strick, der etwas sagt.",
      intro: "Markante Muster, spürbare Struktur und Farbe mit eigener Haltung. Montechiaro gibt alltäglichen Kombinationen einen Mittelpunkt.",
      imageAlt: "Montechiaro Jacquard-Pullover in einer Cafészene", detailAlt: "Nahaufnahme der farbigen Jacquard-Struktur des Pully Orange",
      storyTitle: "Charakter steckt im Detail.",
      story: "Farb- und Musterbahnen laufen durch den Strick. Reliefartige Strukturen treffen auf klare Schnitte und gerippte Bündchen. Von Rosso bis Dark Blue bekommt jedes Modell seinen eigenen Rhythmus.",
      reason: "Montechiaro bringt Farbe und Ausdruck ins Haus. Mit einem schlichten Schuh entsteht daraus genau die Balance, nach der wir bei NES auswählen.",
      features: [["Jacquard", "Muster und Struktur als Teil des gestrickten Materials."], ["Farbe", "Warme Rot- und Orangetöne neben ruhigen Blautönen."], ["Silhouette", "Gerade Schnitte mit gerippten Abschlüssen."]],
      collection: "Farbe für Ihren Alltag.", selection: "Alle Montechiaro-Modelle", note: "Finden Sie Ihr Muster und entdecken Sie die verfügbaren Größen.",
    },
    en: {
      category: "Jacquard & Italian knitwear", title: "Knitwear with a voice.",
      intro: "Distinctive patterns, tactile structure and colour with character. Montechiaro gives everyday combinations a focal point.",
      imageAlt: "Montechiaro jacquard knitwear in a café setting", detailAlt: "Close-up of the colourful jacquard structure of Pully Orange",
      storyTitle: "Character is in the detail.",
      story: "Bands of colour and pattern run through the knit. Sculptural textures meet clean cuts and ribbed trims. From Rosso to Dark Blue, each style has its own rhythm.",
      reason: "Montechiaro brings colour and expression into the house. Paired with a simple shoe, it creates the balance we look for at NES.",
      features: [["Jacquard", "Pattern and texture built into the knitted material."], ["Colour", "Warm reds and oranges alongside quieter blues."], ["Silhouette", "Straight cuts finished with ribbed trims."]],
      collection: "Colour for the everyday.", selection: "All Montechiaro styles", note: "Find your pattern and explore available sizes.",
    },
  },
];

export function getBrandForProduct(product) {
  return BRANDS.find(brand => brand.id === (product.familyId || product.brand === "WAI by Vehon" ? "wai" : product.brandId));
}

export function brandIdFromPath(pathname) {
  return pathname.match(/^\/brands\/([^/]+)\/?$/)?.[1] ?? null;
}
