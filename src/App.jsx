import { useEffect, useRef, useState } from "react";
import { ShaderBackground } from "./components/ui/shaders-hero-section";
import "./App.css";

const MESSE_GALLERY = [
  {
    src: "/messe-offenbach/team-am-stand.jpeg",
    area: "lead",
    alt: {
      en: "The team at the NES stand at the fair",
      de: "Das Team am NES-Stand auf der Messe",
    },
  },
  {
    src: "/messe-offenbach/feel-shoes-auswahl.jpeg",
    area: "ph2",
    alt: {
      en: "A selection of feel shoes at the stand",
      de: "Eine Auswahl an Feel-Schuhen am Stand",
    },
  },
  {
    src: "/messe-carousel/messe-08.jpeg",
    area: "ph3",
    alt: {
      en: "Barefoot shoe fitting and consultation at the stand",
      de: "Anprobe und Beratung zu Barfußschuhen am Stand",
    },
  },
  {
    src: "/messe-carousel/messe-07.jpeg",
    area: "ph4",
    alt: {
      en: "A view through the exhibition hall in Offenbach",
      de: "Blick durch die Messehalle in Offenbach",
    },
  },
  {
    src: "/messe-carousel/messe-04.jpeg",
    area: "ph5",
    alt: {
      en: "A product demonstration at the barefoot shoe stand",
      de: "Eine Produktvorführung am Messestand",
    },
  },
  {
    src: "/messe-carousel/messe-06.jpeg",
    area: "ph6",
    alt: {
      en: "Visitors in conversation at the exhibition stand",
      de: "Besucher im Gespräch am Messestand",
    },
  },
];

const BRANDS = [
  {
    name: "Green Comfort",
    logo: "/logos/greencomfort.svg?v=official",
    products: [{}, {}, {}, {}],
    copy: {
      en: {
        meta: "Randers, Denmark · Since 1994",
        signature:
          "Built around the patented EnergySole™ — resilient cushioning for active feet.",
        description:
          "Danish foot-health footwear built on wide fits and lasting comfort — considered production, made to last.",
        facts: ["Foot-health", "Wide fits", "EnergySole™"],
      },
      de: {
        meta: "Randers, Dänemark · Seit 1994",
        signature:
          "Rund um die patentierte EnergySole™ — langlebige Dämpfung für aktive Füße.",
        description:
          "Dänische Schuhe für gesunde Füße — weite Passformen, bedachte Produktion, gemacht, um zu bleiben.",
        facts: ["Gesunde Füße", "Weite Passformen", "EnergySole™"],
      },
    },
  },
  {
    name: "Vehon",
    logo: "/logos/vehon.png",
    products: [{}, {}, {}, {}],
    copy: {
      en: {
        meta: "Italy · Formerly WAI · True barefoot",
        signature:
          "True barefoot construction with a signature red-grip outsole.",
        description:
          "Italian elegance in true barefoot construction — zero-drop, a wide toe box and an exceptionally thin, flexible sole.",
        facts: ["True barefoot", "Zero-drop", "Wide toe box"],
      },
      de: {
        meta: "Italien · Ehemals WAI · Echtes Barfußgefühl",
        signature:
          "Echte Barfußkonstruktion mit markanter roter Grip-Sohle.",
        description:
          "Italienische Eleganz in echter Barfußkonstruktion — Zero-Drop, breite Zehenbox und eine besonders dünne, flexible Sohle.",
        facts: ["Echtes Barfußgefühl", "Zero-Drop", "Breite Zehenbox"],
      },
    },
  },
];

