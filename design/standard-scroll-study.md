# Feeling, form and combinations — scroll study

The user rejected the separate Pully Orange zoom preview. Its homepage section, component and stylesheet have been removed. The existing “Gefühl. Form. Zusammenspiel.” section now activates its three points as the user scrolls through a sticky image-and-text stage.

Images follow the existing subjects:

1. **Gefühl:** `/shop/gallery/wai-home-step.webp`.
2. **Form:** the existing red knit close-up, `/shop/gallery/montechiaro-detail.webp`. CSS frames the upper textile area, leaving the campaign photograph’s embedded lettering outside the visible crop. The source file is unchanged.
3. **Zusammenspiel:** `/shop/editorial/nes-zusammenspiel-still-life-v1.webp` — a dedicated still life with the gold/blue patterned sweater on a walnut stool and thin denim WAI shoes. Generated from catalogue product references on 2026-10-02; see [the generation record](nes-zusammenspiel-photo.md). The shoppable-look section keeps its own existing photograph.

Clicking or keyboard-activating a point scrolls to its segment. Hover and focus alone do not override the scroll position. Reduced motion and short viewports use a static layout with all descriptions visible and manual image selection. The original heading and copy are retained.

The oversized decorative number beside the WAI shoe description has also been removed; the small step index remains, eliminating the text overlap without narrowing the copy.

Implementation: `StandardSection` and `PRINCIPLE_MEDIA` in `src/App.jsx`, section styles in `src/App.css`, and the removed decorative span in `src/ProductSequence.jsx`.

Browser checks passed at 320, 390, 768, 1024 and 1440 pixels: forward/backward activation, manual selection, hover behavior, catalogue navigation and return scroll, reduced motion, short landscape screens, English copy, visible mobile CTA and shoe-text spacing. Desktop and mobile screenshots were visually checked. No browser errors or failed product images occurred. Lint, production build and whitespace checks passed.
