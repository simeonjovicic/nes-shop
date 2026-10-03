import { createContext, forwardRef, useContext, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, animate, motion as Motion, useIsPresent, useMotionValue } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const REST = { opacity: 1, scale: 1, y: 0 };
const ReducedMotion = createContext(false);
const readReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const subscribeReducedMotion = (callback) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

// The forwarded DOM ref lets popLayout keep departing cards at their old
// coordinates while the remaining cards immediately take their new places.
const CatalogItem = forwardRef(function CatalogItem({ children, productId, index = 0, empty = false }, ref) {
  const present = useIsPresent();
  const reducedMotion = useContext(ReducedMotion);

  return <Motion.div
    ref={ref}
    className={`catalog-motion-card${empty ? " is-empty" : ""}`}
    data-catalog-id={productId}
    data-exiting={present ? undefined : "true"}
    inert={!present || undefined}
    aria-hidden={!present || undefined}
    layout={reducedMotion ? false : "position"}
    initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
    animate={REST}
    exit={reducedMotion ? { opacity: 0, transition: { duration: 0 } } : {
      opacity: 0,
      scale: 0.93,
      y: -12,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
    }}
    transition={reducedMotion ? { duration: 0 } : {
      duration: 0.38,
      ease: EASE,
      delay: empty ? 0.19 : Math.min(index, 5) * 0.025 + 0.04,
      layout: { type: "spring", stiffness: 420, damping: 38, mass: 0.8, delay: 0 },
    }}
  >{children}</Motion.div>;
});

export function AnimatedCatalogGrid({ products, renderProduct, emptyState }) {
  const gridRef = useRef(null);
  const height = useMotionValue("auto");
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => true);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    // Animate the frame's actual height, never a scale that stretches images
    // or type. The measured inner grid remains in its natural final layout.
    height.set(grid.offsetHeight);
    let transition;
    const observer = new ResizeObserver(() => {
      const next = grid.offsetHeight;
      if (next === height.get()) return;
      transition?.stop();
      if (reducedMotion) height.set(next);
      else transition = animate(height, next, { duration: 0.44, ease: EASE });
    });
    observer.observe(grid);
    return () => { observer.disconnect(); transition?.stop(); };
  }, [height, reducedMotion]);

  return <ReducedMotion.Provider value={reducedMotion}><Motion.div className="catalog-results-frame" style={{ height }}>
    <div ref={gridRef} className="product-grid catalog-grid catalog-grid-animated">
      <AnimatePresence initial={false} mode="popLayout">
        {products.length ? products.map((product, index) => <CatalogItem key={product.id} productId={product.id} index={index}>
          {renderProduct(product)}
        </CatalogItem>) : <CatalogItem key="empty" empty>{emptyState}</CatalogItem>}
      </AnimatePresence>
    </div>
  </Motion.div></ReducedMotion.Provider>;
}
