/* ==========================================================================
   Clean Rituals — minimal self-owned backend
   - Serves the static landing page
   - Receives email signups and appends them to your own emails.csv
   - No third-party tools. Your data stays in your file.
   ========================================================================== */

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Where to store collected emails. On a host with a persistent disk,
// set DATA_DIR to that mounted path so data survives restarts/deploys.
const DATA_DIR = process.env.DATA_DIR || __dirname;
const EMAILS_FILE = path.join(DATA_DIR, "emails.csv");

// Optional admin key to download the list in production.
const ADMIN_KEY = process.env.ADMIN_KEY || "";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static landing page (index.html, styles.css, main.js)
app.use(express.static(__dirname));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function csvEscape(value) {
  return '"' + String(value).replace(/"/g, '""') + '"';
}

// Ensure the CSV exists with a header row
function ensureFile() {
  if (!fs.existsSync(EMAILS_FILE)) {
    fs.writeFileSync(EMAILS_FILE, "email,date,source\n");
  }
}

function alreadySubscribed(email) {
  if (!fs.existsSync(EMAILS_FILE)) return false;
  const contents = fs.readFileSync(EMAILS_FILE, "utf8").toLowerCase();
  return contents.includes(csvEscape(email.toLowerCase()));
}

// --- Signup endpoint ----------------------------------------------------
app.post("/api/subscribe", (req, res) => {
  const email = (req.body.email || "").trim();
  const source = (req.body.source || "").trim().slice(0, 40);

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  try {
    ensureFile();

    if (alreadySubscribed(email)) {
      // Treat as success so we don't reveal who is already on the list
      return res.json({ ok: true, message: "You're already on the list — thank you." });
    }

    const row =
      [csvEscape(email), csvEscape(new Date().toISOString()), csvEscape(source)].join(",") + "\n";
    fs.appendFileSync(EMAILS_FILE, row);

    return res.json({ ok: true, message: "Thank you — we'll write to you once, when it's time." });
  } catch (err) {
    console.error("Failed to save signup:", err);
    return res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

// --- Admin download -----------------------------------------------------
// Locally: open http://localhost:3000/admin/subscribers
// In production: set ADMIN_KEY, then visit /admin/subscribers?key=YOUR_KEY
app.get("/admin/subscribers", (req, res) => {
  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(req.hostname);
  const authorized = ADMIN_KEY ? req.query.key === ADMIN_KEY : isLocal;

  if (!authorized) {
    return res.status(403).send("Forbidden. Set ADMIN_KEY and pass ?key=… to download.");
  }
  if (!fs.existsSync(EMAILS_FILE)) {
    return res.type("text/csv").send("email,date,source\n");
  }
  res.download(EMAILS_FILE, "clean-rituals-subscribers.csv");
});

app.listen(PORT, () => {
  console.log(`Clean Rituals running at http://localhost:${PORT}`);
  console.log(`Emails are saved to: ${EMAILS_FILE}`);
});
