# Clean Rituals — Landing Page

A one-page "coming soon" landing page for **Clean Rituals**, a clean haircare brand.
*rooted. refined.*

## Files
- `index.html` — the page (all sections)
- `styles.css` — styling, built on the Clean Rituals brand palette & type
- `main.js` — email form handling + scroll reveal animations

## Sections
1. **Hero / Coming Soon** — headline, intro, email signup, Instagram link
2. **The ritual is the result** — brand philosophy
3. **A note from the founder** — founder story
4. **Ritual Notes** — three editorial cards
5. **Join the list** — founder's circle email signup

## Brand
- **Colours:** Cactus `#4d4f2a`, Cocoa `#3d210b`, Oatmeal `#f4eadc`, Linen `#dfbf8c`, Pollen `#c6913c`, Blondie `#c17853`, Spice `#9b4a20`
- **Type:** Edensor (editorial serif — substituted with Cormorant Garamond on the web), Helvetica Neue (body)

## Run it locally
No build step needed — it's plain HTML/CSS/JS. Either:
- Double-click `index.html`, or
- Run a local server: `python3 -m http.server` then open http://localhost:8000

## Collecting emails
The signup forms are currently a front-end stub (see the `TODO` in `main.js`).
To actually collect addresses, connect the form to a mailing-list provider
(e.g. Mailchimp, ConvertKit, Klaviyo) or a form service (e.g. Formspree).
