/**
 * Test to validate that all examples.tsx files conform to the expected structure.
 * Based on the textarea/examples.tsx pattern, each examples file should:
 *
 * 1. Start with "use client" directive
 * 2. Import React
 * 3. Have example components (functions ending with "Example")
 * 4. Export individual example components for use in component.config.ts
 * 5. Have at least one example component
 * 6. Match the examples defined in component.config.ts
 */

import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";
import { COMPONENT_REGISTRY } from "../src/components/registry";

type ExampleValidationResult = {
  filePath: string;
  componentId: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  hasUseClient: boolean;
  hasReactImport: boolean;
  exampleComponents: string[];
  configExamples: string[];
  missingInConfig: string[];
  missingInFile: string[];
};

async function findExampleFiles(componentsDir: string): Promise<Array<{ filePath: string; componentId: string }>> {
  const exampleFiles: Array<{ filePath: string; componentId: string }> = [];

  async function walkDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      }
      else if (entry.name === "examples.tsx") {
        const componentId = path.basename(path.dirname(fullPath));
        exampleFiles.push({ filePath: fullPath, componentId });
      }
    }
  }

  await walkDir(componentsDir);
  return exampleFiles;
}

async function validateExampleFile(filePath: string, componentId: string): Promise<ExampleValidationResult> {
  const content = await readFile(filePath, "utf-8");
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for "use client" directive
  const hasUseClient = content.startsWith("\"use client\"") || content.startsWith("'use client'");
  if (!hasUseClient) {
    errors.push("Missing 'use client' directive at the top of the file");
  }

  // Check for React import
  const hasReactImport = content.includes("import React from \"react\"")
    || content.includes("import * as React from \"react\"");
  if (!hasReactImport) {
    warnings.push("Consider importing React explicitly for better compatibility");
  }

  // Find all example components (functions ending with "Example")
  // Look for both const and function exports
  const constExampleMatches = content.match(/export const (\w*Example) = \(/g) || [];
  const functionExampleMatches = content.match(/export function (\w*Example)/g) || [];

  const constExampleComponents = constExampleMatches.map(match =>
    match.replace("export const ", "").replace(" = (", ""),
  );

  const functionExampleComponents = functionExampleMatches.map(match =>
    match.replace("export function ", ""),
  );

  const exampleComponents = [...constExampleComponents, ...functionExampleComponents];

  // Check that at least one example component exists
  if (exampleComponents.length === 0) {
    errors.push("No example components found (should have at least one function ending with 'Example')");
  }

  // Get examples from component config
  const componentConfig = COMPONENT_REGISTRY[componentId];
  const configExamples = componentConfig?.examples?.map(ex => ex.component.name) || [];

  // Check alignment between file exports and config
  const missingInConfig = exampleComponents.filter(comp => !configExamples.includes(comp));
  const missingInFile = configExamples.filter(comp => !exampleComponents.includes(comp));

  if (missingInConfig.length > 0) {
    warnings.push(`Example components not in config: ${missingInConfig.join(", ")}`);
  }

  if (missingInFile.length > 0) {
    errors.push(`Config references missing examples: ${missingInFile.join(", ")}`);
  }

  // Check for TypeScript usage (props interfaces/types)
  const hasTypeScript = /interface\s+\w+Props/.test(content) || /type\s+\w+Props\s*=/.test(content);
  if (!hasTypeScript && exampleComponents.length > 0) {
    warnings.push("Consider using TypeScript prop types for better examples");
  }

  // Check for proper JSDoc on example components
  const hasJSDocExamples = /\/\*\*[\s\S]*?\*\/\s*export\s+(?:const|function)\s+\w*Example/.test(content);
  if (!hasJSDocExamples && exampleComponents.length > 0) {
    warnings.push("Consider adding JSDoc comments to example components");
  }

  const isValid = errors.length === 0;

  return {
    filePath,
    componentId,
    isValid,
    errors,
    warnings,
    hasUseClient,
    hasReactImport,
    exampleComponents,
    configExamples,
    missingInConfig,
    missingInFile,
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

    for (const { filePath, componentId } of examplesFiles) {
      const result = await validateExampleFile(filePath, componentId);
      results.push(result);

      if (!result.isValid) {
        invalidFiles.push(result.filePath);
      }
    }

    // Log detailed results
    const separator = "=".repeat(80);
    console.log(`\n${separator}`);
    console.log("EXAMPLES STRUCTURE VALIDATION REPORT");
    console.log(separator);

    const validFiles = results.filter(r => r.isValid);
    const invalidFilesResults = results.filter(r => !r.isValid);

    console.log(`\n✅ Valid files: ${validFiles.length}/${results.length}`);
    console.log(`❌ Invalid files: ${invalidFilesResults.length}/${results.length}`);

    if (invalidFilesResults.length > 0) {
      console.log(`\n❌ INVALID FILES:`);

      for (const result of invalidFilesResults) {
        const relativePath = path.relative(process.cwd(), result.filePath);
        console.log(`\n📁 ${relativePath} (${result.componentId})`);

        if (result.errors.length > 0) {
          console.log("  Errors:");
          result.errors.forEach(error => console.log(`    • ${error}`));
        }

        if (result.warnings.length > 0) {
          console.log("  Warnings:");
          result.warnings.forEach(warning => console.log(`    ⚠ ${warning}`));
        }

        console.log(`  File exports: ${result.exampleComponents.join(", ") || "none"}`);
        console.log(`  Config expects: ${result.configExamples.join(", ") || "none"}`);
      }
    }

    // Show alignment issues
    const alignmentIssues = results.filter(r => r.missingInConfig.length > 0 || r.missingInFile.length > 0);
    if (alignmentIssues.length > 0) {
      console.log(`\n⚠️  CONFIG ALIGNMENT ISSUES (${alignmentIssues.length}):`);
      alignmentIssues.forEach((result) => {
        const relativePath = path.relative(process.cwd(), result.filePath);
        console.log(`📁 ${relativePath}:`);
        if (result.missingInConfig.length > 0) {
          console.log(`  • Extra in file: ${result.missingInConfig.join(", ")}`);
        }
        if (result.missingInFile.length > 0) {
          console.log(`  • Missing from file: ${result.missingInFile.join(", ")}`);
        }
      });
    }

    // Show summary statistics
    console.log(`\n📊 STATISTICS:`);
    const totalExamples = results.reduce((sum, r) => sum + r.exampleComponents.length, 0);
    const filesWithUseClient = results.filter(r => r.hasUseClient).length;
    const filesWithReactImport = results.filter(r => r.hasReactImport).length;
    const filesWithConfigAlignment = results.filter(r => r.missingInConfig.length === 0 && r.missingInFile.length === 0).length;

    console.log(`Total example components: ${totalExamples}`);
    console.log(`Files with "use client": ${filesWithUseClient}/${results.length} (${Math.round(filesWithUseClient / results.length * 100)}%)`);
    console.log(`Files with React import: ${filesWithReactImport}/${results.length} (${Math.round(filesWithReactImport / results.length * 100)}%)`);
    console.log(`Files with perfect config alignment: ${filesWithConfigAlignment}/${results.length} (${Math.round(filesWithConfigAlignment / results.length * 100)}%)`);

    console.log(`\n${separator}`);

    // Test passes for reporting purposes - we want to see all issues
    expect(results.length).toBeGreaterThan(0);
  });

  it("should enforce strict requirements for examples files", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const examplesFiles = await findExampleFiles(componentsDir);

    const failingComponents: string[] = [];

    for (const { filePath, componentId } of examplesFiles) {
      const result = await validateExampleFile(filePath, componentId);

      // Strict requirements that should cause test failure
      if (!result.hasUseClient) {
        failingComponents.push(`${componentId}: Missing 'use client' directive`);
      }

      if (result.exampleComponents.length === 0) {
        failingComponents.push(`${componentId}: No example components found`);
      }

      if (result.missingInFile.length > 0) {
        failingComponents.push(`${componentId}: Config references missing examples: ${result.missingInFile.join(", ")}`);
      }
    }

    if (failingComponents.length > 0) {
      console.log(`\n❌ STRICT REQUIREMENT FAILURES:`);
      failingComponents.forEach(failure => console.log(`  • ${failure}`));
    }

    // This test should fail if there are strict requirement violations
    expect(failingComponents, `Found ${failingComponents.length} components with strict requirement failures`).toHaveLength(0);
  });

  it("should validate that all registry components have examples files", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const examplesFiles = await findExampleFiles(componentsDir);
    const foundComponentIds = new Set(examplesFiles.map(f => f.componentId));

    const registryComponentIds = Object.keys(COMPONENT_REGISTRY);
    const missingExampleFiles = registryComponentIds.filter(id => !foundComponentIds.has(id));

    if (missingExampleFiles.length > 0) {
      console.log(`\n❌ COMPONENTS MISSING EXAMPLES FILES:`);
      missingExampleFiles.forEach(id => console.log(`  • ${id}`));
    }

    expect(missingExampleFiles, `Components missing examples.tsx files: ${missingExampleFiles.join(", ")}`).toHaveLength(0);
  });

  it("should validate specific example file patterns", async () => {
    // Test the known good example (textarea)
    const textareaPath = path.join(process.cwd(), "src/components/textarea/examples.tsx");
    const result = await validateExampleFile(textareaPath, "textarea");

    expect(result.isValid).toBe(true);
    expect(result.exampleComponents.length).toBeGreaterThan(0);
    expect(result.hasUseClient).toBe(true);
  });
});
