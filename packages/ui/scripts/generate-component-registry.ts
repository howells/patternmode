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
import { generateComponentProps } from "./generate-component-props";

const componentsDir = path.resolve("src/components");



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
    // Generate props using the inline function
    const props = generateComponentProps(componentDir);

    if (!props) {
      return null;
    }

    // Convert directory name to PascalCase component name - this is the expected name
    const componentName = componentDir.split("-").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1),
    ).join("");

    // Read source for JSDoc parsing
    const sourceContent = fs.readFileSync(componentFile, "utf8");

    // Extract component description using react-docgen-typescript
    const componentInfo = parse(componentFile, {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: () => false, // We don't need props here, just component description
    });

    const component = componentInfo[0];

    // Extract icon and category from JSDoc comment
    let componentIcon: string | undefined;
    let componentCategory: string | undefined;

    const iconMatch = sourceContent.match(/@icon\s+(\w+)/);
    if (iconMatch) {
      componentIcon = iconMatch[1];
    }

    const categoryMatch = sourceContent.match(/@category\s+(\w+)/);
    if (categoryMatch) {
      componentCategory = categoryMatch[1];
    }

    const config = {
      id: componentDir,
      name: componentName,
      description: component?.description || `${componentName} component`,
      category: (componentCategory || "utility") as ComponentConfig["category"],
      icon: componentIcon, // Extract icon from JSDoc @icon tag
      componentId: componentName,
      importStatement: `import { ${componentName} } from "@patternmode/ui";`,
      props,
      // Examples should be provided via separate examples.tsx files like textarea
      examples: [],
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
 * Update the icon registry with new icons found in components
 */
async function updateIconRegistry(usedIcons: Set<string>) {
  const iconRegistryPath = path.resolve("src/lib/icon-registry.ts");
  const iconRegistryContent = fs.readFileSync(iconRegistryPath, "utf8");

  // Extract currently imported icons from the file
  const importMatch = iconRegistryContent.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["'];/);
  const currentImports = new Set<string>();

  if (importMatch) {
    const importList = importMatch[1]
      .split(",")
      .map(icon => icon.trim())
      .filter(icon => icon && !icon.startsWith("//"));
    importList.forEach(icon => currentImports.add(icon));
  }

  // Find missing icons that need to be added
  const missingIcons = Array.from(usedIcons).filter(icon => !currentImports.has(icon));

  if (missingIcons.length > 0) {
    console.log(`📦 Adding ${missingIcons.length} new icons to registry: ${missingIcons.join(", ")}`);

    // Add missing icons to imports
    const allImports = Array.from(new Set([...currentImports, ...missingIcons])).sort();
    const newImportStatement = `import {\n  // Component icons\n  ${allImports.join(",\n  ")},\n} from "lucide-react";`;

    // Update the icon registry content
    let updatedContent = iconRegistryContent.replace(
      /import\s*\{[^}]+\}\s*from\s*["']lucide-react["'];/,
      newImportStatement,
    );

    // Add missing icons to the registry object
    const registryMatch = updatedContent.match(/(export const ICON_REGISTRY[^{]*\{)([^}]+)(\};)/);
    if (registryMatch) {
      const registryStart = registryMatch[1];
      const registryContent = registryMatch[2];
      const registryEnd = registryMatch[3];

      // Parse existing registry entries
      const existingEntries = new Set<string>();
      const entryMatches = registryContent.matchAll(/^\s*(\w+)[:,]/gm);
      for (const match of entryMatches) {
        existingEntries.add(match[1]);
      }

      // Add missing entries
      const newEntries = missingIcons.filter(icon => !existingEntries.has(icon));
      if (newEntries.length > 0) {
        const newEntriesString = newEntries.map(icon => `  ${icon},`).join("\n");
        const updatedRegistryContent = `${registryContent.trim()},\n\n  // Auto-added component icons\n${newEntriesString}`;
        updatedContent = updatedContent.replace(
          /(export const ICON_REGISTRY[^{]*\{)([^}]+)(\};)/,
          `$1\n${updatedRegistryContent}\n$3`,
        );
      }
    }

    // Write updated icon registry
    fs.writeFileSync(iconRegistryPath, updatedContent);
    console.log(`✅ Updated icon registry with new icons`);
  }
  else {
    console.log(`✅ All component icons already exist in registry`);
  }
}

/**
 * Generate the complete component registry
 */
async function generateComponentRegistry() {
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
  const usedIcons: Set<string> = new Set();

  // Process each component
  for (const componentDir of componentDirs) {
    const config = extractComponentInfo(componentDir);
    if (config) {
      configs[componentDir] = config;

      // Collect used icons
      if (config.icon) {
        usedIcons.add(config.icon);
      }

      // Add to category list
      const category = config.category;
      if (!componentList[category]) {
        componentList[category] = [];
      }
      componentList[category].push(componentDir);
    }
  }

  // Update icon registry with any new icons
  await updateIconRegistry(usedIcons);

  // Validate that each component has exactly one icon
  const componentsWithIcons = Object.values(configs).filter(config => config.icon);
  const componentsWithoutIcons = Object.values(configs).filter(config => !config.icon);
  
  console.log(`\n🔍 Icon validation:`);
  console.log(`✅ Components with icons: ${componentsWithIcons.length}`);
  if (componentsWithoutIcons.length > 0) {
    console.log(`⚠️  Components without icons: ${componentsWithoutIcons.length}`);
    console.log(`   Missing icons: ${componentsWithoutIcons.map(c => c.name).join(", ")}`);
  }

  // Validate icon imports will work (this will throw if any icon doesn't exist)
  const sortedIcons = Array.from(usedIcons).sort();
  console.log(`📦 Validating ${sortedIcons.length} icon imports...`);
  
  try {
    // Dynamically import lucide-react to validate all icons exist
    const lucideModule = await import("lucide-react");
    const missingIcons = sortedIcons.filter(iconName => !lucideModule[iconName as keyof typeof lucideModule]);
    
    if (missingIcons.length > 0) {
      console.error(`❌ FATAL: Missing icons in lucide-react: ${missingIcons.join(", ")}`);
      console.error(`💡 Available icons can be found at: https://lucide.dev/icons/`);
      process.exit(1);
    }
    
    console.log(`✅ All ${sortedIcons.length} icons validated successfully`);
  } catch (error) {
    console.error(`❌ FATAL: Failed to validate icons:`, error);
    process.exit(1);
  }

  const iconImports = sortedIcons.length > 0 
    ? `import {\n  ${sortedIcons.join(",\n  ")}\n} from "lucide-react";\n`
    : "";

  // Generate the registry file
  const registryContent = `// Auto-generated component registry from JSDoc
// DO NOT EDIT - This file is automatically generated by scripts/generate-component-registry.ts

import type { ComponentConfigRegistry } from "../lib/component-config-types";
${iconImports}
// Icon registry for components
export const componentIcons = {
${sortedIcons.map(icon => `  ${icon},`).join('\n')}
};

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

// Get component icon from imported icons
export function getComponentIconComponent(componentId: string) {
  const config = componentRegistry[componentId];
  if (!config?.icon) {
    return undefined;
  }
  return componentIcons[config.icon as keyof typeof componentIcons];
}

// Additional helper functions for web app compatibility
export function getAllComponents() {
  return Object.values(componentRegistry);
}

export function getTotalComponentsCount() {
  return Object.keys(componentRegistry).length;
}

// Category configuration for web app
export const CATEGORY_CONFIG = [
  { key: "data", name: "Data", description: "Components for displaying data" },
  { key: "ui", name: "Interface", description: "Core UI components" },
  { key: "charts", name: "Charts", description: "Data visualization components" },
  { key: "navigation", name: "Navigation", description: "Navigation components" },
  { key: "inputs", name: "Inputs", description: "Form input components" },
  { key: "utility", name: "Utility", description: "Utility components" },
  { key: "forms", name: "Forms", description: "Form components" },
  { key: "layout", name: "Layout", description: "Layout components" },
  { key: "typography", name: "Typography", description: "Text components" },
  { key: "feedback", name: "Feedback", description: "Feedback components" },
] as const;

export type CategoryKey = typeof CATEGORY_CONFIG[number]["key"];
`;

  // Write the registry file to generated folder
  const generatedDir = path.resolve("src/generated");
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }
  const registryPath = path.resolve("src/generated/component-registry.ts");
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
generateComponentRegistry().catch(console.error);
