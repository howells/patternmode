#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkConfigSyntax(configPath: string): Promise<{ valid: boolean; error?: string }> {
  try {
    await execAsync(`npx tsc --noEmit "${configPath}"`);
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: error.stdout || error.stderr || error.message };
  }
}

async function main() {
  const componentsDir = path.join(process.cwd(), 'src', 'components', 'ui');
  
  if (!fs.existsSync(componentsDir)) {
    console.error('Components directory not found:', componentsDir);
    process.exit(1);
  }
  
  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`Checking syntax for ${componentDirs.length} component config files...`);
  
  const errors: Array<{ component: string; error: string }> = [];
  
  for (const componentName of componentDirs) {
    const configPath = path.join(componentsDir, componentName, 'config.tsx');
    
    if (!fs.existsSync(configPath)) {
      errors.push({ component: componentName, error: 'config.tsx not found' });
      continue;
    }
    
    const result = await checkConfigSyntax(configPath);
    
    if (!result.valid) {
      errors.push({ component: componentName, error: result.error || 'Unknown error' });
      console.log(`❌ ${componentName}: Syntax error`);
    } else {
      console.log(`✅ ${componentName}: OK`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total components: ${componentDirs.length}`);
  console.log(`  Valid configs: ${componentDirs.length - errors.length}`);
  console.log(`  Invalid configs: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Components with syntax errors:');
    errors.forEach(({ component, error }) => {
      console.log(`  - ${component}: ${error.split('\n')[0]}`);
    });
  }
}

main().catch(console.error);