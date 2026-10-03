# NES page intro — 2026-10-02

A 640 ms introduction on opening or reloading the website: the NES wordmark comes softly into focus on warm paper and fades into the page. It is implemented in `src/PageIntro.jsx` and `src/page-intro.css`, mounted beside the app in `src/main.jsx`. The existing local Cormorant Garamond Latin font is preloaded to keep the wordmark stable.

This is a decorative animation, not a loading indicator. Rendering, assets and interaction continue underneath. It does not wait for images, APIs or all fonts, does not lock scrolling or focus, and does not write to browser storage. The overlay ignores pointer events and dismisses on pointer, keyboard, wheel, touch or focus input. It is hidden from assistive technology. CSS completes in 640 ms; an 800 ms cleanup timer prevents a leftover element if the animation event is lost.

Internal navigation never remounts it. Browser history document restores skip it, and page hiding dismisses it before a page can return from the back/forward cache. Reduced-motion preferences skip it entirely, including when changed during the animation. Background tabs and print also omit the introduction.

Validation: lint and production build pass. Browser checks covered first visit, full reload, internal navigation/back, immediate keyboard dismissal with focus preserved, reduced motion, the cleanup fallback, and homepage startup with its shader. No storage writes or runtime errors occurred. The animation was visually inspected at 1440 px and 390 px.
