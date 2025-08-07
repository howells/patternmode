#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { camelCase, pascalCase } = require("es-toolkit");

async function scanComponents() {
  console.log("🔍 Scanning components directory...");

  const componentsDir = path.join(__dirname, "../src/components");
  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter((dir) => {
      // Skip non-component directories
      if (dir === "registry.ts" || dir.startsWith(".")) {
        return false;
      }

      // Must have config.ts
      const configPath = path.join(componentsDir, dir, "config.ts");
      return fs.existsSync(configPath);
    })
    .sort(); // Sort alphabetically for consistent output

  console.log(`📦 Found ${componentDirs.length} components`);
  return componentDirs;
}

function generateImports(components) {
  const configImports = [];
  const previewImports = [];

  components.forEach((id) => {
    // Config imports
    configImports.push(`import { ${camelCase(id)}Config } from "./${id}/config";`);

    // Combined preview imports - get both component and props from same import
    const pascalName = pascalCase(id);
    const previewPropsPath = path.join(__dirname, `../src/components/${id}/preview.tsx`);
    
    if (fs.existsSync(previewPropsPath)) {
      const previewContent = fs.readFileSync(previewPropsPath, 'utf8');
      const previewPropsName = `${camelCase(id)}PreviewProps`;
      
      if (previewContent.includes(`export const ${previewPropsName}`)) {
        // Import both component and props in one statement
        previewImports.push(`import { ${pascalName}Preview, ${previewPropsName} } from "./${id}/preview";`);
      } else {
        // Import only component if no props
        previewImports.push(`import { ${pascalName}Preview } from "./${id}/preview";`);
      }
    } else {
      // Import only component if no preview file
      previewImports.push(`import { ${pascalName}Preview } from "./${id}/preview";`);
    }
  });

  return { configImports, previewImports };
}

function generateComponentRegistry(components) {
  const entries = components.map((id) => {
    const camelCaseConfig = `${camelCase(id)}Config`;
    return `  "${id}": ${camelCaseConfig},`;
  });

  return entries.join("\n");
}

function generatePreviewRegistry(components) {
  const entries = components.map((id) => {
    const pascalName = pascalCase(id);
    return `  "${id}": ${pascalName}Preview,`;
  });

  return entries.join("\n");
}

function generatePreviewPropsRegistry(components) {
  const entries = [];

  components.forEach((id) => {
    // Check if preview props exist
    const previewPropsPath = path.join(__dirname, `../src/components/${id}/preview.tsx`);
    if (fs.existsSync(previewPropsPath)) {
      const previewContent = fs.readFileSync(previewPropsPath, 'utf8');
      const previewPropsName = `${camelCase(id)}PreviewProps`;
      if (previewContent.includes(`export const ${previewPropsName}`)) {
        entries.push(`  "${id}": ${previewPropsName},`);
      }
    }
  });

  return entries.join("\n");
}

function generateComponentMetadataRegistry(components) {
  const entries = components.map((id) => {
    const camelCaseConfig = `${camelCase(id)}Config`;
    return `  "${id}": { title: ${camelCaseConfig}.name, description: ${camelCaseConfig}.description },`;
  });

  return entries.join("\n");
}

