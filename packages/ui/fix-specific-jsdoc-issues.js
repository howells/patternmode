#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Script to fix specific JSDoc issues for components that our test identifies as problematic
 */

const COMPONENTS_DIR = 'src/components';

// Helper function to get config data
function getConfigData(componentDir) {
  const configPath = path.join(COMPONENTS_DIR, componentDir, 'config.tsx');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  const configContent = fs.readFileSync(configPath, 'utf8');

  const idMatch = configContent.match(/id:\s*["']([^"']+)["']/);
  const nameMatch = configContent.match(/name:\s*["']([^"']+)["']/);
  const descriptionMatch = configContent.match(/description:\s*["']([^"']+)["']/);

  return {
    id: idMatch ? idMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
    description: descriptionMatch ? descriptionMatch[1] : null,
  };
}

// Specific fixes for problematic components
const specificFixes = {
  'alert-dialog': {
    // The test finds AlertDialogTrigger, but we want to add JSDoc to the main export
    fix: (content, config) => {
      // Find the main AlertDialog export and add JSDoc before it
      const lines = content.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('const AlertDialog = {')) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex === -1) {
        // Try to find export { AlertDialog }
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('export {') && lines[i].includes('AlertDialog')) {
            insertIndex = i;
            break;
          }
        }
      }

      if (insertIndex === -1) return content;

      const jsdoc = `/**
 * ${config.description || 'A modal dialog that interrupts the user with important content and expects a response.'}
 *
 * @id ${config.id || 'alert-dialog'}
 * @name ${config.name || 'Alert Dialog'}
 * @component
 */`;

      lines.splice(insertIndex, 0, jsdoc);
      return lines.join('\n');
    }
  },

  'navbar': {
    // The test finds the function Navbar, we need to add JSDoc before it
    fix: (content, config) => {
      const lines = content.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export function Navbar({')) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex === -1) return content;

      // Check if JSDoc already exists before this function
      let hasJSDoc = false;
      for (let i = insertIndex - 10; i < insertIndex; i++) {
        if (i >= 0 && lines[i].includes('@id') && lines[i].includes('navbar')) {
          hasJSDoc = true;
          break;
        }
      }

      if (hasJSDoc) return content;

      const jsdoc = `/**
 * ${config.description || 'A flexible navigation bar component system for building application headers.'}
 *
 * @id ${config.id || 'navbar'}
 * @name ${config.name || 'Navbar'}
 * @component
 */`;

      lines.splice(insertIndex, 0, jsdoc);
      return lines.join('\n');
    }
  },

  'combobox': {
    // This component might have a complex structure, let's add JSDoc to the main export
    fix: (content, config) => {
      const lines = content.split('\n');
      let insertIndex = -1;

      // Look for export patterns
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export') && (lines[i].includes('Combobox') || lines[i].includes('const'))) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex === -1) return content;

      const jsdoc = `/**
 * ${config.description || 'A Combobox component with customizable styling and behavior.'}
 *
 * @id ${config.id || 'combobox'}
 * @name ${config.name || 'Combobox'}
 * @component
 */`;

      lines.splice(insertIndex, 0, jsdoc);
      return lines.join('\n');
    }
  },

  'context-menu': {
    fix: (content, config) => {
      const lines = content.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export') && lines[i].includes('ContextMenu')) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex === -1) return content;

      const jsdoc = `/**
 * ${config.description || 'A ContextMenu component with customizable styling and behavior.'}
 *
 * @id ${config.id || 'context-menu'}
 * @name ${config.name || 'Context Menu'}
 * @component
 */`;

      lines.splice(insertIndex, 0, jsdoc);
      return lines.join('\n');
    }
  },

  'responsive-drawer': {
    fix: (content, config) => {
      const lines = content.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export') && lines[i].includes('ResponsiveDrawer')) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex === -1) return content;

      const jsdoc = `/**
 * ${config.description || 'A ResponsiveDrawer component with customizable styling and behavior.'}
 *
 * @id ${config.id || 'responsive-drawer'}
 * @name ${config.name || 'Responsive Drawer'}
 * @component
 */`;

      lines.splice(insertIndex, 0, jsdoc);
      return lines.join('\n');
    }
  },

  'toast': {
    fix: (content, config) => {
      const lines = content.split('\n');
      let insertIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export') && lines[i].includes('Toast')) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex === -1) return content;

      const jsdoc = `/**
 * ${config.description || 'A Toast component with customizable styling and behavior.'}
 *
 * @id ${config.id || 'toast'}
 * @name ${config.name || 'Toast'}
 * @component
 */`;

      lines.splice(insertIndex, 0, jsdoc);
      return lines.join('\n');
    }
  }
};

// Main function to process specific components
function processSpecificComponent(componentDir) {
  const componentPath = path.join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);

  if (!fs.existsSync(componentPath)) {
    return { success: false, reason: 'Component file not found' };
  }

  const config = getConfigData(componentDir);
  if (!config) {
    return { success: false, reason: 'Config file not found' };
  }

  const content = fs.readFileSync(componentPath, 'utf8');
  const fix = specificFixes[componentDir];

  if (!fix) {
    return { success: false, reason: 'No specific fix defined' };
  }

  const updatedContent = fix.fix(content, config);

  if (updatedContent === content) {
    return { success: true, reason: 'No changes needed' };
  }

  fs.writeFileSync(componentPath, updatedContent, 'utf8');
  return { success: true, reason: 'JSDoc added successfully' };
}

// Main execution
function main() {
  console.log('🔧 Fixing specific JSDoc issues...\n');

  const problematicComponents = Object.keys(specificFixes);

  let processed = 0;
  let updated = 0;
  let failed = 0;

  for (const componentDir of problematicComponents) {
    const result = processSpecificComponent(componentDir);
    processed++;

    if (result.success) {
      console.log(`🔧 ${componentDir}: ${result.reason}`);
      if (result.reason.includes('added')) {
        updated++;
      }
    } else {
      console.log(`❌ ${componentDir}: ${result.reason}`);
      failed++;
    }
  }

  console.log('\n📊 Specific Fixes Summary:');
  console.log(`Total components processed: ${processed}`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log('\n✅ Specific fixes complete!');
}

main();