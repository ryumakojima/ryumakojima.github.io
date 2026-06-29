# Agent notes

See **`CLAUDE.md`** for the project brief and conventions, and **`SPEC.md`** for
full architecture, decisions, placeholders, and known issues. `PHOTOS.md` covers
images and the logo.

Quick reminders:
- It's about the community, not the founder. Short, plain, natural copy (incl.
  natural Japanese — avoid choppy fragments).
- No Tailwind. Plain CSS + tokens in `src/styles/global.css`. Images always
  `object-fit: cover` in a fixed-aspect `.ratio` box.
- Shared settings in `src/config.ts`. Primary CTA → `signupUrl` (never mailto).
- ⚠️ Set the real domain in `astro.config.mjs` (`site`) + `public/robots.txt`
  before deploying — SEO (canonical/OG/sitemap) depends on it.
- `npm run dev` / `npm run build` / `npm run preview`.
