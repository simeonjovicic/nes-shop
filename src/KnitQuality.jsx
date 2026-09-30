import { useEffect, useRef, useState } from "react";
import "./knit-quality.css";

const COPY = {
  de: {
    category: "Materialwissen", title: "Was gute Strickqualität", accent: "ausmacht.",
    intro: "Ein guter Pullover beginnt beim Garn und zeigt seinen Charakter in jedem Detail. Vier Dinge, auf die sich ein genauer Blick lohnt.",
    imageAlt: "Blaue und türkisfarbene Maschen, Muster und gerippter Ausschnitt eines Montechiaro-Pullovers",
    caption: "Montechiaro / Struktur im Detail", zoomHint: "Scrollen und näher hinsehen", note: "Zum Hinsehen. Zum Anfühlen. Zum Behalten.",
    points: [
      { title: "Das Material", lead: "Ein gutes Gefühl beginnt auf der Haut.", body: "Schauen Sie auf die Faserzusammensetzung und probieren Sie den Strick an Hals und Handgelenken. Achten Sie darauf, ob sich das Material für Sie angenehm anfühlt und seine Wärme zu Ihrem Alltag passt." },
      { title: "Die Verarbeitung", lead: "Sorgfalt zeigt sich auch auf der Innenseite.", body: "Betrachten Sie das Maschenbild, die Nähte und die Übergänge am Kragen. Achten Sie auf ungewollte Löcher, offene Nähte oder herausgezogene Schlaufen. Bei einem Strukturmuster gehören unterschiedliche Maschengrößen bewusst zum Design." },
      { title: "Die Form", lead: "Kragen, Bündchen und Saum geben Halt.", body: "Legen Sie den Pullover flach hin: Liegen die Abschlüsse gleichmäßig? Prüfen Sie bei der Anprobe, ob die Bündchen angenehm anliegen und die Nähte bequem sitzen. Wie gut die Form langfristig erhalten bleibt, zeigt sich beim Tragen und bei der Pflege." },
      { title: "Die Pflege", lead: "Qualität braucht die passende Aufmerksamkeit.", body: "Richten Sie sich immer nach dem Pflegeetikett. Wollstrick lagert am besten gefaltet und wird nach dem Waschen in der Regel liegend getrocknet. Kleine Knötchen entstehen durch Reibung; Pilling allein erlaubt noch kein abschließendes Qualitätsurteil.", sources: true },
    ],
    sources: "Weiterlesen bei Woolmark:", care: "Wollpflege", pilling: "Pilling verstehen", cta: "Strick von Montechiaro entdecken",
  },
  en: {
    category: "Material notes", title: "What makes good", accent: "knitwear.",
    intro: "A good sweater starts with the yarn and reveals its character in the details. Four things worth a closer look.",
    imageAlt: "Blue and turquoise stitches, patterns and ribbed neckline of a Montechiaro sweater",
    caption: "Montechiaro / Texture in detail", zoomHint: "Scroll for a closer look", note: "To look closely. To feel. To keep.",
    points: [
      { title: "The material", lead: "A good feeling starts against the skin.", body: "Check the fibre composition and try the knit against your neck and wrists. Notice whether the fabric feels comfortable to you and whether its warmth suits your everyday life." },
      { title: "The finish", lead: "Care shows on the inside, too.", body: "Look at the stitches, seams and joins around the neckline. Check for unintended holes, open seams or pulled loops. In a textured pattern, different stitch sizes can be an intentional part of the design." },
      { title: "The shape", lead: "Neckline, cuffs and hem give structure.", body: "Lay the sweater flat: do the edges sit evenly? When trying it on, check that the cuffs sit comfortably and the seams feel right. How well it keeps its shape over time becomes clear through wear and care." },
      { title: "The care", lead: "Quality deserves the right attention.", body: "Always follow the care label. Wool knits are best stored folded and are usually dried flat after washing. Small bobbles form through friction; pilling alone does not give a complete picture of quality.", sources: true },
    ],
    sources: "Further reading at Woolmark:", care: "Wool care", pilling: "Understanding pilling", cta: "Explore Montechiaro knitwear",
  },
};

