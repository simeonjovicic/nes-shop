import { useEffect, useRef, useState } from "react";
import { ShaderBackground } from "./components/ui/shaders-hero-section";
import "./App.css";

const MESSE_PHOTOS = [
  {
    src: "/messe-carousel/messe-01.jpeg",
    alt: {
      en: "The team celebrating together after the fair",
      de: "Das Team feiert gemeinsam nach der Messe",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-02.jpeg",
    alt: {
      en: "A candid team selfie from the previous fair",
      de: "Ein spontanes Teamfoto von der vergangenen Messe",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-03.jpeg",
    alt: {
      en: "The team preparing the barefoot shoe stand",
      de: "Das Team bereitet den Stand für Barfußschuhe vor",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-04.jpeg",
    alt: {
      en: "A product demonstration at the barefoot shoe stand",
      de: "Eine Produktvorführung am Messestand",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-05.jpeg",
    alt: {
      en: "Natural sole and material samples presented at the fair",
      de: "Sohlen- und Materialmuster auf der Messe",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-06.jpeg",
    alt: {
      en: "Visitors in conversation at the exhibition stand",
      de: "Besucher im Gespräch am Messestand",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-07.jpeg",
    alt: {
      en: "A view through the exhibition hall in Offenbach",
      de: "Blick durch die Messehalle in Offenbach",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-08.jpeg",
    alt: {
      en: "Barefoot shoe fitting and consultation at the stand",
      de: "Anprobe und Beratung zu Barfußschuhen am Stand",
    },
    kind: "portrait",
  },
  {
    src: "/messe-carousel/messe-09.jpeg",
    alt: {
      en: "A team member at the previous barefoot shoe fair",
      de: "Ein Teammitglied auf der vergangenen Barfußschuhmesse",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-10.jpeg",
    alt: {
      en: "Two team members examining a barefoot shoe",
      de: "Zwei Teammitglieder begutachten einen Barfußschuh",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-11.jpeg",
    alt: {
      en: "The fair team together in the exhibition hall",
      de: "Das Messeteam gemeinsam in der Ausstellungshalle",
    },
    kind: "wide",
  },
  {
    src: "/messe-carousel/messe-12.jpeg",
    alt: {
      en: "Visitors discovering the brands along the exhibition aisle",
      de: "Besucher entdecken die Marken entlang des Messegangs",
    },
    kind: "portrait",
  },
  {
    src: "/messe-carousel/messe-13.jpeg",
    alt: {
      en: "A barefoot shoe fitting at the previous fair",
      de: "Anprobe eines Barfußschuhs auf der vergangenen Messe",
    },
    kind: "portrait",
  },
];

const BRANDS = [
  {
    name: "Green Comfort",
    logo: "/logos/greencomfort.svg?v=official",
    copy: {
      en: {
        meta: "Randers, Denmark · Since 1994",
        description:
          "Founded in Denmark in 1994, Green Comfort builds foot-health footwear around its patented EnergySole™ — resilient cushioning designed for active feet and lasting comfort. Wide fits, adaptable materials and considered production bring together Danish design, everyday well-being and craft made to last.",
      },
      de: {
        meta: "Randers, Dänemark · Seit 1994",
        description:
          "Seit 1994 entwickelt Green Comfort in Dänemark Schuhe für gesunde Füße rund um die patentierte EnergySole™ — eine langlebige Dämpfung für aktive Füße und anhaltenden Komfort. Weite Passformen, anpassungsfähige Materialien und bewusste Produktion verbinden dänisches Design mit Wohlbefinden und beständiger Handwerkskunst.",
      },
    },
  },
  {
    name: "Vehon",
    logo: "/logos/vehon.png",
    copy: {
      en: {
        meta: "Italy · Formerly WAI · True barefoot",
        description:
          "Formerly WAI, Vehon brings Italian elegance to true barefoot construction: zero-drop, a wide toe box and an exceptionally thin, flexible sole. Its signature red-grip outsole and light, breathable upper move easily from everyday wear to more refined occasions — unisex, precise and distinctly modern.",
      },
      de: {
        meta: "Italien · Ehemals WAI · Echtes Barfußgefühl",
        description:
          "Vehon, ehemals WAI, verbindet italienische Eleganz mit einer echten Barfußkonstruktion: Zero-Drop, eine breite Zehenbox und eine außergewöhnlich dünne, flexible Sohle. Die markante rote Grip-Sohle und das leichte, atmungsaktive Obermaterial funktionieren im Alltag ebenso wie zu eleganteren Anlässen — unisex, präzise und klar modern.",
      },
    },
  },
];

const COPY = {
  en: {
    languageName: "English",
    languageMenu: "Choose language",
    homeLabel: "N.E.S home",
    navLabel: "Main navigation",
    nav: {
      idea: "The idea",
      brands: "Brands",
      fair: "Previous fair",
      join: "Join the list",
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
    },
    idea: {
      label: "The idea",
      title:
        "N.E.S brings distinct approaches to foot health together in one place — each chosen for natural movement, lasting comfort, and design.",
      body:
        "From thin, zero-drop barefoot soles to considered cushioning and wide fits, every pair begins with the foot — not the other way around.",
    },
    brands: {
      label: "The brands",
      headline: "Foot health, done two ways.",
      subline: "Danish comfort. Italian barefoot.",
      productImage: "product imagery",
      productReserved: "Product asset reserved",
    },
    fair: {
      label: "Previous fair",
      title: "A look back at last year.",
      body: "People, product and natural movement in Offenbach.",
      archive: "Offenbach archive",
      motion: "Moving archive · 13 moments",
    },
    closing: {
      label: "Offenbach Trade Fair",
      title: "Get the date, the drops, and early access.",
      body: "One considered email when there is something worth knowing.",
    },
    footer: {
      linksLabel: "Social and contact placeholders",
      contact: "Contact",
    },
  },
  de: {
    languageName: "Deutsch",
    languageMenu: "Sprache wählen",
    homeLabel: "N.E.S Startseite",
    navLabel: "Hauptnavigation",
    nav: {
      idea: "Die Idee",
      brands: "Marken",
      fair: "Messe-Rückblick",
      join: "Eintragen",
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
    },
    idea: {
      label: "Die Idee",
      title:
        "N.E.S vereint unterschiedliche Ansätze für gesunde Füße an einem Ort — ausgewählt für natürliche Bewegung, dauerhaften Komfort und gutes Design.",
      body:
        "Von dünnen Zero-Drop-Barfußsohlen bis zu durchdachter Dämpfung und weiten Passformen beginnt jedes Paar beim Fuß — nicht umgekehrt.",
    },
    brands: {
      label: "Die Marken",
      headline: "Fußgesundheit, auf zwei Arten.",
      subline: "Dänischer Komfort. Italienisches Barfußgefühl.",
      productImage: "Produktbilder",
      productReserved: "Platz für Produktaufnahme",
    },
    fair: {
      label: "Messe-Rückblick",
      title: "Ein Blick zurück auf das letzte Jahr.",
      body: "Menschen, Produkte und natürliche Bewegung in Offenbach.",
      archive: "Archiv Offenbach",
      motion: "Bewegtes Archiv · 13 Momente",
    },
    closing: {
      label: "Messe Offenbach",
      title: "Erhalte den Termin, die Neuheiten und Early Access.",
      body: "Eine durchdachte E-Mail, wenn es wirklich etwas zu erzählen gibt.",
    },
    footer: {
      linksLabel: "Social Media und Kontakt",
      contact: "Kontakt",
    },
  },
};

function ProductPlaceholder({ brand, index, reverse, copy }) {
  return (
    <div
      className="product-stage"
      data-reveal={reverse ? "right" : "left"}
      style={{ "--delay": "80ms" }}
    >
      <span className="product-sequence" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="product-placeholder"
        data-parallax
        data-parallax-amount={reverse ? "-20" : "20"}
        role="img"
        aria-label={`${brand} ${copy.productImage}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="4" width="17" height="16" rx="0.5" />
          <circle cx="9" cy="9" r="1.4" />
          <path d="m5.5 17 4.2-4.1 2.9 2.6 2.2-2 3.7 3.5" />
        </svg>
        <span>{brand} {copy.productImage}</span>
        <small>{copy.productReserved}</small>
      </div>
    </div>
  );
}

function SignupForm({ theme = "light", placement, newsletterState, onSubscribe, language, copy }) {
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
      const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

      if (endpoint) {
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
      } else {
        const saved = JSON.parse(localStorage.getItem("nes-waitlist") || "[]");
        if (!saved.includes(normalizedEmail)) {
          localStorage.setItem("nes-waitlist", JSON.stringify([...saved, normalizedEmail]));
        }
      }

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

function Header({ scrolled, language, onLanguageChange, copy }) {
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="header-brand" href="#top" aria-label={copy.homeLabel}>
          <img src="/logos/nes-logo.png" alt="N.E.S" />
        </a>
        <nav className="header-nav" aria-label={copy.navLabel}>
          <a href="#idea">{copy.nav.idea}</a>
          <a href="#brands">{copy.nav.brands}</a>
          <a href="#last-messe">{copy.nav.fair}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} copy={copy} />
          <a className="header-cta" href="#join">{copy.nav.join}</a>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
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
          <img className="arrival-wordmark" src="/logos/nes-logo.png" alt="" />
        </div>
        <div className="arrival-rule"><span /></div>
        <p className="arrival-place">{copy.arrival.place}</p>
        <p className="arrival-coordinates">50.100° N <i>|</i> 8.705° E</p>
      </div>
    </div>
  );
}

function BrandBlock({ brand, index, reverse = false, language, copy }) {
  const brandCopy = brand.copy[language];

  return (
    <article className={`brand-block${reverse ? " brand-block-reverse" : ""}`}>
      <ProductPlaceholder brand={brand.name} index={index} reverse={reverse} copy={copy.brands} />
      <div
        className="brand-copy"
        data-reveal={reverse ? "left" : "right"}
        style={{ "--delay": "160ms" }}
      >
        <img className="brand-logo" src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
        <p className="brand-meta">{brandCopy.meta}</p>
        <p className="brand-description">{brandCopy.description}</p>
      </div>
    </article>
  );
}

function MesseSequence({ duplicate = false, language, copy }) {
  return (
    <div className="messe-sequence" aria-hidden={duplicate || undefined}>
      {MESSE_PHOTOS.map((photo, index) => (
        <figure className={`messe-card messe-card-${photo.kind}`} key={`${duplicate ? "copy" : "main"}-${photo.src}`}>
          <img
            src={photo.src}
            alt={duplicate ? "" : photo.alt[language]}
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>{copy.fair.archive}</small>
          </figcaption>
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

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [newsletterState, setNewsletterState] = useState(getInitialNewsletterState);
  const [scrolled, setScrolled] = useState(false);
  const [arrivalVisible, setArrivalVisible] = useState(shouldPlayArrival);
  const copy = COPY[language];

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "de"
      ? "N.E.S — Natürliche Bewegung · Messe Offenbach"
      : "N.E.S — Natural movement · Offenbach Trade Fair";
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
                <img
                  className="hero-logo"
                  src="/logos/nes-logo.png"
                  alt="N.E.S"
                  data-parallax
                  data-parallax-amount="-14"
                />
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
                  language={language}
                  copy={copy.signup}
                />
              </div>
            </div>
            <p className="hero-side-note hero-side-note-right" aria-hidden="true">{copy.hero.sideNote}</p>
            <a className="scroll-cue" href="#idea" aria-label={copy.hero.scrollLabel}>
              <span />
              <small>{copy.hero.scroll}</small>
            </a>
          </ShaderBackground>
        </section>

        <section className="idea section" id="idea">
          <div className="narrow-copy">
            <p className="section-label" data-reveal>{copy.idea.label}</p>
            <div className="idea-rule" data-reveal="line" aria-hidden="true" />
            <h2 data-reveal="scale" style={{ "--delay": "80ms" }}>
              {copy.idea.title}
            </h2>
            <p className="idea-body" data-reveal style={{ "--delay": "150ms" }}>
              {copy.idea.body}
            </p>
          </div>
        </section>

        <section className="brands section" id="brands">
          <div className="content-width">
            <div className="brands-heading">
              <p className="section-label" data-reveal>{copy.brands.label}</p>
              <p data-reveal style={{ "--delay": "90ms" }}>{copy.brands.headline}<br />{copy.brands.subline}</p>
            </div>
            <div className="brand-list">
              <BrandBlock brand={BRANDS[0]} index={0} language={language} copy={copy} />
              <BrandBlock brand={BRANDS[1]} index={1} reverse language={language} copy={copy} />
            </div>
          </div>
        </section>

        <section className="last-messe section" id="last-messe">
          <div className="content-width messe-heading-wrap">
            <header className="messe-heading">
              <div>
                <p className="section-label" data-reveal>{copy.fair.label}</p>
                <h2 data-reveal style={{ "--delay": "80ms" }}>{copy.fair.title}</h2>
              </div>
              <p data-reveal="right" style={{ "--delay": "140ms" }}>
                {copy.fair.body}
              </p>
            </header>
          </div>
          <div className="messe-marquee" data-reveal="scale" style={{ "--delay": "120ms" }}>
            <div className="messe-track">
              <MesseSequence language={language} copy={copy} />
              <MesseSequence duplicate language={language} copy={copy} />
            </div>
          </div>
          <p className="messe-motion-note" data-reveal>
            <span aria-hidden="true">↗</span> {copy.fair.motion}
          </p>
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
                language={language}
                copy={copy.signup}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <img className="footer-logo" src="/logos/nes-logo.png" alt="N.E.S" />
        <p className="footer-coordinates">Offenbach · 50.100° N | 8.705° E</p>
        <div className="footer-links" aria-label={copy.footer.linksLabel}>
          <span>Instagram</span>
          <span>{copy.footer.contact}</span>
        </div>
        <p className="copyright">© 2026 N.E.S — Natural. Everyday. Shoes.</p>
      </footer>
    </div>
  );
}
