import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the Turbopack root so CSS @imports resolve inside this project, not ~/projects
  turbopack: { root: path.resolve(process.cwd()) },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
