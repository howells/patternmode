#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function extractTypes(componentContent) {
  const typeRegex = /^(?:export\s+)?type\s+(\w+)\s*=\s*[^;]+;/gm;
  const interfaceRegex = /^(?:export\s+)?interface\s+(\w+)\s*\{[^}]*\}/gms;
  
  const types = [];
  let match;
  
  // Extract type definitions
  while ((match = typeRegex.exec(componentContent)) !== null) {
    types.push(match[0]);
  }
  
  // Extract interface definitions
  while ((match = interfaceRegex.exec(componentContent)) !== null) {
    types.push(match[0]);
  }
  
  return types;
}

function extractVariants(componentContent) {
  // Look for className arrays and tv() calls
  const classNameArrays = [];
  
  // Find complex className arrays that could be extracted as variants
  const classNameRegex = /className=\{cx\(\s*(\[[^\]]+\])/gm;
  let match;
  
  while ((match = classNameRegex.exec(componentContent)) !== null) {
    classNameArrays.push(match[1]);
  }
  
  return classNameArrays;
}

function createTypesFile(componentDir, types) {
  if (types.length === 0) return false;
  
  const typesPath = path.join(componentDir, 'types.ts');
  
  // Generate types file content
  let content = 'import type React from "react";\n\n';
  
  // Add types
  types.forEach(type => {
    // Remove export keyword if present and add it back
    const cleanType = type.replace(/^export\s+/, '');
    content += `export ${cleanType}\n\n`;
  });
  
  fs.writeFileSync(typesPath, content);
  return true;
}

function createVariantsFile(componentDir, componentName) {
  const variantsPath = path.join(componentDir, 'variants.ts');
  
  // Create a basic variants file
  const content = `import { tv } from "tailwind-variants";

export const ${componentName.toLowerCase()}Variants = tv({
  base: "",
  variants: {},
  defaultVariants: {},
});
`;
  
  fs.writeFileSync(variantsPath, content);
  return true;
}

function updateComponentFile(componentPath, componentName, hasTypes, hasVariants) {
  let content = fs.readFileSync(componentPath, 'utf8');
  
  // Add imports at the top
  const imports = [];
  if (hasTypes) {
    // Extract type names from component
    const typeMatches = content.match(/type\s+(\w+Props?\w*)/g) || [];
    const typeNames = typeMatches.map(match => match.replace('type ', ''));
    if (typeNames.length > 0) {
      imports.push(`import type { ${typeNames.join(', ')} } from "./types";`);
    }
  }
  
  if (hasVariants) {
    imports.push(`import { ${componentName.toLowerCase()}Variants } from "./variants";`);
  }
  
  // Remove type definitions from component file
  content = content.replace(/^(?:export\s+)?type\s+\w+\s*=\s*[^;]+;/gm, '');
  content = content.replace(/^(?:export\s+)?interface\s+\w+\s*\{[^}]*\}/gms, '');
  
  // Add imports after existing imports
  const importEndIndex = content.lastIndexOf('import');
  if (importEndIndex !== -1) {
    const nextLineIndex = content.indexOf('\n', importEndIndex);
    if (nextLineIndex !== -1) {
      const beforeImports = content.substring(0, nextLineIndex + 1);
      const afterImports = content.substring(nextLineIndex + 1);
      content = beforeImports + imports.join('\n') + '\n' + afterImports;
    }
  }
  
  fs.writeFileSync(componentPath, content);
}

function restructureComponent(componentName) {
  const componentDir = path.join(process.cwd(), 'src', 'components', componentName);
  const componentPath = path.join(componentDir, 'component.tsx');
  
  if (!fs.existsSync(componentPath)) {
    console.log(`❌ Component ${componentName} not found`);
    return false;
  }
  
  // Skip if already restructured (has variants.ts)
  if (fs.existsSync(path.join(componentDir, 'variants.ts'))) {
    console.log(`⏭️  Component ${componentName} already restructured`);
    return false;
  }
  
  console.log(`🔧 Restructuring ${componentName}...`);
  
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  
  // Extract types and create types.ts
  const types = extractTypes(componentContent);
  const hasTypes = createTypesFile(componentDir, types);
  
  // Create variants.ts (basic structure)
  const hasVariants = createVariantsFile(componentDir, componentName);
  
  // Update component file to use separated files
  updateComponentFile(componentPath, componentName, hasTypes, hasVariants);
  
  console.log(`✅ Restructured ${componentName} (types: ${hasTypes}, variants: ${hasVariants})`);
  return true;
}

// Get component name from command line argument
const componentName = process.argv[2];
if (!componentName) {
  console.error('Usage: node restructure-component.js <component-name>');
  process.exit(1);
}

restructureComponent(componentName);