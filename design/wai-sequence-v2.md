# WAI scroll illustration — 2026-09-29

Superseded by [v3](wai-sequence-v3.md), which follows the user's clarification that the real product has an extremely thin sole and soft textile construction. This version is retained as an earlier visual reference.

## Output and provenance

Generated with the built-in `image_gen` tool, with a transparent background, using the original `wai-home/frame-000.jpg` as the design reference and `wai-home/frame-040.jpg` as the exploded-view edit target. The actual returned artwork is **1254 × 1254 RGBA**, despite the larger dimensions requested in the prompt. It is an AI reconstruction; fine design details and layer geometry should not be treated as verified product construction.

- [Generated source artwork](../public/shop/sequence/wai-home-v2/atlas.png)
- [Lossless WebP artwork / static fallback](../public/shop/sequence/wai-home-v2/atlas.webp)
- Runtime textures: `public/shop/sequence/wai-home-v2/{upper,insole,midsole,outsole}.webp`
- [Layer extraction coordinates](../public/shop/sequence/wai-home-v2/layers.json)

The four disconnected alpha components were extracted without changing their source pixels. Each retains the full 1254-pixel horizontal registration. PNG sources are retained beside their lossless WebP versions. No independent frame generations are used: the same four textures move continuously on a canvas as the user scrolls, avoiding texture changes between frames. The camera stays fixed; the original sequence’s camera movement is not reproduced. The original JPEG sequence remains available in `public/shop/sequence/wai-home/`.

The presentation occupies 56% of the desktop viewport on the left, uses up to 2× canvas resolution, and switches to a stacked layout on smaller screens. Reduced motion and short viewports display the complete static artwork. A poster also remains visible if texture loading fails.

## Final generation prompt

```text
Use case: precise-object-edit. Asset type: one high-resolution RGBA texture atlas for a scroll-controlled exploded shoe animation on a premium fashion storefront. Image 1 is the reference for the exact shoe design and materials. Image 2 is the edit target for the shoe's low three-quarter side perspective and four-component exploded construction. Recreate the SAME blue denim loafer with black leather heel counter, black rear pull loop and black sole, with dramatically cleaner high-resolution details, sharply resolved diagonal denim weave, stitching, matte leather grain and rubber. Preserve the shoe silhouette, colors, seams, toe shape, heel shape and perspective of Image 2; do not redesign it. Produce ONE 2048x2048 square transparent image with exactly FOUR completely isolated horizontal parts arranged vertically, all same scale, horizontal position, orientation and camera. Toe points left; heel points right. Each component spans approximately x=120 through x=1920. TOP BAND y=40..740: the entire shoe upper, including toe, denim vamp, black heel and pull loop, but NO sole attached. SECOND BAND y=900..1100: the single thin light charcoal perforated insole. THIRD BAND y=1240..1440: a single dark charcoal cushioning layer. BOTTOM BAND y=1630..1930: the black rubber outsole, including its tread and edge. Keep every part fully inside its assigned band; leave broad, fully transparent empty gaps between all four parts. Perfect vertical registration: the four parts must fit together into the shoe when translated vertically; keep their toe and heel ends at matching x coordinates. This is a sprite atlas, so absolutely no text, numbers, guides, dividers, borders, arrows or watermark. Orthographic low three-quarter SIDE view matching Image 2, no perspective change between the components. Very clean soft studio lighting from upper left, evenly detailed on all components, no cast shadows between components and no ground plane. Genuine transparent background, no gray or white rectangle, no baked checkerboard. Make the four isolated parts crisp enough for retina product display. Do not add any extra components.
```
