#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

/**
 * Script to add missing JSDoc tags (@component, descriptions, @id, @name)
 * to all component files that need them
 */

const COMPONENTS_DIR = "src/components";

// Helper function to get config data
function getConfigData(componentDir) {
  const configPath = path.join(COMPONENTS_DIR, componentDir, "config.tsx");

  if (!fs.existsSync(configPath)) {
    return null;
  }

  const configContent = fs.readFileSync(configPath, "utf8");

  // Extract id and name from config
  const idMatch = configContent.match(/id:\s*["']([^"']+)["']/);
  const nameMatch = configContent.match(/name:\s*["']([^"']+)["']/);
  const descriptionMatch = configContent.match(/description:\s*["']([^"']+)["']/);

  return {
    id: idMatch ? idMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
    description: descriptionMatch ? descriptionMatch[1] : null,
  };
}

// Helper function to find the main component in a file
function findMainComponent(content, componentDir) {
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for various component definition patterns
    const patterns = [
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*React\.forwardRef/,
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*forwardRef/,
      /^(?:export\s+)?function\s+([A-Z][a-zA-Z0-9]*)\s*\(/,
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*\(/,
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1];

        // Skip utility functions or internal components
        if (name.includes("Internal") || name.includes("Util")
          || name.includes("Helper") || name.startsWith("use")
          || name.includes("Context") || name.includes("Provider")) {
          continue;
        }

        return {
          name,
          lineIndex: i,
        };
      }
    }
  }

  return null;
}

// Helper function to check existing JSDoc
function analyzeJSDoc(content, componentLineIndex) {
  const lines = content.split("\n");

  // Look for JSDoc comment block above the component
  let jsdocStart = -1;
  let jsdocEnd = -1;
  let hasJSDoc = false;

  // Search backwards from component definition
  for (let i = componentLineIndex - 1; i >= Math.max(0, componentLineIndex - 20); i--) {
    const line = lines[i].trim();

    if (line === "*/") {
      jsdocEnd = i;
    }
    else if (line === "/**" && jsdocEnd > i) {
      jsdocStart = i;
      hasJSDoc = true;
      break;
    }

    // Stop if we hit non-comment, non-empty line
    if (line && !line.startsWith("*") && !line.startsWith("//")
      && line !== "*/" && !line.startsWith("import") && !line.startsWith("const")
      && !line.startsWith("type") && !line.startsWith("interface")) {
      break;
    }
  }

  if (!hasJSDoc) {
    return {
      hasJSDoc: false,
      hasIdTag: false,
      hasNameTag: false,
      hasComponentTag: false,
      hasDescription: false,
      jsdocStart: -1,
      jsdocEnd: -1,
    };
  }

  // Extract JSDoc content and check for tags
  const jsdocLines = lines.slice(jsdocStart, jsdocEnd + 1);
  const jsdocContent = jsdocLines.join("\n");

  const hasIdTag = /@id\s+[\w-]+/.test(jsdocContent);
  const hasNameTag = /@name\s+.+/.test(jsdocContent);
  const hasComponentTag = /@component/.test(jsdocContent);

  // Check for description (non-tag content before first @tag)
  const descriptionMatch = jsdocContent.match(/\/\*\*[\t\v\f\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n\s*\*\s*(.+?)(?:\s*\*\s*@|\s*\*\/)/s);
  const hasDescription = descriptionMatch && descriptionMatch[1].trim().length > 10;

  return {
    hasJSDoc: true,
    hasIdTag,
    hasNameTag,
    hasComponentTag,
    hasDescription,
    jsdocStart,
    jsdocEnd,
    jsdocContent,
  };
}

// Helper function to create a new JSDoc block
function createJSDocBlock(config, componentName) {
  const description = config.description || `A ${componentName} component with customizable styling and behavior.`;

  return `/**
 * ${description}
 *
 * @id ${config.id || componentName.toLowerCase()}
 * @name ${config.name || componentName}
 * @component
 */`;
}

// Helper function to enhance existing JSDoc
function enhanceJSDocBlock(existingJSDoc, config, componentName, analysis) {
  const lines = existingJSDoc.split("\n");
  const result = [];

  let descriptionAdded = false;
  let tagsSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // If this is the opening comment and we need a description
    if (i === 0 && line.trim() === "/**" && !analysis.hasDescription) {
      result.push(line);
      const description = config.description || `A ${componentName} component with customizable styling and behavior.`;
      result.push(` * ${description}`);
      result.push(" *");
      descriptionAdded = true;
      continue;
    }

    // If we hit the first @tag, we're in the tags section
    if (line.includes("@") && !tagsSection) {
      tagsSection = true;

      // Add missing tags before existing tags
      if (!analysis.hasIdTag) {
        result.push(` * @id ${config.id || componentName.toLowerCase()}`);
      }
      if (!analysis.hasNameTag) {
        result.push(` * @name ${config.name || componentName}`);
      }
      if (!analysis.hasComponentTag) {
        result.push(` * @component`);
      }
    }

    // If this is the closing comment and we haven't added tags yet
    if (line.trim() === "*/" && !tagsSection) {
      // Add missing tags before closing
      if (!analysis.hasIdTag) {
        result.push(` * @id ${config.id || componentName.toLowerCase()}`);
      }
      if (!analysis.hasNameTag) {
        result.push(` * @name ${config.name || componentName}`);
      }
      if (!analysis.hasComponentTag) {
        result.push(` * @component`);
      }
    }

    result.push(line);
  }

  return result.join("\n");
}

