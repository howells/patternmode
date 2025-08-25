#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');

const isDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');

for (const name of fs.readdirSync(packagesDir)) {
  const dir = path.join(packagesDir, name);
  if (!isDir(dir)) continue;
  const tsconfigPath = path.join(dir, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) continue;
  try {
    const ts = readJson(tsconfigPath);
    if (ts.compilerOptions) {
      // Drop any custom paths — rely on normal package resolution
      if (ts.compilerOptions.paths) delete ts.compilerOptions.paths;
      // Disable composite to avoid TS6307 when importing workspace sources
      if ('composite' in ts.compilerOptions) delete ts.compilerOptions.composite;
    }
    writeJson(tsconfigPath, ts);
  } catch {}
}

console.log('Cleaned tsconfig paths and composite flags from packages/*');

