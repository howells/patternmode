#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');

const ensureDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, obj) => fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');

const movePeerToDep = (pkg, name) => {
  const peer = pkg.peerDependencies?.[name];
  if (peer) {
    pkg.peerDependencies && delete pkg.peerDependencies[name];
    pkg.dependencies = pkg.dependencies || {};
    if (!pkg.dependencies[name]) pkg.dependencies[name] = peer;
  }
};

const ensureDevTsconfig = (pkg) => {
  pkg.devDependencies = pkg.devDependencies || {};
  if (!pkg.devDependencies['@patternmode/tsconfig']) {
    pkg.devDependencies['@patternmode/tsconfig'] = 'workspace:*';
  }
};

const fixTsconfig = (dir) => {
  const tsconfigPath = path.join(dir, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) return;
  try {
    const ts = readJson(tsconfigPath);
    if (ts.compilerOptions) {
      if ('rootDir' in ts.compilerOptions) delete ts.compilerOptions.rootDir;
      if ('outDir' in ts.compilerOptions) delete ts.compilerOptions.outDir;
    }
    writeJson(tsconfigPath, ts);
  } catch (e) {
    // ignore
  }
};

if (!ensureDir(packagesDir)) {
  console.error('No packages directory found');
  process.exit(1);
}

const packageDirs = fs.readdirSync(packagesDir).map((n) => path.join(packagesDir, n)).filter(ensureDir);

const readAllSrc = (dir) => {
  const srcDir = path.join(dir, 'src');
  if (!ensureDir(srcDir)) return '';
  const walk = (d) => fs.readdirSync(d).flatMap((f) => {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) return walk(p);
    if (/\.(ts|tsx|mts|cts|js|jsx)$/.test(f)) return [p];
    return [];
  });
  const files = walk(srcDir);
  return files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
};

for (const dir of packageDirs) {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = readJson(pkgPath);

  // Move problematic peer deps to deps
  movePeerToDep(pkg, '@base-ui-components/react');
  movePeerToDep(pkg, 'lucide-react');

  // Keep react as peer to avoid multiple copies
  // Ensure tsconfig devDep when the package has a tsconfig.json extending it
  const tsconfigPath = path.join(dir, 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    const content = fs.readFileSync(tsconfigPath, 'utf8');
    if (content.includes('@patternmode/tsconfig/')) {
      ensureDevTsconfig(pkg);
    }
  }

  // Scan source imports to add required deps if missing
  const src = readAllSrc(dir);
  const ensureDep = (name, version) => {
    pkg.dependencies = pkg.dependencies || {};
    if (!pkg.dependencies[name]) pkg.dependencies[name] = version;
  };
  if (src.includes('@base-ui-components/react')) ensureDep('@base-ui-components/react', '^1.0.0-beta.2');
  if (src.includes("'lucide-react'") || src.includes('"lucide-react"')) ensureDep('lucide-react', '>=0.525.0 <1');
  if (src.includes("'tailwind-variants'") || src.includes('"tailwind-variants"')) ensureDep('tailwind-variants', '^3.1.0');
  if (src.includes('@patternmode/utils')) ensureDep('@patternmode/utils', 'workspace:*');
  if (src.includes('@patternmode/config')) ensureDep('@patternmode/config', 'workspace:*');

  writeJson(pkgPath, pkg);

  // Tidy up tsconfig rootDir/outDir for JIT TS across workspaces
  fixTsconfig(dir);
}

console.log('peerDependencies migrated where applicable and tsconfigs normalized.');
