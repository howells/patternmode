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
        // Only include props that:
        // 1. Are explicitly declared in the component (not inherited)
        // 2. Have custom JSDoc descriptions
        // 3. Are not built-in JS/TS methods or DOM attributes

        // Exclude all known built-in methods and properties
        const builtinMethods = [
          // String methods
          "toString",
          "charAt",
          "charCodeAt",
          "indexOf",
          "lastIndexOf",
          "substring",
          "substr",
          "slice",
          "concat",
          "replace",
          "split",
          "toLowerCase",
          "toUpperCase",
          "trim",
          "valueOf",
          "length",
          "localeCompare",
          "match",
          "search",
          "toLocaleLowerCase",
          "toLocaleUpperCase",
          "codePointAt",
          "includes",
          "endsWith",
          "normalize",
          "repeat",
          "startsWith",
          "anchor",
          "big",
          "blink",
          "bold",
          "fixed",
          "fontcolor",
          "fontsize",
          "italics",
          "link",
          "small",
          "strike",
          "sub",
          "sup",
          "padStart",
          "padEnd",
          "trimEnd",
          "trimStart",
          "trimLeft",
          "trimRight",
          "matchAll",
          "replaceAll",
          "at",
          "isWellFormed",
          "toWellFormed",
          // Object methods
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          // Symbol methods
          "__@iterator@308094",
          // React/DOM props to exclude
          "key",
          "ref",
          "className",
        ];

        const isBuiltinMethod = builtinMethods.includes(prop.name);

        // Exclude props starting with known prefixes
        const hasExcludedPrefix = prop.name.startsWith("aria-")
          || prop.name.startsWith("data-")
          || prop.name.startsWith("on")
          || prop.name.startsWith("__@");

        // Exclude common HTML global attributes
        const htmlGlobalAttributes = [
          "accessKey", "autoCapitalize", "autoCorrect", "autoSave",
          "contentEditable", "contextMenu", "dir", "draggable",
          "enterKeyHint", "hidden", "id", "inert", "inputMode",
          "is", "itemID", "itemProp", "itemRef", "itemScope",
          "itemType", "lang", "nonce", "part", "resource",
          "results", "role", "security", "slot", "spellCheck",
          "style", "suppressContentEditableWarning", "suppressHydrationWarning",
          "tabIndex", "translate", "typeof", "unselectable",
          "vocab", "exportparts", "part", "importparts"
        ];

        const isHtmlGlobalAttribute = htmlGlobalAttributes.includes(prop.name);

        // Only include props with meaningful descriptions that don't look like TS lib descriptions
        const hasCustomDescription = Boolean(prop.description
          && prop.description.trim().length > 0
          && !prop.description.includes("Returns a string representation")
          && !prop.description.includes("Returns the character at")
          && !prop.description.includes("Returns the Unicode value")
          && !prop.description.includes("@deprecated A legacy feature")
          && !prop.description.includes("Removes the trailing white space")
          && !prop.description.includes("Removes the leading white space")
          && !prop.description.includes("Returns a nonnegative integer Number")
          && !prop.description.includes("UTF-16 encoded code point")
          && !prop.description.includes("Returns true if searchString appears")
          && !prop.description.includes("HTML element"));

        return !isBuiltinMethod && !hasExcludedPrefix && !isHtmlGlobalAttribute && hasCustomDescription;
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

