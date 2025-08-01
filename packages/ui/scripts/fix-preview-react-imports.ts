#!/usr/bin/env tsx

/**
 * Script to add missing React imports to preview.tsx files
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

async function findPreviewFiles(componentsDir: string): Promise<string[]> {
  const previewFiles: string[] = [];

  async function walkDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.name === "preview.tsx") {
        previewFiles.push(fullPath);
      }
    }
  }

  await walkDir(componentsDir);
  return previewFiles;
}

async function addReactImportIfMissing(filePath: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Check if React import already exists
    if (content.includes("import React from") || content.includes("import * as React from")) {
      return false; // No changes needed
    }
    
    // Find the position after the first import to add React import
    const lines = content.split('\n');
    let importInsertIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      // Look for the first import from @patternmode/ui
      if (lines[i].includes('import') && lines[i].includes('@patternmode/ui')) {
        importInsertIndex = i + 1;
        
        // Skip any following empty lines
        while (importInsertIndex < lines.length && lines[importInsertIndex].trim() === '') {
          importInsertIndex++;
        }
        break;
      }
    }
    
    if (importInsertIndex === -1) {
      console.log(`⚠️  Could not find import insertion point in ${path.relative(process.cwd(), filePath)}`);
      return false;
    }
    
    // Insert React import
    lines.splice(importInsertIndex, 0, '', 'import React from "react";');
    
    const updatedContent = lines.join('\n');
    await writeFile(filePath, updatedContent, "utf-8");
    console.log(`✅ Added React import to ${path.relative(process.cwd(), filePath)}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
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
  let errorCount = 0;
  
  for (const filePath of previewFiles) {
    const result = await addReactImportIfMissing(filePath);
    
    if (result) {
      successCount++;
    } else {
      skippedCount++;
    }
    
    // Small delay to avoid overwhelming the file system
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("📊 REACT IMPORT SUMMARY");
  console.log("=".repeat(80));
  console.log(`✅ React imports added: ${successCount}/${previewFiles.length}`);
  console.log(`⏭️  Files skipped (already have React): ${skippedCount}/${previewFiles.length}`);
  console.log(`❌ Errors: ${errorCount}/${previewFiles.length}`);
  
  console.log("\n🎉 React import process completed!");
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}