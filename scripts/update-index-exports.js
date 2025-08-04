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

async function updateIndexExports() {
  console.log("🔍 Updating index.tsx exports...");
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dir => !dir.startsWith("."));

  let totalUpdated = 0;

  for (const componentId of componentDirs) {
    const indexPath = path.join(COMPONENTS_DIR, componentId, "index.tsx");
    
    if (!fs.existsSync(indexPath)) {
      continue;
    }

    let content = fs.readFileSync(indexPath, "utf8");
    const originalContent = content;
    
    const componentName = toPascalCase(componentId);
    const exampleName = `${componentName}Example`;
    const previewName = `${componentName}Preview`;
    
    // Replace export patterns like:
    // export { AccordionExample as AccordionPreview, accordionPreviewProps } from "./preview";
    // to:
    // export { AccordionPreview, accordionPreviewProps } from "./preview";
    
    const aliasPattern = new RegExp(
      `export\\s*\\{\\s*${exampleName}\\s+as\\s+${previewName}\\b`,
      "g"
    );
    content = content.replace(aliasPattern, `export { ${previewName}`);
    
    // Replace direct exports:
    // export { FieldArrayExample, ... } from "./preview";
    // to:
    // export { FieldArrayPreview, ... } from "./preview";
    
    const directExportPattern = new RegExp(`\\b${exampleName}\\b`, "g");
    content = content.replace(directExportPattern, previewName);
    
    if (content !== originalContent) {
      fs.writeFileSync(indexPath, content);
      console.log(`✅ Updated exports in ${componentId}/index.tsx`);
      totalUpdated++;
    }
  }

  console.log(`🎉 Updated ${totalUpdated} index files!`);
}

// Run the script
updateIndexExports().catch(console.error);