#!/usr/bin/env tsx

/**
 * Analyze Missing Prop Definitions
 *
 * Uses the same JSDoc parser as the component registry to accurately identify
 * which components have proper JSDoc props vs those showing HTML attributes
 * or other unwanted props in the props explorer.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "react-docgen-typescript";

const componentsDir = path.resolve("packages/ui/src/components");

type ComponentAnalysis = {
  name: string;
  status: "good" | "html-attributes" | "js-methods" | "no-props" | "error";
  propCount: number;
  sampleProps: string[];
  issues: string[];
};

/**
 * Analyze a single component's props
 */
function analyzeComponent(componentDir: string): ComponentAnalysis {
  const componentPath = path.join(componentsDir, componentDir);

  // Find the main component file
  const possibleFiles = [
    `${componentDir}.tsx`,
    "index.tsx",
    `${componentDir.split("-").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1),
    ).join("")}.tsx`,
  ];

  let componentFile: string | null = null;
  for (const file of possibleFiles) {
    const filePath = path.join(componentPath, file);
    if (fs.existsSync(filePath)) {
      componentFile = filePath;
      break;
    }
  }

  if (!componentFile) {
    return {
      name: componentDir,
      status: "error",
      propCount: 0,
      sampleProps: [],
      issues: ["No component file found"],
    };
  }

  try {
    // Use the same parsing logic as the component registry
    const componentInfo = parse(componentFile, {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return Boolean(prop.description
          && prop.description.trim().length > 0
          && !prop.name.startsWith("aria-")
          && !prop.name.startsWith("data-")
          && prop.name !== "key"
          && prop.name !== "ref"
          && prop.name !== "className"
          && !prop.name.startsWith("on"));
      },
    });

    if (componentInfo.length === 0) {
      return {
        name: componentDir,
        status: "no-props",
        propCount: 0,
        sampleProps: [],
        issues: ["No props found by JSDoc parser"],
      };
    }

    const component = componentInfo[0];
    const props = Object.entries(component.props || {});
    const propNames = props.map(([name]) => name);
    const propDescriptions = props.map(([, prop]) => prop.description || "");

    // Analyze the types of props found
    const issues: string[] = [];
    let status: ComponentAnalysis["status"] = "good";

    // Check for HTML attributes
    const htmlAttributes = ["inert", "inputMode", "is", "exportparts", "part"];
    const hasHtmlAttributes = propNames.some(name => htmlAttributes.includes(name));

    // Check for JavaScript string methods
    const jsMethods = ["toString", "charAt", "indexOf", "split", "slice", "replace"];
    const hasJsMethods = propNames.some(name => jsMethods.includes(name));

    // Check for MDN/HTML spec references in descriptions
    const hasMdnRefs = propDescriptions.some(desc =>
      desc.includes("@see https://developer.mozilla.org")
      || desc.includes("@see {@link https://html.spec.whatwg.org"),
    );

    if (hasJsMethods) {
      status = "js-methods";
      issues.push("Contains JavaScript string/object methods");
    }
    else if (hasHtmlAttributes || hasMdnRefs) {
      status = "html-attributes";
      issues.push("Contains HTML attributes instead of component props");
    }

    // Check if props seem meaningful for a UI component
    const meaningfulPropPatterns = [
      /^(variant|size|color|disabled|loading|children|title|description|value|onChange|onClick)$/,
      /^(src|alt|href|target)$/, // media/link props
      /^(placeholder|defaultValue|required|min|max)$/, // form props
      /^(open|onOpenChange|trigger|content)$/, // overlay props
    ];

    const meaningfulProps = propNames.filter(name =>
      meaningfulPropPatterns.some(pattern => pattern.test(name)),
    );

    if (status === "good" && meaningfulProps.length === 0 && propNames.length > 0) {
      // Has props but none seem UI-component related
      if (propNames.some(name => name.includes("render") || name.includes("Render"))) {
        issues.push("Only has render-related props");
      }
      else {
        issues.push("Props don't seem UI-component related");
      }
    }

    return {
      name: componentDir,
      status,
      propCount: props.length,
      sampleProps: propNames.slice(0, 5), // First 5 props as sample
      issues,
    };
  }
  catch (error) {
    return {
      name: componentDir,
      status: "error",
      propCount: 0,
      sampleProps: [],
      issues: [`Parse error: ${(error as Error).message}`],
    };
  }
}

/**
 * Main analysis function
 */
