#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const componentsToFix = [
  'area-chart',
  'bar-chart', 
  'callout',
  'copy-button',
  'divider',
  'empty-state',
  'grid',
  'heading'
];

function kebabToPascalCase(str: string): string {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const componentsDir = join(process.cwd(), "src", "components");

console.log(`Fixing function syntax for ${componentsToFix.length} components...`);

let updatedCount = 0;

for (const componentName of componentsToFix) {
  const previewPath = join(componentsDir, componentName, "preview.tsx");
  const expectedExampleName = `${kebabToPascalCase(componentName)}Example`;
  
  try {
    const content = readFileSync(previewPath, "utf-8");
    
    // Convert from function with destructured params and arrow syntax to proper React.ComponentProps pattern
    let newContent = content;
    
    // Replace the complex function signature with simple React.ComponentProps pattern
    const functionMatch = content.match(new RegExp(`export function ${expectedExampleName}\\s*\\((.*?)\\)\\s*=>\\s*\\{`, 's'));
    
    if (functionMatch) {
      console.log(`Fixing ${componentName}/preview.tsx`);
      
      // Replace with simple React.ComponentProps pattern
      newContent = content.replace(
        new RegExp(`export function ${expectedExampleName}\\s*\\((.*?)\\)\\s*=>\\s*\\{`, 's'),
        `export function ${expectedExampleName}(props: React.ComponentProps<typeof ${kebabToPascalCase(componentName)}>) {`
      );
      
      // Also need to replace the component usage inside to use props directly
      // This is a more complex replacement that would need component-specific logic
      // For now, let's just fix the function signature syntax error
      
      writeFileSync(previewPath, newContent, "utf-8");
      updatedCount++;
    }
  } catch (error) {
    console.log(`Error processing ${componentName}: ${error}`);
  }
}

console.log(`Updated ${updatedCount} files`);