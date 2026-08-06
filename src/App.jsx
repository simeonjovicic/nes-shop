import { useEffect, useMemo, useState } from "react";
import { ShaderBackground } from "./components/ui/shaders-hero-section";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    brand: "WAI by Vehon",
    brandId: "vehon",
    name: "WAI Home",
    subtitle: { de: "Indoor Feel Shoe", en: "Indoor feel shoe" },
    price: 169,
    color: { de: "Indigo", en: "Indigo" },
    material: "IVIVI Barefoot Textile",
    category: { de: "Feel Shoes", en: "Feel shoes" },
    image: "/wai_front.jpeg",
    hoverImage: "/wai_behind.jpeg",
    tag: { de: "Signature", en: "Signature" },
    fit: "cover",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description: {
      de: "Ein leichter Feel Shoe für Zuhause, das Studio und alle Momente dazwischen. Flexibel, atmungsaktiv und bewusst reduziert konstruiert.",
      en: "A lightweight feel shoe for home, the studio and every moment in between. Flexible, breathable and deliberately reduced.",
    },
  },
  {
    id: 2,
    brand: "WAI by Vehon",
    brandId: "vehon",
    name: "WAI Travel",
    subtitle: { de: "Packable Loafer", en: "Packable loafer" },
    price: 179,
    color: { de: "Deep Navy", en: "Deep navy" },
    material: "Flexible Textile Upper",
    category: { de: "Feel Shoes", en: "Feel shoes" },
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: { de: "Travel", en: "Travel" },
    fit: "cover",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description: {
      de: "Gemacht für Wege, Wartezeiten und leichte Routinen unterwegs. Die flexible Konstruktion lässt sich flach verstauen und bleibt stabil genug für den ganzen Tag.",
      en: "Made for journeys, waiting times and easy routines on the road. Its flexible construction packs flat while staying supportive all day.",
    },
  },
  {
    id: 3,
    brand: "WAI by Vehon",
    brandId: "vehon",
    name: "WAI Flex",
    subtitle: { de: "Barefoot Technology", en: "Barefoot technology" },
    price: 189,
    color: { de: "Blue Canvas", en: "Blue canvas" },
    material: "IVIVI Sole System",
    category: { de: "Feel Shoes", en: "Feel shoes" },
    image: "/wai2_front.jpeg",
    hoverImage: "/wai2_behind.jpeg",
    tag: { de: "Neu", en: "New" },
    fit: "cover",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    description: {
      de: "Die weiche, rollbare Sohle gibt dem Fuß Raum, ohne den Look eines klassischen Slippers zu verlieren. Ruhig im Ausdruck, technisch in der Substanz.",
      en: "The soft, rollable sole gives the foot room without losing the look of a classic slipper. Calm in expression, technical at heart.",
    },
  },
  {
    id: 4,
    brand: "WAI by Vehon",
    brandId: "vehon",
    name: "WAI Lounge",
    subtitle: { de: "Soft Everyday Slip-on", en: "Soft everyday slip-on" },
    price: 159,
    color: { de: "Washed Blue", en: "Washed blue" },
    material: "Soft-woven Textile",
    category: { de: "Feel Shoes", en: "Feel shoes" },
    image: "/wai3_front.jpeg",
    hoverImage: "/wai3_behind.jpeg",
    fit: "cover",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    description: {
      de: "Ein entspannter Slip-on für ruhige Innenräume, kurze Wege und Tage, an denen Komfort selbstverständlich sein soll.",
      en: "A relaxed slip-on for calm interiors, short walks and days when comfort should feel effortless.",
    },
  },
  {
    id: 5,
    brand: "Vehon",
    brandId: "vehon",
    name: "Duke Cervo",
    subtitle: { de: "Mocassino", en: "Moccasin" },
    price: 289,
    color: { de: "Nero", en: "Nero" },
    material: "Cervo Leather",
    category: { de: "Mocassini", en: "Moccasins" },
    image: "/shop/products/vehon-duke-cervo-front.webp",
    hoverImage: "/shop/products/vehon-duke-cervo-side.webp",
    tag: { de: "Handgemacht", en: "Handmade" },
    fit: "cover",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description: {
      de: "Der Duke aus genarbtem Cervo-Leder wird von Hand in Italien gefertigt. Ein Mocassino, der vom Wohnraum aufs Boot und durch den ganzen Tag trägt.",
      en: "The Duke in grained Cervo leather is handmade in Italy. A moccasin designed to move from home to deck and through the entire day.",
    },
  },
  {
    id: 6,
    brand: "Vehon",
    brandId: "vehon",
    name: "Duke Velvet",
    subtitle: { de: "Mocassino", en: "Moccasin" },
    price: 279,
    color: { de: "Nero", en: "Nero" },
    material: "Velvet",
    category: { de: "Mocassini", en: "Moccasins" },
    image: "/shop/products/vehon-duke-velvet-front.webp",
    hoverImage: "/shop/products/vehon-duke-velvet-side.webp",
    fit: "cover",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description: {
      de: "Samtweicher Auftritt mit fester Haltung: der Duke in Velvet, mit eigens entwickelter Sohle für Halt, Leichtigkeit und Ruhe.",
      en: "A velvet-soft entrance with composure: the Duke in velvet, finished with a custom sole for grip, lightness and ease.",
    },
  },
  {
    id: 7,
    brand: "Vehon",
    brandId: "vehon",
    name: "Prince Loafer",
    subtitle: { de: "Tech-knit Loafer", en: "Tech-knit loafer" },
    price: 259,
    color: { de: "Nero", en: "Nero" },
    material: "3D Knit",
    category: { de: "Mocassini", en: "Moccasins" },
    image: "/shop/products/vehon-prince-front.webp",
    hoverImage: "/shop/products/vehon-prince-side.webp",
    tag: { de: "Neu", en: "New" },
    fit: "cover",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description: {
      de: "Der Prince verbindet die Silhouette des klassischen Loafers mit gestricktem Obermaterial: leicht, flexibel und vollständig Made in Italy.",
      en: "The Prince combines a classic loafer silhouette with a knitted upper: light, flexible and entirely made in Italy.",
    },
  },
  {
    id: 8,
    brand: "Vehon",
    brandId: "vehon",
    name: "Velluto Nero",
    subtitle: { de: "Pantofola", en: "Velvet slipper" },
    price: 249,
    color: { de: "Nero", en: "Nero" },
    material: "Velvet",
    category: { de: "Pantofole", en: "Slippers" },
    image: "/shop/products/vehon-velluto-front.webp",
    hoverImage: "/shop/products/vehon-velluto-side.webp",
    fit: "cover",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description: {
      de: "Die Pantofola für drinnen: Velvet, cleaner Spann und die Ruhe von Cashmere-Decken und Marmorböden.",
      en: "The indoor pantofola: velvet, a clean vamp and the quiet luxury of cashmere throws and marble floors.",
    },
  },
  {
    id: 9,
    brand: "Loungers",
    brandId: "loungers",
    name: "Driver Brown",
    subtitle: { de: "Italian Driving Loafer", en: "Italian driving loafer" },
    price: 229,
    color: { de: "Cognac", en: "Cognac" },
    material: "Soft Nappa Leather",
    category: { de: "Loafers", en: "Loafers" },
    image: "/shop/products/loungers-driver-brown-front.webp",
    hoverImage: "/shop/products/loungers-driver-brown-side.webp",
    tag: { de: "Neu bei NES", en: "New at NES" },
    fit: "cover",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description: {
      de: "Ein weich konstruierter Driving Loafer aus italienischem Nappaleder. Leicht am Fuß, präzise von Hand vollendet und für lange Tage gemacht.",
      en: "A softly constructed driving loafer in Italian nappa leather. Light on the foot, finished by hand and made for long days.",
    },
  },
  {
    id: 11,
    brand: "Loungers",
    brandId: "loungers",
    name: "Bordeaux Ease",
    subtitle: { de: "Velvet Leisure Loafer", en: "Velvet leisure loafer" },
    price: 219,
    color: { de: "Bordeaux", en: "Bordeaux" },
    material: "Cotton Velvet",
    category: { de: "Loafers", en: "Loafers" },
    image: "/shop/products/loungers-bordeaux-front.webp",
    hoverImage: "/shop/products/loungers-bordeaux-side.webp",
    fit: "cover",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description: {
      de: "Ein unkomplizierter Velvet Loafer mit weicher Linie und markanter Farbe — geschaffen für Reisen und Momente außerhalb der Routine.",
      en: "An effortless velvet loafer with a soft line and a distinctive colour, designed for travel and moments outside the ordinary.",
    },
  },
  {
    id: 12,
    brand: "Montechiaro",
    brandId: "montechiaro",
    name: "Pully Rosso",
    subtitle: { de: "Signature Knit Pullover", en: "Signature knit pullover" },
    price: 219,
    color: { de: "Rosso", en: "Rosso" },
    material: "Heavy Jacquard Knit",
    category: { de: "Strick", en: "Knitwear" },
    image: "/shop/pully-red-front.webp",
    hoverImage: "/shop/pully-red-side.webp",
    tag: { de: "Statement Knit", en: "Statement knit" },
    fit: "contain",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: {
      de: "Schwerer Jacquard-Strick mit reliefartiger Struktur, geradem Schnitt und gerippten Bündchen. Ein italienisches Statement-Piece mit Haltung.",
      en: "Heavy jacquard knit with sculptural texture, a straight fit and ribbed trims. An Italian statement piece with composure.",
    },
  },
];

