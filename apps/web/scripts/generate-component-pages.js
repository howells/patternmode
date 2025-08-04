#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const PAGES_DIR = path.join(__dirname, "../apps/web/src/app/ui/components");

// Template for component pages
const PAGE_TEMPLATE = `import { Separator } from "@patternmode/ui/components/separator";
import { {{COMPONENT_CONFIG_NAME}} } from "@patternmode/ui/components/{{COMPONENT_ID}}/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function {{COMPONENT_NAME}}Page() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={{{COMPONENT_CONFIG_NAME}}.name}
        description={{{COMPONENT_CONFIG_NAME}}.description}
        badge={{{COMPONENT_CONFIG_NAME}}.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="{{COMPONENT_ID}}"
        componentName={{{COMPONENT_CONFIG_NAME}}.name}
        category={{{COMPONENT_CONFIG_NAME}}.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="{{COMPONENT_ID}}" />
    </div>
  );
}
`;

function toPascalCase(str) {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

async function scanComponents() {
  console.log("🔍 Scanning components directory...");

  const componentsDir = path.join(__dirname, "../packages/ui/src/components");
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

  components.forEach((id) => {
    // Config imports only - no preview imports needed for config-first architecture
    configImports.push(`import { ${toCamelCase(id)}Config } from "./${id}/config";`);
  });

  return { configImports };
}

function generateComponentRegistry(components) {
  const entries = components.map((id) => {
    const camelCaseConfig = `${toCamelCase(id)}Config`;
    return `  "${id}": ${camelCaseConfig},`;
  });

  return entries.join("\n");
}

// Remove preview registry - not needed for config-first architecture

function generateRegistryFile(components) {
  const { configImports } = generateImports(components);
  const componentRegistryEntries = generateComponentRegistry(components);

  return `import type React from "react";

import type { ComponentConfig, PropMetadata } from "../lib/component-config-types";

// Import all component configs
${configImports.join("\n")}

export const COMPONENT_REGISTRY = {
${componentRegistryEntries}
} as const satisfies Record<string, ComponentConfig>;

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

// Cache for dynamically imported preview components
const previewComponentCache = new Map<string, React.ComponentType<any> | null>();

export async function getPreviewComponent(id: string): Promise<React.ComponentType<any> | undefined> {
  // Check cache first
  if (previewComponentCache.has(id)) {
    const cached = previewComponentCache.get(id);
    return cached || undefined;
  }

  try {
    // Convert kebab-case to PascalCase for the preview component name
    const componentName = id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const previewComponentName = \`\${componentName}Preview\`;

    // Dynamically import the preview component
    const previewModule = await import(\`./\${id}/preview\`);
    const PreviewComponent = previewModule[previewComponentName];

    if (PreviewComponent) {
      previewComponentCache.set(id, PreviewComponent);
      return PreviewComponent;
    } else {
      // Cache null to avoid repeated failed imports
      previewComponentCache.set(id, null);
      return undefined;
    }
  } catch {
    // If preview doesn't exist, try to get the primary component from config
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

    // Cache the result (null if no fallback found)
    previewComponentCache.set(id, fallbackComponent || null);
    return fallbackComponent;
  }
}

export function getPreviewProps(id: string): PropMetadata[] {
  const config = getComponentConfig(id);
  return config?.props || [];
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

async function updateRegistry(components) {
  console.log("🔧 Updating component registry...");

  const registryPath = path.join(__dirname, "../packages/ui/src/components/registry.ts");
  const registryContent = generateRegistryFile(components);

  // Update the registry file
  fs.writeFileSync(registryPath, registryContent);

  console.log("✅ Updated registry.ts successfully!");
}

async function generateComponentPages() {
  console.log("🚀 Updating registry and generating component pages...");

  const components = await scanComponents();

  // Update the registry.ts file with all discovered components
  await updateRegistry(components);

  // Ensure components directory exists
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }

  let totalGenerated = 0;

  components.forEach((id) => {
    const componentDir = path.join(PAGES_DIR, id);
    const pageFile = path.join(componentDir, "page.tsx");

    // Ensure component directory exists
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Generate page content
    const configName = `${toCamelCase(id)}Config`;
    const pageContent = PAGE_TEMPLATE
      .replace(/\{\{COMPONENT_NAME\}\}/g, toPascalCase(id))
      .replace(/\{\{COMPONENT_ID\}\}/g, id)
      .replace(/\{\{COMPONENT_CONFIG_NAME\}\}/g, configName);

    // Write page file
    fs.writeFileSync(pageFile, pageContent);
    totalGenerated++;

    console.log(`✅ Generated: components/${id}/page.tsx`);
  });

  console.log(`🎉 Generated ${totalGenerated} component pages!`);
  console.log("📍 URLs will be: /ui/components/{component-id}");
}

// Run the script
generateComponentPages();