const COPY = {
  en: {
    languageName: "English",
    languageMenu: "Choose language",
    homeLabel: "NES home",
    navLabel: "Main navigation",
    nav: {
      idea: "The idea",
      brands: "Brands",
      fair: "Previous fair",
    },
    arrival: {
      kicker: "Welcome to",
      place: "Offenbach · Fair edition",
    },
    hero: {
      kicker: "Curated barefoot footwear",
      title: "Barefoot and natural comfort, under one roof.",
      sideNote: "Offenbach · Germany",
      scroll: "Scroll",
      scrollLabel: "Continue to the idea",
    },
    signup: {
      label: "Email address",
      placeholder: "Your email address",
      idle: "Join the list",
      loading: "Joining…",
      success: "Check your inbox",
      confirmed: "You are on the list",
      feedback: "Dates, drops and early access. No noise.",
      invalid: "Please enter a valid email address.",
      error: "Something went wrong. Please try again.",
      expired: "That confirmation link has expired. Please sign up again.",
      invalidLink: "That confirmation link is not valid. Please sign up again.",
      unsubscribed: "You have been unsubscribed. You can join again at any time.",
      privacy:
        "By joining, you agree to receive the NES newsletter. Unsubscribe at any time.",
      privacyLink: "Privacy",
    },
    idea: {
      label: "The idea",
      title:
        "NES brings distinct approaches to foot health together in one place — each chosen for",
      accent: "natural movement, lasting comfort, and design.",
      foot: "Offenbach · One roof, chosen brands",
    },
    brands: {
      label: "The brands",
      partnerNote: "For retail & brand partners",
      headline: "Foot health, done two ways.",
      subline: "Danish comfort. Italian barefoot.",
      signatureLabel: "Signature",
      productImage: "product imagery",
      productReserved: "Product asset reserved",
    },
    fair: {
      label: "Previous fair",
      title: "A look back at last year.",
      body: "People, product and natural movement in Offenbach.",
      archive: "Offenbach archive",
      caption: "Offenbach · last year's fair",
    },
    closing: {
      label: "Offenbach Trade Fair",
      title: "Get the date, the drops, and early access.",
      body: "One considered email when there is something worth knowing.",
    },
    inquiry: {
      cta: "Inquire now",
      bannerTitle: "Interested in carrying these brands?",
      bannerText: "Attractive margins and dedicated trade hours at the fair — retailers and brands welcome.",
      heroPrompt: "Retailer or brand?",
      title: "Become a partner",
      subtitle:
        "For retailers and brands. Tell us a little about you and we'll be in touch.",
      stepLabel: "Step",
      stepOf: "of",
      steps: ["Your contact", "Your company", "Your interest", "Almost done"],
      next: "Continue",
      back: "Back",
      role: {
        label: "I am a",
        options: ["Retailer", "Brand / supplier", "Private customer", "Press", "Other"],
      },
      topic: {
        label: "My interest",
        options: [
          "Reselling & wholesale terms",
          "Meeting at Messe Offenbach",
          "Range, catalogue & pricing",
          "General enquiry",
        ],
      },
      brands: {
        label: "Brands of interest",
        options: ["Green Comfort", "Vehon", "All brands"],
      },
      fields: {
        name: "Name",
        company: "Company",
        email: "Email address",
        phone: "Phone",
        message: "Message",
      },
      placeholders: {
        name: "First and last name",
        company: "Store or brand name",
        email: "you@company.com",
        phone: "Optional",
        message: "How can we help? Anything we should know?",
      },
      optional: "optional",
      consent: "I agree that my details may be processed to handle this enquiry.",
      consentLink: "Privacy policy",
      newsletter: "Also keep me posted on dates, drops and early access.",
      submit: "Send enquiry",
      sending: "Sending…",
      successTitle: "Thank you",
      successBody: "We've received your enquiry and will get back to you shortly.",
      invalid: "Please enter your name and a valid email address.",
      invalidConsent: "Please accept the privacy note to continue.",
      error: "Something went wrong. Please try again.",
      close: "Close",
    },
    footer: {
      linksLabel: "Social and legal",
      contact: "Contact",
      impressum: "Legal notice",
      privacy: "Privacy",
      legalBack: "Back to site",
    },
  },
  de: {
    languageName: "Deutsch",
    languageMenu: "Sprache wählen",
    homeLabel: "NES Startseite",
    navLabel: "Hauptnavigation",
    nav: {
      idea: "Die Idee",
      brands: "Marken",
      fair: "Messe-Rückblick",
    },
    arrival: {
      kicker: "Willkommen bei",
      place: "Offenbach · Messe Edition",
    },
    hero: {
      kicker: "Ausgewählte Schuhe für natürliche Bewegung",
      title: "Barfuß und natürlicher Komfort — unter einem Dach.",
      sideNote: "Offenbach · Deutschland",
      scroll: "Entdecken",
      scrollLabel: "Weiter zur Idee",
    },
    signup: {
      label: "E-Mail-Adresse",
      placeholder: "Deine E-Mail-Adresse",
      idle: "Eintragen",
      loading: "Wird eingetragen…",
      success: "Bitte prüfe dein Postfach",
      confirmed: "Du bist auf der Liste",
      feedback: "Termine, Neuheiten und Early Access. Ohne Lärm.",
      invalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
      error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      expired: "Dieser Bestätigungslink ist abgelaufen. Bitte trage dich erneut ein.",
      invalidLink: "Dieser Bestätigungslink ist ungültig. Bitte trage dich erneut ein.",
      unsubscribed: "Du wurdest abgemeldet. Du kannst dich jederzeit wieder eintragen.",
      privacy:
        "Mit deiner Anmeldung stimmst du dem Erhalt des NES Newsletters zu. Jederzeit widerrufbar.",
      privacyLink: "Datenschutz",
    },
    idea: {
      label: "Die Idee",
      title:
        "NES vereint unterschiedliche Ansätze für gesunde Füße an einem Ort — ausgewählt für",
      accent: "natürliche Bewegung, dauerhaften Komfort und gutes Design.",
      foot: "Offenbach · Ein Dach, ausgewählte Marken",
    },
    brands: {
      label: "Die Marken",
      partnerNote: "Für Handels- und Markenpartner",
      headline: "Fußgesundheit, auf zwei Arten.",
      subline: "Dänischer Komfort. Italienisches Barfußgefühl.",
      signatureLabel: "Signatur",
      productImage: "Produktbilder",
      productReserved: "Platz für Produktaufnahme",
    },
    fair: {
      label: "Messe-Rückblick",
      title: "Ein Blick zurück auf das letzte Jahr.",
      body: "Menschen, Produkte und natürliche Bewegung in Offenbach.",
      archive: "Archiv Offenbach",
      caption: "Offenbach · Messe im letzten Jahr",
    },
    closing: {
      label: "Messe Offenbach",
      title: "Erhalte den Termin, die Neuheiten und Early Access.",
      body: "Eine durchdachte E-Mail, wenn es wirklich etwas zu erzählen gibt.",
    },
    inquiry: {
      cta: "Jetzt anfragen",
      bannerTitle: "Interesse, diese Marken zu führen?",
      bannerText: "Attraktive Margen und eigene Händlerzeiten auf der Messe — Händler und Marken willkommen.",
      heroPrompt: "Händler oder Marke?",
      title: "Partner werden",
      subtitle:
        "Für Händler und Marken. Erzähl uns kurz von dir — wir melden uns.",
      stepLabel: "Schritt",
      stepOf: "von",
      steps: ["Dein Kontakt", "Dein Unternehmen", "Dein Anliegen", "Fast geschafft"],
      next: "Weiter",
      back: "Zurück",
      role: {
        label: "Ich bin",
        options: ["Fachhändler", "Marke / Lieferant", "Privatkunde", "Presse", "Sonstiges"],
      },
      topic: {
        label: "Mein Anliegen",
        options: [
          "Wiederverkauf & Konditionen",
          "Termin auf der Messe Offenbach",
          "Sortiment, Katalog & Preise",
          "Allgemeine Anfrage",
        ],
      },
      brands: {
        label: "Marken von Interesse",
        options: ["Green Comfort", "Vehon", "Alle Marken"],
      },
      fields: {
        name: "Name",
        company: "Unternehmen",
        email: "E-Mail-Adresse",
        phone: "Telefon",
        message: "Nachricht",
      },
      placeholders: {
        name: "Vor- und Nachname",
        company: "Geschäft oder Marke",
        email: "du@unternehmen.de",
        phone: "Optional",
        message: "Wie können wir helfen? Was sollten wir wissen?",
      },
      optional: "optional",
      consent: "Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verarbeitet werden.",
      consentLink: "Datenschutz",
      newsletter: "Haltet mich außerdem zu Terminen, Neuheiten und Early Access auf dem Laufenden.",
      submit: "Anfrage senden",
      sending: "Wird gesendet…",
      successTitle: "Danke",
      successBody: "Wir haben deine Anfrage erhalten und melden uns in Kürze.",
      invalid: "Bitte gib deinen Namen und eine gültige E-Mail-Adresse an.",
      invalidConsent: "Bitte akzeptiere den Datenschutzhinweis, um fortzufahren.",
      error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      close: "Schließen",
    },
    footer: {
      linksLabel: "Social und Rechtliches",
      contact: "Kontakt",
      impressum: "Impressum",
      privacy: "Datenschutz",
      legalBack: "Zurück zur Seite",
    },
  },
};

