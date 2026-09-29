import { useCallback, useLayoutEffect, useRef, useState } from "react";

function captureScroll() {
  return {
    x: window.scrollX,
    y: window.scrollY,
    containers: Object.fromEntries([...document.querySelectorAll("[data-scroll-key]")]
      .map((element) => [element.dataset.scrollKey, element.scrollLeft])),
  };
}

function saveScroll() {
  const scroll = captureScroll();
  window.history.replaceState({ ...window.history.state, nesScroll: scroll }, "");
  return scroll;
}

function readNavigation() {
  return { url: window.location.href, scroll: window.history.state?.nesScroll };
}

export function usePageNavigation() {
  const [navigation, setNavigation] = useState(readNavigation);
  const restoring = useRef(false);

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let frame;
    const onScroll = () => {
      if (restoring.current) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!restoring.current) saveScroll();
      });
    };
    const onPopState = () => {
      window.cancelAnimationFrame(frame);
      restoring.current = true;
      setNavigation(readNavigation());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pagehide", saveScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previous;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pagehide", saveScroll);
    };
  }, []);

  // Restore after React has mounted the destination, before the browser paints it.
  useLayoutEffect(() => {
    restoring.current = true;
    let frame;
    let stopped = false;
    const restore = () => {
      if (stopped) return;
      const anchor = new URL(navigation.url).hash.slice(1);
      if (!navigation.scroll && anchor) {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "instant" });
      } else {
        window.scrollTo({ left: navigation.scroll?.x ?? 0, top: navigation.scroll?.y ?? 0, behavior: "instant" });
      }
      document.querySelectorAll("[data-scroll-key]").forEach((element) => {
        element.scrollLeft = navigation.scroll?.containers?.[element.dataset.scrollKey] ?? 0;
      });
    };
    const stop = () => {
      stopped = true;
      restoring.current = false;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      saveScroll();
    };
    // Lazy images and fonts may increase the page height after the first render.
    const observer = new ResizeObserver(() => {
      if (!stopped) {
        restoring.current = true;
        restore();
        frame = window.requestAnimationFrame(() => { restoring.current = false; });
      }
    });
    observer.observe(document.body);
    restore();
    frame = window.requestAnimationFrame(() => {
      restore();
      restoring.current = false;
    });
    const timeout = window.setTimeout(stop, 1500);
    const events = ["wheel", "touchstart", "pointerdown", "keydown"];
    events.forEach((event) => window.addEventListener(event, stop, { passive: true, once: true }));
    return () => {
      stopped = true;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, stop));
    };
  }, [navigation]);

  const navigate = useCallback((url, { replace = false, preserveScroll = false } = {}) => {
    const scroll = saveScroll();
    restoring.current = true;
    const state = { nesScroll: preserveScroll ? scroll : undefined };
    window.history[replace ? "replaceState" : "pushState"](state, "", url);
    setNavigation(readNavigation());
  }, []);

  return [navigation.url, navigate];
}
