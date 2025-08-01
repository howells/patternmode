#!/usr/bin/env tsx

/**
 * Script to update all examples.tsx files to match the new structure pattern.
 * 
 * This script will:
 * 1. Add "use client" directive if missing
 * 2. Add ComponentExample type import if missing
 * 3. Find all example component functions (ending with "Example")
 * 4. Generate EXAMPLES array with inline metadata
 * 5. Replace or add the EXAMPLES export
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

type ExampleComponent = {
  name: string;
  functionCode: string;
  existingMeta?: {
    title?: string;
    description?: string;
  };
};

type UpdateResult = {
  filePath: string;
  updated: boolean;
  errors: string[];
  changes: string[];
};

/**
 * Find all examples.tsx files in the components directory
 */
async function findExampleFiles(componentsDir: string): Promise<string[]> {
  const exampleFiles: string[] = [];

  async function walkDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.name === "examples.tsx") {
        exampleFiles.push(fullPath);
      }
    }
  }

  await walkDir(componentsDir);
  return exampleFiles;
}

/**
 * Extract existing meta properties from content
 */
function extractExistingMeta(content: string, componentName: string): { title?: string; description?: string } | undefined {
  // Look for ComponentName.meta = { title: "...", description: "..." };
  const metaRegex = new RegExp(`${componentName}\\.meta = \\{([\\s\\S]*?)\\};`, 'g');
  const match = metaRegex.exec(content);
  
  if (!match) return undefined;
  
  const metaContent = match[1];
  const titleMatch = metaContent.match(/title:\s*["']([^"']+)["']/);
  const descriptionMatch = metaContent.match(/description:\s*["']([^"']+)["']/);
  
  return {
    title: titleMatch?.[1],
    description: descriptionMatch?.[1],
  };
}

/**
 * Extract example components from file content using multiple strategies
 */
function extractExampleComponents(content: string): ExampleComponent[] {
  const components: ExampleComponent[] = [];
  
  // Strategy 1: Find all exports that contain "Example" in the name (const exports)
  const exportMatches = content.match(/export const (\w*Example\w*)/g);
  if (exportMatches) {
    for (const match of exportMatches) {
      const name = match.replace('export const ', '');
      if (!components.find(c => c.name === name)) {
        const existingMeta = extractExistingMeta(content, name);
        components.push({
          name,
          functionCode: match, // We'll just use the declaration for now
          existingMeta,
        });
      }
    }
  }

  // Strategy 1.5: Find function exports that contain "Example" in the name
  const functionExportMatches = content.match(/export function (\w*[Ee]xample\w*)/g);
  if (functionExportMatches) {
    for (const match of functionExportMatches) {
      const name = match.replace('export function ', '').replace(/\(.*$/, '');
      if (!components.find(c => c.name === name)) {
        const existingMeta = extractExistingMeta(content, name);
        components.push({
          name,
          functionCode: match, // We'll just use the declaration for now
          existingMeta,
        });
      }
    }
  }
  
  // Strategy 2: Enhanced patterns for full function matching
  const patterns = [
    // Pattern 1: Arrow functions with braces (multi-line)
    /export const (\w*[Ee]xample\w*) = \([^)]*\) => \{[\s\S]*?\n\};/g,
    // Pattern 2: Arrow functions without braces (single expression)
    /export const (\w*[Ee]xample\w*) = \([^)]*\) => [^;]+;/g,
    // Pattern 3: Parenthesized expressions (single line)
    /export const (\w*[Ee]xample\w*) = \([^)]*\) => \([^)]+\);/g,
    // Pattern 4: Multi-line parenthesized expressions
    /export const (\w*[Ee]xample\w*) = \([^)]*\) => \([\s\S]*?\n\);/g,
    // Pattern 5: Function declarations (multi-line)
    /export function (\w*[Ee]xample\w*)\([^)]*\) \{[\s\S]*?\n\}/g,
    // Pattern 6: Any export ending with component names (non-Example pattern)
    /export (?:const|function) (\w*(?:Component|View|Demo|Widget))\b/g,
  ];
  
  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const [fullMatch, name] = match;
      // Update existing component with full function code
      const existing = components.find(c => c.name === name);
      if (existing) {
        existing.functionCode = fullMatch;
      } else {
        const existingMeta = extractExistingMeta(content, name);
        components.push({
          name,
          functionCode: fullMatch,
          existingMeta,
        });
      }
    }
  }

  return components;
}

/**
 * Generate title from component name
 */