// Legal templates. Bracketed values are placeholders for the company to fill in.
const LEGAL = {
  de: {
    impressum: {
      title: "Impressum",
      intro: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).",
      blocks: [
        {
          h: "Anbieter",
          p: ["[Firmenname / Rechtsform]", "[Straße und Hausnummer]", "[PLZ und Ort]", "[Land]"],
        },
        {
          h: "Vertreten durch",
          p: ["[Vertretungsberechtigte Person(en)]"],
        },
        {
          h: "Kontakt",
          p: ["Telefon: [Telefonnummer]", "E-Mail: [E-Mail-Adresse]"],
        },
        {
          h: "Registereintrag",
          p: ["Eintragung im Handelsregister.", "Registergericht: [Amtsgericht]", "Registernummer: [HRB …]"],
        },
        {
          h: "Umsatzsteuer-ID",
          p: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]"],
        },
        {
          h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
          p: ["[Name]", "[Anschrift]"],
        },
        {
          h: "Haftung und Urheberrecht",
          p: [
            "Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links; für deren Inhalt sind ausschließlich deren Betreiber verantwortlich. Die auf dieser Website erstellten Inhalte unterliegen dem Urheberrecht.",
          ],
        },
      ],
      note: "Vorlage — bitte vor Veröffentlichung mit den echten Unternehmensdaten füllen und rechtlich prüfen lassen.",
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      intro: "Wir behandeln deine personenbezogenen Daten vertraulich und gemäß der DSGVO.",
      blocks: [
        {
          h: "Verantwortlicher",
          p: ["[Firmenname]", "[Anschrift]", "E-Mail: [E-Mail-Adresse]"],
        },
        {
          h: "Hosting",
          p: [
            "Diese Website wird bei Cloudflare Pages (Cloudflare, Inc.) gehostet. Beim Aufruf werden serverseitig technische Zugriffsdaten (z. B. IP-Adresse, Zeitpunkt, User-Agent) verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer, stabiler Betrieb).",
          ],
        },
        {
          h: "Newsletter (Double-Opt-in)",
          p: [
            "Für den Newsletter speichern wir E-Mail-Adresse, Zeitpunkt und Einwilligung. Der Versand erfolgt über Resend (Resend, Inc.). Rechtsgrundlage ist deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Du kannst dich jederzeit über den Abmeldelink in jeder E-Mail abmelden.",
          ],
        },
        {
          h: "Anfrageformular",
          p: [
            "Bei einer Anfrage speichern wir die von dir angegebenen Daten (Name, Unternehmen, E-Mail, Telefon, Anliegen und Nachricht) in Cloudflare D1 und senden eine Benachrichtigung über Resend an unser Office-Postfach. Die Verarbeitung erfolgt ausschließlich zur Bearbeitung deiner Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b und lit. f DSGVO. Wir löschen die Daten, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
          ],
        },
        {
          h: "Deine Rechte",
          p: [
            "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Zudem steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.",
          ],
        },
        {
          h: "Kontakt zum Datenschutz",
          p: ["[E-Mail-Adresse für Datenschutzanfragen]"],
        },
      ],
      note: "Vorlage — bitte vor Veröffentlichung an eure tatsächlichen Verarbeitungen anpassen und rechtlich prüfen lassen.",
    },
  },
  en: {
    impressum: {
      title: "Legal notice",
      intro: "Information pursuant to § 5 DDG (German Digital Services Act).",
      blocks: [
        {
          h: "Provider",
          p: ["[Company name / legal form]", "[Street and number]", "[Postal code and city]", "[Country]"],
        },
        { h: "Represented by", p: ["[Authorised representative(s)]"] },
        { h: "Contact", p: ["Phone: [phone number]", "Email: [email address]"] },
        {
          h: "Register entry",
          p: ["Entry in the commercial register.", "Register court: [local court]", "Register number: [HRB …]"],
        },
        { h: "VAT ID", p: ["VAT identification number pursuant to § 27a UStG: [VAT ID]"] },
        {
          h: "Responsible for content pursuant to § 18 (2) MStV",
          p: ["[Name]", "[Address]"],
        },
        {
          h: "Liability and copyright",
          p: [
            "Despite careful review, we assume no liability for the content of external links; their operators are solely responsible. The content created on this website is protected by copyright.",
          ],
        },
      ],
      note: "Template — please complete with the real company details and have it reviewed legally before publishing.",
    },
    datenschutz: {
      title: "Privacy policy",
      intro: "We handle your personal data confidentially and in accordance with the GDPR.",
      blocks: [
        { h: "Controller", p: ["[Company name]", "[Address]", "Email: [email address]"] },
        {
          h: "Hosting",
          p: [
            "This website is hosted on Cloudflare Pages (Cloudflare, Inc.). When the site is accessed, technical access data (e.g. IP address, time, user agent) is processed server-side. The legal basis is Art. 6(1)(f) GDPR (secure, stable operation).",
          ],
        },
        {
          h: "Newsletter (double opt-in)",
          p: [
            "For the newsletter we store your email address, the time and your consent. Delivery is handled via Resend (Resend, Inc.). The legal basis is your consent under Art. 6(1)(a) GDPR. You can unsubscribe at any time via the link in every email.",
          ],
        },
        {
          h: "Enquiry form",
          p: [
            "When you submit an enquiry, we store the details you provide (name, company, email, phone, interest and message) in Cloudflare D1 and send a notification via Resend to our office mailbox. We process this data solely to handle your enquiry under Art. 6(1)(b) and (f) GDPR. We delete it once the enquiry has been fully handled unless statutory retention obligations apply.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You have the right to access, rectification, erasure, restriction of processing, data portability and objection, as well as the right to withdraw consent at any time. You also have the right to lodge a complaint with a data protection authority.",
          ],
        },
        { h: "Data protection contact", p: ["[email address for privacy requests]"] },
      ],
      note: "Template — please adapt to your actual processing activities and have it reviewed legally before publishing.",
    },
  },
};

