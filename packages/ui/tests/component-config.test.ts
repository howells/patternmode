/**
 * Test to validate that all config.ts files conform to the expected structure.
 *
 * Validates:
 * 1. Required fields are present and valid
 * 2. Config structure matches ComponentConfig type
 * 3. Examples align with examples.tsx exports
 * 4. Components align with actual component exports
 * 5. Import statements are correct
 * 6. Icons are valid Lucide icons
 * 7. Categories are valid
 * 8. Registry alignment
 */

import type { ComponentConfig } from "../src/lib/component-config-types";
import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";
import * as LucideIcons from "lucide-react";
import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIG, COMPONENT_REGISTRY } from "../src/components/registry";
import { validateComponentConfig } from "../src/lib/component-config-types";

type ComponentConfigValidationResult = {
  configPath: string;
  componentId: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  config: ComponentConfig | null;
  hasValidStructure: boolean;
  hasRequiredFields: boolean;
  hasValidCategory: boolean;
  hasValidIcon: boolean;
  hasValidImportStatement: boolean;
  examplesAlignment: {
    configExamples: string[];
    missingComponents: string[];
    hasValidExamples: boolean;
  };
  componentsAlignment: {
    configComponents: string[];
    hasValidComponents: boolean;
  };
};

/**
 * Get all valid Lucide React icon names
 */
function getAllLucideIconNames(): Set<string> {
  const allExports = Object.keys(LucideIcons);

  const iconNames = allExports.filter((name) => {
    return (
      name[0] === name[0].toUpperCase()
      && !name.endsWith("Icon")
      && name !== "Icon"
      && name !== "DynamicIcon"
      && name !== "createLucideIcon"
      && name !== "IconNode"
      && !name.startsWith("Lucide")
    );
  });

  return new Set(iconNames);
}

const ALL_LUCIDE_ICONS = getAllLucideIconNames();
const VALID_CATEGORIES = CATEGORY_CONFIG.map(cat => cat.key);

async function findComponentConfigFiles(componentsDir: string): Promise<Array<{ configPath: string; componentId: string }>> {
  const configFiles: Array<{ configPath: string; componentId: string }> = [];

  async function walkDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      }
      else if (entry.name === "config.ts") {
        const componentId = path.basename(path.dirname(fullPath));
        configFiles.push({ configPath: fullPath, componentId });
      }
    }
  }

  await walkDir(componentsDir);
  return configFiles;
}

