# Featured shoe cutouts

Created on 2026-09-27 with the built-in `image_gen` tool in edit mode, using one
existing photograph per call. The resulting images have real alpha transparency
and are saved as WebP with alpha quality 100. The homepage uses these cutouts so
the shoes sit directly on the same card background as the knitwear.

| Input photograph | Final workspace asset |
| --- | --- |
| `public/wai_front.jpeg` | `public/shop/products/wai-home-cutout-front-v1.webp` |
| `public/wai_behind.jpeg` | `public/shop/products/wai-home-cutout-back-v1.webp` |
| `public/shop/products/vehon-prince-front.webp` | `public/shop/products/prince-loafer-cutout-front-v1.webp` |
| `public/shop/products/vehon-prince-side.webp` | `public/shop/products/prince-loafer-cutout-side-v1.webp` |

## Prompt used for each of the four edits

> Use case: background-extraction. Asset type: transparent product cutout for an existing fashion shop, matching isolated knitwear product cards. Edit target: the provided single shoe photograph. Remove ONLY the entire studio background and the detached ground shadow. Output the exact same shoe on a genuinely transparent background with an alpha channel, NOT a checkerboard or solid fill. Preserve the exact product geometry, silhouette, fabric weave, stitching, sole tread, every logo and all original colours and light on the shoe. Do not redesign, restyle, add details, change the perspective, or change the direction the shoe is pointing. Keep the entire shoe intact, including the darkest interior and outsole. Center the isolated shoe on a portrait 4:5 transparent canvas, with the shoe taking up approximately 80% of the canvas width and comfortable transparent space on all sides. Clean precise anti-aliased edges. No rectangle, backdrop, border, vignette, glow, floor, shadow, text, labels or watermarks. This is a faithful background removal, not a new product photograph.