const BRAND_WORLDS = [
  {
    id: "vehon",
    index: "01",
    name: "Vehon / WAI",
    category: { de: "Feel Shoes & Mocassini", en: "Feel shoes & moccasins" },
    note: {
      de: "Natürliche Bewegung trifft italienische Form.",
      en: "Natural movement meets Italian form.",
    },
    image: "/shop/hero-wai-sunset.webp",
    position: "58% center",
    className: "brand-world-wide",
  },
  {
    id: "loungers",
    index: "02",
    name: "Loungers",
    category: { de: "Leisure Loafers", en: "Leisure loafers" },
    note: {
      de: "Easy luxury, handgemacht in Italien.",
      en: "Easy luxury, handmade in Italy.",
    },
    image: "/shop/loungers-cliff.webp",
    position: "center 58%",
    className: "brand-world-tall",
  },
  {
    id: "montechiaro",
    index: "03",
    name: "Montechiaro",
    category: { de: "Italian Knitwear", en: "Italian knitwear" },
    note: {
      de: "Dressed down. Never plain.",
      en: "Dressed down. Never plain.",
    },
    image: "/shop/montechiaro-editorial.webp",
    position: "42% center",
    className: "brand-world-wide brand-world-dark",
  },
  {
    id: "green",
    index: "04",
    name: "Green Comfort",
    category: { de: "Danish Foot Health", en: "Danish foot health" },
    note: {
      de: "Weite Passformen und EnergySole™ Komfort.",
      en: "Wide fits and EnergySole™ comfort.",
    },
    logo: "/logos/greencomfort.svg?v=official",
    className: "brand-world-green",
    upcoming: true,
  },
];

const CATALOG_LINEUPS = [
  { id: "wai", index: "01", filter: "vehon", image: "/shop/collections/wai-lineup-v1.webp" },
  { id: "vehon", index: "02", filter: "vehon", image: "/shop/collections/vehon-lineup-v1.webp" },
  { id: "loungers", index: "03", filter: "loungers", image: "/shop/loungers-banner.webp" },
];

const GALLERY_IMAGES = [
  { src: "/shop/gallery/loungers-clouds.webp", brand: "Loungers" },
  { src: "/shop/gallery/wai-ground.webp", brand: "WAI" },
  { src: "/shop/gallery/montechiaro-statement.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/loungers-forest.webp", brand: "Loungers" },
  { src: "/shop/gallery/wai-home-step.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-bordeaux-beach.webp", brand: "Loungers" },
  { src: "/shop/gallery/montechiaro-kitchen.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-coast.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-zen.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-stitching.webp", brand: "Loungers" },
  { src: "/shop/gallery/wai-sunset.webp", brand: "WAI" },
  { src: "/shop/gallery/montechiaro-work.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-poolside.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-temple.webp", brand: "Loungers" },
  { src: "/shop/gallery/wai-stream.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-oldtimer.webp", brand: "Loungers" },
  { src: "/shop/gallery/wai-tea.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-breathe.webp", brand: "Loungers" },
  { src: "/shop/gallery/montechiaro-detail.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-beach-step.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-curtain.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-slow-living.webp", brand: "Loungers" },
  { src: "/shop/gallery/wai-warm-sand.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-stone-lounge.webp", brand: "WAI" },
  { src: "/shop/gallery/loungers-imperfection.webp", brand: "Loungers" },
  { src: "/shop/gallery/loungers-bangkok.webp", brand: "Loungers" },
];

const FEATURED_IDS = [9, 1, 12, 5];

const OCCASION_CONFIG = [
  {
    id: "home",
    index: "01",
    image: "/shop/gallery/wai-home-step.webp",
    productIds: [1, 4],
  },
  {
    id: "travel",
    index: "02",
    image: "/shop/gallery/wai-sunset.webp",
    productIds: [2, 5],
  },
  {
    id: "statement",
    index: "03",
    image: "/shop/pully-red-side.webp",
    productIds: [12, 6],
    productVisual: true,
  },
];

