import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Enable server actions if you plan to use them
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Image optimization
  images: {
    domains: [], // Add external domains if needed
    formats: ['image/webp', 'image/avif'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Environment variables validation
  env: {
    // Add any environment variables that should be available at build time
  },
}

export default nextConfig
