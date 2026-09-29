import type { Metadata } from 'next';

export const SITE_URL = 'https://chtipilou.github.io/portfolioQL';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Quentin Leroy — Développeur & Cybersécurité',
  description:
    "Portfolio de Quentin Leroy, développeur d'applications métier en alternance chez Groupe Atlantic, spécialisé en sécurité offensive et administration système.",
  keywords: [
    'Quentin Leroy', 'Portfolio', 'Cybersécurité', 'Pentest', 'SysOps',
    'Laravel', 'Filament', 'Next.js', 'Python', 'Alternance',
    'BTS SIO', 'SLAM', 'EPSI', 'RGPD', 'Root-Me', 'ANSSI',
  ],
  authors: [{ name: 'Quentin Leroy' }],
  openGraph: {
    type: 'profile',
    locale: 'fr_FR',
    url: SITE_URL,
    title: 'Quentin Leroy — Développeur & Cybersécurité',
    description:
      "Applications métier livrées en alternance et outils de sécurité développés en autonomie.",
  },
  robots: { index: true, follow: true },
};
