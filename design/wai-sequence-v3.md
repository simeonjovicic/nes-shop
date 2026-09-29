# WAI thin textile scroll illustration — 2026-09-29

The user clarified that the real product is an extremely thin textile foot covering with almost no sole, similar to the other WAI catalogue products. This version replaces the heavier four-layer illustration in the homepage animation.

## Generation

Created with the built-in `image_gen` tool, preserving transparency. Actual output: **1254 × 1254 RGBA**. The requested 2048 dimensions were not returned by the tool.

References, in prompt order:

1. `public/shop/products/wai/lmadnm5-cutout-v1.webp`: current Denim Mocassin design.
2. `design/wai-stock-reference/19-LMADNM5.png`: original catalogue photograph, showing the thin construction.
3. `public/shop/sequence/wai-home-v2/atlas.png`: previous animation atlas, used only for the left-facing camera and separated-parts arrangement.

The new illustration follows the thin denim upper, stitched apron, three vamp seams and soft black heel panel. It removes the thick foam block, molded tread, rigid leather heel counter and pull loop. Three components are shown: the upper, a thin textile sheet and a thin rubber sheet. Their geometry is illustrative and does not establish the exact internal construction of the product.

Exact final prompt: [wai-sequence-v3-prompt.txt](wai-sequence-v3-prompt.txt).

## Assets and integration

- [Generated source artwork](../public/shop/sequence/wai-home-v3/atlas.png)
- [Lossless WebP poster](../public/shop/sequence/wai-home-v3/atlas.webp)
- Runtime layers: `public/shop/sequence/wai-home-v3/{upper,lining,outsole}.webp`
- [Extraction coordinates](../public/shop/sequence/wai-home-v3/layers.json)

Disconnected alpha components were extracted into separate textures, preserving the full 1254-pixel horizontal registration and source detail. The scroll animation uses the same three textures throughout; no independent frames are generated. The assembled pose places the thin sheets almost entirely behind the upper so only a narrow sole edge remains. A small canvas shear aligns their heels with the upper and relaxes as they separate. The camera stays fixed. The source PNGs and previous versions are retained.

`src/shoeSequence.js` defines the three poses and canvas rendering. `src/ProductSequence.jsx` loads the v3 assets and retains the existing responsive layout, static fallback and WAI catalogue link.

## Validation

Desktop start, intermediate and fully separated views were visually checked, plus the mobile layout. Browser checks passed at widths 320, 390, 768, 1024 and 1440: forward/reverse scrolling, catalogue link, restored scroll position after browser back, retina canvas sizing, reduced motion, short landscape viewport and poster fallback after a texture request fails. No browser errors or failed asset responses occurred in the normal flow. ESLint, production build and whitespace checks passed.