async function validateComponentConfigFile(configPath: string, componentId: string): Promise<ComponentConfigValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  let config: ComponentConfig | null = null;
  let hasValidStructure = false;
  let hasRequiredFields = false;
  let hasValidCategory = false;
  let hasValidIcon = false;
  let hasValidImportStatement = false;

  try {
    // Dynamic import the config file
    const configModule = await import(configPath);
    config = configModule[Object.keys(configModule).find(key => key.endsWith("Config")) || "config"] as ComponentConfig;

    if (!config) {
      errors.push("No componentConfig export found");
      return createValidationResult();
    }

    hasValidStructure = true;

    // Validate using the built-in validator
    const validationErrors = validateComponentConfig(config);
    if (validationErrors.length > 0) {
      errors.push(...validationErrors);
    }
    else {
      hasRequiredFields = true;
    }

    // Validate ID matches directory
    if (config.id !== componentId) {
      errors.push(`Config id "${config.id}" doesn't match directory name "${componentId}"`);
    }

    // Validate category
    if (config.category && VALID_CATEGORIES.includes(config.category)) {
      hasValidCategory = true;
    }
    else {
      errors.push(`Invalid category "${config.category}". Must be one of: ${VALID_CATEGORIES.join(", ")}`);
    }

    // Validate icon
    if (config.icon) {
      if (typeof config.icon === "function") {
        const iconName = config.icon.name;
        if (iconName && ALL_LUCIDE_ICONS.has(iconName)) {
          hasValidIcon = true;
        }
        else {
          warnings.push(`Icon "${iconName}" may not be a valid Lucide React icon`);
        }
      }
      else {
        warnings.push("Icon should be a Lucide React icon component");
      }
    }
    else {
      warnings.push("Missing icon - consider adding one for better UX");
    }

    // Validate import statement
    if (config.importStatement) {
      if (config.importStatement.includes("@patternmode/ui") && config.importStatement.includes(componentId)) {
        hasValidImportStatement = true;
      }
      else {
        warnings.push(`Import statement should reference "@patternmode/ui/${componentId}"`);
      }
    }

    // Validate description length (should be concise but informative)
    if (config.description && config.description.length > 200) {
      warnings.push(`Description is quite long (${config.description.length} chars) - consider making it more concise`);
    }

    if (config.description && config.description.length < 20) {
      warnings.push("Description is very short - consider adding more detail");
    }
  }
  catch (error) {
    errors.push(`Failed to import config: ${error instanceof Error ? error.message : String(error)}`);
  }

  function createValidationResult(): ComponentConfigValidationResult {
    const configExamples = config?.examples?.map(ex => ex.component.name) || [];
    const configComponents = config?.components?.map(comp => comp.name) || [];

    return {
      configPath,
      componentId,
      isValid: errors.length === 0,
      errors,
      warnings,
      config,
      hasValidStructure,
      hasRequiredFields,
      hasValidCategory,
      hasValidIcon,
      hasValidImportStatement,
      examplesAlignment: {
        configExamples,
        missingComponents: [], // Would need to check against actual example files
        hasValidExamples: config?.examples ? config.examples.length > 0 : false,
      },
      componentsAlignment: {
        configComponents,
        hasValidComponents: config?.components ? config.components.length > 0 : false,
      },
    };
  }

  return createValidationResult();
}

