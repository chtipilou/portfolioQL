/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurations de base communes
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurations conditionnelles selon l'environnement
  ...(process.env.GITHUB_ACTIONS || process.env.STATIC_EXPORT === 'true'
    ? {
        // Configuration pour GitHub Pages ou export statique
        output: 'export',
        basePath: '/portfolioQL',
        assetPrefix: '/portfolioQL/',
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
