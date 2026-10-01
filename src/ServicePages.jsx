import { SERVICE_EMAIL, SERVICE_PAGES, LEGAL_DRAFT_NOTE } from "./serviceContent";
import "./service-pages.css";

export function ServiceLink({ href, onNavigate, children, ...props }) {
  return <a {...props} href={href} onClick={(event) => {
    if (!onNavigate || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  }}>{children}</a>;
}

function StorageDetails({ language }) {
  const de = language === "de";
  const rows = [
    ["nes-bag", de ? "Ihre ausgewählten Artikel, Größen und Mengen." : "Your selected items, sizes and quantities."],
    ["nes-wishlist", de ? "Die Artikelnummern Ihrer gemerkten Produkte." : "The product IDs of your saved items."],
    ["nes-language", de ? "Die von Ihnen gewählte Sprache: Deutsch oder Englisch." : "Your chosen language: German or English."],
  ];
  return <div className="service-storage">
    <dl>{rows.map(([key, purpose]) => <div key={key}><dt><code>{key}</code></dt><dd>{purpose}</dd></div>)}</dl>
    <p>{de ? "Diese Einträge bleiben in diesem Browser ohne feste Ablaufzeit erhalten. Entfernen Sie alle Artikel, wird die jeweilige Liste gelöscht. Alle Einträge lassen sich über die Website-Daten in den Browser-Einstellungen löschen; dabei gehen Ihre gespeicherten Auswahlen und die Spracheinstellung verloren." : "These entries remain in this browser without a fixed expiry. Removing every item deletes that list. You can remove all entries through your browser’s site-data settings; this also clears your saved selections and language preference."}</p>
  </div>;
}

export function ServiceDocument({ page, language, onNavigate, onService, onTrade, modal = false }) {
  const de = language === "de";
  const actions = { advice: de ? "Persönliche Beratung" : "Personal advice", returns: de ? "Rückgabe anfragen" : "Ask about a return", trade: de ? "Partneranfrage" : "Partnership enquiry" };
  const Heading = modal ? "h2" : "h1";
  const SectionHeading = modal ? "h3" : "h2";
  return <article className={`service-document${modal ? " is-modal" : ""}`}>
    <header className="service-document-heading">
      <p className="service-kicker">NES / {page.label[language]}</p>
      <Heading id={modal ? "legal-title" : "service-page-title"}>{page.title[language]}</Heading>
      <p className="service-lead">{page.intro[language]}</p>
    </header>
    {page.draft && <aside className="service-draft" aria-label={de ? "Entwurfsstatus" : "Draft status"}><span>{de ? "Noch in Vorbereitung" : "In preparation"}</span><p>{LEGAL_DRAFT_NOTE[language]}</p></aside>}
    <div className="service-document-sections">
      {page.sections.map((section, index) => {
        const linked = SERVICE_PAGES.find((item) => item.id === section.link);
        return <section className={`service-document-section${section.pending ? " has-pending-details" : ""}`} key={index}>
          <SectionHeading>{section.title[language]}</SectionHeading>
          {section.pending && <span className="service-pending-label">{de ? "Angaben folgen" : "Details to follow"}</span>}
          {section.paragraphs?.map((paragraph, i) => <p key={i}>{paragraph[language]}</p>)}
          {section.list && <ul>{section.list.map((item, i) => <li key={i}>{item[language]}</li>)}</ul>}
          {section.facts && <dl className="service-facts">{section.facts.map(([label, value], i) => <div key={i}><dt>{label[language]}</dt><dd>{value[language]}</dd></div>)}</dl>}
          {section.email && <a className="service-text-link service-email" href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}<span aria-hidden="true">↗</span></a>}
          {section.action && <button className="service-text-link" type="button" onClick={() => section.action === "trade" ? onTrade() : onService(section.action)}>{actions[section.action]}<span aria-hidden="true">↗</span></button>}
          {linked && <ServiceLink className="service-text-link" href={linked.path} onNavigate={onNavigate}>{linked.label[language]}<span aria-hidden="true">→</span></ServiceLink>}
          {section.storage && <StorageDetails language={language} />}
          {section.sources?.map((source) => <a className="service-source" href={source.href} key={source.href} target="_blank" rel="noreferrer">{source.label[language]} <span aria-hidden="true">↗</span><span className="sr-only"> ({de ? "neuer Tab" : "new tab"})</span></a>)}
        </section>;
      })}
    </div>
  </article>;
}

