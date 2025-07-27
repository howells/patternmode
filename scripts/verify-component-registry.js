#!/usr/bin/env node

/**
 * Component Registry Verification Script
 * 
 * This script ensures that:
 * 1. Every component in src/components/ui/ is registered in src/lib/component-registry.ts
 * 2. Every component in src/lib/component-registry.ts exists in src/components/ui/
 * 3. All components follow the expected three-file structure (component.tsx, config.tsx, examples.tsx)
 * 4. All config imports in component-registry.ts are valid
 */

const fs = require('fs');
const path = require('path');

// Configuration
const UI_COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const COMPONENT_REGISTRY_FILE = path.join(__dirname, '../src/lib/component-registry.ts');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function logError(message) {
  log(colors.red, `❌ ERROR: ${message}`);
}

function logWarning(message) {
  log(colors.yellow, `⚠️  WARNING: ${message}`);
}

function logSuccess(message) {
  log(colors.green, `✅ SUCCESS: ${message}`);
}

function logInfo(message) {
  log(colors.blue, `ℹ️  INFO: ${message}`);
}

function logHeader(message) {
  log(colors.bold + colors.cyan, `\n🔍 ${message}`);
  log(colors.cyan, '='.repeat(message.length + 4));
}

/**
 * Get all component directories in src/components/ui/
 */
function getActualComponents() {
  try {
    const entries = fs.readdirSync(UI_COMPONENTS_DIR, { withFileTypes: true });
    const components = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.')) // Exclude hidden directories
      .sort();
    
    logInfo(`Found ${components.length} component directories in src/components/ui/`);
    return components;
  } catch (error) {
    logError(`Failed to read UI components directory: ${error.message}`);
    return [];
  }
}

/**
 * Extract component IDs from the component registry file
 */
function getRegisteredComponents() {
  try {
    const registryContent = fs.readFileSync(COMPONENT_REGISTRY_FILE, 'utf8');
    
    // Extract component IDs from the componentRegistry object
    const registryMatch = registryContent.match(/export const componentRegistry[^{]*\{([^}]+)\}/s);
    if (!registryMatch) {
      logError('Could not find componentRegistry object in component-registry.ts');
      return [];
    }
    
    const registrySection = registryMatch[1];
    
    // Extract all keys (component IDs) from the registry
    const componentMatches = registrySection.match(/^\s*["']?([^"':]+)["']?\s*:/gm);
    if (!componentMatches) {
      logError('Could not extract component IDs from componentRegistry');
      return [];
    }
    
    const components = componentMatches
      .map(match => {
        const cleaned = match.replace(/^\s*["']?([^"':]+)["']?\s*:/, '$1');
        return cleaned.trim();
      })
      .filter(id => id && !id.includes('//')) // Filter out empty strings and comments
      .sort();
    
    logInfo(`Found ${components.length} components registered in component-registry.ts`);
    return components;
  } catch (error) {
    logError(`Failed to read component registry file: ${error.message}`);
    return [];
  }
}

/**
 * Extract imported component config names from the registry file
 */
function getImportedConfigs() {
  try {
    const registryContent = fs.readFileSync(COMPONENT_REGISTRY_FILE, 'utf8');
    
    // Extract all import statements for component configs
    const importMatches = registryContent.match(/import\s+\{\s*componentConfig\s+as\s+\w+\s*\}\s+from\s+["']@\/components\/ui\/([^"']+)\/config["'];/g);
    
    const importedComponents = [];
    if (importMatches) {
      importMatches.forEach(importLine => {
        const match = importLine.match(/from\s+["']@\/components\/ui\/([^"']+)\/config["'];/);
        if (match) {
          importedComponents.push(match[1]);
        }
      });
    }
    
    logInfo(`Found ${importedComponents.length} component config imports in component-registry.ts`);
    return importedComponents.sort();
  } catch (error) {
    logError(`Failed to extract imported configs: ${error.message}`);
    return [];
  }
}

/**
 * Check if a component has the expected three-file structure
 */
function checkComponentStructure(componentName) {
  const componentDir = path.join(UI_COMPONENTS_DIR, componentName);
  const requiredFiles = [
    `${componentName}.tsx`,
    'config.tsx',
    'examples.tsx'
  ];
  
  const issues = [];
  
  requiredFiles.forEach(filename => {
    const filePath = path.join(componentDir, filename);
    if (!fs.existsSync(filePath)) {
      issues.push(`Missing ${filename}`);
    }
  });
  
  return issues;
}

