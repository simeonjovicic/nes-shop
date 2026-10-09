import { useState } from "react";
import { BRANDS } from "./brands.js";
import { PRODUCTS } from "./products.js";
import { getProductSlug } from "./shopState.js";
import "./brand-experience.css";

function StoryLink({ href, onNavigate, children, className = "story-link", ...props }) {
  return <a href={href} className={className} {...props} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate();
  }}>{children}</a>;
}

function Arrow() {
  return <svg className="arrow-icon" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" /></svg>;
}

export function BrandCards({ language, onBrand }) {
  return <div className="house-brand-grid">{BRANDS.map(brand => {
    const text = brand[language];
    return <StoryLink className={`house-brand-card house-brand-${brand.id}`} href={`/brands#${brand.id}`} onNavigate={() => onBrand(brand.id)} key={brand.id}>
      <div className="house-brand-image"><img src={brand.cardImage ?? brand.hero} alt={text.cardAlt ?? text.imageAlt} loading="lazy" decoding="async" style={{ objectPosition: brand.cardPosition ?? brand.position }} /><span className="house-brand-number">{brand.index} / NES</span></div>
      <div className="house-brand-label"><div><h3>{brand.name}</h3><span>{brand.signature}</span></div><Arrow /></div>
      <p>{text.title}</p>
    </StoryLink>;
  })}</div>;
}

export function BrandsPage({ language, onBrand, onAbout, onShop, renderProduct }) {
  const de = language === "de";
  return <main className="brand-directory brand-page">
    <header className="brand-directory-intro brand-wrap">
      <p className="eyebrow">NES / {de ? "Die Marken" : "The brands"}</p>
      <div className="brand-directory-heading"><h1>{de ? <>Drei Handschriften.<br /><em>Eine Auswahl.</em></> : <>Three signatures.<br /><em>One selection.</em></>}</h1><p>{de ? "Textile Feel Shoes, klare Loafer und ausdrucksstarker Strick. Jede Marke bringt etwas Eigenes mit. NES führt sie zusammen." : "Textile feel shoes, clean loafers and expressive knitwear. Each brand brings something of its own. NES brings them together."}</p></div>
      <nav className="brand-index" aria-label={de ? "Zu den Marken springen" : "Jump to a brand"}>{BRANDS.map(brand => <StoryLink href={`/brands#${brand.id}`} onNavigate={() => onBrand(brand.id)} key={brand.id}><span>{brand.index}</span>{brand.name}</StoryLink>)}</nav>
    </header>
    {BRANDS.map((brand, index) => {
      const text = brand[language];
      const shopHref = `/shop?brand=${brand.filter}`;
      return <section className={`brand-chapter brand-chapter-${brand.id}${index % 2 ? " brand-chapter-reverse" : ""} brand-wrap`} id={brand.id} aria-labelledby={`brand-${brand.id}-title`} key={brand.id}>
        <div className="brand-chapter-lead">
          <figure className="brand-chapter-image"><img src={brand.hero} alt={text.imageAlt} loading={index ? "lazy" : "eager"} decoding="async" style={{ objectPosition: brand.position }} /><figcaption>{brand.index} / {brand.signature}</figcaption></figure>
          <div className="brand-chapter-copy">
            <p className="eyebrow">{text.category}</p><h2 id={`brand-${brand.id}-title`}>{brand.name}</h2><p className="brand-chapter-tagline">{text.title}</p>
            <p>{text.intro}</p><p>{text.story}</p>
            <StoryLink className="button button-forest" href={shopHref} onNavigate={() => onShop(brand.filter)}>{text.selection}<Arrow /></StoryLink>
          </div>
        </div>
        <div className="brand-product-grid">{brand.previewIds.map(id => PRODUCTS.find(product => product.id === id)).filter(Boolean).map(renderProduct)}</div>
      </section>;
    })}
    <section className="house-note brand-wrap"><span className="eyebrow">{de ? "Der Gedanke dahinter" : "The idea behind it"}</span><h2>{de ? "Natürliches Gefühl verdient eine gute Form." : "Natural feeling deserves good form."}</h2><StoryLink href="/about" onNavigate={onAbout}>{de ? "Über NES" : "About NES"}<Arrow /></StoryLink></section>
  </main>;
}

const MATERIALS = [
  { id: 119, label: { de: "Denim", en: "Denim" }, text: { de: "Der vertraute Ausdruck von Denim in einer sehr leichten Mocassin-Form. Die Stoffstruktur bleibt sichtbar, die Sohle flach.", en: "The familiar character of denim in a very light moccasin shape. Visible textile texture and a flat sole." } },
  { id: 123, label: { de: "Wolltextil", en: "Wool textile" }, text: { de: "Eine weiche, melierte Oberfläche und eine klare Slip-on-Form. Stoff und dunkle Einfassung bestimmen den Ausdruck.", en: "A soft, mottled surface and a clean slip-on shape. The textile and dark edging define its expression." } },
  { id: 126, label: { de: "Muster", en: "Pattern" }, text: { de: "Kontrastreiches Wolltextil in einer knöchelhohen Form. Ein anderer Ausdruck — dieselbe Idee von dünnem Stoff und wenig Sohle.", en: "Contrasting wool textile in an ankle-high shape. A different expression of the same idea: thin fabric and a minimal sole." } },
];

