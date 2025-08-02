/**
 * Generate Props for Single Component
 *
 * This module contains the core function to extract props from a single component.
 * It's used by the component registry generator.
 */

import type { PropMetadata } from "../src/lib/component-config-types";
import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "react-docgen-typescript";

const componentsDir = path.resolve("src/components");

/**
 * Generate props for a single component
 */
export function generateComponentProps(componentDir: string): PropMetadata[] | null {
  const componentPath = path.join(componentsDir, componentDir);

  // Find the main component file (usually matches directory name)
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
    console.log(`⚠️  No component file found for ${componentDir}`);
    return null;
  }

  try {
    // Extract props using react-docgen-typescript
    const componentInfo = parse(componentFile, {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop, component) => {
        // Comprehensive list of built-in string/object methods to exclude
        const builtInMethods = new Set([
          // String prototype methods
          "toString", "charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", 
          "localeCompare", "match", "replace", "search", "slice", "split", 
          "substr", "substring", "toLowerCase", "toUpperCase", "valueOf", "trim",
          "trimStart", "trimEnd", "padStart", "padEnd", "repeat", "startsWith",
          "endsWith", "includes", "normalize", "codePointAt", "fromCharCode",
          "fromCodePoint", "raw", "anchor", "big", "blink", "bold", "fixed",
          "fontcolor", "fontsize", "italics", "link", "small", "strike", "sub", "sup",
          
          // Object prototype methods
          "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString",
          "constructor", "valueOf", "__defineGetter__", "__defineSetter__",
          "__lookupGetter__", "__lookupSetter__", "__proto__",
          
          // Additional JavaScript built-ins
          "length", "prototype", "name", "caller", "arguments", "apply", "call", "bind"
        ]);
        
        // Exclude props that start with special prefixes (TS internal, symbols, etc.)
        const hasExcludedPrefix = prop.name.startsWith("__@") || 
                                 prop.name.startsWith("Symbol.") ||
                                 prop.name.startsWith("@@");
        
        // Keep props that have JSDoc descriptions (our custom props should have them)
        const hasDescription = Boolean(prop.description && prop.description.trim());
        
        // Keep props that are not built-in methods
        const isNotBuiltIn = !builtInMethods.has(prop.name);
        
        // Include if it's not a built-in and either has description OR is a common React prop pattern
        const isCommonReactProp = ["className", "children", "style", "key", "ref"].includes(prop.name);
        
        const shouldInclude = isNotBuiltIn && !hasExcludedPrefix && (hasDescription || isCommonReactProp);
        
        // Debug logging only for included props to reduce noise
        if (shouldInclude) {
          console.log(`✅ Including prop: ${prop.name} - ${prop.description || 'No description'}`);
        }
        
        return shouldInclude;
      },
    });

    if (componentInfo.length === 0) {
      console.log(`⚠️  No props found for ${componentDir}`);
      return null;
    }

    // Get the first component info for props
    const component = componentInfo[0];

    // Convert react-docgen props to our PropMetadata format with better type handling
    const props: PropMetadata[] = Object.entries(component.props || {}).map(([name, prop]) => {
      // Preserve complex types instead of converting to strings
      let propType = prop.type?.name || "unknown";

      // Handle complex types better
      if (prop.type?.raw) {
        propType = prop.type.raw;
      }
      else if (prop.type?.name === "union" && prop.type.value) {
        // Handle union types like "small" | "medium" | "large"
        const unionValues = prop.type.value.map((v: any) => v.value || v.name).join(" | ");
        propType = unionValues;
      }
      else if (prop.type?.name === "enum" && prop.type.value) {
        // Handle enum types
        const enumValues = prop.type.value.map((v: any) => v.value?.replace(/['\"]/g, "")).join(" | ");
        propType = enumValues;
      }

      // Handle default values better - preserve non-string types
      let defaultValue: any = prop.defaultValue?.value;

      // Try to parse the default value to preserve its actual type
      if (defaultValue && typeof defaultValue === "string") {
        // Handle special function calls by evaluating them if possible
        if (defaultValue === "config.getIconStrokeWidth()") {
          // Keep function calls as strings but could evaluate them if needed
          // For now, keep as string for runtime processing
          defaultValue = "config.getIconStrokeWidth()";
        }
        else if (!defaultValue.includes("(") && !defaultValue.includes(".")) {
          // Try to parse simple values that aren't function calls
          if (defaultValue === "true" || defaultValue === "false") {
            defaultValue = defaultValue === "true";
          }
          else if (!isNaN(Number(defaultValue)) && defaultValue !== "") {
            defaultValue = Number(defaultValue);
          }
          else if (defaultValue.startsWith("\"") && defaultValue.endsWith("\"")) {
            defaultValue = defaultValue.slice(1, -1); // Remove quotes for strings
          }
          else if (defaultValue.startsWith("'") && defaultValue.endsWith("'")) {
            defaultValue = defaultValue.slice(1, -1); // Remove quotes for strings
          }
        }
        // For other function calls, keep as strings but add a comment for context
        else if (defaultValue.includes("(")) {
          // Keep the function call but maybe we could add evaluation later
          // For now, keep as string for runtime processing
        }
      }

      return {
        name,
        type: propType,
        description: prop.description || "",
        defaultValue,
        required: prop.required || false,
        options: prop.type?.name === "enum"
          ? prop.type.value?.map((v: any) => v.value?.replace(/['\"]/g, ""))
          : undefined,
      };
    });

    return props;
  }
  catch (error) {
    console.error(`❌ Error processing ${componentDir}:`, error);
    return null;
  }
}

