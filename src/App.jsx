import { useEffect, useState } from "react";
import "./App.css";

const MOMENTS = [
  {
    src: "/messe-offenbach/beratung-am-stand.jpeg",
    alt: "Besucher im persönlichen Gespräch am WAI Messestand",
    number: "01",
    label: "Austausch",
    className: "moment-main",
  },
  {
    src: "/messe-offenbach/feel-shoes-auswahl.jpeg",
    alt: "WAI Feel Shoes in verschiedenen Farben auf dem Messetisch",
    number: "02",
    label: "Kollektion",
    className: "moment-products",
  },
  {
    src: "/messe-offenbach/messegespraech-hq.jpeg",
    alt: "Fachgespräch mit Besuchern in der Messehalle",
    number: "03",
    label: "Beratung",
    className: "moment-talk",
  },
  {
    src: "/messe-offenbach/team-in-der-halle-hq.jpeg",
    alt: "Das WAI Team gemeinsam mit einem Besucher auf der Messe",
    number: "04",
    label: "Begegnungen",
    className: "moment-team",
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      { threshold: 0.1 },
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
            <p className="hero-overline">
              <span>01</span>
              <span>N.E.S vor Ort</span>
            </p>

            <div className="hero-content">
              <h1 id="hero-title">
                Messe
                <em>Offenbach</em>
              </h1>
              <p>
                WAI Feel Shoes zum Anfassen, Anprobieren und Weiterdenken —
                ein Rückblick auf Begegnungen, Materialien und neue Perspektiven.
              </p>
              <a className="button button-dark" href="#einblicke">
                <span>Einblicke ansehen</span>
                <ArrowIcon />
              </a>
            </div>

            <div className="hero-meta" aria-label="Veranstaltungsinformationen">
              <span>Offenbach am Main</span>
              <span>WAI Feel Shoes</span>
            </div>
          </div>

          <figure className="hero-media">
            <img
              src="/messe-offenbach/produktpraesentation-hq.jpeg"
              alt="Zwei Besucher betrachten einen WAI Feel Shoe am Messestand"
            />
            <figcaption>
              <span>Am Stand</span>
              <span>01 / 04</span>
            </figcaption>
          </figure>
        </section>

        <section className="intro section-wrap" id="messe">
          <div className="intro-heading" data-reveal>
            <p className="eyebrow">Messe-Rückblick</p>
            <h2>Ein Schuh wird erst im Gespräch lebendig.</h2>
          </div>

          <div className="intro-copy" data-reveal>
            <p className="intro-lead">
              In Offenbach ging es nicht um eine klassische Produktshow. Es ging
              darum, WAI direkt zu erleben.
            </p>
            <p>
              Besucher konnten Passformen vergleichen, Materialien fühlen und mit
              unserem Team über natürliche Bewegung sprechen. Genau dieser direkte
              Austausch macht eine Messe für uns wertvoll.
            </p>
          </div>

          <div className="fact-row" data-reveal>
            <article>
              <span>01</span>
              <h3>Anprobieren</h3>
              <p>Bewegungsfreiheit dort erleben, wo sie zählt: am eigenen Fuß.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Verstehen</h3>
              <p>Material, Sohle und Konstruktion ohne Umwege kennenlernen.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Austauschen</h3>
              <p>Fragen stellen, Erfahrungen teilen und neue Kontakte knüpfen.</p>
            </article>
          </div>
        </section>

        <section className="moments" id="einblicke">
          <header className="moments-heading" data-reveal>
            <div>
              <p className="eyebrow">Momente aus Offenbach</p>
              <h2>Nah dran.</h2>
            </div>
            <p>
              Keine Hochglanzkulisse — sondern echte Gespräche, neugierige Hände
              und Schuhe, die ausprobiert werden wollen.
            </p>
          </header>

          <div className="moments-grid">
            {MOMENTS.map((moment) => (
              <figure className={`moment ${moment.className}`} data-reveal key={moment.src}>
                <div className="moment-image">
                  <img src={moment.src} alt={moment.alt} loading="lazy" />
                </div>
                <figcaption>
                  <span>{moment.number}</span>
                  <span>{moment.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="product-story" id="wai">
          <figure className="product-story-media" data-reveal>
            <img
              src="/messe-offenbach/material-und-sohlen-hq.jpeg"
              alt="Verschiedene Material- und Sohlenmuster am Messestand"
              loading="lazy"
            />
            <figcaption>Materialbibliothek · Offenbach</figcaption>
          </figure>

          <div className="product-story-copy" data-reveal>
            <p className="eyebrow">WAI Feel Shoes</p>
            <h2>Komfort, den man nicht erklären muss.</h2>
            <p>
              Flexible Sohlen, eine breite Zehenbox und sorgfältig ausgewählte
              Materialien geben dem Fuß Raum für natürliche Bewegung. Auf der Messe
              wurde aus diesen Details ein unmittelbares Gefühl.
            </p>
            <ul>
              <li><span>01</span> Zero Drop</li>
              <li><span>02</span> Flexible Konstruktion</li>
              <li><span>03</span> Breite Zehenbox</li>
            </ul>
          </div>
        </section>

        <section className="updates" id="updates">
          <div className="updates-inner" data-reveal>
            <p className="eyebrow">Im Gespräch bleiben</p>
            <h2>Wir sehen uns.</h2>
            <p>
              Neue Modelle, nächste Messetermine und Geschichten aus dem N.E.S Haus —
              kompakt in deinem Postfach.
            </p>
            <SignupForm />
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
        <a href="#messe">Messe</a>
        <a href="#einblicke">Einblicke</a>
        <a href="#wai">WAI</a>
      </nav>
      <a className="header-link" href="#updates">
        <span>Updates</span>
        <ArrowIcon />
      </a>
    </header>
  );
}

function SignupForm() {
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
        if (!saved.includes(email)) {
          localStorage.setItem("nes-waitlist", JSON.stringify([...saved, email]));
        }
      }

      setStatus("success");
      setMessage("Danke — wir halten dich auf dem Laufenden.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Das hat nicht geklappt. Bitte versuche es noch einmal.");
    }
  }

  if (status === "success") {
    return <p className="form-message form-success" role="status">{message}</p>;
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="update-email">E-Mail-Adresse</label>
      <input
        id="update-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Deine E-Mail-Adresse"
        autoComplete="email"
        required
        disabled={status === "loading"}
      />
      <button type="submit" disabled={status === "loading"}>
        <span>{status === "loading" ? "Einen Moment" : "Eintragen"}</span>
        <ArrowIcon />
      </button>
      {status === "error" && <p className="form-message form-error" role="alert">{message}</p>}
    </form>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a href="#top" className="footer-mark">N.E.S</a>
        <p>Ein Haus für Produkte mit Haltung, Komfort und Charakter.</p>
        <a href="#top" className="footer-up">Nach oben <span>↑</span></a>
      </div>
      <div className="footer-meta">
        <span>© 2026 N.E.S</span>
        <span>Messe Offenbach</span>
        <span>WAI · Vehon · Green Comfort</span>
      </div>
    </footer>
  );
}
