import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

const readJson = (path) => JSON.parse(readFileSync(path, "utf-8"));

const workspaceRoots = ["apps", "packages"];

const workspaceManifests = () =>
  workspaceRoots.flatMap((workspaceDir) =>
    readdirSync(join(root, workspaceDir), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const path = join(workspaceDir, entry.name);
        return {
          manifestPath: join(path, "package.json"),
          packagePath: path,
        };
      })
      .filter(({ manifestPath }) => existsSync(join(root, manifestPath))),
  );

const walk = (dir) => {
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

    if (/\.(ts|tsx|js|jsx|json)$/u.test(entry)) {
      files.push(path);
    }
  }

  return files;
};

const failures = [];
const manifests = workspaceManifests().map(({ manifestPath, packagePath }) => ({
  manifestPath,
  packageJson: readJson(join(root, manifestPath)),
  packagePath,
}));

const privatePackages = manifests.filter(({ packageJson }) => packageJson.private === true);
const publicPackages = manifests.filter(
  ({ packageJson, packagePath }) =>
    packagePath.startsWith("packages/") && packageJson.private !== true,
);

const forbiddenInPublicPackages = privatePackages.flatMap(({ packageJson, packagePath }) => [
  packageJson.name,
  packagePath,
]);

for (const { manifestPath, packageJson } of privatePackages) {
  if (packageJson.private !== true) {
    failures.push(`${manifestPath} must stay private.`);
  }
}

for (const { packagePath } of publicPackages) {
  for (const file of walk(join(root, packagePath, "src"))) {
    const source = readFileSync(file, "utf-8");
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
