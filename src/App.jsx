import { useEffect, useState } from "react";
import "./App.css";

const BRANDS = [
  {
    id: "wai",
    number: "01",
    name: "WAI",
    category: "Feel Shoes",
    image: "/wai10-opt.jpeg",
    position: "center 58%",
    statement: "Freiheit, die man anzieht.",
    description:
      "Flexible Feel Shoes für Zuhause, unterwegs und alles dazwischen. Reduziert in der Form, leicht am Fuß und gemacht für natürliche Bewegung.",
  },
  {
    id: "vehon",
    number: "02",
    name: "Vehon",
    category: "Mocassini",
    image: "/hero-wai.png",
    position: "center 64%",
    statement: "Italienische Ruhe am Fuß.",
    description:
      "Mocassini und Pantofole, die Tradition nicht ausstellen müssen. In Italien gefertigt, präzise im Detail und entspannt im Alltag.",
  },
  {
    id: "green-comfort",
    number: "03",
    name: "Green Comfort",
    category: "Knitwear",
    image: "/pully-red-front.png",
    position: "center",
    statement: "Strick mit eigener Stimme.",
    description:
      "Markanter Jacquard-Strick mit Tiefe, Struktur und Charakter. Für Menschen, die Komfort nicht mit Zurückhaltung verwechseln.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell" id="top">
      <Header scrolled={scrolled} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <picture className="hero-picture">
            <source media="(max-width: 680px)" srcSet="/mobile-hero.png" />
            <img src="/wai4-opt.jpeg" alt="Ein dunkelblauer WAI Feel Shoe in einer ruhigen Wohnszene" />
          </picture>
          <div className="hero-shade" />

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">N.E.S · The new Soleform house</p>
            <h1 id="hero-title">Komfort, neu gedacht.</h1>
            <p className="hero-intro">
              N.E.S ist das neue Haus hinter WAI, Vehon und Green Comfort — Schuhe
              und Strick, entwickelt für Komfort, Charakter und Bewegung.
            </p>
            <div className="hero-actions">
              <a className="hero-primary" href="#notify">
                <span>Zum Launch vormerken</span>
                <ArrowIcon />
              </a>
              <a className="hero-secondary" href="#haus">Unsere Geschichte</a>
            </div>
          </div>

          <div className="hero-note" aria-label="Launch Status">
            <span>Edition 001</span>
            <strong>In Vorbereitung</strong>
          </div>

          <a className="scroll-cue" href="#haus" aria-label="Mehr über N.E.S erfahren">
            <span>Scroll to discover</span>
            <i />
          </a>
        </section>

        <section className="manifesto section-pad" id="haus">
          <div className="manifesto-heading" data-reveal>
            <p className="eyebrow">Wer wir sind</p>
            <h2>
              Ein Haus.
              <em>Drei Handschriften.</em>
            </h2>
          </div>

          <div className="manifesto-body" data-reveal>
            <p className="manifesto-lead">
              N.E.S bündelt drei eigenständige Marken unter einem Dach — von flexiblen
              Feel Shoes über italienische Mocassini bis zu charaktervollem Strick.
            </p>
            <p>
              Ihre Formen sind verschieden. Ihr Anspruch ist derselbe: bewusst gewählte
              Materialien, durchdachte Konstruktionen und Komfort mit Charakter.
            </p>
          </div>

          <div className="principle-grid" data-reveal>
            <article>
              <span>01</span>
              <h3>Klar in der Form</h3>
              <p>Weniger Effekte, mehr Haltung. Design, das nicht nach Aufmerksamkeit fragen muss.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Ehrlich im Material</h3>
              <p>Texturen und Werkstoffe, die man sehen, fühlen und lange tragen möchte.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Gemacht für Bewegung</h3>
              <p>Komfort, der den Alltag begleitet — vom ersten Schritt bis zum Ankommen.</p>
            </article>
          </div>
        </section>

        <BrandJourney />

        <section className="standard-section" id="anspruch">
          <div className="standard-image" data-reveal>
            <img src="/wai13-opt.jpeg" alt="Material- und Produktdetail aus der N.E.S Entwicklung" />
          </div>
          <div className="standard-copy" data-reveal>
            <p className="eyebrow">Unser Maßstab</p>
            <h2>Was gut aussieht, sollte sich genauso gut anfühlen.</h2>
            <p>
              N.E.S steht für Produkte mit Substanz: durchdachte Materialien,
              nachvollziehbare Fertigung und ein Komfort, der nicht erklärt werden muss.
              Wir stellen gerade die erste Auswahl zusammen.
            </p>
            <div className="standard-lines">
              <span>Material with purpose</span>
              <span>Craft with precision</span>
              <span>Comfort with character</span>
            </div>
          </div>
        </section>

        <section className="launch-section" id="notify">
          <div className="launch-orbit" aria-hidden="true">
            <span>N</span><span>E</span><span>S</span>
          </div>
          <div className="launch-content" data-reveal>
            <p className="eyebrow">Be first in line</p>
            <h2>Der Anfang kommt näher.</h2>
            <p>
              Trag dich ein und erfahre zuerst, wann N.E.S öffnet, welche Geschichten
              hinter den Marken stehen und wann die erste Auswahl verfügbar ist.
            </p>
            <SignupForm id="launch-email" dark />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header({ scrolled }) {
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="wordmark" href="#top" aria-label="N.E.S Startseite">N.E.S</a>
      <nav aria-label="Hauptnavigation">
        <a href="#haus">Das Haus</a>
        <a href="#marken">Marken</a>
        <a href="#anspruch">Anspruch</a>
      </nav>
      <a className="header-cta" href="#notify">
        <span>Launch-Info</span>
        <ArrowIcon />
      </a>
    </header>
  );
}

function SignupForm({ id, dark = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, source: "nes-coming-soon" }),
        });
        if (!response.ok) throw new Error("Subscription failed");
      } else {
        const saved = JSON.parse(localStorage.getItem("nes-waitlist") || "[]");
        if (!saved.includes(email)) localStorage.setItem("nes-waitlist", JSON.stringify([...saved, email]));
      }

      setStatus("success");
      setMessage("Danke — du bist auf der Liste.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Das hat nicht geklappt. Bitte versuche es noch einmal.");
    }
  }

  if (status === "success") {
    return (
      <div className={`signup-success${dark ? " signup-success-dark" : ""}`} role="status">
        <span>✓</span>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className={`signup-wrap${dark ? " signup-wrap-dark" : ""}`}>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor={id}>E-Mail-Adresse</label>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Deine E-Mail-Adresse"
          autoComplete="email"
          required
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          <span>{status === "loading" ? "Einen Moment" : "Informiert mich"}</span>
          <ArrowIcon />
        </button>
      </form>
      <div className="signup-meta">
        <span>Launch-Updates, keine Dauerwerbung.</span>
        {status === "error" && <span className="signup-error" role="alert">{message}</span>}
      </div>
    </div>
  );
}

