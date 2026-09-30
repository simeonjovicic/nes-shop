import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ShaderBackground } from "./components/ui/shaders-hero-section";
import { featuredProducts } from "./featuredProducts";
import { PRODUCTS } from "./products";
import { MAX_QUANTITY, getProductSlug, getProductVariants, groupProductFamilies, getLinePrice, getBagTotal, compareProductPrices, normalizeBag, normalizeWishlist, readStored, writeStored } from "./shopState";
import { useDialogFocus } from "./useDialogFocus";
import { ProductSequence } from "./ProductSequence";
import { usePageNavigation } from "./usePageNavigation";
import "./App.css";
import "./shop-polish.css";
import "./product-page.css";
import "./featured-showcase.css";
import "./catalog-page.css";
import { BRANDS, getBrandForProduct, brandIdFromPath } from "./brands.js";
import { BrandCards, BrandsPage, BrandDetailPage, AboutPage } from "./BrandExperience.jsx";
import { KnitQuality } from "./KnitQuality.jsx";

const GALLERY_IMAGES = [
  { src: "/shop/gallery/wai-ground.webp", brand: "WAI" },
  { src: "/shop/gallery/montechiaro-statement.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-home-step.webp", brand: "WAI" },
  { src: "/shop/gallery/montechiaro-kitchen.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-coast.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-zen.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-sunset.webp", brand: "WAI" },
  { src: "/shop/gallery/montechiaro-work.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-poolside.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-stream.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-tea.webp", brand: "WAI" },
  { src: "/shop/gallery/montechiaro-detail.webp", brand: "Montechiaro" },
  { src: "/shop/gallery/wai-beach-step.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-curtain.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-warm-sand.webp", brand: "WAI" },
  { src: "/shop/gallery/wai-stone-lounge.webp", brand: "WAI" },
];

// Material, form and combinations from the existing shop image library.
const PRINCIPLE_MEDIA = [
  { src: "/shop/gallery/wai-home-step.webp", position: "center" },
  { src: "/shop/gallery/montechiaro-detail.webp", position: "center top", texture: true },
  { src: "/shop/editorial/nes-shoppable-look-v1.webp", position: "57% center" },
];

