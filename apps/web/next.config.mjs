/** @type {import("next").NextConfig} */
const nextConfig = {
  // The wildcard matches a single label, so tailnet hosts need the full suffix.
  allowedDevOrigins: ["*.rattlesnake-boa.ts.net", "100.123.39.91"],
  transpilePackages: [
    "@howells/site-ui",
    "@patternmode/aperto",
    "@patternmode/deck",
    "@patternmode/scrollframe",
    "@patternmode/stacksheet",
    "@patternmode/system",
    "@patternmode/swatch",
  ],
};

export default nextConfig;