async function analyzeAllComponents() {
  console.log("🔍 Analyzing component props using JSDoc parser...\n");

  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  const results: ComponentAnalysis[] = [];

  for (const componentDir of componentDirs) {
    const analysis = analyzeComponent(componentDir);
    results.push(analysis);

    // Progress indicator
    const statusIcon = {
      "good": "✅",
      "html-attributes": "🔸",
      "js-methods": "🔴",
      "no-props": "⚪",
      "error": "❌",
    }[analysis.status];

    console.log(`${statusIcon} ${analysis.name} (${analysis.propCount} props)`);
  }

  // Generate summary
  const summary = {
    total: results.length,
    good: results.filter(r => r.status === "good").length,
    htmlAttributes: results.filter(r => r.status === "html-attributes").length,
    jsMethods: results.filter(r => r.status === "js-methods").length,
    noProps: results.filter(r => r.status === "no-props").length,
    errors: results.filter(r => r.status === "error").length,
  };

  console.log("\n📊 Summary:");
  console.log(`Total components: ${summary.total}`);
  console.log(`✅ Good (proper JSDoc props): ${summary.good} (${Math.round(summary.good / summary.total * 100)}%)`);
  console.log(`🔸 HTML attributes: ${summary.htmlAttributes} (${Math.round(summary.htmlAttributes / summary.total * 100)}%)`);
  console.log(`🔴 JS methods: ${summary.jsMethods} (${Math.round(summary.jsMethods / summary.total * 100)}%)`);
  console.log(`⚪ No props: ${summary.noProps} (${Math.round(summary.noProps / summary.total * 100)}%)`);
  console.log(`❌ Errors: ${summary.errors} (${Math.round(summary.errors / summary.total * 100)}%)`);

  // Generate detailed markdown report
  const markdown = generateMarkdownReport(results, summary);
  fs.writeFileSync("MISSING_PROP_DEFINITIONS.md", markdown);

  console.log("\n📝 Detailed report saved to MISSING_PROP_DEFINITIONS.md");
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(results: ComponentAnalysis[], summary: any): string {
  const goodComponents = results.filter(r => r.status === "good");
  const htmlAttributeComponents = results.filter(r => r.status === "html-attributes");
  const jsMethodComponents = results.filter(r => r.status === "js-methods");
  const noPropsComponents = results.filter(r => r.status === "no-props");
  const errorComponents = results.filter(r => r.status === "error");

  return `# Missing Prop Definitions Report

## Overview

This report was generated using the same JSDoc parser as the component registry to accurately identify which components have proper JSDoc prop definitions vs those showing unwanted props in the props explorer.

**Analysis Results:**
- **Total Components**: ${summary.total}
- **✅ Good (proper JSDoc props)**: ${summary.good} (${Math.round(summary.good / summary.total * 100)}%)
- **🔸 HTML attributes**: ${summary.htmlAttributes} (${Math.round(summary.htmlAttributes / summary.total * 100)}%)
- **🔴 JavaScript methods**: ${summary.jsMethods} (${Math.round(summary.jsMethods / summary.total * 100)}%)
- **⚪ No props found**: ${summary.noProps} (${Math.round(summary.noProps / summary.total * 100)}%)
- **❌ Parse errors**: ${summary.errors} (${Math.round(summary.errors / summary.total * 100)}%)

## Components with Proper JSDoc Props ✅ (${goodComponents.length} total)

These components have meaningful, documented props that work well in the props explorer:

${goodComponents.map(c => `- **${c.name}** (${c.propCount} props): ${c.sampleProps.join(", ")}`).join("\n")}

## Components with HTML Attributes 🔸 (${htmlAttributeComponents.length} total)

These components show HTML attributes instead of component-specific props:

${htmlAttributeComponents.map(c => `- **${c.name}** (${c.propCount} props): ${c.sampleProps.join(", ")}`).join("\n")}

## Components with JavaScript Methods 🔴 (${jsMethodComponents.length} total)

These components show JavaScript string/object methods (likely type inference issues):

${jsMethodComponents.map(c => `- **${c.name}** (${c.propCount} props): ${c.sampleProps.join(", ")}`).join("\n")}

## Components with No Props ⚪ (${noPropsComponents.length} total)

These components have no props detected by the JSDoc parser:

${noPropsComponents.map(c => `- **${c.name}**: ${c.issues.join(", ")}`).join("\n")}

${errorComponents.length > 0
  ? `## Components with Parse Errors ❌ (${errorComponents.length} total)

These components had errors during analysis:

${errorComponents.map(c => `- **${c.name}**: ${c.issues.join(", ")}`).join("\n")}`
  : ""}

## How to Fix

### For HTML Attributes (🔸)
Add proper JSDoc comments to the component's props interface:
\`\`\`typescript
type ComponentProps = {
  /**
   * Content to display in the component.
   */
  children: React.ReactNode;
  /**
   * Visual variant of the component.
   */
  variant?: "default" | "primary" | "secondary";
} & React.HTMLAttributes<HTMLDivElement>;
\`\`\`

### For JavaScript Methods (🔴)
Check the component's type definitions - there may be type inference issues causing JS methods to be detected as props.

### For No Props (⚪)
Either add meaningful props with JSDoc comments, or the component may be correctly prop-less.

## Next Steps

1. **Priority**: Fix HTML attributes components first (most common issue)
2. **Investigate**: JavaScript methods components (likely type issues)
3. **Review**: No props components (may be intentional)
4. **Regenerate**: Run \`pnpm run generate-registry\` after fixes

---

*Generated by analyze-missing-props.ts using react-docgen-typescript parser*
`;
}

// Run the analysis
analyzeAllComponents().catch(console.error);
