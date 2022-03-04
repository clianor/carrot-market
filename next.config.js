/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
  },
  images: {
    domains: [process.env.SP_URL.substring(8)],
  },
};

module.exports = nextConfig;
