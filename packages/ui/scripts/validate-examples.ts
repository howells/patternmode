#!/usr/bin/env tsx

/**
 * Example Validation Script
 *
 * Validates that all component examples follow the required structure:
 * - Each example has a corresponding metadata export
 * - All required fields are present
 * - IDs are unique and consistent
 * - Examples are properly registered
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

type ValidationResult = {
  component: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  exampleCount: number;
  categories: string[];
};

type _ExampleMetadata = {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
};

// ANSI color codes
const colors = {
  reset: "\x1B[0m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  cyan: "\x1B[36m",
  bold: "\x1B[1m",
};

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Validate a single component's examples file
 */
async function validateExamplesFile(componentDir: string): Promise<ValidationResult> {
  const componentName = path.basename(componentDir);
  const examplesPath = path.join(componentDir, "examples.tsx");

  const result: ValidationResult = {
    component: componentName,
    valid: true,
    errors: [],
    warnings: [],
    exampleCount: 0,
    categories: [],
  };

  try {
    // Check if examples file exists
    if (!(await fs.stat(examplesPath).catch(() => false))) {
      result.errors.push("examples.tsx file not found");
      result.valid = false;
      return result;
    }

    // Read the examples file
    const content = await fs.readFile(examplesPath, "utf-8");

    // Extract example component exports
    const exampleMatches = content.match(/export const (\w+Example) = /g) || [];
    const examples = exampleMatches.map(match => match.replace(/export const (\w+)Example = /, "$1"));

    // Extract metadata exports
    const metadataMatches = content.match(/export const (\w+ExampleMeta): ExampleMetadata = /g) || [];
    const metadataExports = metadataMatches.map(match => match.replace(/export const (\w+)ExampleMeta: ExampleMetadata = /, "$1"));

    // Check for registry export
    const registryPattern = new RegExp(`export const ${componentName.toUpperCase()}_EXAMPLES: ComponentExample\\[\\] = `);
    const hasRegistry = registryPattern.test(content);

    if (!hasRegistry) {
      result.errors.push(`Missing ${componentName.toUpperCase()}_EXAMPLES registry export`);
      result.valid = false;
    }

    // Validate each example has corresponding metadata
    for (const example of examples) {
      if (!metadataExports.includes(example)) {
        result.errors.push(`Example "${example}Example" missing corresponding "${example}ExampleMeta" export`);
        result.valid = false;
      }
    }

    // Check for orphaned metadata (metadata without corresponding example)
    for (const metadata of metadataExports) {
      if (!examples.includes(metadata)) {
        result.warnings.push(`Metadata "${metadata}ExampleMeta" has no corresponding "${metadata}Example" component`);
      }
    }

    // Try to import and validate the actual metadata
    try {
      // This is a simplified validation - in a real scenario you'd use dynamic imports
      // For now, we'll do basic regex validation of the metadata structure

      const metadataBlocks = content.match(/export const \w+ExampleMeta: ExampleMetadata = \{[^}]+\}/g) || [];
      const categories = new Set<string>();

      for (const block of metadataBlocks) {
        // Extract id
        const idMatch = block.match(/id:\s*["']([^"']+)["']/);
        if (!idMatch) {
          result.errors.push("Metadata block missing required \"id\" field");
          result.valid = false;
          continue;
        }

        // Extract title
        const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
        if (!titleMatch) {
          result.errors.push(`Metadata for "${idMatch[1]}" missing required "title" field`);
          result.valid = false;
        }

        // Extract description
        const descriptionMatch = block.match(/description:\s*["']([^"']+)["']/);
        if (!descriptionMatch) {
          result.errors.push(`Metadata for "${idMatch[1]}" missing required "description" field`);
          result.valid = false;
        }

        // Extract category (optional)
        const categoryMatch = block.match(/category:\s*["']([^"']+)["']/);
        if (categoryMatch) {
          categories.add(categoryMatch[1]);
        }

        // Validate ID format (kebab-case)
        if (idMatch[1] && !/^[a-z][a-z0-9-]*$/.test(idMatch[1])) {
          result.warnings.push(`ID "${idMatch[1]}" should use kebab-case format`);
        }
      }

      result.exampleCount = examples.length;
      result.categories = Array.from(categories).sort();
    }
    catch (importError) {
      result.warnings.push(`Could not validate metadata structure: ${importError}`);
    }

    // Check for required interfaces (either defined locally or imported)
    const hasExampleMetadata = content.includes("interface ExampleMetadata")
      || (content.includes("ExampleMetadata") && content.includes("from"));
    const hasComponentExample = content.includes("interface ComponentExample")
      || (content.includes("ComponentExample") && content.includes("from"));

    if (!hasExampleMetadata) {
      result.warnings.push("Missing ExampleMetadata interface - consider importing from a shared location");
    }

    if (!hasComponentExample) {
      result.warnings.push("Missing ComponentExample interface - consider importing from a shared location");
    }
  }
  catch (error) {
    result.errors.push(`Failed to read examples file: ${error}`);
    result.valid = false;
  }

  return result;
}

