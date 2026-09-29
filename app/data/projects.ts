export interface Shot {
  /** Slug du fichier dans /assets/<dir>/ : <slug>.webp et <slug>-thumb.webp */
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
  /** Ce que fait le projet, en phrases courtes */
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
      "Plateforme d'audit offensif que j'ai développée de bout en bout : moteur de reconnaissance, scanner de vulnérabilités et console temps réel. Les scans tournent sur des processus séparés pilotés par un orchestrateur, et les résultats remontent en direct dans l'interface par WebSocket.",
    highlights: [
      'Détection des injections, contrôles d’accès cassés, SSRF, SSTI, GraphQL et fuites de secrets',
      'Contournement de WAF par impersonation TLS, sans navigateur',
      'Chaque résultat est trié en « à soumettre », « à vérifier » ou « bruit »',
      'Explication en français de chaque faille : ce que c’est, pourquoi ça compte, comment la confirmer',
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
      { slug: '01-vuln-probe', title: 'Sonde de vulnérabilités, résultats confirmés' },
      { slug: '02-finding-detail', title: 'Détail d’une faille avec preuve et impact' },
      { slug: '03-dashboard', title: 'Tableau de bord' },
      { slug: '04-recon-scan', title: 'Reconnaissance et découverte de surface' },
      { slug: '05-js-miner', title: 'Extraction de secrets dans les bundles JS' },
      { slug: '06-crawler', title: 'Cartographie des routes' },
      { slug: '07-auth-health', title: 'Santé de l’authentification' },
      { slug: '08-noise-budget', title: 'Maîtrise des faux positifs' },
      { slug: '09-history', title: 'Historique des scans' },
      { slug: '10-config', title: 'Configuration de la sonde' },
      { slug: '11-about', title: 'À propos du moteur' },
    ],
  },
  {
    id: 'dotgitenhanced',
    name: 'DotGitEnhanced',
    tagline: 'Extension navigateur de détection de fichiers exposés',
    context: 'Projet personnel, fork de DotGit',
    description:
      "Extension Chrome et Firefox qui teste en arrière-plan chaque site visité pour repérer les fichiers laissés accessibles par erreur : dépôt .git, .env, .htaccess, sauvegardes, configuration WordPress. Une alerte remonte dès qu’un fichier est trouvé, et le popup tient la liste des sites exposés.",
    highlights: [
      'Analyse passive de chaque site visité, sans action de l’utilisateur',
      'Liste des chemins sondés entièrement éditable, pas seulement .git et .env',
      'Profils d’analyse pour basculer d’un jeu de règles à un autre',
      'Cache des sites déjà analysés pour éviter de les re-sonder',
      'Analyse groupée d’une liste de domaines, et sondeur d’endpoints intégré',
    ],
    tags: [
      { label: 'Extension MV3', tone: 'orange' },
      { label: 'JavaScript', tone: 'blue' },
      { label: 'Sécurité', tone: 'red' },
    ],
    dir: 'dotgitEnhanced',
    cover: 'cover',
    featured: true,
    shots: [
      { slug: '01-detections', title: 'Popup : fichiers exposés détectés par gravité' },
      { slug: '02-sites-exposes', title: 'Liste des sites exposés trouvés' },
      { slug: '03-fichiers-cibles', title: 'Chemins sondés, entièrement configurables' },
      { slug: '04-profils', title: 'Profils d’analyse' },
      { slug: '05-cache-sites', title: 'Cache des sites déjà analysés' },
      { slug: '06-analyse-groupee', title: 'Analyse groupée d’une liste de domaines' },
      { slug: '07-notifications', title: 'Réglages des alertes' },
      { slug: '08-endpoint-tester', title: 'Sondeur d’endpoints intégré' },
    ],
    links: [
      { label: 'Projet original', href: 'https://github.com/davtur19/DotGit', kind: 'github' },
    ],
  },
  {
    id: 'trsweb',
    name: 'TRS Web',
    tagline: 'Suivi de production industrielle',
    context: 'Alternance, Groupe Atlantic YGNIS',
    description:
      "Application de suivi du TRS (Taux de Rendement Synthétique) des lignes de production du site de Cauroir. Elle remplace les anciens classeurs Excel et VBA par une saisie temps réel au poste, des écrans TV en atelier et un panel d'administration complet. Mise en production après plusieurs cycles de retours avec les utilisateurs référents.",
    highlights: [
      'Déclarations de production, aléas et défauts saisies directement au poste',
      'Écrans TV temps réel par secteur et multi-secteurs',
      'Widgets KPI configurables par formule, sans redéploiement',
      'API de lecture pour les outils tiers',
    ],
    tags: [
      { label: 'Laravel', tone: 'red' },
      { label: 'Filament', tone: 'orange' },
      { label: 'Livewire', tone: 'purple' },
      { label: 'SQL Server', tone: 'slate' },
    ],
    dir: 'trsweb',
    cover: '02-poste-production',
    shots: [
      { slug: '01-connexion', title: 'Connexion' },
      { slug: '02-poste-production', title: 'Poste de production, secteur Four' },
      { slug: '03-produit-scanne', title: 'Produit scanné et étapes de déclaration' },
      { slug: '04-declarations', title: 'Déclarations en cours' },
      { slug: '05-dernieres-productions', title: 'Dernières productions avec écarts' },
      { slug: '06-courbe-cadence', title: 'Cadence réelle face à la cadence nécessaire' },
      { slug: '07-defauts', title: 'Répartition des défauts par type' },
      { slug: '08-aleas', title: 'Derniers aléas et temps d’arrêt' },
      { slug: '09-kpi-widgets-tv', title: 'Widgets KPI configurables' },
      { slug: '10-seuils-ip', title: 'Seuils d’indice de productivité par secteur' },
      { slug: '11-admin-enregistrement', title: 'Administration, enregistrement TRS' },
      { slug: '12-admin-utilisateur', title: 'Administration, utilisateurs et rôles' },
    ],
    links: [
      { label: 'Dépôt (privé)', href: 'https://github.com/Groupe-Atlantic/TRS_WEB', kind: 'github' },
    ],
  },
  {
    id: 'akaoweb',
    name: 'AKAO Web',
    tagline: 'Réapprovisionnement bord de ligne',
    context: 'Alternance, Groupe Atlantic YGNIS',
    description:
      "Refonte complète d'AKAO, l'application de réapprovisionnement interne, portée depuis WinDev vers le web. Les opérateurs déclarent besoins et ruptures depuis une interface mobile pensée pour le scan code-barres ; l'encadrement suit le palettier, les livraisons et les alertes côté bureau. Déployée en production sur IIS.",
    highlights: [
      'Interface mobile terrain avec douchette, et back-office sur poste',
      'Fonctionne sans accès Internet, aucune dépendance externe',
      'Gestion des besoins, ruptures, listes à servir, palettier et alertes',
      'Schéma de base versionné par scripts rejouables',
    ],
    tags: [
      { label: 'Laravel', tone: 'red' },
      { label: 'Filament', tone: 'orange' },
      { label: 'Alpine.js', tone: 'cyan' },
      { label: 'SQL Server', tone: 'slate' },
    ],
    dir: 'akaoweb',
    cover: '11-gap-equipement',
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
      { slug: '12-palettier', title: 'Palettier et occupation des emplacements' },
      { slug: '13-configuration', title: 'Configuration applicative' },
      { slug: '14-roles', title: 'Rôles et permissions' },
    ],
    links: [
      { label: 'Dépôt (privé)', href: 'https://github.com/Groupe-Atlantic/AKAO_WEB', kind: 'github' },
    ],
  },
  {
    id: 'nodexss',
    name: 'NodeXSS',
    tagline: 'Plateforme d’analyse web',
    context: 'Projet personnel',
    description:
      "Plateforme permettant de lancer des tests de sécurité et de la reconnaissance sur des applications web, avec comptes utilisateurs, tableau de bord et historique des rapports.",
    tags: [
      { label: 'Next.js', tone: 'slate' },
      { label: 'TypeScript', tone: 'blue' },
    ],
    dir: 'nodexss',
    shots: [
      { slug: 'Home', title: 'Page d’accueil' },
      { slug: 'Login', title: 'Connexion' },
      { slug: 'Register', title: 'Inscription' },
      { slug: 'Dashboard', title: 'Tableau de bord' },
      { slug: 'AnalyseWeb', title: 'Analyse web' },
      { slug: 'WebAnalysis', title: 'Résultats d’analyse' },
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
      "Application web de gestion pour laboratoire pharmaceutique : visites, visioconférences et produits, avec authentification à deux facteurs, module de maintenance et journalisation des opérations.",
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
