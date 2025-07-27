#!/usr/bin/env node

/**
 * Component Category Pages Verification Script
 * 
 * This script ensures that:
 * 1. All category pages exist and can be loaded
 * 2. All components are properly categorized
 * 3. Category page routes work correctly
 * 4. All components in each category have valid configs
 * 5. No orphaned components exist (components without categories)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PAGES_DIR = path.join(__dirname, '../src/app');
const UI_COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const COMPONENT_REGISTRY_FILE = path.join(__dirname, '../src/lib/component-registry.ts');

// Expected categories based on the component registry
const EXPECTED_CATEGORIES = [
  'text',
  'layout', 
  'navigation',
  'feedback',
  'overlay',
  'data',
  'media',
  'utility',
  'inputs',
  'forms',
  'charts'
];

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
 * Check if category page directories exist
 */
function checkCategoryPageDirectories() {
  const issues = [];
  const existingPages = [];
  
  EXPECTED_CATEGORIES.forEach(category => {
    const categoryPagePath = path.join(PAGES_DIR, category);
    
    if (fs.existsSync(categoryPagePath)) {
      existingPages.push(category);
      
      // Check if page.tsx exists
      const pageFile = path.join(categoryPagePath, 'page.tsx');
      if (!fs.existsSync(pageFile)) {
        issues.push(`${category}/page.tsx does not exist`);
      }
      
      // Check if layout.tsx exists (optional but recommended)
      const layoutFile = path.join(categoryPagePath, 'layout.tsx');
      if (!fs.existsSync(layoutFile)) {
        issues.push(`${category}/layout.tsx does not exist (optional but recommended)`);
      }
    } else {
      issues.push(`Category page directory '${category}' does not exist`);
    }
  });
  
  return { issues, existingPages };
}

/**
 * Extract component categories from the registry
 */
