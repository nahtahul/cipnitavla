/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cipnitavla.fly.storage.tigris.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig; 