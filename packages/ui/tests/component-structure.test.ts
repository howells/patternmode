/**
 * Essential component validation - focused on core requirements:
 * 1. Every component must have at least one example
 * 2. Every component must have TypeScript prop types
 * 3. JSDoc should be concise descriptions only (≤140 characters)
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COMPONENT_REGISTRY } from "../src/components/registry";

/**
 * Get all component directories that should have main component files
 */
function getComponentDirectories(): string[] {
  const componentsDir = join(process.cwd(), "src", "components");

  if (!existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }

  const entries = readdirSync(componentsDir, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter((componentDir) => {
      // Only include directories that have a main component file
      const componentPath = join(componentsDir, componentDir, "component.tsx");
      return existsSync(componentPath);
    })
    .sort();
}

/**
 * Check if component has TypeScript prop types defined
 */
function hasTypeScriptProps(componentDir: string): boolean {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  if (!existsSync(componentFilePath)) {
    return false;
  }

  const content = readFileSync(componentFilePath, "utf8");

  // Look for TypeScript prop type definitions
  const hasTypeDefinitions = /type\s+\w+Props\s*=/.test(content)
    || /interface\s+\w+Props\s*\{/.test(content)
    || /React\.ComponentPropsWithoutRef/.test(content)
    || /React\.ComponentProps/.test(content);

  return hasTypeDefinitions;
}

/**
 * Extract JSDoc description and validate length
 */
function getJSDocDescription(componentDir: string): string | null {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  if (!existsSync(componentFilePath)) {
    return null;
  }

  const content = readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");

  // Find main component definition
  let componentLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^(?:export\s+)?const\s+[A-Z][a-zA-Z0-9]*\s*[:=]/.test(line)) {
      componentLineIndex = i;
      break;
    }
  }

  if (componentLineIndex === -1) {
    return null;
  }

  // Look for JSDoc comment above component
  let jsdocStart = -1;
  let jsdocEnd = -1;

  for (let i = componentLineIndex - 1; i >= Math.max(0, componentLineIndex - 20); i--) {
    const line = lines[i].trim();

    if (line === "*/") {
      jsdocEnd = i;
    }
    else if (line === "/**" && jsdocEnd > i) {
      jsdocStart = i;
      break;
    }
  }

  if (jsdocStart >= 0 && jsdocEnd >= 0) {
    const jsdocLines = lines.slice(jsdocStart + 1, jsdocEnd);
    const descriptionLines = jsdocLines
      .map(line => line.trim().replace(/^\*\s?/, "").trim())
      .filter(line => line && !line.startsWith("@"));

    if (descriptionLines.length > 0) {
      return descriptionLines.join(" ").trim();
    }
  }

  return null;
}

/**
 * Check if component exports its main component correctly
 */
function hasCorrectExport(componentDir: string): boolean {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  if (!existsSync(componentFilePath)) {
    return false;
  }

  const content = readFileSync(componentFilePath, "utf8");

  // Should have main component export (fixed regex to avoid backtracking)
  const hasMainExport = /export\s*\{[^A-Z}]*[A-Z][^}]*\}/.test(content)
    || /export\s+const\s+[A-Z][a-zA-Z0-9]*\s*[:=]/.test(content);

  return hasMainExport;
}

