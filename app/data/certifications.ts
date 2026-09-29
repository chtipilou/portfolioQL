export interface CertProof {
  label: string;
  url: string;
  type: 'pdf' | 'image';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  description: string;
  proofs: CertProof[];
}

export const certifications: Certification[] = [
  {
    id: 'anssi',
    title: 'ANSSI SecNumAcadémie',
    issuer: 'Agence Nationale de la Sécurité des Systèmes d’Information',
    badge: 'Certifié',
    description:
      'Formation certifiante en cybersécurité couvrant hygiène numérique, sécurité des postes, des réseaux et des données.',
    proofs: [
      { label: 'Voir la certification', url: '/assets/certif-proof/Anssi/AnssiSecNum.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'rootme',
    title: 'Root-Me / CertaPro',
    issuer: 'Root-Me',
    badge: 'Certifié',
    description:
      'Plateforme de challenges en cybersécurité, avec la certification BTS SIO via CertaPro. Validation de compétences pratiques offensives.',
    proofs: [
      { label: 'Certification Root-Me 1', url: '/assets/certif-proof/root-me/Root-ME1.pdf', type: 'pdf' },
      { label: 'Certification Root-Me 2', url: '/assets/certif-proof/root-me/Root-ME2.pdf', type: 'pdf' },
      { label: 'Classement points global', url: '/assets/certif-proof/root-me/root-meClassGlobal.png', type: 'image' },
      { label: 'Classement CertaPro', url: '/assets/certif-proof/root-me/root-meClassCerta.png', type: 'image' },
    ],
  },
  {
    id: 'pix',
    title: 'PIX, compétences numériques',
    issuer: 'État français',
    badge: 'Certifié',
    description: 'Certification des compétences numériques reconnue par l’État français.',
    proofs: [
      { label: 'Voir la certification', url: '/assets/certif-proof/pix/certification-pix-20250306.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'cnil',
    title: 'CNIL, protection des données',
    issuer: 'Commission Nationale de l’Informatique et des Libertés',
    badge: 'Certifié',
    description:
      'Formation sur la protection des données personnelles et le respect du RGPD, en cinq modules.',
    proofs: [
      { label: 'Module 1 : Introduction au RGPD', url: '/assets/certif-proof/cnil/Module1.pdf', type: 'pdf' },
      { label: 'Module 2 : Principes du RGPD', url: '/assets/certif-proof/cnil/Module2.pdf', type: 'pdf' },
      { label: 'Module 3 : Responsabilités', url: '/assets/certif-proof/cnil/Module3.pdf', type: 'pdf' },
      { label: 'Module 4 : Droits des personnes', url: '/assets/certif-proof/cnil/Module4.pdf', type: 'pdf' },
      { label: 'Module 5 : Sécurité des données', url: '/assets/certif-proof/cnil/Module5.pdf', type: 'pdf' },
    ],
  },
];
