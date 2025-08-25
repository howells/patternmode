#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const uiComponentsDir = path.join(root, "packages/ui/src/components");
const packagesDir = path.join(root, "packages");

// Components to skip (already migrated or not actual components)
const SKIP = new Set([
  "registry.ts",
  "progress-utils.ts",
]);

// Files we often find in UI components and should try to copy
const COPY_GLOBS = [
  "component.tsx",
  "config.ts",
  "preview.tsx",
  "examples.tsx",
  "types.ts",
  "variants.ts",
  "constants.ts",
];

// Basic package.json template
const pkgJsonTemplate = (name) => ({
  name: `@patternmode/${name}`,
  version: "0.1.0",
  description: `${name} component package`,
  type: "module",
  license: "MIT",
  types: "./src/index.ts",
  exports: {
    ".": {
      types: "./src/index.ts",
      import: "./src/index.ts",
      default: "./src/index.ts",
    },
    "./config": {
      types: "./src/config.ts",
      import: "./src/config.ts",
      default: "./src/config.ts",
    },
    "./preview": {
      types: "./src/preview.tsx",
      import: "./src/preview.tsx",
      default: "./src/preview.tsx",
    },
    "./examples": {
      types: "./src/examples.tsx",
      import: "./src/examples.tsx",
      default: "./src/examples.tsx",
    },
  },
  files: ["src"],
  scripts: {
    build: "tsc --noEmit",
    types: "tsc -p tsconfig.json --emitDeclarationOnly --declaration --declarationMap --noEmit false --outDir dist",
    typecheck: "tsc --noEmit",
    lint: "biome check src --write",
  },
  peerDependencies: {
    react: "^19.0.0",
    "react-dom": "^19.0.0",
  },
  dependencies: {
    "@patternmode/ui": "workspace:*",
    "@patternmode/utils": "workspace:*",
  },
});

const tsconfigTemplate = {
  extends: "@patternmode/tsconfig/react-library.json",
  compilerOptions: {
    rootDir: "src",
    outDir: "dist",
    jsx: "react-jsx",
    skipLibCheck: true,
  },
  include: ["src"],
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const fileExists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const readDirSafe = async (dir) => {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
};

const replaceImports = (code, pkgName) => {
  let out = code;
  // Replace sibling UI-relative imports to proper package imports
  // ../<sibling>/component -> @patternmode/<sibling>
  out = out.replace(/from\s+"\.\.\/([a-z0-9-]+)\/component"/g, (m, sib) => {
    return `from "@patternmode/${sib}"`;
  });
  // ../<sibling>/preview|config|examples rarely used in components, ignore
  // Replace any @patternmode/ui/components/<x> to @patternmode/<x>
  out = out.replace(/@patternmode\/ui\/components\/([a-z0-9-]+)/g, (m, mod) => {
    return `@patternmode/${mod}`;
  });
  // Replace importStatement strings that reference @patternmode/ui or @patternmode/ui/components
  out = out.replace(
    /@patternmode\/ui(?:\/components)?\/${pkgName}/g,
    `@patternmode/${pkgName}`,
  );
  // Replace relative import to empty-state within UI to package
  out = out.replace(
    /from\s+"\.\.\/empty-state\/component"/g,
    'from "@patternmode/empty-state"',
  );
  return out;
};

const migrateOne = async (name) => {
  const uiDir = path.join(uiComponentsDir, name);
  const pkgDir = path.join(packagesDir, name);
  const pkgSrc = path.join(pkgDir, "src");

  // Ensure package folder
  await ensureDir(pkgSrc);

  // Create package.json if missing
  const pkgJsonPath = path.join(pkgDir, "package.json");
  if (!(await fileExists(pkgJsonPath))) {
    await fs.writeFile(
      pkgJsonPath,
      JSON.stringify(pkgJsonTemplate(name), null, 2) + "\n",
      "utf8",
    );
  }

  // Create tsconfig if missing
  const tsconfigPath = path.join(pkgDir, "tsconfig.json");
  if (!(await fileExists(tsconfigPath))) {
    await fs.writeFile(
      tsconfigPath,
      JSON.stringify(tsconfigTemplate, null, 2) + "\n",
      "utf8",
    );
  }

  // Detect if already inlined: if component.tsx exists and does NOT import from UI
  const localComponent = path.join(pkgSrc, "component.tsx");
  if (await fileExists(localComponent)) {
    const content = await fs.readFile(localComponent, "utf8");
    if (!content.includes("@patternmode/ui/components/")) {
      // Skip migration for this package
      return { name, skipped: true };
    }
  }

  // Copy known files from UI component folder into package/src with rewrites
  const entries = await readDirSafe(uiDir);
  if (entries.length === 0) {
    return { name, skipped: true, reason: "no-ui-folder" };
  }

  for (const file of entries) {
    if (!file.isFile()) continue;
    if (!COPY_GLOBS.includes(file.name)) continue;
    const srcPath = path.join(uiDir, file.name);
    const dstPath = path.join(pkgSrc, file.name);
    const code = await fs.readFile(srcPath, "utf8");
    const rewritten = replaceImports(code, name);
    await fs.writeFile(dstPath, rewritten, "utf8");
  }

  // Ensure index.ts points to local component
  const indexPath = path.join(pkgSrc, "index.ts");
  let indexCode = `export * from "./component";\n`;
  // Some components export named things; default to star export
  await fs.writeFile(indexPath, indexCode, "utf8");

  return { name, migrated: true };
};

const main = async () => {
  const uiEntries = await readDirSafe(uiComponentsDir);
  const targets = uiEntries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => !SKIP.has(name));

  const results = [];
  for (const name of targets) {
    try {
      const res = await migrateOne(name);
      results.push(res);
      process.stdout.write(`migrated: ${name}\n`);
    } catch (err) {
      console.error(`Failed to migrate ${name}:`, err?.message || err);
      results.push({ name, error: String(err) });
    }
  }

  const summary = {
    migrated: results.filter((r) => r?.migrated).map((r) => r.name),
    skipped: results.filter((r) => r?.skipped).map((r) => r.name),
    errors: results.filter((r) => r?.error).map((r) => r.name),
  };
  await fs.writeFile(
    path.join(root, "migration-ui-to-packages.summary.json"),
    JSON.stringify(summary, null, 2) + "\n",
    "utf8",
  );
  console.log("\nSummary written to migration-ui-to-packages.summary.json");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

