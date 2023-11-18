const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};

module.exports = nextConfig;
