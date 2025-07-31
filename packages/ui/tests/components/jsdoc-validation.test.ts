import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

/**
 * Test suite to validate JSDoc presence and format for all main component files
 *
 * This test focuses on the main component file in each directory (e.g., accordion/accordion.tsx)
 * and ensures it has proper JSDoc documentation with @id and @name tags.
 */

// Helper function to get all component directories that have a main component file
function getComponentDirectories() {
  const componentsDir = join(process.cwd(), "src", "components");
  const entries = readdirSync(componentsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((componentDir) => {
      // Only include directories that have a main component file (componentDir/componentDir.tsx)
      const componentPath = join(componentsDir, componentDir, `${componentDir}.tsx`);
      return existsSync(componentPath);
    })
    .sort();
}

// Helper function to extract config data
function getConfigData(componentDir: string) {
  const configPath = join(process.cwd(), "src", "components", componentDir, "config.tsx");

  if (!existsSync(configPath)) {
    return null;
  }

  const configContent = readFileSync(configPath, "utf8");

  // Extract id and name from config
  const idMatch = configContent.match(/id:\s*["']([^"']+)["']/);
  const nameMatch = configContent.match(/name:\s*["']([^"']+)["']/);

  return {
    id: idMatch ? idMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
  };
}

// Helper function to find and validate JSDoc in the main component file
function validateComponentJSDoc(componentDir: string) {
  const componentPath = join(process.cwd(), "src", "components", componentDir, `${componentDir}.tsx`);

  // This should not happen since we filter for existing files, but keeping as safety check
  if (!existsSync(componentPath)) {
    return {
      fileExists: false,
      hasJSDoc: false,
      hasIdTag: false,
      hasNameTag: false,
      hasComponentTag: false,
      hasExampleTag: false,
      hasDescription: false,
      componentName: null,
      issues: [`Main component file ${componentDir}/${componentDir}.tsx not found`]
    };
  }

  const content = readFileSync(componentPath, "utf8");
  const lines = content.split('\n');
  const issues: string[] = [];

  // Find main component definition
  let componentName: string | null = null;
  let componentLineIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for various component definition patterns
    const patterns = [
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*React\.forwardRef/,
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*forwardRef/,
      /^(?:export\s+)?function\s+([A-Z][a-zA-Z0-9]*)\s*[\(]/,
      /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*\(/,
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1];

        // Skip utility functions or internal components
        if (name.includes('Internal') || name.includes('Util') ||
            name.includes('Helper') || name.startsWith('use') ||
            name.includes('Context') || name.includes('Provider')) {
          continue;
        }

        componentName = name;
        componentLineIndex = i;
        break;
      }
    }

    if (componentName) break;
  }

  if (!componentName) {
    return {
      fileExists: true,
      hasJSDoc: false,
      hasIdTag: false,
      hasNameTag: false,
      hasComponentTag: false,
      hasExampleTag: false,
      hasDescription: false,
      componentName: null,
      issues: ['No main component definition found']
    };
  }

  // Look for JSDoc comment block above the component
  let jsdocStart = -1;
  let jsdocEnd = -1;
  let hasJSDoc = false;

  // Search backwards from component definition
  for (let i = componentLineIndex - 1; i >= Math.max(0, componentLineIndex - 20); i--) {
    const line = lines[i].trim();

    if (line === '*/') {
      jsdocEnd = i;
    } else if (line === '/**' && jsdocEnd > i) {
      jsdocStart = i;
      hasJSDoc = true;
      break;
    }

    // Stop if we hit non-comment, non-empty line
    if (line && !line.startsWith('*') && !line.startsWith('//') &&
        line !== '*/' && !line.startsWith('import') && !line.startsWith('const') &&
        !line.startsWith('type') && !line.startsWith('interface')) {
      break;
    }
  }

  if (!hasJSDoc) {
    issues.push(`No JSDoc comment block found above component ${componentName}`);
    return {
      fileExists: true,
      hasJSDoc: false,
      hasIdTag: false,
      hasNameTag: false,
      hasComponentTag: false,
      hasExampleTag: false,
      hasDescription: false,
      componentName,
      issues
    };
  }

  // Extract JSDoc content and check for @id and @name tags
  const jsdocLines = lines.slice(jsdocStart, jsdocEnd + 1);
  const jsdocContent = jsdocLines.join('\n');

  // Check for essential JSDoc tags
  const hasIdTag = /@id\s+[\w-]+/.test(jsdocContent);
  const hasNameTag = /@name\s+.+/.test(jsdocContent);
  const hasComponentTag = /@component/.test(jsdocContent);
  const hasExampleTag = /@example/.test(jsdocContent);

  // Check for description (non-tag content before first @tag)
  const descriptionMatch = jsdocContent.match(/\/\*\*\s*\n\s*\*\s*(.+?)(?:\s*\*\s*@|\s*\*\/)/s);
  const hasDescription = descriptionMatch && descriptionMatch[1].trim().length > 10; // At least 10 chars

  if (!hasIdTag) {
    issues.push(`JSDoc missing @id tag for component ${componentName}`);
  }

  if (!hasNameTag) {
    issues.push(`JSDoc missing @name tag for component ${componentName}`);
  }

  if (!hasComponentTag) {
    issues.push(`JSDoc missing @component tag for component ${componentName}`);
  }

  if (!hasExampleTag) {
    issues.push(`JSDoc missing @example tag for component ${componentName}`);
  }

  if (!hasDescription) {
    issues.push(`JSDoc missing meaningful description for component ${componentName}`);
  }

  // Validate @id and @name values match config if available
  const configData = getConfigData(componentDir);
  if (configData) {
    const idMatch = jsdocContent.match(/@id\s+([\w-]+)/);
    const nameMatch = jsdocContent.match(/@name\s+(.+)/);

    if (idMatch && configData.id && idMatch[1] !== configData.id) {
      issues.push(`JSDoc @id "${idMatch[1]}" doesn't match config id "${configData.id}"`);
    }

    if (nameMatch && configData.name && nameMatch[1].trim() !== configData.name) {
      issues.push(`JSDoc @name "${nameMatch[1].trim()}" doesn't match config name "${configData.name}"`);
    }
  }

  return {
    fileExists: true,
    hasJSDoc,
    hasIdTag,
    hasNameTag,
    hasComponentTag,
    hasExampleTag,
    hasDescription,
    componentName,
    issues
  };
}