function BrandProduct({ brand, product, index, copy }) {
  const number = String(index + 1).padStart(2, "0");
  const label = `${brand} ${copy.productImage} ${number}`;

  return (
    <figure className="brand-product">
      <div className="brand-product-frame" role="img" aria-label={label}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name ? `${brand} — ${product.name}` : label}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="brand-product-index" aria-hidden="true">{number}</span>
        )}
      </div>
      {product.name && <figcaption>{product.name}</figcaption>}
    </figure>
  );
}

function SignupForm({
  theme = "light",
  placement,
  newsletterState,
  onSubscribe,
  onOpenPrivacy,
  language,
  copy,
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const company = String(formData.get("company") || "");
    const normalizedEmail = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizedEmail);

    if (!isValid) {
      setStatus("error");
      setMessage(copy.invalid);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT || "/api/subscribe";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          source: `nes-landing-${placement}`,
          locale: language,
          company,
        }),
      });
      if (!response.ok) throw new Error("Subscription failed");

      setStatus("success");
      setEmail("");
      onSubscribe();
    } catch {
      setStatus("error");
      setMessage(copy.error);
    }
  }

  if (newsletterState === "pending" || newsletterState === "confirmed" || status === "success") {
    return (
      <div className={`signup-success signup-success-${theme}`} role="status">
        {newsletterState === "confirmed" ? copy.confirmed : copy.success}<span>.</span>
      </div>
    );
  }

  return (
    <div className={`signup signup-${theme}`}>
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <input
          className="signup-honeypot"
          type="text"
          name="company"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />
        <label htmlFor={`${placement}-email`}>{copy.label}</label>
        <input
          id={`${placement}-email`}
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={copy.placeholder}
          autoComplete="email"
          inputMode="email"
          required
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? copy.loading : copy.idle}
        </button>
      </form>
      <div className="signup-feedback" aria-live="polite">
        {status === "error"
          ? message
          : newsletterState === "expired"
            ? copy.expired
            : newsletterState === "invalid"
              ? copy.invalidLink
              : newsletterState === "unsubscribed"
                ? copy.unsubscribed
                : copy.feedback}
      </div>
      <p className="signup-privacy">
        {copy.privacy}{" "}
        <button type="button" onClick={onOpenPrivacy}>{copy.privacyLink}</button>
      </p>
    </div>
  );
}

