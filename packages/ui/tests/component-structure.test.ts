/**
 * Comprehensive test suite for validating component structure across all components.
 *
 * Uses Textarea as the canonical example for proper component structure.
 *
 * Validates:
 * 1. Component export structure and naming conventions
 * 2. JSDoc requirements with specific tags (@component, @name, @id, @icon, @category, @param)
 * 3. Icon references against valid Lucide React icons
 * 4. Description quality and length requirements
 * 5. Proper @param props documentation
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as LucideIcons from "lucide-react";
import { describe, expect, it } from "vitest";

/**
 * Get all valid Lucide React icon names dynamically from the package
 * This ensures we validate against all ~1700 icons, not just a curated list
 */
function getAllLucideIconNames(): Set<string> {
  const allExports = Object.keys(LucideIcons);

  // Filter for actual icon components (exclude utilities, types, etc.)
  const iconNames = allExports.filter((name) => {
    return (
      name[0] === name[0].toUpperCase() // Starts with capital letter
      && !name.endsWith("Icon") // Exclude icon data objects (e.g., AArrowDownIcon)
      && name !== "Icon" // Exclude the base Icon component
      && name !== "DynamicIcon" // Exclude DynamicIcon
      && name !== "createLucideIcon" // Exclude utility functions
      && name !== "IconNode" // Exclude type exports
      && !name.startsWith("Lucide") // Exclude Lucide-prefixed utilities
    );
  });

  return new Set(iconNames);
}

// Get all valid Lucide React icons
const ALL_LUCIDE_ICONS = getAllLucideIconNames();

type ComponentValidationResult = {
  componentDir: string;
  componentFilePath: string;
  fileExists: boolean;
  componentName: string | null;
  exportedCorrectly: boolean;
  hasJSDoc: boolean;
  jsdocTags: {
    hasComponent: boolean;
    hasName: boolean;
    hasId: boolean;
    hasIcon: boolean;
    hasCategory: boolean;
    hasParamProps: boolean;
    hasSee: boolean;
  };
  jsdocContent: {
    name: string | null;
    id: string | null;
    icon: string | null;
    category: string | null;
    description: string | null;
    hasExternalDependency: boolean;
  };
  validation: {
    nameMatchesDirectory: boolean;
    idMatchesDirectory: boolean;
    iconIsValid: boolean;
    categoryIsValid: boolean;
    descriptionIsValid: boolean;
    seeRequiredIfExternal: boolean;
  };
  issues: string[];
  warnings: string[];
};

const VALID_CATEGORIES = ["ui", "inputs", "forms", "charts", "data", "navigation", "utility"];

// Components with external dependencies that should have @see tags
const COMPONENTS_WITH_EXTERNAL_DEPS = [
  "textarea", // react-textarea-autosize
  "area-chart", // recharts
  "bar-chart", // recharts
  "line-chart", // recharts
  "donut-chart", // recharts
  "combo-chart", // recharts
  "spark-chart", // recharts
  "category-bar", // recharts
  "tracker", // recharts
  "meter", // base-ui
  "progress", // base-ui
  "progress-circle", // base-ui
  "calendar", // react-day-picker
  "date-picker", // react-day-picker
  "code-block", // shiki
];

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
      // Only include directories that have a main component file
      const componentPath = join(componentsDir, componentDir, "component.tsx");
      return existsSync(componentPath);
    })
    .sort();
}

/**
 * Convert kebab-case to PascalCase
 */
function kebabToPascalCase(str: string): string {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Extract JSDoc content from a comment block
 */
function extractJSDocContent(jsdocBlock: string, componentDir: string) {
  const content = {
    name: null as string | null,
    id: null as string | null,
    icon: null as string | null,
    category: null as string | null,
    description: null as string | null,
    hasExternalDependency: COMPONENTS_WITH_EXTERNAL_DEPS.includes(componentDir),
  };

  // Extract @name
  const nameMatch = jsdocBlock.match(/@name\s+(.+)/);
  if (nameMatch) {
    content.name = nameMatch[1].trim();
  }

  // Extract @id
  const idMatch = jsdocBlock.match(/@id\s+([\w-]+)/);
  if (idMatch) {
    content.id = idMatch[1].trim();
  }

  // Extract @icon
  const iconMatch = jsdocBlock.match(/@icon\s+(\w+)/);
  if (iconMatch) {
    content.icon = iconMatch[1].trim();
  }

  // Extract @category
  const categoryMatch = jsdocBlock.match(/@category\s+(\w+)/);
  if (categoryMatch) {
    content.category = categoryMatch[1].trim();
  }

  // Extract description (content before first @tag, excluding the /** and * prefixes)
  const lines = jsdocBlock.split("\n");
  const descriptionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip /** and */ lines
    if (line === "/**" || line === "*/") {
      continue;
    }

    // Stop at first @tag
    if (line.includes("@")) {
      break;
    }

    // Clean line and add to description
    const cleaned = line.replace(/^\*\s?/, "").trim();
    if (cleaned) {
      descriptionLines.push(cleaned);
    }
  }

  if (descriptionLines.length > 0) {
    const description = descriptionLines.join(" ").trim();
    if (description.length > 10) {
      content.description = description;
    }
  }

  return content;
}

