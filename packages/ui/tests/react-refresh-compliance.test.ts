/**
 * React Fast Refresh Compliance Test
 *
 * Tests component restructuring progress for React Fast Refresh compliance.
 * Tracks which components have been restructured to separate concerns.
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COMPONENT_REGISTRY } from "../src/components/registry";

/**
 * Get all component directories
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
      // Skip registry.ts and hidden directories
      if (componentDir === "registry.ts" || componentDir.startsWith(".")) {
        return false;
      }

      // Only include directories that have a component.tsx file
      const componentPath = join(componentsDir, componentDir, "component.tsx");
      return existsSync(componentPath);
    })
    .sort();
}

/**
 * Check if component has react-refresh violations using ESLint
 */
function hasReactRefreshViolations(componentDir: string): {
  hasViolations: boolean;
  violations: string[];
  isRestructured: boolean;
  hasVariantsFile: boolean;
  hasTypesFile: boolean;
  hasConstantsFile: boolean;
} {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");
  const variantsFilePath = join(componentsDir, componentDir, "variants.ts");
  const typesFilePath = join(componentsDir, componentDir, "types.ts");
  const constantsFilePath = join(componentsDir, componentDir, "constants.ts");

  if (!existsSync(componentFilePath)) {
    return {
      hasViolations: false,
      violations: [],
      isRestructured: false,
      hasVariantsFile: false,
      hasTypesFile: false,
      hasConstantsFile: false,
    };
  }

  // Use ESLint to check for actual react-refresh violations
  let hasEslintViolations = false;
  try {
    const { execSync } = require("child_process");
    const eslintOutput = execSync(
      `npx eslint "${componentFilePath}" 2>&1 || true`,
      { encoding: "utf8", cwd: process.cwd() }
    );
    hasEslintViolations = eslintOutput.includes("react-refresh/only-export-components");
  } catch (error) {
    // If ESLint fails, fall back to pattern matching
    const content = readFileSync(componentFilePath, "utf8");
    hasEslintViolations = /export\s+(?:const|type|interface)\s+(?!\w+\s*=\s*(?:React\.)?(?:forwardRef|memo)\b)/.test(content);
  }

  const violations: string[] = [];
  if (hasEslintViolations) {
    violations.push("react-refresh violations detected by ESLint");
  }

  // Check if component has been restructured (has separate files)
  const hasVariantsFile = existsSync(variantsFilePath);
  const hasTypesFile = existsSync(typesFilePath);
  const hasConstantsFile = existsSync(constantsFilePath);

  const isRestructured = hasVariantsFile || hasTypesFile || hasConstantsFile;

  return {
    hasViolations: hasEslintViolations,
    violations,
    isRestructured,
    hasVariantsFile,
    hasTypesFile,
    hasConstantsFile,
  };
}

/**
 * Check if external package.json import resolves to component.tsx
 */
function externalImportUsesComponent(componentDir: string): boolean {
  try {
    const resolvedPath = require.resolve(`@patternmode/ui/components/${componentDir}`);
    return resolvedPath.includes("/component.tsx");
  } catch (error) {
    return false;
  }
}