export function MaterialStudy({ language, onOpen, onBrand }) {
  const [active, setActive] = useState(0);
  const de = language === "de";
  const material = MATERIALS[active];
  const product = PRODUCTS.find(item => item.id === material.id);
  return <section className="material-study" id="spotlight" aria-labelledby="material-study-title">
    <div className="material-study-stage"><span className="material-study-index">WAI / {de ? "Materialstudie" : "Material study"} 0{active + 1}</span><img key={product.id} src={product.image} alt={`${product.name} — ${product.color[language]}`} loading="lazy" decoding="async" width="1122" height="1402" /><div className="material-stage-caption"><span>{product.name}</span><span>{product.color[language]}</span></div></div>
    <div className="material-study-copy"><p className="eyebrow">WAI by Vehon / Feel Shoes</p><h2 id="material-study-title">{de ? <>So wenig Schuh.<br /><em>So viel Stoff.</em></> : <>So little shoe.<br /><em>So much texture.</em></>}</h2><p className="material-study-intro">{de ? "Sehr dünner Stoff. Eine flache, flexible Sohle. Wie sich WAI zeigt, entscheidet das Material." : "Very thin fabric. A flat, flexible sole. The material gives WAI its expression."}</p>
      <div className="material-study-options" role="group" aria-label={de ? "Material entdecken" : "Explore materials"}>{MATERIALS.map((item, index) => <button key={item.id} type="button" aria-pressed={index === active} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label[language]}</button>)}</div>
      <p className="material-study-description" aria-live="polite">{material.text[language]}</p>
      <div className="material-study-actions"><StoryLink href={`/products/${getProductSlug(product)}`} onNavigate={() => onOpen(product.id)}>{de ? "Dieses Modell ansehen" : "View this style"}<Arrow /></StoryLink><StoryLink href="/brands#wai" onNavigate={() => onBrand("wai")}>{de ? "Die Welt von WAI" : "The world of WAI"}</StoryLink></div>
    </div>
  </section>;
}

export function AboutPage({ language, onBrand, onShop, onAdvice }) {
  const de = language === "de";
  return <main className="brand-page house-about">
    <header className="house-about-intro brand-wrap"><p className="eyebrow">{de ? "Über NES" : "About NES"} / Natural feeling. Personal expression.</p><h1>{de ? <>Natürlich gehen.<br /><em>Eigenständig auftreten.</em></> : <>Move naturally.<br /><em>Express yourself.</em></>}</h1><div className="house-origin"><span className="house-origin-mark">NES</span><div><p>{de ? "NES trägt den Namen seines Gründers. Dahinter steht eine einfache Überzeugung: Barfußschuhe können sich natürlich anfühlen und gut aussehen." : "NES carries its founder’s name. Behind it is a simple belief: barefoot shoes can feel natural and look good."}</p><p>{de ? "Deshalb kommen hier textile Feel Shoes, Loafer und ausdrucksstarker Strick zusammen. Eine Auswahl für Menschen, die Wert auf das Tragegefühl und ihren eigenen Stil legen." : "That is why textile feel shoes, loafers and expressive knitwear come together here. A selection for people who care about how things feel and how they express their own style."}</p></div></div></header>
    <figure className="house-about-image brand-wrap"><img src="/shop/editorial/nes-shoppable-look-v1.webp" alt={de ? "Ein Look aus Montechiaro-Strick und blauen WAI Feel Shoes" : "A look combining Montechiaro knitwear and blue WAI feel shoes"} loading="lazy" width="1536" height="1024" /><figcaption><span>NES / {de ? "Ein Look, zwei Handschriften" : "One look, two signatures"}</span><span>Montechiaro × WAI</span></figcaption></figure>
    <section className="house-belief brand-wrap"><p className="eyebrow">{de ? "Was die Auswahl verbindet" : "What connects the selection"}</p><h2>{de ? "Das Gefühl entscheidet. Die Form bleibt im Kopf." : "The feeling draws you in. The form stays with you."}</h2><div className="house-belief-copy"><p>{de ? "Bei WAI ist es die Leichtigkeit des Stoffs. Bei Vehon die klare Silhouette. Bei Montechiaro sind es Farbe und Struktur. NES gibt diesen unterschiedlichen Handschriften einen gemeinsamen Ort." : "For WAI, it is the lightness of the textile. For Vehon, the clean silhouette. For Montechiaro, colour and structure. NES gives these different signatures a shared home."}</p><p>{de ? "Die Produkte lassen sich einzeln entdecken und miteinander kombinieren. Ein markanter Pullover, eine ruhige Hose, ein leichter Schuh: Der eigene Stil entsteht dazwischen." : "Discover the pieces individually and combine them in your own way. An expressive sweater, quiet trousers, a light shoe: personal style happens between them."}</p></div></section>
    <section className="brand-wrap house-about-brands" aria-label={de ? "Die Marken bei NES" : "The brands at NES"}><BrandCards language={language} onBrand={onBrand} /></section>
    <section className="house-personal brand-wrap"><div><p className="eyebrow">NES / {de ? "Persönlich auswählen" : "A personal selection"}</p><h2>{de ? "Das passende Gefühl finden." : "Find what feels right."}<em>{de ? "Wir helfen dabei." : "We are here to help."}</em></h2><p>{de ? "Fragen zu Modell, Material oder Größe? Wir beraten Sie persönlich und bestätigen Verfügbarkeit und Versand zu Ihrer Auswahl." : "Questions about a style, material or size? We offer personal advice and confirm availability and shipping for your selection."}</p></div><div className="house-personal-actions"><button className="button button-forest" type="button" onClick={onAdvice}>{de ? "Beratung anfragen" : "Ask for advice"}<Arrow /></button><StoryLink href="/shop" onNavigate={() => onShop("all")}>{de ? "Die Auswahl entdecken" : "Explore the selection"}<Arrow /></StoryLink></div></section>
  </main>;
}
