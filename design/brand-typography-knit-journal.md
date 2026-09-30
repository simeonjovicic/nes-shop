# Brand typography and knitwear journal — 2026-09-30

The homepage combines Archivo for “Drei Handschriften.” with a larger, offset Cormorant Garamond italic for “Ein Haus.” The brand labels use spaced sans lettering for WAI, an italic serif for Vehon and compact uppercase lettering for Montechiaro. Both languages use the same treatment, without loading additional fonts.

WAI's brand cards now use the existing `wai-stone-lounge.webp` still life on a wooden bench. The portrait crop selects the left part of the original campaign image, keeping its embedded campaign copy outside the card. The WAI card retains its portrait ratio on mobile for the same reason. Vehon's on-foot photograph on light stairs provides a different setting and composition. `cardImage`, `cardPosition` and translated `cardAlt` fields keep the WAI story-page hero independent.

The homepage includes a self-contained NES Journal article at `/#strickqualitaet`, immediately before the newsletter. An existing blue Montechiaro detail photograph accompanies four expandable explanations: material, finish, shape and care. The first is open initially; each can be opened by mouse, touch or keyboard. The current history entry remembers open items so returning from the Montechiaro collection restores the article layout. The copy is available in German and English.

The photograph now stays in view briefly while scrolling zooms from 1× to 1.85× into its stitches. The same existing image is used throughout, with the focal point below the neckline. Scrolling back reverses the motion. A short progress line and translated hint accompany the image. The zoom distance is independent of expanded article text; scroll updates are limited to animation frames while the section is nearby. Mobile uses the same effect above the article. Reduced motion and short landscape viewports show the static photograph without extra scroll space.

The article provides general shopping observations rather than a claim that these products passed technical quality tests. It does not assert fibre percentages, certification, manufacturing methods or guaranteed resistance to pilling. The care paragraph refers specifically to wool knitwear and gives the garment's care label priority.

Sources consulted for the care and quality context:

- [Woolmark: Caring for wool](https://www.woolmark.com/care/care-for-wool/) — care-label instructions, folded storage and flat drying of wool knitwear.
- [Woolmark: What is pilling?](https://www.woolmark.com/care/pilling/) — friction and multiple factors behind pilling; pilling alone cannot establish overall quality. This last statement is an editorial inference from the described factors.
- [Woolmark: The Woolmark](https://www.woolmark.com/about/the-woolmark) — quality evaluation considers several distinct properties. No certification is attributed to NES or its brands.

The care accordion links to the first two sources. The component is `src/KnitQuality.jsx`, styled in `src/knit-quality.css`.

Validation: lint and production build; browser checks at 320, 390, 768, 1024 and 1440 pixels; forward and reverse zoom; stable zoom while opening explanations; German and English; keyboard disclosure controls; reduced motion and short landscape viewports; filtered collection navigation and restored article state; shared brand directory. Screenshots inspected for image crops and text overflow.