const COPY = {
  de: {
    announcement: "Natürliches Gefühl. Eigener Stil. Ausgewählt von NES.",
    nav: { shop: "Shop", new: "Neu", brands: "Marken", about: "Über NES", search: "Suche", bag: "Warenkorb", saved: "Merkliste", menu: "Menü", close: "Schließen" },
    hero: {
      eyebrow: "NES / Schuhe & Strick",
      title: ["Barfußgefühl.", "Mit Charakter."],
      body: "Textile Feel Shoes, klare Loafer und Strick mit Ausdruck. Ausgewählt für Menschen, die sich natürlich bewegen und ihren eigenen Stil tragen.",
      primary: "Auswahl entdecken",
      secondary: "Unsere Marken",
      campaign: "WAI · Vehon · Montechiaro",
    },
    intro: {
      label: "Die Idee hinter NES",
      title: "Gutes Gefühl. Gute Form.",
      text: "Barfußschuhe können sich natürlich anfühlen und gut aussehen. Mit dieser Überzeugung führt NES leichte Feel Shoes, klare Loafer und charakterstarken Strick zusammen.",
    },
    featured: { label: "Neu im Haus", title: "Ausgewählt für jetzt.", knitTitle: ["Signature", "Pullys"], knitText: "Markante Muster. Hochwertiger Strick. Gemacht, um aufzufallen.", shoeTitle: ["Feel", "Shoes"], shoeText: "Leichte Formen. Natürliche Bewegung. Für jeden Tag.", shopNow: "Jetzt entdecken" },
    brands: { label: "Die Marken bei NES", title: "Drei Handschriften.", titleAccent: "Ein Haus.", body: "Jede Marke hat ihren eigenen Ausdruck. Gemeinsam entsteht eine Auswahl, die sich leicht kombinieren lässt." },
    look: {
      label: "NES / Die Auswahl zum Look",
      title: "Ein Look. Zwei Handschriften.",
      body: "Ausdrucksstarker Strick, eine ruhige Hose und leichte Feel Shoes. Entdecken Sie unsere Auswahl zum Look.",
      hint: "Punkte antippen und die Auswahl entdecken",
      open: "Produkt ansehen",
      alt: "Look mit rotem Montechiaro-Strick und blauen WAI Feel Shoes",
    },
    gallery: { label: "NES / Bildarchiv", title: "Bewegung in Bildern.", intro: "Weitere Motive aus Alltag, Reise, Material und Ruhe — gesammelt als visuelles Archiv der Kollektionen.", aria: "Visuelles Archiv", imageAlt: "Editorialaufnahme von" },
    editorial: {
      label: "Die Idee · Natürlich bewegen",
      title: "Barfuß ist der Anfang.",
      body: "Bevor Schuhe Haltung zeigten, gaben Füße den Rhythmus vor. Raum für die Zehen, Nähe zum Boden und Bewegung ohne Umweg — nach diesem Gefühl wählen wir unsere Kollektionen aus.",
      cta: "Weitere Bilder ansehen",
      alt: "Flexibler Feel Shoe in einem ruhigen Wohnraum",
    },
    standard: { label: "Der NES Blick", title: "Gefühl. Form. Zusammenspiel.", body: "Unsere Auswahl beginnt beim Tragegefühl. Dazu kommen ein eigenständiger Ausdruck und die Frage, wie sich die Stücke miteinander kombinieren lassen.", points: [["01", "Gefühl", "Leichte Stoffe und Formen für natürliche Bewegung."], ["02", "Form", "Material, Muster und Silhouetten mit Charakter."], ["03", "Zusammenspiel", "Ruhige Schuhe und markanter Strick in einem Look."]], cta: "Die Auswahl entdecken" },
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
      showAll: "Alle Produkte zeigen",
      savedTitle: "Ihre Merkliste",
      savedIntro: "Lieblingsstücke sammeln, vergleichen und in Ruhe entscheiden. Ihre Auswahl bleibt auf diesem Gerät gespeichert.",
      savedEmpty: "Platz für Ihre Lieblingsstücke.",
      savedEmptyBody: "Tippen Sie auf das Herz an einem Produkt, um es hier zu speichern.",
    },
    product: { view: "ansehen", chooseSize: "Größe wählen", guide: "Größenberatung", add: "In den Warenkorb", chooseFirst: "Bitte Größe wählen", back: "Zurück zur Kollektion", material: "Material", color: "Farbe", delivery: "Versand", deliveryValue: "Auf Anfrage", returns: "Rückgabe", returnsValue: "14 Tage", added: "Zum Warenkorb hinzugefügt" },
    productPage: { home: "Startseite", collection: "Kollektion", previous: "Vorheriges Bild", next: "Nächstes Bild", view: "Ansicht", images: "Weitere Ansichten", details: "Im Detail", story: "Material und Form.", more: "Mehr entdecken.", trust: [["quality", "Ausgewählte Qualität", "Mit Blick für Material"], ["delivery", "Versand", "Persönlich bestätigt"], ["returns", "14 Tage Rückgabe", "Fragen? Wir helfen."]] },
    bag: { title: "Warenkorb", empty: "Ihr Warenkorb ist leer.", shop: "Zum Shop", size: "Größe", subtotal: "Zwischensumme", note: "Fragen Sie Ihre Auswahl unverbindlich an. Wir bestätigen Verfügbarkeit, Versand und Gesamtpreis persönlich.", checkout: "Auswahl anfragen", continue: "Weiter stöbern", remove: "Entfernen", increase: "Menge erhöhen", decrease: "Menge verringern" },
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
      selection: { eyebrow: "NES / Ihre Auswahl", title: "Ihre Auswahl. Persönlich bestätigt.", body: "Senden Sie uns Ihre Auswahl. Wir melden uns zu Verfügbarkeit, Versand und Gesamtpreis. Dies ist eine unverbindliche Anfrage, keine Bestellung.", submit: "Unverbindlich anfragen", successTitle: "Auswahl angekommen.", successBody: "Wir melden uns persönlich mit Verfügbarkeit und weiteren Details. Ihre Auswahl bleibt im Warenkorb gespeichert.", invalid: "Bitte geben Sie Name und E-Mail an und stimmen Sie der Verarbeitung zu.", tooLong: "Bitte verkleinern Sie Ihre Auswahl oder kürzen Sie die Nachricht.", message: "Ergänzung (optional)" },
      advice: { eyebrow: "NES / Beratung", title: "Was passt zu Ihnen?", body: "Nennen Sie uns Ihr Wunschmodell, Ihre übliche Größe und was Ihnen bei Passform und Material wichtig ist. Wir melden uns persönlich mit einer Empfehlung.", detail: "Modell oder Marke (optional)", submit: "Beratung anfragen", successTitle: "Anfrage erhalten.", successBody: "Vielen Dank. Wir schauen uns Ihre Angaben an und melden uns persönlich zurück." },
      returns: { eyebrow: "NES / Service", title: "Rückgabe & Versand", body: "Sie möchten etwas zurückgeben oder haben eine Frage zu Versand oder Bestellung? Schreiben Sie uns kurz – idealerweise mit Ihrer Bestellnummer.", detail: "Bestellnummer (optional)", submit: "Service anfragen", successTitle: "Wir kümmern uns darum.", successBody: "Ihre Anfrage ist angekommen. Wir melden uns mit den nächsten Schritten zurück." },
    },
    tradeForm: { title: "Partner werden", body: "Erzählen Sie uns kurz, worum es geht. Wir melden uns persönlich zurück.", name: "Name", company: "Unternehmen", email: "E-Mail", message: "Nachricht", consent: "Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.", submit: "Anfrage senden", sending: "Wird gesendet…", successTitle: "Vielen Dank.", successBody: "Ihre Anfrage ist angekommen. Wir melden uns in Kürze.", invalid: "Bitte füllen Sie Name, E-Mail und Zustimmung aus.", error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
    footer: { about: "Barfußgefühl und eigener Stil. Schuhe und Strick, ausgewählt von NES.", collections: "Kollektionen", service: "Service", advice: "Persönliche Beratung", returns: "Rückgabe & Versand", house: "Das Haus", contact: "Kontakt & Händler", privacy: "Datenschutz", imprint: "Impressum", country: "Deutschland / EUR" },
    legalBack: "Zurück",
  },
  en: {
    announcement: "Natural feeling. Personal style. Selected by NES.",
    nav: { shop: "Shop", new: "New", brands: "Brands", about: "About NES", search: "Search", bag: "Bag", saved: "Wishlist", menu: "Menu", close: "Close" },
    hero: {
      eyebrow: "NES / Footwear & knitwear",
      title: ["Barefoot feeling.", "With character."],
      body: "Textile feel shoes, clean loafers and expressive knitwear. Selected for people who move naturally and dress in their own way.",
      primary: "Explore the selection",
      secondary: "Our brands",
      campaign: "WAI · Vehon · Montechiaro",
    },
    intro: { label: "The idea behind NES", title: "Good feeling. Good form.", text: "Barefoot shoes can feel natural and look good. With this belief, NES brings together light feel shoes, clean loafers and knitwear with character." },
    featured: { label: "New in the house", title: "Selected for now.", knitTitle: ["Signature", "Pullys"], knitText: "Bold patterns. Premium knitwear. Made to stand out.", shoeTitle: ["Feel", "Shoes"], shoeText: "Light forms. Natural movement. Made for every day.", shopNow: "Shop now" },
    brands: { label: "The brands at NES", title: "Three signatures.", titleAccent: "One house.", body: "Each brand has its own expression. Together, they make a selection that feels natural to combine." },
    look: {
      label: "NES / A selection for the look",
      title: "One look. Two signatures.",
      body: "Expressive knitwear, quiet trousers and light feel shoes. Discover our selection for the look.",
      hint: "Tap a point to explore the selection",
      open: "View product",
      alt: "A look with red Montechiaro knitwear and blue WAI feel shoes",
    },
    gallery: { label: "NES / Image archive", title: "Movement in pictures.", intro: "More scenes from everyday life, travel, material and quiet moments — collected as a visual archive of the collections.", aria: "Visual archive", imageAlt: "Editorial image by" },
    editorial: {
      label: "The idea · Natural movement",
      title: "Barefoot is where it begins.",
      body: "Before shoes made a statement, feet set the rhythm. Room for the toes, closeness to the ground and movement without detours — that is the feeling behind every collection we choose.",
      cta: "View more images",
      alt: "A flexible feel shoe in a calm living space",
    },
    standard: { label: "The NES perspective", title: "Feeling. Form. Together.", body: "Our selection starts with how a piece feels to wear. We look for an individual expression and consider how the pieces work together.", points: [["01", "Feeling", "Light textiles and shapes for natural movement."], ["02", "Form", "Materials, patterns and silhouettes with character."], ["03", "Together", "Quiet shoes and expressive knitwear in one look."]], cta: "Explore the selection" },
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
      showAll: "Show all products",
      savedTitle: "Your wishlist",
      savedIntro: "Save your favourites, compare and take your time. Your selection stays on this device.",
      savedEmpty: "A place for your favourites.",
      savedEmptyBody: "Tap the heart on a product to save it here.",
    },
    product: { view: "view", chooseSize: "Choose size", guide: "Size guide", add: "Add to bag", chooseFirst: "Please choose a size", back: "Back to collection", material: "Material", color: "Colour", delivery: "Delivery", deliveryValue: "On enquiry", returns: "Returns", returnsValue: "14 days", added: "Added to your bag" },
    productPage: { home: "Home", collection: "Collection", previous: "Previous image", next: "Next image", view: "View", images: "Further views", details: "In detail", story: "Material and form.", more: "Discover more.", trust: [["quality", "Selected quality", "Considered materials"], ["delivery", "Delivery", "Personally confirmed"], ["returns", "14-day returns", "Questions? We can help."]] },
    bag: { title: "Bag", empty: "Your bag is empty.", shop: "Go to shop", size: "Size", subtotal: "Subtotal", note: "Enquire about your selection with no obligation. We will personally confirm availability, delivery and the total price.", checkout: "Enquire about selection", continue: "Continue browsing", remove: "Remove", increase: "Increase quantity", decrease: "Decrease quantity" },
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
      selection: { eyebrow: "NES / Your selection", title: "Your selection. Personally confirmed.", body: "Send us your selection. We will confirm availability, delivery and the total price. This is a no-obligation enquiry, not an order.", submit: "Send enquiry", successTitle: "Selection received.", successBody: "We will be in touch with availability and further details. Your selection stays saved in your bag.", invalid: "Please complete your name, email and consent.", tooLong: "Please reduce your selection or shorten your message.", message: "Anything to add? (optional)" },
      advice: { eyebrow: "NES / Advice", title: "What suits you?", body: "Tell us which style you are considering, your usual size and what matters to you in the fit and material. We will reply personally with a recommendation.", detail: "Style or brand (optional)", submit: "Request advice", successTitle: "Enquiry received.", successBody: "Thank you. We will review your details and get back to you personally." },
      returns: { eyebrow: "NES / Service", title: "Returns & shipping", body: "Would you like to return an item or ask about shipping or an order? Send us a short note, ideally including your order number.", detail: "Order number (optional)", submit: "Ask service", successTitle: "We are on it.", successBody: "Your enquiry has arrived. We will reply with the next steps." },
    },
    tradeForm: { title: "Become a partner", body: "Tell us briefly what you are looking for. We will get back to you personally.", name: "Name", company: "Company", email: "Email", message: "Message", consent: "I consent to my details being processed to handle this enquiry.", submit: "Send enquiry", sending: "Sending…", successTitle: "Thank you.", successBody: "Your enquiry has arrived. We will be in touch shortly.", invalid: "Please complete your name, email and consent.", error: "The enquiry could not be sent. Please try again." },
    footer: { about: "Barefoot feeling and personal style. Footwear and knitwear, selected by NES.", collections: "Collections", service: "Service", advice: "Personal advice", returns: "Returns & shipping", house: "The house", contact: "Contact & wholesale", privacy: "Privacy", imprint: "Legal notice", country: "Germany / EUR" },
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
  if (!Number.isFinite(value)) return language === "de" ? "Preis auf Anfrage" : "Price on request";
  return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInitialLanguage() {
  try {
    const saved = window.localStorage.getItem("nes-language");
    return saved === "en" || saved === '"en"' ? "en" : "de";
  } catch {
    return "de";
  }
}

function productFromLocation(url) {
  const slug = url.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1]
    ?? url.searchParams.get("product");
  return PRODUCTS.find((product) => getProductSlug(product) === slug)?.id ?? null;
}

function routeFromLocation(url) {
  if (url.pathname.startsWith("/products/") || url.searchParams.has("product")) return "product";
  if (url.pathname.startsWith("/shop")) return "shop";
  if (url.pathname.startsWith("/brands")) return "brands";
  if (url.pathname.startsWith("/gallery")) return "gallery";
  if (url.pathname === "/about" || url.pathname === "/about/") return "about";
  return "home";
}

function filterFromLocation(url) {
  const requested = url.searchParams.get("brand");
  return ["wai", "vehon", "vehon-models", "montechiaro"].includes(requested) ? requested : "all";
}

