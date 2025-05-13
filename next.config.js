/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar el middleware de Node.js
  experimental: {
    serverComponentsExternalPackages: ["mongoose", "mongodb"],
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