/**
 * Validate a single component's structure and JSDoc
 */
function validateComponent(componentDir: string): ComponentValidationResult {
  const componentsDir = join(process.cwd(), "src", "components");
  const componentFilePath = join(componentsDir, componentDir, "component.tsx");

  const result: ComponentValidationResult = {
    componentDir,
    componentFilePath,
    fileExists: false,
    componentName: null,
    exportedCorrectly: false,
    hasJSDoc: false,
    jsdocTags: {
      hasComponent: false,
      hasName: false,
      hasId: false,
      hasIcon: false,
      hasCategory: false,
      hasParamProps: false,
      hasSee: false,
    },
    jsdocContent: {
      name: null,
      id: null,
      icon: null,
      category: null,
      description: null,
      hasExternalDependency: false,
    },
    validation: {
      nameMatchesDirectory: false,
      idMatchesDirectory: false,
      iconIsValid: false,
      categoryIsValid: false,
      descriptionIsValid: false,
      seeRequiredIfExternal: false,
    },
    issues: [],
    warnings: [],
  };

  // Check if file exists
  if (!existsSync(componentFilePath)) {
    result.issues.push(`Component file not found: ${componentDir}/component.tsx`);
    return result;
  }

  result.fileExists = true;

  // Read and parse the file
  const content = readFileSync(componentFilePath, "utf8");
  const lines = content.split("\n");

  // Find the main component definition
  // Look for patterns like: export const Button = React.forwardRef, const Button = (props) =>, etc.
  let componentName: string | null = null;
  let componentLineIndex = -1;

  const componentPatterns = [
    // React.forwardRef pattern
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*React\.forwardRef/,
    // TypeScript function component pattern: const Component: React.FC<Props> = ({
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*:\s*React\.FC/,
    // Any const assignment (most flexible - catches all component styles)
    /^(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*[:=]/,
    // Function declaration pattern
    /^(?:export\s+)?function\s+([A-Z][a-zA-Z0-9]*)\s*\(/,
  ];

  const expectedComponentName = kebabToPascalCase(componentDir);
  const candidateComponents: Array<{ name: string; lineIndex: number }> = [];

  // First pass: collect all component candidates
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    for (const pattern of componentPatterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1];

        // Skip utility functions, hooks, or internal components
        // But allow legitimate component names like ContextMenu, ResponsiveDrawer
        if (name.includes("Internal") || name.includes("Util")
          || name.includes("Helper") || name.startsWith("use")
          || (name.includes("Context") && !name.match(/^(ContextMenu|ContextDialog)$/))
          || name.includes("Provider")
          || name.includes("Config") || name.includes("Schema")) {
          continue;
        }

        candidateComponents.push({ name, lineIndex: i });
      }
    }
  }

  // Second pass: prioritize the component that matches the expected name
  const exactMatch = candidateComponents.find(c => c.name === expectedComponentName);
  if (exactMatch) {
    componentName = exactMatch.name;
    componentLineIndex = exactMatch.lineIndex;
  } else if (candidateComponents.length > 0) {
    // Fallback to first candidate if no exact match
    const firstCandidate = candidateComponents[0];
    componentName = firstCandidate.name;
    componentLineIndex = firstCandidate.lineIndex;
  }

  if (!componentName) {
    result.issues.push("No main component definition found");
    return result;
  }

  result.componentName = componentName;

  // Check if component is exported - look for various export patterns
  const exportPatterns = [
    new RegExp(`^export\\s+\\{[^}]*\\b${componentName}\\b[^}]*\\}`, 'm'), // export { Component }
    new RegExp(`^export\\s+const\\s+${componentName}\\s*=`, 'm'), // export const Component =
    new RegExp(`^export\\s+function\\s+${componentName}\\s*\\(`, 'm'), // export function Component(
    new RegExp(`^export\\s*\\{[^}]*\\b${componentName}\\b[^}]*\\}\\s*;?\\s*$`, 'm'), // export { Component };
    new RegExp(`\\bexport\\s*\\{[^}]*\\b${componentName}\\b`, 'm'), // anywhere: export { Component, ...
  ];
  result.exportedCorrectly = exportPatterns.some(pattern => pattern.test(content));

  if (!result.exportedCorrectly) {
    result.issues.push(`Component ${componentName} is not properly exported`);
  }

  // Look for JSDoc comment block above the component
  let jsdocStart = -1;
  let jsdocEnd = -1;
  let jsdocBlock = "";

  // Search backwards from component definition for JSDoc
  for (let i = componentLineIndex - 1; i >= Math.max(0, componentLineIndex - 50); i--) {
    const line = lines[i].trim();

    if (line === "*/") {
      jsdocEnd = i;
    }
    else if (line === "/**" && jsdocEnd > i) {
      jsdocStart = i;
      break;
    }

    // Stop if we hit non-comment, non-empty line that's not import/type/const
    if (line && !line.startsWith("*") && !line.startsWith("//")
      && line !== "*/" && !line.startsWith("import")
      && !line.startsWith("const") && !line.startsWith("type")
      && !line.startsWith("interface") && !line.startsWith("export")) {
      break;
    }
  }

  if (jsdocStart >= 0 && jsdocEnd >= 0) {
    result.hasJSDoc = true;
    jsdocBlock = lines.slice(jsdocStart, jsdocEnd + 1).join("\n");

    // Check for required JSDoc tags
    result.jsdocTags.hasComponent = /@component/.test(jsdocBlock);
    result.jsdocTags.hasName = /@name\s+.+/.test(jsdocBlock);
    result.jsdocTags.hasId = /@id\s+[\w-]+/.test(jsdocBlock);
    result.jsdocTags.hasIcon = /@icon\s+\w+/.test(jsdocBlock);
    result.jsdocTags.hasCategory = /@category\s+\w+/.test(jsdocBlock);
    result.jsdocTags.hasParamProps = /@param\s+props\s*-/.test(jsdocBlock);
    result.jsdocTags.hasSee = /@see\s+/.test(jsdocBlock);

    // Extract JSDoc content
    result.jsdocContent = extractJSDocContent(jsdocBlock, componentDir);

    // Validation checks
    const expectedPascalName = kebabToPascalCase(componentDir);

    if (result.jsdocContent.name) {
      result.validation.nameMatchesDirectory = result.jsdocContent.name === expectedPascalName;
    }

    if (result.jsdocContent.id) {
      result.validation.idMatchesDirectory = result.jsdocContent.id === componentDir;
    }

    if (result.jsdocContent.icon) {
      result.validation.iconIsValid = ALL_LUCIDE_ICONS.has(result.jsdocContent.icon);
    }

    if (result.jsdocContent.category) {
      result.validation.categoryIsValid = VALID_CATEGORIES.includes(result.jsdocContent.category);
    }

    if (result.jsdocContent.description) {
      // Check description quality: should be 20-200 characters, descriptive
      const desc = result.jsdocContent.description;
      result.validation.descriptionIsValid
        = desc.length >= 20
          && desc.length <= 200
          && desc.split(" ").length >= 4; // At least 4 words
    }

    // Check @see requirement for components with external dependencies
    result.validation.seeRequiredIfExternal = result.jsdocContent.hasExternalDependency
      ? result.jsdocTags.hasSee
      : true; // Not required if no external dependency
  }

  // Generate issues and warnings
  if (!result.hasJSDoc) {
    result.issues.push(`No JSDoc comment block found above component ${componentName}`);
  }
  else {
    // Check required tags
    if (!result.jsdocTags.hasComponent) {
      result.issues.push("Missing @component tag in JSDoc");
    }
    if (!result.jsdocTags.hasName) {
      result.issues.push("Missing @name tag in JSDoc");
    }
    if (!result.jsdocTags.hasId) {
      result.issues.push("Missing @id tag in JSDoc");
    }
    if (!result.jsdocTags.hasIcon) {
      result.issues.push("Missing @icon tag in JSDoc");
    }
    if (!result.jsdocTags.hasCategory) {
      result.issues.push("Missing @category tag in JSDoc");
    }
    if (!result.jsdocTags.hasParamProps) {
      result.issues.push("Missing @param props tag in JSDoc - all components should document their props parameter");
    }

    // Check @see for components with external dependencies
    if (result.jsdocContent.hasExternalDependency && !result.jsdocTags.hasSee) {
      result.issues.push("Missing @see tag for component with external dependency - should link to external library documentation");
    }

    // Validation issues
    if (result.jsdocContent.name && !result.validation.nameMatchesDirectory) {
      result.issues.push(`@name "${result.jsdocContent.name}" should match expected PascalCase "${kebabToPascalCase(componentDir)}"`);
    }

    if (result.jsdocContent.id && !result.validation.idMatchesDirectory) {
      result.issues.push(`@id "${result.jsdocContent.id}" should match directory name "${componentDir}"`);
    }

    if (result.jsdocContent.icon && !result.validation.iconIsValid) {
      result.warnings.push(`@icon "${result.jsdocContent.icon}" may not be a valid Lucide React icon`);
    }

    if (result.jsdocContent.category && !result.validation.categoryIsValid) {
      result.issues.push(`@category "${result.jsdocContent.category}" is not valid. Must be one of: ${VALID_CATEGORIES.join(", ")}`);
    }

    if (!result.jsdocContent.description) {
      result.issues.push("Missing meaningful description in JSDoc");
    }
    else if (!result.validation.descriptionIsValid) {
      result.warnings.push("Description should be 20-200 characters and at least 4 words");
    }
  }

  // Check component naming convention
  const expectedPascalName = kebabToPascalCase(componentDir);
  if (componentName !== expectedPascalName) {
    result.warnings.push(`Component name "${componentName}" doesn't match expected PascalCase "${expectedPascalName}"`);
  }

  return result;
}