function generateRegistryFile(components) {
  const { configImports, previewImports } = generateImports(components);
  const componentRegistryEntries = generateComponentRegistry(components);
  const previewRegistryEntries = generatePreviewRegistry(components);
  const previewPropsRegistryEntries = generatePreviewPropsRegistry(components);
  const componentMetadataRegistryEntries = generateComponentMetadataRegistry(components);

  return `import type React from "react";

import type { ComponentConfig, PropMetadata } from "../lib/component-config-types";

// Import all component configs
${configImports.join("\n")}

// Import all preview components and props
${previewImports.join("\n")}

export const COMPONENT_REGISTRY = {
${componentRegistryEntries}
} as const satisfies Record<string, ComponentConfig>;

// Static preview component registry
export const PREVIEW_REGISTRY = {
${previewRegistryEntries}
} as const satisfies Record<string, React.ComponentType<any>>;

// Static preview props registry
export const PREVIEW_PROPS_REGISTRY = {
${previewPropsRegistryEntries}
} as const satisfies Record<string, PropMetadata[]>;

// Component metadata registry
export const COMPONENT_METADATA_REGISTRY = {
${componentMetadataRegistryEntries}
} as const satisfies Record<string, { title: string; description: string }>;

// Derive types automatically
export type ComponentId = keyof typeof COMPONENT_REGISTRY;

// Helper functions
export function getComponentConfig(id: string): ComponentConfig | undefined {
  return COMPONENT_REGISTRY[id as ComponentId];
}

export function getAllComponents(): ComponentConfig[] {
  return Object.values(COMPONENT_REGISTRY);
}

export function getComponentsByCategory(category: string): ComponentConfig[] {
  return Object.values(COMPONENT_REGISTRY).filter(
    config => config.category === category,
  );
}

export function getTotalComponentsCount(): number {
  return Object.keys(COMPONENT_REGISTRY).length;
}

export function getPreviewComponent(id: string): React.ComponentType<any> | undefined {
  // Static lookup from preview registry
  const previewComponent = PREVIEW_REGISTRY[id as ComponentId];

  if (previewComponent) {
    return previewComponent;
  }

  // Fallback to primary component from config if no preview exists
  const config = getComponentConfig(id);
  let fallbackComponent: React.ComponentType<any> | undefined;

  // First try the direct component property
  if (config?.component) {
    fallbackComponent = config.component;
  }
  // Then try the primary component from components array
  else if (config?.components) {
    const primaryComponent = config.components.find(c => c.primary);
    fallbackComponent = primaryComponent?.component || config.components[0]?.component;
  }

  return fallbackComponent;
}

export function getPreviewProps(id: string): PropMetadata[] {
  // First try to get props from the preview props registry
  const previewProps = PREVIEW_PROPS_REGISTRY[id as keyof typeof PREVIEW_PROPS_REGISTRY];
  if (previewProps) {
    return previewProps;
  }

  // Fallback to config props
  const config = getComponentConfig(id);
  return config?.props || [];
}

export function getComponentMetadata(id: string): { title: string; description: string } | undefined {
  return COMPONENT_METADATA_REGISTRY[id as keyof typeof COMPONENT_METADATA_REGISTRY];
}

// Component list organized by categories (derived automatically)
export const COMPONENT_LIST = Object.values(COMPONENT_REGISTRY).reduce((acc, config) => {
  const category = config.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(config.id);
  return acc;
}, {} as Record<string, string[]>);

// Category configuration for web app
export const CATEGORY_CONFIG = [
  { key: "display", name: "Display & Content", description: "Components for displaying and organizing content" },
  { key: "controls", name: "Interactive Controls", description: "User interaction and input components" },
  { key: "layout", name: "Layout & Structure", description: "Components for page structure and spacing" },
  { key: "overlay", name: "Overlays & Modals", description: "Components that appear over content" },
  { key: "visual", name: "Visual Elements", description: "Small visual indicators and decorative elements" },
  { key: "actions", name: "Actions & Commands", description: "Components that trigger actions or display commands" },
  { key: "media", name: "Media & Rich Content", description: "Components for rich media and complex content display" },
  { key: "typography", name: "Typography", description: "Text and typography components" },
  { key: "navigation", name: "Navigation", description: "Navigation and wayfinding components" },
  { key: "charts", name: "Charts", description: "Data visualization components for displaying metrics and analytics" },
  { key: "feedback", name: "Feedback", description: "Status indicators, notifications, and user feedback components" },
  { key: "forms", name: "Forms", description: "Form layouts and validation components for complex data entry" },
  { key: "data", name: "Data", description: "Components for displaying and organizing structured data" },
  { key: "ui", name: "UI", description: "Core user interface components for building applications" },
  { key: "inputs", name: "Inputs", description: "Form inputs and interactive controls for user data collection" },
  { key: "utility", name: "Utility", description: "Helper components and tools for enhanced functionality" },
] as const;

export type CategoryKey = typeof CATEGORY_CONFIG[number]["key"];

export function getCategoryInfo(categoryKey: string) {
  const category = CATEGORY_CONFIG.find(c => c.key === categoryKey);
  if (!category) {
    return null;
  }

  return {
    title: \`\${category.name} Components\`,
    description: category.description,
  };
}

// Legacy compatibility exports (for existing imports)
export const componentRegistry = COMPONENT_REGISTRY;
export type ComponentConfigRegistry = typeof COMPONENT_REGISTRY;
`;
}

async function generateRegistry() {
  console.log("🚀 Generating component registry...");

  const components = await scanComponents();
  
  console.log("🔧 Updating component registry...");

  const registryPath = path.join(__dirname, "../src/components/registry.ts");
  const registryContent = generateRegistryFile(components);

  // Update the registry file
  fs.writeFileSync(registryPath, registryContent);

  console.log("✅ Updated registry.ts successfully!");
  
  return components;
}

// Run the script
if (require.main === module) {
  generateRegistry();
}

module.exports = { generateRegistry, scanComponents };