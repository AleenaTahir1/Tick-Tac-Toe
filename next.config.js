/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['assets.lottiefiles.com'],
  },
  distDir: 'docs',
}

module.exports = nextConfig 