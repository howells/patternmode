#!/usr/bin/env tsx

/**
 * Auto-Generate Component Registry
 *
 * This script scans all components, extracts their JSDoc props,
 * and generates a complete component registry automatically.
 * No more manual config files needed!
 */

import type { ComponentConfig, PropMetadata } from "../src/lib/component-config-types";

import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

import { parse } from "react-docgen-typescript";

const componentsDir = path.resolve("src/components");

/**
 * Component categories based on directory names
 */
const CATEGORY_MAP: Record<string, string> = {
  // Text components
  "code-block": "text",
  "heading": "text",
  "heading-element": "text",
  "kbd": "text",
  "subheading": "text",
  "text": "text",

  // Layout components
  "card": "layout",
  "divider": "layout",
  "grid": "layout",
  "preview-card": "layout",
  "separator": "layout",
  "stack": "layout",

  // Navigation
  "breadcrumbs": "navigation",
  "menu-bar": "navigation",
  "navbar": "navigation",
  "navigation-menu": "navigation",
  "pagination": "navigation",
  "sidebar": "navigation",
  "tab-navigation": "navigation",
  "tabs": "navigation",
  "toolbar": "navigation",

  // Feedback
  "badge": "feedback",
  "callout": "feedback",
  "dot": "feedback",
  "loader": "feedback",
  "meter": "feedback",
  "progress": "feedback",
  "progress-circle": "feedback",
  "skeleton": "feedback",
  "tag": "feedback",
  "toast": "feedback",

  // Overlay
  "alert-dialog": "overlay",
  "context-menu": "overlay",
  "dialog": "overlay",
  "drawer": "overlay",
  "menu": "overlay",
  "popover": "overlay",
  "responsive-drawer": "overlay",
  "sheet": "overlay",
  "tooltip": "overlay",

  // Data
  "accordion": "data",
  "collapsible": "data",
  "description-list": "data",
  "list": "data",
  "stacked-list": "data",
  "table": "data",
  "tracker": "data",

  // Media
  "avatar": "media",
  "carousel": "media",
  "empty-state": "media",
  "icon": "media",
  "icon-container": "media",
  "inspector": "media",

  // Utility
  "copy-button": "utility",
  "dismiss-button": "utility",
  "scroll-area": "utility",
  "touch-target": "utility",

  // Inputs
  "button": "inputs",
  "calendar": "inputs",
  "checkbox": "inputs",
  "checkbox-group": "inputs",
  "combobox": "inputs",
  "date-picker": "inputs",
  "date-range-picker": "inputs",
  "icon-select": "inputs",
  "input": "inputs",
  "number-field": "inputs",
  "radio": "inputs",
  "radio-card-group": "inputs",
  "radio-group": "inputs",
  "select": "inputs",
  "select-native": "inputs",
  "slider": "inputs",
  "split-button": "inputs",
  "switch": "inputs",
  "textarea": "inputs",
  "toggle": "inputs",
  "toggle-group": "inputs",

  // Forms
  "field": "forms",
  "fieldset": "forms",
  "form": "forms",
  "label": "forms",
  "tag-input": "forms",

  // Charts
  "area-chart": "charts",
  "bar-chart": "charts",
  "bar-list": "charts",
  "category-bar": "charts",
  "combo-chart": "charts",
  "donut-chart": "charts",
  "line-chart": "charts",
  "spark-chart": "charts",
};

/**
 * Extract component info from a component directory
 */
