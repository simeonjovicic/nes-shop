import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDialogFocus } from "./useDialogFocus.js";
import "./society-invitation.css";

const COPY = {
  de: {
    title: "Ein guter Kreis.", accent: "Ihr Platz darin.",
    body: "Neue Stücke und Geschichten aus dem Haus NES. Persönlich für Sie ausgewählt.",
    email: "Ihre E-Mail-Adresse", placeholder: "name@beispiel.de", cta: "Dem Kreis beitreten", later: "Vielleicht später", close: "Einladung schließen",
    invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    demo: "Vorschau · Keine Anmeldung oder Datenspeicherung.",
    successTitle: "Schön, dass", successAccent: "Sie da sind.",
    successBody: "So würde Ihre Begrüßung in der NES Society aussehen. Diese Vorschau löst keine Anmeldung aus.",
    continue: "Weiter entdecken",
  },
  en: {
    title: "Good company.", accent: "Your place in it.",
    body: "New pieces and stories from the house of NES. Personally selected for you.",
    email: "Your email address", placeholder: "name@example.com", cta: "Join the circle", later: "Perhaps later", close: "Close invitation",
    invalid: "Please enter a valid email address.",
    demo: "Preview · No subscription or stored details.",
    successTitle: "Lovely to", successAccent: "have you here.",
    successBody: "A glimpse of your welcome to the NES Society. This preview does not create a subscription.",
    continue: "Continue exploring",
  },
};

export function SocietyInvitation({ language, onClose }) {
  const text = COPY[language];
  const dialogRef = useDialogFocus();
  const emailRef = useRef(null);
  const successRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [joined, setJoined] = useState(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    dialog.showModal();
    dialog.focus({ preventScroll: true });
    return () => {
      dialog.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [dialogRef]);

  useEffect(() => {
    if (joined) successRef.current?.focus({ preventScroll: true });
  }, [joined]);

  function submit(event) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError(true);
      emailRef.current?.focus();
      return;
    }
    // This prototype deliberately has no request, storage or subscription side effect.
    setEmail("");
    setJoined(true);
  }

  return <dialog className="society-dialog" ref={dialogRef} tabIndex={-1} aria-labelledby="society-title" aria-describedby="society-description society-demo" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="society-card">
      <button className="society-close" type="button" onClick={onClose} aria-label={text.close}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
      <div className="society-portrait" aria-hidden="true">
        <img src="/shop/editorial/nes-society-salon-v1.webp" alt="" width="1024" height="1536" decoding="async" />
      </div>
      <div className="society-content">
        <p className="society-eyebrow">NES Society</p>
        <h2 id="society-title" ref={successRef} tabIndex={joined ? -1 : undefined}>{joined ? text.successTitle : text.title}<em>{joined ? text.successAccent : text.accent}</em></h2>
        <p className="society-intro" id="society-description">{joined ? text.successBody : text.body}</p>
        {joined ? <div className="society-welcome">
          <button className="society-submit" type="button" onClick={onClose}>{text.continue}</button>
        </div> : <>
          <form className="society-form" onSubmit={submit} noValidate>
            <label htmlFor="society-email">{text.email}</label>
            <input ref={emailRef} id="society-email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={email} onChange={(event) => { setEmail(event.target.value); setError(false); }} placeholder={text.placeholder} aria-invalid={error || undefined} aria-describedby={error ? "society-error society-demo" : "society-demo"} required />
            <p className="society-error" id="society-error" role="alert">{error ? text.invalid : ""}</p>
            <button className="society-submit" type="submit">{text.cta}</button>
          </form>
          <button className="society-later" type="button" onClick={onClose}>{text.later}</button>
        </>}
        <p className="society-demo" id="society-demo">{text.demo}</p>
      </div>
    </div>
  </dialog>;
}
