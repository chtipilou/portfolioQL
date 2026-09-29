import type { Metadata } from 'next';

export const SITE_URL = 'https://chtipilou.github.io/portfolioQL';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Quentin Leroy, cybersécurité',
  description:
    "Portfolio de Quentin Leroy. Chercheur en sécurité, développeur d'applications métier et administration systèmes.",
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
    title: 'Quentin Leroy, cybersécurité',
    description:
      "Applications métier livrées en entreprise et outils de sécurité développés en autonomie.",
  },
  robots: { index: true, follow: true },
};