function extractComponentInfo(componentDir: string): ComponentConfig | null {
  const componentPath = path.join(componentsDir, componentDir);

  // Find the main component file (usually matches directory name)
  const possibleFiles = [
    `${componentDir}.tsx`,
    "index.tsx",
    `${componentDir.split("-").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1),
    ).join("")}.tsx`,
  ];

  let componentFile: string | null = null;

  for (const file of possibleFiles) {
    const filePath = path.join(componentPath, file);
    if (fs.existsSync(filePath)) {
      componentFile = filePath;
      break;
    }
  }

  if (!componentFile) {
    console.log(`⚠️  No component file found for ${componentDir}`);
    return null;
  }

  try {
    // Extract props using react-docgen-typescript
    const componentInfo = parse(componentFile, {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        // Only include props that have JSDoc descriptions (custom component props)
        // This filters out inherited HTML attributes that don't have documentation
        return Boolean(prop.description
          && prop.description.trim().length > 0
          && !prop.name.startsWith("aria-")
          && !prop.name.startsWith("data-")
          && prop.name !== "key"
          && prop.name !== "ref"
          && prop.name !== "className"
          && !prop.name.startsWith("on")); // Exclude event handlers
      },
    });

    if (componentInfo.length === 0) {
      console.log(`⚠️  No props found for ${componentDir}`);
      return null;
    }

    const component = componentInfo[0]; // Take the first exported component
    const componentName = component.displayName || componentDir;

    // Convert react-docgen props to our PropMetadata format
    const props: PropMetadata[] = Object.entries(component.props || {}).map(([name, prop]) => ({
      name,
      type: prop.type?.name || "unknown",
      description: prop.description || "",
      defaultValue: prop.defaultValue?.value,
      required: prop.required || false,
      options: prop.type?.name === "enum"
        ? prop.type.value?.map((v: any) => v.value?.replace(/['"]/g, ""))
        : undefined,
    }));

    // Generate basic example
    const basicExample = {
      id: "basic",
      title: "Basic Usage",
      description: `Basic ${componentName.toLowerCase()} usage`,
      code: `<${componentName} />`,
    };

    const config = {
      id: componentDir,
      name: componentName,
      description: component.description || `${componentName} component`,
      category: (CATEGORY_MAP[componentDir] || "utility") as ComponentConfig["category"],
      componentId: componentName,
      importStatement: `import { ${componentName} } from "@patternmode/ui";`,
      props,
      examples: [basicExample],
    };

    console.log(`✅ Generated config for ${componentDir} (${props.length} props)`);
    return config;
  }
  catch (error) {
    console.error(`❌ Error processing ${componentDir}:`, error);
    return null;
  }
}

/**
 * Generate the complete component registry
 */
function generateComponentRegistry() {
  console.log("🚀 Generating component registry from JSDoc...\n");

  const componentDirs = fs.readdirSync(componentsDir)
    .filter((dir) => {
      const dirPath = path.join(componentsDir, dir);
      return fs.statSync(dirPath).isDirectory()
        && !dir.startsWith(".")
        && dir !== "progress-utils.ts"; // Skip utility files
    });

  const configs: Record<string, ComponentConfig> = {};
  const componentList: Record<string, string[]> = {};

  // Process each component
  for (const componentDir of componentDirs) {
    const config = extractComponentInfo(componentDir);
    if (config) {
      configs[componentDir] = config;

      // Add to category list
      const category = config.category;
      if (!componentList[category]) {
        componentList[category] = [];
      }
      componentList[category].push(componentDir);
    }
  }

  // Generate the registry file
  const registryContent = `// Auto-generated component registry from JSDoc
// DO NOT EDIT - This file is automatically generated by scripts/generate-component-registry.ts

import type { ComponentConfig, ComponentConfigRegistry } from "./lib/component-config-types";

// Component registry with all component configs
export const componentRegistry: ComponentConfigRegistry = ${JSON.stringify(configs, null, 2)};

// Component list organized by categories
export const COMPONENT_LIST = ${JSON.stringify(componentList, null, 2)};

// Type for component IDs
export type ComponentId = keyof typeof componentRegistry;

// Helper functions
export function getComponentsByCategory(category: string) {
  const componentIds = COMPONENT_LIST[category as keyof typeof COMPONENT_LIST] || [];
  return componentIds.map(id => componentRegistry[id]).filter(Boolean);
}

export function getComponentConfig(componentId: string) {
  return componentRegistry[componentId];
}
`;

  // Write the registry file
  const registryPath = path.resolve("src/component-registry.ts");
  fs.writeFileSync(registryPath, registryContent);

  console.log(`\n🎉 Generated component registry with ${Object.keys(configs).length} components`);
  console.log(`📝 Written to: ${path.relative(process.cwd(), registryPath)}`);

  // Show summary by category
  console.log("\n📊 Components by category:");
  for (const [category, components] of Object.entries(componentList)) {
    console.log(`  ${category}: ${components.length} components`);
  }
}

// Run the generator
generateComponentRegistry();
