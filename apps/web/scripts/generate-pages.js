#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { camelCase, pascalCase } = require("es-toolkit");
const { scanComponents } = require("../../../packages/ui/scripts/generate-registry.cjs");

const PAGES_DIR = path.join(__dirname, "../src/app/ui/components");

// Template for component pages
const PAGE_TEMPLATE = `import { Separator } from "@patternmode/ui/components/separator";
import { {{COMPONENT_CONFIG_NAME}} } from "@patternmode/ui/components/{{COMPONENT_ID}}/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: \`\${{{COMPONENT_CONFIG_NAME}}.name} | Patternmode\`,
  description: {{COMPONENT_CONFIG_NAME}}.description,
  openGraph: {
    title: \`\${{{COMPONENT_CONFIG_NAME}}.name} | Patternmode\`,
    description: {{COMPONENT_CONFIG_NAME}}.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: \`\${{{COMPONENT_CONFIG_NAME}}.name} | Patternmode\`,
    description: {{COMPONENT_CONFIG_NAME}}.description,
  },
};

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

async function generatePages() {
  console.log("🚀 Generating component pages...");

  const components = await scanComponents();

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
    const configName = `${camelCase(id)}Config`;
    const pageContent = PAGE_TEMPLATE
      .replace(/\{\{COMPONENT_NAME\}\}/g, pascalCase(id))
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
if (require.main === module) {
  generatePages();
}

module.exports = { generatePages };