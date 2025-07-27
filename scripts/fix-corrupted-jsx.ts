#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

// Function to fix corrupted jsxToString calls
function fixCorruptedJsx(content: string): { fixed: string; changes: number } {
  let changes = 0;
  let fixedContent = content;
  
  // Fix pattern: jsxToString(<ComponentExample />)CORRUPTED_TEXT
  // Replace with: jsxToString(<ComponentExample />),
  fixedContent = fixedContent.replace(
    /jsxToString\(<(\w+Example)\s*\/>\)[^,}]+/g,
    (match, componentName) => {
      changes++;
      return `jsxToString(<${componentName} />),`;
    }
  );
  
  // Fix more complex corrupted patterns where there's extra content after the closing comma
  fixedContent = fixedContent.replace(
    /jsxToString\(<(\w+Example)\s*\/>\),([^}\]]+[\]}])/g,
    (match, componentName, corrupted) => {
      // Only fix if there's clearly corrupted content (contains things like `}} />` or similar)
      if (corrupted.includes('}}') || corrupted.includes('/>') || corrupted.includes('<')) {
        changes++;
        return `jsxToString(<${componentName} />),`;
      }
      return match;
    }
  );
  
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
    const result = fixCorruptedJsx(content);
    
    if (result.changes > 0) {
      fs.writeFileSync(configPath, result.fixed);
      console.log(`✅ Fixed ${result.changes} corrupted jsxToString calls in ${componentName}`);
      return { fixed: result.changes, errors: [] };
    } else {
      console.log(`✓ ${componentName}: No corrupted jsxToString calls found`);
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
  
  console.log(`Fixing corrupted jsxToString calls in ${componentDirs.length} config files...`);
  
  let totalFixed = 0;
  const allErrors: string[] = [];
  
  for (const configPath of componentDirs) {
    const result = await fixConfigFile(configPath);
    totalFixed += result.fixed;
    allErrors.push(...result.errors);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total corrupted jsxToString calls fixed: ${totalFixed}`);
  console.log(`  Total errors: ${allErrors.length}`);
  
  if (allErrors.length > 0) {
    console.log('\n❌ Errors encountered:');
    allErrors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n✅ Corrupted jsxToString fix complete!');
}

main().catch(console.error);