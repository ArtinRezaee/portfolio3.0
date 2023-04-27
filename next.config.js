/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
    minimumCacheTTL: 1,
  },
};

module.exports = nextConfig;