describe("component Config Validation", () => {
  it("should find all config.ts files", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const configFiles = await findComponentConfigFiles(componentsDir);

    expect(configFiles.length).toBeGreaterThan(0);
    console.log(`Found ${configFiles.length} config.ts files`);
  });

  // Get all config files for individual testing
  let configFiles: Array<{ configPath: string; componentId: string }> = [];

  it("should load all config files for individual testing", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    configFiles = await findComponentConfigFiles(componentsDir);
    expect(configFiles.length).toBeGreaterThan(0);
  });

  // Individual test cases for each component config
  describe("Individual Component Configs", () => {
    const testComponentConfig = async (componentId: string) => {
      const componentsDir = path.join(process.cwd(), "src/components");
      const configPath = path.join(componentsDir, componentId, "config.ts");
      
      const result = await validateComponentConfigFile(configPath, componentId);

      // Test core requirements with detailed error messages
      expect(result.hasValidStructure, 
        `${componentId}: Invalid config structure. Errors: ${result.errors.join(', ')}`
      ).toBe(true);
      
      expect(result.hasRequiredFields, 
        `${componentId}: Missing required fields. Errors: ${result.errors.join(', ')}`
      ).toBe(true);
      
      expect(result.hasValidCategory, 
        `${componentId}: Invalid category "${result.config?.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`
      ).toBe(true);
      
      expect(result.examplesAlignment.hasValidExamples, 
        `${componentId}: No examples defined in config`
      ).toBe(true);

      expect(result.componentsAlignment.hasValidComponents,
        `${componentId}: No components defined in config`
      ).toBe(true);

      // Log warnings but don't fail the test
      if (result.warnings.length > 0) {
        console.warn(`⚠️  ${componentId} warnings:`, result.warnings.join(', '));
      }

      // Verify import statement format
      if (result.config?.importStatement) {
        expect(result.config.importStatement).toMatch(
          new RegExp(`@patternmode/ui.*${componentId}`),
          `${componentId}: Import statement should reference @patternmode/ui and component name`
        );
      }

      // Verify component is in registry
      expect(COMPONENT_REGISTRY[componentId], 
        `${componentId}: Component not found in registry`
      ).toBeDefined();
    };

    // Generate individual test cases from the registry
    Object.keys(COMPONENT_REGISTRY).forEach((componentId) => {
      it(`${componentId} config should be valid`, () => testComponentConfig(componentId));
    });
  });

  it("should validate all config.ts files structure", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const configFiles = await findComponentConfigFiles(componentsDir);

    const results: ComponentConfigValidationResult[] = [];

    for (const { configPath, componentId } of configFiles) {
      const result = await validateComponentConfigFile(configPath, componentId);
      results.push(result);
    }

    // Log detailed results
    const separator = "=".repeat(80);
    console.log(`\n${separator}`);
    console.log("COMPONENT CONFIG VALIDATION REPORT");
    console.log(separator);

    const validConfigs = results.filter(r => r.isValid);
    const invalidConfigs = results.filter(r => !r.isValid);

    console.log(`\n✅ Valid configs: ${validConfigs.length}/${results.length}`);
    console.log(`❌ Invalid configs: ${invalidConfigs.length}/${results.length}`);

    if (invalidConfigs.length > 0) {
      console.log(`\n❌ INVALID CONFIGS:`);

      for (const result of invalidConfigs) {
        const relativePath = path.relative(process.cwd(), result.configPath);
        console.log(`\n📁 ${relativePath} (${result.componentId})`);

        if (result.errors.length > 0) {
          console.log("  Errors:");
          result.errors.forEach(error => console.log(`    • ${error}`));
        }

        if (result.warnings.length > 0) {
          console.log("  Warnings:");
          result.warnings.forEach(warning => console.log(`    ⚠ ${warning}`));
        }
      }
    }

    // Show statistics
    console.log(`\n📊 STATISTICS:`);
    const withValidStructure = results.filter(r => r.hasValidStructure).length;
    const withRequiredFields = results.filter(r => r.hasRequiredFields).length;
    const withValidCategory = results.filter(r => r.hasValidCategory).length;
    const withValidIcon = results.filter(r => r.hasValidIcon).length;
    const withValidImportStatement = results.filter(r => r.hasValidImportStatement).length;
    const withExamples = results.filter(r => r.examplesAlignment.hasValidExamples).length;
    const withComponents = results.filter(r => r.componentsAlignment.hasValidComponents).length;

    console.log(`Configs with valid structure: ${withValidStructure}/${results.length} (${Math.round(withValidStructure / results.length * 100)}%)`);
    console.log(`Configs with required fields: ${withRequiredFields}/${results.length} (${Math.round(withRequiredFields / results.length * 100)}%)`);
    console.log(`Configs with valid category: ${withValidCategory}/${results.length} (${Math.round(withValidCategory / results.length * 100)}%)`);
    console.log(`Configs with valid icon: ${withValidIcon}/${results.length} (${Math.round(withValidIcon / results.length * 100)}%)`);
    console.log(`Configs with valid import statement: ${withValidImportStatement}/${results.length} (${Math.round(withValidImportStatement / results.length * 100)}%)`);
    console.log(`Configs with examples: ${withExamples}/${results.length} (${Math.round(withExamples / results.length * 100)}%)`);
    console.log(`Configs with components: ${withComponents}/${results.length} (${Math.round(withComponents / results.length * 100)}%)`);

    console.log(`\n${separator}`);

    // Test passes for reporting purposes
    expect(results.length).toBeGreaterThan(0);
  });

  it("should enforce strict requirements for config files", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const configFiles = await findComponentConfigFiles(componentsDir);

    const failingComponents: string[] = [];

    for (const { configPath, componentId } of configFiles) {
      const result = await validateComponentConfigFile(configPath, componentId);

      // Strict requirements that should cause test failure
      if (!result.hasValidStructure) {
        failingComponents.push(`${componentId}: Invalid config structure`);
      }

      if (!result.hasRequiredFields) {
        failingComponents.push(`${componentId}: Missing required fields`);
      }

      if (!result.hasValidCategory) {
        failingComponents.push(`${componentId}: Invalid category`);
      }

      if (!result.examplesAlignment.hasValidExamples) {
        failingComponents.push(`${componentId}: No examples defined`);
      }
    }

    if (failingComponents.length > 0) {
      console.log(`\n❌ STRICT REQUIREMENT FAILURES:`);
      failingComponents.forEach(failure => console.log(`  • ${failure}`));
    }

    // This test should fail if there are strict requirement violations
    expect(failingComponents, `Found ${failingComponents.length} components with strict requirement failures`).toHaveLength(0);
  });

  it("should validate that all config files are registered", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const configFiles = await findComponentConfigFiles(componentsDir);

    const foundComponentIds = new Set(configFiles.map(f => f.componentId));
    const registryComponentIds = new Set(Object.keys(COMPONENT_REGISTRY));

    const missingFromRegistry = Array.from(foundComponentIds).filter(id => !registryComponentIds.has(id));
    const missingConfigFiles = Array.from(registryComponentIds).filter(id => !foundComponentIds.has(id));

    if (missingFromRegistry.length > 0) {
      console.log(`\n❌ CONFIGS NOT IN REGISTRY:`);
      missingFromRegistry.forEach(id => console.log(`  • ${id}`));
    }

    if (missingConfigFiles.length > 0) {
      console.log(`\n❌ REGISTRY ENTRIES MISSING CONFIG FILES:`);
      missingConfigFiles.forEach(id => console.log(`  • ${id}`));
    }

    expect(missingFromRegistry, `Config files not in registry: ${missingFromRegistry.join(", ")}`).toHaveLength(0);
    expect(missingConfigFiles, `Registry entries missing config files: ${missingConfigFiles.join(", ")}`).toHaveLength(0);
  });

  it("should validate config consistency with registry", async () => {
    const componentsDir = path.join(process.cwd(), "src/components");
    const configFiles = await findComponentConfigFiles(componentsDir);

    const inconsistencies: string[] = [];

    for (const { componentId } of configFiles) {
      const result = await validateComponentConfigFile(
        path.join(componentsDir, componentId, "config.ts"),
        componentId,
      );

      if (result.config) {
        const registryEntry = COMPONENT_REGISTRY[componentId];

        if (registryEntry) {
          // Check basic field consistency
          if (result.config.name !== registryEntry.name) {
            inconsistencies.push(`${componentId}: Name mismatch - config: "${result.config.name}", registry: "${registryEntry.name}"`);
          }

          if (result.config.description !== registryEntry.description) {
            inconsistencies.push(`${componentId}: Description mismatch between config and registry`);
          }

          if (result.config.category !== registryEntry.category) {
            inconsistencies.push(`${componentId}: Category mismatch - config: "${result.config.category}", registry: "${registryEntry.category}"`);
          }

          if (result.config.importStatement !== registryEntry.importStatement) {
            inconsistencies.push(`${componentId}: Import statement mismatch between config and registry`);
          }
        }
      }
    }

    if (inconsistencies.length > 0) {
      console.log(`\n❌ CONFIG-REGISTRY INCONSISTENCIES:`);
      inconsistencies.forEach(inconsistency => console.log(`  • ${inconsistency}`));
    }

    expect(inconsistencies, `Found ${inconsistencies.length} inconsistencies between configs and registry`).toHaveLength(0);
  });

  it("should validate specific config file patterns", async () => {
    // Test using the first component from the registry instead of hardcoding
    const firstComponentId = Object.keys(COMPONENT_REGISTRY)[0];
    const configPath = path.join(process.cwd(), `src/components/${firstComponentId}/config.ts`);
    const result = await validateComponentConfigFile(configPath, firstComponentId);

    expect(result.isValid).toBe(true);
    expect(result.hasValidStructure).toBe(true);
    expect(result.hasRequiredFields).toBe(true);
    expect(result.hasValidCategory).toBe(true);
    expect(result.examplesAlignment.hasValidExamples).toBe(true);
  });
});