describe("React Fast Refresh Compliance Progress", () => {
  const componentDirs = getComponentDirectories();

  it("should find component directories", () => {
    expect(componentDirs.length).toBeGreaterThan(50);
    console.log(`Found ${componentDirs.length} component directories`);
  });

  // Create individual test cases for each component
  describe("Individual Component Compliance", () => {
    const testReactRefreshCompliance = (componentId: string) => {
      const analysis = hasReactRefreshViolations(componentId);
      const externalCompliant = externalImportUsesComponent(componentId);

      // Test core requirements
      expect(analysis.hasViolations, `${componentId}: Should not have react-refresh violations`).toBe(false);

      // Log warnings for non-restructured components but don't fail the test
      if (!analysis.isRestructured) {
        console.warn(`${componentId}: Not yet restructured (missing variants.ts, types.ts, or constants.ts)`);
      }

      if (!externalCompliant) {
        console.warn(`${componentId}: External import does not resolve to component.tsx`);
      }
    };

    // Generate individual test cases from the registry
    Object.keys(COMPONENT_REGISTRY).forEach((componentId) => {
      it(`${componentId} should be React Fast Refresh compliant`, () => testReactRefreshCompliance(componentId));
    });
  });

  describe("Restructuring Progress", () => {
    it("should track component restructuring progress", () => {
      const results = {
        totalComponents: Object.keys(COMPONENT_REGISTRY).length,
        restructuredComponents: 0,
        violatingComponents: 0,
        compliantComponents: 0,
        externalImportCompliant: 0,

        // Categorized lists
        restructured: [] as string[],
        violating: [] as Array<{ component: string; violations: string[] }>,
        compliant: [] as string[],

        // Detailed breakdown
        withVariantsFile: [] as string[],
        withTypesFile: [] as string[],
        withConstantsFile: [] as string[],
      };

      // Use registry components instead of filesystem scan
      const registryComponents = Object.keys(COMPONENT_REGISTRY);
      registryComponents.forEach((componentId) => {
        const analysis = hasReactRefreshViolations(componentId);
        const externalCompliant = externalImportUsesComponent(componentId);

        if (externalCompliant) {
          results.externalImportCompliant++;
        }

        if (analysis.isRestructured) {
          results.restructuredComponents++;
          results.restructured.push(componentId);

          if (analysis.hasVariantsFile) {
            results.withVariantsFile.push(componentId);
          }
          if (analysis.hasTypesFile) {
            results.withTypesFile.push(componentId);
          }
          if (analysis.hasConstantsFile) {
            results.withConstantsFile.push(componentId);
          }
        }

        if (analysis.hasViolations) {
          results.violatingComponents++;
          results.violating.push({
            component: componentId,
            violations: analysis.violations,
          });
        } else {
          results.compliantComponents++;
          results.compliant.push(componentId);
        }
      });
      
      // Update total to use registry count
      results.totalComponents = registryComponents.length;

      const separator = "=".repeat(80);
      console.log(`\n${separator}`);
      console.log("REACT FAST REFRESH COMPLIANCE PROGRESS");
      console.log(separator);

      console.log(`\n📊 OVERALL PROGRESS:`);
      console.log(`Total components: ${results.totalComponents}`);
      console.log(`Restructured components: ${results.restructuredComponents}/${results.totalComponents} (${Math.round(results.restructuredComponents / results.totalComponents * 100)}%)`);
      console.log(`External imports compliant: ${results.externalImportCompliant}/${results.totalComponents} (${Math.round(results.externalImportCompliant / results.totalComponents * 100)}%)`);
      console.log(`Component files compliant: ${results.compliantComponents}/${results.totalComponents} (${Math.round(results.compliantComponents / results.totalComponents * 100)}%)`);
      console.log(`Components with violations: ${results.violatingComponents}/${results.totalComponents} (${Math.round(results.violatingComponents / results.totalComponents * 100)}%)`);

      console.log(`\n🔧 RESTRUCTURING BREAKDOWN:`);
      console.log(`Components with variants.ts: ${results.withVariantsFile.length}`);
      console.log(`Components with types.ts: ${results.withTypesFile.length}`);
      console.log(`Components with constants.ts: ${results.withConstantsFile.length}`);

      if (results.restructured.length > 0) {
        console.log(`\n✅ RESTRUCTURED COMPONENTS (${results.restructured.length}):`);
        results.restructured.forEach(component => {
          const analysis = hasReactRefreshViolations(component);
          const files = [];
          if (analysis.hasVariantsFile) files.push("variants");
          if (analysis.hasTypesFile) files.push("types");
          if (analysis.hasConstantsFile) files.push("constants");
          console.log(`  • ${component} (${files.join(", ")})`);
        });
      }

      if (results.violating.length > 0) {
        console.log(`\n❌ COMPONENTS WITH VIOLATIONS (${results.violating.length}):`);
        results.violating.slice(0, 10).forEach(({ component, violations }) => {
          console.log(`  • ${component}: ${violations.join(", ")}`);
        });
        if (results.violating.length > 10) {
          console.log(`  ... and ${results.violating.length - 10} more`);
        }
      }

      if (results.compliant.length > 0 && results.compliant.length < 20) {
        console.log(`\n✅ COMPLIANT COMPONENTS (${results.compliant.length}):`);
        results.compliant.forEach(component => {
          console.log(`  • ${component}`);
        });
      }

      console.log(`\n${separator}`);

      // Test assertions for compliance
      expect(results.totalComponents).toBeGreaterThan(0);
      expect(results.compliantComponents).toBeGreaterThanOrEqual(results.totalComponents * 0.8); // At least 80% should be compliant
      expect(results.externalImportCompliant).toBeGreaterThanOrEqual(results.totalComponents * 0.8); // At least 80% should have correct external imports
    });
  });

  describe("Individual Component Status", () => {
    it("should validate restructured components meet compliance standards", () => {
      // Find all restructured components dynamically
      const restructuredComponents = Object.keys(COMPONENT_REGISTRY)
        .filter(componentId => {
          const analysis = hasReactRefreshViolations(componentId);
          return analysis.isRestructured;
        });

      expect(restructuredComponents.length).toBeGreaterThan(0);

      restructuredComponents.forEach((componentDir) => {
        const analysis = hasReactRefreshViolations(componentDir);
        const externalCompliant = externalImportUsesComponent(componentDir);

        expect(analysis.isRestructured, `${componentDir} should have separate files`).toBe(true);
        expect(externalCompliant, `${componentDir} external import should resolve to component.tsx`).toBe(true);

        // These components should not have violations in component.tsx anymore
        expect(analysis.hasViolations, `${componentDir}/component.tsx should not export non-components`).toBe(false);
      });
    });
  });

  describe("Package.json Export Resolution", () => {
    it("should verify external imports resolve to component.tsx for restructured components", () => {
      // Find restructured components dynamically
      const restructuredComponents = Object.keys(COMPONENT_REGISTRY)
        .filter(componentId => {
          const analysis = hasReactRefreshViolations(componentId);
          return analysis.isRestructured;
        });

      expect(restructuredComponents.length).toBeGreaterThan(0);

      restructuredComponents.forEach((componentDir) => {
        const resolvedPath = require.resolve(`@patternmode/ui/components/${componentDir}`);
        expect(resolvedPath).toContain("/component.tsx");
        expect(resolvedPath).not.toContain("/index.tsx");
      });
    });

    it("should verify dedicated export paths work for advanced imports", () => {
      // Find any component with additional file exports dynamically
      const componentWithFiles = Object.keys(COMPONENT_REGISTRY)
        .find(componentId => {
          const analysis = hasReactRefreshViolations(componentId);
          return analysis.hasVariantsFile || analysis.hasTypesFile || analysis.hasConstantsFile;
        });

      if (componentWithFiles) {
        const analysis = hasReactRefreshViolations(componentWithFiles);

        if (analysis.hasVariantsFile) {
          try {
            const variantsPath = require.resolve(`@patternmode/ui/components/${componentWithFiles}/variants`);
            expect(variantsPath).toContain("/variants.ts");
          } catch (error) {
            throw new Error(`${componentWithFiles} variants export should be available`);
          }
        }

        if (analysis.hasTypesFile) {
          try {
            const typesPath = require.resolve(`@patternmode/ui/components/${componentWithFiles}/types`);
            expect(typesPath).toContain("/types.ts");
          } catch (error) {
            throw new Error(`${componentWithFiles} types export should be available`);
          }
        }

        if (analysis.hasConstantsFile) {
          try {
            const constantsPath = require.resolve(`@patternmode/ui/components/${componentWithFiles}/constants`);
            expect(constantsPath).toContain("/constants.ts");
          } catch (error) {
            throw new Error(`${componentWithFiles} constants export should be available`);
          }
        }
      } else {
        console.warn("No components found with additional file exports (variants, types, or constants)");
      }
    });
  });
});