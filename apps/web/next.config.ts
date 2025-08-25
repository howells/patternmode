import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@patternmode/*"],
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
  typedRoutes: false,
};

export default nextConfig;
