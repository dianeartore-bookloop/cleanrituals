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
This now includes a tiny self-owned backend (`server.js`) that collects emails —
no third-party tools.

```bash
npm install      # one-time: installs Express
npm start        # starts the site + backend
```

Then open **http://localhost:3000**.

## Collecting emails (your own server)
- Signups POST to `/api/subscribe` and are appended to **`emails.csv`** (created
  automatically). This file is your subscriber list — it is git-ignored so your
  data never gets committed.
- **Download the list:** open **http://localhost:3000/admin/subscribers**
  (locally) to download a CSV. In production, set an `ADMIN_KEY` env var and
  visit `/admin/subscribers?key=YOUR_KEY`.

## Going live
The backend needs a host that runs Node **and** keeps the data file. Steps:
1. Deploy to an always-on host (Render, Railway, Fly.io). Build/start command: `npm start`.
2. Add a **persistent disk** and point `DATA_DIR` at it, so `emails.csv` survives
   restarts and deploys.
3. Set `ADMIN_KEY` to a secret value to protect the subscriber download.

> Static-only hosting (GitHub Pages, Netlify static) can't run the backend —
> use it only if you switch to a hosted form service instead.