function generateTitle(componentName: string): string {
  // Remove "Example" suffix and convert camelCase to Title Case
  const baseName = componentName.replace(/Example$/, "");
  
  // Handle special cases
  const specialCases: Record<string, string> = {
    "Default": "Default",
    "WithContent": "With Content",
    "WithError": "Error State",
    "WithIcons": "With Icons",
    "WithLabels": "With Labels",
    "MultipleOpen": "Multiple Open",
    "MixedContent": "Mixed Content",
    "SizeVariants": "Size Variants",
    "WithInitialValues": "With Initial Values",
    "WithRowConstraints": "With Row Constraints",
    "WithHeightCallback": "Height Change Tracking",
    "FormIntegration": "Form Integration",
    "FixedHeight": "Fixed Height",
    "Performance": "Performance Optimization",
  };

  if (specialCases[baseName]) {
    return specialCases[baseName];
  }

  // Convert camelCase to space-separated words
  return baseName.replace(/([A-Z])/g, " $1").trim();
}

/**
 * Generate description from component name and title
 */
function generateDescription(componentName: string, title: string): string {
  const baseName = componentName.replace(/Example$/, "");
  
  // Handle special descriptions
  const specialDescriptions: Record<string, string> = {
    "Default": "Basic usage example",
    "WithContent": "Example with pre-filled content",
    "WithError": "Example showing error state styling",
    "WithIcons": "Example with icon integration",
    "WithLabels": "Example with custom labels",
    "MultipleOpen": "Example allowing multiple items to be open",
    "MixedContent": "Example with mixed content types",
    "SizeVariants": "Example showing different size options",
    "WithInitialValues": "Example with pre-set initial values",
    "WithRowConstraints": "Example with minimum and maximum constraints",
    "WithHeightCallback": "Example with height change tracking",
    "FormIntegration": "Complete form integration example",
    "FixedHeight": "Example with fixed dimensions",
    "Performance": "Performance optimized example",
  };

  if (specialDescriptions[baseName]) {
    return specialDescriptions[baseName];
  }

  return `${title} example`;
}

/**
 * Update a single examples.tsx file
 */
