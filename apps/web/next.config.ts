import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    // Disable Next.js TypeScript plugin warnings about serialization
    ignoreBuildErrors: false,
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
