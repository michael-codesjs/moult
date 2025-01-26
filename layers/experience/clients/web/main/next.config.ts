import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   ppr: 'incremental'
  // }
  env: {
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_COGNITO_POOL_ID: process.env.AWS_COGNITO_POOL_ID,
    AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID,
    APP_CLIENT_URL: process.env.APP_CLIENT_URL
  },
  transpilePackages: ['three'],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.freebiesupply.com',
      },
      {
        protocol: 'https',
        hostname: '1000logos.net',
      },
      {
        protocol: 'https',
        hostname: 'www.freepnglogos.com',
      },
      {
        protocol: 'https',
        hostname: 'logowik.com',
      },
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
      }
    ],
  }
};

export default nextConfig;
