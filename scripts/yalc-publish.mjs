#!/usr/bin/env node
import { promises as fs } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function readJSON(path) {
  const txt = await fs.readFile(path, "utf8");
  return { json: JSON.parse(txt), raw: txt };
}

async function globPackages() {
  const dir = join(root, "packages");
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const pkgs = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const pkgPath = join(dir, e.name, "package.json");
    try {
      const stat = await fs.stat(pkgPath);
      if (stat.isFile()) pkgs.push(pkgPath);
    } catch {}
  }
  return pkgs;
}

function replaceWorkspaceVersions(obj, versionMap) {
  if (!obj) return obj;
  const out = { ...obj };
  for (const [name, ver] of Object.entries(out)) {
    if (typeof ver === "string" && ver.startsWith("workspace:")) {
      out[name] = versionMap.get(name) ?? "*";
    }
  }
  return out;
}

async function run(cmd, args, cwd) {
  await new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: false });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} failed with ${code}`))));
  });
}

async function main() {
  const pkgFiles = await globPackages();
  const versionMap = new Map();
  const packageDirs = [];
  for (const file of pkgFiles) {
    const { json } = await readJSON(file);
    if (typeof json.name === "string" && json.name.startsWith("@patternmode/")) {
      versionMap.set(json.name, json.version || "*");
      packageDirs.push(dirname(file));
    }
  }

  for (const dir of packageDirs) {
    const pkgPath = join(dir, "package.json");
    const { json, raw } = await readJSON(pkgPath);
    if (json.private === true) continue;
    if (!json.name?.startsWith?.("@patternmode/")) continue;

    const original = raw;
    const patched = {
      ...json,
      dependencies: replaceWorkspaceVersions(json.dependencies, versionMap),
      peerDependencies: replaceWorkspaceVersions(json.peerDependencies, versionMap),
      optionalDependencies: replaceWorkspaceVersions(json.optionalDependencies, versionMap),
    };

    await fs.writeFile(pkgPath, JSON.stringify(patched, null, 2) + "\n", "utf8");
    try {
      await run("yalc", ["publish", "--private"], dir);
    } finally {
      await fs.writeFile(pkgPath, original, "utf8");
    }
  }
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});

