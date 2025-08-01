#!/usr/bin/env tsx

/**
 * Script to convert preview.tsx files to single-instance pattern
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

async function hasMultipleInstances(content: string): Promise<boolean> {
  // Look for patterns that suggest multiple instances
  const patterns = [
    /space-y-\d+/,           // vertical spacing
    /flex.*gap-\d+/,         // flex with gap
    /grid.*gap-\d+/,         // grid with gap
    /<\w+[^>]*>\s*<\w+[^>]*>/g, // Multiple JSX elements at same level
  ];
  
  return patterns.some(pattern => pattern.test(content));
}

function extractMainComponent(componentName: string, content: string): string | null {
  // Try to find the main component import
  const pascalName = kebabToPascalCase(componentName);
  
  // Look for import patterns
  const importRegex = new RegExp(`import.*{[^}]*\\b${pascalName}\\b[^}]*}.*from.*@patternmode/ui`);
  const importMatch = content.match(importRegex);
  
  if (importMatch) {
    return pascalName;
  }
  
  // Try some common patterns
  const commonPatterns = [
    pascalName,
    `${pascalName}Root`,
    `${pascalName}Container`,
  ];
  
  for (const pattern of commonPatterns) {
    if (content.includes(`<${pattern}`)) {
      return pattern;
    }
  }
  
  return null;
}

async function convertToSingleInstance(filePath: string, componentName: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Skip if already using single instance pattern
    if (content.includes(`React.ComponentProps<typeof`)) {
      console.log(`⏭️  ${componentName}: Already using single instance pattern`);
      return false;
    }
    
    // Check if it has multiple instances
    if (!(await hasMultipleInstances(content))) {
      console.log(`⏭️  ${componentName}: Already appears to be single instance`);
      return false;
    }
    
    const mainComponent = extractMainComponent(componentName, content);
    if (!mainComponent) {
      console.log(`⚠️  ${componentName}: Could not identify main component`);
      return false;
    }
    
    const exampleName = `${kebabToPascalCase(componentName)}Example`;
    
    // Create the new single instance content
    const newContent = `"use client";

import { ${mainComponent} } from "@patternmode/ui";

import React from "react";

export function ${exampleName}(props: React.ComponentProps<typeof ${mainComponent}>) {
  return <${mainComponent} {...props} />;
}
`;
    
    await writeFile(filePath, newContent, "utf-8");
    console.log(`✅ Converted ${componentName} to single instance pattern`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error converting ${componentName}:`, error);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const testMode = args.includes("--test");
  const specific = args.find(arg => arg.startsWith("--component="))?.split("=")[1];
  
  const componentsDir = path.join(process.cwd(), "src/components");
  
  console.log("🔍 Finding all preview.tsx files...");
  let previewFiles = await findPreviewFiles(componentsDir);
  
  if (specific) {
    previewFiles = previewFiles.filter(({ componentName }) => componentName === specific);
    console.log(`📁 Focusing on component: ${specific}\n`);
  } else if (testMode) {
    previewFiles = previewFiles.slice(0, 5);
    console.log(`🧪 Test mode: Processing first 5 files\n`);
  } else {
    console.log(`📁 Found ${previewFiles.length} preview.tsx files\n`);
  }
  
  let successCount = 0;
  let skippedCount = 0;
  
  for (const { filePath, componentName } of previewFiles) {
    const result = await convertToSingleInstance(filePath, componentName);
    
    if (result) {
      successCount++;
    } else {
      skippedCount++;
    }
    
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("📊 SINGLE INSTANCE CONVERSION SUMMARY");
  console.log("=".repeat(80));
  console.log(`✅ Files converted: ${successCount}/${previewFiles.length}`);
  console.log(`⏭️  Files skipped: ${skippedCount}/${previewFiles.length}`);
  
  console.log("\n🎉 Single instance conversion completed!");
  console.log("💡 Run the preview structure test to check progress.");
}

if (require.main === module) {
  main().catch(console.error);
}