// Main function to process a component file
function processComponentFile(componentDir) {
  const componentPath = path.join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);

  if (!fs.existsSync(componentPath)) {
    return { success: false, reason: "Component file not found" };
  }

  const content = fs.readFileSync(componentPath, "utf8");
  const config = getConfigData(componentDir);

  if (!config) {
    return { success: false, reason: "Config file not found" };
  }

  const component = findMainComponent(content, componentDir);

  if (!component) {
    return { success: false, reason: "Main component not found" };
  }

  const analysis = analyzeJSDoc(content, component.lineIndex);

  // Check if we need to do anything
  const needsWork = !analysis.hasJSDoc
    || !analysis.hasIdTag
    || !analysis.hasNameTag
    || !analysis.hasComponentTag
    || !analysis.hasDescription;

  if (!needsWork) {
    return { success: true, reason: "Already has complete JSDoc" };
  }

  const lines = content.split("\n");

  if (!analysis.hasJSDoc) {
    // Add new JSDoc block
    const newJSDoc = createJSDocBlock(config, component.name);
    const jsdocLines = newJSDoc.split("\n");

    // Insert before component definition
    lines.splice(component.lineIndex, 0, ...jsdocLines);
  }
  else {
    // Enhance existing JSDoc
    const enhancedJSDoc = enhanceJSDocBlock(analysis.jsdocContent, config, component.name, analysis);
    const enhancedLines = enhancedJSDoc.split("\n");

    // Replace existing JSDoc
    lines.splice(analysis.jsdocStart, analysis.jsdocEnd - analysis.jsdocStart + 1, ...enhancedLines);
  }

  // Write the updated content
  const updatedContent = lines.join("\n");
  fs.writeFileSync(componentPath, updatedContent, "utf8");

  return { success: true, reason: "JSDoc updated successfully" };
}

// Main execution
function main() {
  console.log("🔧 Starting JSDoc enhancement for all components...\n");

  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter((componentDir) => {
      const componentPath = path.join(COMPONENTS_DIR, componentDir, `${componentDir}.tsx`);
      return fs.existsSync(componentPath);
    })
    .sort();

  let processed = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const componentDir of componentDirs) {
    const result = processComponentFile(componentDir);
    processed++;

    if (result.success) {
      if (result.reason === "Already has complete JSDoc") {
        console.log(`✅ ${componentDir}: ${result.reason}`);
        skipped++;
      }
      else {
        console.log(`🔧 ${componentDir}: ${result.reason}`);
        updated++;
      }
    }
    else {
      console.log(`❌ ${componentDir}: ${result.reason}`);
      failed++;
    }
  }

  console.log("\n📊 JSDoc Enhancement Summary:");
  console.log(`Total components processed: ${processed}`);
  console.log(`Updated: ${updated}`);
  console.log(`Already complete: ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log("\n✅ JSDoc enhancement complete!");
}

main();
