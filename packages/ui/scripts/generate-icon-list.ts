#!/usr/bin/env tsx

/**
 * Generate Icon List
 * 
 * This script analyzes the lucide-react package and generates a complete list
 * of all available icons, then updates the icon registry file.
 */

import * as fs from "fs";
import * as path from "path";

// Import lucide-react to analyze its exports
async function generateIconList() {
  console.log("🔍 Analyzing lucide-react package...");
  
  // Dynamic import to analyze the package
  const LucideIcons = await import("lucide-react");
  
  console.log(`📦 Found ${Object.keys(LucideIcons).length} total exports`);
  
  // Filter to get only the icon components (objects that start with capital letters)
  const iconNames: string[] = [];
  
  Object.entries(LucideIcons).forEach(([name, component]) => {
    if (
      component // Exists
      && typeof component === "object" // Modern Lucide exports as objects
      && name[0] === name[0].toUpperCase() // Starts with capital letter
      && !name.endsWith("Icon") // Exclude *Icon suffix (duplicates)
      && name !== "Icon" // Exclude base Icon component
      && name !== "DynamicIcon" // Exclude DynamicIcon utility
      && name !== "IconNode" // Exclude IconNode type
      && name !== "default" // Exclude default export
      && !name.startsWith("Lucide") // Exclude Lucide* utilities
    ) {
      iconNames.push(name);
    }
  });
  
  iconNames.sort();
  
  console.log(`✅ Found ${iconNames.length} valid icon components`);
  console.log(`🎯 Sample icons: ${iconNames.slice(0, 10).join(", ")}`);
  
  // Generate the new icon registry file
  const registryContent = `/**
 * Static Icon Registry
 *
 * This file imports and re-exports all Lucide React icons in a static registry.
 * 
 * AUTO-GENERATED - Do not edit manually!
 * Run: pnpm run generate-icon-list to regenerate
 *
 * The registry provides:
 * - All ${iconNames.length}+ Lucide React icons as a static object
 * - Type-safe icon access
 * - Zero runtime analysis or filtering
 * - Optimal performance with tree-shaking
 */

import * as LucideIcons from "lucide-react";

// Type for a Lucide icon component
export type LucideIconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
  size?: number;
  [key: string]: any;
}>;

// Pre-generated list of all valid icon names (${iconNames.length} icons)
export const iconNames: string[] = [
${iconNames.map(name => `  "${name}"`).join(",\n")}
];

// Create the icon registry by mapping names to components
export const iconRegistry: Record<string, LucideIconComponent> = {};

// Populate the registry with all valid icon components
iconNames.forEach((name) => {
  const component = LucideIcons[name as keyof typeof LucideIcons];
  if (component) {
    iconRegistry[name] = component as LucideIconComponent;
  }
});

// Export count for debugging
export const iconCount = iconNames.length;

// Helper function to get an icon component by name
export function getIconComponent(name: string): LucideIconComponent | null {
  return iconRegistry[name] || null;
}

// Helper function to check if an icon exists
export function hasIcon(name: string): boolean {
  return name in iconRegistry;
}

// Export the registry as default for convenience
export default iconRegistry;

// Debug logging (only in development)
if (typeof console !== "undefined" && process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log(\`📦 Icon Registry: \${iconCount} icons loaded\`);
  if (iconCount > 0) {
    // eslint-disable-next-line no-console
    console.log(\`🎯 Sample icons: \${iconNames.slice(0, 10).join(", ")}\`);
  }
  else {
    console.warn("⚠️ No icons found in registry!");
  }
}
`;

  // Write the new registry file
  const registryPath = path.join(__dirname, "..", "src", "lib", "icon-registry.ts");
  fs.writeFileSync(registryPath, registryContent, "utf8");
  
  console.log(`📝 Generated icon registry with ${iconNames.length} icons`);
  console.log(`💾 Written to: ${registryPath}`);
  
  return iconNames.length;
}

// Run the generator
if (require.main === module) {
  generateIconList().catch(console.error);
}

export { generateIconList };