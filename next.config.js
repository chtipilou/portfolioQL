/** @type {import('next').NextConfig} */
const nextConfig = {
  // Retirer ou commenter cette ligne pour permettre l'utilisation des API routes
  // output: 'export',
  
  // Autres configurations existantes
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,  // Required for static export
  },
}

module.exports = nextConfig;
