/** @type {import("next").NextConfig} */
const nextConfig = {
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
