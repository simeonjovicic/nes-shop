import { useEffect, useRef, useState } from "react";
import { drawShoe, SHOE_LAYERS, SHOE_SCENE } from "./shoeSequence";

const DIRECTORY = "/shop/sequence/wai-home-v3";
const STATIC_MEDIA = "(prefers-reduced-motion: reduce), (max-height: 600px)";
const TEXT = {
  de: {
    label: "WAI / Textile Feel Shoes", title: "Wenig Schuh. Viel Gefühl.",
    alt: "Animierte Ansicht eines blauen Feel Shoes, der sich beim Scrollen in seine Ebenen aufteilt",
    hint: "Scrollen und entdecken", cta: "WAI Modelle entdecken",
    steps: [
      ["Dünner Stoff", "Weiches Denim legt sich als leichte Hülle um den Fuß."],
      ["Flache Sohle", "Eine feine, flexible Sohle hält die Form besonders schlank."],
      ["Verschiedene Stoffe", "Denim, Baumwolle und Wolltextil stehen in der Kollektion zur Auswahl."],
      ["Ihr WAI", "Mocassin, Slip-on oder High: Entdecken Sie die Formen und Stoffe."],
    ],
  },
  en: {
    label: "WAI / Textile feel shoes", title: "Less shoe. More feeling.",
    alt: "Animated view of a blue feel shoe, separating into layers as you scroll",
    hint: "Scroll to explore", cta: "Explore WAI styles",
    steps: [
      ["Thin fabric", "Soft denim forms a light covering around the foot."],
      ["Flat sole", "A thin, flexible sole keeps the silhouette close to the ground."],
      ["A choice of fabrics", "Explore denim, cotton and wool textile across the collection."],
      ["Your WAI", "Moccasin, slip-on or high: explore the shapes and fabrics."],
    ],
  },
};

export function ProductSequence({ language, onShop }) {
  const text = TEXT[language];
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return undefined;
    const media = window.matchMedia(STATIC_MEDIA);
    const images = [];
    let disposed = false;
    let loading = false;
    let ready = false;
    let raf;
    let lastProgress = -1;

    const update = () => {
      raf = undefined;
      if (disposed || media.matches) return;
      const offset = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const travel = track.offsetHeight - stage.offsetHeight;
      const progress = Math.min(1, Math.max(0, (offset - track.getBoundingClientRect().top) / Math.max(1, travel)));
      setStep(Math.min(3, Math.floor(progress * 4)));
      track.style.setProperty("--sequence-progress", progress);
      if (!ready) return;
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      const resized = canvas.width !== width || canvas.height !== height;
      if (!resized && progress === lastProgress) return;
      if (resized) { canvas.width = width; canvas.height = height; }
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      drawShoe(context, images, width, height, progress);
      canvas.dataset.progress = progress.toFixed(4);
      canvas.classList.add("is-ready");
      lastProgress = progress;
    };
    const scheduleUpdate = () => {
      if (!raf && !media.matches) raf = window.requestAnimationFrame(update);
    };
    const preload = async () => {
      if (loading || disposed || media.matches) return;
      loading = true;
      try {
        await Promise.all(SHOE_LAYERS.map(async (layer, index) => {
          const image = new Image();
          images[index] = image;
          image.decoding = "async";
          image.fetchPriority = "low";
          image.src = `${DIRECTORY}/${layer.name}.webp`;
          await image.decode();
        }));
        if (disposed) return;
        ready = true;
        scheduleUpdate();
      } catch {
        // The complete transparent poster remains visible if an asset cannot load.
        loading = false;
      }
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) preload();
    }, { rootMargin: "200px 0px" });
    observer.observe(track);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(track);
    resizeObserver.observe(stage);
    resizeObserver.observe(canvas);
    const onPreferenceChange = () => {
      window.cancelAnimationFrame(raf);
      raf = undefined;
      if (!media.matches) {
        if (track.getBoundingClientRect().top < window.innerHeight + 200) preload();
        lastProgress = -1;
        update();
      }
    };
    media.addEventListener("change", onPreferenceChange);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    update();

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      media.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <section className="product-construction" id="spotlight" aria-labelledby="construction-title" ref={trackRef}>
      <div className="product-construction-stage" ref={stageRef}>
        <div className="product-construction-media" role="img" aria-label={text.alt}>
          <canvas ref={canvasRef} width={SHOE_SCENE.width} height={SHOE_SCENE.height} aria-hidden="true" />
          <picture className="product-construction-still" aria-hidden="true">
            <img src={`${DIRECTORY}/atlas.webp`} alt="" width="1254" height="1254" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="product-construction-copy">
          <p className="eyebrow">{text.label}</p>
          <h2 id="construction-title">{text.title}</h2>
          <p className="product-construction-name">WAI by Vehon / Feel Shoes</p>
          <ol className="product-construction-steps">
            {text.steps.map(([title, body], index) => (
              <li key={index} data-active={index === step ? "" : undefined}>
                <span className="product-construction-index">0{index + 1}</span>
                <strong>{title}</strong>
                <span className="product-construction-body">{body}</span>
              </li>
            ))}
          </ol>
          <div className="product-construction-action">
            <a className="button button-forest" href="/shop?brand=wai" onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onShop("wai");
            }}>{text.cta}<svg className="arrow-icon" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" /></svg></a>
          </div>
          <div className="product-construction-progress" aria-hidden="true"><span>{text.hint}</span><i /></div>
        </div>
      </div>
    </section>
  );
}
