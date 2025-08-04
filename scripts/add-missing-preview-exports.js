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

async function addMissingPreviewExports() {
  console.log("🔍 Adding missing Preview exports to index.tsx files...");
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dir => !dir.startsWith("."));

  let totalUpdated = 0;

  for (const componentId of componentDirs) {
    const indexPath = path.join(COMPONENTS_DIR, componentId, "index.tsx");
    const previewPath = path.join(COMPONENTS_DIR, componentId, "preview.tsx");
    
    if (!fs.existsSync(indexPath) || !fs.existsSync(previewPath)) {
      continue;
    }

    let content = fs.readFileSync(indexPath, "utf8");
    const originalContent = content;
    
    const componentName = toPascalCase(componentId);
    const previewName = `${componentName}Preview`;
    const previewPropsName = `${toCamelCase(componentId)}PreviewProps`;
    
    // Check if Preview export already exists
    const hasPreviewExport = content.includes(previewName);
    
    if (!hasPreviewExport) {
      // Add the export line
      const exportLine = `export { ${previewName}, ${previewPropsName} } from "./preview";`;
      
      // Add after the existing exports
      content = content.trim() + "\n" + exportLine + "\n";
      
      fs.writeFileSync(indexPath, content);
      console.log(`✅ Added Preview exports to ${componentId}/index.tsx`);
      totalUpdated++;
    }
  }

  console.log(`🎉 Updated ${totalUpdated} index files!`);
}

// Run the script
addMissingPreviewExports().catch(console.error);