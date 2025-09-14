#!/usr/bin/env node
// Patternmode CLI: add local packages to a Next.js app and wire config
import { promises as fs } from 'node:fs';
import path from 'node:path';

const stdout = (s) => process.stdout.write(String(s));
const stderr = (s) => process.stderr.write(String(s));

/** Resolve Patternmode repo directory. */
async function resolvePatternmodeDir(fromCwd) {
  const envDir = process.env.PATTERNMODE_DIR;
  if (envDir) return path.resolve(envDir);
  const sibling = path.resolve(fromCwd, '..', 'patternmode');
  try {
    const st = await fs.stat(sibling);
    if (st.isDirectory()) return sibling;
  } catch {}
  let dir = fromCwd;
  for (let i = 0; i < 5; i++) {
    const probe = path.join(dir, 'patternmode', 'packages', 'heading');
    try {
      const st = await fs.stat(probe);
      if (st.isDirectory()) return path.dirname(path.dirname(probe));
    } catch {}
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error('Could not locate Patternmode repo. Set PATTERNMODE_DIR or place repo as a sibling ../patternmode');
}

/** Normalize component input to a package folder name. */
function toPackageFolder(token) {
  const key = token.trim().toLowerCase();
  const map = new Map([
    ['heading', 'heading'],
    ['subheading', 'subheading'],
    ['sub-heading', 'subheading'],
    ['carousel', 'carousel'],
    ['card', 'card'],
    ['grid', 'grid'],
    ['stack', 'stack'],
    ['text', 'text'],
    ['icon', 'icon'],
    ['icons', 'icons'],
    ['button', 'button'],
  ]);
  return map.get(key);
}

/** Read JSON file safely. */
async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

/** Write JSON file with formatting. */
async function writeJson(file, data) {
  const json = JSON.stringify(data, null, 2) + '\n';
  await fs.writeFile(file, json, 'utf8');
}

/** Ensure dependency exists using selected protocol. */
function ensureDep(pkgJson, name, mode, linkPath) {
  pkgJson.dependencies ||= {};
  if (pkgJson.dependencies[name]) return;
  if (mode === 'workspace') {
    pkgJson.dependencies[name] = 'workspace:*';
  } else if (mode === 'link') {
    pkgJson.dependencies[name] = `link:${linkPath}`;
  } else if (mode === 'registry') {
    // registry handled elsewhere where version is known; default to workspace to be safe
    pkgJson.dependencies[name] = 'workspace:*';
  }
}

/** Add to transpilePackages in next.config.ts (ESM). */
async function ensureTranspilePackages(appRoot, names) {
  const nextConfigPath = path.join(appRoot, 'next.config.ts');
  let src = await fs.readFile(nextConfigPath, 'utf8').catch(() => '');
  if (!src) throw new Error('next.config.ts not found');
  if (!src.includes('transpilePackages')) {
    src = src.replace(
      /(const\s+nextConfig\s*:\s*NextConfig\s*=\s*\{)/,
      `$1\n  transpilePackages: [],`
    );
  }
  const existing = new Set(
    Array.from(src.matchAll(/"(@patternmode\/[^"]+)"/g)).map((m) => m[1])
  );
  for (const n of names) existing.add(n);
  src = src.replace(
    /(transpilePackages\s*:\s*\[)[^\]]*(\])/m,
    (_, a, b) => `${a}\n    ${Array.from(existing)
      .filter((s) => s.startsWith('@patternmode/'))
      .sort()
      .map((s) => `"${s}"`)
      .join(',\n    ')}\n  ${b}`
  );
  await fs.writeFile(nextConfigPath, src, 'utf8');
}



/** Recursively collect Patternmode workspace deps from a package.json */
async function collectWorkspaceDeps(patternmodeRoot, startFolders) {
  const queue = [...startFolders];
  const seen = new Set();
  const result = new Set();
  while (queue.length) {
    const folder = queue.shift();
    if (!folder || seen.has(folder)) continue;
    seen.add(folder);
    const pkgPath = path.join(patternmodeRoot, 'packages', folder, 'package.json');
    let pkg;
    try {
      pkg = await readJson(pkgPath);
    } catch {
      continue;
    }
    result.add(folder);
    const deps = Object.assign({}, pkg.dependencies || {}, pkg.peerDependencies || {});
    for (const name of Object.keys(deps)) {
      if (name.startsWith('@patternmode/')) {
        const depFolder = name.split('/')[1];
        if (!seen.has(depFolder)) queue.push(depFolder);
      }
    }
  }
  return [...result];
}

/** Check and report missing peer dependencies expected by selected packages. */
async function reportMissingPeers(patternmodeRoot, appPkg, folders) {
  const requiredPeers = new Map();
  for (const folder of folders) {
    const pkgPath = path.join(patternmodeRoot, 'packages', folder, 'package.json');
    const pkg = await readJson(pkgPath).catch(() => null);
    if (!pkg) continue;
    const peers = pkg.peerDependencies || {};
    const peerMeta = pkg.peerDependenciesMeta || {};
    for (const [name, range] of Object.entries(peers)) {
      if (peerMeta[name]?.optional) continue;
      if (!name.startsWith('@patternmode/')) {
        requiredPeers.set(name, range);
      }
    }
  }
  const have = new Set(Object.keys(appPkg.dependencies || {}).concat(Object.keys(appPkg.devDependencies || {})));
  const missing = [];
  for (const [name, range] of requiredPeers) {
    if (!have.has(name)) missing.push(`${name}@"${range}"`);
  }
  if (missing.length) {
    stdout(`\n[patternmode] Missing peer deps in your app: ${missing.join(', ')}\n`);
    stdout(`[patternmode] Install them if you haven't already (e.g., pnpm add ${missing.join(' ')})\n`);
  }
}

async function run() {
  const argv = process.argv.slice(2);
  const [cmd, ...rest] = argv;
  if (!cmd || cmd === '--help' || cmd === '-h') {
    stdout(`\nPatternmode CLI\n\nUsage:\n  patternmode add <components...> [--app <path>] [--pm <path>] [--mode workspace|link|registry]\n  patternmode install                [--app <path>] [--pm <path>] [--mode workspace|link|registry]\n  patternmode configure:transpile    [--app <path>]\n\nExamples:\n  patternmode add text grid heading\n  patternmode add card carousel --app ../my-app\n  patternmode install --app ../my-app --mode workspace\n  patternmode configure:transpile --app ../my-app\n\nFlags:\n  --app   Path to consumer app (default: cwd)\n  --pm    Path to Patternmode repo (default: sibling ../patternmode)\n  --mode  Dependency protocol (default: workspace)\n\n`);
    process.exit(0);
  }
  if (cmd === 'configure:transpile') {
    let appRoot = process.cwd();
    for (let i = 0; i < rest.length; i++) {
      const t = rest[i];
      if (t === '--app') { appRoot = path.resolve(rest[++i]); }
    }
    const scopeDir = path.join(appRoot, 'node_modules', '@patternmode');
    const names = [];
    try {
      const entries = await fs.readdir(scopeDir, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        const pkgPath = path.join(scopeDir, e.name, 'package.json');
        try { await fs.stat(pkgPath); names.push(`@patternmode/${e.name}`); } catch {}
      }
    } catch {}
    await ensureTranspilePackages(appRoot, names);
    stdout(`Configured transpilePackages with ${names.length} @patternmode packages.\n`);
    process.exit(0);
  }
  if (cmd !== 'add' && cmd !== 'install') {
    stderr(`Unknown command: ${cmd}\n`);
    process.exit(1);
  }

  let appRoot = process.cwd();
  let mode = 'workspace'; // 'workspace' | 'link' | 'registry'
  const tokens = [];
  for (let i = 0; i < rest.length; i++) {
    const t = rest[i];
    if (t === '--app') { appRoot = path.resolve(rest[++i]); continue; }
    if (t === '--pm') { process.env.PATTERNMODE_DIR = path.resolve(rest[++i]); continue; }
    if (t === '--mode') { mode = String(rest[++i] || 'workspace'); continue; }
    tokens.push(t);
  }
  if (cmd === 'add' && !tokens.length) {
    stderr('No components specified.\n');
    process.exit(1);
  }

  const pmRoot = await resolvePatternmodeDir(appRoot);
  const packagesRoot = path.join(pmRoot, 'packages');
  let requestedFolders = [];
  if (cmd === 'install') {
    const entries = await fs.readdir(packagesRoot, { withFileTypes: true });
    requestedFolders = entries.filter(e => e.isDirectory()).map(e => e.name);
  } else {
    requestedFolders = tokens.map(toPackageFolder).filter(Boolean);
    if (!requestedFolders.length) {
      stderr('No valid components resolved.\n');
      process.exit(1);
    }
  }

  const allFolders = await collectWorkspaceDeps(pmRoot, requestedFolders);

  const appPkgPath = path.join(appRoot, 'package.json');
  const appPkg = await readJson(appPkgPath);

  for (const folder of allFolders) {
    const name = `@patternmode/${folder}`;
    if (mode === 'registry') {
      const localPkg = await readJson(path.join(packagesRoot, folder, 'package.json')).catch(() => ({ version: '0.0.0' }));
      appPkg.dependencies ||= {};
      if (!appPkg.dependencies[name]) appPkg.dependencies[name] = `^${localPkg.version}`;
    } else if (mode === 'link') {
      const rel = path.relative(appRoot, path.join(packagesRoot, folder)).replace(/\\/g, '/');
      ensureDep(appPkg, name, 'link', rel.startsWith('.') ? rel : `./${rel}`);
    } else {
      ensureDep(appPkg, name, 'workspace');
    }
  }

  await writeJson(appPkgPath, appPkg);

  const names = allFolders.map((f) => `@patternmode/${f}`);
  await ensureTranspilePackages(appRoot, names);
  await reportMissingPeers(pmRoot, appPkg, allFolders);

  stdout(`\nAdded packages: ${names.join(', ')}\n`);
  stdout('Updated next.config.ts transpilePackages.\n');
  const modeNote = mode === 'registry' ? 'registry mode' : mode === 'link' ? 'link mode' : 'workspace mode';
  stdout(`Run pnpm install (${modeNote}) and restart dev server.\n`);
}

run().catch((err) => {
  stderr(String(err?.stack || err));
  process.exit(1);
});
