export interface Education {
  title: string;
  period: string;
  school: string;
}

export interface Experience {
  title: string;
  period: string;
  current?: boolean;
  tasks: string[];
}

export const education: Education[] = [
  { title: 'Bachelor SysOps', period: '2025 - 2026', school: 'EPSI Lille' },
  { title: 'BTS SIO option SLAM', period: '2023 - 2025', school: 'Lycée Andrée Malraux' },
  { title: 'Bac Technologique STI2D', period: '2021 - 2023', school: 'Spécialité SIN' },
];

export const experiences: Experience[] = [
  {
    title: 'Alternance, Groupe Atlantic YGNIS',
    period: 'Octobre 2025 - Septembre 2026',
    tasks: [
      'Portage du projet TRS Web, application de suivi de production',
      'Refonte complète de l’application AKAO, plateforme de réapprovisionnement interne',
      'Résolution d’incidents techniques',
      'Assistance à l’implémentation de l’ERP SAP',
    ],
  },
  {
    title: 'Animateur, centre de loisirs',
    period: 'Juillet 2025',
    tasks: [
      'Encadrement et animation d’activités pour enfants',
      'Gestion et organisation de groupes',
    ],
  },
  {
    title: 'Stage, SNCF Euratechnologies',
    period: 'Janvier - Février 2025',
    tasks: [
      'Collaboration avec des experts, architectes et administrateurs',
      'Participation à des projets stratégiques et techniques',
    ],
  },
  {
    title: 'Manutentionnaire',
    period: 'Juillet - Août 2024',
    tasks: [
      'Gestion et organisation des stocks',
      'Travail en équipe',
      'Respect des normes de sécurité',
    ],
  },
  {
    title: 'Stage, centre hospitalier de Beuvry Béthune',
    period: 'Mai - Juin 2024',
    tasks: [
      'Optimisation des systèmes informatiques',
      'Création de scripts d’automatisation',
      'Résolution de problèmes techniques',
    ],
  },
  {
    title: 'Stage, pharmacie',
    period: 'Janvier 2019',
    tasks: [
      'Organisation des rayons',
      'Gestion ponctuelle de la caisse',
      'Observation des processus informatiques automatisés',
    ],
  },
];
