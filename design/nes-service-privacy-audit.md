# NES Service und Datenschutz – Stand 1. Oktober 2026

## Umsetzung

Unter `/service` steht die gemeinsame Übersicht. Die Seiten sind direkt aufrufbar und zweisprachig; interne Navigation nutzt dieselbe Scrollwiederherstellung wie der Shop. Der Footer verlinkt alle Seiten. Produktseiten verlinken Größenberatung, Pflege und Rückgabe sowie Versandbedingungen. Persönliche Beratung bleibt zusätzlich erreichbar. Datenschutz lässt sich aus Formularen öffnen, ohne ihre Eingaben zu verlieren.

| Seite | URL |
| --- | --- |
| Kontakt | `/service/kontakt` |
| Versand und Zahlung | `/service/versand-zahlung` |
| Rückgabe | `/service/rueckgabe` |
| Größenberatung | `/service/groessenberatung` |
| Material und Pflege | `/service/pflege` |
| Impressum | `/rechtliches/impressum` |
| Datenschutz | `/rechtliches/datenschutz` |
| AGB | `/rechtliches/agb` |
| Widerrufsrecht | `/rechtliches/widerruf` |

Unternehmensdaten und verbindliche Konditionen fehlen. Der Nutzer hat Platzhalter ausdrücklich autorisiert. Rechtstexte sind sichtbar als Entwürfe gekennzeichnet. AGB und Widerrufsseite sind eine Struktur, keine fertig geprüften Vertragsbedingungen. Keine Versandpreise, Lieferzusagen, Retourenadressen oder Herstellermaße wurden erfunden. Die bisher pauschal beworbenen „14 Tage Rückgabe“ wurden durch Links und neutrale Serviceangaben ersetzt. Der Footer behauptet keinen unbestätigten Firmensitz in Deutschland.

