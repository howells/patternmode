// Simple debug for ContextMenu detection
const { readFileSync } = require('fs');
const { join } = require('path');

const filePath = join(process.cwd(), 'src', 'components', 'context-menu', 'context-menu.tsx');
const content = readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('Line 131:', lines[130]);
console.log('Pattern test:');

const patterns = [
  /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=/,
  /^const\s+([A-Z][a-zA-Z0-9]*)\s*=/,
];

patterns.forEach((pattern, i) => {
  console.log(`Pattern ${i + 1}:`, pattern);
  const match = lines[130].match(pattern);
  console.log(`Match:`, match);
});