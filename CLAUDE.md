# Japan-Africa Young Professionals (JAYP) — site

Bilingual (EN / 日本語) Astro static site for **Japan-Africa Young Professionals /
Japan-Africa Young Professionals** — a community connecting young people in
Japan with the African community living in Japan, via networking, culture, and
sport. Pre-launch (founded 2026; first event "Youth Japan–Africa Connection
Party", winter 2026). Deploys to GitHub Pages.

**Read `SPEC.md` first** — full architecture, decisions, placeholders, and known
issues. `PHOTOS.md` covers images/logo.

## Voice & framing (important)
- It's about the **community**, not the founder. Don't center anyone's personal
  story. (Founder appears only as one entry on the Members page.)
- Audience is broad: **all African countries**, and anyone in Japan into African
  culture/language/business/development. **Not students-only** — include young
  professionals, grads, entrepreneurs, African residents in Japan.
- Copy = **short, plain, natural**. Avoid marketing-ish / "AI" lines. Write
  natural Japanese (flowing sentences, not choppy 「〜。〜でも、〜。」 fragments).

## Conventions
- No Tailwind / no UI kit. Plain CSS + tokens in `src/styles/global.css`.
- Fonts: Cinzel (labels), Noto Serif JP (headings), Noto Sans JP (body).
- Images **always** `object-fit: cover` inside a fixed-aspect `.ratio` box — never
  let portrait/landscape distort.
- EN pages at root, JA mirrored under `/ja` with identical slugs.
- About stays in the nav, but links back to Home. There is no standalone About page.
- Body copy lives in each page file; only nav/footer chrome is in `src/i18n/ui.ts`.
- Shared, editable settings (sign-up link, socials, founder) live in `src/config.ts`.
- Primary CTA is "Get an invite / 案内を受け取る" → `siteConfig.signupUrl`.
  **Do not use mailto for the primary CTA** (founder reports it doesn't work).

## Deployment
**Live at https://ryumakojima.github.io/** (GitHub Pages user site, account
`ryumakojima`). **Auto-deploy:** the `ryumakojima.github.io` repo holds the
**source**; every push to `main` runs `.github/workflows/deploy.yml` (Astro action,
Node 22) which builds and publishes via `actions/deploy-pages`. Pages **Source** =
**GitHub Actions**. So: commit/push to `main` → live in ~1–2 min. Do NOT hand-build
or force-push `dist/` anymore (it would overwrite the source). See **`DEPLOY.md`**.
`public/.nojekyll` stays. `site` in `astro.config.mjs` is that URL; canonical/OG/
sitemap derive from it.

## Dev
`npm run dev` (port 4321) · `npm run build` · `npm run preview`.
Dev server background mode: `astro dev` then `astro dev stop` / `status` / `logs`.
