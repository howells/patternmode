#!/usr/bin/env node

/**
 * Prop Documentation Validation Script
 *
 * Validates that component configs match their TypeScript interfaces
 * and checks for documentation completeness.
 */

const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");

// ANSI color codes for console output
const colors = {
  reset: "\x1B[0m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  cyan: "\x1B[36m",
  bold: "\x1B[1m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateComponent(componentDir) {
  const componentName = path.basename(componentDir);

  log(`\n${colors.bold}Validating ${componentName}...${colors.reset}`);

  const configPath = path.join(componentDir, "config.tsx");
  const componentPath = path.join(componentDir, `${componentName}.tsx`);

  // Check if required files exist
  if (!fs.existsSync(configPath)) {
    log(`❌ Missing config.tsx`, "red");
    return false;
  }

  if (!fs.existsSync(componentPath)) {
    log(`❌ Missing ${componentName}.tsx`, "red");
    return false;
  }

  try {
    // Read files
    const configContent = fs.readFileSync(configPath, "utf8");
    const componentContent = fs.readFileSync(componentPath, "utf8");

    // Extract props from config
    const configProps = extractConfigProps(configContent);

    // Extract interface props (basic regex - could be improved with AST parsing)
    const interfaceProps = extractInterfaceProps(componentContent);

    // Validate
    const issues = [];

    // Check for props in config but not in interface
    configProps.forEach((configProp) => {
      if (!interfaceProps.includes(configProp) && !isPreviewOnlyProp(configProp)) {
        issues.push(`Config prop "${configProp}" not found in component interface`);
      }
    });

    // Check for missing documentation
    const undocumentedProps = findUndocumentedProps(componentContent);
    undocumentedProps.forEach((prop) => {
      issues.push(`Interface prop "${prop}" lacks JSDoc documentation`);
    });

    // Report results
    if (issues.length === 0) {
      log(`✅ All props documented and consistent`, "green");
      return true;
    }
    else {
      issues.forEach(issue => log(`⚠️  ${issue}`, "yellow"));
      return false;
    }
  }
  catch (error) {
    log(`❌ Error validating component: ${error.message}`, "red");
    return false;
  }
}

function extractConfigProps(configContent) {
  const props = [];
  const propRegex = /name:\s*["']([^"']+)["']/g;
  let match = propRegex.exec(configContent);

  while (match !== null) {
    props.push(match[1]);
    match = propRegex.exec(configContent);
  }

  return props;
}

function extractInterfaceProps(componentContent) {
  const props = [];

  // Find interface definition (simplified)
  const interfaceRegex = /interface\s+\w+Props[^{]*\{([^}]+)\}/;
  const interfaceMatch = componentContent.match(interfaceRegex);

  if (interfaceMatch) {
    const interfaceBody = interfaceMatch[1];

    // Extract prop names (basic regex)
    const propRegex = /^\s*(\w+)\??:/gm;
    let match = propRegex.exec(interfaceBody);

    while (match !== null) {
      props.push(match[1]);
      match = propRegex.exec(interfaceBody);
    }
  }

  return props;
}

function findUndocumentedProps(componentContent) {
  const undocumented = [];

  // Find props without JSDoc comments (simplified check)
  const lines = componentContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const propMatch = line.match(/^\s*(\w+)\??:/);

    if (propMatch) {
      const propName = propMatch[1];

      // Check if previous lines contain JSDoc
      let hasJSDoc = false;
      for (let j = i - 1; j >= 0; j--) {
        const prevLine = lines[j].trim();
        if (prevLine === "") {
          continue;
        }
        if (prevLine.includes("/**") || prevLine.includes("*")) {
          hasJSDoc = true;
          break;
        }
        break;
      }

      if (!hasJSDoc && !isInheritedProp(propName)) {
        undocumented.push(propName);
      }
    }
  }

  return undocumented;
}

function isPreviewOnlyProp(propName) {
  // Props that exist only for the props explorer
  const previewOnlyProps = ["showWithContent"];
  return previewOnlyProps.includes(propName);
}

function isInheritedProp(propName) {
  // Common inherited props that don't need individual documentation
  const inheritedProps = ["className", "style", "id", "children"];
  return inheritedProps.includes(propName);
}

function main() {
  log(`${colors.bold}${colors.cyan}🔍 Prop Documentation Validator${colors.reset}\n`);

  const componentsDir = path.join(__dirname, "../src/components");

  if (!fs.existsSync(componentsDir)) {
    log("❌ Components directory not found", "red");
    process.exit(1);
  }

  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(componentsDir, dirent.name));

  let totalComponents = 0;
  let validComponents = 0;

  componentDirs.forEach((componentDir) => {
    totalComponents++;
    if (validateComponent(componentDir)) {
      validComponents++;
    }
  });

  log(`\n${colors.bold}Summary:${colors.reset}`);
  log(`Total components: ${totalComponents}`);
  log(`Valid components: ${validComponents}`, validComponents === totalComponents ? "green" : "yellow");
  log(`Issues found: ${totalComponents - validComponents}`, validComponents === totalComponents ? "green" : "red");

  if (validComponents === totalComponents) {
    log("\n🎉 All components have consistent prop documentation!", "green");
  }
  else {
    log("\n⚠️  Some components need attention. See details above.", "yellow");
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateComponent };
