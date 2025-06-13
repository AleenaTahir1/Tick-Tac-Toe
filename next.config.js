/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['assets.lottiefiles.com'],
  },
  distDir: 'docs',
  basePath: '/Tick-Tac-Toe',
  assetPrefix: '/Tick-Tac-Toe/',
}

module.exports = nextConfig 