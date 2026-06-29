# Deploy

**Live:** https://ryumakojima.github.io/
**Repo (source + auto-deploy):** https://github.com/ryumakojima/ryumakojima.github.io

This repo now holds the **source code** (Astro). Every push to the `main` branch
triggers a GitHub Actions workflow that builds the site and publishes it to GitHub
Pages automatically. **You no longer build or deploy by hand.**

## How it works

- Source lives on `main`.
- `.github/workflows/deploy.yml` runs on every push to `main`:
  builds with the Astro action (Node 22), then deploys via `actions/deploy-pages`.
- GitHub Pages **Source** is set to **GitHub Actions** (Settings → Pages).
- Goes live ~1–2 min after the Action finishes (green check in the **Actions** tab).

## Editing the site (no PC / no terminal needed)

**Small text change, right in the browser:**
1. Open the repo on GitHub and find the file (see the map below).
2. Click the ✏️ pencil → edit → **Commit changes**.
3. Wait ~1–2 min; the **Actions** tab shows progress, then it's live.

**Bigger edits with a full editor in the browser:**
- Press `.` (period) on the repo to open **github.dev** (VS Code in the browser), or
- Open a **Codespace** (Code ▸ Codespaces) for a full environment with live preview
  (`npm run dev`).

### Where the content lives (edit these, NOT the built HTML)

| What you want to change | File |
|---|---|
| Home page | `src/pages/index.astro` (JA: `src/pages/ja/index.astro`) |
| Other pages | `src/pages/<name>.astro` — `programs`, `events`, `members`, `get-involved`, `contact`, `connection-party` |
| Japanese mirror | `src/pages/ja/<name>.astro` (note: `members` is English-only — no JA page) |
| Shared header/footer/hero etc. | `src/components/*.astro` |
| Nav / footer wording | `src/i18n/ui.ts` |
| Sign-up form links, founder, socials, GSC token | `src/config.ts` |
| Design (colors, spacing, fonts) | `src/styles/global.css` |

For SEO, new pages, or design changes, ask Claude — it edits the same source.

## If a deploy fails

Open the **Actions** tab → click the failed run → read the red step. Common causes:
the build errors out (fix the source and push again). The site keeps serving the
last good version until a new deploy succeeds.

## Before changing the domain

If you ever use a custom domain, update `site` in `astro.config.mjs` and the URL in
`public/robots.txt`, then push — canonical URLs, Open Graph, and the sitemap all
derive from `site`. Keep `public/.nojekyll`.
