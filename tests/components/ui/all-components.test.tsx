import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

// Helper function to get all component directories
function getComponentDirectories() {
  const uiDir = join(process.cwd(), "src", "components", "ui");
  const entries = readdirSync(uiDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

// Helper function to extract category from config file
function getCategoryFromConfig(configContent: string): string {
  const categoryMatch = configContent.match(
    /category:\s*"([^"]+)"\s*as\s*const/
  );
  return categoryMatch ? categoryMatch[1] : "unknown";
}

// Helper function to extract COMPONENT_LIST from registry file
function getComponentListFromRegistry(): Record<string, string[]> {
  const registryPath = join(
    process.cwd(),
    "src",
    "lib",
    "component-registry.ts"
  );
  const registryContent = readFileSync(registryPath, "utf8");

  // Extract COMPONENT_LIST object using regex
  const componentListMatch = registryContent.match(
    /export const COMPONENT_LIST = ({[\s\S]*?});/
  );
  if (!componentListMatch) {
    throw new Error("Could not find COMPONENT_LIST in registry file");
  }

  // Parse the object (this is a simplified approach - in production you might want to use a proper parser)
  const componentListStr = componentListMatch[1];

  // Extract categories and their components
  const categories: Record<string, string[]> = {};
  const categoryMatches = componentListStr.matchAll(/(\w+):\s*\[([^\]]+)\]/g);

  for (const match of categoryMatches) {
    const category = match[1];
    const componentsStr = match[2];
    const components = componentsStr
      .split(",")
      .map((c) => c.trim().replace(/"/g, ""))
      .filter((c) => c.length > 0);
    categories[category] = components;
  }

  return categories;
}

// Helper function to extract componentRegistry entries from registry file
function getComponentRegistryEntries(): string[] {
  const registryPath = join(
    process.cwd(),
    "src",
    "lib",
    "component-registry.ts"
  );
  const registryContent = readFileSync(registryPath, "utf8");

  // Extract componentRegistry object using regex
  const registryMatch = registryContent.match(
    /export const componentRegistry: ComponentConfigRegistry = ({[\s\S]*?});/
  );
  if (!registryMatch) {
    throw new Error("Could not find componentRegistry in registry file");
  }

  const registryStr = registryMatch[1];
  
  // Extract all component keys from the registry object
  // Look for patterns like: "component-name": or component: (with optional quotes)
  const keyMatches = registryStr.matchAll(/^\s*["']?([a-z-]+)["']?\s*:/gm);
  const keys: string[] = [];
  
  for (const match of keyMatches) {
    const key = match[1].trim();
    // Skip obvious non-component entries and ensure it's a valid component name format
    if (key && key.match(/^[a-z-]+$/) && !key.includes('//')) {
      keys.push(key);
    }
  }
  
  return keys;
}

// Helper function to test a single component
async function testComponent(componentId: string) {
  const componentDir = join(
    process.cwd(),
    "src",
    "components",
    "ui",
    componentId
  );

  // Test component directory
  expect(existsSync(componentDir)).toBe(true);

  // Test main component file
  const componentFile = join(componentDir, `${componentId}.tsx`);
  expect(existsSync(componentFile)).toBe(true);

  // Test config file
  const configFile = join(componentDir, "config.tsx");
  expect(existsSync(configFile)).toBe(true);

  // Test examples file
  const examplesFile = join(componentDir, "examples.tsx");
  expect(existsSync(examplesFile)).toBe(true);

  // Test component config structure
  const configContent = readFileSync(configFile, "utf8");

  // Basic validation checks
  expect(configContent).toContain("export const componentConfig");
  expect(configContent).toContain(`id: "${componentId}"`);
  expect(configContent).toContain("props:");
  expect(configContent).toContain("examples:");

  // Test that config file can be imported without syntax errors
  try {
    // Dynamic import to test actual parsing
    const configModule = await import(`../../../src/components/ui/${componentId}/config`);
    expect(configModule.componentConfig).toBeDefined();
    expect(configModule.componentConfig.id).toBe(componentId);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Config file ${componentId}/config.tsx has syntax errors: ${errorMessage}`);
  }

  // Extract and validate category from config
  const category = getCategoryFromConfig(configContent);
  expect(category).toMatch(
    /^(text|layout|navigation|feedback|overlay|data|media|utility|inputs|forms|charts)$/
  );

  // Check that it exports the config (either direct export or named export)
  expect(
    configContent.includes("export { componentConfig }") ||
      configContent.includes("export const componentConfig")
  ).toBe(true);

  // Test component file exists
  const componentPath = join(componentDir, `${componentId}.tsx`);
  expect(existsSync(componentPath)).toBe(true);
}

describe("All UI Components", () => {
  it("should have proper structure and valid configs", async () => {
    const componentIds = getComponentDirectories();

    console.log(`Testing ${componentIds.length} components...`);

    for (const componentId of componentIds) {
      console.log(`  Testing ${componentId}...`);
      await testComponent(componentId);
    }
  });

  it("should have all components represented in component registry", () => {
    const componentIds = getComponentDirectories();
    const COMPONENT_LIST = getComponentListFromRegistry();

    // Get all components from the registry
    const registryComponents = new Set<string>();

    // Add components from COMPONENT_LIST
    Object.values(COMPONENT_LIST)
      .flat()
      .forEach((componentId) => {
        registryComponents.add(componentId);
      });

    console.log(`Found ${componentIds.length} components in /ui directory`);
    console.log(`Found ${registryComponents.size} components in registry`);

    // Check that all components in /ui directory are in the registry
    const missingFromRegistry = componentIds.filter(
      (componentId) => !registryComponents.has(componentId)
    );

    if (missingFromRegistry.length > 0) {
      console.error(
        "❌ Components missing from registry:",
        missingFromRegistry
      );
      expect(missingFromRegistry).toHaveLength(0);
    }

    // Check that all components in registry exist in /ui directory
    const missingFromDirectory = Array.from(registryComponents).filter(
      (componentId) => !componentIds.includes(componentId)
    );

    if (missingFromDirectory.length > 0) {
      console.error(
        "❌ Components in registry but missing from /ui directory:",
        missingFromDirectory
      );
      expect(missingFromDirectory).toHaveLength(0);
    }

    console.log("✅ All components are properly represented in the registry");
  });

  it("should have consistent categories between config files and registry", () => {
    const componentIds = getComponentDirectories();
    const COMPONENT_LIST = getComponentListFromRegistry();
    const inconsistencies: string[] = [];

    componentIds.forEach((componentId) => {
      const configFile = join(
        process.cwd(),
        "src",
        "components",
        "ui",
        componentId,
        "config.tsx"
      );

      if (existsSync(configFile)) {
        const configContent = readFileSync(configFile, "utf8");
        const configCategory = getCategoryFromConfig(configContent);

        // Check if component is in COMPONENT_LIST with the same category
        let registryCategory: string | undefined;
        for (const [category, components] of Object.entries(COMPONENT_LIST)) {
          if (components.includes(componentId)) {
            registryCategory = category;
            break;
          }
        }

        if (registryCategory && configCategory !== registryCategory) {
          inconsistencies.push(
            `${componentId}: config says "${configCategory}" but registry says "${registryCategory}"`
          );
        }
      }
    });

    if (inconsistencies.length > 0) {
      console.error("❌ Category inconsistencies found:", inconsistencies);
      expect(inconsistencies).toHaveLength(0);
    }

    console.log(
      "✅ All component categories are consistent between config files and registry"
    );
  });

  it("should not reference non-existent components in componentRegistry", () => {
    const registryEntries = getComponentRegistryEntries();
    
    const nonExistentComponents: string[] = [];
    
    registryEntries.forEach((componentId) => {
      const componentDir = join(
        process.cwd(),
        "src",
        "components",
        "ui",
        componentId
      );
      
      if (!existsSync(componentDir)) {
        nonExistentComponents.push(componentId);
      }
    });
    
    if (nonExistentComponents.length > 0) {
      console.error(
        "❌ componentRegistry references non-existent components:",
        nonExistentComponents
      );
      console.error("These components should be removed from the registry or their directories should be created.");
      expect(nonExistentComponents).toHaveLength(0);
    }
    
    console.log(
      `✅ All ${registryEntries.length} components in componentRegistry have corresponding directories`
    );
  });
});
