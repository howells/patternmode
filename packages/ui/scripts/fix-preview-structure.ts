#!/usr/bin/env tsx

/**
 * Script to fix preview.tsx files to match canonical structure
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

function kebabToPascalCase(str: string): string {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

async function findPreviewFiles(componentsDir: string): Promise<{ filePath: string; componentName: string }[]> {
  const previewFiles: { filePath: string; componentName: string }[] = [];

  async function walkDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.name === "preview.tsx") {
        const componentName = path.basename(path.dirname(fullPath));
        previewFiles.push({ filePath: fullPath, componentName });
      }
    }
  }

  await walkDir(componentsDir);
  return previewFiles;
}

async function fixPreviewFile(filePath: string, componentName: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf-8");
    let updatedContent = content;
    let hasChanges = false;

    const expectedExampleName = `${kebabToPascalCase(componentName)}Example`;
    const expectedPropsType = `${kebabToPascalCase(componentName)}ExampleProps`;

    // 1. Add "use client" if missing
    if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
      updatedContent = '"use client";\n\n' + updatedContent;
      hasChanges = true;
    }

    // 2. Ensure React import exists and is positioned correctly
    if (!updatedContent.includes("import React from")) {
      // Find position after @patternmode/ui import
      const lines = updatedContent.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('@patternmode/ui')) {
          // Find the end of this import (could be multi-line)
          let j = i;
          while (j < lines.length && !lines[j].includes(';')) {
            j++;
          }
          insertIndex = j + 1;
          break;
        }
      }

      if (insertIndex !== -1) {
        lines.splice(insertIndex, 0, '', 'import React from "react";');
        updatedContent = lines.join('\n');
        hasChanges = true;
      }
    }

    // 3. Add ExampleProps type if missing
    if (!updatedContent.includes(`type ${expectedPropsType}`)) {
      // Find a good insertion point (after imports, before function)
      const lines = updatedContent.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('import React from "react"')) {
          insertIndex = i + 1;
          break;
        }
      }

      if (insertIndex !== -1) {
        const propsType = `
type ${expectedPropsType} = {
  [key: string]: unknown;
};`;
        lines.splice(insertIndex, 0, propsType);
        updatedContent = lines.join('\n');
        hasChanges = true;
      }
    }

    // 4. Convert export const to export function if needed
    const constExportRegex = new RegExp(`export const ${expectedExampleName} = \\(`);
    if (constExportRegex.test(updatedContent)) {
      // This is a complex transformation, skip for now
      console.log(`⚠️  ${componentName}: Needs manual conversion from const to function export`);
    }

    // 5. Fix function signature to use props type
    const functionRegex = new RegExp(`export function ${expectedExampleName}\\([^)]*\\): {[^}]+}`);
    if (functionRegex.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        functionRegex,
        `export function ${expectedExampleName}({\n  ...props\n}: ${expectedPropsType}) {`
      );
      hasChanges = true;
    }

    if (hasChanges) {
      await writeFile(filePath, updatedContent, "utf-8");
      console.log(`✅ Fixed ${componentName} preview structure`);
      return true;
    } else {
      console.log(`⏭️  ${componentName}: No changes needed`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Error fixing ${componentName}:`, error);
    return false;
  }
}

async function main() {
  const componentsDir = path.join(process.cwd(), "src/components");
  
  console.log("🔍 Finding all preview.tsx files...");
  const previewFiles = await findPreviewFiles(componentsDir);
  console.log(`📁 Found ${previewFiles.length} preview.tsx files\n`);
  
  let successCount = 0;
  let skippedCount = 0;
  
  for (const { filePath, componentName } of previewFiles) {
    const result = await fixPreviewFile(filePath, componentName);
    
    if (result) {
      successCount++;
    } else {
      skippedCount++;
    }
    
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("📊 PREVIEW STRUCTURE FIX SUMMARY");
  console.log("=".repeat(80));
  console.log(`✅ Files fixed: ${successCount}/${previewFiles.length}`);
  console.log(`⏭️  Files skipped: ${skippedCount}/${previewFiles.length}`);
  
  console.log("\n🎉 Preview structure fix completed!");
  console.log("💡 Run the preview structure test to check progress.");
}

if (require.main === module) {
  main().catch(console.error);
}