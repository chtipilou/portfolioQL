# Portfolio — Quentin Leroy

Portfolio personnel construit avec Next.js 16 (App Router) et Tailwind CSS,
déployé en export statique sur GitHub Pages.

👉 https://chtipilou.github.io/portfolioQL

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build                    # build dynamique (routes API actives)
STATIC_EXPORT=true npm run build # export statique -> out/
```

L'export statique ne supporte pas les routes API : la CI supprime `app/api/`
avant de builder (voir `.github/workflows/deploy.yml`). Le formulaire de contact
bascule automatiquement sur un lien `mailto:` dans ce mode.

## Structure

```
app/
  (main)/page.tsx          Composition des sections
  (admin)/who              Page privée de consultation des visites
  api/                     Routes API (build dynamique uniquement)
  components/
    sections/              Hero, Projects, Skills, Certifications, Timeline
    Gallery.tsx            Visionneuse plein écran (portal + chargement paresseux)
    ProjectCard.tsx        Carte projet avec vignette
    Navigation.tsx         Nav + bascule de thème
    ScrollReveal.tsx       Révélation au scroll (IntersectionObserver)
  data/                    Contenu : projects, skills, certifications, timeline
  lib/assets.ts            Préfixage basePath des chemins d'assets
public/assets/<projet>/    Captures d'écran
```

Le contenu vit dans `app/data/` : ajouter un projet ou une compétence se fait
en éditant ces fichiers, sans toucher au JSX.

## Ajouter un projet

1. Placer les captures dans `public/assets/<dossier>/`, au format
   `<slug>.webp` (max 1920 px de large) **et** `<slug>-thumb.webp` (720 px).
2. Ajouter une entrée dans `app/data/projects.ts`.

`cover` permet de choisir la vignette de la carte quand la première capture
cadre mal en bandeau.

## Chemins d'assets

`basePath` ne préfixe que `next/image` et `Link`, pas les `<img src>` bruts.
Tous les chemins d'assets passent donc par `asset()` de `app/lib/assets.ts`,
ce qui garde `next dev` (sans basePath) et GitHub Pages (`/portfolioQL`)
fonctionnels avec les mêmes données.
