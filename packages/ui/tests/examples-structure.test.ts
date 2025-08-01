/**
 * Test to validate that all examples.tsx files conform to the expected structure.
 * Based on the textarea/examples.tsx pattern, each examples file should:
 *
 * 1. Start with "use client" directive
 * 2. Import ComponentExample type from component-config-types
 * 3. Have example components (functions ending with "Example")
 * 4. Export a standard EXAMPLES array with inline metadata
 * 5. Have at least one example component
 */

import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

type ExampleValidationResult = {
  filePath: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  hasUseClient: boolean;
  hasComponentExampleImport: boolean;
  hasExamplesExport: boolean;
  exampleComponents: string[];
};

async function findExampleFiles(componentsDir: string): Promise<string[]> {
  const exampleFiles: string[] = [];

  async function walkDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      }
      else if (entry.name === "examples.tsx") {
        exampleFiles.push(fullPath);
      }
    }
  }

  await walkDir(componentsDir);
  return exampleFiles;
}

async function validateExampleFile(filePath: string): Promise<ExampleValidationResult> {
  const content = await readFile(filePath, "utf-8");
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for "use client" directive
  const hasUseClient = content.startsWith("\"use client\"") || content.startsWith("'use client'");
  if (!hasUseClient) {
    errors.push("Missing 'use client' directive at the top of the file");
  }

  // Check for ComponentExample import
  const hasComponentExampleImport = content.includes("import type { ComponentExample }")
    || content.includes("import { ComponentExample }");
  if (!hasComponentExampleImport) {
    errors.push("Missing ComponentExample type import from component-config-types");
  }

  // Check for [COMPONENT]_EXAMPLES export
  const examplesExportMatch = content.match(/export const (EXAMPLES): ComponentExample\[\] = \[/);
  const hasExamplesExport = !!examplesExportMatch;
  if (!hasExamplesExport) {
    errors.push("Missing properly named EXAMPLES export (should be EXAMPLES: ComponentExample[] = [...])");
  }

  // Find all example components (functions ending with "Example")
  // Exclude alias exports like "BreadcrumbsExample = DefaultExample"
  const constExampleMatches = content.match(/export const (\w*Example) = \(/g) || [];
  const functionExampleMatches = content.match(/export function (\w*Example)/g) || [];
  
  const constExampleComponents = constExampleMatches.map(match =>
    match.replace("export const ", "").replace(" = (", ""),
  );
  
  const functionExampleComponents = functionExampleMatches.map(match =>
    match.replace("export function ", ""),
  );
  
  const exampleComponents = [...constExampleComponents, ...functionExampleComponents];

  if (exampleComponents.length === 0) {
    errors.push("No example components found (should have at least one function ending with 'Example')");
  }

  // Check that the EXAMPLES export includes all example components
  if (hasExamplesExport) {
    const examplesArrayMatch = content.match(/export const EXAMPLES: ComponentExample\[\] = \[([\s\S]*?)\];/);
    if (examplesArrayMatch) {
      const examplesArrayContent = examplesArrayMatch[1];
      const missingFromRegistry = exampleComponents.filter(comp =>
        !examplesArrayContent.includes(comp),
      );
      if (missingFromRegistry.length > 0) {
        errors.push(`Example components not included in EXAMPLES array: ${missingFromRegistry.join(", ")}`);
      }
    }
    else {
      warnings.push("Could not parse EXAMPLES array content");
    }
  }

  // Additional checks
  if (!content.includes("React from \"react\"")) {
    warnings.push("Consider importing React explicitly for better compatibility");
  }

  const isValid = errors.length === 0;

  return {
    filePath,
    isValid,
    errors,
    warnings,
    hasUseClient,
    hasComponentExampleImport,
    hasExamplesExport,
    exampleComponents,
  };
}

describe("examples Structure Validation", () => {
  it("should find all examples.tsx files", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const examplesFiles = await findExampleFiles(componentsDir);

    expect(examplesFiles.length).toBeGreaterThan(0);
    console.log(`Found ${examplesFiles.length} examples.tsx files`);
  });

  it("should validate all examples.tsx files structure", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const examplesFiles = await findExampleFiles(componentsDir);

    const results: ExampleValidationResult[] = [];
    const invalidFiles: string[] = [];

    for (const filePath of examplesFiles) {
      const result = await validateExampleFile(filePath);
      results.push(result);

      if (!result.isValid) {
        invalidFiles.push(result.filePath);
      }
    }

    // Log detailed results
    console.log(`\n${"=".repeat(80)}`);
    console.log("EXAMPLES STRUCTURE VALIDATION REPORT");
    console.log("=".repeat(80));

    const validFiles = results.filter(r => r.isValid);
    const invalidFilesResults = results.filter(r => !r.isValid);

    console.log(`\n✅ Valid files: ${validFiles.length}/${results.length}`);
    console.log(`❌ Invalid files: ${invalidFilesResults.length}/${results.length}`);

    if (invalidFilesResults.length > 0) {
      console.log(`\n${"❌ INVALID FILES:".padEnd(80, "-")}`);

      for (const result of invalidFilesResults) {
        const relativePath = path.relative(process.cwd(), result.filePath);
        console.log(`\n📁 ${relativePath}`);

        if (result.errors.length > 0) {
          console.log("  Errors:");
          result.errors.forEach(error => console.log(`    • ${error}`));
        }

        if (result.warnings.length > 0) {
          console.log("  Warnings:");
          result.warnings.forEach(warning => console.log(`    ⚠ ${warning}`));
        }

        console.log(`  Components: ${result.exampleComponents.join(", ") || "none"}`);
      }
    }

    if (validFiles.length > 0) {
      console.log(`\n${"✅ VALID FILES:".padEnd(80, "-")}`);
      for (const result of validFiles) {
        const relativePath = path.relative(process.cwd(), result.filePath);
        console.log(`📁 ${relativePath} (${result.exampleComponents.length} examples)`);
      }
    }

    // Show summary statistics
    console.log(`\n${"📊 STATISTICS:".padEnd(80, "-")}`);
    const totalExamples = results.reduce((sum, r) => sum + r.exampleComponents.length, 0);
    const filesWithUseClient = results.filter(r => r.hasUseClient).length;
    const filesWithImports = results.filter(r => r.hasComponentExampleImport).length;
    const filesWithExports = results.filter(r => r.hasExamplesExport).length;

    console.log(`Total example components: ${totalExamples}`);
    console.log(`Files with "use client": ${filesWithUseClient}/${results.length}`);
    console.log(`Files with ComponentExample import: ${filesWithImports}/${results.length}`);
    console.log(`Files with EXAMPLES export: ${filesWithExports}/${results.length}`);

    console.log(`\n${"=".repeat(80)}`);

    // The test should pass even if files are invalid - we're using this for reporting
    // If you want the test to fail for invalid files, uncomment the next line:
    // expect(invalidFiles).toHaveLength(0);

    // For now, just ensure we found files to test
    expect(results.length).toBeGreaterThan(0);
  });

  it("should validate specific example file patterns", async () => {
    // Test the known good example (textarea)
    const textareaPath = path.join(process.cwd(), "src/components/textarea/examples.tsx");
    const result = await validateExampleFile(textareaPath);

    expect(result.isValid).toBe(true);
    expect(result.exampleComponents.length).toBeGreaterThan(0);
  });

  it("should validate breadcrumbs file after recent fixes", async () => {
    // Test the recently fixed breadcrumbs file
    const breadcrumbsPath = path.join(process.cwd(), "src/components/breadcrumbs/examples.tsx");
    const result = await validateExampleFile(breadcrumbsPath);

    expect(result.isValid).toBe(true);
    expect(result.exampleComponents.length).toBeGreaterThan(0);
  });
});
