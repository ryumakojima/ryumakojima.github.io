# Japan-Africa Young Professionals — Project Spec & Handoff

> Handoff doc for a future developer or AI. Covers what this is, how it's built,
> the decisions behind it, what's still placeholder, and known issues.
> Companion docs: `PHOTOS.md` (images), `CLAUDE.md` (quick brief).

## 1. What this is

A bilingual (English / 日本語) marketing site for **Japan-Africa Young Professionals
(JAYP) / Japan-Africa Young Professionals** — a community connecting young
people in Japan with the African community living in Japan, through **networking
events, cultural exchange, and sports (e.g. soccer)**.

- **Audience:** open to *all* African countries (not one region), and to anyone
  in Japan interested in African culture, language, business, or development.
  Explicitly **not students-only** — young professionals, recent grads,
  entrepreneurs, and African residents/workers in Japan are all included.
- **Status:** pre-launch. Founded 2026. Flagship event **"Youth Japan–Africa
  Connection Party"** planned for **winter 2026** (date/venue TBA).
- **Important framing:** this is about the *community*, NOT about the founder.
  Do not center the founder's personal story. The founder appears only as one
  entry on the Members page.

## 2. Tech stack & commands

- **Astro 7** (static output), TypeScript, no UI framework, no Tailwind.
- Fonts via Google Fonts: **Cinzel** (Latin labels), **Noto Serif JP** (headings),
  **Noto Sans JP** (body) — loaded in `BaseLayout.astro`.
- `npm run dev` (port 4321) · `npm run build` → `dist/` · `npm run preview`.
- Node ≥ 22.

## 3. Architecture

```
src/
  config.ts            ← central config: signupUrl, socials, founder info
  i18n/ui.ts           ← nav/footer chrome strings + CTA label (EN/JA only)
  styles/global.css    ← design tokens, utilities, JA line-break rules
  layouts/BaseLayout.astro  ← <head> SEO (canonical/hreflang/OG/Twitter/JSON-LD),
                              Nav + Footer, mobile sticky CTA, reveal/scroll JS
  components/
    Nav.astro          ← fixed glass nav, circular logo, primary CTA, lang switch
    Footer.astro       ← dark footer, socials/links from config
    Hero.astro         ← full-bleed/short cover hero (object-fit:cover), gold CTA
    PhotoFeature.astro ← image + text, fixed-aspect framed image, alternating
    CardGrid.astro     ← accent-border cards w/ inline-SVG icons (icon map inside)
    SectionLabel.astro ← gold rule + Cinzel eyebrow + serif heading
    MiniBars.astro     ← tiny sourced bar chart (real data)
    PhotoWall.astro    ← "community wall" placeholder tiles (photo+nickname+place)
  pages/               ← EN at root, JA mirrored under /ja
    index, programs (slug = "What We Do"), events, members,
    get-involved, contact   (+ ja/ copies of each)
public/
  logo-placeholder.svg ← circular logo placeholder (also favicon)
  og.jpg               ← 1200×630 social card (generated from a photo)
  robots.txt
.github/workflows/deploy.yml  ← GitHub Pages deploy
```

### i18n
- Astro built-in i18n: `defaultLocale: 'en'` at root, `ja` under `/ja/...`,
  `prefixDefaultLocale: false`. Slugs are identical across locales, so the Nav
  language switcher just adds/removes the `/ja` prefix.
- **Body copy lives directly in each page file** (not a dictionary) so it's easy
  to hand-edit. Only nav/footer chrome is in `i18n/ui.ts`.

### Design system (see `global.css`)
- Palette: gold `#c5a059`, dark green-charcoal `#1e2b26`, sand `#f4edd8`,
  terracotta accent `#c25e2e`, green `#4e6b43`. Warm, savanna-leaning, JANFA-inspired.
- Sections alternate `.section-white / -sand / -dark`. Eyebrows in Cinzel.
- Images **always** use `object-fit: cover` inside a fixed-aspect `.ratio` box, so
  portrait/landscape never distort (this was a past bug — keep it this way).
- Scroll-reveal via `.reveal` + IntersectionObserver (progressive; visible without JS).

## 4. SEO (the "rank well" goal)

Implemented in `BaseLayout.astro` + config:
- Per-page `<title>` + meta description (keyword-aware), canonical URL.
- hreflang alternates (en / ja / x-default).
- Open Graph + Twitter card (image = `/og.jpg`).
- JSON-LD `Organization` (name, alt name, logo, sameAs socials).
- `@astrojs/sitemap` (i18n-aware) → `/sitemap-index.xml`; `robots.txt` points to it.