function getComponentCategories() {
  try {
    const registryContent = fs.readFileSync(COMPONENT_REGISTRY_FILE, 'utf8');
    
    // Extract the COMPONENT_LIST object
    const componentListMatch = registryContent.match(/export const COMPONENT_LIST = \{([^}]+)\}/s);
    if (!componentListMatch) {
      throw new Error('Could not find COMPONENT_LIST in component-registry.ts');
    }
    
    const componentListContent = componentListMatch[1];
    const categories = {};
    
    // Parse each category
    EXPECTED_CATEGORIES.forEach(category => {
      const categoryRegex = new RegExp(`${category}:\\s*\\[([^\\]]+)\\]`, 's');
      const categoryMatch = componentListContent.match(categoryRegex);
      
      if (categoryMatch) {
        const componentsStr = categoryMatch[1];
        const components = componentsStr
          .split(',')
          .map(comp => comp.trim().replace(/['"]/g, ''))
          .filter(comp => comp && !comp.startsWith('//'))
          .sort();
        
        categories[category] = components;
      } else {
        categories[category] = [];
      }
    });
    
    return categories;
  } catch (error) {
    logError(`Failed to extract component categories: ${error.message}`);
    return {};
  }
}

/**
 * Get all components and their actual categories from config files
 */
function getActualComponentCategories() {
  const componentCategories = {};
  
  try {
    const entries = fs.readdirSync(UI_COMPONENTS_DIR, { withFileTypes: true });
    const componentDirs = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.'));
    
    componentDirs.forEach(componentName => {
      const configPath = path.join(UI_COMPONENTS_DIR, componentName, 'config.tsx');
      
      if (fs.existsSync(configPath)) {
        try {
          const configContent = fs.readFileSync(configPath, 'utf8');
          
          // Extract category from config
          const categoryMatch = configContent.match(/category:\s*["']([^"']+)["']/);
          if (categoryMatch) {
            const category = categoryMatch[1];
            if (!componentCategories[category]) {
              componentCategories[category] = [];
            }
            componentCategories[category].push(componentName);
          } else {
            logWarning(`${componentName} config.tsx has no category defined`);
          }
        } catch (error) {
          logWarning(`Failed to read ${componentName}/config.tsx: ${error.message}`);
        }
      }
    });
    
    // Sort components in each category
    Object.keys(componentCategories).forEach(category => {
      componentCategories[category].sort();
    });
    
    return componentCategories;
  } catch (error) {
    logError(`Failed to read component directories: ${error.message}`);
    return {};
  }
}

/**
 * Check if page.tsx files have proper structure
 */
function validatePageStructure(existingPages) {
  const issues = [];
  
  existingPages.forEach(category => {
    const pageFile = path.join(PAGES_DIR, category, 'page.tsx');
    
    if (fs.existsSync(pageFile)) {
      try {
        const pageContent = fs.readFileSync(pageFile, 'utf8');
        
        // Check for required imports/exports
        if (!pageContent.includes('export default')) {
          issues.push(`${category}/page.tsx does not have a default export`);
        }
        
        // Check if it references the category
        if (!pageContent.includes(category) && !pageContent.includes('Category')) {
          issues.push(`${category}/page.tsx may not be properly configured for category '${category}'`);
        }
        
        // Check for React import (if using JSX)
        if (pageContent.includes('<') && !pageContent.includes('import') && !pageContent.includes('React')) {
          issues.push(`${category}/page.tsx may be missing React import`);
        }
        
      } catch (error) {
        issues.push(`Failed to read ${category}/page.tsx: ${error.message}`);
      }
    }
  });
  
  return issues;
}

/**
 * Check for component-category consistency
 */
function checkCategoryConsistency(registryCategories, actualCategories) {
  const issues = [];
  
  // Check if registry categories match actual config categories
  Object.keys(registryCategories).forEach(category => {
    const registryComponents = registryCategories[category];
    const actualComponents = actualCategories[category] || [];
    
    // Components in registry but not in actual configs
    const missingFromActual = registryComponents.filter(comp => !actualComponents.includes(comp));
    if (missingFromActual.length > 0) {
      issues.push(`Category '${category}': ${missingFromActual.length} components listed in registry but not found in configs: ${missingFromActual.join(', ')}`);
    }
    
    // Components in actual configs but not in registry
    const missingFromRegistry = actualComponents.filter(comp => !registryComponents.includes(comp));
    if (missingFromRegistry.length > 0) {
      issues.push(`Category '${category}': ${missingFromRegistry.length} components found in configs but not listed in registry: ${missingFromRegistry.join(', ')}`);
    }
  });
  
  // Check for components with categories not in expected list
  Object.keys(actualCategories).forEach(category => {
    if (!EXPECTED_CATEGORIES.includes(category)) {
      issues.push(`Unexpected category '${category}' found in component configs. Components: ${actualCategories[category].join(', ')}`);
    }
  });
  
  return issues;
}

/**
 * Generate category page template
 */
function generateCategoryPageTemplate(category) {
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  return `import { ComponentGallery } from "@/components/component-gallery";
import { getComponentsByCategory } from "@/lib/component-registry";

export default function ${capitalizedCategory}Page() {
  const components = getComponentsByCategory("${category}");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">${capitalizedCategory} Components</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          ${getCategoryDescription(category)}
        </p>
      </div>
      
      <ComponentGallery components={components} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ category: "${category}" }];
}
`;
}

/**
 * Get description for category
 */
function getCategoryDescription(category) {
  const descriptions = {
    text: 'Typography and text-related components for displaying content.',
    layout: 'Components for structuring and organizing page layouts.',
    navigation: 'Navigation components for moving through your application.',
    feedback: 'Components that provide feedback and status information to users.',
    overlay: 'Modal dialogs, popovers, and other overlay components.',
    data: 'Components for displaying and organizing data.',
    media: 'Components for displaying images, videos, and other media.',
    utility: 'Utility components and helpers for various tasks.',
    inputs: 'Form input components for user interaction.',
    forms: 'Form-related components and validation helpers.',
    charts: 'Data visualization and charting components.'
  };
  
  return descriptions[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} components.`;
}

/**
 * Create missing category pages
 */
function createMissingCategoryPages(missingPages) {
  missingPages.forEach(category => {
    const categoryDir = path.join(PAGES_DIR, category);
    const pageFile = path.join(categoryDir, 'page.tsx');
    
    try {
      // Create directory if it doesn't exist
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
        logInfo(`Created directory: ${category}/`);
      }
      
      // Create page.tsx if it doesn't exist
      if (!fs.existsSync(pageFile)) {
        fs.writeFileSync(pageFile, generateCategoryPageTemplate(category));
        logSuccess(`Created page: ${category}/page.tsx`);
      }
    } catch (error) {
      logError(`Failed to create ${category} page: ${error.message}`);
    }
  });
}

/**
 * Main verification function
 */
function verifyCategoryPages() {
  logHeader('Component Category Pages Verification');
  
  let hasErrors = false;
  
  // Check 1: Category page directories
  logHeader('Category Page Directories');
  const { issues: dirIssues, existingPages } = checkCategoryPageDirectories();
  const missingPages = EXPECTED_CATEGORIES.filter(cat => !existingPages.includes(cat));
  
  if (dirIssues.length > 0) {
    logWarning(`${dirIssues.length} directory issues found:`);
    dirIssues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  if (missingPages.length > 0) {
    logWarning(`${missingPages.length} category pages are missing:`);
    missingPages.forEach(page => console.log(`  - ${page}`));
    
    // Offer to create missing pages
    logInfo('Run this script with --create-missing to generate missing category pages');
  } else {
    logSuccess('All expected category page directories exist');
  }
  
  // Check 2: Page structure validation
  logHeader('Page Structure Validation');
  const structureIssues = validatePageStructure(existingPages);
  if (structureIssues.length > 0) {
    hasErrors = true;
    logError(`${structureIssues.length} page structure issues found:`);
    structureIssues.forEach(issue => console.log(`  - ${issue}`));
  } else {
    logSuccess('All existing category pages have proper structure');
  }
  
  // Check 3: Component categorization
  logHeader('Component Categorization');
  const registryCategories = getComponentCategories();
  const actualCategories = getActualComponentCategories();
  
  logInfo('Registry categories summary:');
  Object.keys(registryCategories).forEach(category => {
    console.log(`  - ${category}: ${registryCategories[category].length} components`);
  });
  
  logInfo('Actual config categories summary:');
  Object.keys(actualCategories).forEach(category => {
    console.log(`  - ${category}: ${actualCategories[category].length} components`);
  });
  
  // Check 4: Category consistency
  logHeader('Category Consistency');
  const consistencyIssues = checkCategoryConsistency(registryCategories, actualCategories);
  if (consistencyIssues.length > 0) {
    hasErrors = true;
    logError(`${consistencyIssues.length} category consistency issues found:`);
    consistencyIssues.forEach(issue => console.log(`  - ${issue}`));
  } else {
    logSuccess('Component categorization is consistent between registry and configs');
  }
  
  // Handle --create-missing flag
  if (process.argv.includes('--create-missing') && missingPages.length > 0) {
    logHeader('Creating Missing Category Pages');
    createMissingCategoryPages(missingPages);
  }
  
  // Summary
  logHeader('Summary');
  if (hasErrors) {
    logError('Category pages verification FAILED');
    logError('Please fix the issues above to ensure category pages work correctly');
    process.exit(1);
  } else {
    logSuccess('Category pages verification PASSED');
    logInfo(`📁 ${existingPages.length}/${EXPECTED_CATEGORIES.length} category pages exist`);
    logInfo(`🏷️  ${Object.keys(actualCategories).length} categories have components`);
    
    const totalComponents = Object.values(registryCategories).reduce((sum, comps) => sum + comps.length, 0);
    logInfo(`🧩 ${totalComponents} total components across all categories`);
    
    if (missingPages.length > 0) {
      logInfo(`💡 Run with --create-missing to generate ${missingPages.length} missing category pages`);
    }
  }
}

// Run the verification
if (require.main === module) {
  verifyCategoryPages();
}

module.exports = {
  verifyCategoryPages,
  checkCategoryPageDirectories,
  getComponentCategories,
  getActualComponentCategories,
  EXPECTED_CATEGORIES
};