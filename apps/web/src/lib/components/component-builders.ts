/**
 * Component Configuration Builders
 *
 * Helper functions for creating component configurations with consistent structure.
 */

import React from "react";

import type { ComponentConfig, ComponentExample } from "./component-types";

/**
 * Helper to create component examples with consistent structure
 */
export function createExample(
  id: string,
  title: string,
  description: string,
  component: React.ComponentType,
): ComponentExample {
  return {
    id,
    title,
    description,
    code: "", // Empty code for now
    preview: React.createElement(component),
  };
}

/**
 * Helper to create API properties with consistent structure
 */
export function createAPIProperty(
  name: string,
  type: string,
  description: string,
  options: {
    default?: string;
    required?: boolean;
  } = {},
) {
  return {
    name,
    type,
    description,
    default: options.default,
    required: options.required || false,
  };
}

/**
 * Helper to create keyboard shortcuts
 */
export function createKeyboardShortcut(key: string, description: string) {
  return {
    key,
    description,
  };
}

/**
 * Template for basic component configuration
 */
export function createComponentConfig(
  id: string,
  name: string,
  description: string,
  category: "ui" | "inputs" | "forms" | "charts",
  options: Partial<
    Omit<ComponentConfig, "id" | "name" | "description" | "category">
  > = {},
): ComponentConfig {
  return {
    id,
    name,
    description,
    category,
    badge: options.badge,
    importStatement:
      options.importStatement
      || `import { ${name} } from "@/components/${category}/${id}";`,
    examples: options.examples || [],
    installation: options.installation,
    api: options.api,
    preview: options.preview,
    componentId: options.componentId || name,
    accessibility: options.accessibility,
    sections: options.sections,
  };
}