/**
 * Verify that all config.tsx files can be imported successfully
 */
function checkConfigImports(components) {
  const issues = [];
  
  components.forEach(componentName => {
    const configPath = path.join(UI_COMPONENTS_DIR, componentName, 'config.tsx');
    if (fs.existsSync(configPath)) {
      try {
        const configContent = fs.readFileSync(configPath, 'utf8');
        
        // Check if it exports componentConfig
        if (!configContent.includes('export const componentConfig')) {
          issues.push(`${componentName}/config.tsx does not export componentConfig`);
        }
        
        // Check if it imports ComponentConfig type
        if (!configContent.includes('ComponentConfig')) {
          issues.push(`${componentName}/config.tsx does not import ComponentConfig type`);
        }
      } catch (error) {
        issues.push(`${componentName}/config.tsx cannot be read: ${error.message}`);
      }
    }
  });
  
  return issues;
}

/**
 * Main verification function
 */
function verifyComponentRegistry() {
  logHeader('Component Registry Verification');
  
  const actualComponents = getActualComponents();
  const registeredComponents = getRegisteredComponents();
  const importedComponents = getImportedConfigs();
  
  let hasErrors = false;
  
  // Check 1: Components in filesystem but not in registry
  logHeader('Missing from Registry');
  const missingFromRegistry = actualComponents.filter(comp => !registeredComponents.includes(comp));
  if (missingFromRegistry.length > 0) {
    hasErrors = true;
    logError(`${missingFromRegistry.length} components exist in filesystem but are NOT registered:`);
    missingFromRegistry.forEach(comp => {
      console.log(`  - ${comp}`);
    });
  } else {
    logSuccess('All filesystem components are registered in component-registry.ts');
  }
  
  // Check 2: Components in registry but not in filesystem
  logHeader('Missing from Filesystem');
  const missingFromFilesystem = registeredComponents.filter(comp => !actualComponents.includes(comp));
  if (missingFromFilesystem.length > 0) {
    hasErrors = true;
    logError(`${missingFromFilesystem.length} components are registered but do NOT exist in filesystem:`);
    missingFromFilesystem.forEach(comp => {
      console.log(`  - ${comp}`);
    });
  } else {
    logSuccess('All registered components exist in the filesystem');
  }
  
  // Check 3: Component structure validation
  logHeader('Component Structure Validation');
  let structureIssues = 0;
  actualComponents.forEach(component => {
    const issues = checkComponentStructure(component);
    if (issues.length > 0) {
      structureIssues++;
      logWarning(`${component} has structure issues:`);
      issues.forEach(issue => console.log(`  - ${issue}`));
    }
  });
  
  if (structureIssues === 0) {
    logSuccess('All components have proper three-file structure');
  } else {
    logWarning(`${structureIssues} components have structure issues`);
  }
  
  // Check 4: Config import validation
  logHeader('Config Import Validation');
  const configIssues = checkConfigImports(actualComponents);
  if (configIssues.length > 0) {
    hasErrors = true;
    logError(`${configIssues.length} config import issues found:`);
    configIssues.forEach(issue => console.log(`  - ${issue}`));
  } else {
    logSuccess('All config.tsx files are properly structured');
  }
  
  // Check 5: Import vs Registration consistency
  logHeader('Import vs Registration Consistency');
  const notImported = registeredComponents.filter(comp => 
    !importedComponents.includes(comp) && actualComponents.includes(comp)
  );
  
  if (notImported.length > 0) {
    logWarning(`${notImported.length} components are registered but not imported (using placeholders):`);
    notImported.forEach(comp => console.log(`  - ${comp}`));
  }
  
  // Summary
  logHeader('Summary');
  if (hasErrors) {
    logError('Component registry verification FAILED');
    logError('Please fix the issues above to ensure registry consistency');
    process.exit(1);
  } else {
    logSuccess('Component registry verification PASSED');
    logInfo(`✨ Registry contains ${registeredComponents.length} components`);
    logInfo(`📁 Filesystem contains ${actualComponents.length} component directories`);
    if (notImported.length > 0) {
      logInfo(`🔄 ${notImported.length} components are using placeholder configs and need conversion`);
    }
  }
}

// Run the verification
if (require.main === module) {
  verifyComponentRegistry();
}

module.exports = {
  verifyComponentRegistry,
  getActualComponents,
  getRegisteredComponents,
  checkComponentStructure
};