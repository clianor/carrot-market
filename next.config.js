/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
  },
  images: {
    domains: [process.env.SP_URL.substring(8)],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
};

module.exports = withPWA(nextConfig);
