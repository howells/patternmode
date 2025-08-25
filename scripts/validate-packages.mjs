#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const packagesDir = join(repoRoot, "packages");

const allowedExtraSubpaths = new Set(["./config", "./preview", "./examples"]);

function writeError(message) {
	process.stderr.write(`${message}\n`);
}

async function pathExists(p) {
	try {
		await stat(p);
		return true;
	} catch {
		return false;
	}
}

async function readJson(path) {
	const content = await readFile(path, "utf8");
	return JSON.parse(content);
}

async function validatePackage(pkgPath) {
	const errors = [];
	const pkgJsonPath = join(pkgPath, "package.json");
	const tsconfigPath = join(pkgPath, "tsconfig.json");
	const srcIndexPath = join(pkgPath, "src/index.ts");
	const srcComponentPathTsx = join(pkgPath, "src/component.tsx");
	const srcComponentPathTs = join(pkgPath, "src/component.ts");

	if (!(await pathExists(pkgJsonPath))) return [];
	const pkgJson = await readJson(pkgJsonPath);

	// Only consider component packages that have a component source
	const hasComponent =
		(await pathExists(srcComponentPathTsx)) ||
		(await pathExists(srcComponentPathTs));
	if (!hasComponent) return [];

	// 1) tsconfig extends react-library preset
	if (await pathExists(tsconfigPath)) {
		try {
			const ts = await readJson(tsconfigPath);
			const ext = ts.extends;
			if (ext !== "@patternmode/tsconfig/react-library.json") {
				errors.push(
					`tsconfig.json must extend @patternmode/tsconfig/react-library.json (found: ${ext ?? "<none>"})`,
				);
			}
		} catch {
			errors.push("tsconfig.json is not valid JSON");
		}
	} else {
		errors.push("tsconfig.json is missing");
	}

	// 2) src/index.ts exists
	if (!(await pathExists(srcIndexPath))) {
		errors.push(
			"src/index.ts is missing (must re-export component and types only)",
		);
	} else {
		const idx = await readFile(srcIndexPath, "utf8");
		// Must not re-export examples/preview or internals
		if (/from\s+"\.\/examples"|from\s+"\.\/preview"/u.test(idx)) {
			errors.push(
				"src/index.ts must not re-export from ./examples or ./preview",
			);
		}
		if (/from\s+"\.\.\//u.test(idx)) {
			errors.push("src/index.ts must not re-export from parent directories");
		}
	}

	// 3) package.json exports
	const exp = pkgJson.exports;
	if (!exp || typeof exp !== "object") {
		errors.push("package.json must define exports map");
	} else {
		const root = exp["."];
		if (
			!root ||
			root.import !== "./src/index.ts" ||
			root.default !== "./src/index.ts" ||
			root.types !== "./src/index.ts"
		) {
			errors.push(
				'exports["."] must point import/default/types to ./src/index.ts',
			);
		}
		// Disallow unknown subpaths
		for (const key of Object.keys(exp)) {
			if (key === ".") continue;
			if (!allowedExtraSubpaths.has(key)) {
				errors.push(`exports contains unsupported subpath: ${key}`);
			}
		}
	}

	// 4) types field mirrors index
	if (pkgJson.types !== "./src/index.ts") {
		errors.push('package.json "types" must be ./src/index.ts');
	}

	return errors;
}

async function main() {
	const packages = await readdir(packagesDir, { withFileTypes: true });
	const failures = [];
	for (const dirent of packages) {
		if (!dirent.isDirectory()) continue;
		const pkgPath = join(packagesDir, dirent.name);
		const errs = await validatePackage(pkgPath);
		if (errs.length > 0) {
			failures.push({ name: dirent.name, errors: errs });
		}
	}

	if (failures.length > 0) {
		for (const f of failures) {
			writeError(`\n[package:${f.name}]`);
			for (const e of f.errors) writeError(` - ${e}`);
		}
		process.exit(1);
	} else {
		process.stdout.write("All packages passed canonical export checks.\n");
	}
}

main().catch((err) => {
	writeError(String(err?.message ?? err));
	process.exit(1);
});
