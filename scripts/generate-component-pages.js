#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const PAGES_DIR = path.join(__dirname, "../apps/web/src/app/ui/components");

// Template for component pages
const PAGE_TEMPLATE = `import { Separator } from "@patternmode/ui";
import { componentConfig } from "@patternmode/ui/components/{{COMPONENT_ID}}/component.config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { ComponentPropExplorer } from "@/features/prop-explorer/component-prop-explorer";

export default function {{COMPONENT_NAME}}Page() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={componentConfig.name}
        description={componentConfig.description}
        badge={componentConfig.badge}
      />

      {/* Main Content - Use ComponentPropExplorer */}
      <ComponentPropExplorer
        componentId="{{COMPONENT_ID}}"
        componentName={componentConfig.name}
        category={componentConfig.category}
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

async function loadComponentList() {
  try {
    // Try to dynamically import the registry from the built package
    const registryPath = path.join(__dirname, "../packages/ui/dist/components/registry.js");
    if (fs.existsSync(registryPath)) {
      console.log("📦 Loading components from built registry...");
      const { COMPONENT_REGISTRY } = require(registryPath);
      return Object.keys(COMPONENT_REGISTRY);
    }

    // Fallback: scan source directory for component configs
    console.log("📁 Scanning source directory for components...");
    const srcRegistryPath = path.join(__dirname, "../packages/ui/src/components");
    const componentDirs = fs.readdirSync(srcRegistryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter((dir) => {
        const configPath = path.join(srcRegistryPath, dir, "component.config.ts");
        return fs.existsSync(configPath);
      });

    console.log(`Found ${componentDirs.length} components from source`);
    return componentDirs;
  }
  catch (error) {
    console.error("Could not load components:", error.message);
    console.log("Using fallback component list...");

    // Hardcoded fallback list
    return [
      "accordion",
      "alert-dialog",
      "area-chart",
      "avatar",
      "badge",
      "bar-chart",
      "bar-list",
      "breadcrumbs",
      "button",
      "button-group",
      "calendar",
      "callout",
      "card",
      "carousel",
      "category-bar",
      "checkbox",
      "checkbox-group",
      "code-block",
      "collapsible",
      "combo-chart",
      "combobox",
      "context-menu",
      "copy-button",
      "date-picker",
      "description-list",
      "dialog",
      "dismiss-button",
      "divider",
      "donut-chart",
      "dot",
      "drawer",
      "dropdown-item",
      "empty-state",
      "field",
      "field-array",
      "fieldset",
      "form",
      "grid",
      "heading",
      "heading-element",
      "icon",
      "icon-container",
      "icon-select",
      "input",
      "inspector",
      "kbd",
      "label",
      "line-chart",
      "loader",
      "menu",
      "menu-bar",
      "meter",
      "navbar",
      "navigation-menu",
      "number-field",
      "pagination",
      "popover",
      "preview-card",
      "progress",
      "progress-circle",
      "radio",
      "radio-card-group",
      "radio-group",
      "responsive-drawer",
      "scroll-area",
      "search-field",
      "select",
      "select-native",
      "separator",
      "sheet",
      "sidebar",
      "skeleton",
      "slider",
      "spark-chart",
      "split-button",
      "stack",
      "stacked-list",
      "subheading",
      "switch",
      "tab-navigation",
      "table",
      "tabs",
      "tag",
      "tag-group",
      "tag-input",
      "text",
      "text-list",
      "textarea",
      "toast",
      "toggle",
      "toggle-group",
      "toolbar",
      "tooltip",
      "tracker",
    ];
  }
}

async function generateComponentPages() {
  console.log("🚀 Generating component pages...");

  const components = await loadComponentList();

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
    const pageContent = PAGE_TEMPLATE
      .replace(/\{\{COMPONENT_NAME\}\}/g, toPascalCase(id))
      .replace(/\{\{COMPONENT_ID\}\}/g, id);

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
