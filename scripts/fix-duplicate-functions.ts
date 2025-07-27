#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

// Function to fix duplicate function definitions
function fixDuplicateFunctions(content: string): { fixed: string; changes: number } {
  let changes = 0;
  let fixedContent = content;
  
  // Find all export function declarations
  const functionRegex = /export\s+function\s+(\w+)\s*\([^)]*\)\s*\{/g;
  const functions = new Map<string, number>();
  
  let match;
  while ((match = functionRegex.exec(content)) !== null) {
    const functionName = match[1];
    functions.set(functionName, (functions.get(functionName) || 0) + 1);
  }
  
  // Find duplicates
  const duplicates = Array.from(functions.entries()).filter(([name, count]) => count > 1);
  
  if (duplicates.length > 0) {
    console.log(`  Found duplicates: ${duplicates.map(([name, count]) => `${name}(${count})`).join(', ')}`);
    
    // For each duplicate function, keep only the first occurrence
    for (const [funcName] of duplicates) {
      let occurrenceCount = 0;
      const funcRegex = new RegExp(`export\\s+function\\s+${funcName}\\s*\\([^)]*\\)\\s*\\{`, 'g');
      
      fixedContent = fixedContent.replace(funcRegex, (match) => {
        occurrenceCount++;
        if (occurrenceCount === 1) {
          return match; // Keep first occurrence
        } else {
          changes++;
          return `// REMOVED DUPLICATE: ${match}`;
        }
      });
    }
    
    // Also handle export const assignments
    for (const [funcName] of duplicates) {
      let occurrenceCount = 0;
      const constRegex = new RegExp(`export\\s+const\\s+${funcName}\\s*=`, 'g');
      
      let constMatch;
      while ((constMatch = constRegex.exec(fixedContent)) !== null) {
        occurrenceCount++;
      }
      
      if (occurrenceCount > 0) {
        let constOccurrenceCount = 0;
        fixedContent = fixedContent.replace(new RegExp(`export\\s+const\\s+${funcName}\\s*=[^;]+;`, 'g'), (match) => {
          constOccurrenceCount++;
          if (constOccurrenceCount === 1) {
            return match; // Keep first occurrence  
          } else {
            changes++;
            return `// REMOVED DUPLICATE: ${match}`;
          }
        });
      }
    }
  }
  
  return { fixed: fixedContent, changes };
}

// Function to process a single examples file
async function fixExamplesFile(examplesPath: string): Promise<{ fixed: number; errors: string[] }> {
  const componentName = path.basename(path.dirname(examplesPath));
  
  try {
    if (!fs.existsSync(examplesPath)) {
      return { fixed: 0, errors: [`Examples file not found: ${examplesPath}`] };
    }
    
    const content = fs.readFileSync(examplesPath, 'utf8');
    const result = fixDuplicateFunctions(content);
    
    if (result.changes > 0) {
      fs.writeFileSync(examplesPath, result.fixed);
      console.log(`✅ Fixed ${result.changes} duplicate functions in ${componentName}`);
      return { fixed: result.changes, errors: [] };
    } else {
      console.log(`✓ ${componentName}: No duplicate functions found`);
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
    .map(dirent => path.join(componentsDir, dirent.name, 'examples.tsx'));
  
  console.log(`Fixing duplicate functions in ${componentDirs.length} examples files...`);
  
  let totalFixed = 0;
  const allErrors: string[] = [];
  
  for (const examplesPath of componentDirs) {
    const result = await fixExamplesFile(examplesPath);
    totalFixed += result.fixed;
    allErrors.push(...result.errors);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total duplicate functions fixed: ${totalFixed}`);
  console.log(`  Total errors: ${allErrors.length}`);
  
  if (allErrors.length > 0) {
    console.log('\n❌ Errors encountered:');
    allErrors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n✅ Duplicate function fix complete!');
}

main().catch(console.error);