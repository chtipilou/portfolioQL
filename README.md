# Portfolio de Quentin Leroy

Portfolio personnel développé avec Next.js 14 et TypeScript, optimisé pour GitHub Pages.

## 🚀 Fonctionnalités

- **Design responsive** avec Tailwind CSS
- **Mode sombre/clair** automatique
- **Galerie d'images** pour les projets
- **Visualisation des PDFs** intégrée (sauf CV qui se télécharge)
- **Animations fluides** et effets visuels légers
- **Optimisé pour GitHub Pages**
- **Arrière-plan interactif** (souris + explosion au clic)

## 🛠️ Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**
- **GitHub Pages** (déploiement automatique)

## 📋 Corrections récentes

1. **Affichage des PDFs** : Les PDFs s'affichent maintenant dans un modal au lieu de se télécharger (sauf le CV)
2. **Root-ME2.pdf ajouté** : Nouvelle certification disponible dans la section certifications
3. **Texte mis à jour** : Recherche d'alternance 2026-2028 en cybersécurité
4. **Expériences enrichies** : Alternance Groupe Atlantic YGNIS + centre de loisirs
5. **Compétences refondues** : niveaux /5, outils cyber & SysOps détaillés
6. **Formation mise à jour** : Bachelor SysOps (EPSI Lille)
7. **Arrière-plan optimisé** : rendu plus clair, interactions souris et explosion au clic
8. **Configuration GitHub Pages** : Optimisée pour le déploiement automatique

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/chtipilou/portfolioQL.git
cd portfolioQL

# Installer les dépendances
node clean-start.js
```

## Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Déploiement

Le site est automatiquement déployé sur GitHub Pages via GitHub Actions.

### GitHub Pages (Automatique)
1. Push vers la branche `main`
2. GitHub Actions build et deploy automatiquement
3. Site accessible sur `https://chtipilou.github.io/portfolioQL/`

### Build local
```bash
npm run build
```

> ⚠️ Next.js nécessite **Node.js >= 20.9** pour le build CI.

## 🎯 Optimisations GitHub Pages

- **Export statique** : Génération de fichiers HTML/CSS/JS statiques
- **Chemins absolus** : Configuration basePath pour GitHub Pages
- **Images non optimisées** : Compatibilité export statique
- **Suppression API routes** : Automatique lors du build GitHub Pages
- **Interactions légères** : Animations allégées pour limiter l'usage CPU

## Structure du projet

```
app/
├── components/           # Composants React
│   ├── Navigation.tsx   # Navigation principale
│   └── ...
├── api/                 # API Routes (uniquement en local)
│   └── send-mail/
├── page.tsx            # Page principale
└── layout.tsx          # Layout global

public/
├── assets/             # Images et ressources
│   ├── certif-proof/   # Certificats
│   ├── projects/       # Screenshots projets
│   └── ...
└── Quentin_Leroy_CV.pdf

.github/workflows/      # Actions GitHub
└── deploy.yml         # Déploiement automatique
```

## 📧 Contact

- **Email** : quentinleroy62131@outlook.fr
- **LinkedIn** : [Quentin Leroy](https://www.linkedin.com/in/quentin-leroy62/)
- **GitHub** : [chtipilou](https://github.com/chtipilou)

## 📜 Licence

Projet personnel - Tous droits réservés