function getInitialBag() {
  return normalizeBag(readStored("nes-bag", []), PRODUCTS);
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [pageHref, navigate] = usePageNavigation();
  const pageUrl = new URL(pageHref);
  const route = routeFromLocation(pageUrl);
  const activeBrandId = brandIdFromPath(pageUrl.pathname);
  const filter = filterFromLocation(pageUrl);
  const search = pageUrl.searchParams.get("q") ?? "";
  const requestedSort = pageUrl.searchParams.get("sort");
  const sort = ["price-asc", "price-desc", "name"].includes(requestedSort) ? requestedSort : "featured";
  const activeProductId = productFromLocation(pageUrl);
  const savedOnly = pageUrl.searchParams.get("saved") === "1";
  const [wishlist, setWishlist] = useState(() => normalizeWishlist(readStored("nes-wishlist", []), PRODUCTS));
  const [serviceContext, setServiceContext] = useState(null);
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
      setSelectedSize("");
      setBagOpen(false);
      setMobileOpen(false);
      setTradeOpen(false);
      setServiceOpen(null);
      setLegalOpen(null);
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
    const legacySlug = new URLSearchParams(window.location.search).get("product");
    if (legacySlug && productFromLocation(new URL(window.location.href))) {
      window.history.replaceState(window.history.state, "", `/products/${legacySlug}`);
    }
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
    let mutations;

    const register = (element) => {
      if (element.classList.contains("is-revealed")) return;
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        element.classList.add("is-revealed");
      } else {
        observer.observe(element);
      }
    };

    const frame = window.requestAnimationFrame(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

      document.querySelectorAll("[data-reveal]").forEach(register);

      // Elements mounted later — filtered grids, modals — never reach the
      // observer above, so without this they stay stuck at opacity 0.
      mutations = new MutationObserver((records) => {
        const added = [];
        records.forEach((record) => {
          record.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.matches("[data-reveal]")) added.push(node);
            node.querySelectorAll("[data-reveal]").forEach((child) => added.push(child));
          });
        });
        if (!added.length) return;
        // Flush styles so the hidden state is computed before we reveal.
        // Deferring to rAF instead would leave the nodes invisible for however
        // long the next frame takes.
        void document.body.offsetHeight;
        added.forEach(register);
      });
      mutations.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      mutations?.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = language;
    writeStored("nes-language", language);
  }, [language]);

  useEffect(() => {
    writeStored("nes-bag", bag);
  }, [bag]);

  useEffect(() => {
    writeStored("nes-wishlist", wishlist);
  }, [wishlist]);

  useEffect(() => {
    const locked = Boolean(bagOpen || mobileOpen || tradeOpen || serviceOpen || legalOpen);
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [bagOpen, mobileOpen, tradeOpen, serviceOpen, legalOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      if (legalOpen) setLegalOpen(null);
      else if (serviceOpen) setServiceOpen(null);
      else if (tradeOpen) setTradeOpen(false);
      else if (bagOpen) setBagOpen(false);
      else setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [legalOpen, serviceOpen, tradeOpen, bagOpen]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = PRODUCTS.filter((product) => {
      const matchesBrand = filter === "all"
        || (filter === "wai" && Boolean(product.familyId))
        || (filter === "vehon-models" && product.brand === "Vehon")
        || (filter === "vehon" && product.brandId === "vehon")
        || (filter === "montechiaro" && product.brandId === "montechiaro");
      const haystack = `${product.brand} ${product.name} ${product.sku || ""} ${localize(product.subtitle, language)} ${localize(product.color, language)} ${localize(product.category, language)} ${product.material}`.toLowerCase();
      return matchesBrand && (savedOnly ? wishlist.includes(product.id) : !product.catalogHidden) && (!query || haystack.includes(query));
    });
    return (savedOnly ? matches : groupProductFamilies(matches)).sort((a, b) => {
      if (sort === "price-asc") return compareProductPrices(a, b);
      if (sort === "price-desc") return compareProductPrices(a, b, true);
      if (sort === "name") return a.name.localeCompare(b.name);
      const categoryOrder = (product) => product.familyId ? 0 : product.brand === "Vehon" ? 1 : 2;
      return categoryOrder(a) - categoryOrder(b) || a.id - b.id;
    });
  }, [filter, search, sort, language, savedOnly, wishlist]);

  const activeProduct = PRODUCTS.find((product) => product.id === activeProductId) || null;
  const activeBrand = BRANDS.find(brand => brand.id === activeBrandId);

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    if (route === "product" && activeProduct) {
      document.title = `${activeProduct.name} | ${activeProduct.brand} | NES`;
      description?.setAttribute("content", localize(activeProduct.description, language));
    } else if (route === "brands") {
      document.title = activeBrand ? `${activeBrand.name} | NES` : `${language === "de" ? "Unsere Marken" : "Our brands"} | NES`;
      description?.setAttribute("content", activeBrand ? activeBrand[language].intro : copy.brands.body);
    } else if (route === "about") {
      document.title = `${copy.nav.about} | NES`;
      description?.setAttribute("content", copy.intro.text);
    } else if (route === "shop") {
      document.title = language === "de" ? "Alle Produkte | NES Shop" : "All products | NES Shop";
      description?.setAttribute("content", language === "de"
        ? "Alle Modelle von WAI by Vehon, Vehon und Montechiaro entdecken. Schuhe und Strick in einer kuratierten Übersicht."
        : "Explore every style from WAI by Vehon, Vehon and Montechiaro. Curated footwear and knitwear in one collection.");
    } else {
      document.title = language === "de" ? "NES — Barfußgefühl. Mit Charakter." : "NES — Barefoot feeling. With character.";
      description?.setAttribute("content", language === "de"
        ? "Kuratierte Schuhe und charakterstarker Strick von NES. Entdecken Sie ausgewählte Marken, Materialien und Design."
        : "Curated footwear and distinctive knitwear from NES. Discover selected brands, materials and design.");
    }
  }, [route, activeProduct, activeBrand, language, copy]);
  const bagCount = bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = getBagTotal(bag, PRODUCTS);

  function navigateHome(section) {
    setMobileOpen(false);
    navigate(section ? `/#${section}` : "/");
  }

  function navigateShop(brand = "all", saved = false) {
    setMobileOpen(false);
    const query = new URLSearchParams();
    if (brand !== "all") query.set("brand", brand);
    if (saved) query.set("saved", "1");
    navigate(`/shop${query.size ? `?${query}` : ""}`);
  }

  function navigateBrands(brandId = null) {
    setMobileOpen(false);
    navigate(brandId ? `/brands/${brandId}` : "/brands");
  }

  function navigateAbout() {
    setMobileOpen(false);
    navigate("/about");
  }

  function navigateGallery() {
    setMobileOpen(false);
    navigate("/gallery");
  }

  function updateCatalog(key, value, defaultValue = "") {
    const url = new URL(pageHref);
    if (value === defaultValue) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
    navigate(`${url.pathname}${url.search}`, { replace: true, preserveScroll: true });
  }

  function focusSearch() {
    setMobileOpen(false);
    if (route !== "shop" || savedOnly) navigateShop("all");
    window.setTimeout(() => document.getElementById("catalog-search")?.focus(), 80);
  }

  function openProduct(productId) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    const changingVariant = route === "product" && activeProduct?.familyId && activeProduct.familyId === product.familyId;
    setSelectedSize("");
    navigate(`/products/${getProductSlug(product)}`, { preserveScroll: Boolean(changingVariant) });
  }

  function toggleFavorite(productId) {
    setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }

  function openService(type, product = null) {
    setServiceContext(product ? { product } : null);
    setServiceOpen(type);
  }

  function resetCatalog() {
    navigateShop();
  }

  function addToBag(productId, size) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product?.sizes.includes(size)) return;
    setBag((current) => {
      const existingIndex = current.findIndex((item) => item.productId === productId && item.size === size);
      if (existingIndex === -1) return [...current, { productId, size, qty: 1 }];
      return current.map((item, index) => index === existingIndex ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + 1) } : item);
    });
    setToast(copy.product.added);
    setBagOpen(true);
  }

  function updateBagItem(index, delta) {
    setBag((current) => current
      .map((item, itemIndex) => itemIndex === index ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + delta) } : item)
      .filter((item) => item.qty > 0));
  }

  return (
    <div className="site-shell is-ready">
      <Header
        route={route}
        copy={copy}
        language={language}
        bagCount={bagCount}
        wishlistCount={wishlist.length}
        onWishlist={() => navigateShop("all", true)}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((value) => !value)}
        onLanguage={() => setLanguage((value) => value === "de" ? "en" : "de")}
        onHome={navigateHome}
        onShop={navigateShop}
        onBrands={() => navigateBrands()}
        onAbout={navigateAbout}
        onSearch={focusSearch}
        onBag={() => setBagOpen(true)}
      />

      {route === "product" ? (
        activeProduct ? (
          <ProductPage
            key={activeProduct.id}
            product={activeProduct}
            copy={copy}
            language={language}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            onHome={navigateHome}
            onShop={navigateShop}
            onAdvice={() => openService("advice", activeProduct)}
            onAdd={() => selectedSize && addToBag(activeProduct.id, selectedSize)}
            favorite={wishlist.includes(activeProduct.id)}
            onToggleFavorite={() => toggleFavorite(activeProduct.id)}
            onVariant={openProduct}
            onOpen={openProduct}
            wishlist={wishlist}
            onToggleRelatedFavorite={toggleFavorite}
            onBrand={navigateBrands}
          />
        ) : <main className="pdp-not-found"><h1>{language === "de" ? "Produkt nicht gefunden." : "Product not found."}</h1><button className="underlined-link" type="button" onClick={() => navigateShop()}>{copy.product.back}<ArrowIcon /></button></main>
      ) : route === "home" ? (
        <HomePage
          copy={copy}
          language={language}
          onShop={navigateShop}
          onGallery={navigateGallery}
          onHome={navigateHome}
          onOpen={openProduct}
          onQuickAdd={addToBag}
          onBrand={navigateBrands}
          onAbout={navigateAbout}
          wishlist={wishlist}
          onToggleFavorite={toggleFavorite}
          onTrade={() => setTradeOpen(true)}
          onService={openService}
          onPrivacy={() => setLegalOpen("privacy")}
        />
      ) : route === "brands" ? (
        activeBrandId ? <BrandDetailPage key={activeBrandId} brand={activeBrand} language={language} onBrand={navigateBrands} onBrands={navigateBrands} onShop={navigateShop} renderProduct={(product) => <ProductCard key={product.id} product={product} copy={copy} language={language} onOpen={openProduct} wishlist={wishlist} onToggleFavorite={toggleFavorite} />} />
          : <BrandsPage language={language} onBrand={navigateBrands} onAbout={navigateAbout} />
      ) : route === "about" ? (
        <AboutPage language={language} onBrand={navigateBrands} onShop={navigateShop} onAdvice={() => openService("advice")} />
      ) : route === "gallery" ? (
        <GalleryPage copy={copy} onShop={navigateShop} onService={openService} />
      ) : (
        <ShopPage
          copy={copy}
          language={language}
          products={visibleProducts}
          filter={filter}
          search={search}
          sort={sort}
          savedOnly={savedOnly}
          wishlist={wishlist}
          onToggleFavorite={toggleFavorite}
          onFilter={(brand) => updateCatalog("brand", brand, "all")}
          onSearch={(query) => updateCatalog("q", query)}
          onSort={(value) => updateCatalog("sort", value, "featured")}
          onOpen={openProduct}
          onShowAll={resetCatalog}
          onService={openService}
        />
      )}

      <Footer
        copy={copy}
        language={language}
        onAbout={navigateAbout}
        onBrand={navigateBrands}
        onHome={navigateHome}
        onTrade={() => setTradeOpen(true)}
        onService={openService}
        onLegal={setLegalOpen}
      />

      {bagOpen && (
        <BagDrawer
          bag={bag}
          total={bagTotal}
          copy={copy}
          language={language}
          onClose={() => setBagOpen(false)}
          onUpdate={updateBagItem}
          onRemove={(index) => setBag((current) => current.filter((_, itemIndex) => itemIndex !== index))}
          onEnquire={() => {
            setBagOpen(false);
            setServiceContext({ bag });
            setServiceOpen("selection");
          }}
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
          context={serviceContext}
          suspended={Boolean(legalOpen)}
          copy={copy}
          language={language}
          onClose={() => setServiceOpen(null)}
          onPrivacy={() => setLegalOpen("privacy")}
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

      <div className="sr-only" role="status" aria-live="polite">{toast}</div>
    </div>
  );
}

