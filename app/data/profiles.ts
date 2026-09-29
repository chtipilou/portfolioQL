export interface Profile {
  id: string;
  label: string;
  handle: string;
  href: string;
  /** Classe de couleur de la pastille */
  tone: string;
}

/**
 * Profils publics affichés dans le hero.
 * Mettre l'URL réelle dans `href` et le pseudo dans `handle`.
 */
export const profiles: Profile[] = [
  {
    id: 'hackerone',
    label: 'HackerOne',
    handle: 'chtipilou',
    href: 'https://hackerone.com/chtipilou',
    tone: 'text-[#494649] dark:text-gray-200',
  },
  {
    id: 'immunefi',
    label: 'Immunefi',
    handle: 'tchoupilou',
    href: 'https://immunefi.com/profile/tchoupilou',
    tone: 'text-[#4b5cf5] dark:text-indigo-300',
  },
  {
    id: 'rootme',
    label: 'Root-Me',
    handle: 'nochtipilou',
    href: 'https://www.root-me.org/nochtipilou',
    tone: 'text-emerald-600 dark:text-emerald-400',
  },
];