describe("Component JSDoc Validation", () => {
  const componentDirs = getComponentDirectories();

  it("should find component directories with main component files", () => {
    expect(componentDirs.length).toBeGreaterThan(50);
    expect(componentDirs).toContain("button");
    expect(componentDirs).toContain("card");
    expect(componentDirs).toContain("input");

    // Should NOT contain date-range-picker since we deleted its main file
    expect(componentDirs).not.toContain("date-range-picker");
  });

  describe("Individual component JSDoc validation", () => {
    componentDirs.forEach((componentDir) => {
      describe(`${componentDir} component`, () => {
        const validation = validateComponentJSDoc(componentDir);

        it("should have a main component file", () => {
          expect(validation.fileExists).toBe(true);
        });

        it("should have a main component definition", () => {
          expect(validation.componentName).toBeTruthy();
        });

        it("should have JSDoc comment block", () => {
          if (validation.issues.length > 0) {
            console.warn(`${componentDir} issues:`, validation.issues);
          }
          expect(validation.hasJSDoc).toBe(true);
        });

        it("should have @id tag in JSDoc", () => {
          expect(validation.hasIdTag).toBe(true);
        });

        it("should have @name tag in JSDoc", () => {
          expect(validation.hasNameTag).toBe(true);
        });

        it("should have @component tag in JSDoc", () => {
          expect(validation.hasComponentTag).toBe(true);
        });

        it("should have @example tag in JSDoc", () => {
          expect(validation.hasExampleTag).toBe(true);
        });

        it("should have meaningful description in JSDoc", () => {
          expect(validation.hasDescription).toBe(true);
        });

        it("should have no validation issues", () => {
          if (validation.issues.length > 0) {
            console.error(`${componentDir} validation issues:`, validation.issues);
          }
          expect(validation.issues).toHaveLength(0);
        });
      });
    });
  });

  describe("Summary statistics", () => {
    it("should show JSDoc coverage statistics", () => {
      const validations = componentDirs.map(dir => ({
        dir,
        validation: validateComponentJSDoc(dir)
      }));

      const stats = {
        total: validations.length,
        hasFile: validations.filter(v => v.validation.fileExists).length,
        hasComponent: validations.filter(v => v.validation.componentName).length,
        hasJSDoc: validations.filter(v => v.validation.hasJSDoc).length,
        hasIdTag: validations.filter(v => v.validation.hasIdTag).length,
        hasNameTag: validations.filter(v => v.validation.hasNameTag).length,
        hasComponentTag: validations.filter(v => v.validation.hasComponentTag).length,
        hasExampleTag: validations.filter(v => v.validation.hasExampleTag).length,
        hasDescription: validations.filter(v => v.validation.hasDescription).length,
        fullyValid: validations.filter(v => v.validation.issues.length === 0).length,
      };

      console.log('\n📊 JSDoc Coverage Statistics:');
      console.log(`Total components: ${stats.total}`);
      console.log(`Components with files: ${stats.hasFile} (${Math.round(stats.hasFile/stats.total*100)}%)`);
      console.log(`Components found: ${stats.hasComponent} (${Math.round(stats.hasComponent/stats.total*100)}%)`);
      console.log(`Components with JSDoc: ${stats.hasJSDoc} (${Math.round(stats.hasJSDoc/stats.total*100)}%)`);
      console.log(`\n📋 Essential JSDoc Tags Coverage:`);
      console.log(`  @id tag: ${stats.hasIdTag} (${Math.round(stats.hasIdTag/stats.total*100)}%)`);
      console.log(`  @name tag: ${stats.hasNameTag} (${Math.round(stats.hasNameTag/stats.total*100)}%)`);
      console.log(`  @component tag: ${stats.hasComponentTag} (${Math.round(stats.hasComponentTag/stats.total*100)}%)`);
      console.log(`  @example tag: ${stats.hasExampleTag} (${Math.round(stats.hasExampleTag/stats.total*100)}%)`);
      console.log(`  Description: ${stats.hasDescription} (${Math.round(stats.hasDescription/stats.total*100)}%)`);
      console.log(`\n✅ Fully compliant components: ${stats.fullyValid} (${Math.round(stats.fullyValid/stats.total*100)}%)`);

      // List components with issues
      const componentsWithIssues = validations.filter(v => v.validation.issues.length > 0);
      if (componentsWithIssues.length > 0) {
        console.log('\n⚠️  Components with issues:');
        componentsWithIssues.forEach(({ dir, validation }) => {
          console.log(`  ${dir}: ${validation.issues.join(', ')}`);
        });
      }

      // This test always passes, it's just for reporting
      expect(stats.total).toBeGreaterThan(0);
    });
  });
});