function Header({ route, copy, language, bagCount, wishlistCount, onWishlist, scrolled, mobileOpen, onToggleMobile, onLanguage, onHome, onShop, onBrands, onAbout, onSearch, onBag }) {
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="announcement-bar"><span>{copy.announcement}</span></div>
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-cluster nav-cluster-left">
          <button type="button" onClick={() => onShop("all")} aria-current={route === "shop" ? "page" : undefined}>{copy.nav.shop}</button>
          <button type="button" onClick={() => onHome("featured")}>{copy.nav.new}</button>
          <button type="button" onClick={onBrands} aria-current={route === "brands" ? "page" : undefined}>{copy.nav.brands}</button>
        </div>
        <button className="header-wordmark" type="button" onClick={() => onHome()} aria-label="NES home">NES</button>
        <div className="nav-cluster nav-cluster-right">
          <button type="button" onClick={onAbout} aria-current={route === "about" ? "page" : undefined}>{copy.nav.about}</button>
          <button className="language-button" type="button" onClick={onLanguage} aria-label={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>{language.toUpperCase()}</button>
          <button className="icon-button" type="button" onClick={onSearch} aria-label={copy.nav.search}><SearchIcon /></button>
          <button className="icon-button wishlist-nav" type="button" onClick={onWishlist} aria-label={`${copy.nav.saved}: ${wishlistCount}`}><HeartIcon />{wishlistCount > 0 && <span>{wishlistCount}</span>}</button>
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
            <button type="button" onClick={onWishlist}>{copy.nav.saved} ({wishlistCount})<HeartIcon /></button>
            <button type="button" onClick={onBrands}>{copy.nav.brands}<ArrowIcon /></button>
            <button type="button" onClick={onAbout}>{copy.nav.about}<ArrowIcon /></button>
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

function ShoppableLook({ copy, language, onOpen }) {
  const hotspots = [
    { product: PRODUCTS.find((product) => product.id === 12), className: "shoppable-hotspot-pullover" },
    { product: PRODUCTS.find((product) => product.id === 119), className: "shoppable-hotspot-shoe" },
  ].filter(({ product }) => product);

  return (
    <section className="shoppable-look" id="shop-the-look" aria-labelledby="shoppable-look-title">
      <div className="shoppable-look-inner" data-reveal="clip">
        <div className="shoppable-look-copy">
          <p className="eyebrow eyebrow-quoted">{copy.look.label}</p>
          <h2 id="shoppable-look-title" className="display-italic">{copy.look.title}</h2>
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

function HomePage({ copy, language, onShop, onGallery, onHome, onOpen, onQuickAdd, onBrand, onAbout, wishlist, onToggleFavorite, onTrade, onService, onPrivacy }) {
  const featuredGroups = [
    {
      id: "shoes-accessories",
      label: "WAI BY VEHON",
      title: copy.featured.shoeTitle,
      description: copy.featured.shoeText,
      brand: "wai",
      products: ["wai-mocassin", "wai-slip-on", "wai-high"].map((id) => featuredProducts.find((product) => product.id === id)),
    },
    {
      id: "knitwear",
      label: "MONTECHIARO",
      title: copy.featured.knitTitle,
      description: copy.featured.knitText,
      brand: "montechiaro",
      products: ["pully-rosso", "pully-dark-blue", "pully-orange"].map((id) => featuredProducts.find((product) => product.id === id)),
    },
  ];
  return (
    <main className="home-page">
      <section className="shop-hero" aria-labelledby="hero-title">
        <ShaderBackground>
          <div className="shop-hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="hero-title"><span>{copy.hero.title[0]}</span><em>{copy.hero.title[1]}</em></h1>
            <p className="shop-hero-body">{copy.hero.body}</p>
            <div className="shop-hero-actions">
              <button className="button button-forest" type="button" onClick={() => onShop("all")}>{copy.hero.primary}<ArrowIcon /></button>
              <a className="underlined-link" href="#brands" onClick={(event) => { event.preventDefault(); onHome("brands"); }}>{copy.hero.secondary}</a>
            </div>
          </div>
          <div className="shop-hero-signature"><span>NES / 01</span><p>{copy.hero.campaign}</p></div>
          <a className="hero-scroll" href="#spotlight" onClick={(event) => { event.preventDefault(); onHome("spotlight"); }} aria-label={language === "de" ? "WAI beim Scrollen entdecken" : "Explore WAI as you scroll"}><span />Scroll</a>
        </ShaderBackground>
      </section>

      <ProductSequence language={language} onShop={onShop} />

      <section className="featured-section section-pad" id="featured">
        <div className="featured-inner">
          <h2 id="featured-title" className="sr-only">{copy.featured.title}</h2>
          {featuredGroups.map((group) => (
            <div className="featured-group" id={`featured-${group.id}`} key={group.id}>
              <div className="featured-group-heading">
                <p className="featured-group-label">{group.label}</p>
                <h3 id={`featured-${group.id}-title`}>{group.title.map((line) => <span key={line}>{line}</span>)}</h3>
                <p className="featured-group-description">{group.description}</p>
                <button className="featured-group-cta" type="button" onClick={() => onShop(group.brand)}>{copy.featured.shopNow}</button>
              </div>
              <div className={`featured-grid featured-grid-${group.id}`} data-scroll-key={`featured-${group.id}`} aria-labelledby={`featured-${group.id}-title`}>
                {group.products.map((product) => (
                  <FeaturedProductCard
                    key={product.id}
                    product={product}
                    language={language}
                    onOpen={onOpen}
                    wishlist={wishlist}
                    onToggleFavorite={onToggleFavorite}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="house-intro section-pad">
        <div className="house-intro-index" data-reveal>NES<br />CURATED<br />HOUSE</div>
        <div className="house-intro-copy" data-reveal style={{ "--reveal-delay": "80ms" }}>
          <p className="eyebrow eyebrow-quoted">{copy.intro.label}</p>
          <h2 className="display-italic">{copy.intro.title}</h2>
          <p>{copy.intro.text}</p>
          <a className="story-link" href="/about" onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onAbout(); }}>{copy.nav.about}<ArrowIcon /></a>
        </div>
      </section>

      <section className="brand-section section-pad" id="brands" aria-labelledby="home-brands-title">
        <div className="home-brand-intro"><div><p className="eyebrow">{copy.brands.label}</p><h2 id="home-brands-title"><span>{copy.brands.title}</span>{" "}<em>{copy.brands.titleAccent}</em></h2></div><p>{copy.brands.body}</p></div>
        <BrandCards language={language} onBrand={onBrand} />
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

      <StandardSection copy={copy} onShop={onShop} />

      <ServiceStrip copy={copy} onShop={onShop} onService={onService} />

      <section className="trade-band">
        <div data-reveal><p className="eyebrow eyebrow-light">{copy.trade.label}</p><h2>{copy.trade.title}</h2></div>
        <p data-reveal style={{ "--reveal-delay": "70ms" }}>{copy.trade.body}</p>
        <button className="button button-gold" type="button" onClick={onTrade} data-reveal style={{ "--reveal-delay": "140ms" }}>{copy.trade.cta}<ArrowIcon /></button>
      </section>

      <KnitQuality language={language} onShop={onShop} />

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

function ShopPage({ copy, language, products, filter, search, sort, savedOnly, wishlist, onToggleFavorite, onFilter, onSearch, onSort, onOpen, onShowAll, onService }) {
  const tabs = [
    { id: "all", label: language === "de" ? "Alle Produkte" : "All products" },
    { id: "vehon", label: language === "de" ? "Alle Schuhe" : "All footwear" },
    { id: "wai", label: "WAI · Feel Shoes" },
    { id: "vehon-models", label: "Vehon · Loafer" },
    { id: "montechiaro", label: language === "de" ? "Montechiaro · Strick" : "Montechiaro · Knitwear" },
  ];
  const renderCard = (product, index) => <ProductCard key={product.id} product={product} wishlist={wishlist} onToggleFavorite={onToggleFavorite} copy={copy} language={language} onOpen={onOpen} revealDelay={`${Math.min(index, 5) * 45}ms`} />;

  return (
    <main className="catalog-page">
      <section className="catalog-intro section-pad">
        <div className="catalog-intro-heading">
          <p className="eyebrow">{copy.shop.breadcrumb}</p>
          <h1>{savedOnly ? copy.shop.savedTitle : copy.shop.title}<span className="catalog-intro-period">.</span></h1>
        </div>
        <div className="catalog-intro-summary"><p>{savedOnly ? copy.shop.savedIntro : copy.shop.intro}</p></div>
      </section>
      <section className="catalog section-pad" aria-label={copy.shop.title}>
        <div className="catalog-controls">
          <div className="catalog-tabs" role="group" aria-label={language === "de" ? "Produkte filtern" : "Filter products"}>
            {tabs.map((tab) => <button className={filter === tab.id ? "is-active" : ""} aria-pressed={filter === tab.id} type="button" onClick={() => onFilter(tab.id)} key={tab.id}>{tab.label}</button>)}
          </div>
          <div className="catalog-toolbar">
            <label className="catalog-search" htmlFor="catalog-search"><SearchIcon /><span className="sr-only">{copy.shop.searchLabel}</span><input id="catalog-search" type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={copy.shop.searchPlaceholder} /></label>
            <span className="catalog-count" role="status">{products.length} {products.length === 1 ? copy.shop.product : copy.shop.products}</span>
            <label className="catalog-sort"><span>{copy.shop.sortLabel}</span><select value={sort} onChange={(event) => onSort(event.target.value)}><option value="featured">{copy.shop.featured}</option><option value="price-asc">{copy.shop.priceAsc}</option><option value="price-desc">{copy.shop.priceDesc}</option><option value="name">{copy.shop.name}</option></select></label>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="product-grid catalog-grid">{products.map(renderCard)}</div>
        ) : (
          <div className="catalog-empty">
            <h2>{savedOnly && wishlist.length === 0 ? copy.shop.savedEmpty : copy.shop.noResults}</h2>
            <p>{savedOnly && wishlist.length === 0 ? copy.shop.savedEmptyBody : copy.shop.noResultsBody}</p>
            <button className="button button-forest" type="button" onClick={onShowAll}>{copy.shop.showAll}<ArrowIcon /></button>
          </div>
        )}
      </section>
      <ServiceStrip copy={copy} onShop={onShowAll} onService={onService} />
    </main>
  );
}

function SectionHeading({ label, title }) {
  return <div className="section-heading" data-reveal><p className="eyebrow eyebrow-quoted">{label}</p><h2 className="display-italic">{title}</h2></div>;
}

function StandardSection({ copy, onShop }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const studyRef = useRef(null);
  const points = copy.standard.points;
  const staticMedia = "(prefers-reduced-motion: reduce), (max-height: 650px)";

  useEffect(() => {
    const track = trackRef.current;
    const study = studyRef.current;
    const media = window.matchMedia(staticMedia);
    let raf;
    const update = () => {
      raf = undefined;
      if (media.matches) return;
      const top = Number.parseFloat(getComputedStyle(study).top) || 0;
      const travel = Math.max(1, track.offsetHeight - study.offsetHeight);
      const progress = Math.max(0, Math.min(1, (top - track.getBoundingClientRect().top) / travel));
      track.dataset.progress = progress.toFixed(4);
      setActive(Math.min(2, Math.floor(progress * 3)));
    };
    const schedule = () => { if (!raf && !media.matches) raf = requestAnimationFrame(update); };
    const onPreference = () => { cancelAnimationFrame(raf); raf = undefined; update(); };
    const resize = new ResizeObserver(schedule);
    resize.observe(track);
    resize.observe(study);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", onPreference);
    update();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", onPreference);
    };
  }, [staticMedia]);

  const selectPoint = (index) => {
    setActive(index);
    if (window.matchMedia(staticMedia).matches) return;
    const track = trackRef.current, study = studyRef.current;
    const top = Number.parseFloat(getComputedStyle(study).top) || 0;
    const position = track.getBoundingClientRect().top + window.scrollY - top;
    window.scrollTo({ top: position + ((index + 0.15) / 3) * (track.offsetHeight - study.offsetHeight), behavior: "smooth" });
  };

  return (
    <section className="standard-section" id="standard" aria-labelledby="standard-title">
      <div className="standard-copy">
        <div className="standard-head" data-reveal>
          <div><p className="eyebrow eyebrow-quoted">{copy.standard.label}</p><h2 className="display-italic" id="standard-title">{copy.standard.title}</h2></div>
          <p className="standard-body">{copy.standard.body}</p>
        </div>
      </div>
      <div className="standard-scroll" ref={trackRef}>
        <div className="principle-study" ref={studyRef}>
          {/* Decorative — every principle's meaning lives in the list beside it. */}
          <div className="principle-stage" aria-hidden="true">
            {points.map(([index], pointIndex) => (
              <img
                className={`principle-stage-image${PRINCIPLE_MEDIA[pointIndex].texture ? " principle-stage-texture" : ""}${pointIndex === active ? " is-active" : ""}`}
                key={index}
                src={PRINCIPLE_MEDIA[pointIndex].src}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: PRINCIPLE_MEDIA[pointIndex].position }}
              />
            ))}
            <span className="principle-stage-index">{points[active][0]}</span>
          </div>

          <div className="principle-controls">
            <ul className="principle-list">
            {points.map(([index, title, body], pointIndex) => (
              <li className="principle-item" key={index}>
                <button
                  className={`principle${pointIndex === active ? " is-active" : ""}`}
                  type="button"
                  aria-pressed={pointIndex === active}
                  onClick={() => selectPoint(pointIndex)}
                >
                  <span className="principle-index">{index}</span>
                  <strong>{title}</strong>
                  <span className="principle-body"><span>{body}</span></span>
                </button>
              </li>
            ))}
            </ul>
            <button className="button button-forest" type="button" onClick={() => onShop("all")}>{copy.standard.cta}<ArrowIcon /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionAction({ label, onAction }) {
  return <div className="section-action" data-reveal><button className="underlined-link" type="button" onClick={onAction}>{label}<ArrowIcon /></button></div>;
}

function FilterPills({ options, active, onChange, label }) {
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const move = () => {
      const current = list.querySelector("[data-active='true']");
      if (!current) return;
      const listBox = list.getBoundingClientRect();
      const box = current.getBoundingClientRect();
      setIndicator({ left: box.left - listBox.left + list.scrollLeft, width: box.width });
    };
    move();
    const resize = new ResizeObserver(move);
    resize.observe(list);
    return () => resize.disconnect();
  }, [active, options.length]);

  return (
    <div className="filter-pills" role="group" aria-label={label} ref={listRef} data-reveal>
      {indicator ? (
        <span
          className="filter-pill-indicator"
          aria-hidden="true"
          style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
        />
      ) : null}
      {options.map((option) => (
        <button
          className={`filter-pill${option.id === active ? " is-active" : ""}`}
          type="button"
          key={option.id}
          data-active={option.id === active}
          aria-pressed={option.id === active}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function FeaturedProductCard({ product, language, onOpen, onQuickAdd, wishlist, onToggleFavorite }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [mainLoaded, setMainLoaded] = useState(false);
  const [hoverLoaded, setHoverLoaded] = useState(false);
  const [mobileSizesOpen, setMobileSizesOpen] = useState(false);
  const isGerman = language === "de";
  const color = product.colors[colorIndex];
  const selectedProduct = PRODUCTS.find((item) => item.id === (color.sourceProductId || product.sourceProductId));
  const favorite = wishlist.includes(selectedProduct.id);
  const mainImage = color.image === product.images[0].src
    ? product.images[0]
    : { src: color.image, width: color.width, height: color.height };
  const secondImage = color.hoverImage
    ? { src: color.hoverImage, width: color.hoverWidth, height: color.hoverHeight }
    : product.images[1];

  const openProduct = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onOpen(selectedProduct.id);
  };

  const quickAdd = (event, size) => {
    event.preventDefault();
    event.stopPropagation();
    setMobileSizesOpen(false);
    onQuickAdd(selectedProduct.id, size);
  };

  return (
    <article className="featured-card" data-category={product.category} data-family={product.familyId} data-cutout={mainImage.src.includes("cutout") ? "true" : undefined} onKeyDown={(event) => event.key === "Escape" && setMobileSizesOpen(false)}>
      <div className={`featured-card-media${mainLoaded ? " is-loaded" : ""}${hoverLoaded ? " is-hover-loaded" : ""}`}>
        <span className="featured-card-skeleton" aria-hidden="true" />
        <img
          className="featured-card-image featured-card-image-main"
          key={mainImage.src}
          src={mainImage.src}
          width={mainImage.width}
          height={mainImage.height}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setMainLoaded(true)}
          onError={() => setMainLoaded(true)}
        />
        {secondImage && <img
          className="featured-card-image featured-card-image-hover"
          key={secondImage.src}
          src={secondImage.src}
          width={secondImage.width}
          height={secondImage.height}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setHoverLoaded(true)}
          onError={() => setHoverLoaded(false)}
        />}
        {product.badge && <span className="featured-card-badge">{localize(product.badge, language)}</span>}
        <button
          className={`featured-card-wishlist${favorite ? " is-active" : ""}`}
          type="button"
          aria-label={favorite
            ? (isGerman ? `${selectedProduct.name} von der Merkliste entfernen` : `Remove ${selectedProduct.name} from wishlist`)
            : (isGerman ? `${selectedProduct.name} zur Merkliste hinzufügen` : `Add ${selectedProduct.name} to wishlist`)}
          aria-pressed={favorite}
          onClick={(event) => { event.preventDefault(); event.stopPropagation(); onToggleFavorite(selectedProduct.id); }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3 4.1 12.9a5.1 5.1 0 0 1 7.2-7.2l.7.7.7-.7a5.1 5.1 0 0 1 7.2 7.2Z" /></svg>
        </button>
        <div className={`featured-card-quick-add${mobileSizesOpen ? " is-open" : ""}`}>
          <span>{isGerman ? "Größe wählen" : "Select size"}</span>
          <div className="featured-card-sizes">
            {selectedProduct.sizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-label={`${selectedProduct.name}, ${isGerman ? "Größe" : "size"} ${size}`}
                onClick={(event) => quickAdd(event, size)}
              >{size}</button>
            ))}
          </div>
        </div>
        <button
          className="featured-card-mobile-add"
          type="button"
          aria-label={`${selectedProduct.name}: ${isGerman ? "Größe wählen" : "select size"}`}
          aria-expanded={mobileSizesOpen}
          onClick={(event) => { event.preventDefault(); event.stopPropagation(); setMobileSizesOpen((value) => !value); }}
        >{mobileSizesOpen ? "×" : "+"}</button>
      </div>
      <div className="featured-card-info">
        <a className="featured-card-link" href={`/products/${getProductSlug(selectedProduct)}`} onClick={openProduct} aria-label={`${product.brand} ${selectedProduct.name}, ${color.name}, ${formatPrice(selectedProduct.price, language)}`}>
          <span className="featured-card-brand">{product.brand}</span>
          <span className="featured-card-title-row">
            <strong>{selectedProduct.name}</strong>
            <span className="featured-card-prices">
              {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice, language)}</s>}
              <span className={product.compareAtPrice ? "is-sale" : ""}>{formatPrice(selectedProduct.price, language)}</span>
            </span>
          </span>
        </a>
        {product.colors.length > 1 && (
          <div className="featured-card-swatches" role="group" aria-label={`${selectedProduct.name}: ${isGerman ? "Farben und Stoffe" : "Colours and fabrics"}`}>
            {product.colors.map((variant, index) => (
              <button
                key={variant.name}
                className={index === colorIndex ? "is-active" : ""}
                type="button"
                style={{ "--swatch-color": variant.swatch || variant.hex }}
                aria-label={`${variant.name} ${isGerman ? "anzeigen" : "show"}`}
                aria-pressed={index === colorIndex}
                title={variant.name}
                onClick={(event) => { event.preventDefault(); event.stopPropagation(); if (index !== colorIndex) { setMainLoaded(false); setHoverLoaded(false); setMobileSizesOpen(false); setColorIndex(index); } }}
              ><span /></button>
            ))}
            <span className="featured-card-color-name" aria-live="polite">{color.name}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function FavoriteButton({ product, favorite, language, onToggle, className = "featured-card-wishlist" }) {
  const label = language === "de"
    ? `${product.name} ${favorite ? "von der Merkliste entfernen" : "zur Merkliste hinzufügen"}`
    : `${favorite ? "Remove" : "Save"} ${product.name} ${favorite ? "from" : "to"} wishlist`;
  return <button type="button" className={`${className}${favorite ? " is-active" : ""}`} aria-label={label} aria-pressed={favorite} onClick={onToggle}><HeartIcon />{className === "detail-save" && <span>{language === "de" ? (favorite ? "Gemerkt" : "Merken") : (favorite ? "Saved" : "Save")}</span>}</button>;
}

function ProductCard({ product: initialProduct, media, copy, language, onOpen, revealDelay, wishlist, onToggleFavorite }) {
  const variants = initialProduct.familyId ? getProductVariants(initialProduct, PRODUCTS) : [initialProduct];
  const [variantId, setVariantId] = useState(initialProduct.id);
  const product = variants.find((item) => item.id === variantId) || initialProduct;
  const favorite = wishlist.includes(product.id);
  const cardImage = media?.image ?? product.image;
  const cardHoverImage = media?.hoverImage ?? product.hoverImage;
  const cardFit = media?.fit ?? product.fit;
  const open = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onOpen(product.id);
  };
  const href = `/products/${getProductSlug(product)}`;

  return (
    <article className={`product-card product-card-${product.brandId}`} data-reveal style={revealDelay ? { "--reveal-delay": revealDelay } : undefined}>
      <div className="catalog-card-media">
        <a className={`product-media product-fit-${cardFit}${cardHoverImage ? " has-hover" : ""}`} href={href} onClick={open} aria-label={`${product.name} ${copy.product.view}`}>
          {product.tag && <span className="product-tag">{localize(product.tag, language)}</span>}
          <img className="product-image product-image-main" src={cardImage} alt={product.name} loading="lazy" decoding="async" />
          {cardHoverImage && <img className="product-image product-image-hover" src={cardHoverImage} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
          <span className="product-plus" aria-hidden="true">+</span>
        </a>
        <FavoriteButton product={product} favorite={favorite} language={language} onToggle={() => onToggleFavorite(product.id)} />
      </div>
      <a className="product-copy" href={href} onClick={open}>
        <span className="product-brand">{product.brand}</span>
        <span className="product-title-row"><strong>{product.name}</strong><span>{formatPrice(product.price, language)}</span></span>
        <span className="product-subtitle">{localize(product.subtitle, language)} · {localize(product.color, language)}</span>
      </a>
      {variants.length > 1 && <div className="featured-card-swatches" role="group" aria-label={`${product.name}: ${copy.product.color}`}>
        {variants.map((variant) => <button key={variant.id} type="button" title={localize(variant.color, language)} aria-label={localize(variant.color, language)} aria-pressed={variant.id === product.id} className={variant.id === product.id ? "is-active" : ""} style={{ "--swatch-color": variant.swatch || variant.hex }} onClick={() => setVariantId(variant.id)}><span /></button>)}
      </div>}
    </article>
  );
}

function ProductPage({ product, copy, language, selectedSize, onSelectSize, onHome, onShop, onAdvice, onAdd, favorite, onToggleFavorite, onVariant, onOpen, wishlist, onToggleRelatedFavorite, onBrand }) {
  const [imageIndex, setImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const images = product.gallery ?? [
    { src: product.image, fit: product.brandId === "vehon" ? "cover" : product.fit },
    { src: product.hoverImage, fit: product.brandId === "vehon" ? "cover" : product.fit },
  ];
  const image = images[imageIndex];
  const variants = getProductVariants(product, PRODUCTS);
  const related = groupProductFamilies(PRODUCTS.filter((item) => !item.catalogHidden && item.id !== product.id && (!product.familyId || item.familyId !== product.familyId) && item.brandId === product.brandId)).slice(0, 3);
  const brand = getBrandForProduct(product);
  const brandNote = brand?.[language].story;
  const sizeOptions = product.sizeOptions ?? product.sizes.map((size) => typeof size === "string" ? { label: size, available: true } : size);
  const moveImage = (delta) => setImageIndex((index) => (index + delta + images.length) % images.length);
  const followLink = (event, navigate) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate();
  };

  return (
    <main className="pdp-page" aria-labelledby="product-detail-title">
      <section className="pdp-hero">
        <div
          className="pdp-media"
          tabIndex={0}
          aria-label={`${product.name}: ${copy.productPage.view} ${imageIndex + 1} / ${images.length}`}
          onKeyDown={(event) => { if (event.key === "ArrowLeft") moveImage(-1); if (event.key === "ArrowRight") moveImage(1); }}
          onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => { if (touchStartX.current !== null) { const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) moveImage(distance < 0 ? 1 : -1); touchStartX.current = null; } }}
        >
          <img
            key={image.src}
            className={image.fit === "contain" ? "pdp-media-cutout" : ""}
            src={image.src}
            alt={`${product.name}, ${localize(product.color, language)} — ${copy.productPage.view} ${imageIndex + 1}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {images.length > 1 && <div className="pdp-gallery-controls">
            <button type="button" onClick={() => moveImage(-1)} aria-label={copy.productPage.previous}>←</button>
            <span aria-live="polite">{String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => moveImage(1)} aria-label={copy.productPage.next}>→</button>
          </div>}
        </div>

        <div className="pdp-info">
          <div className="pdp-info-inner">
            <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
              <a href="/" onClick={(event) => followLink(event, () => onHome())}>{copy.productPage.home}</a><span aria-hidden="true">/</span>
              <a href="/shop" onClick={(event) => followLink(event, () => onShop("all"))}>{copy.productPage.collection}</a><span aria-hidden="true">/</span>
              <span aria-current="page">{product.name}</span>
            </nav>
            <p className="pdp-category">{brand ? <a className="pdp-brand-link" href={`/brands/${brand.id}`} onClick={(event) => followLink(event, () => onBrand(brand.id))}>{product.brand}<ArrowIcon /></a> : product.brand} / {localize(product.category, language)}</p>
            <h1 id="product-detail-title">{product.name}</h1>
            <p className="pdp-subtitle">{localize(product.subtitle, language)}</p>
            <div className="pdp-price-row">
              <p>{formatPrice(product.price, language)}</p>
              <FavoriteButton product={product} favorite={favorite} language={language} onToggle={onToggleFavorite} className="detail-save" />
            </div>
            <p className="pdp-description">{localize(product.description, language)}</p>

            <div className="pdp-variants">
              <p>{product.familyId ? (language === "de" ? "Farbe & Stoff" : "Colour & fabric") : copy.product.color} <strong>{localize(product.color, language)}</strong></p>
              <div className="pdp-variant-list" role="group" aria-label={copy.product.color}>
                {variants.map((variant) => <button type="button" key={variant.id} aria-label={`${localize(variant.color, language)} — ${variant.name}`} aria-pressed={variant.id === product.id} className={variant.id === product.id ? "is-active" : ""} onClick={() => variant.id !== product.id && onVariant(variant.id)}><img src={variant.image} alt="" loading="eager" decoding="async" /></button>)}
              </div>
            </div>

            <div className="pdp-size-picker">
              <div><span>{copy.product.chooseSize}</span><button type="button" onClick={onAdvice}>{copy.product.guide}</button></div>
              <div className={`pdp-size-grid ${product.familyId ? "is-paired" : ""}`} role="group" aria-label={copy.product.chooseSize}>
                {sizeOptions.map((size) => <button className={selectedSize === size.label ? "is-active" : ""} aria-pressed={selectedSize === size.label} aria-label={`${copy.product.chooseSize}: ${size.label}`} type="button" key={size.label} disabled={!size.available} onClick={() => onSelectSize(size.label)}>{size.label}</button>)}
              </div>
            </div>

            <button className="pdp-add" type="button" disabled={!selectedSize} onClick={onAdd}><span>{selectedSize ? copy.product.add : copy.product.chooseFirst}</span><span aria-hidden="true">→</span></button>
            <ul className="pdp-trust">
              {copy.productPage.trust.map(([icon, title, detail]) => <li key={icon}><PdpTrustIcon kind={icon} /><span><strong>{title}</strong><small>{detail}</small></span></li>)}
            </ul>
            <dl className="pdp-facts">
              <div><dt>{copy.product.material}</dt><dd>{localize(product.materialLabel || product.material, language)}</dd></div>
              <div><dt>{copy.product.color}</dt><dd>{localize(product.color, language)}</dd></div>
              <div><dt>{copy.product.delivery}</dt><dd>{copy.product.deliveryValue}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="pdp-editorial" aria-labelledby="pdp-story-title">
        <div className="pdp-editorial-heading"><span>NES / {copy.productPage.details}</span><h2 id="pdp-story-title">{copy.productPage.story}</h2><p>{brandNote || localize(product.description, language)}</p></div>
        {images.length > 1 && <div className={`pdp-extra-images${images.length === 2 ? " is-single" : ""}`} aria-label={copy.productPage.images}>
          {images.slice(1).map((item, index) => <figure key={item.src} className={item.fit === "contain" ? "is-cutout" : ""}><img src={item.src} alt={`${product.name} — ${copy.productPage.view} ${index + 2}`} loading="lazy" decoding="async" /><figcaption>{String(index + 2).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</figcaption></figure>)}
        </div>}
        <div className="pdp-material-note"><span>{copy.product.material}</span><p>{localize(product.materialLabel || product.material, language)}</p></div>
        {brand && <a className="story-link pdp-brand-story-link" href={`/brands/${brand.id}`} onClick={(event) => followLink(event, () => onBrand(brand.id))}>{language === "de" ? `Mehr über ${brand.name}` : `More about ${brand.name}`}<ArrowIcon /></a>}
      </section>

      {related.length > 0 && <section className="pdp-related" aria-labelledby="pdp-related-title">
        <div className="pdp-related-heading"><span>NES / {copy.productPage.collection}</span><h2 id="pdp-related-title">{copy.productPage.more}</h2></div>
        <div className="pdp-related-grid">{related.map((item) => <ProductCard key={item.id} product={item} copy={copy} language={language} onOpen={onOpen} wishlist={wishlist} onToggleFavorite={onToggleRelatedFavorite} />)}</div>
      </section>}
    </main>
  );
}

function PdpTrustIcon({ kind }) {
  if (kind === "quality") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 7 4v8l-7 8-7-8V6zM8.5 12l2.5 2.5 4.5-5" /></svg>;
  if (kind === "delivery") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h12v11H2zM14 9h4l4 4v4h-8zM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V3m0 5h5M4 8a9 9 0 1 1-1 8" /></svg>;
}

function BagDrawer({ bag, total, copy, language, onClose, onUpdate, onRemove, onShop, onEnquire }) {
  const dialogRef = useDialogFocus();
  return (
    <div className="drawer-layer">
      <button className="drawer-backdrop" type="button" onClick={onClose} aria-label={copy.nav.close} tabIndex={-1} />
      <aside ref={dialogRef} tabIndex={-1} className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <div className="bag-heading"><div><p className="eyebrow">NES / {bag.reduce((count, item) => count + item.qty, 0)}</p><h2 id="bag-title">{copy.bag.title}</h2></div><button type="button" onClick={onClose} aria-label={copy.nav.close}><CloseIcon /></button></div>
        <div className="bag-content">
          {bag.length === 0 ? <div className="bag-empty"><BagIcon /><p>{copy.bag.empty}</p><button className="button button-forest" type="button" onClick={onShop}>{copy.bag.shop}<ArrowIcon /></button></div> : bag.map((item, index) => {
            const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
            if (!product) return null;
            return (
              <article className="bag-item" key={`${item.productId}-${item.size}`}>
                <div className={`bag-item-image product-fit-${product.fit}`}><img src={product.image} alt={product.name} /></div>
                <div className="bag-item-copy">
                  <span>{product.brand}</span><h3>{product.name}</h3>
                  <p>{localize(product.color, language)} · {copy.bag.size} {item.size}</p>
                  <div className="quantity-control" role="group" aria-label={`${product.name}, ${copy.bag.size} ${item.size}`}><button type="button" onClick={() => onUpdate(index, -1)} aria-label={`${copy.bag.decrease}: ${product.name}, ${item.size}`}>−</button><span aria-live="polite">{item.qty}</span><button type="button" onClick={() => onUpdate(index, 1)} disabled={item.qty >= MAX_QUANTITY} aria-label={`${copy.bag.increase}: ${product.name}, ${item.size}`}>+</button></div>
                  <button type="button" className="bag-remove" aria-label={`${copy.bag.remove}: ${product.name}, ${item.size}`} onClick={() => onRemove(index)}>{copy.bag.remove}</button>
                </div>
                <strong>{formatPrice(getLinePrice(product, item.qty), language)}</strong>
              </article>
            );
          })}
        </div>
        {bag.length > 0 && <div className="bag-footer"><div className="bag-total" aria-live="polite"><span>{copy.bag.subtotal}</span><strong>{formatPrice(total, language)}</strong></div><p>{copy.bag.note}</p><button className="checkout-button" type="button" onClick={onEnquire}>{copy.bag.checkout}<ArrowIcon /></button><button className="bag-continue" type="button" onClick={onClose}>{copy.bag.continue}</button></div>}
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

function ServiceModal({ type, context, suspended, copy, language, onClose, onPrivacy }) {
  const dialogRef = useDialogFocus(!suspended);
  const isSelection = type === "selection";
  const selectedItems = context?.bag || [];
  const labels = copy.serviceForms;
  const content = labels[type];
  const [form, setForm] = useState({ name: "", email: "", detail: context?.product ? `${context.product.brand} / ${context.product.name} · ${localize(context.product.color, language)}` : "", message: "", consent: false });
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
    if (!form.name.trim() || !validEmail || (!isSelection && !form.message.trim()) || !form.consent) {
      setStatus("error");
      setError(content.invalid || labels.invalid);
      return;
    }

    const detail = form.detail.trim();
    const selection = selectedItems.map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
      return `${item.qty} × ${product.brand} / ${product.name}${product.sku ? ` (${product.sku})` : ""} · ${localize(product.color, language)} · ${copy.bag.size} ${item.size} · ${formatPrice(getLinePrice(product, item.qty), language)}`;
    }).join("\n");
    const message = [selection, detail ? `${content.detail}: ${detail}` : "", form.message.trim()].filter(Boolean).join("\n\n");
    if (message.length > 4000) { setStatus("error"); setError(content.tooLong || labels.error); return; }
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
          topic: isSelection ? "Product selection enquiry (not an order)" : type === "advice" ? "Personal product and sizing advice" : "Returns and shipping",
          brand: context?.product?.brand || "All brands",
          message,
          newsletter: false,
          locale: language,
          source: `nes-shop-service-${type}`,
          consent: true,
          website: "",
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Service enquiry failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(labels.error);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose} inert={suspended || undefined} aria-hidden={suspended || undefined}>
      <div ref={dialogRef} tabIndex={-1} className="trade-modal service-modal" role="dialog" aria-modal="true" aria-labelledby="service-title" onMouseDown={(event) => event.stopPropagation()}>
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
            {isSelection && <div className="selection-summary" aria-label={copy.bag.title}>{selectedItems.map((item) => {
              const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
              return <div key={`${item.productId}-${item.size}`}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{localize(product.color, language)} · {copy.bag.size} {item.size} · {language === "de" ? "Menge" : "Quantity"} {item.qty}</small></span><span>{formatPrice(getLinePrice(product, item.qty), language)}</span></div>;
            })}</div>}
            <input className="honeypot" type="text" name="company_website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div className="trade-fields">
              <label><span>{labels.name} *</span><input type="text" value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" disabled={status === "loading"} /></label>
              <label><span>{labels.email} *</span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" disabled={status === "loading"} /></label>
              {!isSelection && <label className="trade-field-wide"><span>{content.detail}</span><input type="text" value={form.detail} onChange={(event) => update("detail", event.target.value)} disabled={status === "loading"} /></label>}
              <label className="trade-field-wide"><span>{isSelection ? content.message : `${labels.message} *`}</span><textarea rows="4" maxLength={2000} value={form.message} onChange={(event) => update("message", event.target.value)} disabled={status === "loading"} /></label>
            </div>
            <label className="trade-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} disabled={status === "loading"} /><span>{labels.consent} <button type="button" onClick={onPrivacy}>{copy.newsletter.privacyLink}</button></span></label>
            <p className="trade-error" role="alert">{status === "error" ? error : ""}</p>
            <button className="trade-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? labels.sending : content.submit}<ArrowIcon /></button>
          </form>
        )}
      </div>
    </div>
  );
}

function LegalModal({ kind, language, copy, onClose }) {
  const dialogRef = useDialogFocus();
  const documentCopy = LEGAL[language][kind];
  return (
    <div ref={dialogRef} tabIndex={-1} className="legal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <button className="legal-close" type="button" onClick={onClose}><span aria-hidden="true">←</span>{copy.legalBack}</button>
      <div className="legal-document"><span className="legal-wordmark">NES</span><h1 id="legal-title">{documentCopy.title}</h1><p className="legal-intro">{documentCopy.intro}</p>{documentCopy.blocks.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<p className="legal-note">{documentCopy.note}</p></div>
    </div>
  );
}

function Footer({ copy, language, onHome, onBrand, onAbout, onTrade, onService, onLegal }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><button className="footer-wordmark" type="button" onClick={() => onHome()}>NES</button><p>{copy.footer.about}</p></div>
        <div className="footer-column"><h3>{copy.footer.collections}</h3>{BRANDS.map(brand => <a className="footer-brand-link" key={brand.id} href={`/brands/${brand.id}`} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onBrand(brand.id); }}>{brand.name}</a>)}</div>
        <div className="footer-column"><h3>{copy.footer.service}</h3><button type="button" onClick={() => onService("advice")}>{copy.footer.advice}</button><button type="button" onClick={() => onService("returns")}>{copy.footer.returns}</button></div>
        <div className="footer-column"><h3>{copy.footer.house}</h3><button type="button" onClick={onAbout}>{copy.nav.about}</button><button type="button" onClick={onTrade}>{copy.footer.contact}</button><button type="button" onClick={() => onLegal("privacy")}>{copy.footer.privacy}</button><button type="button" onClick={() => onLegal("imprint")}>{copy.footer.imprint}</button></div>
      </div>
      <div className="footer-bottom"><span>© 2026 NES</span><span>{language === "de" ? "Barfußgefühl. Mit Charakter." : "Barefoot feeling. With character."}</span><span>{copy.footer.country}</span></div>
    </footer>
  );
}

function HeartIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3 4.1 12.9a5.1 5.1 0 0 1 7.2-7.2l.7.7.7-.7a5.1 5.1 0 0 1 7.2 7.2Z" /></svg>; }
function ArrowIcon() { return <svg className="arrow-icon" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.5 15.5 4.2 4.2" /></svg>; }
function BagIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.5h13l.8 11h-14.6l.8-11Z" /><path d="M9 9V6.7a3 3 0 0 1 6 0V9" /></svg>; }
function MenuIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 17h18" /></svg>; }
function CloseIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>; }
