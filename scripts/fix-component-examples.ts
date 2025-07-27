#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to convert kebab-case to PascalCase
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Function to analyze and fix a single component
async function fixComponent(componentPath: string): Promise<{ fixed: number; errors: string[] }> {
  const componentName = path.basename(componentPath);
  const configPath = path.join(componentPath, 'config.tsx');
  const examplesPath = path.join(componentPath, 'examples.tsx');
  
  let fixCount = 0;
  const errors: string[] = [];
  
  try {
    // Check if both files exist
    if (!fs.existsSync(configPath) || !fs.existsSync(examplesPath)) {
      return { fixed: 0, errors: [`Missing config.tsx or examples.tsx in ${componentName}`] };
    }
    
    // Read current files
    const configContent = fs.readFileSync(configPath, 'utf8');
    const examplesContent = fs.readFileSync(examplesPath, 'utf8');
    
    // Parse example IDs from config
    const exampleIdRegex = /id:\s*["']([^"']+)["']/g;
    const exampleIds: string[] = [];
    let match;
    while ((match = exampleIdRegex.exec(configContent)) !== null) {
      exampleIds.push(match[1]);
    }
    
    if (exampleIds.length === 0) {
      return { fixed: 0, errors: [`No example IDs found in ${componentName}/config.tsx`] };
    }
    
    // Determine required example function names
    const requiredExports = exampleIds.map(id => `${toPascalCase(id)}Example`);
    
    // Check current exports in examples.tsx
    const exportRegex = /export\s+function\s+(\w+)/g;
    const currentExports: string[] = [];
    let exportMatch;
    while ((exportMatch = exportRegex.exec(examplesContent)) !== null) {
      currentExports.push(exportMatch[1]);
    }
    
    // Create mapping from current exports to required exports
    const missingExports = requiredExports.filter(req => !currentExports.includes(req));
    
    // Update examples.tsx if needed
    let updatedExamplesContent = examplesContent;
    let examplesUpdated = false;
    
    if (missingExports.length > 0) {
      // Try to rename existing exports to match requirements
      const unmatchedExports = currentExports.filter(current => !requiredExports.includes(current));
      
      for (let i = 0; i < Math.min(missingExports.length, unmatchedExports.length); i++) {
        const oldName = unmatchedExports[i];
        const newName = missingExports[i];
        
        // Replace function name
        const functionRegex = new RegExp(`(export\\s+function\\s+)${oldName}(\\s*\\()`, 'g');
        updatedExamplesContent = updatedExamplesContent.replace(functionRegex, `$1${newName}$2`);
        examplesUpdated = true;
        fixCount++;
      }
    }
    
    // Update config.tsx to use jsxToString calls
    let updatedConfigContent = configContent;
    let configUpdated = false;
    
    // Ensure jsxToString import exists
    if (!updatedConfigContent.includes('jsxToString')) {
      const importLine = 'import { jsxToString } from "@/lib/jsx-to-string";';
      if (!updatedConfigContent.includes(importLine)) {
        // Add import after other imports
        const reactImportMatch = updatedConfigContent.match(/import\s+React\s+from\s+["']react["'];/);
        if (reactImportMatch) {
          updatedConfigContent = updatedConfigContent.replace(
            reactImportMatch[0],
            reactImportMatch[0] + '\n' + importLine
          );
        } else {
          // Add at top after first import
          const firstImportMatch = updatedConfigContent.match(/import[^;]+;/);
          if (firstImportMatch) {
            updatedConfigContent = updatedConfigContent.replace(
              firstImportMatch[0],
              firstImportMatch[0] + '\n' + importLine
            );
          }
        }
        configUpdated = true;
      }
    }
    
    // Ensure required examples are imported
    const requiredImports = requiredExports.join(', ');
    const currentImportMatch = updatedConfigContent.match(/import\s+\{([^}]+)\}\s+from\s+["']\.\/examples["'];?/);
    
    if (currentImportMatch) {
      const currentImports = currentImportMatch[1].trim();
      if (currentImports !== requiredImports) {
        updatedConfigContent = updatedConfigContent.replace(
          currentImportMatch[0],
          `import { ${requiredImports} } from "./examples";`
        );
        configUpdated = true;
      }
    } else {
      // Add import after jsxToString import or at beginning
      const jsxImportMatch = updatedConfigContent.match(/import\s+\{\s*jsxToString\s*\}[^;]+;/);
      const insertAfter = jsxImportMatch ? jsxImportMatch[0] : updatedConfigContent.match(/import[^;]+;/)?.[0];
      
      if (insertAfter) {
        updatedConfigContent = updatedConfigContent.replace(
          insertAfter,
          insertAfter + '\n' + `import { ${requiredImports} } from "./examples";`
        );
        configUpdated = true;
      }
    }
    
    // Replace hardcoded strings with jsxToString calls
    for (const [index, exampleId] of exampleIds.entries()) {
      const expectedExportName = requiredExports[index];
      
      // Find code property for this example
      const exampleBlockRegex = new RegExp(
        `(\\{[^}]*id:\\s*["']${exampleId}["'][^}]*code:\\s*)["'\`](.*?)["'\`]([^}]*\\})`,
        'gs'
      );
      
      const blockMatch = exampleBlockRegex.exec(updatedConfigContent);
      if (blockMatch && !blockMatch[0].includes('jsxToString')) {
        updatedConfigContent = updatedConfigContent.replace(
          blockMatch[0],
          `${blockMatch[1]}jsxToString(<${expectedExportName} />)${blockMatch[3]}`
        );
        configUpdated = true;
        fixCount++;
      }
    }
    
    // Write updated files
    if (examplesUpdated) {
      fs.writeFileSync(examplesPath, updatedExamplesContent);
    }
    
    if (configUpdated) {
      fs.writeFileSync(configPath, updatedConfigContent);
    }
    
    return { fixed: fixCount, errors: [] };
    
  } catch (error) {
    return { fixed: 0, errors: [`Error processing ${componentName}: ${error}`] };
  }
}

// Main function to process all components
async function main() {
  const componentsDir = path.join(process.cwd(), 'src', 'components', 'ui');
  
  if (!fs.existsSync(componentsDir)) {
    console.error('Components directory not found:', componentsDir);
    process.exit(1);
  }
  
  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(componentsDir, dirent.name));
  
  console.log(`Found ${componentDirs.length} component directories`);
  
  let totalFixed = 0;
  const allErrors: string[] = [];
  
  for (const componentPath of componentDirs) {
    const componentName = path.basename(componentPath);
    console.log(`Processing ${componentName}...`);
    
    const result = await fixComponent(componentPath);
    totalFixed += result.fixed;
    allErrors.push(...result.errors);
    
    if (result.fixed > 0) {
      console.log(`  ✅ Fixed ${result.fixed} issues in ${componentName}`);
    }
    if (result.errors.length > 0) {
      console.log(`  ❌ Errors in ${componentName}:`, result.errors);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total fixes applied: ${totalFixed}`);
  console.log(`  Total errors: ${allErrors.length}`);
  
  if (allErrors.length > 0) {
    console.log('\n❌ Errors encountered:');
    allErrors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n✅ Component example fixing complete!');
}

// Run the script
main().catch(console.error);