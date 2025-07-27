#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

// Function to fix duplicate imports in a single file
function fixDuplicateImports(content: string): { fixed: string; changes: number } {
  let changes = 0;
  let fixedContent = content;
  
  // Pattern to match import statements with duplicate identifiers
  const importRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']([^"']+)["'];/g;
  
  fixedContent = fixedContent.replace(importRegex, (match, imports, from) => {
    const importList = imports.split(',').map((imp: string) => imp.trim());
    const uniqueImports = [...new Set(importList)];
    
    if (importList.length !== uniqueImports.length) {
      changes++;
      return `import { ${uniqueImports.join(', ')} } from "${from}";`;
    }
    
    return match;
  });
  
  return { fixed: fixedContent, changes };
}

// Function to process a single config file
async function fixConfigFile(configPath: string): Promise<{ fixed: number; errors: string[] }> {
  const componentName = path.basename(path.dirname(configPath));
  
  try {
    if (!fs.existsSync(configPath)) {
      return { fixed: 0, errors: [`Config file not found: ${configPath}`] };
    }
    
    const content = fs.readFileSync(configPath, 'utf8');
    const result = fixDuplicateImports(content);
    
    if (result.changes > 0) {
      fs.writeFileSync(configPath, result.fixed);
      console.log(`✅ Fixed ${result.changes} duplicate imports in ${componentName}`);
      return { fixed: result.changes, errors: [] };
    } else {
      console.log(`✓ ${componentName}: No duplicate imports found`);
      return { fixed: 0, errors: [] };
    }
    
  } catch (error) {
    const errorMsg = `Error processing ${componentName}: ${error}`;
    console.log(`❌ ${errorMsg}`);
    return { fixed: 0, errors: [errorMsg] };
  }
}

// Main function
async function main() {
  const componentsDir = path.join(process.cwd(), 'src', 'components', 'ui');
  
  if (!fs.existsSync(componentsDir)) {
    console.error('Components directory not found:', componentsDir);
    process.exit(1);
  }
  
  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(componentsDir, dirent.name, 'config.tsx'));
  
  console.log(`Fixing duplicate imports in ${componentDirs.length} config files...`);
  
  let totalFixed = 0;
  const allErrors: string[] = [];
  
  for (const configPath of componentDirs) {
    const result = await fixConfigFile(configPath);
    totalFixed += result.fixed;
    allErrors.push(...result.errors);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total duplicate imports fixed: ${totalFixed}`);
  console.log(`  Total errors: ${allErrors.length}`);
  
  if (allErrors.length > 0) {
    console.log('\n❌ Errors encountered:');
    allErrors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n✅ Duplicate import fix complete!');
}

main().catch(console.error);