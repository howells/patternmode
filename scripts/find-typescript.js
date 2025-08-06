#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

try {
  // Find the latest TypeScript installation
  const result = execSync('find node_modules/.pnpm -name "tsserver.js" -type f | sort | tail -1', {
    encoding: 'utf8',
    cwd: process.cwd()
  });

  const tsserverPath = result.trim();
  const tsdkPath = path.dirname(tsserverPath);

  console.log('TypeScript SDK Path for VS Code:');
  console.log(`"typescript.tsdk": "${tsdkPath}"`);
  console.log('\nAdd this to your .vscode/settings.json file');

} catch (error) {
  console.error('Error finding TypeScript installation:', error.message);
  console.log('\nTry running: find node_modules/.pnpm -name "tsserver.js" -type f');
}