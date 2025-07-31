/**
 * Converts React elements to clean JSX string representation
 * Handles components, props, children, and special cases like icons
 */

import React from "react";

interface FormatOptions {
  indent?: number;
  indentChar?: string;
}

/**
 * Convert a React element to a JSX string
 */
export function jsxToString(
  element: React.ReactElement,
  options: FormatOptions = {}
): string {
  const { indent = 0, indentChar = "  " } = options;
  const indentStr = indentChar.repeat(indent);

  if (!element || typeof element !== "object") {
    return String(element);
  }

  const { type, props = {} } = element;

  // Get component name
  const componentName = getComponentName(type);

  // Format props
  const propsString = formatProps(props as Record<string, any>);

  // Handle children
  const { children } = props as Record<string, any>;

  if (!children || (Array.isArray(children) && children.length === 0)) {
    // Self-closing tag
    return `${indentStr}<${componentName}${propsString} />`;
  }

  // Format children
  const childrenString = formatChildren(children, { indent: indent + 1, indentChar });

  // Handle single-line vs multi-line
  const isMultiLine = childrenString.includes("\n") || propsString.length > 40;

  if (isMultiLine) {
    return `${indentStr}<${componentName}${propsString}>\n${childrenString}\n${indentStr}</${componentName}>`;
  } else {
    return `${indentStr}<${componentName}${propsString}>${childrenString.trim()}</${componentName}>`;
  }
}

/**
 * Get component name from type
 */
function getComponentName(type: any): string {
  if (typeof type === "string") {
    return type;
  }

  if (type.displayName) {
    return type.displayName;
  }

  if (type.name) {
    return type.name;
  }

  // Try to extract name from function
  const functionString = type.toString();
  const match = functionString.match(/function\s+([A-Z]\w+)/);
  if (match) {
    return match[1];
  }

  return "Component";
}

/**
 * Format props to string
 */
function formatProps(props: Record<string, any>): string {
  if (!props) return "";

  const propsArray: string[] = [];

  Object.entries(props).forEach(([key, value]) => {
    // Skip children and key
    if (key === "children" || key === "key") return;

    // Skip undefined values
    if (value === undefined) return;

    // Handle different value types
    if (value === true) {
      propsArray.push(key);
    } else if (value === false) {
      // Skip false boolean props
      return;
    } else if (value === null) {
      propsArray.push(`${key}={null}`);
    } else if (typeof value === "string") {
      // Use quotes for strings
      propsArray.push(`${key}="${escapeString(value)}"`);
    } else if (typeof value === "number") {
      propsArray.push(`${key}={${value}}`);
    } else if (typeof value === "function") {
      // Handle function props (like icons)
      const funcName = getFunctionName(value);
      propsArray.push(`${key}={${funcName}}`);
    } else if (React.isValidElement(value)) {
      // Handle React elements as props
      const elementStr = jsxToString(value, { indent: 0 });
      propsArray.push(`${key}={${elementStr}}`);
    } else if (Array.isArray(value)) {
      // Format arrays
      const arrayStr = formatArray(value);
      propsArray.push(`${key}={${arrayStr}}`);
    } else if (typeof value === "object") {
      // Format objects
      const objStr = formatObject(value);
      propsArray.push(`${key}={${objStr}}`);
    }
  });

  return propsArray.length > 0 ? " " + propsArray.join(" ") : "";
}

/**
 * Format children to string
 */
function formatChildren(children: any, options: FormatOptions): string {
  if (!children) return "";

  const { indent = 0, indentChar = "  " } = options;

  // Handle single child
  if (!Array.isArray(children)) {
    if (typeof children === "string" || typeof children === "number") {
      return indentChar.repeat(indent) + children;
    }
    if (React.isValidElement(children)) {
      return jsxToString(children, options);
    }
    return String(children);
  }

  // Handle multiple children
  return children
    .filter((child) => child !== null && child !== undefined)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return indentChar.repeat(indent) + child;
      }
      if (React.isValidElement(child)) {
        return jsxToString(child, options);
      }
      return String(child);
    })
    .join("\n");
}

/**
 * Get function name (for icon components etc)
 */
function getFunctionName(func: Function): string {
  // Check common icon naming patterns
  if (func.name) {
    // Icon components typically have names like "PlusIcon", "ArrowRightIcon"
    if (func.name.endsWith("Icon") || func.name.match(/^[A-Z]/)) {
      return func.name;
    }
  }

  // Try displayName
  if ((func as any).displayName) {
    return (func as any).displayName;
  }

  // Fallback to generic arrow function
  return "() => {}";
}

/**
 * Escape string for JSX
 */
function escapeString(str: string): string {
  return str.replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

/**
 * Format array for JSX
 */
function formatArray(arr: any[]): string {
  const items = arr.map((item) => {
    if (typeof item === "string") return `"${escapeString(item)}"`;
    if (typeof item === "number") return String(item);
    if (typeof item === "boolean") return String(item);
    if (item === null) return "null";
    if (item === undefined) return "undefined";
    if (React.isValidElement(item)) return jsxToString(item, { indent: 0 });
    return JSON.stringify(item);
  });

  return `[${items.join(", ")}]`;
}

/**
 * Format object for JSX
 */
function formatObject(obj: Record<string, any>): string {
  const props = Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const valueStr = typeof value === "string" 
        ? `"${escapeString(value)}"` 
        : JSON.stringify(value);
      return `${key}: ${valueStr}`;
    });

  return `{{ ${props.join(", ")} }}`;
}