#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Migration script to move component id and name from config.tsx files
 * to JSDoc comments in the main component files.
 */

const COMPONENTS_DIR = 'packages/ui/src/components';

function findConfigFiles() {
  const configFiles = [];
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of componentDirs) {
    const configPath = path.join(COMPONENTS_DIR, dir, 'config.tsx');
    if (fs.existsSync(configPath)) {
      configFiles.push({
        configPath,
        componentDir: dir,
        componentPath: path.join(COMPONENTS_DIR, dir, `${dir}.tsx`)
      });
    }
  }

  return configFiles;
}

function extractConfigData(configPath) {
  try {
    const content = fs.readFileSync(configPath, 'utf8');

    // Extract id using regex - look for id: "value" or id: 'value'
    const idMatch = content.match(/id:\s*["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : null;

    // Extract name using regex - look for name: "value" or name: 'value'
    const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
    const name = nameMatch ? nameMatch[1] : null;

    return { id, name };
  } catch (error) {
    console.error(`Error reading config file ${configPath}:`, error.message);
    return { id: null, name: null };
  }
}

function findMainComponentInFile(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    const lines = content.split('\n');

    // Look for the main component - typically the first exported component
    // Pattern: const ComponentName = React.forwardRef or const ComponentName =
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Look for main component definition patterns
      const componentMatch = line.match(/^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*(?:React\.forwardRef|forwardRef|\()/);
      if (componentMatch) {
        const componentName = componentMatch[1];

        // Find the JSDoc comment block above this component
        let jsdocStart = -1;
        let jsdocEnd = -1;

        // Look backwards for JSDoc start
        for (let j = i - 1; j >= 0; j--) {
          const prevLine = lines[j].trim();
          if (prevLine === '/**') {
            jsdocStart = j;
            break;
          }
          // Stop if we hit non-empty, non-comment line
          if (prevLine && !prevLine.startsWith('*') && !prevLine.startsWith('//') && prevLine !== '*/') {
            break;
          }
        }

        // If we found JSDoc start, find the end
        if (jsdocStart !== -1) {
          for (let j = jsdocStart + 1; j < i; j++) {
            if (lines[j].trim() === '*/') {
              jsdocEnd = j;
              break;
            }
          }
        }

        return {
          componentName,
          componentLineIndex: i,
          jsdocStart,
          jsdocEnd,
          hasJSDoc: jsdocStart !== -1 && jsdocEnd !== -1
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Error reading component file ${componentPath}:`, error.message);
    return null;
  }
}

function addJSDocTags(componentPath, componentInfo, configData) {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    const lines = content.split('\n');

    if (!componentInfo.hasJSDoc) {
      console.log(`  ⚠️  No JSDoc found for ${componentInfo.componentName}, skipping`);
      return false;
    }

    // Check if @id or @name already exist
    const jsdocContent = lines.slice(componentInfo.jsdocStart, componentInfo.jsdocEnd + 1).join('\n');
    if (jsdocContent.includes('@id') || jsdocContent.includes('@name')) {
      console.log(`  ⚠️  JSDoc already contains @id or @name tags, skipping`);
      return false;
    }

    // Find the best place to insert the tags (after existing tags but before @component)
    let insertIndex = componentInfo.jsdocEnd; // Default to just before closing */

    // Look for @component tag or other structural tags
    for (let i = componentInfo.jsdocStart + 1; i < componentInfo.jsdocEnd; i++) {
      const line = lines[i].trim();
      if (line.startsWith('* @component') || line.startsWith('* @example')) {
        insertIndex = i;
        break;
      }
    }

    // Create the new JSDoc tags
    const newTags = [];
    if (configData.id) {
      newTags.push(` * @id ${configData.id}`);
    }
    if (configData.name) {
      newTags.push(` * @name ${configData.name}`);
    }

    if (newTags.length > 0) {
      // Add empty line before if there are existing tags
      if (insertIndex > componentInfo.jsdocStart + 1) {
        newTags.unshift(' *');
      }

      // Insert the new tags
      lines.splice(insertIndex, 0, ...newTags);

      // Write back to file
      fs.writeFileSync(componentPath, lines.join('\n'));
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error updating component file ${componentPath}:`, error.message);
    return false;
  }
}

function migrateComponent(componentInfo) {
  console.log(`\n📦 Processing ${componentInfo.componentDir}...`);

  // Check if component file exists
  if (!fs.existsSync(componentInfo.componentPath)) {
    console.log(`  ❌ Component file not found: ${componentInfo.componentPath}`);
    return false;
  }

  // Extract config data
  const configData = extractConfigData(componentInfo.configPath);
  if (!configData.id && !configData.name) {
    console.log(`  ⚠️  No id or name found in config`);
    return false;
  }

  console.log(`  📋 Found - id: "${configData.id}", name: "${configData.name}"`);

  // Find main component in file
  const componentDetails = findMainComponentInFile(componentInfo.componentPath);
  if (!componentDetails) {
    console.log(`  ❌ Could not find main component in file`);
    return false;
  }

  console.log(`  🎯 Found component: ${componentDetails.componentName}`);

  // Add JSDoc tags
  const success = addJSDocTags(componentInfo.componentPath, componentDetails, configData);
  if (success) {
    console.log(`  ✅ Successfully added JSDoc tags`);
    return true;
  } else {
    console.log(`  ❌ Failed to add JSDoc tags`);
    return false;
  }
}

function main() {
  console.log('🚀 Starting config to JSDoc migration...\n');

  const configFiles = findConfigFiles();
  console.log(`Found ${configFiles.length} components with config files\n`);

  let successCount = 0;
  let totalCount = 0;

  for (const componentInfo of configFiles) {
    totalCount++;
    if (migrateComponent(componentInfo)) {
      successCount++;
    }
  }

  console.log(`\n🎉 Migration complete!`);
  console.log(`✅ Success: ${successCount}/${totalCount} components migrated`);

  if (successCount < totalCount) {
    console.log(`⚠️  ${totalCount - successCount} components had issues - check logs above`);
  }
}

// Run the migration
main();