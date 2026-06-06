# Clean Rituals — Landing Page

A one-page "coming soon" / waitlist landing page for **Clean Rituals**, a clean
haircare brand. *Rooted. Refined.*

Built faithfully from the design hand-off: 5 full-height sections
(Hero · Philosophy · Founder Note · Ritual Notes · Join the List).

## How to view it
It's a plain static site — **no install, no server, no build step.**

- **Just double-click `index.html`** to open it in your browser, **or**
- Drag `index.html` onto a browser window.

Everything (styles + script) is inside `index.html`; images live in `assets/`.

## Files
| File | What it is |
|---|---|
| `index.html` | The whole page — HTML, CSS and JS in one file |
| `assets/` | All images (logo, hero, founder, ritual-notes collage, etc.) |

## Design tokens
- **Colours:** cream `#faf9f7` · olive `#4d4f2a` · brown `#3d210b` · ink `#1a1812` · light `#fff8ef`
- **Type:** Cormorant Garamond (editorial serif) + DM Sans (body), loaded from Google Fonts

## Collecting emails
The "Join the list" form currently shows a confirmation on screen but does **not
yet store emails** anywhere. To collect them for real, connect the form to an
email provider — Mailchimp is the easiest:

1. Create a free Mailchimp account and an Audience.
2. In **Audience → Signup forms → Embedded form**, copy the form **action URL**.
3. Point the form at it (ask and this can be wired up in ~10 minutes, keeping the
   current design exactly as-is).

No other tool or backend is required.
