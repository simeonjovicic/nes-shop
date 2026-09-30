# NES Checkout — visual prototype

Open `/?checkout=preview`, or add a product and choose **Zum Checkout** in the bag. An empty bag uses an isolated sample selection; it is never saved to the bag. The original **Auswahl anfragen** action still opens the existing enquiry form.

The checkout pairs a warm paper summary with a green wallet card, subtle pointer tilt, a moving light reflection, pressed button feedback and a drawn confirmation check. Wallet and card selectors change the visual payment card. On mobile the modal opens as a bottom sheet with a collapsible selection. German and English copy, reduced motion, keyboard navigation and focus restoration are supported.

The confirmation button now stays mounted while contracting into a circle, moving to the confirmation position and drawing its check. Review and completion share one grid frame, reserving space for both so the dialog does not resize between states or on replay. Hidden controls are inert. Longer selections scroll within the summary, and short viewports scroll gently to the confirmation when needed.

On mobile, drag the handle or header down to dismiss. The sheet follows the finger and the backdrop fades with it. A short or cancelled gesture returns the sheet to its position; a longer pull or quick downward flick dismisses it. Content scrolling is independent. Close, back, Escape and backdrop actions remain available, with focus restored on exit. Reduced motion skips the timed transitions.

This is a local animation, not an integration with Apple Pay or another payment provider. The address and card are explicit demo details. There are no payment fields, API requests, orders or changes to the saved cart. Product subtotals come from the current bag; missing prices stay “Auf Anfrage”. Shipping and the final total are not invented.

Implementation: `src/CheckoutPreview.jsx`, `src/checkout-preview.css`; entry points and modal state in `src/App.jsx`.

Validation: lint and production build; browser checks at 320, 390, 768, 844 and 1440 pixels, including landscape, both languages, keyboard focus, cancellation during animation, unchanged cart, unknown prices, original enquiry flow and no network submissions.

Motion checks sample the dialog throughout the button transition to verify constant bounds and the same button node, including expanded details and replay. Touch simulation covers short pulls, cancelled gestures, horizontal and upward gestures, content scrolling, long pulls, quick flicks, dismissal during confirmation and reduced motion. Focus returns to the visible desktop or mobile bag control.