async function updateExampleFile(filePath: string): Promise<UpdateResult> {
  const result: UpdateResult = {
    filePath,
    updated: false,
    errors: [],
    changes: [],
  };

  try {
    const content = await readFile(filePath, "utf-8");
    let updatedContent = content;
    
    // 1. Add "use client" directive if missing
    if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
      updatedContent = '"use client";\n\n' + updatedContent;
      result.changes.push("Added 'use client' directive");
    }

    // 2. Add ComponentExample import if missing
    const hasComponentExampleImport = content.includes("import type { ComponentExample }") || 
                                    content.includes("import { ComponentExample }");
    
    if (!hasComponentExampleImport) {
      // Find the first import and add after it
      const importRegex = /^import[^;]+;$/m;
      const match = importRegex.exec(updatedContent);
      
      if (match) {
        const importEnd = match.index + match[0].length;
        updatedContent = updatedContent.slice(0, importEnd) + 
                        '\nimport type { ComponentExample } from "../../lib/component-config-types";' +
                        updatedContent.slice(importEnd);
        result.changes.push("Added ComponentExample type import");
      } else {
        // No imports found, add at the beginning after "use client"
        const useClientMatch = updatedContent.match(/^["']use client["'];\n/);
        if (useClientMatch) {
          updatedContent = updatedContent.replace(
            /^(["']use client["'];\n)/,
            '$1\nimport type { ComponentExample } from "../../lib/component-config-types";\n'
          );
          result.changes.push("Added ComponentExample type import after use client");
        }
      }
    }

    // 3. Extract example components
    const components = extractExampleComponents(content);
    
    if (components.length === 0) {
      result.errors.push("No example components found");
      return result;
    }

    // 4. Generate EXAMPLES array
    const examplesArray = components.map(component => {
      // Use existing metadata if available, otherwise generate
      const title = component.existingMeta?.title || generateTitle(component.name);
      const description = component.existingMeta?.description || generateDescription(component.name, title);
      
      return `  {
    id: "${component.name}",
    title: "${title}",
    description: "${description}",
    component: ${component.name},
  }`;
    }).join(",\n");

    const examplesExport = `
/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
${examplesArray},
];
`;

    // 5. Remove old .meta properties and legacy registry code
    components.forEach(component => {
      if (component.existingMeta) {
        const metaRegex = new RegExp(`\\n\\n${component.name}\\.meta = \\{[\\s\\S]*?\\};`, 'g');
        updatedContent = updatedContent.replace(metaRegex, '');
        result.changes.push(`Removed .meta property for ${component.name}`);
      }
    });

    // Remove old registry functions and exports
    const oldRegistryPatterns = [
      /\/\*\*[\s\S]*?\*\/\s*function createExamplesRegistry\(\)[\s\S]*?return examples;\s*\}/g,
      /\/\*\*[\s\S]*?\*\/\s*export const \w+_EXAMPLES: ComponentExample\[\] = createExamplesRegistry\(\);/g,
      /export const \w+_EXAMPLES: ComponentExample\[\] = createExamplesRegistry\(\);/g,
      // Remove old static COMPONENT_EXAMPLES exports
      /\/\/ Export examples in the format expected by the web app[\s\S]*?export const \w+_EXAMPLES = \[[\s\S]*?\];/g,
      /export const \w+_EXAMPLES = \[[\s\S]*?\];/g,
    ];

    oldRegistryPatterns.forEach(pattern => {
      if (pattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(pattern, '');
        result.changes.push("Removed old registry function/export");
      }
    });

    // 6. Check if EXAMPLES export already exists and replace/append
    const hasExamplesExport = content.includes("export const EXAMPLES:");
    
    if (hasExamplesExport) {
      // Replace existing EXAMPLES export
      updatedContent = updatedContent.replace(
        /\/\*\*[\s\S]*?\*\/\s*export const EXAMPLES: ComponentExample\[\] = \[[\s\S]*?\];/,
        examplesExport.trim()
      );
      result.changes.push("Updated existing EXAMPLES export");
    } else {
      // Append new EXAMPLES export at the end
      updatedContent = updatedContent.trimEnd() + '\n' + examplesExport;
      result.changes.push("Added new EXAMPLES export");
    }

    // Write the updated content
    if (updatedContent !== content) {
      await writeFile(filePath, updatedContent, "utf-8");
      result.updated = true;
      console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
      console.log(`   Changes: ${result.changes.join(", ")}`);
      console.log(`   Components: ${components.map(c => c.name).join(", ")}`);
    } else {
      console.log(`⏭️  Skipped: ${path.relative(process.cwd(), filePath)} (no changes needed)`);
    }

  } catch (error) {
    result.errors.push(`Failed to process file: ${error}`);
    console.error(`❌ Error processing ${filePath}:`, error);
  }

  return result;
}

/**
 * Main function to update all examples files
 */
async function main() {
  const args = process.argv.slice(2);
  const testMode = args.includes("--test");
  const testFile = args.find(arg => arg.startsWith("--file="))?.split("=")[1];
  
  const componentsDir = path.join(process.cwd(), "src/components");
  
  console.log("🔍 Finding all examples.tsx files...");
  const exampleFiles = await findExampleFiles(componentsDir);
  
  console.log(`📁 Found ${exampleFiles.length} examples.tsx files\n`);
  
  let filesToUpdate: string[];
  
  if (testFile) {
    // Test specific file
    const targetFile = exampleFiles.find(file => file.includes(testFile));
    if (!targetFile) {
      console.error(`❌ File not found: ${testFile}`);
      process.exit(1);
    }
    filesToUpdate = [targetFile];
    console.log(`🧪 Testing on single file: ${path.relative(process.cwd(), targetFile)}\n`);
  } else if (testMode) {
    // Test mode - just process a few files
    filesToUpdate = exampleFiles
      .filter(file => !file.includes("textarea/examples.tsx"))
      .slice(0, 3);
    console.log(`🧪 Test mode: Processing first 3 files...\n`);
  } else {
    // Filter out textarea as it's already updated
    filesToUpdate = exampleFiles.filter(file => !file.includes("textarea/examples.tsx"));
    console.log(`🚀 Updating ${filesToUpdate.length} files (excluding textarea)...\n`);
  }
  
  const results: UpdateResult[] = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (const filePath of filesToUpdate) {
    const result = await updateExampleFile(filePath);
    results.push(result);
    
    if (result.updated && result.errors.length === 0) {
      successCount++;
    } else if (result.errors.length > 0) {
      errorCount++;
    }
    
    // Add a small delay to avoid overwhelming the file system
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 UPDATE SUMMARY");
  console.log("=".repeat(80));
  console.log(`✅ Successfully updated: ${successCount}/${filesToUpdate.length}`);
  console.log(`❌ Errors encountered: ${errorCount}/${filesToUpdate.length}`);
  console.log(`⏭️  No changes needed: ${filesToUpdate.length - successCount - errorCount}/${filesToUpdate.length}`);
  
  if (errorCount > 0) {
    console.log("\n❌ FILES WITH ERRORS:");
    results.forEach(result => {
      if (result.errors.length > 0) {
        console.log(`   ${path.relative(process.cwd(), result.filePath)}: ${result.errors.join(", ")}`);
      }
    });
  }
  
  console.log("\n🎉 Update process completed!");
  console.log("💡 Run the examples structure test to verify all files now pass.");
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}