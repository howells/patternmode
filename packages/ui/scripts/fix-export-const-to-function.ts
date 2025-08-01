#!/usr/bin/env tsx

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function kebabToPascalCase(str: string): string {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const componentsDir = join(process.cwd(), "src", "components");
const components = readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${components.length} components to process...`);

let processedCount = 0;
let updatedCount = 0;

for (const componentName of components) {
  const previewPath = join(componentsDir, componentName, "preview.tsx");
  
  try {
    const content = readFileSync(previewPath, "utf-8");
    const expectedExampleName = `${kebabToPascalCase(componentName)}Example`;
    
    // Check if it uses export const instead of export function
    const hasExportConst = content.includes(`export const ${expectedExampleName} =`);
    const hasExportFunction = content.includes(`export function ${expectedExampleName}`);
    
    if (hasExportConst && !hasExportFunction) {
      console.log(`Converting ${componentName} from export const to export function`);
      
      // Convert export const to export function
      const newContent = content.replace(`export const ${expectedExampleName} =`, `export function ${expectedExampleName}`);
      
      writeFileSync(previewPath, newContent, "utf-8");
      updatedCount++;
    }
    
    processedCount++;
  } catch (error) {
    console.log(`Skipping ${componentName}: preview.tsx not found or error reading file`);
  }
}

console.log(`Processed ${processedCount} components, updated ${updatedCount} files`);