const COPY = {
  de: {
    announcement: "Ausgewählte Marken · natürliche Bewegung · gutes Design",
    nav: { shop: "Shop", new: "Neu", brands: "Marken", about: "Über NES", search: "Suche", bag: "Warenkorb", menu: "Menü", close: "Schließen" },
    hero: {
      eyebrow: "Curated footwear & everyday pieces",
      title: "Natürlich bewegen. Besser ankommen.",
      body: "Ausgewählte Marken für Komfort, Handwerk und modernes Design — für jeden Schritt im Alltag.",
      primary: "Kollektion entdecken",
      secondary: "Unsere Marken",
      campaign: "Vehon / WAI · Feel Shoes",
    },
    intro: {
      label: "Das NES Prinzip",
      title: "Weniger suchen. Besser auswählen.",
      text: "NES bringt eigenständige Marken an einen Ort — kuratiert nach Komfort, Material und einer Form, die auch morgen noch richtig wirkt.",
    },
    featured: { label: "Neu im Haus", title: "Ausgewählt für jetzt.", all: "Alle Produkte" },
    brands: { label: "Die Marken", title: "Ein Haus. Drei Handschriften.", open: "Kollektion ansehen", soon: "Kollektion folgt" },
    look: {
      label: "NES / Shop the look",
      title: "Ein Look. Zwei Handschriften.",
      body: "Montechiaro-Strick trifft WAI Feel Shoe. Entdecken Sie die markierten Produkte direkt im Bild.",
      hint: "Punkte antippen und Produkt ansehen",
      open: "Produkt ansehen",
      alt: "Model im Pully Rosso von Montechiaro und blauen WAI Home Feel Shoes",
    },
    occasions: {
      label: "Nach Anlass entdecken",
      title: "Was passt zu Ihrem Tag?",
      intro: "Drei Stimmungen, bewusst kuratiert — vom ruhigen Morgen bis zum Auftritt am Abend.",
      cta: "Gesamte Kollektion ansehen",
      productsLabel: "Passende Auswahl",
      items: {
        home: {
          tab: "Zuhause",
          eyebrow: "Leicht & entspannt",
          title: "Ruhe beginnt beim ersten Schritt.",
          body: "Weiche Konstruktionen, flexible Sohlen und Materialien, die sich vom ersten Moment an selbstverständlich anfühlen.",
          alt: "WAI Feel Shoes in einem hellen Wohnraum",
        },
        travel: {
          tab: "Unterwegs",
          eyebrow: "Reise & Alltag",
          title: "Leicht bleiben, wenn der Tag weitergeht.",
          body: "Reduzierte Formen für Wege, Termine und spontane Umwege — komfortabel, ohne nach Komfort auszusehen.",
          alt: "WAI Feel Shoes bei Sonnenuntergang am Meer",
        },
        statement: {
          tab: "Statement",
          eyebrow: "Farbe & Charakter",
          title: "Ein Stück, das den Ton angibt.",
          body: "Markanter Strick und präzise Loafer für Momente, in denen Zurückhaltung trotzdem Haltung zeigen darf.",
          alt: "Pully Rosso von Montechiaro",
        },
      },
    },
    gallery: { label: "NES / Bildarchiv", title: "Bewegung in Bildern.", intro: "Weitere Motive aus Alltag, Reise, Material und Ruhe — gesammelt als visuelles Archiv der Kollektionen.", aria: "Visuelles Archiv", imageAlt: "Editorialaufnahme von" },
    editorial: {
      label: "Die Idee · Natürlich bewegen",
      title: "Barfuß ist der Anfang.",
      body: "Bevor Schuhe Haltung zeigten, gaben Füße den Rhythmus vor. Raum für die Zehen, Nähe zum Boden und Bewegung ohne Umweg — nach diesem Gefühl wählen wir unsere Kollektionen aus.",
      cta: "Weitere Bilder ansehen",
      alt: "Flexibler Feel Shoe in einem ruhigen Wohnraum",
    },
    standard: { label: "Der NES Maßstab", title: "Gute Dinge beginnen beim Material.", body: "Wir wählen Marken, deren Komfort konstruiert, nicht behauptet wird. Präzise Materialien, durchdachte Sohlen und Handwerk, das man im Alltag spürt.", points: [["01", "Material", "Texturen mit Funktion und Charakter."], ["02", "Handwerk", "Präzise Konstruktion statt kurzlebiger Effekte."], ["03", "Bewegung", "Formen, die den Alltag begleiten."]], cta: "Das Sortiment entdecken" },
    trade: { label: "Für Händler & Marken", title: "Interesse an unseren Kollektionen?", body: "Sortiment, Konditionen oder ein persönlicher Termin — wir sprechen gerne mit Ihnen.", cta: "Partneranfrage" },
    shop: {
      breadcrumb: "NES / Shop",
      title: "Die Kollektion",
      intro: "Feel Shoes, italienische Loafer und charakterstarker Strick — ausgewählt für Komfort, Bewegung und Alltag.",
      all: "Alle",
      products: "Produkte",
      product: "Produkt",
      searchLabel: "Suche",
      searchPlaceholder: "Produkt oder Marke suchen",
      sortLabel: "Sortieren",
      featured: "Empfohlen",
      priceAsc: "Preis: aufsteigend",
      priceDesc: "Preis: absteigend",
      name: "Name: A–Z",
      noResults: "Keine Produkte gefunden.",
      noResultsBody: "Versuchen Sie einen anderen Suchbegriff oder wechseln Sie die Marke.",
      upcomingTitle: "Green Comfort kommt ins Sortiment.",
      upcomingBody: "Die erste Auswahl wird gerade zusammengestellt. Entdecken Sie bis dahin die übrigen Marken im Haus.",
      showAll: "Alle Produkte zeigen",
      lineups: {
        label: "NES / Markenkatalog",
        title: "Drei Linien. Zehn Modelle.",
        intro: "WAI, Vehon und Loungers — jeweils als vollständige Kollektion.",
        items: {
          wai: { meta: "04 Modelle · Feel Shoes", title: "WAI by Vehon", body: "Vier textile Feel Shoes für natürliche Bewegung, Reise und Alltag.", cta: "WAI ansehen" },
          vehon: { meta: "04 Modelle · Made in Italy", title: "Vehon", body: "Mocassini, Velvet und Tech-knit in vier eigenständigen Konstruktionen.", cta: "Vehon ansehen" },
          loungers: { meta: "02 Modelle · Leisure Loafers", title: "Loungers", body: "Zwei leichte Loafer zwischen italienischem Handwerk, Reise und entspannter Eleganz.", cta: "Loungers ansehen" },
        },
      },
    },
    product: { view: "ansehen", chooseSize: "Größe wählen", guide: "Größenberatung", add: "In den Warenkorb", chooseFirst: "Bitte Größe wählen", back: "Zurück zur Kollektion", material: "Material", color: "Farbe", delivery: "Versand", deliveryValue: "Wird im Checkout berechnet", returns: "Rückgabe", returnsValue: "14 Tage", added: "Zum Warenkorb hinzugefügt" },
    bag: { title: "Warenkorb", empty: "Ihr Warenkorb ist leer.", shop: "Zum Shop", size: "Größe", subtotal: "Zwischensumme", note: "Versand und Steuern werden im Checkout berechnet.", checkout: "Weiter zum Checkout", checkoutSoon: "Der Checkout wird im nächsten Schritt angebunden." },
    newsletter: { label: "Notes from the house", title: "Neue Modelle, Materialien und Geschichten.", body: "Ein ruhiges Update, wenn es etwas Neues zu entdecken gibt.", placeholder: "Ihre E-Mail-Adresse", submit: "Eintragen", loading: "Wird eingetragen…", success: "Bitte prüfen Sie Ihr Postfach.", invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.", error: "Das hat leider nicht funktioniert. Bitte versuchen Sie es erneut.", privacy: "Mit Ihrer Anmeldung stimmen Sie dem Newsletter zu. Jederzeit widerrufbar.", privacyLink: "Datenschutz" },
    services: [["01", "Kuratierte Auswahl", "Nur Marken, die zum NES Maßstab passen.", "Kollektion ansehen"], ["02", "14 Tage Rückgabe", "Fragen zu Rückgabe, Versand oder Bestellung? Wir helfen.", "Service anfragen"], ["03", "Persönliche Beratung", "Hilfe bei Modell, Material und Größe.", "Beratung starten"]],
    serviceForms: {
      name: "Name",
      email: "E-Mail",
      message: "Ihre Nachricht",
      consent: "Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.",
      sending: "Wird gesendet…",
      invalid: "Bitte füllen Sie Name, E-Mail, Nachricht und Zustimmung aus.",
      error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      advice: { eyebrow: "NES / Beratung", title: "Was passt zu Ihnen?", body: "Nennen Sie uns Ihr Wunschmodell, Ihre übliche Größe und was Ihnen bei einem Schuh wichtig ist. Wir melden uns persönlich mit einer Empfehlung.", detail: "Modell oder Marke (optional)", submit: "Beratung anfragen", successTitle: "Anfrage erhalten.", successBody: "Vielen Dank. Wir schauen uns Ihre Angaben an und melden uns persönlich zurück." },
      returns: { eyebrow: "NES / Service", title: "Rückgabe & Versand", body: "Sie möchten etwas zurückgeben oder haben eine Frage zu Versand oder Bestellung? Schreiben Sie uns kurz – idealerweise mit Ihrer Bestellnummer.", detail: "Bestellnummer (optional)", submit: "Service anfragen", successTitle: "Wir kümmern uns darum.", successBody: "Ihre Anfrage ist angekommen. Wir melden uns mit den nächsten Schritten zurück." },
    },
    tradeForm: { title: "Partner werden", body: "Erzählen Sie uns kurz, worum es geht. Wir melden uns persönlich zurück.", name: "Name", company: "Unternehmen", email: "E-Mail", message: "Nachricht", consent: "Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.", submit: "Anfrage senden", sending: "Wird gesendet…", successTitle: "Vielen Dank.", successBody: "Ihre Anfrage ist angekommen. Wir melden uns in Kürze.", invalid: "Bitte füllen Sie Name, E-Mail und Zustimmung aus.", error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
    footer: { about: "Ein kuratiertes Haus für Schuhe, Strick und Dinge, die sich gut anfühlen.", collections: "Kollektionen", service: "Service", advice: "Persönliche Beratung", returns: "Rückgabe & Versand", house: "Das Haus", contact: "Kontakt & Händler", privacy: "Datenschutz", imprint: "Impressum", country: "Deutschland / EUR" },
    legalBack: "Zurück",
  },
  en: {
    announcement: "Selected brands · natural movement · considered design",
    nav: { shop: "Shop", new: "New", brands: "Brands", about: "About NES", search: "Search", bag: "Bag", menu: "Menu", close: "Close" },
    hero: {
      eyebrow: "Curated footwear & everyday pieces",
      title: "Move naturally. Arrive better.",
      body: "Selected brands for comfort, craft and modern design — made for every step of everyday life.",
      primary: "Discover the collection",
      secondary: "Our brands",
      campaign: "Vehon / WAI · Feel Shoes",
    },
    intro: { label: "The NES principle", title: "Search less. Choose better.", text: "NES brings distinct brands together in one place — curated for comfort, material and forms that will still feel right tomorrow." },
    featured: { label: "New in the house", title: "Selected for now.", all: "View all products" },
    brands: { label: "The brands", title: "One house. Three signatures.", open: "View collection", soon: "Collection coming soon" },
    look: {
      label: "NES / Shop the look",
      title: "One look. Two signatures.",
      body: "Montechiaro knitwear meets the WAI feel shoe. Discover the marked products directly in the image.",
      hint: "Tap a point to view the product",
      open: "View product",
      alt: "Model wearing the Montechiaro Pully Rosso and blue WAI Home feel shoes",
    },
    occasions: {
      label: "Shop by occasion",
      title: "What suits your day?",
      intro: "Three considered moods — from a quiet morning to an evening with presence.",
      cta: "View the full collection",
      productsLabel: "Selected for the moment",
      items: {
        home: {
          tab: "At home",
          eyebrow: "Light & relaxed",
          title: "Ease begins with the first step.",
          body: "Soft construction, flexible soles and materials that feel natural from the very first moment.",
          alt: "WAI feel shoes in a light-filled interior",
        },
        travel: {
          tab: "On the move",
          eyebrow: "Travel & everyday",
          title: "Stay light when the day keeps moving.",
          body: "Reduced forms for journeys, appointments and spontaneous detours — comfortable without looking like comfort wear.",
          alt: "WAI feel shoes by the sea at sunset",
        },
        statement: {
          tab: "Statement",
          eyebrow: "Colour & character",
          title: "One piece sets the tone.",
          body: "Distinctive knitwear and precise loafers for moments when restraint can still show character.",
          alt: "Montechiaro Pully Rosso",
        },
      },
    },
    gallery: { label: "NES / Image archive", title: "Movement in pictures.", intro: "More scenes from everyday life, travel, material and quiet moments — collected as a visual archive of the collections.", aria: "Visual archive", imageAlt: "Editorial image by" },
    editorial: {
      label: "The idea · Natural movement",
      title: "Barefoot is where it begins.",
      body: "Before shoes made a statement, feet set the rhythm. Room for the toes, closeness to the ground and movement without detours — that is the feeling behind every collection we choose.",
      cta: "View more images",
      alt: "A flexible feel shoe in a calm living space",
    },
    standard: { label: "The NES standard", title: "Good things begin with material.", body: "We select brands whose comfort is constructed, not claimed. Precise materials, considered soles and craft you can feel every day.", points: [["01", "Material", "Textures with function and character."], ["02", "Craft", "Precise construction over short-lived effects."], ["03", "Movement", "Forms designed to accompany everyday life."]], cta: "Discover the collection" },
    trade: { label: "For retailers & brands", title: "Interested in our collections?", body: "Range, terms or a personal appointment — we would be happy to talk.", cta: "Partner enquiry" },
    shop: {
      breadcrumb: "NES / Shop",
      title: "The collection",
      intro: "Feel shoes, Italian loafers and distinctive knitwear — selected for comfort, movement and everyday life.",
      all: "All",
      products: "Products",
      product: "Product",
      searchLabel: "Search",
      searchPlaceholder: "Search product or brand",
      sortLabel: "Sort",
      featured: "Featured",
      priceAsc: "Price: low to high",
      priceDesc: "Price: high to low",
      name: "Name: A–Z",
      noResults: "No products found.",
      noResultsBody: "Try another search term or choose a different brand.",
      upcomingTitle: "Green Comfort is joining the collection.",
      upcomingBody: "The first edit is being prepared. In the meantime, discover the other brands in the house.",
      showAll: "Show all products",
      lineups: {
        label: "NES / Brand catalogue",
        title: "Three lines. Ten models.",
        intro: "WAI, Vehon and Loungers — each shown as a complete collection.",
        items: {
          wai: { meta: "04 models · Feel shoes", title: "WAI by Vehon", body: "Four textile feel shoes made for natural movement, travel and everyday life.", cta: "View WAI" },
          vehon: { meta: "04 models · Made in Italy", title: "Vehon", body: "Moccasins, velvet and technical knit across four distinct constructions.", cta: "View Vehon" },
          loungers: { meta: "02 models · Leisure loafers", title: "Loungers", body: "Two lightweight loafers balancing Italian craft, travel and relaxed elegance.", cta: "View Loungers" },
        },
      },
    },
    product: { view: "view", chooseSize: "Choose size", guide: "Size guide", add: "Add to bag", chooseFirst: "Please choose a size", back: "Back to collection", material: "Material", color: "Colour", delivery: "Delivery", deliveryValue: "Calculated at checkout", returns: "Returns", returnsValue: "14 days", added: "Added to your bag" },
    bag: { title: "Bag", empty: "Your bag is empty.", shop: "Go to shop", size: "Size", subtotal: "Subtotal", note: "Delivery and taxes are calculated at checkout.", checkout: "Continue to checkout", checkoutSoon: "Checkout will be connected in the next step." },
    newsletter: { label: "Notes from the house", title: "New models, materials and stories.", body: "A considered update whenever there is something new to discover.", placeholder: "Your email address", submit: "Join the list", loading: "Joining…", success: "Please check your inbox.", invalid: "Please enter a valid email address.", error: "Something went wrong. Please try again.", privacy: "By joining, you consent to the newsletter. Unsubscribe at any time.", privacyLink: "Privacy" },
    services: [["01", "Curated selection", "Only brands that meet the NES standard.", "View collection"], ["02", "14-day returns", "Questions about returns, shipping or an order? We can help.", "Ask service"], ["03", "Personal advice", "Help with style, material and sizing.", "Start consultation"]],
    serviceForms: {
      name: "Name",
      email: "Email",
      message: "Your message",
      consent: "I consent to my details being processed to handle this enquiry.",
      sending: "Sending…",
      invalid: "Please complete your name, email, message and consent.",
      error: "The enquiry could not be sent. Please try again.",
      advice: { eyebrow: "NES / Advice", title: "What suits you?", body: "Tell us which style you are considering, your usual size and what matters to you in a shoe. We will reply personally with a recommendation.", detail: "Style or brand (optional)", submit: "Request advice", successTitle: "Enquiry received.", successBody: "Thank you. We will review your details and get back to you personally." },
      returns: { eyebrow: "NES / Service", title: "Returns & shipping", body: "Would you like to return an item or ask about shipping or an order? Send us a short note, ideally including your order number.", detail: "Order number (optional)", submit: "Ask service", successTitle: "We are on it.", successBody: "Your enquiry has arrived. We will reply with the next steps." },
    },
    tradeForm: { title: "Become a partner", body: "Tell us briefly what you are looking for. We will get back to you personally.", name: "Name", company: "Company", email: "Email", message: "Message", consent: "I consent to my details being processed to handle this enquiry.", submit: "Send enquiry", sending: "Sending…", successTitle: "Thank you.", successBody: "Your enquiry has arrived. We will be in touch shortly.", invalid: "Please complete your name, email and consent.", error: "The enquiry could not be sent. Please try again." },
    footer: { about: "A curated house for shoes, knitwear and things that simply feel good.", collections: "Collections", service: "Service", advice: "Personal advice", returns: "Returns & shipping", house: "The house", contact: "Contact & wholesale", privacy: "Privacy", imprint: "Legal notice", country: "Germany / EUR" },
    legalBack: "Back",
  },
};

const LEGAL = {
  de: {
    privacy: {
      title: "Datenschutzerklärung",
      intro: "Wir behandeln personenbezogene Daten vertraulich und gemäß der DSGVO.",
      blocks: [
        ["Verantwortlicher", "[Firmenname] · [Anschrift] · [E-Mail-Adresse]"],
        ["Hosting", "Diese Website wird bei Cloudflare Pages gehostet. Beim Aufruf werden technische Zugriffsdaten für den sicheren und stabilen Betrieb verarbeitet."],
        ["Newsletter", "Für den Newsletter speichern wir E-Mail-Adresse, Zeitpunkt und Einwilligung. Der Versand erfolgt über Resend und kann jederzeit widerrufen werden."],
        ["Anfragen", "Angaben aus dem Anfrageformular werden ausschließlich zur Bearbeitung der Anfrage verarbeitet und nach Abschluss im Rahmen der gesetzlichen Vorgaben gelöscht."],
        ["Ihre Rechte", "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde."],
      ],
      note: "Vorlage — bitte vor Veröffentlichung mit den vollständigen Unternehmensdaten ergänzen und rechtlich prüfen lassen.",
    },
    imprint: {
      title: "Impressum",
      intro: "Angaben gemäß den geltenden Informationspflichten.",
      blocks: [["Anbieter", "[Firmenname] · [Rechtsform] · [Anschrift]"], ["Kontakt", "E-Mail: [E-Mail-Adresse] · Telefon: [Telefonnummer]"], ["Vertretungsberechtigt", "[Name der vertretungsberechtigten Person]"], ["Register & Umsatzsteuer", "[Registergericht / Registernummer] · [USt-IdNr.]"]],
      note: "Vorlage — bitte vor Veröffentlichung vollständig ergänzen und rechtlich prüfen lassen.",
    },
  },
  en: {
    privacy: {
      title: "Privacy policy",
      intro: "We handle personal data confidentially and in accordance with the GDPR.",
      blocks: [["Controller", "[Company name] · [Address] · [Email address]"], ["Hosting", "This website is hosted on Cloudflare Pages. Technical access data is processed to provide a secure and stable service."], ["Newsletter", "For the newsletter we store your email address, time and consent. Delivery is handled by Resend and consent can be withdrawn at any time."], ["Enquiries", "Information submitted through the enquiry form is used exclusively to handle the enquiry and deleted in accordance with statutory requirements."], ["Your rights", "You have rights to access, rectification, erasure, restriction, portability and objection, as well as the right to lodge a complaint with a supervisory authority."]],
      note: "Template — complete with the company details and obtain legal review before publication.",
    },
    imprint: {
      title: "Legal notice",
      intro: "Information in accordance with applicable disclosure obligations.",
      blocks: [["Provider", "[Company name] · [Legal form] · [Address]"], ["Contact", "Email: [Email address] · Phone: [Phone number]"], ["Authorised representative", "[Name of authorised representative]"], ["Register & VAT", "[Register / registration number] · [VAT ID]"]],
      note: "Template — complete all details and obtain legal review before publication.",
    },
  },
};

function localize(value, language) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value[language]
    : value;
}

function formatPrice(value, language) {
  return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInitialLanguage() {
  if (typeof window === "undefined") return "de";
  const saved = window.localStorage.getItem("nes-language");
  return saved === "en" ? "en" : "de";
}

function routeFromLocation() {
  if (window.location.pathname.startsWith("/shop")) return "shop";
  if (window.location.pathname.startsWith("/brands")) return "brands";
  if (window.location.pathname.startsWith("/gallery")) return "gallery";
  return "home";
}

function filterFromLocation() {
  const requested = new URLSearchParams(window.location.search).get("brand");
  return BRAND_WORLDS.some((brand) => brand.id === requested) ? requested : "all";
}

function getInitialBag() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem("nes-bag") || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item) => PRODUCTS.some((product) => product.id === item.productId))
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [route, setRoute] = useState(routeFromLocation);
  const [filter, setFilter] = useState(filterFromLocation);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [activeProductId, setActiveProductId] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [bag, setBag] = useState(getInitialBag);
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(null);
  const [legalOpen, setLegalOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState("");

  const copy = COPY[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    const handlePopState = () => {
      setRoute(routeFromLocation());
      setFilter(filterFromLocation());
      setActiveProductId(null);
      setBagOpen(false);
      setMobileOpen(false);
      setTradeOpen(false);
      setServiceOpen(null);
      window.scrollTo(0, 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("reveal-ready");
      return undefined;
    }

    root.classList.add("reveal-ready");
    let observer;
    const frame = window.requestAnimationFrame(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

      document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
          element.classList.add("is-revealed");
        } else {
          observer.observe(element);
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("nes-language", language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem("nes-bag", JSON.stringify(bag));
  }, [bag]);

  useEffect(() => {
    const locked = Boolean(activeProductId || bagOpen || mobileOpen || tradeOpen || serviceOpen || legalOpen);
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeProductId, bagOpen, mobileOpen, tradeOpen, serviceOpen, legalOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      setActiveProductId(null);
      setBagOpen(false);
      setMobileOpen(false);
      setTradeOpen(false);
      setServiceOpen(null);
      setLegalOpen(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = PRODUCTS.filter((product) => {
      const matchesBrand = filter === "all" || product.brandId === filter;
      const haystack = `${product.brand} ${product.name} ${localize(product.subtitle, language)} ${product.material}`.toLowerCase();
      return matchesBrand && (!query || haystack.includes(query));
    });
    return [...matches].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [filter, search, sort, language]);

  const activeProduct = PRODUCTS.find((product) => product.id === activeProductId) || null;
  const bagCount = bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = bag.reduce((sum, item) => {
    const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  function navigateHome(section) {
    setRoute("home");
    setMobileOpen(false);
    setActiveProductId(null);
    window.history.pushState({}, "", "/");
    window.setTimeout(() => {
      if (section) document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 30);
  }

  function navigateShop(brand = "all") {
    setRoute("shop");
    setFilter(brand);
    setSearch("");
    setMobileOpen(false);
    setActiveProductId(null);
    const query = brand === "all" ? "" : `?brand=${brand}`;
    window.history.pushState({}, "", `/shop${query}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateBrands() {
    setRoute("brands");
    setMobileOpen(false);
    setActiveProductId(null);
    window.history.pushState({}, "", "/brands");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateGallery() {
    setRoute("gallery");
    setMobileOpen(false);
    setActiveProductId(null);
    window.history.pushState({}, "", "/gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateFilter(brand) {
    setFilter(brand);
    const query = brand === "all" ? "" : `?brand=${brand}`;
    window.history.replaceState({}, "", `/shop${query}`);
  }

  function focusSearch() {
    if (route !== "shop") navigateShop("all");
    window.setTimeout(() => document.getElementById("catalog-search")?.focus(), 80);
  }

  function openProduct(productId) {
    setSelectedSize("");
    setActiveProductId(productId);
  }

  function addToBag(productId, size) {
    setBag((current) => {
      const existingIndex = current.findIndex((item) => item.productId === productId && item.size === size);
      if (existingIndex === -1) return [...current, { productId, size, qty: 1 }];
      return current.map((item, index) => index === existingIndex ? { ...item, qty: item.qty + 1 } : item);
    });
    setActiveProductId(null);
    setToast(copy.product.added);
    setBagOpen(true);
  }

  function updateBagItem(index, delta) {
    setBag((current) => current
      .map((item, itemIndex) => itemIndex === index ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0));
  }

  return (
    <div className="site-shell is-ready">
      <Header
        route={route}
        copy={copy}
        language={language}
        bagCount={bagCount}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((value) => !value)}
        onLanguage={() => setLanguage((value) => value === "de" ? "en" : "de")}
        onHome={navigateHome}
        onShop={navigateShop}
        onBrands={navigateBrands}
        onSearch={focusSearch}
        onBag={() => setBagOpen(true)}
      />

      {route === "home" ? (
        <HomePage
          copy={copy}
          language={language}
          onShop={navigateShop}
          onGallery={navigateGallery}
          onOpen={openProduct}
          onTrade={() => setTradeOpen(true)}
          onService={setServiceOpen}
          onPrivacy={() => setLegalOpen("privacy")}
        />
      ) : route === "brands" ? (
        <BrandsPage copy={copy} onShop={navigateShop} onService={setServiceOpen} />
      ) : route === "gallery" ? (
        <GalleryPage copy={copy} onShop={navigateShop} onService={setServiceOpen} />
      ) : (
        <ShopPage
          copy={copy}
          language={language}
          products={visibleProducts}
          filter={filter}
          search={search}
          sort={sort}
          onFilter={updateFilter}
          onSearch={setSearch}
          onSort={setSort}
          onOpen={openProduct}
          onShowAll={() => updateFilter("all")}
          onService={setServiceOpen}
        />
      )}

      <Footer
        copy={copy}
        onHome={navigateHome}
        onShop={navigateShop}
        onTrade={() => setTradeOpen(true)}
        onService={setServiceOpen}
        onLegal={setLegalOpen}
      />

      {activeProduct && (
        <ProductDetail
          product={activeProduct}
          copy={copy}
          language={language}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onClose={() => setActiveProductId(null)}
          onAdvice={() => {
            setActiveProductId(null);
            setServiceOpen("advice");
          }}
          onAdd={() => selectedSize && addToBag(activeProduct.id, selectedSize)}
        />
      )}

      {bagOpen && (
        <BagDrawer
          bag={bag}
          total={bagTotal}
          copy={copy}
          language={language}
          onClose={() => setBagOpen(false)}
          onUpdate={updateBagItem}
          onShop={() => {
            setBagOpen(false);
            navigateShop();
          }}
        />
      )}

      {tradeOpen && (
        <TradeModal
          copy={copy}
          language={language}
          onClose={() => setTradeOpen(false)}
          onPrivacy={() => {
            setTradeOpen(false);
            setLegalOpen("privacy");
          }}
        />
      )}

      {serviceOpen && (
        <ServiceModal
          key={serviceOpen}
          type={serviceOpen}
          copy={copy}
          language={language}
          onClose={() => setServiceOpen(null)}
          onPrivacy={() => {
            setServiceOpen(null);
            setLegalOpen("privacy");
          }}
        />
      )}

      {legalOpen && (
        <LegalModal
          kind={legalOpen}
          language={language}
          copy={copy}
          onClose={() => setLegalOpen(null)}
        />
      )}

      <div className={`shop-toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>{toast}
      </div>
    </div>
  );
}

function Header({ route, copy, language, bagCount, scrolled, mobileOpen, onToggleMobile, onLanguage, onHome, onShop, onBrands, onSearch, onBag }) {
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="announcement-bar"><span>{copy.announcement}</span></div>
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-cluster nav-cluster-left">
          <button type="button" onClick={() => onShop("all")} aria-current={route === "shop" ? "page" : undefined}>{copy.nav.shop}</button>
          <button type="button" onClick={() => onShop("all")}>{copy.nav.new}</button>
          <button type="button" onClick={onBrands} aria-current={route === "brands" ? "page" : undefined}>{copy.nav.brands}</button>
        </div>
        <button className="header-wordmark" type="button" onClick={() => onHome()} aria-label="NES home">NES</button>
        <div className="nav-cluster nav-cluster-right">
          <button type="button" onClick={() => onHome("standard")}>{copy.nav.about}</button>
          <button className="language-button" type="button" onClick={onLanguage} aria-label={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>{language.toUpperCase()}</button>
          <button className="icon-button" type="button" onClick={onSearch} aria-label={copy.nav.search}><SearchIcon /></button>
          <button className="bag-button" type="button" onClick={onBag} aria-label={`${copy.nav.bag}: ${bagCount}`}><BagIcon /><span>{bagCount}</span></button>
        </div>
        <button className="mobile-menu-button" type="button" onClick={onToggleMobile} aria-expanded={mobileOpen} aria-label={mobileOpen ? copy.nav.close : copy.nav.menu}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <button className="mobile-bag-button" type="button" onClick={onBag} aria-label={`${copy.nav.bag}: ${bagCount}`}><BagIcon /><span>{bagCount}</span></button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <button type="button" onClick={() => onShop("all")}>{copy.nav.shop}<ArrowIcon /></button>
            <button type="button" onClick={onBrands}>{copy.nav.brands}<ArrowIcon /></button>
            <button type="button" onClick={() => onHome("standard")}>{copy.nav.about}<ArrowIcon /></button>
          </div>
          <div className="mobile-menu-meta">
            <button type="button" onClick={onSearch}><SearchIcon />{copy.nav.search}</button>
            <button type="button" onClick={onLanguage}>{language === "de" ? "English" : "Deutsch"}</button>
          </div>
        </div>
      )}
    </header>
  );
}

function OccasionExplorer({ copy, language, onOpen, onShop }) {
  const [activeId, setActiveId] = useState(OCCASION_CONFIG[0].id);
  const active = OCCASION_CONFIG.find((item) => item.id === activeId) || OCCASION_CONFIG[0];
  const activeCopy = copy.occasions.items[active.id];
  const products = active.productIds.map((id) => PRODUCTS.find((product) => product.id === id)).filter(Boolean);

  return (
    <section className="occasion-section section-pad" id="occasions" aria-labelledby="occasion-title">
      <div className="occasion-heading" data-reveal>
        <div>
          <p className="eyebrow eyebrow-light">{copy.occasions.label}</p>
          <h2 id="occasion-title">{copy.occasions.title}</h2>
        </div>
        <p>{copy.occasions.intro}</p>
      </div>

      <div className="occasion-tabs" role="group" aria-label={copy.occasions.label} data-reveal style={{ "--reveal-delay": "90ms" }}>
        {OCCASION_CONFIG.map((item) => (
          <button
            className={active.id === item.id ? "is-active" : ""}
            type="button"
            key={item.id}
            onClick={() => setActiveId(item.id)}
            aria-pressed={active.id === item.id}
          >
            <span>{item.index}</span>
            <strong>{copy.occasions.items[item.id].tab}</strong>
          </button>
        ))}
      </div>

      <div className="occasion-stage" data-reveal="clip" style={{ "--reveal-delay": "150ms" }}>
        <div className={`occasion-visual${active.productVisual ? " occasion-visual-product" : ""}`} key={`visual-${active.id}`}>
          <img src={active.image} alt={activeCopy.alt} width="1200" height="900" loading="lazy" />
          <span className="occasion-visual-shade" aria-hidden="true" />
          <span className="occasion-visual-index">{active.index} / {activeCopy.tab}</span>
        </div>

        <div className="occasion-panel" key={`panel-${active.id}`} aria-live="polite">
          <div>
            <p className="eyebrow">{activeCopy.eyebrow}</p>
            <h3>{activeCopy.title}</h3>
            <p className="occasion-panel-body">{activeCopy.body}</p>
          </div>
          <div className="occasion-selection">
            <span className="occasion-selection-label">{copy.occasions.productsLabel}</span>
            {products.map((product) => (
              <button className="occasion-product" type="button" key={product.id} onClick={() => onOpen(product.id)}>
                <span className={`occasion-product-image product-fit-${product.fit}`}><img src={product.image} alt="" loading="lazy" /></span>
                <span className="occasion-product-copy">
                  <small>{product.brand}</small>
                  <strong>{product.name}</strong>
                  <span>{localize(product.subtitle, language)}</span>
                </span>
                <span className="occasion-product-price">{formatPrice(product.price, language)}</span>
                <ArrowIcon />
              </button>
            ))}
            <button className="underlined-link occasion-all" type="button" onClick={() => onShop("all")}>{copy.occasions.cta}<ArrowIcon /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShoppableLook({ copy, language, onOpen }) {
  const hotspots = [
    { product: PRODUCTS.find((product) => product.id === 12), className: "shoppable-hotspot-pullover" },
    { product: PRODUCTS.find((product) => product.id === 1), className: "shoppable-hotspot-shoe" },
  ].filter(({ product }) => product);

  return (
    <section className="shoppable-look" id="shop-the-look" aria-labelledby="shoppable-look-title">
      <div className="shoppable-look-inner" data-reveal="clip">
        <div className="shoppable-look-copy">
          <p className="eyebrow">{copy.look.label}</p>
          <h2 id="shoppable-look-title">{copy.look.title}</h2>
          <p>{copy.look.body}</p>
          <span className="shoppable-look-hint"><span aria-hidden="true" />{copy.look.hint}</span>
        </div>
        <div className="shoppable-look-media">
          <img
            src="/shop/editorial/nes-shoppable-look-v1.webp"
            alt={copy.look.alt}
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="shoppable-look-wash" aria-hidden="true" />
          {hotspots.map(({ product, className }) => (
            <button
              className={`shoppable-hotspot ${className}`}
              type="button"
              key={product.id}
              onClick={() => onOpen(product.id)}
              aria-label={`${product.brand}, ${product.name}, ${formatPrice(product.price, language)} — ${copy.look.open}`}
            >
              <span className="shoppable-hotspot-marker" aria-hidden="true" />
              <span className="shoppable-hotspot-product" aria-hidden="true">
                <span>{product.brand}</span>
                <strong>{product.name}</strong>
                <span className="shoppable-hotspot-price">{formatPrice(product.price, language)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ copy, language, onShop, onGallery, onOpen, onTrade, onService, onPrivacy }) {
  const featured = FEATURED_IDS.map((id) => PRODUCTS.find((product) => product.id === id)).filter(Boolean);
  return (
    <main className="home-page">
      <section className="shop-hero" aria-labelledby="hero-title">
        <ShaderBackground>
          <div className="shop-hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="hero-title">{copy.hero.title}</h1>
            <p className="shop-hero-body">{copy.hero.body}</p>
            <div className="shop-hero-actions">
              <button className="button button-forest" type="button" onClick={() => onShop("all")}>{copy.hero.primary}<ArrowIcon /></button>
              <a className="underlined-link" href="#brands">{copy.hero.secondary}</a>
            </div>
          </div>
          <div className="shop-hero-signature"><span>NES / 01</span><p>{copy.hero.campaign}</p></div>
          <a className="hero-scroll" href="#featured" aria-label={copy.featured.title}><span />Scroll</a>
        </ShaderBackground>
      </section>

      <section className="house-intro section-pad">
        <div className="house-intro-index" data-reveal>NES<br />CURATED<br />HOUSE</div>
        <div className="house-intro-copy" data-reveal style={{ "--reveal-delay": "80ms" }}>
          <p className="eyebrow">{copy.intro.label}</p>
          <h2>{copy.intro.title}</h2>
          <p>{copy.intro.text}</p>
        </div>
      </section>

      <section className="featured-section section-pad" id="featured">
        <SectionHeading label={copy.featured.label} title={copy.featured.title} action={copy.featured.all} onAction={() => onShop("all")} />
        <div className="product-grid product-grid-featured">
          {featured.map((product, productIndex) => <ProductCard key={product.id} product={product} copy={copy} language={language} onOpen={onOpen} revealDelay={`${productIndex * 70}ms`} />)}
        </div>
      </section>

      <OccasionExplorer copy={copy} language={language} onOpen={onOpen} onShop={onShop} />

      <section className="brand-section section-pad" id="brands">
        <div className="brand-section-heading" data-reveal>
          <p className="eyebrow">{copy.brands.label}</p>
          <h2>{copy.brands.title}</h2>
        </div>
        <div className="brand-world-grid brand-world-grid-home">
          {BRAND_WORLDS.filter((brand) => brand.id !== "loungers").map((brand, brandIndex) => (
            <button className={`brand-world ${brand.className}`} type="button" key={brand.id} onClick={() => onShop(brand.id)} data-reveal="clip" style={{ "--reveal-delay": `${brandIndex * 90}ms` }}>
              {brand.image ? <img src={brand.image} alt="" aria-hidden="true" loading="lazy" style={{ objectPosition: brand.position }} /> : <span className="brand-world-gradient" aria-hidden="true" />}
              <span className="brand-world-shade" aria-hidden="true" />
              {brand.logo && <img className="brand-world-logo" src={brand.logo} alt={brand.name} loading="lazy" />}
              <span className="brand-world-index">{String(brandIndex + 1).padStart(2, "0")} / {localize(brand.category, language)}</span>
              <span className="brand-world-copy">
                {!brand.logo && <strong>{brand.name}</strong>}
                <span>{localize(brand.note, language)}</span>
                <span className="brand-world-link">{brand.upcoming ? copy.brands.soon : copy.brands.open}<ArrowIcon /></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <ShoppableLook copy={copy} language={language} onOpen={onOpen} />

      <section className="editorial-feature">
        <img src="/wai10-opt.jpeg" alt={copy.editorial.alt} loading="lazy" />
        <span className="editorial-feature-overlay" aria-hidden="true" />
        <div className="editorial-feature-copy" data-reveal>
          <p className="eyebrow eyebrow-light">{copy.editorial.label}</p>
          <h2>{copy.editorial.title}</h2>
          <p>{copy.editorial.body}</p>
          <button className="button button-ivory" type="button" onClick={onGallery}>{copy.editorial.cta}<ArrowIcon /></button>
        </div>
      </section>

      <section className="standard-section" id="standard">
        <div className="standard-copy">
          <div className="standard-head" data-reveal>
            <div><p className="eyebrow">{copy.standard.label}</p><h2>{copy.standard.title}</h2></div>
            <p className="standard-body">{copy.standard.body}</p>
          </div>
          <div className="principle-list">
            {copy.standard.points.map(([index, title, body], pointIndex) => <div className="principle" key={index} data-reveal style={{ "--reveal-delay": `${pointIndex * 70}ms` }}><span>{index}</span><strong>{title}</strong><p>{body}</p></div>)}
          </div>
          <button className="button button-forest" type="button" onClick={() => onShop("all")}>{copy.standard.cta}<ArrowIcon /></button>
        </div>
      </section>

      <ServiceStrip copy={copy} onShop={onShop} onService={onService} />

      <section className="trade-band">
        <div data-reveal><p className="eyebrow eyebrow-light">{copy.trade.label}</p><h2>{copy.trade.title}</h2></div>
        <p data-reveal style={{ "--reveal-delay": "70ms" }}>{copy.trade.body}</p>
        <button className="button button-gold" type="button" onClick={onTrade} data-reveal style={{ "--reveal-delay": "140ms" }}>{copy.trade.cta}<ArrowIcon /></button>
      </section>

      <Newsletter copy={copy} language={language} onPrivacy={onPrivacy} />
    </main>
  );
}

function GalleryPage({ copy, onShop, onService }) {
  return (
    <main className="gallery-page">
      <section className="gallery-intro section-pad">
        <div><p className="eyebrow">{copy.gallery.label}</p><h1>{copy.gallery.title}</h1></div>
        <p>{copy.gallery.intro}</p>
      </section>
      <section className="gallery-grid section-pad" aria-label={copy.gallery.aria}>
        {GALLERY_IMAGES.map((item, index) => (
          <figure className="gallery-item" key={item.src}>
            <img src={item.src} alt={`${copy.gallery.imageAlt} ${item.brand}`} loading={index < 3 ? "eager" : "lazy"} decoding="async" />
            <figcaption>{item.brand}</figcaption>
          </figure>
        ))}
      </section>
      <ServiceStrip copy={copy} onShop={onShop} onService={onService} />
    </main>
  );
}

function BrandsPage({ copy, onShop, onService }) {
  return (
    <main className="lineups-page">
      <CatalogLineups copy={copy.shop.lineups} onSelect={onShop} />
      <ServiceStrip copy={copy} onShop={onShop} onService={onService} />
    </main>
  );
}

function CatalogLineups({ copy, onSelect }) {
  return (
    <section className="catalog-lineups section-pad" aria-labelledby="catalog-lineups-title">
      <header className="catalog-lineups-heading">
        <div>
          <p className="eyebrow">{copy.label}</p>
          <h2 id="catalog-lineups-title">{copy.title}</h2>
        </div>
        <p>{copy.intro}</p>
      </header>
      <div className="catalog-lineup-grid">
        {CATALOG_LINEUPS.map((lineup) => {
          const item = copy.items[lineup.id];
          return (
            <button className={`catalog-lineup-card catalog-lineup-${lineup.id}`} type="button" onClick={() => onSelect(lineup.filter)} key={lineup.id}>
              <span className="catalog-lineup-media">
                <img src={lineup.image} alt={`${item.title} — ${item.meta}`} loading="lazy" decoding="async" />
                <span className="catalog-lineup-index" aria-hidden="true">{lineup.index}</span>
              </span>
              <span className="catalog-lineup-copy">
                <span className="catalog-lineup-meta">{item.meta}</span>
                <strong>{item.title}</strong>
                <span className="catalog-lineup-link">{item.cta}<ArrowIcon /></span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ShopPage({ copy, language, products, filter, search, sort, onFilter, onSearch, onSort, onOpen, onShowAll, onService }) {
  const greenSelected = filter === "green";
  return (
    <main className="catalog-page">
      <section className="catalog-intro section-pad">
        <div className="catalog-intro-heading">
          <p className="eyebrow">{copy.shop.breadcrumb}</p>
          <h1>{copy.shop.title}</h1>
        </div>
        <div className="catalog-intro-summary"><p>{copy.shop.intro}</p></div>
      </section>
      <section className="catalog section-pad" aria-label={copy.shop.title}>
        <div className="catalog-controls">
          <div className="catalog-tabs" role="group" aria-label={copy.brands.label}>
            <button className={filter === "all" ? "is-active" : ""} type="button" onClick={() => onFilter("all")}>{copy.shop.all}</button>
            {BRAND_WORLDS.map((brand) => <button className={filter === brand.id ? "is-active" : ""} type="button" onClick={() => onFilter(brand.id)} key={brand.id}>{brand.name}</button>)}
          </div>
          <div className="catalog-toolbar">
            <label className="catalog-search" htmlFor="catalog-search"><SearchIcon /><span className="sr-only">{copy.shop.searchLabel}</span><input id="catalog-search" type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={copy.shop.searchPlaceholder} /></label>
            <span className="catalog-count">{products.length} {products.length === 1 ? copy.shop.product : copy.shop.products}</span>
            <label className="catalog-sort"><span>{copy.shop.sortLabel}</span><select value={sort} onChange={(event) => onSort(event.target.value)}><option value="featured">{copy.shop.featured}</option><option value="price-asc">{copy.shop.priceAsc}</option><option value="price-desc">{copy.shop.priceDesc}</option><option value="name">{copy.shop.name}</option></select></label>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="product-grid catalog-grid">{products.map((product) => <ProductCard key={product.id} product={product} copy={copy} language={language} onOpen={onOpen} />)}</div>
        ) : (
          <div className={`catalog-empty${greenSelected ? " catalog-empty-green" : ""}`}>
            {greenSelected && <img src="/logos/greencomfort.svg?v=official" alt="Green Comfort" />}
            <h2>{greenSelected ? copy.shop.upcomingTitle : copy.shop.noResults}</h2>
            <p>{greenSelected ? copy.shop.upcomingBody : copy.shop.noResultsBody}</p>
            <button className="button button-forest" type="button" onClick={onShowAll}>{copy.shop.showAll}<ArrowIcon /></button>
          </div>
        )}
      </section>
      <ServiceStrip copy={copy} onShop={onShowAll} onService={onService} />
    </main>
  );
}

function SectionHeading({ label, title, action, onAction }) {
  return <div className="section-heading" data-reveal><div><p className="eyebrow">{label}</p><h2>{title}</h2></div><button className="underlined-link" type="button" onClick={onAction}>{action}<ArrowIcon /></button></div>;
}

function ProductCard({ product, copy, language, onOpen, revealDelay }) {
  return (
    <article className={`product-card product-card-${product.brandId}`} data-reveal style={revealDelay ? { "--reveal-delay": revealDelay } : undefined}>
      <button className={`product-media product-fit-${product.fit}`} type="button" onClick={() => onOpen(product.id)} aria-label={`${product.name} ${copy.product.view}`}>
        {product.tag && <span className="product-tag">{localize(product.tag, language)}</span>}
        <img className="product-image product-image-main" src={product.image} alt={product.name} loading="lazy" decoding="async" />
        <img className="product-image product-image-hover" src={product.hoverImage} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <span className="product-plus" aria-hidden="true">+</span>
      </button>
      <button className="product-copy" type="button" onClick={() => onOpen(product.id)}>
        <span className="product-brand">{product.brand}</span>
        <span className="product-title-row"><strong>{product.name}</strong><span>{formatPrice(product.price, language)}</span></span>
        <span className="product-subtitle">{localize(product.subtitle, language)} · {localize(product.color, language)}</span>
      </button>
    </article>
  );
}

function ProductDetail({ product, copy, language, selectedSize, onSelectSize, onClose, onAdvice, onAdd }) {
  return (
    <div className="modal-backdrop product-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="product-detail" role="dialog" aria-modal="true" aria-labelledby="product-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="overlay-close" type="button" onClick={onClose} aria-label={copy.nav.close}><CloseIcon /></button>
        <div className={`product-detail-gallery product-card-${product.brandId}`}>
          <div className={`product-detail-image product-fit-${product.fit}`}><img src={product.image} alt={product.name} /></div>
          <div className={`product-detail-image product-fit-${product.fit}`}><img src={product.hoverImage} alt={`${product.name}, second view`} /></div>
        </div>
        <div className="product-detail-copy">
          <button className="detail-back" type="button" onClick={onClose}><span aria-hidden="true">←</span>{copy.product.back}</button>
          <p className="eyebrow">{product.brand} / {localize(product.category, language)}</p>
          <h2 id="product-detail-title">{product.name}</h2>
          <p className="detail-subtitle">{localize(product.subtitle, language)} · {localize(product.color, language)}</p>
          <p className="detail-price">{formatPrice(product.price, language)}</p>
          <div className="size-picker"><div><span>{copy.product.chooseSize}</span><button type="button" onClick={onAdvice}>{copy.product.guide}</button></div><div className="size-grid">{product.sizes.map((size) => <button className={selectedSize === size ? "is-active" : ""} type="button" key={size} onClick={() => onSelectSize(size)}>{size}</button>)}</div></div>
          <button className="add-to-bag" type="button" disabled={!selectedSize} onClick={onAdd}>{selectedSize ? `${copy.product.add} · ${selectedSize}` : copy.product.chooseFirst}</button>
          <p className="detail-description">{localize(product.description, language)}</p>
          <dl className="detail-facts"><div><dt>{copy.product.material}</dt><dd>{product.material}</dd></div><div><dt>{copy.product.color}</dt><dd>{localize(product.color, language)}</dd></div><div><dt>{copy.product.delivery}</dt><dd>{copy.product.deliveryValue}</dd></div><div><dt>{copy.product.returns}</dt><dd>{copy.product.returnsValue}</dd></div></dl>
        </div>
      </div>
    </div>
  );
}

function BagDrawer({ bag, total, copy, language, onClose, onUpdate, onShop }) {
  const [checkoutMessage, setCheckoutMessage] = useState("");
  return (
    <div className="drawer-layer">
      <button className="drawer-backdrop" type="button" onClick={onClose} aria-label={copy.nav.close} />
      <aside className="bag-drawer" aria-label={copy.bag.title}>
        <div className="bag-heading"><div><p className="eyebrow">NES</p><h2>{copy.bag.title}</h2></div><button type="button" onClick={onClose} aria-label={copy.nav.close}><CloseIcon /></button></div>
        <div className="bag-content">
          {bag.length === 0 ? <div className="bag-empty"><p>{copy.bag.empty}</p><button className="button button-forest" type="button" onClick={onShop}>{copy.bag.shop}</button></div> : bag.map((item, index) => {
            const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
            if (!product) return null;
            return <article className="bag-item" key={`${item.productId}-${item.size}`}><div className={`bag-item-image product-fit-${product.fit}`}><img src={product.image} alt={product.name} /></div><div className="bag-item-copy"><span>{product.brand}</span><h3>{product.name}</h3><p>{copy.bag.size} {item.size}</p><div className="quantity-control"><button type="button" onClick={() => onUpdate(index, -1)} aria-label="Decrease">−</button><span>{item.qty}</span><button type="button" onClick={() => onUpdate(index, 1)} aria-label="Increase">+</button></div></div><strong>{formatPrice(product.price * item.qty, language)}</strong></article>;
          })}
        </div>
        {bag.length > 0 && <div className="bag-footer"><div className="bag-total"><span>{copy.bag.subtotal}</span><strong>{formatPrice(total, language)}</strong></div><p>{copy.bag.note}</p><button className="checkout-button" type="button" onClick={() => setCheckoutMessage(copy.bag.checkoutSoon)}>{copy.bag.checkout}</button><p className="checkout-message" role="status">{checkoutMessage}</p></div>}
      </aside>
    </div>
  );
}

function ServiceStrip({ copy, onShop, onService }) {
  return (
    <section className="service-strip" aria-label="Shop services">
      <div className="service-strip-inner">
        {copy.services.map(([index, title, body, action], serviceIndex) => (
          <button className="service-card" type="button" key={index} onClick={() => index === "01" ? onShop("all") : onService(index === "02" ? "returns" : "advice")} data-reveal style={{ "--reveal-delay": `${serviceIndex * 70}ms` }}>
            <span className="service-card-index">{index}</span>
            <div className="service-card-copy">
              <strong>{title}</strong>
              <p>{body}</p>
              <span className="service-card-action">{action}<ArrowIcon /></span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Newsletter({ copy, language, onPrivacy }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (String(formData.get("company") || "")) return;
    const normalized = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) {
      setStatus("error"); setMessage(copy.newsletter.invalid); return;
    }
    setStatus("loading"); setMessage("");
    try {
      const response = await fetch(import.meta.env.VITE_NEWSLETTER_ENDPOINT || "/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email: normalized, source: "nes-shop-home", locale: language, company: "" }) });
      if (!response.ok) throw new Error("Newsletter failed");
      setStatus("success"); setEmail("");
    } catch {
      setStatus("error"); setMessage(copy.newsletter.error);
    }
  }

  return (
    <section className="newsletter-section">
      <div><p className="eyebrow eyebrow-light">{copy.newsletter.label}</p><h2>{copy.newsletter.title}</h2><p>{copy.newsletter.body}</p></div>
      {status === "success" ? <p className="newsletter-success" role="status">{copy.newsletter.success}</p> : <form onSubmit={submit} noValidate><input className="honeypot" type="text" name="company" tabIndex="-1" autoComplete="off" aria-hidden="true" /><label className="sr-only" htmlFor="newsletter-email">Email</label><div><input id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (status === "error") setStatus("idle"); }} placeholder={copy.newsletter.placeholder} disabled={status === "loading"} /><button type="submit" disabled={status === "loading"}>{status === "loading" ? copy.newsletter.loading : copy.newsletter.submit}<ArrowIcon /></button></div><p className="newsletter-message" role="status">{status === "error" ? message : ""}</p><p className="newsletter-privacy">{copy.newsletter.privacy} <button type="button" onClick={onPrivacy}>{copy.newsletter.privacyLink}</button></p></form>}
    </section>
  );
}

function TradeModal({ copy, language, onClose, onPrivacy }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "", consent: false });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); if (status === "error") { setStatus("idle"); setError(""); } }
  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("company_website") || "")) return;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
    if (!form.name.trim() || !validEmail || !form.consent) { setStatus("error"); setError(copy.tradeForm.invalid); return; }
    setStatus("loading"); setError("");
    try {
      const response = await fetch(import.meta.env.VITE_INQUIRY_ENDPOINT || "/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: form.name.trim(), company: form.company.trim(), email: form.email.trim(), phone: "", role: "Retailer / Brand", topic: "Wholesale & collections", brand: "All brands", message: form.message.trim(), newsletter: false, locale: language, source: "nes-shop-trade", consent: true, website: "" }) });
      if (!response.ok) throw new Error("Inquiry failed");
      setStatus("success");
    } catch { setStatus("error"); setError(copy.tradeForm.error); }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="trade-modal" role="dialog" aria-modal="true" aria-labelledby="trade-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="overlay-close" type="button" onClick={onClose} aria-label={copy.nav.close}><CloseIcon /></button>
        {status === "success" ? <div className="trade-success"><p className="eyebrow">NES / B2B</p><h2 id="trade-title">{copy.tradeForm.successTitle}</h2><p>{copy.tradeForm.successBody}</p><button className="button button-forest" type="button" onClick={onClose}>{copy.nav.close}</button></div> : <form onSubmit={submit} noValidate><p className="eyebrow">NES / B2B</p><h2 id="trade-title">{copy.tradeForm.title}</h2><p className="trade-modal-intro">{copy.tradeForm.body}</p><input className="honeypot" type="text" name="company_website" tabIndex="-1" autoComplete="off" aria-hidden="true" /><div className="trade-fields"><label><span>{copy.tradeForm.name} *</span><input type="text" value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" /></label><label><span>{copy.tradeForm.company}</span><input type="text" value={form.company} onChange={(event) => update("company", event.target.value)} autoComplete="organization" /></label><label className="trade-field-wide"><span>{copy.tradeForm.email} *</span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" /></label><label className="trade-field-wide"><span>{copy.tradeForm.message}</span><textarea rows="4" value={form.message} onChange={(event) => update("message", event.target.value)} /></label></div><label className="trade-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>{copy.tradeForm.consent} <button type="button" onClick={onPrivacy}>{copy.newsletter.privacyLink}</button></span></label><p className="trade-error" role="status">{status === "error" ? error : ""}</p><button className="trade-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? copy.tradeForm.sending : copy.tradeForm.submit}<ArrowIcon /></button></form>}
      </div>
    </div>
  );
}

function ServiceModal({ type, copy, language, onClose, onPrivacy }) {
  const labels = copy.serviceForms;
  const content = labels[type];
  const [form, setForm] = useState({ name: "", email: "", detail: "", message: "", consent: false });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    if (status === "error") { setStatus("idle"); setError(""); }
  }

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("company_website") || "")) return;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
    if (!form.name.trim() || !validEmail || !form.message.trim() || !form.consent) {
      setStatus("error");
      setError(labels.invalid);
      return;
    }

    const detail = form.detail.trim();
    const message = [detail ? `${content.detail}: ${detail}` : "", form.message.trim()].filter(Boolean).join("\n\n");
    setStatus("loading");
    setError("");
    try {
      const response = await fetch(import.meta.env.VITE_INQUIRY_ENDPOINT || "/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: "",
          email: form.email.trim(),
          phone: "",
          role: "Customer",
          topic: type === "advice" ? "Personal product and sizing advice" : "Returns and shipping",
          brand: "All brands",
          message,
          newsletter: false,
          locale: language,
          source: `nes-shop-service-${type}`,
          consent: true,
          website: "",
        }),
      });
      if (!response.ok) throw new Error("Service enquiry failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(labels.error);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="trade-modal service-modal" role="dialog" aria-modal="true" aria-labelledby="service-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="overlay-close" type="button" onClick={onClose} aria-label={copy.nav.close}><CloseIcon /></button>
        {status === "success" ? (
          <div className="trade-success">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="service-title">{content.successTitle}</h2>
            <p>{content.successBody}</p>
            <button className="button button-forest" type="button" onClick={onClose}>{copy.nav.close}</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate aria-busy={status === "loading"}>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="service-title">{content.title}</h2>
            <p className="trade-modal-intro">{content.body}</p>
            <input className="honeypot" type="text" name="company_website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div className="trade-fields">
              <label><span>{labels.name} *</span><input type="text" value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" disabled={status === "loading"} /></label>
              <label><span>{labels.email} *</span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" disabled={status === "loading"} /></label>
              <label className="trade-field-wide"><span>{content.detail}</span><input type="text" value={form.detail} onChange={(event) => update("detail", event.target.value)} disabled={status === "loading"} /></label>
              <label className="trade-field-wide"><span>{labels.message} *</span><textarea rows="4" value={form.message} onChange={(event) => update("message", event.target.value)} disabled={status === "loading"} /></label>
            </div>
            <label className="trade-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} disabled={status === "loading"} /><span>{labels.consent} <button type="button" onClick={onPrivacy}>{copy.newsletter.privacyLink}</button></span></label>
            <p className="trade-error" role="status">{status === "error" ? error : ""}</p>
            <button className="trade-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? labels.sending : content.submit}<ArrowIcon /></button>
          </form>
        )}
      </div>
    </div>
  );
}

function LegalModal({ kind, language, copy, onClose }) {
  const documentCopy = LEGAL[language][kind];
  return (
    <div className="legal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <button className="legal-close" type="button" onClick={onClose}><span aria-hidden="true">←</span>{copy.legalBack}</button>
      <div className="legal-document"><span className="legal-wordmark">NES</span><h1 id="legal-title">{documentCopy.title}</h1><p className="legal-intro">{documentCopy.intro}</p>{documentCopy.blocks.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<p className="legal-note">{documentCopy.note}</p></div>
    </div>
  );
}

function Footer({ copy, onHome, onShop, onTrade, onService, onLegal }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><button className="footer-wordmark" type="button" onClick={() => onHome()}>NES</button><p>{copy.footer.about}</p></div>
        <div className="footer-column"><h3>{copy.footer.collections}</h3><button type="button" onClick={() => onShop("vehon")}>Vehon / WAI</button><button type="button" onClick={() => onShop("loungers")}>Loungers</button><button type="button" onClick={() => onShop("montechiaro")}>Montechiaro</button><button type="button" onClick={() => onShop("green")}>Green Comfort</button></div>
        <div className="footer-column"><h3>{copy.footer.service}</h3><button type="button" onClick={() => onService("advice")}>{copy.footer.advice}</button><button type="button" onClick={() => onService("returns")}>{copy.footer.returns}</button></div>
        <div className="footer-column"><h3>{copy.footer.house}</h3><button type="button" onClick={() => onHome("standard")}>{copy.nav.about}</button><button type="button" onClick={onTrade}>{copy.footer.contact}</button><button type="button" onClick={() => onLegal("privacy")}>{copy.footer.privacy}</button><button type="button" onClick={() => onLegal("imprint")}>{copy.footer.imprint}</button></div>
      </div>
      <div className="footer-bottom"><span>© 2026 NES</span><span>Natural · Everyday · Selected</span><span>{copy.footer.country}</span></div>
    </footer>
  );
}

function ArrowIcon() { return <svg className="arrow-icon" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.5 15.5 4.2 4.2" /></svg>; }
function BagIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.5h13l.8 11h-14.6l.8-11Z" /><path d="M9 9V6.7a3 3 0 0 1 6 0V9" /></svg>; }
function MenuIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 17h18" /></svg>; }
function CloseIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>; }
