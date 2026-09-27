# WAI product images — 2026-09-27

26 reference-guided product cutouts created with the built-in `image_gen` tool, one supplied photograph per asset. Source: the embedded PNG photographs in the user-provided `WAI_NILS_aktueller_Bestand.html`.

## Review

Run the existing Vite development server and open [the comparison gallery](http://localhost:5173/design/wai-product-images.html). It includes Active / Lifestyle filters, an original-image toggle, and individual WebP downloads. This design review page is outside the production app entry point.

The images depict extremely thin, soft, single-layer textile foot coverings with flat flexible soles. White presentation lasts were removed. Each model has one view matching the supplied photograph; unseen rear views have not been invented. True alpha backgrounds allow the existing neutral product-card background to show through without a second frame.

These are AI reconstructions from small catalog photos. Fine weave, print and logo details are approximate and should be compared with a physical sample before commercial use. The original references remain available in the comparison gallery.

## Scope

The 26 model codes listed with current stock in the supplied document are included. The nine additional PDF-only models without current stock entries (SSAG014, LMAVL01, LMAVL02, LMAVL04, LMAVL05, LMAVL07, LMAVL15, LMWVL12, LMWVL16) are retained as references only.

The storefront now groups the 26 variants into six WAI families: Mocassin (7), Slip-on (2), High (3), Sport Low (3), Sport High (7), and Sport Slip-on (4). The homepage shows one card per family, plus the existing Prince Loafer. The catalogue uses the same grouping; color searches and saved lists retain the chosen variant.

Each stock code has a distinct product ID and shareable URL. Color/fabric selection changes the image, paired size availability, saved item and basket item together. Legacy WAI marketing products remain reachable by their old URLs and in existing saved selections, but are hidden from the catalogue to avoid duplicate listings.

Prices for the new WAI variants are explicitly `null`, as authorized by the user, and display as “Preis auf Anfrage” / “Price on request”, including basket totals and enquiry messages. The source document is a stock snapshot, not a live inventory feed. Only size availability is used; no live quantity claim is shown.

Implementation: `src/waiProducts.js`, `src/products.js`, `src/featuredProducts.js`, and the family/price helpers in `src/shopState.js`.

## Generation and files

- Built-in image generation/editing; no CLI image-generation fallback.
- Exact prompt template: [`wai-product-image-prompt.txt`](wai-product-image-prompt.txt). Replace `{{DESCRIPTION}}` and `{{CODE}}` with the corresponding source entry; the original PNG is the only image reference for each call. Where present, the corresponding entry in [`wai-product-image-notes.json`](wai-product-image-notes.json) is appended with the prefix `REFERENCE OBSERVATIONS:`. These additions are also recorded in the generation manifest.
- Outputs: `public/shop/products/wai/<lowercase-sku>-cutout-v1.webp`.
- Original generated PNG locations and validation metadata: [`wai-product-generation.json`](wai-product-generation.json).
- WebP conversion: `cwebp -q 92 -alpha_q 100 -m 6`; no additional visual manipulation.
- Original images: `design/wai-stock-reference/`; machine-readable gallery mapping: [`wai-product-images.json`](wai-product-images.json).

| Code | Source description | WebP asset |
| --- | --- | --- |
| SSABLK1 | SPORT LOW BLACK | [ssablk1-cutout-v1.webp](../public/shop/products/wai/ssablk1-cutout-v1.webp) |
| SSABLK7 | SPORT SOFT LOW BLACK | [ssablk7-cutout-v1.webp](../public/shop/products/wai/ssablk7-cutout-v1.webp) |
| SSAPRM7 | SPORT SOFT LOW PRIMULA | [ssaprm7-cutout-v1.webp](../public/shop/products/wai/ssaprm7-cutout-v1.webp) |
| SLABLK1 | SPORT HIGH BLACK | [slablk1-cutout-v1.webp](../public/shop/products/wai/slablk1-cutout-v1.webp) |
| SLABLK7 | SPORT SOFT HIGH BLACK | [slablk7-cutout-v1.webp](../public/shop/products/wai/slablk7-cutout-v1.webp) |
| SLAPRM7 | SPORT SOFT HIGH PRIMULA | [slaprm7-cutout-v1.webp](../public/shop/products/wai/slaprm7-cutout-v1.webp) |
| SLAG012 | SPORT HIGH GR. DEEP BLUE | [slag012-cutout-v1.webp](../public/shop/products/wai/slag012-cutout-v1.webp) |
| SLAG022 | SPORT HIGH GR. SMASH | [slag022-cutout-v1.webp](../public/shop/products/wai/slag022-cutout-v1.webp) |
| SLAG042 | SPORT HIGH GR. MANDALA | [slag042-cutout-v1.webp](../public/shop/products/wai/slag042-cutout-v1.webp) |
| SLAG052 | SPORT HIGH GR. CAMO | [slag052-cutout-v1.webp](../public/shop/products/wai/slag052-cutout-v1.webp) |
| SOAG012 | SPORT SLIP ON GR. DEEP BLUE | [soag012-cutout-v1.webp](../public/shop/products/wai/soag012-cutout-v1.webp) |
| SOAG052 | SPORT SLIP ON GR. CAMO | [soag052-cutout-v1.webp](../public/shop/products/wai/soag052-cutout-v1.webp) |
| SOAG062 | SPORT SLIP ON GR. YELLOW PDP | [soag062-cutout-v1.webp](../public/shop/products/wai/soag062-cutout-v1.webp) |
| SOAG072 | SPORT SLIP ON GR. RED PASSION | [soag072-cutout-v1.webp](../public/shop/products/wai/soag072-cutout-v1.webp) |
| LMAG032 | LIFESTYLE MOCASSIN GR. BLACK PDP | [lmag032-cutout-v1.webp](../public/shop/products/wai/lmag032-cutout-v1.webp) |
| LMAG052 | LIFESTYLE MOCASSIN GR. CAMO | [lmag052-cutout-v1.webp](../public/shop/products/wai/lmag052-cutout-v1.webp) |
| LMANVG3 | LIFESTYLE MOCASSIN COTTON | [lmanvg3-cutout-v1.webp](../public/shop/products/wai/lmanvg3-cutout-v1.webp) |
| LMAOLV6 | LIFESTYLE MOCASSIN SCHOELLER | [lmaolv6-cutout-v1.webp](../public/shop/products/wai/lmaolv6-cutout-v1.webp) |
| LMADNM5 | LIFESTYLE MOCASSIN DENIM | [lmadnm5-cutout-v1.webp](../public/shop/products/wai/lmadnm5-cutout-v1.webp) |
| LMWGYN4 | LIFESTYLE MOCASSIN WOOL | [lmwgyn4-cutout-v1.webp](../public/shop/products/wai/lmwgyn4-cutout-v1.webp) |
| LMWPDP8 | LIFESTYLE MOCASSIN WOOL PDP | [lmwpdp8-cutout-v1.webp](../public/shop/products/wai/lmwpdp8-cutout-v1.webp) |
| LOANVG3 | LIFESTYLE SLIP ON COTTON | [loanvg3-cutout-v1.webp](../public/shop/products/wai/loanvg3-cutout-v1.webp) |
| LOWGYN4 | LIFESTYLE SLIP ON WOOL | [lowgyn4-cutout-v1.webp](../public/shop/products/wai/lowgyn4-cutout-v1.webp) |
| LLANVG3 | LIFESTYLE HIGH COTTON | [llanvg3-cutout-v1.webp](../public/shop/products/wai/llanvg3-cutout-v1.webp) |
| LLWGYN4 | LIFESTYLE HIGH WOOL | [llwgyn4-cutout-v1.webp](../public/shop/products/wai/llwgyn4-cutout-v1.webp) |
| LLWPDP8 | LIFESTYLE HIGH WOOL PDP | [llwpdp8-cutout-v1.webp](../public/shop/products/wai/llwpdp8-cutout-v1.webp) |

## Validation

All 26 exported assets have RGBA transparency, portrait 4:5 proportions, and at least 1000 × 1200 pixels. The gallery was checked at desktop and mobile widths, including filters, original comparison and image loading.
