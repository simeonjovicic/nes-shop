import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PRODUCTS } from "./products.js";
import { getBagTotal, getLinePrice } from "./shopState.js";
import { useDialogFocus } from "./useDialogFocus.js";
import "./checkout-preview.css";

const SAMPLE_BAG = [{ productId: 12, size: "M", qty: 1 }, { productId: 6, size: "42", qty: 1 }];
const COPY = {
  de: {
    back: "Zurück zum Warenkorb", close: "Checkout schließen", selection: "Ihre Auswahl", sample: "Beispielauswahl",
    pieces: "Stücke", piece: "Stück", size: "Größe", quantity: "Anzahl", edit: "Bearbeiten", summary: "Auswahl anzeigen oder ausblenden",
    title: "Fast bei Ihnen.", intro: "Ein guter Fund. Ein letzter Schritt.", payment: "Zahlungsart", wallet: "Wallet", card: "Karte",
    demoCard: "Demo-Karte", cardholder: "Für die guten Dinge.", cardCaption: "Ein kleiner Moment. Ein gutes Gefühl.",
    delivery: "Lieferung", address: "Demo-Adresse · Berlin", addressDetail: "Alex Beispiel · Musterstraße 12 · 10115 Berlin",
    addressToggle: "Demo-Lieferadresse anzeigen", shipping: "Versand", shippingValue: "Wird persönlich bestätigt",
    subtotal: "Warenwert", onRequest: "Auf Anfrage",
    confirm: "Demo bestätigen", demo: "Visuelle Demo · Keine Bestellung oder Zahlung.",
    processing: "Ein kleiner Moment…", processingBody: "Wir spielen den Abschluss für Sie durch.",
    complete: "Ein gutes Gefühl.", completeBody: "So einfach könnte Ihr nächster Lieblingsfund bei Ihnen ankommen.",
    receipt: "Demo abgeschlossen", completeNote: "Es wurde nichts bestellt oder bezahlt. Ihre Auswahl bleibt im Warenkorb.",
    sampleCompleteNote: "Es wurde nichts bestellt oder bezahlt. Dies war eine Beispielauswahl.",
    continue: "Weiter entdecken", replay: "Noch einmal ansehen",
  },
  en: {
    back: "Back to bag", close: "Close checkout", selection: "Your selection", sample: "Sample selection",
    pieces: "pieces", piece: "piece", size: "Size", quantity: "Quantity", edit: "Edit", summary: "Show or hide your selection",
    title: "Almost yours.", intro: "A lovely find. One last step.", payment: "Payment method", wallet: "Wallet", card: "Card",
    demoCard: "Demo card", cardholder: "For the good things.", cardCaption: "A little moment. A lovely feeling.",
    delivery: "Delivery", address: "Demo address · Berlin", addressDetail: "Alex Example · Musterstraße 12 · 10115 Berlin",
    addressToggle: "Show demo delivery address", shipping: "Shipping", shippingValue: "Personally confirmed",
    subtotal: "Items subtotal", onRequest: "On enquiry",
    confirm: "Confirm demo", demo: "Visual demo · No order or payment.",
    processing: "Just a moment…", processingBody: "Playing through the final step for you.",
    complete: "That lovely feeling.", completeBody: "This is how simple finding your next favourite could feel.",
    receipt: "Demo complete", completeNote: "Nothing was ordered or paid for. Your selection stays in your bag.",
    sampleCompleteNote: "Nothing was ordered or paid for. This was a sample selection.",
    continue: "Keep exploring", replay: "See it again",
  },
};

function Icon({ kind, ...props }) {
  const paths = {
    back: "m14 6-6 6 6 6M8 12h12",
    close: "m6 6 12 12M18 6 6 18",
    arrow: "M4 12h15m-6-6 6 6-6 6",
    chevron: "m8 10 4 4 4-4",
    wallet: "M4 7V5a2 2 0 0 1 2-2h12v4M4 7h15a1 1 0 0 1 1 1v12H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm11 5h5v4h-5z",
    card: "M3 5h18v14H3zM3 10h18M7 15h4",
    parcel: "m12 3 9 5v9l-9 5-9-5V8l9-5Zm-9 5 9 5 9-5M12 13v9M7.5 5.5l9 5V15",
    check: "m5 12 4 4 10-10",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[kind]} /></svg>;
}

