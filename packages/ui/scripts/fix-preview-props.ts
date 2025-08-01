#!/usr/bin/env tsx

/**
 * Script to fix preview components to use proper component prop types
 * instead of React.ComponentProps<typeof Component>
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const COMPONENTS_DIR = join(__dirname, "../src/components");

function getComponentDirectories(): string[] {
  return readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();
}

function findPropsTypeName(componentFileContent: string, componentName: string): string | null {
  // Look for type definitions that match the component
  const patterns = [
    // type ComponentProps = ... or type ComponentProps<T> = ...
    new RegExp(`type\\s+${componentName}Props\\s*(<[^>]*>)?\\s*=`, 'i'),
    // interface ComponentProps or interface ComponentProps<T>
    new RegExp(`interface\\s+${componentName}Props\\s*(<[^>]*>)?\\s*{`, 'i'),
    // exported type
    new RegExp(`export\\s+type\\s+${componentName}Props\\s*(<[^>]*>)?\\s*=`, 'i'),
    // exported interface
    new RegExp(`export\\s+interface\\s+${componentName}Props\\s*(<[^>]*>)?\\s*{`, 'i'),
  ];

  for (const pattern of patterns) {
    if (pattern.test(componentFileContent)) {
      return `${componentName}Props`;
    }
  }

  return null;
}

function getComponentName(dirName: string): string {
  // Convert kebab-case to PascalCase
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function updatePreviewFile(componentDir: string) {
  const previewPath = join(COMPONENTS_DIR, componentDir, "preview.tsx");
  const componentPath = join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);
  
  try {
    const previewContent = readFileSync(previewPath, "utf-8");
    const componentContent = readFileSync(componentPath, "utf-8");
    
    const componentName = getComponentName(componentDir);
    let propsTypeName = findPropsTypeName(componentContent, componentName);
    
    // Check if already using proper props type
    if (propsTypeName && previewContent.includes(`import type { ${propsTypeName} }`)) {
      console.log(`✅ ${componentDir} already using proper props type`);
      return true;
    }

    // If no explicit props type found, check if using Base UI directly
    if (!propsTypeName) {
      // Check if the component uses React.ComponentPropsWithoutRef pattern
      const baseUIPattern = /React\.ComponentPropsWithoutRef<typeof\s+(\w+)/;
      const baseUIMatch = componentContent.match(baseUIPattern);
      
      if (baseUIMatch) {
        // For Base UI components, we'll use React.ComponentProps<typeof ComponentName>
        // since they don't define custom props types
        console.log(`📝 ${componentDir} uses Base UI directly, keeping React.ComponentProps pattern`);
        return true;
      }
      
      console.log(`⚠️  Could not find props type for ${componentName} (${componentDir})`);
      return false;
    }

    // Replace React.ComponentProps<typeof ComponentName> with proper props type
    let updatedContent = previewContent;
    
    // Add import for props type
    const importMatch = updatedContent.match(/import { ([^}]+) } from "@patternmode\/ui";/);
    if (importMatch) {
      updatedContent = updatedContent.replace(
        /import { ([^}]+) } from "@patternmode\/ui";/,
        `import { $1 } from "@patternmode/ui";\nimport type { ${propsTypeName} } from "./${componentDir}";`
      );
    }

    // Replace type definition
    updatedContent = updatedContent.replace(
      /type\s+\w+ExampleProps\s*=\s*React\.ComponentProps<typeof\s+\w+>;/,
      `type ${componentName}ExampleProps = ${propsTypeName};`
    );

    // Replace function parameter type
    updatedContent = updatedContent.replace(
      new RegExp(`export function ${componentName}Example\\(props: React\\.ComponentProps<typeof ${componentName}>\\)`),
      `export function ${componentName}Example(props: ${propsTypeName})`
    );

    // Write updated content
    writeFileSync(previewPath, updatedContent);
    console.log(`✅ Updated ${componentDir} to use ${propsTypeName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating ${componentDir}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🔧 Fixing preview component prop types...\n");
  
  const componentDirs = getComponentDirectories();
  let successCount = 0;
  let errorCount = 0;
  
  for (const componentDir of componentDirs) {
    const success = updatePreviewFile(componentDir);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Total components: ${componentDirs.length}`);
}

main().catch(console.error);