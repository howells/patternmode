import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const publicPackages = ["packages/stacksheet", "packages/aperto"];
const privatePackages = [
	"apps/web/package.json",
	"packages/site-ui/package.json",
	"packages/motion/package.json",
];

const forbiddenInPublicPackages = [
	"@howells/site-ui",
	"@howells/motion-reference",
	"@howells/patternmode-web",
	"@patternmode/",
	"apps/web",
	"packages/site-ui",
	"packages/motion",
];

function walk(dir) {
	const entries = readdirSync(dir);
	const files = [];

	for (const entry of entries) {
		const path = join(dir, entry);
		const stats = statSync(path);
		if (stats.isDirectory()) {
			if (entry === "dist" || entry === "node_modules" || entry === ".turbo") {
				continue;
			}
			files.push(...walk(path));
			continue;
		}

		if (/\.(ts|tsx|js|jsx|json)$/.test(entry)) {
			files.push(path);
		}
	}

	return files;
}

const failures = [];

for (const manifest of privatePackages) {
	const packageJson = JSON.parse(readFileSync(join(root, manifest), "utf8"));
	if (packageJson.private !== true) {
		failures.push(`${manifest} must stay private.`);
	}
}

for (const packagePath of publicPackages) {
	for (const file of walk(join(root, packagePath, "src"))) {
		const source = readFileSync(file, "utf8");
		for (const forbidden of forbiddenInPublicPackages) {
			if (source.includes(forbidden)) {
				failures.push(
					`${relative(root, file)} imports or references forbidden private surface: ${forbidden}`,
				);
			}
		}
	}
}

if (failures.length > 0) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log("Package boundaries are clean.");
