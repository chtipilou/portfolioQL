export interface Shot {
  /** Slug du fichier dans /assets/<dir>/ — <slug>.webp et <slug>-thumb.webp */
  slug: string;
  title: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'github' | 'demo' | 'doc';
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Faits mesurables affichés sous la description */
  highlights?: string[];
  tags: { label: string; tone: Tone }[];
  /** Dossier sous /public/assets */
  dir: string;
  /** Slug servant de vignette de carte ; par défaut la première capture.
   *  Utile quand la 1re capture cadre mal en bandeau (page de login, écran mobile). */
  cover?: string;
  shots: Shot[];
  links?: ProjectLink[];
  /** Contexte : projet professionnel ou personnel */
  context?: string;
  featured?: boolean;
}

export type Tone = 'blue' | 'purple' | 'orange' | 'red' | 'green' | 'slate' | 'cyan';

export const projects: Project[] = [
  {
    id: 'zettapwned',
    name: 'ZettaPwned',
    tagline: 'Scanner de vulnérabilités web',
    context: 'Projet personnel',
    description:
      "Plateforme d'audit offensif que j'ai développée de bout en bout : moteur de reconnaissance, scanner de vulnérabilités multi-classes et console temps réel. Le scan s'exécute sur des processus séparés pilotés par un orchestrateur, avec fan-out auto-ajusté au CPU disponible et diffusion des résultats en WebSocket.",
    highlights: [
      '15+ classes de vulnérabilités détectées (SQLi, SSRF, IDOR, XSS, SSTI, GraphQL, fuites de secrets…)',
      'Contournement de WAF par impersonation TLS (curl_cffi), sans navigateur',
      'Triage intégré : chaque finding est classé « à soumettre », « à vérifier » ou « bruit »',
      'Architecture modulaire : moteur + mixins par famille, couverte par 131 tests',
    ],
    tags: [
      { label: 'Python', tone: 'blue' },
      { label: 'FastAPI', tone: 'green' },
      { label: 'WebSocket', tone: 'purple' },
      { label: 'Sécurité offensive', tone: 'red' },
    ],
    dir: 'zettapwned',
    featured: true,
    shots: [
      { slug: '01-vuln-probe', title: 'Sonde de vulnérabilités — 19 findings confirmés' },
      { slug: '02-finding-detail', title: "Détail d'un finding avec preuve et impact" },
      { slug: '03-dashboard', title: 'Tableau de bord — statistiques cumulées' },
      { slug: '04-recon-scan', title: 'Reconnaissance — découverte de surface' },
      { slug: '05-js-miner', title: 'JS Miner — extraction de secrets dans les bundles' },
      { slug: '06-crawler', title: 'Crawler — cartographie des routes' },
      { slug: '07-auth-health', title: "Auth Health — santé de l'authentification" },
      { slug: '08-noise-budget', title: 'Noise Budget — maîtrise des faux positifs' },
      { slug: '09-history', title: 'Historique des scans' },
      { slug: '10-config', title: 'Configuration de la sonde' },
      { slug: '11-about', title: 'À propos du moteur' },
    ],
  },
  {
    id: 'trsweb',
    name: 'TRS Web',
    tagline: 'Suivi de production industrielle',
    context: 'Alternance — Groupe Atlantic',
    description:
      "Application de suivi du TRS (Taux de Rendement Synthétique) des lignes de production du site de Cauroir. Elle remplace les anciens classeurs Excel/VBA par une saisie temps réel au poste, des écrans TV en atelier et un panel d'administration complet.",
    highlights: [
      'Déclarations de production, aléas et défauts saisis directement au poste',
      'Écrans TV temps réel par secteur et multi-secteurs, rafraîchis toutes les 30 s',
      'Widgets KPI configurables par formule, sans redéploiement',
      '60+ endpoints API et 20 widgets Filament',
    ],
    tags: [
      { label: 'Laravel 12', tone: 'red' },
      { label: 'Filament 4', tone: 'orange' },
      { label: 'Livewire', tone: 'purple' },
      { label: 'SQL Server', tone: 'slate' },
    ],
    dir: 'trsweb',
    cover: '02-poste-production',
    featured: true,
    shots: [
      { slug: '01-connexion', title: 'Connexion' },
      { slug: '02-poste-production', title: 'Poste de production — secteur Four' },
      { slug: '03-produit-scanne', title: 'Produit scanné et étapes de déclaration' },
      { slug: '04-declarations', title: 'Déclarations en cours' },
      { slug: '05-dernieres-productions', title: 'Dernières productions avec écarts' },
      { slug: '06-courbe-cadence', title: 'Cadence réelle vs cadence nécessaire' },
      { slug: '07-defauts', title: 'Répartition des défauts par type' },
      { slug: '08-aleas', title: 'Derniers aléas et temps d’arrêt' },
      { slug: '09-kpi-widgets-tv', title: 'Widgets KPI configurables' },
      { slug: '10-seuils-ip', title: "Seuils d'indice de productivité par secteur" },
      { slug: '11-admin-enregistrement', title: 'Administration — enregistrement TRS' },
      { slug: '12-admin-utilisateur', title: 'Administration — utilisateurs et rôles' },
    ],
    links: [
      { label: 'Dépôt (privé)', href: 'https://github.com/Groupe-Atlantic/TRS_WEB', kind: 'github' },
    ],
  },
  {
    id: 'akaoweb',
    name: 'AKAO Web',
    tagline: 'Réapprovisionnement bord de ligne',
    context: 'Alternance — Groupe Atlantic',
    description:
      "Refonte complète d'AKAO, l'application de réapprovisionnement interne, migrée depuis WinDev vers le web. Les opérateurs déclarent besoins et ruptures depuis une interface mobile pensée pour le scan code-barres ; l'encadrement suit le palettier, les livraisons et les alertes côté bureau.",
    highlights: [
      'Interface mobile terrain (scan douchette) + back-office desktop',
      'Offline-first : aucune dépendance externe, fonctionne sans accès Internet',
      'Gestion des besoins, ruptures, listes à servir, palettier et alertes',
      'Schéma SQL Server versionné par scripts rejouables, sans migration Laravel',
    ],
    tags: [
      { label: 'Laravel 13', tone: 'red' },
      { label: 'Filament 5', tone: 'orange' },
      { label: 'Alpine.js', tone: 'cyan' },
      { label: 'SQL Server', tone: 'slate' },
    ],
    dir: 'akaoweb',
    cover: '11-gap-equipement',
    featured: true,
    shots: [
      { slug: '01-connexion-badge', title: 'Connexion par badge' },
      { slug: '02-tableau-de-bord', title: 'Tableau de bord opérateur' },
      { slug: '03-menu-gap', title: 'Sélection du GAP' },
      { slug: '04-scan-article', title: 'Scan article et panier' },
      { slug: '05-commande-urgente', title: 'Commande urgente sur rupture' },
      { slug: '06-liste-a-servir', title: 'Liste à servir depuis un produit fini' },
      { slug: '07-fiche-produit', title: 'Fiche produit et alerte de rupture' },
      { slug: '08-besoins', title: 'Besoins actifs' },
      { slug: '09-ruptures', title: 'Ruptures déclarées' },
      { slug: '10-recap-livraisons', title: 'Récapitulatif des livraisons' },
      { slug: '11-gap-equipement', title: 'Vue GAP équipement' },
      { slug: '12-palettier', title: 'Palettier — occupation des emplacements' },
      { slug: '13-configuration', title: 'Configuration applicative' },
      { slug: '14-roles', title: 'Rôles et permissions' },
    ],
    links: [
      { label: 'Dépôt (privé)', href: 'https://github.com/Groupe-Atlantic/AKAO_WEB', kind: 'github' },
    ],
  },
  {
    id: 'dotgitenhanced',
    name: 'DotGitEnhanced',
    tagline: 'Détection de fichiers exposés',
    context: 'Projet personnel — fork',
    description:
      "Fork très largement réécrit de DotGit. Au détecteur passif de dépôts .git exposés j'ai ajouté un moteur de configuration par profils, un Endpoint Tester capable de balayer des listes de milliers d'hôtes, et une passe de récolte JS parallélisée.",
    highlights: [
      'Endpoint Tester : ~1 100 req/s mesurées, détection de contournement 403 intégrée',
      'Ordonnanceur par hôte (round-robin, plafond par hôte, abandon des hôtes morts)',
      'Récolte JS complète sur 350 hôtes en 18,9 s contre 115 s pour la seule passe série',
      'Cibles entièrement pilotées par un JSON éditable — pas uniquement .git/.env',
    ],
    tags: [
      { label: 'Extension MV3', tone: 'orange' },
      { label: 'JavaScript', tone: 'blue' },
      { label: 'Sécurité', tone: 'red' },
    ],
    dir: 'dotgitEnhanced',
    shots: [
      { slug: '01-endpoint-tester', title: 'Endpoint Tester — scan terminé' },
      { slug: '02-endpoint-detail', title: "Détail d'une réponse" },
      { slug: '03-popup-findings', title: 'Popup — finding critique détecté' },
      { slug: '04-profils', title: "Profils d'analyse configurables" },
      { slug: '05-about', title: 'À propos' },
    ],
    links: [
      { label: 'Projet original', href: 'https://github.com/davtur19/DotGit', kind: 'github' },
    ],
  },
  {
    id: 'nodexss',
    name: 'NodeXSS',
    tagline: 'Plateforme d’analyse web',
    context: 'Projet personnel',
    description:
      "Plateforme d'analyse permettant de lancer des tests de sécurité et de la reconnaissance sur des applications web, avec comptes utilisateurs, tableau de bord et historique des rapports.",
    tags: [
      { label: 'Next.js', tone: 'slate' },
      { label: 'TypeScript', tone: 'blue' },
    ],
    dir: 'nodexss',
    shots: [
      { slug: 'Home', title: "Page d'accueil" },
      { slug: 'Login', title: 'Connexion' },
      { slug: 'Register', title: 'Inscription' },
      { slug: 'Dashboard', title: 'Tableau de bord' },
      { slug: 'AnalyseWeb', title: 'Analyse web' },
      { slug: 'WebAnalysis', title: "Résultats d'analyse" },
      { slug: 'Reports', title: 'Rapports' },
      { slug: 'Historique', title: 'Historique' },
      { slug: 'Settings', title: 'Paramètres' },
    ],
  },
  {
    id: 'gsbextranet',
    name: 'GSBExtranet',
    tagline: 'Extranet médical',
    context: 'Projet de formation',
    description:
      "Application web de gestion pour laboratoire pharmaceutique : visites, visioconférences et produits, avec authentification à deux facteurs, module de maintenance et journalisation complète des opérations.",
    tags: [
      { label: 'PHP', tone: 'purple' },
      { label: 'CRUD', tone: 'blue' },
      { label: '2FA', tone: 'green' },
    ],
    dir: 'gsbextranet',
    shots: [
      { slug: 'MenuPrincipale', title: 'Menu principal' },
      { slug: 'GererLesProduits', title: 'Gestion des produits' },
      { slug: 'GererLesVisio', title: 'Gestion des visioconférences' },
      { slug: 'GererLesMaintenances', title: 'Gestion des maintenances' },
      { slug: 'LogsOperations', title: 'Journal des opérations' },
      { slug: 'GererMesDonnees', title: 'Gestion des données personnelles' },
      { slug: 'Auth2Facteur', title: 'Authentification à deux facteurs' },
    ],
  },
  {
    id: 'share',
    name: 'Share',
    tagline: 'Partage de fichiers',
    context: 'Projet de formation',
    description:
      "Application de dépôt et de gestion de fichiers par glisser-déposer, avec catégories, comptes utilisateurs et interface d'administration pour consulter et modifier les fichiers envoyés.",
    tags: [
      { label: 'Symfony', tone: 'green' },
      { label: 'PHP', tone: 'purple' },
      { label: 'MySQL', tone: 'blue' },
    ],
    dir: 'Share',
    shots: [
      { slug: 'MenuPrincipale', title: 'Menu principal' },
      { slug: 'ListeCategories', title: 'Liste des catégories' },
      { slug: 'ListeDesFichiers', title: 'Liste des fichiers' },
      { slug: 'AjouterUnFichier', title: 'Ajout de fichier' },
      { slug: 'PageAdmin', title: 'Administration' },
      { slug: 'PageContact', title: 'Contact' },
    ],
  },
];

export const TONE_CLASSES: Record<Tone, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  slate: 'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300',
};
