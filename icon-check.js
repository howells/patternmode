const LucideIcons = require('lucide-react');

const iconNames = Object.keys(LucideIcons).filter((name) => {
  return (
    name[0] === name[0].toUpperCase() &&
    !name.endsWith('Icon') &&
    name !== 'Icon' &&
    name !== 'DynamicIcon' &&
    name !== 'createLucideIcon' &&
    name !== 'IconNode' &&
    !name.startsWith('Lucide')
  );
});

console.log('Total Lucide icon components:', iconNames.length);
console.log('First 10 icons:', iconNames.slice(0, 10).join(', '));

// Each Lucide icon is roughly 1-2KB minified+gzipped
const estimatedSizeKB = iconNames.length * 1.5;
const estimatedSizeMB = estimatedSizeKB / 1024;

console.log(`Estimated bundle size if ALL imported: ${estimatedSizeKB.toFixed(0)}KB (${estimatedSizeMB.toFixed(1)}MB)`);

// Show bundle size for current static registry approach
const currentRegistrySize = 150; // Rough count from current registry
const currentSizeKB = currentRegistrySize * 1.5;
console.log(`Current static registry (~${currentRegistrySize} icons): ${currentSizeKB.toFixed(0)}KB`);