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

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

async function fixPreviewPropsExports() {
  console.log("🔧 Fixing preview props export names...");
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dir => !dir.startsWith("."));

  let totalUpdated = 0;

  for (const componentId of componentDirs) {
    const previewPath = path.join(COMPONENTS_DIR, componentId, "preview.tsx");
    const indexPath = path.join(COMPONENTS_DIR, componentId, "index.tsx");
    
    if (!fs.existsSync(previewPath)) {
      continue;
    }

    let previewContent = fs.readFileSync(previewPath, "utf8");
    const originalPreviewContent = previewContent;
    
    const componentName = toPascalCase(componentId);
    const pascalCaseProps = `${componentName}PreviewProps`;
    const camelCaseProps = `${toCamelCase(componentId)}PreviewProps`;
    
    // Replace PascalCase export with camelCase export in preview.tsx
    const pascalExportPattern = new RegExp(`export const ${pascalCaseProps}\\b`, "g");
    previewContent = previewContent.replace(pascalExportPattern, `export const ${camelCaseProps}`);
    
    if (previewContent !== originalPreviewContent) {
      fs.writeFileSync(previewPath, previewContent);
      console.log(`✅ Fixed preview props export in ${componentId}/preview.tsx`);
      totalUpdated++;
    }

    // Also update index.tsx if it exists
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, "utf8");
      const originalIndexContent = indexContent;
      
      // Update import/export in index.tsx to use camelCase
      indexContent = indexContent.replace(
        new RegExp(`\\b${pascalCaseProps}\\b`, "g"),
        camelCaseProps
      );
      
      if (indexContent !== originalIndexContent) {
        fs.writeFileSync(indexPath, indexContent);
        console.log(`✅ Fixed preview props import in ${componentId}/index.tsx`);
      }
    }
  }

  console.log(`🎉 Updated ${totalUpdated} preview files!`);
}

// Run the script
fixPreviewPropsExports().catch(console.error);