/** @type {import("next").NextConfig} */
const nextConfig = {
  // The wildcard matches a single label, so tailnet hosts need the full suffix.
  allowedDevOrigins: ["*.rattlesnake-boa.ts.net", "100.123.39.91"],
};

export default nextConfig;
