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
  webpack(config, { isServer }) {
    if (!isServer) {
      // treat all .node as external so client build won’t choke:
      config.externals.push((ctx, req, cb) =>
        /\.node$/.test(req)
          ? cb(null, "commonjs " + req)
          : cb()
      )
    }
    return config
  },
}

module.exports = nextConfig
