// ─────────────────────────────────────────────────────────────
// Central site config — edit these in ONE place.
// (See also `site` in astro.config.mjs for the absolute URL used by
//  canonical / sitemap / OGP. Update that when the domain is decided.)
// ─────────────────────────────────────────────────────────────
export const siteConfig = {
  name: 'Japan-Africa Young Professionals',
  nameJa: '日本アフリカ・ヤングプロフェッショナルズ',
  shortName: 'JAYP',
  aliases: [
    'Japan Africa Young Professionals',
    'Japan-Africa Youth Community',
    'Japan Africa Community in Japan',
    '日本アフリカ交流',
    '日本とアフリカの交流コミュニティ',
    '在日アフリカ コミュニティ',
  ],

  // Community sign-up form — joining JAYP, NOT an event registration.
  // Per-locale Google Forms (EN / 日本語). This is both the primary CTA
  // target ("Get an invite" / 案内を受け取る) and the email/invite-list form.
  // mailto is intentionally NOT used (unreliable).
  signupUrl: {
    en: 'https://docs.google.com/forms/d/e/1FAIpQLSdSHuDQcRHn8v7K_DxnDpDAttwKxaW8awf1X4xWsJYYgguNjg/viewform',
    ja: 'https://docs.google.com/forms/d/e/1FAIpQLSdaE_OQM4PqagXJmFq7h6aPyVJ3DqKslfn9x4p6GdJO0aYnhA/viewform',
  },

  // Google Search Console verification token (the meta-tag method).
  // In Search Console → Add property → "HTML tag", copy ONLY the value of the
  // content="..." attribute here. This is how you prove ownership so you can
  // submit the sitemap and request indexing. Leave '' to render no tag.
  googleSiteVerification: 'bgym_-xTAP8PfAAeDcZArZkzNvPv8nrVGZrUZT3kXoM',

  // Org contact channels. Leave '' to hide a social link.
  email: '', // optional fallback only (mailto is unreliable, kept minimal)
  instagram: '', // e.g. 'https://instagram.com/your_handle'
  x: '', // e.g. 'https://x.com/your_handle'

  // Founder's personal homepage (shown on the Members page).
  founder: {
    name: 'Ryuma Kojima',
    nameJa: '小島 龍馬',
    blurb: 'Builder — robotics, AI & linguistics.',
    blurbJa: 'ロボティクス・AI・言語の作り手。',
    url: 'https://ryumacv.neocities.org/',
    photo: '/members/ryuma.jpg',
  },
} as const;

export function localizedPath(path: string, locale: 'en' | 'ja') {
  if (!path.startsWith('/') || path.startsWith('/ja') || locale === 'en') return path;
  return `/ja${path}`;
}

export function getSignupUrl(locale: 'en' | 'ja') {
  return siteConfig.signupUrl[locale];
}

// The join/invite-list form is the same community sign-up form.
export function getEmailListFormUrl(locale: 'en' | 'ja') {
  return siteConfig.signupUrl[locale];
}
