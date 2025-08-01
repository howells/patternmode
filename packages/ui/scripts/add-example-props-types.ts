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
    const expectedPropsType = `${kebabToPascalCase(componentName)}ExampleProps`;
    
    // Check if the props type is missing
    const hasPropsType = content.includes(`type ${expectedPropsType} =`) || content.includes(`type ${expectedPropsType}=`);
    
    if (!hasPropsType) {
      console.log(`Adding ${expectedPropsType} to ${componentName}/preview.tsx`);
      
      // Find the import statements and add the type after them
      const lines = content.split('\n');
      let insertIndex = -1;
      
      // Find the last import statement
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) {
          insertIndex = i + 1;
        }
      }
      
      if (insertIndex === -1) {
        // No imports found, add after "use client"
        insertIndex = 2;
      }
      
      // Add the type definition
      const typeDefinition = `
type ${expectedPropsType} = React.ComponentProps<typeof ${kebabToPascalCase(componentName)}>;`;
      
      lines.splice(insertIndex, 0, typeDefinition);
      
      const newContent = lines.join('\n');
      writeFileSync(previewPath, newContent, "utf-8");
      updatedCount++;
    }
    
    processedCount++;
  } catch (error) {
    console.log(`Skipping ${componentName}: preview.tsx not found or error reading file`);
  }
}

console.log(`Processed ${processedCount} components, updated ${updatedCount} files`);