function BrandJourney() {
  const [activeBrand, setActiveBrand] = useState(BRANDS[0].id);

  useEffect(() => {
    const chapters = document.querySelectorAll("[data-brand-chapter]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveBrand(visible.target.dataset.brandChapter);
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0, 0.2, 0.5] },
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="brand-journey" id="marken">
      <div className="journey-visual" aria-hidden="true">
        {BRANDS.map((brand) => (
          <img
            className={`${activeBrand === brand.id ? "is-active" : ""} journey-image-${brand.id}`}
            src={brand.image}
            alt=""
            key={brand.id}
            style={{ objectPosition: brand.position }}
          />
        ))}
        <div className="journey-visual-meta">
          <span>{BRANDS.find((brand) => brand.id === activeBrand)?.number} / 03</span>
          <span>Scroll to explore</span>
        </div>
      </div>

      <div className="journey-content">
        <header className="journey-heading" data-reveal>
          <p className="eyebrow">Die Marken</p>
          <h2>Drei Wege zu einem besseren Gefühl.</h2>
          <p>Scrolle durch die drei Perspektiven, die N.E.S zu einem Haus verbinden.</p>
        </header>

        {BRANDS.map((brand) => (
          <article
            className={`brand-chapter${activeBrand === brand.id ? " is-active" : ""}`}
            data-brand-chapter={brand.id}
            key={brand.id}
          >
            <div className={`chapter-mobile-image chapter-mobile-image-${brand.id}`}>
              <img
                src={brand.image}
                alt={`${brand.name} — ${brand.category}`}
                style={{ objectPosition: brand.position }}
              />
            </div>
            <div className="chapter-index">
              <span>{brand.number}</span>
              <i />
              <span>03</span>
            </div>
            <p className="eyebrow">{brand.category}</p>
            <h3>{brand.name}</h3>
            <strong>{brand.statement}</strong>
            <p className="chapter-description">{brand.description}</p>
            <span className="chapter-status">Kollektion in Vorbereitung</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="footer-mark" href="#top">N.E.S</a>
        <p>Ein Haus für Feel Shoes, Mocassini und Knitwear.</p>
        <a className="footer-up" href="#top">Nach oben <span>↑</span></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 N.E.S</span>
        <span>Austria · Coming soon</span>
        <span>WAI · Vehon · Green Comfort</span>
      </div>
    </footer>
  );
}
