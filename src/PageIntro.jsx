import { useEffect, useState } from "react";
import "./page-intro.css";

function shouldShowIntro() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    && document.visibilityState === "visible"
    && window.performance.getEntriesByType("navigation")[0]?.type !== "back_forward";
}

// Mounted once beside App, so internal navigation never replays the intro.
export function PageIntro() {
  const [visible, setVisible] = useState(shouldShowIntro);

  useEffect(() => {
    if (!visible) return undefined;
    const dismiss = () => setVisible(false);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => { if (motion.matches) dismiss(); };
    const onVisibilityChange = () => { if (document.hidden) dismiss(); };
    const interactions = ["pointerdown", "keydown", "wheel", "touchstart", "focusin"];

    // This is a decorative introduction, never a loading gate. The page below
    // stays interactive; intent to interact removes the decoration immediately.
    interactions.forEach((event) => window.addEventListener(event, dismiss, { capture: true, passive: true }));
    window.addEventListener("pagehide", dismiss);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motion.addEventListener("change", onMotionChange);
    const timeout = window.setTimeout(dismiss, 800);

    return () => {
      window.clearTimeout(timeout);
      interactions.forEach((event) => window.removeEventListener(event, dismiss, true));
      window.removeEventListener("pagehide", dismiss);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [visible]);

  if (!visible) return null;

  return <div className="page-intro" aria-hidden="true" onAnimationEnd={(event) => {
    if (event.target === event.currentTarget) setVisible(false);
  }}>
    <span className="page-intro-wordmark">NES</span>
  </div>;
}
