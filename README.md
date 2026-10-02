# Portfolio de Quentin Leroy

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
npm run build                    # build local
STATIC_EXPORT=true npm run build # export statique -> out/, comme la CI
npm run lint                     # eslint
npx tsc --noEmit                 # verification de types
```

Le site est entierement statique : aucune route API, aucun middleware. La CI
lance `lint` et `tsc` avant le build (voir `.github/workflows/deploy.yml`).

`robots.ts` et `sitemap.ts` sont generes au build et exigent
`export const dynamic = 'force-static'`, sans quoi `output: 'export'` echoue.

## Structure

```
app/
  (main)/page.tsx          Composition des sections
  (admin)/who              Page privée de consultation des visites
  robots.ts, sitemap.ts    Generes au build
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

## En-tetes de securite

GitHub Pages ne permet pas de definir d'en-tetes HTTP. La politique de securite
du contenu est donc posee en `<meta http-equiv>` dans `app/layout.tsx`. Deux
contraintes a connaitre avant d'y toucher :

- `script-src` tolere `'unsafe-inline'` : Next injecte six scripts inline au
  demarrage et l'export statique interdit les nonces.
- `object-src 'self'` et `img-src ... https://*.workers.dev` sont necessaires,
  le premier pour les preuves de certification rendues en `<object>` PDF, le
  second pour les replis en pixel image du suivi de visite.

`frame-ancestors` n'est pas interpretable en `<meta>` : la protection
anti-iframe demanderait un vrai en-tete, hors de portee sur Pages.

## Chemins d'assets

`basePath` ne préfixe que `next/image` et `Link`, pas les `<img src>` bruts.
Tous les chemins d'assets passent donc par `asset()` de `app/lib/assets.ts`,
ce qui garde `next dev` (sans basePath) et GitHub Pages (`/portfolioQL`)
fonctionnels avec les mêmes données.
