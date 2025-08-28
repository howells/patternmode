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
  webpack: (config) => {
    // Avoid wasm-based hashing path that can error on Node 22 in some setups
    if (config.output) {
      // Use a stable, non-wasm hash to sidestep WasmHash crash
      // See: https://webpack.js.org/configuration/output/#outputhashfunction
      (config.output as any).hashFunction = "sha256";
    }
    return config;
  },
};

export default nextConfig;
