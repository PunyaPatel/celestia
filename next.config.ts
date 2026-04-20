import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [
      {
        pathname: '/images/**',
      }
    ]
  },
};

export default nextConfig;