function ServiceNavigation({ page, language, onNavigate }) {
  const de = language === "de";
  return <nav className="service-navigation" aria-label={de ? "Service und Rechtliches" : "Service and legal information"}>
    <ServiceLink className="service-nav-overview" href="/service" onNavigate={onNavigate}>{de ? "Alle Themen" : "All topics"}<span aria-hidden="true">↗</span></ServiceLink>
    {["service", "legal"].map((group) => <div className="service-nav-group" key={group}>
      <p>{group === "service" ? "Service" : de ? "Rechtliches" : "Legal"}</p>
      {SERVICE_PAGES.filter((item) => item.group === group).map((item) => <ServiceLink href={item.path} key={item.id} onNavigate={onNavigate} aria-current={page?.id === item.id ? "page" : undefined}>{item.label[language]}<span aria-hidden="true">→</span></ServiceLink>)}
    </div>)}
    <div className="service-nav-contact"><p>{de ? "Lieber persönlich?" : "Prefer a conversation?"}</p><a href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}</a></div>
  </nav>;
}

export function ServicePages({ page, isHub, language, onNavigate, onService, onTrade }) {
  const de = language === "de";
  return <main className={`service-page${isHub ? " service-hub" : ""}`} aria-labelledby="service-page-title">
    <div className="service-page-inner">
      <nav className="service-breadcrumb" aria-label={de ? "Seitenpfad" : "Breadcrumb"}>
        <ServiceLink href="/" onNavigate={onNavigate}>NES</ServiceLink><span aria-hidden="true">/</span>
        {isHub ? <span aria-current="page">Service</span> : <><ServiceLink href="/service" onNavigate={onNavigate}>Service</ServiceLink><span aria-hidden="true">/</span><span aria-current="page">{page?.label[language] || (de ? "Nicht gefunden" : "Not found")}</span></>}
      </nav>
      {isHub ? <>
        <header className="service-hub-heading">
          <div><p className="service-kicker">NES / {de ? "Für Sie da" : "Here for you"}</p><h1 id="service-page-title">{de ? "Guter Stil." : "Good style."}<em>{de ? "Guter Service." : "Good service."}</em></h1></div>
          <div className="service-hub-intro"><p>{de ? "Von der ersten Frage bis zur Pflege Ihres Lieblingsstücks. Hier finden Sie Antworten – und den direkten Weg zu uns." : "From your first question to caring for a favourite piece. Find answers here, and a direct line to us."}</p><a className="service-text-link" href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}<span aria-hidden="true">↗</span></a></div>
        </header>
        <div className="service-topic-grid">{SERVICE_PAGES.filter((item) => item.group === "service").map((item) => <ServiceLink className="service-topic" href={item.path} onNavigate={onNavigate} key={item.id}>
          <span className="service-topic-number">{item.number}</span><h2>{item.label[language]}</h2><p>{item.intro[language]}</p><span className="service-topic-arrow" aria-hidden="true">↗</span>
        </ServiceLink>)}
          <div className="service-personal"><span className="service-kicker">{de ? "Von Mensch zu Mensch" : "Person to person"}</span><h2>{de ? "Noch eine Frage?" : "Another question?"}</h2><p>{de ? "Wir helfen Ihnen bei Modell, Material und Passform." : "We can help with styles, materials and fit."}</p><button className="service-text-link" type="button" onClick={() => onService("advice")}>{de ? "Beratung anfragen" : "Ask for advice"}<span aria-hidden="true">↗</span></button></div>
        </div>
        <section className="service-hub-legal"><div><p className="service-kicker">{de ? "Transparent & nachvollziehbar" : "Clear & transparent"}</p><h2>{de ? "Das Kleingedruckte. Lesbar." : "The fine print. Made readable."}</h2><p>{de ? "Unsere Rechtstexte sind als Entwurf vorbereitet. Fehlende Angaben sind gekennzeichnet." : "Our legal pages are prepared as drafts. Missing details are clearly marked."}</p></div><nav aria-label={de ? "Rechtliches" : "Legal"}>{SERVICE_PAGES.filter((item) => item.group === "legal").map((item) => <ServiceLink href={item.path} onNavigate={onNavigate} key={item.id}>{item.label[language]}<span aria-hidden="true">↗</span></ServiceLink>)}</nav></section>
      </> : <div className="service-page-layout">
        <ServiceNavigation page={page} language={language} onNavigate={onNavigate} />
        {page ? <ServiceDocument page={page} language={language} onNavigate={onNavigate} onService={onService} onTrade={onTrade} /> : <article className="service-document"><p className="service-kicker">NES / 404</p><h1 id="service-page-title">{de ? "Diese Seite fehlt." : "This page is missing."}</h1><p className="service-lead">{de ? "Alle Servicethemen finden Sie in unserer Übersicht." : "Find all service topics in our overview."}</p><ServiceLink className="service-text-link" href="/service" onNavigate={onNavigate}>{de ? "Zum Service" : "Visit service"}<span aria-hidden="true">→</span></ServiceLink></article>}
      </div>}
    </div>
  </main>;
}
