export const ui = {
  en: {
    siteName: 'Japan-Africa Young Professionals',
    nav: {
      home: 'Home',
      about: 'About',
      programs: 'What We Do',
      events: 'Events',
      members: 'Members',
      getInvolved: 'Get Involved',
      contact: 'Contact',
    },
    cta: 'Get an invite',
    langSwitchLabel: '日本語',
    footer: {
      tagline: 'A community connecting Japanese youth with Africa’s community in Japan — through events, culture, and sport.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      copyright: `© ${new Date().getFullYear()} Japan-Africa Young Professionals. All rights reserved.`,
    },
  },
  ja: {
    siteName: 'Japan-Africa Young Professionals',
    nav: {
      home: 'Home',
      about: 'About',
      programs: 'What We Do',
      events: 'Events',
      members: 'Members',
      getInvolved: 'Get Involved',
      contact: 'Contact',
    },
    cta: 'Get an invite',
    langSwitchLabel: 'English',
    footer: {
      tagline: '日本の若者と在日アフリカ・コミュニティを、イベント・文化・スポーツでつなぐ。',
      quickLinks: 'Quick Links',
      contactUs: 'Contact',
      copyright: `© ${new Date().getFullYear()} Japan-Africa Young Professionals. All rights reserved.`,
    },
  },
} as const;

export type Locale = keyof typeof ui;
