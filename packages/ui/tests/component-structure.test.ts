/**
 * Essential component validation - focused on core requirements:
 * 1. Every component must have at least one example
 * 2. Every component must have TypeScript prop types
 * 3. JSDoc should be concise descriptions only (≤140 characters)
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as ts from "typescript";
import { COMPONENT_REGISTRY } from "../src/components/registry";

/**
 * Get all component directories that should have main component files
 */
function getComponentDirectories(): string[] {
  const componentsDir = join(process.cwd(), "src", "components");

  if (!existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }

  const entries = readdirSync(componentsDir, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter((componentDir) => {
      // Skip registry.ts and hidden directories
      if (componentDir === "registry.ts" || componentDir.startsWith(".")) {
        return false;
      }

      // Only include directories that have a config file
      const configPath = join(componentsDir, componentDir, "config.ts");
      return existsSync(configPath);
    })
    .sort();
}

/**
 * Check if component has TypeScript prop types defined
 */
function hasTypeScriptProps(componentDir: string): boolean {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");
  const typesFilePath = join(componentsDir, componentDir, "types.ts");

  if (!existsSync(componentFilePath)) {
    return false;
  }

  // Check component.tsx file
  const componentContent = readFileSync(componentFilePath, "utf8");
  
  // Look for TypeScript prop type definitions in component file
  const hasTypeDefinitionsInComponent = /type\s+\w+Props\s*=/.test(componentContent)
    || /interface\s+\w+Props\s*\{/.test(componentContent)
    || /React\.ComponentPropsWithoutRef/.test(componentContent)
    || /React\.ComponentProps/.test(componentContent);

  if (hasTypeDefinitionsInComponent) {
    return true;
  }

  // Check separate types.ts file (for restructured components)
  if (existsSync(typesFilePath)) {
    const typesContent = readFileSync(typesFilePath, "utf8");
    const hasTypeDefinitionsInTypes = /type\s+\w+Props\s*=/.test(typesContent)
      || /interface\s+\w+Props\s*\{/.test(typesContent)
      || /React\.ComponentPropsWithoutRef/.test(typesContent)
      || /React\.ComponentProps/.test(typesContent);
    
    if (hasTypeDefinitionsInTypes) {
      return true;
    }
  }

  return false;
}

/**
 * Extract JSDoc description using TypeScript Compiler API - the most reliable approach
 */
function getJSDocDescription(componentDir: string): string | null {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  if (!existsSync(componentFilePath)) {
    return null;
  }

  const content = readFileSync(componentFilePath, "utf8");

  try {
    // Create TypeScript source file
    const sourceFile = ts.createSourceFile(
      componentFilePath,
      content,
      ts.ScriptTarget.Latest,
      true, // setParentNodes
      ts.ScriptKind.TSX
    );

    // Convert component directory name to expected component name
    const expectedComponentName = componentDir
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    let foundJSDoc: string | null = null;

    function visit(node: ts.Node): void {
      // Look for component declarations
      const isTargetComponent = (
        // const ComponentName = ...
        (ts.isVariableDeclaration(node) && 
         ts.isIdentifier(node.name) && 
         node.name.text === expectedComponentName) ||
        // function ComponentName(...) { ... }
        (ts.isFunctionDeclaration(node) && 
         node.name && 
         ts.isIdentifier(node.name) && 
         node.name.text === expectedComponentName)
      );

      if (isTargetComponent) {
        // Get JSDoc comments using TypeScript's built-in JSDoc support
        const jsDocTags = ts.getJSDocTags(node);
        const jsDocComments = ts.getJSDocCommentsAndTags(node);
        
        // Try to get the description from JSDoc
        for (const jsDoc of jsDocComments) {
          if (ts.isJSDoc(jsDoc) && jsDoc.comment) {
            if (typeof jsDoc.comment === 'string') {
              foundJSDoc = jsDoc.comment.trim();
              return;
            } else if (Array.isArray(jsDoc.comment)) {
              // Handle JSDoc comment that is an array of text and tags
              const textParts = jsDoc.comment
                .filter(part => ts.isJSDocText(part))
                .map(part => part.text)
                .join(' ')
                .trim();
              if (textParts) {
                foundJSDoc = textParts;
                return;
              }
            }
          }
        }

        // Fallback: manually look for JSDoc comments above this node
        const fullText = sourceFile.getFullText();
        const nodeStart = node.getFullStart();
        const leadingTrivia = fullText.substring(node.getFullStart(), node.getStart());
        
        // Look for JSDoc pattern in leading trivia
        const jsDocMatch = leadingTrivia.match(/\/\*\*(.*?)\*\//s);
        if (jsDocMatch) {
          const jsDocContent = jsDocMatch[1];
          const descriptionLines = jsDocContent
            .split('\n')
            .map(line => line.trim().replace(/^\*\s?/, '').trim())
            .filter(line => line && !line.startsWith('@'));
          
          if (descriptionLines.length > 0) {
            foundJSDoc = descriptionLines.join(' ').trim();
            return;
          }
        }
      }

      // Continue traversing child nodes
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return foundJSDoc;

  } catch (error) {
    console.warn(`Failed to parse ${componentFilePath}: ${error}`);
    return null;
  }
}

/**
 * Check if component exports its main component correctly
 */
function hasCorrectExport(componentDir: string): boolean {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  if (!existsSync(componentFilePath)) {
    return false;
  }

  const content = readFileSync(componentFilePath, "utf8");

  // Should have main component export (fixed regex to avoid backtracking)
  const hasMainExport = /export\s*\{[^A-Z}]*[A-Z][^}]*\}/.test(content)
    || /export\s+const\s+[A-Z][a-zA-Z0-9]*\s*[:=]/.test(content);

  return hasMainExport;
}

/**
 * Check if component has proper data-testid attribute for debugging/testing
 */
function hasTestId(componentDir: string): { hasTestId: boolean; testIdPattern?: string; testIdCount: number } {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  if (!existsSync(componentFilePath)) {
    return { hasTestId: false, testIdCount: 0 };
  }

  const content = readFileSync(componentFilePath, "utf8");
  const patterns: string[] = [];

  // Pattern 1: JSX attribute with string literal - data-testid="value"
  const staticMatches = content.match(/data-testid\s*=\s*["'`]([^"'`]+)["'`]/g);
  if (staticMatches) {
    staticMatches.forEach((match) => {
      const value = match.match(/["'`]([^"'`]+)["'`]/)?.[1];
      if (value) {
        patterns.push(value);
      }
    });
  }

  // Pattern 2: JSX attribute with template literal - data-testid={`value-${var}`}
  const templateMatches = content.match(/data-testid\s*=\s*\{`[^`]*`\}/g);
  if (templateMatches) {
    templateMatches.forEach((match) => {
      const template = match.match(/\{`([^`]*)`\}/)?.[1];
      if (template) {
        patterns.push(`template: ${template}`);
      }
    });
  }

  // Pattern 3: JSX attribute with expression - data-testid={variable}
  const expressionMatches = content.match(/data-testid\s*=\s*\{[^}]+\}/g);
  if (expressionMatches) {
    expressionMatches.forEach((match) => {
      // Skip template literals (already handled above)
      if (!match.includes("`")) {
        const expr = match.match(/\{([^}]+)\}/)?.[1];
        if (expr) {
          patterns.push(`expression: ${expr.trim()}`);
        }
      }
    });
  }

  // Pattern 4: Object property - "data-testid": "value"
  const objectMatches = content.match(/["'`]data-testid["'`]\s*:\s*["'`]([^"'`]+)["'`]/g);
  if (objectMatches) {
    objectMatches.forEach((match) => {
      const value = match.match(/:\s*["'`]([^"'`]+)["'`]/)?.[1];
      if (value) {
        patterns.push(value);
      }
    });
  }

  const testIdCount = patterns.length;
  const hasTestId = testIdCount > 0;

  // Return the most specific pattern or the first one found
  const mainPattern = patterns.length > 0
    ? patterns.find(p => p === componentDir) || patterns[0] // Prefer component name match
    : undefined;

  return {
    hasTestId,
    testIdPattern: mainPattern,
    testIdCount,
  };
}

describe("component Structure & Requirements", () => {
  const componentDirs = getComponentDirectories();

  it("should find component directories", () => {
    expect(componentDirs.length).toBeGreaterThan(50);
    console.log(`Found ${componentDirs.length} component directories`);
  });

  describe("registry Requirements", () => {
    it("every component must have at least one example", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        expect(config.examples, `Component ${id} must have examples`).toBeDefined();
        expect(Array.isArray(config.examples), `Component ${id} examples must be an array`).toBe(true);
        expect(config.examples.length, `Component ${id} must have at least one example`).toBeGreaterThan(0);

        config.examples.forEach((example, index) => {
          expect(example.id, `Example ${index} of ${id} must have an id`).toBeTruthy();
          expect(example.title, `Example ${index} of ${id} must have a title`).toBeTruthy();
          expect(example.description, `Example ${index} of ${id} must have a description`).toBeTruthy();
          expect(typeof example.component, `Example ${index} of ${id} must have a component function`).toBe("function");
        });
      });
    });

    it("every component must have proper config structure", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        expect(config.id, `Component ${id} must have id`).toBe(id);
        expect(config.name, `Component ${id} must have name`).toBeTruthy();
        expect(config.description, `Component ${id} must have description`).toBeTruthy();
        expect(config.category, `Component ${id} must have category`).toBeTruthy();
        expect(config.importStatement, `Component ${id} must have importStatement`).toBeTruthy();
        expect(config.icon, `Component ${id} must have icon`).toBeTruthy();
      });
    });
  });

  describe("typeScript Requirements", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should have TypeScript prop types defined`, () => {
        const hasProps = hasTypeScriptProps(componentDir);
        expect(hasProps, `Component ${componentDir} should have TypeScript prop types (type/interface definitions)`).toBe(true);
      });
    });
  });

  describe("jSDoc Requirements", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should have concise JSDoc description (≤140 chars)`, () => {
        const description = getJSDocDescription(componentDir);

        if (description) {
          expect(description.length, `Component ${componentDir} JSDoc description should be ≤140 characters, got ${description.length}: "${description}"`).toBeLessThanOrEqual(140);
          expect(description.length, `Component ${componentDir} JSDoc description should be at least 10 characters`).toBeGreaterThanOrEqual(10);
        }
        else {
          // JSDoc is optional if component info is in config, but warn about missing descriptions
          console.warn(`Component ${componentDir} has no JSDoc description - consider adding a brief component description`);
        }
      });
    });
  });

  describe("component Structure", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should export main component correctly`, () => {
        const componentsDir = join(process.cwd(), "src", "components");
        const componentFilePath = join(componentsDir, componentDir, "component.tsx");

        expect(existsSync(componentFilePath), `Component file ${componentDir}/component.tsx should exist`).toBe(true);

        const hasExport = hasCorrectExport(componentDir);
        expect(hasExport, `Component ${componentDir} should export its main component`).toBe(true);
      });
    });
  });

  describe("testId Requirements", () => {
    componentDirs.forEach((componentDir) => {
      it(`${componentDir} should have static data-testid matching component name`, () => {
        const testIdInfo = hasTestId(componentDir);

        if (!testIdInfo.hasTestId) {
          console.warn(`❌ Component ${componentDir} missing data-testid - should add: data-testid="${componentDir}"`);
        }
        else {
          // Check if main component has the expected testid pattern
          const expectedTestId = componentDir;
          const hasCorrectTestId = testIdInfo.testIdPattern === expectedTestId;

          if (hasCorrectTestId) {
            console.log(`✅ Component ${componentDir} has correct testid: "${testIdInfo.testIdPattern}"`);
          }
          else {
            const countText = testIdInfo.testIdCount > 1 ? ` (${testIdInfo.testIdCount} total)` : "";
            console.warn(`⚠️  Component ${componentDir} has testid "${testIdInfo.testIdPattern}" but should be "${expectedTestId}"${countText}`);
          }
        }

        // Hard requirement: Every component must have correct data-testid
        expect(testIdInfo.hasTestId, `Component ${componentDir} must have data-testid attribute. Add: data-testid="${componentDir}"`).toBe(true);

        if (testIdInfo.hasTestId) {
          const expectedTestId = componentDir;
          const hasCorrectTestId = testIdInfo.testIdPattern === expectedTestId;
          expect(hasCorrectTestId, `Component ${componentDir} has testid "${testIdInfo.testIdPattern}" but should be "${expectedTestId}"`).toBe(true);
        }
      });
    });
  });

  describe("validation Summary", () => {
    it("should provide comprehensive validation report", () => {
      const results = {
        totalComponents: componentDirs.length,
        registryComponents: Object.keys(COMPONENT_REGISTRY).length,
        withExamples: 0,
        withTypeScriptProps: 0,
        withJSDocDescriptions: 0,
        withCorrectExports: 0,
        withTestIds: 0,
        withCorrectTestIds: 0,
        missingExamples: [] as string[],
        missingProps: [] as string[],
        longDescriptions: [] as Array<{ component: string; length: number; description: string }>,
        missingExports: [] as string[],
        missingTestIds: [] as string[],
        incorrectTestIds: [] as Array<{ component: string; actual: string; expected: string }>,
      };

      // Check registry examples
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        if (config.examples && config.examples.length > 0) {
          results.withExamples++;
        }
        else {
          results.missingExamples.push(id);
        }
      });

      // Check component files
      componentDirs.forEach((componentDir) => {
        // TypeScript props
        if (hasTypeScriptProps(componentDir)) {
          results.withTypeScriptProps++;
        }
        else {
          results.missingProps.push(componentDir);
        }

        // JSDoc descriptions
        const description = getJSDocDescription(componentDir);
        if (description) {
          results.withJSDocDescriptions++;
          if (description.length > 140) {
            results.longDescriptions.push({
              component: componentDir,
              length: description.length,
              description: `${description.substring(0, 100)}...`,
            });
          }
        }

        // Exports
        if (hasCorrectExport(componentDir)) {
          results.withCorrectExports++;
        }
        else {
          results.missingExports.push(componentDir);
        }

        // Test IDs
        const testIdInfo = hasTestId(componentDir);
        if (testIdInfo.hasTestId) {
          results.withTestIds++;
          const expectedTestId = componentDir;
          const hasCorrectTestId = testIdInfo.testIdPattern === expectedTestId;

          if (hasCorrectTestId) {
            results.withCorrectTestIds++;
          }
          else if (testIdInfo.testIdPattern) {
            results.incorrectTestIds.push({
              component: componentDir,
              actual: testIdInfo.testIdPattern,
              expected: expectedTestId,
            });
          }
        }
        else {
          results.missingTestIds.push(componentDir);
        }
      });

      const separator = "=".repeat(80);
      console.log(`\n${separator}`);
      console.log("COMPONENT VALIDATION SUMMARY");
      console.log(separator);

      console.log(`\n📊 OVERALL STATISTICS:`);
      console.log(`Total component directories: ${results.totalComponents}`);
      console.log(`Registry components: ${results.registryComponents}`);
      console.log(`Components with examples: ${results.withExamples}/${results.registryComponents} (${Math.round(results.withExamples / results.registryComponents * 100)}%)`);
      console.log(`Components with TypeScript props: ${results.withTypeScriptProps}/${results.totalComponents} (${Math.round(results.withTypeScriptProps / results.totalComponents * 100)}%)`);
      console.log(`Components with JSDoc descriptions: ${results.withJSDocDescriptions}/${results.totalComponents} (${Math.round(results.withJSDocDescriptions / results.totalComponents * 100)}%)`);
      console.log(`Components with correct exports: ${results.withCorrectExports}/${results.totalComponents} (${Math.round(results.withCorrectExports / results.totalComponents * 100)}%)`);
      console.log(`Components with test IDs: ${results.withTestIds}/${results.totalComponents} (${Math.round(results.withTestIds / results.totalComponents * 100)}%)`);
      console.log(`Components with correct test IDs: ${results.withCorrectTestIds}/${results.totalComponents} (${Math.round(results.withCorrectTestIds / results.totalComponents * 100)}%)`);

      if (results.missingExamples.length > 0) {
        console.log(`\n❌ COMPONENTS MISSING EXAMPLES (${results.missingExamples.length}):`);
        results.missingExamples.forEach(component => console.log(`  • ${component}`));
      }

      if (results.missingProps.length > 0) {
        console.log(`\n❌ COMPONENTS MISSING TYPESCRIPT PROPS (${results.missingProps.length}):`);
        results.missingProps.forEach(component => console.log(`  • ${component}`));
      }

      if (results.longDescriptions.length > 0) {
        console.log(`\n⚠️  COMPONENTS WITH LONG JSDOC DESCRIPTIONS (${results.longDescriptions.length}):`);
        results.longDescriptions.forEach(({ component, length, description }) =>
          console.log(`  • ${component} (${length} chars): ${description}`),
        );
      }

      if (results.missingExports.length > 0) {
        console.log(`\n❌ COMPONENTS WITH EXPORT ISSUES (${results.missingExports.length}):`);
        results.missingExports.forEach(component => console.log(`  • ${component}`));
      }

      if (results.missingTestIds.length > 0) {
        console.log(`\n❌ COMPONENTS MISSING TEST IDS (${results.missingTestIds.length}):`);
        results.missingTestIds.forEach(component =>
          console.log(`  • ${component} - should add: data-testid="${component}"`));
      }

      if (results.incorrectTestIds.length > 0) {
        console.log(`\n⚠️  COMPONENTS WITH INCORRECT TEST IDS (${results.incorrectTestIds.length}):`);
        results.incorrectTestIds.forEach(({ component, actual, expected }) =>
          console.log(`  • ${component} - has "${actual}" but should be "${expected}"`));
      }

      console.log(`\n${separator}`);

      // Test passes for reporting purposes
      expect(results.totalComponents).toBeGreaterThan(0);
    });
  });
});
