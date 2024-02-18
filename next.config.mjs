/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'rnd-devops-app-infra-prod-static-assets.sgp1.digitaloceanspaces.com',
        protocol: 'https',
      }
    ]
  },
};

export default nextConfig;
