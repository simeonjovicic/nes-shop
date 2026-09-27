import { useEffect, useRef } from "react";

export function useDialogFocus(active = true) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !active) return undefined;
    const previous = document.activeElement;
    const focusable = () => [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')]
      .filter((element) => element.getClientRects().length && !element.closest('[aria-hidden="true"]'));
    dialog.focus({ preventScroll: true });
    const trap = (event) => {
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (!dialog.contains(document.activeElement) || document.activeElement === dialog) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [active]);
  return ref;
}