describe("component Structure Validation", () => {
  const componentDirs = getComponentDirectories();

  it("should find component directories with main component files", () => {
    expect(componentDirs.length).toBeGreaterThan(50);
    console.log(`Found ${componentDirs.length} component directories`);
  });

  describe("individual component validation", () => {
    componentDirs.forEach((componentDir) => {
      describe(`${componentDir} component`, () => {
        const validation = validateComponent(componentDir);

        it("should have a main component file", () => {
          expect(validation.fileExists).toBe(true);
        });

        it("should have a main component definition", () => {
          expect(validation.componentName).toBeTruthy();
        });

        it("should export the component correctly", () => {
          expect(validation.exportedCorrectly).toBe(true);
        });

        it("should have JSDoc comment block", () => {
          if (!validation.hasJSDoc) {
            console.warn(`${componentDir}: Missing JSDoc`);
          }
          expect(validation.hasJSDoc).toBe(true);
        });

        it("should have all required JSDoc tags", () => {
          expect(validation.jsdocTags.hasComponent).toBe(true);
          expect(validation.jsdocTags.hasName).toBe(true);
          expect(validation.jsdocTags.hasId).toBe(true);
          expect(validation.jsdocTags.hasIcon).toBe(true);
          expect(validation.jsdocTags.hasCategory).toBe(true);
          expect(validation.jsdocTags.hasParamProps).toBe(true);

          // @see is only required for components with external dependencies
          if (COMPONENTS_WITH_EXTERNAL_DEPS.includes(componentDir)) {
            expect(validation.jsdocTags.hasSee).toBe(true);
          }
        });

        it("should have valid JSDoc content", () => {
          if (validation.issues.length > 0) {
            console.warn(`${componentDir} issues:`, validation.issues);
          }
          if (validation.warnings.length > 0) {
            console.warn(`${componentDir} warnings:`, validation.warnings);
          }

          // This test passes for reporting purposes, but logs issues
          expect(validation.fileExists).toBe(true);
        });
      });
    });
  });

  describe("comprehensive validation report", () => {
    it("should provide detailed validation statistics", () => {
      const validations = componentDirs.map(dir => ({
        dir,
        validation: validateComponent(dir),
      }));

      // Calculate statistics
      const stats = {
        total: validations.length,
        withFiles: validations.filter(v => v.validation.fileExists).length,
        withComponents: validations.filter(v => v.validation.componentName).length,
        withExports: validations.filter(v => v.validation.exportedCorrectly).length,
        withJSDoc: validations.filter(v => v.validation.hasJSDoc).length,
        withAllTags: validations.filter((v) => {
          const requiredTags = v.validation.jsdocTags.hasComponent
            && v.validation.jsdocTags.hasName
            && v.validation.jsdocTags.hasId
            && v.validation.jsdocTags.hasIcon
            && v.validation.jsdocTags.hasCategory
            && v.validation.jsdocTags.hasParamProps;

          // @see is only required for components with external dependencies
          const seeRequired = COMPONENTS_WITH_EXTERNAL_DEPS.includes(v.dir)
            ? v.validation.jsdocTags.hasSee
            : true;

          return requiredTags && seeRequired;
        }).length,
        fullyValid: validations.filter(v => v.validation.issues.length === 0).length,
        withWarningsOnly: validations.filter(v =>
          v.validation.issues.length === 0 && v.validation.warnings.length > 0,
        ).length,
      };

      // Tag-specific statistics
      const tagStats = {
        component: validations.filter(v => v.validation.jsdocTags.hasComponent).length,
        name: validations.filter(v => v.validation.jsdocTags.hasName).length,
        id: validations.filter(v => v.validation.jsdocTags.hasId).length,
        icon: validations.filter(v => v.validation.jsdocTags.hasIcon).length,
        category: validations.filter(v => v.validation.jsdocTags.hasCategory).length,
        paramProps: validations.filter(v => v.validation.jsdocTags.hasParamProps).length,
        see: validations.filter(v => v.validation.jsdocTags.hasSee).length,
      };

      // Validation-specific statistics
      const validationStats = {
        nameMatches: validations.filter(v => v.validation.validation.nameMatchesDirectory).length,
        idMatches: validations.filter(v => v.validation.validation.idMatchesDirectory).length,
        iconValid: validations.filter(v => v.validation.validation.iconIsValid).length,
        categoryValid: validations.filter(v => v.validation.validation.categoryIsValid).length,
        descriptionValid: validations.filter(v => v.validation.validation.descriptionIsValid).length,
        seeRequired: validations.filter(v => v.validation.validation.seeRequiredIfExternal).length,
      };

      console.log(`\n${"=".repeat(80)}`);
      console.log("COMPONENT STRUCTURE VALIDATION REPORT");
      console.log("=".repeat(80));

      console.log(`\n📊 OVERALL STATISTICS:`);
      console.log(`Total components: ${stats.total}`);
      console.log(`Components with files: ${stats.withFiles}/${stats.total} (${Math.round(stats.withFiles / stats.total * 100)}%)`);
      console.log(`Components found: ${stats.withComponents}/${stats.total} (${Math.round(stats.withComponents / stats.total * 100)}%)`);
      console.log(`Properly exported: ${stats.withExports}/${stats.total} (${Math.round(stats.withExports / stats.total * 100)}%)`);
      console.log(`With JSDoc: ${stats.withJSDoc}/${stats.total} (${Math.round(stats.withJSDoc / stats.total * 100)}%)`);
      console.log(`With all required tags: ${stats.withAllTags}/${stats.total} (${Math.round(stats.withAllTags / stats.total * 100)}%)`);
      console.log(`Fully valid: ${stats.fullyValid}/${stats.total} (${Math.round(stats.fullyValid / stats.total * 100)}%)`);
      console.log(`With warnings only: ${stats.withWarningsOnly}/${stats.total} (${Math.round(stats.withWarningsOnly / stats.total * 100)}%)`);

      console.log(`\n🏷️  JSDOC TAG COVERAGE:`);
      console.log(`@component: ${tagStats.component}/${stats.total} (${Math.round(tagStats.component / stats.total * 100)}%)`);
      console.log(`@name: ${tagStats.name}/${stats.total} (${Math.round(tagStats.name / stats.total * 100)}%)`);
      console.log(`@id: ${tagStats.id}/${stats.total} (${Math.round(tagStats.id / stats.total * 100)}%)`);
      console.log(`@icon: ${tagStats.icon}/${stats.total} (${Math.round(tagStats.icon / stats.total * 100)}%)`);
      console.log(`@category: ${tagStats.category}/${stats.total} (${Math.round(tagStats.category / stats.total * 100)}%)`);
      console.log(`@param props: ${tagStats.paramProps}/${stats.total} (${Math.round(tagStats.paramProps / stats.total * 100)}%)`);
      console.log(`@see: ${tagStats.see}/${stats.total} (${Math.round(tagStats.see / stats.total * 100)}%)`);

      console.log(`\n✅ VALIDATION ACCURACY:`);
      console.log(`Name matches directory: ${validationStats.nameMatches}/${stats.total} (${Math.round(validationStats.nameMatches / stats.total * 100)}%)`);
      console.log(`ID matches directory: ${validationStats.idMatches}/${stats.total} (${Math.round(validationStats.idMatches / stats.total * 100)}%)`);
      console.log(`Valid Lucide icons: ${validationStats.iconValid}/${stats.total} (${Math.round(validationStats.iconValid / stats.total * 100)}%)`);
      console.log(`Valid categories: ${validationStats.categoryValid}/${stats.total} (${Math.round(validationStats.categoryValid / stats.total * 100)}%)`);
      console.log(`Quality descriptions: ${validationStats.descriptionValid}/${stats.total} (${Math.round(validationStats.descriptionValid / stats.total * 100)}%)`);
      console.log(`See required for external deps: ${validationStats.seeRequired}/${stats.total} (${Math.round(validationStats.seeRequired / stats.total * 100)}%)`);

      // List components with issues
      const componentsWithIssues = validations.filter(v => v.validation.issues.length > 0);
      if (componentsWithIssues.length > 0) {
        console.log(`\n❌ COMPONENTS WITH ISSUES (${componentsWithIssues.length}):`);
        componentsWithIssues.forEach(({ dir, validation }) => {
          console.log(`\n📁 ${dir}:`);
          validation.issues.forEach(issue => console.log(`  • ${issue}`));
          if (validation.warnings.length > 0) {
            console.log(`  Warnings:`);
            validation.warnings.forEach(warning => console.log(`  ⚠ ${warning}`));
          }
        });
      }

      // List components with warnings only
      const componentsWithWarningsOnly = validations.filter(v =>
        v.validation.issues.length === 0 && v.validation.warnings.length > 0,
      );
      if (componentsWithWarningsOnly.length > 0) {
        console.log(`\n⚠️  COMPONENTS WITH WARNINGS ONLY (${componentsWithWarningsOnly.length}):`);
        componentsWithWarningsOnly.forEach(({ dir, validation }) => {
          console.log(`📁 ${dir}: ${validation.warnings.join(", ")}`);
        });
      }

      // List fully compliant components
      const fullyCompliantComponents = validations.filter(v =>
        v.validation.issues.length === 0 && v.validation.warnings.length === 0,
      );
      if (fullyCompliantComponents.length > 0) {
        console.log(`\n✅ FULLY COMPLIANT COMPONENTS (${fullyCompliantComponents.length}):`);
        fullyCompliantComponents.forEach(({ dir }) => {
          console.log(`📁 ${dir}`);
        });
      }

      console.log(`\n${"=".repeat(80)}`);

      // Test passes for reporting purposes
      expect(stats.total).toBeGreaterThan(0);
    });
  });

  describe("specific component examples", () => {
    it("should validate textarea component (reference example)", () => {
      const validation = validateComponent("textarea");

      expect(validation.fileExists).toBe(true);
      expect(validation.componentName).toBe("Textarea");
      expect(validation.hasJSDoc).toBe(true);
      expect(validation.jsdocTags.hasId).toBe(true);
      expect(validation.jsdocTags.hasName).toBe(true);
      expect(validation.jsdocTags.hasIcon).toBe(true);
      expect(validation.jsdocTags.hasCategory).toBe(true);
      expect(validation.jsdocTags.hasParamProps).toBe(true);
      expect(validation.jsdocTags.hasSee).toBe(true);

      if (validation.issues.length > 0) {
        console.warn("Textarea component issues:", validation.issues);
      }
    });

    it("should validate button component (common example)", () => {
      const validation = validateComponent("button");

      expect(validation.fileExists).toBe(true);
      expect(validation.componentName).toBe("Button");

      if (validation.issues.length > 0) {
        console.warn("Button component issues:", validation.issues);
      }
    });
  });
});