export function CheckoutPreview({ bag, language, onClose, onBack }) {
  const text = COPY[language];
  const dialogRef = useDialogFocus();
  const titleRef = useRef(null);
  const stageRef = useRef(null);
  const reviewRef = useRef(null);
  const buttonSlotRef = useRef(null);
  const orbSlotRef = useRef(null);
  const gestureRef = useRef(null);
  const closeTimerRef = useRef(null);
  const exitingRef = useRef(false);
  const [method, setMethod] = useState("wallet");
  const [status, setStatus] = useState("review");
  const [sheetPhase, setSheetPhase] = useState("rest");
  const leaving = sheetPhase === "leaving";
  const [summaryOpen, setSummaryOpen] = useState(() => window.matchMedia("(min-width: 701px)").matches);
  const selection = bag.length ? bag : SAMPLE_BAG;
  const count = selection.reduce((sum, item) => sum + item.qty, 0);
  const total = getBagTotal(selection, PRODUCTS);
  const money = (value) => Number.isFinite(value)
    ? new Intl.NumberFormat(language === "de" ? "de-DE" : "en-GB", { style: "currency", currency: "EUR" }).format(value)
    : text.onRequest;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    dialog.showModal();
    dialog.focus({ preventScroll: true });
    return () => {
      dialog.close();
      const target = previous !== document.body && previous?.isConnected && previous.getClientRects().length
        ? previous
        : [...document.querySelectorAll(".bag-button, .mobile-bag-button")].find((element) => element.getClientRects().length);
      target?.focus({ preventScroll: true });
    };
  }, [dialogRef]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    // Both views remain in the grid so their shared frame never changes size.
    // Only the persistent button moves between its two reserved positions.
    const measure = () => {
      stage.style.setProperty("--confirm-top", `${buttonSlotRef.current.offsetTop}px`);
      stage.style.setProperty("--orb-top", `${orbSlotRef.current.offsetTop + 11}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    [stage, reviewRef.current, buttonSlotRef.current, orbSlotRef.current].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status !== "processing" || leaving) return undefined;
    // A local animation only: no payment SDK, API call or cart mutation.
    const timeout = window.setTimeout(() => setStatus("complete"), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 1450);
    return () => window.clearTimeout(timeout);
  }, [status, leaving]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    if (status === "complete") titleRef.current?.focus({ preventScroll: true });
  }, [status]);

  function exitCheckout(action = onClose) {
    if (exitingRef.current) return;
    exitingRef.current = true;
    gestureRef.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      action();
      return;
    }
    const dialog = dialogRef.current;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    dialog.style.setProperty("--sheet-y", mobile ? `${dialog.offsetHeight + 24}px` : "16px");
    dialog.style.setProperty("--sheet-backdrop-opacity", "0");
    // Drop modality right away: a modal dialog keeps the page inert for the whole exit transition.
    dialog.close();
    dialog.show();
    setSheetPhase("leaving");
    closeTimerRef.current = window.setTimeout(action, 320);
  }

  function returnSheet() {
    if (exitingRef.current) return;
    gestureRef.current = null;
    dialogRef.current.style.setProperty("--sheet-y", "0px");
    dialogRef.current.style.setProperty("--sheet-backdrop-opacity", "1");
    setSheetPhase("returning");
  }

  function startSwipe(event) {
    if (!event.isPrimary || event.button !== 0 || exitingRef.current || !window.matchMedia("(max-width: 700px)").matches || event.target.closest("button")) return;
    gestureRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, lastY: event.clientY, time: event.timeStamp, distance: 0, velocity: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSheetPhase("dragging");
  }

  function moveSwipe(event) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = event.clientY - gesture.y;
    if (Math.abs(event.clientX - gesture.x) > Math.max(14, Math.abs(distance))) {
      returnSheet();
      return;
    }
    gesture.velocity = (event.clientY - gesture.lastY) / Math.max(1, event.timeStamp - gesture.time);
    gesture.lastY = event.clientY;
    gesture.time = event.timeStamp;
    gesture.distance = Math.max(0, distance);
    dialogRef.current.style.setProperty("--sheet-y", `${gesture.distance}px`);
    dialogRef.current.style.setProperty("--sheet-backdrop-opacity", `${Math.max(.15, 1 - gesture.distance / 450)}`);
  }

  function endSwipe(event) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const velocity = event.timeStamp - gesture.time < 100 ? gesture.velocity : 0;
    const threshold = Math.min(130, dialogRef.current.offsetHeight * .18);
    if (gesture.distance > threshold || (gesture.distance > 36 && velocity > .65)) exitCheckout();
    else returnSheet();
  }

  function moveCard(event) {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -6}deg`);
    card.style.setProperty("--card-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 8}deg`);
  }

  function confirmDemo() {
    const dialog = dialogRef.current;
    if (dialog.scrollTop > 0) {
      // Keep the confirmation in view after a long selection or on a short screen.
      const top = stageRef.current.getBoundingClientRect().top - dialog.getBoundingClientRect().top + dialog.scrollTop;
      const headerHeight = dialog.querySelector(".checkout-header").offsetHeight;
      dialog.scrollTo({ top: Math.max(0, top - headerHeight - 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    setStatus("processing");
  }

  return <dialog
    className={`checkout-dialog is-${sheetPhase}`} ref={dialogRef} tabIndex={-1}
    aria-labelledby={status === "review" ? "checkout-title" : "checkout-complete-title"} aria-describedby="checkout-demo"
    onCancel={(event) => { event.preventDefault(); exitCheckout(); }}
    onKeyDown={(event) => { if (event.key === "Escape") event.stopPropagation(); }}
    onClick={(event) => { if (event.target === event.currentTarget) exitCheckout(); }}
  >
    <div className="checkout-shell">
      <header className="checkout-header" onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={endSwipe} onPointerCancel={returnSheet} onLostPointerCapture={() => { if (gestureRef.current) returnSheet(); }}>
        <span className="checkout-grab" aria-hidden="true" />
        <button className="checkout-icon-button" type="button" onClick={() => exitCheckout(onBack)} aria-label={text.back}><Icon kind="back" /></button>
        <div className="checkout-wordmark">NES<span>Checkout</span></div>
        <button className="checkout-icon-button" type="button" onClick={() => exitCheckout()} aria-label={text.close}><Icon kind="close" /></button>
      </header>
      <div className="checkout-layout">
        <section className="checkout-selection" aria-labelledby="checkout-selection-title">
          <div className="checkout-selection-heading">
            <div><p className="checkout-eyebrow">{bag.length ? text.selection : text.sample}</p><h2 id="checkout-selection-title">{count} {count === 1 ? text.piece : text.pieces}<span>.</span></h2></div>
            <button className={`checkout-summary-toggle${summaryOpen ? " is-open" : ""}`} type="button" disabled={status !== "review"} aria-expanded={summaryOpen} aria-controls="checkout-items" aria-label={text.summary} onClick={() => setSummaryOpen(!summaryOpen)}><Icon kind="chevron" /></button>
          </div>
          <div className="checkout-items" id="checkout-items" hidden={!summaryOpen}>
            {selection.map((item) => {
              const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
              if (!product) return null;
              return <article className="checkout-item" key={`${item.productId}-${item.size}`}>
                <div className="checkout-item-photo"><img src={product.image} alt={product.name} /></div>
                <div className="checkout-item-copy"><span>{product.brand}</span><h3>{product.name}</h3><p>{text.size} {item.size} <span>·</span> {text.quantity} {item.qty}</p><strong>{money(getLinePrice(product, item.qty))}</strong></div>
              </article>;
            })}
            <button className="checkout-edit" type="button" onClick={() => exitCheckout(onBack)}>{text.edit}<Icon kind="arrow" /></button>
          </div>
          <div className="checkout-selection-footer"><span className="checkout-tiny-mark" aria-hidden="true">n.</span><p>{text.cardCaption}</p></div>
        </section>

        <section className={`checkout-payment is-${status}`} aria-busy={status === "processing"}>
          <div className="checkout-stage" ref={stageRef}>
            <div className="checkout-review" ref={reviewRef} aria-hidden={status !== "review"} inert={status !== "review"}>
              <p className="checkout-eyebrow">NES / Express Checkout</p>
              <h1 id="checkout-title">{text.title}</h1>
              <p className="checkout-intro">{text.intro}</p>
              <fieldset className="checkout-methods"><legend className="sr-only">{text.payment} · Demo</legend>
                {["wallet", "card"].map((value) => <label key={value}>
                  <input type="radio" name="checkout-method" value={value} checked={method === value} onChange={() => setMethod(value)} />
                  <span><Icon kind={value} />{text[value]}<span className="checkout-method-dot" /></span>
                </label>)}
              </fieldset>
              <div className="checkout-card-stage">
                <div className={`checkout-wallet is-${method}`} onPointerMove={moveCard} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--card-x", "0deg"); event.currentTarget.style.setProperty("--card-y", "0deg"); }}>
                  <div className="checkout-card-top"><span className="checkout-card-brand">NES<span>{method === "wallet" ? "Wallet" : text.card}</span></span><span className="checkout-card-demo">Demo</span></div>
                  <div className="checkout-card-bottom"><div><span>{text.demoCard}</span><strong>•••• &nbsp;4242</strong></div><span className="checkout-card-monogram" aria-hidden="true">n.</span></div>
                  <p>{text.cardholder}</p>
                </div>
              </div>
              <details className="checkout-delivery">
                <summary aria-label={text.addressToggle}><span className="checkout-delivery-icon"><Icon kind="parcel" /></span><span><small>{text.delivery}</small><strong>{text.address}</strong></span><Icon kind="chevron" /></summary>
                <p>{text.addressDetail}</p>
              </details>
              <div className="checkout-amount"><div><span>{text.subtotal}</span><strong>{money(total)}</strong></div><p><span>{text.shipping}</span><span>{text.shippingValue}</span></p></div>
              <div className="checkout-confirm-slot" ref={buttonSlotRef} />
            </div>
            <div className="checkout-completion" aria-hidden={status !== "complete"} inert={status !== "complete"}>
              <div className="checkout-orb-slot" ref={orbSlotRef} aria-hidden="true" />
              <p className="checkout-eyebrow">NES / {text.receipt}</p>
              <h1 id="checkout-complete-title" ref={titleRef} tabIndex={-1}>{text.complete}</h1>
              <p className="checkout-completion-body">{text.completeBody}</p>
              <div className="checkout-success-details">
                <div className="checkout-receipt"><span><Icon kind="check" />{count} {count === 1 ? text.piece : text.pieces}</span><strong>{money(total)}</strong></div>
                <p>{bag.length ? text.completeNote : text.sampleCompleteNote}</p>
                <button className="checkout-confirm" type="button" onClick={() => exitCheckout()}><span>{text.continue}</span><Icon kind="arrow" /></button>
                <button className="checkout-replay" type="button" onClick={() => { setStatus("review"); dialogRef.current?.focus({ preventScroll: true }); }}>{text.replay}</button>
              </div>
            </div>
            <p className="checkout-processing-hint" aria-hidden="true">{text.processing}</p>
            <button className="checkout-morph-button" type="button" disabled={status !== "review"} aria-hidden={status !== "review"} aria-label={text.confirm} onClick={confirmDemo}>
              <span className="checkout-morph-label"><span className="checkout-confirm-symbol"><Icon kind="check" /></span><span>{text.confirm}</span><Icon kind="arrow" /></span>
              <svg className="checkout-morph-indicator" viewBox="0 0 104 104" aria-hidden="true"><circle className="checkout-orb-track" cx="52" cy="52" r="43" /><circle className="checkout-orb-progress" cx="52" cy="52" r="43" /><path className="checkout-orb-check" d="m34 52 12 12 25-26" /></svg>
            </button>
          </div>
          <p className="checkout-demo" id="checkout-demo"><span aria-hidden="true" />{text.demo}</p>
        </section>
      </div>
      <span className="sr-only" role="status">{status === "processing" ? text.processing : status === "complete" ? text.receipt : ""}</span>
    </div>
  </dialog>;
}