**⚠️ MUST DO before/at deploy:** set the real domain in **`astro.config.mjs` →
`site`** and in **`public/robots.txt`**. Everything absolute (canonical, OG,
sitemap) derives from `site`; a wrong value silently breaks SEO.

After deploy: add the site to **Google Search Console**, submit the sitemap.
The brand name is distinctive, so ranking for it is realistic once indexed.

## 5. Deployment (GitHub Pages)

- `.github/workflows/deploy.yml` builds with `withastro/action` and deploys via
  `actions/deploy-pages` on push to `main`/`master`.
- Enable Pages → Source: **GitHub Actions** in repo settings.
- **Root vs subpath:** built for **root** (`base: "/"`). If hosting at
  `username.github.io/REPO`, set `base: '/REPO'` in `astro.config.mjs` AND make
  internal links base-aware (currently links are root-absolute like `/about`).
  Easiest path: use a custom domain or a `username.github.io` repo (also best SEO).

## 6. Placeholders to fill (search for these)

| What | Where | Note |
|---|---|---|
| Site domain | `astro.config.mjs` `site`, `public/robots.txt` | required for SEO |
| Sign-up link | `src/config.ts` `signupUrl` | now `/contact`; point to Google Form / Luma / Peatix. **mailto intentionally avoided — founder reports it never works** |
| Socials / email | `src/config.ts` `instagram`, `x`, `email` | empty → hidden on Contact/Footer |
| Reach numbers `[◯]` | `pages/index.astro` + `pages/ja/index.astro` (`.reach`) | real outreach counts |
| Logo | `public/logo-placeholder.svg` | replace with real circular logo |
| OG image | `public/og.jpg` | optional: make a branded 1200×630 |
| Member entries | `pages/members.astro` (+ ja) | founder + 2 open slots currently |

## 7. Known issues / risks / TODO

- **Chart data (`MiniBars` on Home):** the Home chart now uses three real points
  for African residents in Japan: 2000 = 3,840, 2010 = 8,917, 2024 = 25,283
  (source: Immigration Services Agency 在留外国人統計). Keep future edits sourced.
- **Japan → Africa evidence:** Home uses a short source-backed callout rather
  than an invented second chart. MOFA's overseas-residents statistics page is the
  primary source; nippon.com summarizes the 2023 MOFA data as showing Africa
  among the regions that increased while the global total declined.
- **Community Wall is front-end only.** No backend collects posts. To make it real,
  wire it to a Google Form + Sheet, or a service, and render submissions.
- **All photos are from a Tanzania trip** and used as atmosphere. There are no
  event photos yet (pre-launch). Swap in real event photos after the first party.
- **No analytics** yet (consider Plausible/GA4 for the SEO goal).
- Japanese line-breaking relies on `word-break: auto-phrase` (Chrome 119+) with
  graceful fallback elsewhere + `text-wrap: balance/pretty`.
- 6 nav links collapse to a hamburger below 1100px (kept intentionally so the
  desktop bar isn't cramped).

## 8. Session history (most recent last)

1. Scaffolded Astro bilingual site; first design was warm photo-led editorial.
2. Full redesign to a JANFA-inspired look (gold/dark/sand, Cinzel + Noto Serif/Sans,
   parallax heroes, bento gallery, fixed-aspect images) and fixed image distortion.
3. Reframed from an academic "student exchange" to an inclusive **community network**;
   renamed to **Japan-Africa Young Professionals**; activities = networking/culture/sports.
4. **This session:** trimmed copy to short/plain (removed AI-ish lines), grounded the
   story in the real narrative (both flows rising → no connector → Connection Party,
   winter 2026) with a sourced mini-chart; added **Community Wall**; **removed the
   Tanzania gallery and the founder-centric framing**; gave the event Swiss-YP-style
   invite copy; added a **Members** page (founder linked there only); rewrote Japanese
   to read naturally; built the **SEO foundation + GitHub Pages deploy**; improved
   **visual hierarchy** (one prominent gold "Get an invite" CTA in the hero/nav + a
   mobile sticky CTA); wrote this spec.

### Likely next asks (unanswered questions parked for next session)
- Final domain → set `site`.
- Real sign-up form URL → `signupUrl`.
- Real socials, logo, reach numbers, event date/venue.
- Reference Japan–Africa community sites for tone (e.g. アフリカ日本協議会 / AJF).
