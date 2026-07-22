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

const FAIR_MOMENTS = [
  {
    src: "/messe-offenbach/beratung-am-stand.jpeg",
    alt: "Besucher im Gespräch am WAI Messestand in Offenbach",
    label: "Austausch am Stand",
    className: "fair-photo-main",
  },
  {
    src: "/messe-offenbach/feel-shoes-auswahl.jpeg",
    alt: "Auswahl der WAI Feel Shoes auf dem Messetisch",
    label: "Die Kollektion",
    className: "fair-photo-products",
  },
  {
    src: "/messe-offenbach/material-und-sohlen.jpeg",
    alt: "Material- und Sohlenmuster der WAI Feel Shoes",
    label: "Material zum Anfassen",
    className: "fair-photo-material",
  },
  {
    src: "/messe-offenbach/messegespraech.jpeg",
    alt: "Fachgespräch mit Besuchern auf der Messe in Offenbach",
    label: "Persönliche Beratung",
    className: "fair-photo-talk",
  },
  {
    src: "/messe-offenbach/produktpraesentation.jpeg",
    alt: "Präsentation eines WAI Feel Shoes am Messestand",
    label: "Feel Shoes erleben",
    className: "fair-photo-demo",
  },
  {
    src: "/messe-offenbach/team-in-der-halle.jpeg",
    alt: "Das WAI Team mit einem Besucher in der Messehalle",
    label: "Begegnungen in Offenbach",
    className: "fair-photo-team",
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
          <div className="hero-copy">
            <p className="hero-kicker"><span>01</span> N.E.S vor Ort</p>
            <div className="hero-print">
              <h1 className="hero-mark" id="hero-title">
                Messe
                <em>Offenbach</em>
              </h1>
              <p className="hero-intro">
                WAI Feel Shoes live erleben — neue Modelle, natürliche Bewegung
                und persönliche Gespräche direkt an unserem Messestand.
              </p>
              <div className="hero-actions">
                <a className="hero-primary" href="#einblicke">
                  <span>Messe-Einblicke</span>
                  <ArrowIcon />
                </a>
                <a className="hero-secondary" href="#marken">Unsere Marken</a>
              </div>
            </div>

            <div className="hero-base">
              <span>Offenbach am Main</span>
              <span>WAI Feel Shoes</span>
            </div>
          </div>

          <figure className="hero-picture">
            <img
              src="/messe-offenbach/team-am-stand.jpeg"
              alt="Das WAI Team gemeinsam am Messestand in Offenbach"
            />
            <figcaption>
              <span>Das Team vor Ort</span>
              <span>Messe Offenbach</span>
            </figcaption>
          </figure>
        </section>

        <section className="manifesto section-pad" id="haus">
          <div className="manifesto-heading" data-reveal>
            <p className="eyebrow">Messe-Rückblick</p>
            <h2>
              WAI live.
              <em>Direkt im Austausch.</em>
            </h2>
          </div>

          <div className="manifesto-body" data-reveal>
            <p className="manifesto-lead">
              In Offenbach wurde aus Produktwissen ein echtes Erlebnis: sehen,
              fühlen, anprobieren und miteinander sprechen.
            </p>
            <p>
              Unser Team zeigte die aktuelle WAI Auswahl und erklärte, wie flexible
              Materialien, eine breite Zehenbox und die Zero-Drop-Konstruktion zu
              einem natürlichen Laufgefühl beitragen.
            </p>
          </div>

          <div className="principle-grid" data-reveal>
            <article>
              <span>01</span>
              <h3>Anprobieren</h3>
              <p>Passform und Bewegungsfreiheit lassen sich am besten direkt am Fuß erleben.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Material fühlen</h3>
              <p>Flexible Sohlen und weiche Obermaterialien wurden vor Ort greifbar.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Fragen stellen</h3>
              <p>Persönliche Beratung und ehrlicher Austausch standen im Mittelpunkt.</p>
            </article>
          </div>
        </section>

        <FairStory />

        <BrandJourney />

        <section className="standard-section" id="anspruch">
          <div className="standard-image" data-reveal>
            <img
              src="/messe-offenbach/material-und-sohlen.jpeg"
              alt="Verschiedene Material- und Sohlenmuster am Messestand"
              loading="lazy"
            />
          </div>
          <div className="standard-copy" data-reveal>
            <p className="eyebrow">Am Messetisch</p>
            <h2>Materialien, die ihre Qualität zeigen dürfen.</h2>
            <p>
              Auf der Messe konnten Besucher Konstruktion und Material unmittelbar
              vergleichen. Genau dort wird sichtbar, was WAI ausmacht: Flexibilität,
              Funktion und ein Komfort, der nicht erklärt werden muss.
            </p>
            <div className="standard-lines">
              <span>Breite Zehenbox</span>
              <span>Flexible Sohle</span>
              <span>Natürliches Laufgefühl</span>
            </div>
          </div>
        </section>

        <section className="launch-section" id="notify">
          <div className="launch-orbit" aria-hidden="true">
            <span>N</span><span>E</span><span>S</span>
          </div>
          <div className="launch-content" data-reveal>
            <p className="eyebrow">Im Gespräch bleiben</p>
            <h2>Nach der Messe ist vor der nächsten Begegnung.</h2>
            <p>
              Trag dich ein und erfahre zuerst von neuen Modellen, kommenden
              Messeterminen und den Geschichten hinter unseren Marken.
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
        <a href="#haus">Messe</a>
        <a href="#einblicke">Einblicke</a>
        <a href="#marken">Marken</a>
      </nav>
      <a className="header-cta" href="#notify">
        <span>Updates</span>
        <ArrowIcon />
      </a>
    </header>
  );
}

function FairStory() {
  return (
    <section className="fair-story" id="einblicke">
      <header className="fair-heading" data-reveal>
        <div>
          <p className="eyebrow">Einblicke aus Offenbach</p>
          <h2>Mittendrin statt nur ausgestellt.</h2>
        </div>
        <p>
          Unser Stand war Treffpunkt, Anprobe und Werkbank zugleich. Eine Auswahl
          an Momenten, Produkten und Gesprächen von der Messe.
        </p>
      </header>

      <div className="fair-grid">
        {FAIR_MOMENTS.map((moment, index) => (
          <figure className={`fair-photo ${moment.className}`} data-reveal key={moment.src}>
            <img src={moment.src} alt={moment.alt} loading="lazy" />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{moment.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
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
          body: JSON.stringify({ email, source: "nes-messe-offenbach" }),
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
        <span>Messe- und Produktupdates, keine Dauerwerbung.</span>
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
        <p>Ein Haus für Feel Shoes, Mocassini und Knitwear — persönlich präsentiert in Offenbach.</p>
        <a className="footer-up" href="#top">Nach oben <span>↑</span></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 N.E.S</span>
        <span>Messe Offenbach · Rückblick</span>
        <span>WAI · Vehon · Green Comfort</span>
      </div>
    </footer>
  );
}