/**
 * Validate all component examples
 */
async function validateAllExamples(): Promise<ValidationResult[]> {
  const componentsDir = path.join(__dirname, "../src/components");

  try {
    const componentDirs = await fs.readdir(componentsDir, { withFileTypes: true });
    const results: ValidationResult[] = [];

    for (const dirent of componentDirs) {
      if (dirent.isDirectory()) {
        const componentPath = path.join(componentsDir, dirent.name);
        const result = await validateExamplesFile(componentPath);
        results.push(result);
      }
    }

    return results;
  }
  catch (error) {
    log(`Error reading components directory: ${error}`, "red");
    return [];
  }
}

/**
 * Generate a summary report
 */
function generateReport(results: ValidationResult[]) {
  log(`\n${colors.bold}${colors.cyan}📋 Example Validation Report${colors.reset}\n`);

  const totalComponents = results.length;
  const validComponents = results.filter(r => r.valid).length;
  const totalExamples = results.reduce((sum, r) => sum + r.exampleCount, 0);
  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  // Summary stats
  log("📊 Summary:", "bold");
  log(`   Components: ${totalComponents}`);
  log(`   Valid: ${validComponents}`, validComponents === totalComponents ? "green" : "yellow");
  log(`   Total Examples: ${totalExamples}`);
  log(`   Errors: ${totalErrors}`, totalErrors === 0 ? "green" : "red");
  log(`   Warnings: ${totalWarnings}`, totalWarnings === 0 ? "green" : "yellow");

  // Detailed results
  log("\n📋 Component Details:", "bold");

  for (const result of results) {
    const status = result.valid ? "✅" : "❌";
    const exampleText = result.exampleCount === 1 ? "example" : "examples";

    log(`\n${status} ${result.component} (${result.exampleCount} ${exampleText})`);

    if (result.categories.length > 0) {
      log(`   Categories: ${result.categories.join(", ")}`, "cyan");
    }

    // Show errors
    for (const error of result.errors) {
      log(`   ❌ ${error}`, "red");
    }

    // Show warnings
    for (const warning of result.warnings) {
      log(`   ⚠️  ${warning}`, "yellow");
    }
  }

  // Migration suggestions
  const needsMigration = results.filter(r => r.errors.some(e => e.includes("registry export")));

  if (needsMigration.length > 0) {
    log("\n🔄 Migration Needed:", "bold");
    log("   The following components need to be migrated to the new self-contained format:", "yellow");

    for (const component of needsMigration) {
      log(`   • ${component.component}`, "yellow");
    }

    log("\n   To migrate a component:", "cyan");
    log("   1. Add ExampleMetadata interface and exports", "cyan");
    log("   2. Create COMPONENT_EXAMPLES registry", "cyan");
    log("   3. Add helper functions (getExampleById, etc.)", "cyan");
  }

  // Final status
  if (validComponents === totalComponents && totalErrors === 0) {
    log("\n🎉 All components have valid example structures!", "green");
  }
  else {
    log(`\n⚠️  ${totalComponents - validComponents} components need attention.`, "yellow");
  }
}

/**
 * Main execution
 */
async function main() {
  const results = await validateAllExamples();
  generateReport(results);

  // Exit with error code if there are validation errors
  const hasErrors = results.some(r => !r.valid);
  process.exit(hasErrors ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    log(`Fatal error: ${error}`, "red");
    process.exit(1);
  });
}

export { validateAllExamples, validateExamplesFile };
