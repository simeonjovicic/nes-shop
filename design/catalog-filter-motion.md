# Catalogue filter motion — 2026-10-02

Filtering now keeps retained product cards mounted and animates their positions into the new grid. Departing cards fade and recede slightly over 180 ms; new cards move from 94% scale and 24 px below into place over 380 ms with a short, capped stagger. Sorting uses the same position animation. Colour selection is preserved on retained cards. Search, saved items and empty results use the same component.

`src/AnimatedCatalogGrid.jsx` uses the existing Framer Motion dependency with `AnimatePresence` in `popLayout` mode and position-only layout animation. The forwarded DOM ref keeps departing cards at their previous coordinates while the live layout updates. Cards leaving the grid become inert and hidden from assistive technology immediately. The page's generic scroll reveal is disabled only for these catalogue cards to avoid competing animations.

The surrounding frame animates its measured height over 440 ms and clips departing cards before they can overlap the service strip or footer. Images and text are not stretched by a container-scale animation. Empty-result copy appears after the outgoing cards fade. A media-query subscription updates reduced-motion behaviour live; transitions and position movement are skipped in that mode.

The animation module is loaded only when the catalogue is visited, using a normal product-grid fallback while the module loads. Other pages do not load the motion bundle. No new dependencies or storage entries were added.

Browser validation covers retained-card movement, inert exit cards, swaps between brands, sorting, rapid interrupted filter changes, search and no-results recovery, retained colour selection, wishlist removal, navigation to a product and back with scroll restoration, mobile layout and immediate reduced-motion behaviour. Desktop/mobile screenshots and intermediate animation frames were visually inspected. Production build, lint and whitespace checks pass.

Implementation references: [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence) and [Motion layout animation](https://motion.dev/docs/react-layout-animations), checked against the locally installed version.
