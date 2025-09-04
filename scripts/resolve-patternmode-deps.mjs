#!/usr/bin/env node
import { promises as fs } from "node:fs";
import { join, dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), "..");
const pkgsDir = join(root, "packages");

async function readJson(file) {
  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

async function loadGraph() {
  const entries = await fs.readdir(pkgsDir, { withFileTypes: true });
  const graph = new Map();
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const pkgPath = join(pkgsDir, e.name, "package.json");
    const pkg = await readJson(pkgPath);
    if (!pkg || !pkg.name) continue;
    const deps = new Set();
    const add = (obj) => {
      if (!obj) return;
      for (const k of Object.keys(obj)) if (k.startsWith("@patternmode/")) deps.add(k);
    };
    add(pkg.dependencies);
    add(pkg.peerDependencies);
    add(pkg.optionalDependencies);
    graph.set(pkg.name, deps);
  }
  return graph;
}

async function resolveDeps(targets) {
  const graph = await loadGraph();
  const result = new Set();
  const queue = [...targets];
  while (queue.length) {
    const name = queue.shift();
    if (!name.startsWith("@patternmode/")) continue;
    if (result.has(name)) continue;
    result.add(name);
    const deps = graph.get(name);
    if (deps) for (const d of deps) queue.push(d);
  }
  return Array.from(result);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/resolve-patternmode-deps.mjs @patternmode/<pkg> [...]\nOutputs space-separated list including transitive @patternmode deps.");
  process.exit(1);
}

resolveDeps(args).then((list) => {
  console.log(list.join(" "));
});