function LanguageSwitcher({ language, onLanguageChange, copy }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function closeMenu(event) {
      if (event.type === "keydown" && event.key !== "Escape") return;
      if (event.type === "pointerdown" && menuRef.current?.contains(event.target)) return;
      setOpen(false);
    }

    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeMenu);
    };
  }, [open]);

  return (
    <div className={`language-switcher${open ? " is-open" : ""}`} ref={menuRef}>
      <button
        className="language-trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{language.toUpperCase()}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="m2.5 4.5 3.5 3 3.5-3" />
        </svg>
      </button>
      <div className="language-menu" role="menu" aria-label={copy.languageMenu} hidden={!open}>
        <button
          type="button"
          role="menuitem"
          className={language === "en" ? "is-current" : undefined}
          aria-current={language === "en" ? "true" : undefined}
          onClick={() => {
            onLanguageChange("en");
            setOpen(false);
          }}
        >
          <span>English</span>
          <small>EN</small>
        </button>
        <button
          type="button"
          role="menuitem"
          className={language === "de" ? "is-current" : undefined}
          aria-current={language === "de" ? "true" : undefined}
          onClick={() => {
            onLanguageChange("de");
            setOpen(false);
          }}
        >
          <span>Deutsch</span>
          <small>DE</small>
        </button>
      </div>
    </div>
  );
}

function Header({ scrolled, language, onLanguageChange, onInquire, copy }) {
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="header-brand" href="#top" aria-label={copy.homeLabel}>
          <span className="brand-wordmark">NES</span>
        </a>
        <nav className="header-nav" aria-label={copy.navLabel}>
          <a href="#idea">{copy.nav.idea}</a>
          <a href="#brands">{copy.nav.brands}</a>
          <a href="#last-messe">{copy.nav.fair}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} copy={copy} />
          <button type="button" className="header-cta" onClick={onInquire}>
            {copy.inquiry.cta}
            <svg className="header-cta-arrow" viewBox="0 0 14 10" aria-hidden="true">
              <path d="M1 5h11M8.5 1.5 12 5l-3.5 3.5" />
            </svg>
          </button>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

const INQUIRY_STEP_COUNT = 4;
const EMPTY_INQUIRY = { name: "", email: "", company: "", phone: "", message: "" };

