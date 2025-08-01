// Check bundle size impact of importing all Lucide icons
const LucideIcons = require('lucide-react');

// Filter for actual icon components (same logic as API route)
const iconNames = Object.keys(LucideIcons).filter((name) => {
  return (
    name[0] === name[0].toUpperCase() // Starts with capital letter
    && !name.endsWith("Icon") // Exclude icon data objects
    && name !== "Icon" // Exclude the base Icon component
    && name !== "DynamicIcon" // Exclude DynamicIcon
    && name !== "createLucideIcon" // Exclude utility functions
    && name !== "IconNode" // Exclude type exports
    && !name.startsWith("Lucide") // Exclude Lucide-prefixed utilities
  );
});

console.log(`Total Lucide icon components: ${iconNames.length}`);
console.log(`First 10 icons: ${iconNames.slice(0, 10).join(', ')}`);

// Estimate bundle size
// Each icon is roughly 1-2KB minified + gzipped
const estimatedSizeKB = iconNames.length * 1.5; // Conservative estimate
const estimatedSizeMB = estimatedSizeKB / 1024;

console.log(`Estimated bundle size: ${estimatedSizeKB.toFixed(0)}KB (${estimatedSizeMB.toFixed(1)}MB)`);