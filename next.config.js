/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Required for external images in some deployments
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { 'utf-8-validate': 'commonjs utf-8-validate' }];
    return config;
  },
  // Enable trailing slashes for better compatibility
  trailingSlash: true,
  // Disable TypeScript errors in production to allow partial builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint errors in production
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;