/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración actualizada para Next.js 15.4
  experimental: {
    nodeMiddleware: true,
  },
  // Otras configuraciones
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