function OptionChips({ label, options, selected, onSelect }) {
  return (
    <div className="modal-field">
      <span>{label}</span>
      <div className="modal-chips" role="group" aria-label={label}>
        {options.map((option, index) => (
          <button
            type="button"
            key={option}
            className={`modal-chip${index === selected ? " is-selected" : ""}`}
            aria-pressed={index === selected}
            onClick={() => onSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function InquiryModal({ open, onClose, onOpenPrivacy, language, copy }) {
  const dialogRef = useRef(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_INQUIRY);
  const [roleIdx, setRoleIdx] = useState(0);
  const [topicIdx, setTopicIdx] = useState(0);
  const [brandIdx, setBrandIdx] = useState(copy.brands.options.length - 1);
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setStatus("idle");
      setError("");
      setForm(EMPTY_INQUIRY);
      setRoleIdx(0);
      setTopicIdx(0);
      setBrandIdx(copy.brands.options.length - 1);
      setConsent(false);
      setNewsletter(false);
    }
  }, [open, copy.brands.options.length]);

  useEffect(() => {
    if (!open) return;
    const firstField = dialogRef.current?.querySelector(".modal-step input, .modal-step textarea");
    firstField?.focus();
  }, [open, step]);

  if (!open) return null;

  const isLast = step === INQUIRY_STEP_COUNT - 1;

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  }

  function validateStep() {
    if (step === 0) {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
      if (!form.name.trim() || !validEmail) {
        setStatus("error");
        setError(copy.invalid);
        return false;
      }
    }
    return true;
  }

  async function send() {
    if (!consent) {
      setStatus("error");
      setError(copy.invalidConsent);
      return;
    }

    setStatus("loading");
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      role: copy.role.options[roleIdx],
      topic: copy.topic.options[topicIdx],
      brand: copy.brands.options[brandIdx],
      message: form.message.trim(),
      newsletter,
      locale: language,
      source: "nes-inquiry",
      consent: true,
      website: "",
    };

    try {
      const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT || "/api/inquiry";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Inquiry failed");

      if (newsletter) {
        const newsletterEndpoint =
          import.meta.env.VITE_NEWSLETTER_ENDPOINT || "/api/subscribe";
        const newsletterResponse = await fetch(newsletterEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email: payload.email,
            source: "nes-inquiry",
            locale: language,
            company: "",
          }),
        });
        if (!newsletterResponse.ok) throw new Error("Newsletter subscription failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setError(copy.error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (String(new FormData(event.currentTarget).get("company_website") || "")) return; // honeypot
    if (!validateStep()) return;
    if (isLast) {
      send();
    } else {
      setStep((value) => value + 1);
    }
  }

  const progress = ((step + 1) / INQUIRY_STEP_COUNT) * 100;

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label={copy.close}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="modal-success" role="status">
            <p className="modal-eyebrow">{copy.title}</p>
            <h2 id="inquiry-title">{copy.successTitle}<span>.</span></h2>
            <p>{copy.successBody}</p>
            <button type="button" className="modal-submit" onClick={onClose}>{copy.close}</button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <header className="modal-head">
              <div className="modal-steps-meta">
                <p className="modal-eyebrow">{copy.title}</p>
                <span className="modal-step-count">
                  {copy.stepLabel} {step + 1} {copy.stepOf} {INQUIRY_STEP_COUNT}
                </span>
              </div>
              <h2 id="inquiry-title">{copy.steps[step]}</h2>
              <div className="modal-progress" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </header>

            <input
              className="modal-honeypot"
              type="text"
              name="company_website"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="modal-step" key={step}>
              {step === 0 && (
                <div className="modal-grid">
                  <label className="modal-field modal-field-wide">
                    <span>{copy.fields.name} *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      placeholder={copy.placeholders.name}
                      autoComplete="name"
                      maxLength="120"
                    />
                  </label>
                  <label className="modal-field modal-field-wide">
                    <span>{copy.fields.email} *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setField("email", event.target.value)}
                      placeholder={copy.placeholders.email}
                      autoComplete="email"
                      inputMode="email"
                      maxLength="254"
                    />
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="modal-grid">
                  <label className="modal-field modal-field-wide">
                    <span>{copy.fields.company}</span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(event) => setField("company", event.target.value)}
                      placeholder={copy.placeholders.company}
                      autoComplete="organization"
                      maxLength="160"
                    />
                  </label>
                  <label className="modal-field modal-field-wide">
                    <span>{copy.fields.phone} <i>{copy.optional}</i></span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      placeholder={copy.placeholders.phone}
                      autoComplete="tel"
                      maxLength="60"
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="modal-stack">
                  <OptionChips label={copy.role.label} options={copy.role.options} selected={roleIdx} onSelect={setRoleIdx} />
                  <OptionChips label={copy.topic.label} options={copy.topic.options} selected={topicIdx} onSelect={setTopicIdx} />
                  <OptionChips label={copy.brands.label} options={copy.brands.options} selected={brandIdx} onSelect={setBrandIdx} />
                </div>
              )}

              {step === 3 && (
                <div className="modal-stack">
                  <label className="modal-field modal-field-wide">
                    <span>{copy.fields.message} <i>{copy.optional}</i></span>
                    <textarea
                      value={form.message}
                      onChange={(event) => setField("message", event.target.value)}
                      rows="3"
                      placeholder={copy.placeholders.message}
                      maxLength="4000"
                    />
                  </label>
                  <label className="modal-consent">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => {
                        setConsent(event.target.checked);
                        if (status === "error") { setStatus("idle"); setError(""); }
                      }}
                    />
                    <span>
                      {copy.consent}{" "}
                      <button type="button" className="modal-consent-link" onClick={onOpenPrivacy}>
                        {copy.consentLink}
                      </button>
                    </span>
                  </label>
                  <label className="modal-consent">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(event) => setNewsletter(event.target.checked)}
                    />
                    <span>{copy.newsletter}</span>
                  </label>
                </div>
              )}
            </div>

            <p className="modal-error" aria-live="polite">{status === "error" ? error : ""}</p>

            <div className="modal-nav">
              {step > 0 ? (
                <button
                  type="button"
                  className="modal-back"
                  onClick={() => { setStep((value) => value - 1); setStatus("idle"); setError(""); }}
                >
                  <span aria-hidden="true">←</span> {copy.back}
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="modal-submit" disabled={status === "loading"}>
                {status === "loading" ? copy.sending : isLast ? copy.submit : copy.next}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function LegalPage({ kind, language, onBack, copy }) {
  const doc = LEGAL[language][kind];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const onKeyDown = (event) => {
      if (event.key === "Escape") onBack();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onBack]);

  return (
    <div className="legal-page">
      <div className="legal-inner">
        <button type="button" className="legal-back" onClick={onBack}>
          <span aria-hidden="true">←</span> {copy.footer.legalBack}
        </button>
        <span className="brand-wordmark legal-wordmark">NES</span>
        <h1>{doc.title}</h1>
        <p className="legal-intro">{doc.intro}</p>
        <div className="legal-blocks">
          {doc.blocks.map((block) => (
            <section className="legal-block" key={block.h}>
              <h2>{block.h}</h2>
              {block.p.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </section>
          ))}
        </div>
        <p className="legal-note">{doc.note}</p>
      </div>
    </div>
  );
}

function shouldPlayArrival() {
  return typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ArrivalIntro({ copy }) {
  return (
    <div className="arrival-intro" aria-hidden="true">
      <div className="arrival-panel arrival-panel-left" />
      <div className="arrival-panel arrival-panel-right" />
      <span className="arrival-seam" />
      <div className="arrival-content">
        <p className="arrival-kicker">{copy.arrival.kicker}</p>
        <div className="arrival-wordmark-frame">
          <span className="arrival-wordmark brand-wordmark">NES</span>
        </div>
        <div className="arrival-rule"><span /></div>
        <p className="arrival-place">{copy.arrival.place}</p>
        <p className="arrival-coordinates">50.100° N <i>|</i> 8.705° E</p>
      </div>
    </div>
  );
}

function BrandBlock({ brand, language, copy }) {
  const brandCopy = brand.copy[language];
  const hasImages = brand.products.some((product) => product.image);

  return (
    <article className="brand-block">
      <div className="brand-header" data-reveal style={{ "--delay": "60ms" }}>
        <img className="brand-logo" src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
        <p className="brand-meta">{brandCopy.meta}</p>
        <p className="brand-signature">
          <span className="brand-signature-label">{copy.brands.signatureLabel}</span>
          {brandCopy.signature}
        </p>
        <p className="brand-description">{brandCopy.description}</p>
        <ul className="brand-facts">
          {brandCopy.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
      <div className="brand-gallery" data-reveal="scale" style={{ "--delay": "140ms" }}>
        {brand.products.map((product, productIndex) => (
          <BrandProduct
            key={product.name || productIndex}
            brand={brand.name}
            product={product}
            index={productIndex}
            copy={copy.brands}
          />
        ))}
      </div>
      {!hasImages && <p className="brand-gallery-note">{copy.brands.productReserved}</p>}
    </article>
  );
}

function MesseMosaic({ language }) {
  return (
    <div className="messe-mosaic">
      {MESSE_GALLERY.map((photo, index) => (
        <figure
          className={`messe-tile messe-tile-${photo.area}`}
          data-reveal="scale"
          style={{ "--delay": `${index * 70}ms` }}
          key={photo.src}
        >
          <img src={photo.src} alt={photo.alt[language]} loading="lazy" decoding="async" />
          <span className="messe-tile-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <figcaption>{photo.alt[language]}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";

  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  if (urlLanguage === "de" || urlLanguage === "en") return urlLanguage;

  const savedLanguage = window.localStorage.getItem("nes-language");
  if (savedLanguage === "de" || savedLanguage === "en") return savedLanguage;

  return window.navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}

function getInitialNewsletterState() {
  if (typeof window === "undefined") return "idle";
  const state = new URLSearchParams(window.location.search).get("newsletter");
  return ["confirmed", "expired", "invalid", "unsubscribed"].includes(state) ? state : "idle";
}

function getInitialLegal() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "");
  return hash === "impressum" || hash === "datenschutz" ? hash : null;
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [newsletterState, setNewsletterState] = useState(getInitialNewsletterState);
  const [scrolled, setScrolled] = useState(false);
  const [arrivalVisible, setArrivalVisible] = useState(shouldPlayArrival);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [legal, setLegal] = useState(getInitialLegal);
  const copy = COPY[language];

  function openLegal(kind) {
    setInquiryOpen(false);
    setLegal(kind);
    window.history.pushState({}, "", `#${kind}`);
  }

  function closeLegal() {
    setLegal(null);
    window.history.pushState({}, "", window.location.pathname + window.location.search);
  }

  useEffect(() => {
    const onHashChange = () => setLegal(getInitialLegal());
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "de"
      ? "NES — Natürliche Bewegung · Messe Offenbach"
      : "NES — Natural movement · Offenbach Trade Fair";
    window.localStorage.setItem("nes-language", language);
  }, [language]);

  useEffect(() => {
    if (!arrivalVisible) return undefined;

    const previousOverflow = document.body.style.overflow;
    const finishArrival = window.setTimeout(() => setArrivalVisible(false), 1850);
    const skipArrival = (event) => {
      if (event.key === "Escape") setArrivalVisible(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", skipArrival);

    return () => {
      window.clearTimeout(finishArrival);
      window.removeEventListener("keydown", skipArrival);
      document.body.style.overflow = previousOverflow;
    };
  }, [arrivalVisible]);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -5% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
    let frame = 0;

    function renderScroll() {
      const scrollTop = window.scrollY;
      const scrollRange = Math.max(root.scrollHeight - window.innerHeight, 1);
      const heroProgress = Math.min(scrollTop / Math.max(window.innerHeight * 0.78, 1), 1);

      root.style.setProperty("--scroll-progress", String(scrollTop / scrollRange));
      root.style.setProperty("--hero-progress", String(heroProgress));
      setScrolled(scrollTop > 24);

      parallaxItems.forEach((item) => {
        const anchor = item.parentElement?.getBoundingClientRect() || item.getBoundingClientRect();
        const center = anchor.top + anchor.height / 2;
        const distance = (center - window.innerHeight / 2) / window.innerHeight;
        const amount = Number(item.dataset.parallaxAmount || 28);
        const shift = Math.max(-1, Math.min(1, distance)) * amount;
        item.style.setProperty("--parallax-y", `${shift.toFixed(2)}px`);
      });

      frame = 0;
    }

    function requestRender() {
      if (!frame) frame = window.requestAnimationFrame(renderScroll);
    }

    renderScroll();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`site-shell ${arrivalVisible ? "is-arriving" : "is-ready"}`} id="top">
      {arrivalVisible && <ArrivalIntro copy={copy} />}
      <Header
        scrolled={scrolled}
        language={language}
        onLanguageChange={changeLanguage}
        onInquire={() => setInquiryOpen(true)}
        copy={copy}
      />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <ShaderBackground>
            <div className="hero-content">
              <div className="hero-kicker" data-reveal style={{ "--delay": "40ms" }}>
                {copy.hero.kicker}
              </div>
              <div className="hero-logo-frame" data-reveal="scale" style={{ "--delay": "100ms" }}>
                <span
                  className="hero-logo brand-wordmark"
                  data-parallax
                  data-parallax-amount="-14"
                >
                  NES
                </span>
              </div>
              <h1 id="hero-title" data-reveal style={{ "--delay": "170ms" }}>
                {copy.hero.title}
              </h1>
              <p className="coordinates" data-reveal style={{ "--delay": "230ms" }}>
                Offenbach <i>·</i> 50.100° N <i>|</i> 8.705° E
              </p>
              <div className="hero-signup" data-reveal style={{ "--delay": "290ms" }}>
                <SignupForm
                  placement="hero"
                  newsletterState={newsletterState}
                  onSubscribe={() => setNewsletterState("pending")}
                  onOpenPrivacy={() => openLegal("datenschutz")}
                  language={language}
                  copy={copy.signup}
                />
              </div>
              <button
                type="button"
                className="hero-inquire"
                onClick={() => setInquiryOpen(true)}
                data-reveal
                style={{ "--delay": "350ms" }}
              >
                <span className="hero-inquire-prompt">{copy.inquiry.heroPrompt}</span>
                <span className="hero-inquire-link">{copy.inquiry.cta}</span>
                <svg viewBox="0 0 14 10" aria-hidden="true">
                  <path d="M1 5h11M8.5 1.5 12 5l-3.5 3.5" />
                </svg>
              </button>
            </div>
            <p className="hero-side-note hero-side-note-right" aria-hidden="true">{copy.hero.sideNote}</p>
            <a className="scroll-cue" href="#idea" aria-label={copy.hero.scrollLabel}>
              <span />
              <small>{copy.hero.scroll}</small>
            </a>
          </ShaderBackground>
        </section>

        <section className="idea section" id="idea">
          <div className="narrow-copy" data-idea-mark="NES">
            <p className="section-label section-label--framed" data-reveal>{copy.idea.label}</p>
            <div className="idea-ornament" data-reveal="line" aria-hidden="true">
              <span className="idea-ornament-line" />
              <span className="idea-ornament-node" />
              <span className="idea-ornament-line" />
            </div>
            <h2 data-reveal="scale" style={{ "--delay": "80ms" }}>
              {copy.idea.title} <em className="idea-accent">{copy.idea.accent}</em>
            </h2>
            <p className="idea-foot" data-reveal style={{ "--delay": "180ms" }}>
              <span className="idea-foot-rule" aria-hidden="true" />
              {copy.idea.foot}
            </p>
          </div>
        </section>

        <section className="brands section" id="brands">
          <div className="content-width">
            <div className="brands-heading">
              <div className="brands-heading-lead">
                <p className="section-label section-label--framed section-label--start" data-reveal>{copy.brands.label}</p>
                <p className="brands-partner-note" data-reveal style={{ "--delay": "60ms" }}>{copy.brands.partnerNote}</p>
              </div>
              <p data-reveal style={{ "--delay": "90ms" }}>{copy.brands.headline}<br />{copy.brands.subline}</p>
            </div>
            <div className="brand-list">
              <BrandBlock brand={BRANDS[0]} language={language} copy={copy} />
              <BrandBlock brand={BRANDS[1]} language={language} copy={copy} />
            </div>
            <div className="brands-cta" data-reveal="scale">
              <div className="brands-cta-copy">
                <p className="brands-cta-title">{copy.inquiry.bannerTitle}</p>
                <p className="brands-cta-text">{copy.inquiry.bannerText}</p>
              </div>
              <button type="button" className="cta-button" onClick={() => setInquiryOpen(true)}>
                {copy.inquiry.cta}
                <svg className="cta-button-arrow" viewBox="0 0 14 10" aria-hidden="true">
                  <path d="M1 5h11M8.5 1.5 12 5l-3.5 3.5" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="last-messe section" id="last-messe">
          <div className="content-width">
            <header className="messe-heading">
              <div>
                <p className="section-label section-label--framed section-label--start" data-reveal>{copy.fair.label}</p>
                <h2 data-reveal style={{ "--delay": "80ms" }}>{copy.fair.title}</h2>
              </div>
              <p data-reveal="right" style={{ "--delay": "140ms" }}>
                {copy.fair.body}
              </p>
            </header>
            <MesseMosaic language={language} />
            <p className="messe-caption" data-reveal>{copy.fair.caption}</p>
          </div>
        </section>

        <section className="closing" id="join">
          <div className="closing-inner">
            <p className="section-label section-label-bright" data-reveal>{copy.closing.label}</p>
            <h2 data-reveal="scale" style={{ "--delay": "80ms" }}>
              {copy.closing.title}
            </h2>
            <p className="closing-copy" data-reveal style={{ "--delay": "130ms" }}>
              {copy.closing.body}
            </p>
            <div data-reveal style={{ "--delay": "190ms" }}>
              <SignupForm
                theme="dark"
                placement="closing"
                newsletterState={newsletterState}
                onSubscribe={() => setNewsletterState("pending")}
                onOpenPrivacy={() => openLegal("datenschutz")}
                language={language}
                copy={copy.signup}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span className="footer-logo brand-wordmark">NES</span>
        <p className="footer-coordinates">Offenbach · 50.100° N | 8.705° E</p>
        <div className="footer-links" aria-label={copy.footer.linksLabel}>
          <span>Instagram</span>
          <span>{copy.footer.contact}</span>
          <button type="button" className="footer-link" onClick={() => openLegal("impressum")}>
            {copy.footer.impressum}
          </button>
          <button type="button" className="footer-link" onClick={() => openLegal("datenschutz")}>
            {copy.footer.privacy}
          </button>
        </div>
        <p className="copyright">© 2026 <span className="wordmark">NES</span> — Natural. Everyday. Shoes.</p>
      </footer>

      <InquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        onOpenPrivacy={() => openLegal("datenschutz")}
        language={language}
        copy={copy.inquiry}
      />

      {legal && (
        <LegalPage kind={legal} language={language} onBack={closeLegal} copy={copy} />
      )}
    </div>
  );
}
