# NES brand experience — 2026-09-28

NES is the umbrella name, derived from its founder's name. The user supplied the central idea: barefoot shoes should also look good. No founder name, biography, portrait or manufacturing history was supplied or invented.

The headline is **Barfußgefühl. Mit Charakter.** / **Barefoot feeling. With character.** The existing warm neutral palette, serif typography and quiet animated hero remain, with the shared Montechiaro / WAI look brought into the opening screen.

## Pages and navigation

- `/about`: the supplied origin of the NES name, the selection principle, all three labels and personal advice.
- `/brands`: an overview of WAI, Vehon and Montechiaro.
- `/brands/wai`, `/brands/vehon`, `/brands/montechiaro`: individual introductions, material details, the reason for inclusion at NES, three selected products and links to the full filtered collection.
- The homepage, footer, catalogue sections and product pages link to the brand stories. Direct links, refresh, browser history and German / English are supported.

`src/brands.js` holds the editorial data and exact catalogue filters. `src/BrandExperience.jsx` and `src/brand-experience.css` contain the new views. The existing product cards keep colour selection, wishlist and product URLs intact.

## Product representation

The former four-layer WAI animation had unverified construction labels and linked to a legacy product. It is replaced in the homepage by a three-choice material study using current WAI product images and matching SKU links. Original animation assets remain in the repository.

The look's shoe link now points to the current Denim Mocassin and retains the price-on-request behaviour. The copy presents the items as a selection for the look, since the editorial image is not an exact reference photograph of the new SKU.

All imagery comes from the existing image library, including the previously generated product cutouts. No authentic try-on video or founder photography was created. Additional photography can be added when supplied.

## Validation

Browser coverage includes all six new/updated main routes, three material choices, catalogue counts of 6 WAI / 3 Vehon / 5 Montechiaro, product-to-brand links, history and reload, English copy, personal-advice dialog, mobile navigation and unknown-brand fallback. Layouts checked at 320, 390, 768, 1024 and 1440 pixels. Existing 19 automated tests pass.
