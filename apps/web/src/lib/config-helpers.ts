import React from "react";

import type { ComponentConfig, ComponentExample } from "./component-configs";

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
    propExplorer: options.propExplorer,
    componentId: options.componentId || name,
    accessibility: options.accessibility,
    sections: options.sections,
  };
}

/**
 * Validation helper to ensure configuration is complete
 */
export function validateConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id) {
    errors.push("Missing id");
  }
  if (!config.name) {
    errors.push("Missing name");
  }
  if (!config.description) {
    errors.push("Missing description");
  }
  if (!config.category) {
    errors.push("Missing category");
  }
  if (!config.importStatement) {
    errors.push("Missing importStatement");
  }
  if (!config.examples || config.examples.length === 0) {
    errors.push("Missing examples");
  }

  return errors;
}
