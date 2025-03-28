/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique seulement en production 
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolioQL' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolioQL/' : '',
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig;