describe("component Structure & Requirements", () => {
  const componentDirs = getComponentDirectories();

  it("should find component directories", () => {
    expect(componentDirs.length).toBeGreaterThan(50);
    console.log(`Found ${componentDirs.length} component directories`);
  });

  describe("registry Requirements", () => {
    it("every component must have at least one example", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        expect(config.examples, `Component ${id} must have examples`).toBeDefined();
        expect(Array.isArray(config.examples), `Component ${id} examples must be an array`).toBe(true);
        expect(config.examples.length, `Component ${id} must have at least one example`).toBeGreaterThan(0);

        config.examples.forEach((example, index) => {
          expect(example.id, `Example ${index} of ${id} must have an id`).toBeTruthy();
          expect(example.title, `Example ${index} of ${id} must have a title`).toBeTruthy();
          expect(example.description, `Example ${index} of ${id} must have a description`).toBeTruthy();
          expect(typeof example.component, `Example ${index} of ${id} must have a component function`).toBe("function");
        });
      });
    });

    it("every component must have proper config structure", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        expect(config.id, `Component ${id} must have id`).toBe(id);
        expect(config.name, `Component ${id} must have name`).toBeTruthy();
        expect(config.description, `Component ${id} must have description`).toBeTruthy();
        expect(config.category, `Component ${id} must have category`).toBeTruthy();
        expect(config.importStatement, `Component ${id} must have importStatement`).toBeTruthy();
        expect(config.icon, `Component ${id} must have icon`).toBeTruthy();
      });
    });
  });

  describe("typeScript Requirements", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should have TypeScript prop types defined`, () => {
        const hasProps = hasTypeScriptProps(componentDir);
        expect(hasProps, `Component ${componentDir} should have TypeScript prop types (type/interface definitions)`).toBe(true);
      });
    });
  });

  describe("jSDoc Requirements", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should have concise JSDoc description (≤140 chars)`, () => {
        const description = getJSDocDescription(componentDir);

        if (description) {
          expect(description.length, `Component ${componentDir} JSDoc description should be ≤140 characters, got ${description.length}: "${description}"`).toBeLessThanOrEqual(140);
          expect(description.length, `Component ${componentDir} JSDoc description should be at least 10 characters`).toBeGreaterThanOrEqual(10);
        }
        else {
          // JSDoc is optional if component info is in config, but warn about missing descriptions
          console.warn(`Component ${componentDir} has no JSDoc description - consider adding a brief component description`);
        }
      });
    });
  });

  describe("component Structure", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should export main component correctly`, () => {
        const componentsDir = join(process.cwd(), "src", "components");
        const componentFilePath = join(componentsDir, componentDir, "component.tsx");

        expect(existsSync(componentFilePath), `Component file ${componentDir}/component.tsx should exist`).toBe(true);

        const hasExport = hasCorrectExport(componentDir);
        expect(hasExport, `Component ${componentDir} should export its main component`).toBe(true);
      });
    });
  });

  describe("validation Summary", () => {
    it("should provide comprehensive validation report", () => {
      const results = {
        totalComponents: componentDirs.length,
        registryComponents: Object.keys(COMPONENT_REGISTRY).length,
        withExamples: 0,
        withTypeScriptProps: 0,
        withJSDocDescriptions: 0,
        withCorrectExports: 0,
        missingExamples: [] as string[],
        missingProps: [] as string[],
        longDescriptions: [] as Array<{ component: string; length: number; description: string }>,
        missingExports: [] as string[],
      };

      // Check registry examples
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        if (config.examples && config.examples.length > 0) {
          results.withExamples++;
        }
        else {
          results.missingExamples.push(id);
        }
      });

      // Check component files
      componentDirs.forEach((componentDir) => {
        // TypeScript props
        if (hasTypeScriptProps(componentDir)) {
          results.withTypeScriptProps++;
        }
        else {
          results.missingProps.push(componentDir);
        }

        // JSDoc descriptions
        const description = getJSDocDescription(componentDir);
        if (description) {
          results.withJSDocDescriptions++;
          if (description.length > 140) {
            results.longDescriptions.push({
              component: componentDir,
              length: description.length,
              description: `${description.substring(0, 100)}...`,
            });
          }
        }

        // Exports
        if (hasCorrectExport(componentDir)) {
          results.withCorrectExports++;
        }
        else {
          results.missingExports.push(componentDir);
        }
      });

      const separator = "=".repeat(80);
      console.log(`\n${separator}`);
      console.log("COMPONENT VALIDATION SUMMARY");
      console.log(separator);

      console.log(`\n📊 OVERALL STATISTICS:`);
      console.log(`Total component directories: ${results.totalComponents}`);
      console.log(`Registry components: ${results.registryComponents}`);
      console.log(`Components with examples: ${results.withExamples}/${results.registryComponents} (${Math.round(results.withExamples / results.registryComponents * 100)}%)`);
      console.log(`Components with TypeScript props: ${results.withTypeScriptProps}/${results.totalComponents} (${Math.round(results.withTypeScriptProps / results.totalComponents * 100)}%)`);
      console.log(`Components with JSDoc descriptions: ${results.withJSDocDescriptions}/${results.totalComponents} (${Math.round(results.withJSDocDescriptions / results.totalComponents * 100)}%)`);
      console.log(`Components with correct exports: ${results.withCorrectExports}/${results.totalComponents} (${Math.round(results.withCorrectExports / results.totalComponents * 100)}%)`);

      if (results.missingExamples.length > 0) {
        console.log(`\n❌ COMPONENTS MISSING EXAMPLES (${results.missingExamples.length}):`);
        results.missingExamples.forEach(component => console.log(`  • ${component}`));
      }

      if (results.missingProps.length > 0) {
        console.log(`\n❌ COMPONENTS MISSING TYPESCRIPT PROPS (${results.missingProps.length}):`);
        results.missingProps.forEach(component => console.log(`  • ${component}`));
      }

      if (results.longDescriptions.length > 0) {
        console.log(`\n⚠️  COMPONENTS WITH LONG JSDOC DESCRIPTIONS (${results.longDescriptions.length}):`);
        results.longDescriptions.forEach(({ component, length, description }) =>
          console.log(`  • ${component} (${length} chars): ${description}`),
        );
      }

      if (results.missingExports.length > 0) {
        console.log(`\n❌ COMPONENTS WITH EXPORT ISSUES (${results.missingExports.length}):`);
        results.missingExports.forEach(component => console.log(`  • ${component}`));
      }

      console.log(`\n${separator}`);

      // Test passes for reporting purposes
      expect(results.totalComponents).toBeGreaterThan(0);
    });
  });
});
