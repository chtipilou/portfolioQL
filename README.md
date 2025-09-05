# Portfolio de Quentin Leroy

Portfolio personnel développé avec Next.js 14 et TypeScript, optimisé pour GitHub Pages.

## 🚀 Fonctionnalités

- **Design responsive** avec Tailwind CSS
- **Mode sombre/clair** automatique
- **Galerie d'images** pour les projets
- **Visualisation des PDFs** intégrée (sauf CV qui se télécharge)
- **Formulaire de contact** adaptatif (API/mailto selon l'environnement)
- **Animations fluides** et effets visuels
- **Optimisé pour GitHub Pages**

## 🛠️ Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**
- **GitHub Pages** (déploiement automatique)

## 📋 Corrections récentes

1. **Affichage des PDFs** : Les PDFs s'affichent maintenant dans un modal au lieu de se télécharger (sauf le CV)
2. **Root-ME2.pdf ajouté** : Nouvelle certification disponible dans la section certifications
3. **Texte mis à jour** : "Étudiant BTS SIO" → "Étudiant en recherche d'alternance en informatique"
4. **Formation EPSI 2025-2026** : Ajoutée dans la section formation
5. **Formulaire de contact GitHub Pages** : Fonctionne avec mailto automatique sur GitHub Pages
6. **Configuration GitHub Pages** : Optimisée pour le déploiement automatique
7. **Redirection automatique** : De chtipilou.github.io vers chtipilou.github.io/portfolioQL

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

## 🎯 Optimisations GitHub Pages

- **Export statique** : Génération de fichiers HTML/CSS/JS statiques
- **Chemins absolus** : Configuration basePath pour GitHub Pages
- **Images non optimisées** : Compatibilité export statique
- **Suppression API routes** : Automatique lors du build GitHub Pages
- **Formulaire adaptatif** : Détection environnement pour mailto

## Structure du projet

```
app/
├── components/           # Composants React
│   ├── Navigation.tsx   # Navigation principale
│   ├── SimpleContactForm.tsx  # Formulaire de contact
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
