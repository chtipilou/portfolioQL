/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  basePath: process.env.NODE_ENV === 'production' ? '/portfolioQL' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolioQL/' : '',
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Recommended for GitHub Pages
}

module.exports = nextConfig;