export function KnitQuality({ language, onShop }) {
  const text = COPY[language];
  const zoomTrackRef = useRef(null);
  const zoomFigureRef = useRef(null);
  const [openPoints, setOpenPoints] = useState(() => {
    const saved = window.history.state?.nesKnitOpen;
    return Array.isArray(saved) ? saved.filter(index => Number.isInteger(index) && index >= 0 && index < text.points.length) : [0];
  });
  const rememberPoint = (index, expanded) => {
    if (openPoints.includes(index) === expanded) return;
    const next = expanded ? [...openPoints, index] : openPoints.filter(point => point !== index);
    setOpenPoints(next);
    // Preserve the article height when returning from its collection link.
    window.history.replaceState({ ...window.history.state, nesKnitOpen: next }, "");
  };

  useEffect(() => {
    const track = zoomTrackRef.current;
    const figure = zoomFigureRef.current;
    const staticMedia = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 600px)");
    let frame;
    let nearby = false;

    const update = () => {
      frame = undefined;
      const offset = Number.parseFloat(getComputedStyle(figure).top) || 0;
      // Use the dedicated scroll space so opening an explanation doesn't change the zoom.
      const travel = Number.parseFloat(getComputedStyle(track, "::after").height) || 1;
      const progress = staticMedia.matches ? 0 : Math.min(1, Math.max(0, (offset - track.getBoundingClientRect().top) / travel));
      const eased = progress * progress * (3 - 2 * progress);
      track.style.setProperty("--knit-zoom-scale", (1 + eased * .85).toFixed(4));
      track.style.setProperty("--knit-zoom-progress", progress.toFixed(4));
      track.dataset.zoomProgress = progress.toFixed(4);
    };
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    };
    const onScroll = () => {
      if (nearby && !staticMedia.matches) schedule();
    };
    const intersection = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      schedule();
    }, { rootMargin: "200px 0px" });
    const resize = new ResizeObserver(schedule);
    intersection.observe(track);
    resize.observe(track);
    resize.observe(figure);
    staticMedia.addEventListener("change", schedule);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      staticMedia.removeEventListener("change", schedule);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <section className="knit-journal section-pad" id="strickqualitaet" aria-labelledby="knit-journal-title">
    <div className="knit-journal-masthead"><span>NES Journal</span><span>01 / {text.category}</span></div>
    <div className="knit-journal-layout">
      <div className="knit-journal-zoom" ref={zoomTrackRef}>
        <figure className="knit-journal-image" ref={zoomFigureRef}>
          <div className="knit-journal-viewport"><img src="/shop/products/pully-blue/detail.jpg" alt={text.imageAlt} width="1122" height="1402" loading="lazy" decoding="async" /></div>
          <figcaption>{text.caption}</figcaption>
          <div className="knit-journal-zoom-hint" aria-hidden="true"><span>{text.zoomHint}</span><span>↓</span><i /></div>
        </figure>
      </div>
      <article className="knit-journal-article">
        <h2 id="knit-journal-title">{text.title}{" "}<em>{text.accent}</em></h2>
        <p className="knit-journal-intro">{text.intro}</p>
        <div className="knit-journal-points">
          {text.points.map((point, index) => <details className="knit-journal-point" key={index} open={openPoints.includes(index)} onToggle={(event) => rememberPoint(index, event.currentTarget.open)}>
            <summary>
              <span className="knit-journal-index" aria-hidden="true">0{index + 1}</span>
              <span><span className="knit-journal-point-title">{point.title}</span><span className="knit-journal-lead">{point.lead}</span></span>
              <span className="knit-journal-toggle" aria-hidden="true" />
            </summary>
            <div className="knit-journal-point-body"><p>{point.body}</p>{point.sources && <p className="knit-journal-sources">{text.sources}{" "}<a href="https://www.woolmark.com/care/care-for-wool/" target="_blank" rel="noreferrer">{text.care}</a>{" · "}<a href="https://www.woolmark.com/care/pilling/" target="_blank" rel="noreferrer">{text.pilling}</a></p>}</div>
          </details>)}
        </div>
        <a className="story-link knit-journal-cta" href="/shop?brand=montechiaro" onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onShop("montechiaro");
        }}>{text.cta}<svg className="arrow-icon" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" /></svg></a>
      </article>
    </div>
    <p className="knit-journal-note">{text.note}</p>
  </section>;
}
