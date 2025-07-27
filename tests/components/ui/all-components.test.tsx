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

// Helper function to test a single component
function testComponent(componentId: string) {
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
  it("should have proper structure and valid configs", () => {
    const componentIds = getComponentDirectories();

    console.log(`Testing ${componentIds.length} components...`);

    componentIds.forEach((componentId) => {
      console.log(`  Testing ${componentId}...`);
      testComponent(componentId);
    });
  });
});
