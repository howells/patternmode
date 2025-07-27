#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all component directories
const componentsDir = path.join(process.cwd(), 'src', 'components', 'ui');
const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${componentDirs.length} components to check...`);

let fixedCount = 0;
let issuesFound = [];

for (const componentId of componentDirs) {
  const componentDir = path.join(componentsDir, componentId);
  const configFile = path.join(componentDir, 'config.tsx');
  const examplesFile = path.join(componentDir, 'examples.tsx');
  
  if (!fs.existsSync(configFile) || !fs.existsSync(examplesFile)) {
    continue;
  }
  
  console.log(`\nChecking ${componentId}...`);
  
  // Read config file to find all jsxToString usage
  const configContent = fs.readFileSync(configFile, 'utf8');
  const examplesContent = fs.readFileSync(examplesFile, 'utf8');
  
  // Extract all component names used in jsxToString calls
  const jsxMatches = configContent.match(/jsxToString\(<([^>]+)/g);
  if (!jsxMatches) continue;
  
  const usedComponents = jsxMatches.map(match => 
    match.replace('jsxToString(<', '').trim()
  );
  
  console.log(`  Found jsxToString usage: ${usedComponents.join(', ')}`);
  
  // Check which components are missing from examples
  const missingComponents = [];
  const missingImports = [];
  
  for (const componentName of usedComponents) {
    // Check if component is exported in examples
    const exportPattern = new RegExp(`export.*${componentName}`, 'i');
    if (!exportPattern.test(examplesContent)) {
      missingComponents.push(componentName);
    }
    
    // Check if component is imported in config
    const importPattern = new RegExp(`import.*${componentName}`, 'i');
    if (!importPattern.test(configContent)) {
      missingImports.push(componentName);
    }
  }
  
  let hasChanges = false;
  
  // Fix missing exports in examples file
  if (missingComponents.length > 0) {
    console.log(`  Adding missing exports: ${missingComponents.join(', ')}`);
    let updatedExamples = examplesContent;
    
    for (const componentName of missingComponents) {
      // Try to find base component name (remove prefixes like Default, Basic, etc.)
      let baseComponentName = componentName
        .replace(/^Default/, '')
        .replace(/^Basic/, '')
        .replace(/^Simple/, '');
      
      // If no base name found, use the main component function
      if (!baseComponentName || baseComponentName === componentName) {
        // Look for the main component function (usually matches directory name)
        const mainFunctionPattern = new RegExp(`export function ${componentId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join('')}Example`, 'i');
        
        if (mainFunctionPattern.test(updatedExamples)) {
          baseComponentName = componentId.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join('') + 'Example';
        } else {
          // Fallback: find any function export
          const functionMatch = updatedExamples.match(/export function (\w+Example)/);
          if (functionMatch) {
            baseComponentName = functionMatch[1];
          }
        }
      } else {
        baseComponentName += 'Example';
      }
      
      // Add the export at the end of the file
      updatedExamples += `\nexport const ${componentName} = ${baseComponentName};`;
    }
    
    fs.writeFileSync(examplesFile, updatedExamples);
    hasChanges = true;
  }
  
  // Fix missing imports in config file
  if (missingImports.length > 0) {
    console.log(`  Adding missing imports: ${missingImports.join(', ')}`);
    let updatedConfig = configContent;
    
    // Find the import line for examples
    const importMatch = updatedConfig.match(/import\s*{([^}]+)}\s*from\s*["']\.\/examples["'];?/);
    if (importMatch) {
      const currentImports = importMatch[1].split(',').map(imp => imp.trim());
      const newImports = [...new Set([...currentImports, ...missingImports])];
      const newImportLine = `import { ${newImports.join(', ')} } from "./examples";`;
      updatedConfig = updatedConfig.replace(importMatch[0], newImportLine);
    } else {
      // Add import line if it doesn't exist
      const firstImportMatch = updatedConfig.match(/import.*from.*["'];?\n/);
      if (firstImportMatch) {
        const insertPoint = updatedConfig.indexOf(firstImportMatch[0]) + firstImportMatch[0].length;
        const newImportLine = `import { ${missingImports.join(', ')} } from "./examples";\n`;
        updatedConfig = updatedConfig.slice(0, insertPoint) + newImportLine + updatedConfig.slice(insertPoint);
      }
    }
    
    fs.writeFileSync(configFile, updatedConfig);
    hasChanges = true;
  }
  
  // Check for common syntax errors and fix them
  let updatedConfig = fs.readFileSync(configFile, 'utf8');
  
  // Fix missing commas in jsxToString calls
  const fixedConfig = updatedConfig
    .replace(/jsxToString\(<[^>]+>\)\s*}/g, (match) => {
      if (!match.includes(',')) {
        return match.replace(')', '),');
      }
      return match;
    })
    .replace(/code:\s*jsxToString\(<[^>]+>\)\s*}/g, (match) => {
      if (!match.includes(',')) {
        return match.replace('}', ',\n    },');
      }
      return match;
    });
  
  if (fixedConfig !== updatedConfig) {
    console.log(`  Fixed syntax errors in config`);
    fs.writeFileSync(configFile, fixedConfig);
    hasChanges = true;
  }
  
  // Add React import if missing and file uses JSX
  if (!updatedConfig.includes('import React') && updatedConfig.includes('jsxToString(<')) {
    console.log(`  Adding missing React import`);
    const reactImport = 'import React from "react";\n';
    const firstImport = updatedConfig.match(/^import/m);
    if (firstImport) {
      const insertIndex = updatedConfig.indexOf(firstImport[0]);
      updatedConfig = updatedConfig.slice(0, insertIndex) + reactImport + updatedConfig.slice(insertIndex);
    } else {
      updatedConfig = reactImport + updatedConfig;
    }
    fs.writeFileSync(configFile, updatedConfig);
    hasChanges = true;
  }
  
  if (hasChanges) {
    fixedCount++;
    console.log(`  ✅ Fixed ${componentId}`);
  } else {
    console.log(`  ✓ ${componentId} already OK`);
  }
}

console.log(`\n🎉 Completed! Fixed ${fixedCount} components.`);
console.log(`\nRunning tests to verify fixes...`);