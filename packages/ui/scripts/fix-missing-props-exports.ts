#!/usr/bin/env tsx

/**
 * Script to fix missing props type exports in component files
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const COMPONENTS_DIR = join(__dirname, "../src/components");

// Components that need their props types exported
const MISSING_EXPORTS = [
  "area-chart",
  "bar-chart", 
  "carousel",
  "combo-chart",
  "donut-chart",
  "form",
  "label",
  "line-chart",
  "responsive-drawer",
  "scroll-area",
  "slider",
  "spark-chart",
  "switch",
  "text",
  "tracker"
];

function getComponentName(dirName: string): string {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function fixMissingExport(componentDir: string) {
  const componentPath = join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);
  
  try {
    const content = readFileSync(componentPath, "utf-8");
    const componentName = getComponentName(componentDir);
    const propsTypeName = `${componentName}Props`;
    
    // Check if props type exists but is not exported
    const hasPropsType = content.includes(`type ${propsTypeName} =`) || content.includes(`type ${propsTypeName}<`);
    
    if (!hasPropsType) {
      console.log(`⚠️  ${componentDir}: No ${propsTypeName} type found`);
      return false;
    }
    
    // Check if already exported
    if (content.includes(`type ${propsTypeName}`) && content.includes(`export {`) && content.includes(`, type ${propsTypeName}`)) {
      console.log(`✅ ${componentDir}: ${propsTypeName} already exported`);
      return true;
    }
    
    // Find the export statement and add the props type
    const exportMatch = content.match(/export\s*{\s*([^}]+)\s*};?\s*$/m);
    if (!exportMatch) {
      console.log(`⚠️  ${componentDir}: No export statement found`);
      return false;
    }
    
    const currentExports = exportMatch[1];
    const newExports = currentExports.includes(`, type ${propsTypeName}`) 
      ? currentExports 
      : `${currentExports}, type ${propsTypeName}`;
    
    const updatedContent = content.replace(
      /export\s*{\s*([^}]+)\s*};?\s*$/m,
      `export { ${newExports} };`
    );
    
    // Handle special cases for spark-chart (multiple chart types)
    if (componentDir === "spark-chart") {
      const sparkUpdatedContent = updatedContent.replace(
        /export\s*{\s*([^}]+)\s*};?\s*$/m,
        `export { ${newExports.replace('SparkChartProps', 'SparkAreaChartProps, type SparkLineChartProps, type SparkBarChartProps')} };`
      );
      writeFileSync(componentPath, sparkUpdatedContent);
      console.log(`✅ Updated ${componentDir} to export SparkAreaChartProps, SparkLineChartProps, SparkBarChartProps`);
      return true;
    }
    
    writeFileSync(componentPath, updatedContent);
    console.log(`✅ Updated ${componentDir} to export ${propsTypeName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating ${componentDir}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🔧 Fixing missing props type exports...\n");
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const componentDir of MISSING_EXPORTS) {
    const success = fixMissingExport(componentDir);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Total components checked: ${MISSING_EXPORTS.length}`);
}

main().catch(console.error);