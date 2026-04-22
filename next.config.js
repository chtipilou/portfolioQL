/** @type {import('next').NextConfig} */
const isStaticExport = Boolean(process.env.GITHUB_ACTIONS || process.env.STATIC_EXPORT === 'true');
const basePath = isStaticExport ? '/portfolioQL' : '';

const nextConfig = {
  // Configurations de base communes
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // Configurations conditionnelles selon l'environnement
  ...(isStaticExport
    ? {
        // Configuration pour GitHub Pages ou export statique
        output: 'export',
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
        images: {
          unoptimized: true, // Requis pour export statique
        }
      }
    : {
        // Configuration pour déploiement dynamique (Vercel, serveur Node.js, etc.)
        // Pas de output:'export' ici pour permettre les API routes
        images: {
          domains: ['localhost'],
        }
      })
}

module.exports = nextConfig;