Die verfügbaren Modellgrößen stammen aus dem Produktbestand. Vollständige Faseranteile, belastbare Maßtabellen und produktspezifische Pflegeangaben benötigen Herstellerunterlagen. Die Pflegehinweise verweisen vorrangig auf das jeweilige Etikett. Allgemeine Wollpflege ist mit [Woolmark](https://www.woolmark.com/care/care-for-wool/) belegt.

## Geprüfter Umfang

Geprüft wurden der Frontend-Code, `index.html`, `src/shopState.js`, Navigation und Dialoge, die Cloudflare Functions unter `functions/api/`, `server/newsletter.js` und die dokumentierte Einrichtung in `CLOUDFLARE_NEWSLETTER_SETUP.md`. Keine geheimen Konfigurationswerte wurden benötigt. Die lokale Browserprüfung erfasst die tatsächlich angefragten Ressourcen. Cloudflare-Dashboard, produktive Bindings, externe API-Overrides und produktive Browserantworten sind damit nicht geprüft.

## Browserdaten nach der Änderung

| Mechanismus | Inhalt und Zweck | Dauer / Entfernung |
| --- | --- | --- |
| `localStorage: nes-bag` | Gewählte Produkt-ID, Größe, Menge für den Warenkorb | Ohne feste Ablaufzeit; bei leerem Warenkorb entfernt, sonst über Browserdaten löschbar |
| `localStorage: nes-wishlist` | Explizit gemerkte Produkt-IDs | Ohne feste Ablaufzeit; bei leerer Merkliste entfernt, sonst über Browserdaten löschbar |
| `localStorage: nes-language` | Explizit gewählte Sprache | Ohne feste Ablaufzeit; Browserdaten löschen |
| `history.state: nesScroll` | Scrollpositionen für Zurück/Vorwärts | Lebensdauer des jeweiligen Verlaufs-Eintrags, browserabhängig |
| `history.state: nesKnitOpen` | Geöffnete Abschnitte der Stricksektion | Lebensdauer des jeweiligen Verlaufs-Eintrags, browserabhängig |
| Arbeitsspeicher des Society-Popups | Anzeigestatus, temporäre E-Mail-Eingabe | E-Mail bei Abschluss/Schließen entfernt; Anzeigestatus nur bis zum vollständigen Neuladen |
| Arbeitsspeicher der Formulare und Checkout-Demo | Aktuelle Eingaben bzw. Vorschauzustand | Beim Schließen oder Neuladen verworfen; echte Anfrageformulare senden erst beim Absenden |

Ein frischer Aufruf legt keine leeren Warenkorb-/Merklisten und keine Standardsprache an. Das Society-Popup nutzt `sessionStorage` nicht mehr. Ein alter `nes-society-preview-seen`-Eintrag aus früheren Versionen wird nicht mehr gelesen oder geschrieben und läuft mit der alten Tab-Sitzung aus. Die Dialoganzeige bleibt während interner Navigation im Arbeitsspeicher gemerkt.

Es gibt im Anwendungscode keine Analyse-Pixel, Marketing-Skripte oder Cookie-Schreibzugriffe. Die verbleibenden lokalen Speicherungen dienen den jeweils vom Nutzer gewünschten Funktionen. Ihre konkrete rechtliche Einordnung und die Informationen dazu müssen mit dem finalen Betreiber geprüft werden. Es wurde kein pauschales Consent-Banner ergänzt. Werden später einwilligungspflichtige Dienste eingebunden, benötigen sie eine entsprechende Einwilligung vor Aktivierung. Die [WKO erläutert Website-Datenverarbeitung und Endgerätespeicherung](https://www.wko.at/internetrecht/datenverarbeitung-webshop-website).

## Externe Dienste und Serverdaten

- **Schriften:** Archivo und Cormorant Garamond werden jetzt lokal aus `public/fonts/` ausgeliefert. Die Google-Fonts-CSS-URL und beide Preconnects wurden entfernt. SIL-OFL-Lizenzen liegen neben den Dateien. Bilder und Animationen stammen ebenfalls aus lokalen Dateien; Woolmark wird lediglich verlinkt.
- **Cloudflare Pages:** vorgesehenes Hosting samt Functions. Tatsächliche Zugriffsprotokolle, Sicherheitsfunktionen, zusätzliche Analysen und deren Speicherfristen hängen vom Live-Setup ab. DNS ist laut Setup-Dokument ebenfalls bei Cloudflare.
- **Cloudflare D1:** Speicherung der Anfragen und Newsletter-Datensätze. Anfragen enthalten Name, E-Mail, optionale Unternehmens-/Telefonangaben, Rolle, Thema, Marke, Nachricht bzw. Produktauswahl, Newsletter-Wunsch, Sprache, Quelle, Einwilligungszeitpunkt, Anfrage-ID und Benachrichtigungsstatus/-zeit.
- **Resend:** ausgehende E-Mails über den serverseitigen Endpunkt `https://api.resend.com/emails`. Dazu zählen Double-Opt-in, Begrüßung und interne Benachrichtigungen. Der Browser lädt kein Resend-Skript.
- **Hostinger:** laut bestehender Setup-Dokumentation das echte Postfach für `office@nes-shop.at`, einschließlich eingehender Antworten. Anbieter-Vertragspartner, Aufbewahrung und Übermittlungen müssen im endgültigen Datenschutztext konkretisiert werden.
- **Newsletter:** eigener echter Formularweg, getrennt vom Society-Prototyp. Gespeichert werden E-Mail, Sprache, Quelle, Status, Zeitpunkte, gehashte Bestätigungs- und Abmeldetokens. Der Bestätigungslink gilt 24 Stunden; das ist keine automatische Löschfrist für den Datensatz. Die Abmeldung setzt den Status, sie löscht den Datensatz nicht. In der Anwendung ist kein automatischer Löschlauf implementiert.
- **Checkout und Society:** reine Vorschauen; kein Bestell-, Zahlungs- oder Anmelde-Request. Der reale Auswahl-Anfrageweg bleibt verfügbar und als unverbindlich bezeichnet.
- **API-Overrides:** `VITE_NEWSLETTER_ENDPOINT` und `VITE_INQUIRY_ENDPOINT` können vom Standard abweichen. Produktive Ziele müssen vor Veröffentlichung bestätigt werden.

## Noch verbindlich zu ergänzen

1. Rechtsträger, Rechtsform, Vertretung, Anschrift/Land, Kontakt, Register/UID und gegebenenfalls Aufsichtsdaten.
2. Lieferländer, Versandkosten, Lieferzeiten, Zahlungsarten, Steuerangaben, Retourenadresse/-kosten und Vertragsabschlussverfahren.
3. Vollständige passende Widerrufsbelehrung samt Musterformular. Die echte Online-Widerrufsfunktion ist beim tatsächlichen Online-Bestellprozess mitzuplanen; ein Kontaktformular ist kein Ersatz. Aktuelle Einordnung: [WKO zum Widerrufsbutton](https://www.wko.at/internetrecht/e-commerce-widerrufsbutton-webshop). Firmensitz und Zielmärkte sind noch offen.
4. Rechtsgrundlagen, tatsächliche Anbieter-Vertragspartner, Auftragsverarbeitungsvereinbarungen, mögliche Drittlandübermittlungen, Betroffenenkontakt, Aufsichtsbehörde sowie Aufbewahrungs- und Löschkonzept.
5. Live-Hosting auf zusätzliche eingebundene Dienste, Cookies und Protokollierung prüfen. Die vorhandenen E-Mail-Vorlagen nennen noch die Messe Offenbach; diesen Kampagneninhalt vor allgemeinem Shopbetrieb redaktionell überprüfen.

AGB und andere Verbraucherinformationen sind getrennt zu bewerten; siehe [WKO zu AGB](https://www.wko.at/noe/e-commerce/faq-20-agb). Diese Umsetzung ist keine abschließende rechtliche Freigabe.

## Lesbarkeit

Funktionale Kleinschrift in Footer, Filtern, Produktangaben, Formularen und Vorschau-Dialogen wurde angehoben. Dunklere Grautöne auf hellem Papier und hellere Datenschutzhinweise im dunklen Newsletterbereich stärken den Kontrast. Mobile Formularfelder nutzen 16 px, damit Eingaben auf iOS keinen automatischen Zoom auslösen. Dekorative Typografie und die bestehenden Produktanimationen bleiben erhalten.

## Validierung

`npm run lint`, `npm run build` und alle 19 bestehenden Tests bestanden. Am gebauten Shop wurden alle neun direkten URLs, Sprachwechsel und Metadaten, Entwurfskennzeichnungen, Ansichten von 320 bis 1440 px, mobile Navigation, Rückkehr zur vorherigen Scrollposition und Erhalt von Formularwerten beim Datenschutz-Dialog geprüft. Ein frischer Besuch legt keine lokalen Einträge an; der Warenkorb wird nach Nutzung gespeichert und beim Leeren entfernt. Der Checkout behält beim Abschluss seine Fensterhöhe. Die geprüften Seiten erzeugten keine Laufzeitfehler, externen Ressourcenanfragen oder unbeabsichtigten Formularübermittlungen. Footer, Serviceübersicht, Datenschutz, Produktansicht und Checkout wurden zusätzlich visuell kontrolliert. Es wurden keine echten Anfragen oder Newsletteranmeldungen versendet.
