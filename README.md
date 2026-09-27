# NES Shop

The NES store (formerly Soleform) — the house that sells the Vehon WAI feel shoes and the NES knit pullys, merged from the old vehon-shop and soleform stores. Built with React + Vite.

Start it with `npm install` and `npm run dev`.

Product records live in `src/products.js`; homepage photography and colour choices
live in `src/featuredProducts.js`. Product previews can be shared with
`/shop?product=pully-orange`. The bag and wishlist are saved on the current device.

The bag's “Auswahl anfragen” action sends a non-binding selection enquiry through
the existing `/api/inquiry` Pages Function. It includes the selected products,
colours, sizes and quantities; it does not place an order or take payment.
Vite serves the frontend only. Live enquiry delivery requires the Cloudflare
bindings described in [CLOUDFLARE_NEWSLETTER_SETUP.md](./CLOUDFLARE_NEWSLETTER_SETUP.md).

Run `npm run lint`, `npm test` and `npm run build` to validate changes.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
