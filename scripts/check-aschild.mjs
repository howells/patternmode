#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const repoRoot = process.cwd();
const ALLOW_DIRS = [
  'packages/drawer/',
  'packages/responsive-drawer/',
];
const ALLOW_FILES = new Set([
  'packages/button/src/component.tsx',
]);

/**
 * Returns true if a path is inside any allowlisted directory.
 */
function isAllowedPath(path) {
  return (
    ALLOW_DIRS.some((prefix) => path.startsWith(prefix)) ||
    ALLOW_FILES.has(path)
  );
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      // Skip node_modules and dist folders for speed
      if (entry === 'node_modules' || entry === 'dist' || entry === '.turbo') continue;
      yield* walk(full);
    } else if (st.isFile()) {
      if (/(\.tsx|\.ts)$/i.test(entry)) yield full;
    }
  }
}

const offenders = [];
for (const file of walk(repoRoot)) {
  const rel = relative(repoRoot, file).replaceAll('\\', '/');
  const allowed = isAllowedPath(rel);
  const text = readFileSync(file, 'utf8');

  // Quick bail if file doesn't contain token
  if (!text.includes('asChild')) continue;

  // Scan lines and only flag probable prop usage in JSX or prop bags
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('asChild')) continue;

    const probableJsx = /<[^>]*\basChild(\s|=|>|\})/.test(line);
    const probablePropKey = /\basChild\s*:\s*/.test(line);
    const probableTypeKey = /\basChild\?\s*:\s*/.test(line);

    const isProbableUsage = probableJsx || probablePropKey || probableTypeKey;
    if (!isProbableUsage) continue; // ignore comments or arbitrary mentions

    if (!allowed) {
      offenders.push(`${rel}:${i + 1}: ${line.trim()}`);
    }
  }
}

if (offenders.length) {
  console.error('\nFound disallowed asChild usage outside allowlist (drawer/responsive-drawer):');
  for (const msg of offenders) console.error('  ' + msg);
  console.error('\nTo fix: use Base UI\'s render= prop for these cases.');
  process.exit(1);
}

console.log('asChild check passed.');
