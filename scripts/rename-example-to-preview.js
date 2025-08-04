#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const COMPONENTS_DIR = path.join(__dirname, "../packages/ui/src/components");

function toPascalCase(str) {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

async function renameExampleToPreview() {
  console.log("🔍 Scanning for components with 'Example' naming...");
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dir => !dir.startsWith("."));

  let totalUpdated = 0;

  for (const componentId of componentDirs) {
    const previewPath = path.join(COMPONENTS_DIR, componentId, "preview.tsx");
    
    if (!fs.existsSync(previewPath)) {
      continue;
    }

    let content = fs.readFileSync(previewPath, "utf8");
    const originalContent = content;
    
    const componentName = toPascalCase(componentId);
    const exampleName = `${componentName}Example`;
    const previewName = `${componentName}Preview`;
    
    // Replace function declarations
    content = content.replace(
      new RegExp(`export function ${exampleName}\\b`, "g"),
      `export function ${previewName}`
    );
    
    // Replace const declarations
    content = content.replace(
      new RegExp(`export const ${exampleName}\\b`, "g"),
      `export const ${previewName}`
    );
    
    // Replace default exports
    content = content.replace(
      new RegExp(`export default ${exampleName}\\b`, "g"),
      `export default ${previewName}`
    );
    
    // Replace type references (e.g., TabsExampleProps -> TabsPreviewProps)
    const examplePropsPattern = new RegExp(`${componentName}ExampleProps\\b`, "g");
    const previewPropsPattern = `${componentName}PreviewProps`;
    content = content.replace(examplePropsPattern, previewPropsPattern);
    
    if (content !== originalContent) {
      fs.writeFileSync(previewPath, content);
      console.log(`✅ Renamed ${exampleName} → ${previewName} in ${componentId}/preview.tsx`);
      totalUpdated++;
    }
  }

  console.log(`🎉 Updated ${totalUpdated} preview components!`);
}

// Run the script
renameExampleToPreview().catch(console.error);