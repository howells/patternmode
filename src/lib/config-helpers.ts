import { ComponentConfig, ComponentExample } from "./component-config-types";

/**
 * Helper to create component examples with consistent structure
 */
export function createExample(
  id: string,
  title: string,
  description: string,
  code: string,
  preview: React.ReactNode,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
): ComponentExample {
  return {
    id,
    title,
    description,
    code,
    preview,
    wrapper,
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
  } = {}
) {
  return {
    name,
    type,
    description,
    default: options.default,
    required: options.required,
  };
}

/**
 * Helper to create keyboard shortcuts for accessibility
 */
export function createKeyboardShortcut(key: string, description: string) {
  return { key, description };
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
  > = {}
): ComponentConfig {
  return {
    id,
    name,
    description,
    category,
    badge: options.badge || category.toUpperCase(),
    importStatement:
      options.importStatement ||
      `import { ${name} } from "@/components/${category}/${id}";`,
    examples: options.examples || [],
    installation: options.installation,
    api: options.api,
    propExplorer: options.propExplorer,
    componentId: options.componentId,
    accessibility: options.accessibility,
    sections: options.sections,
  };
}

/**
 * Validation helper to ensure configuration is complete
 */
export function validateConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id) errors.push("Missing component ID");
  if (!config.name) errors.push("Missing component name");
  if (!config.description) errors.push("Missing component description");
  if (!config.category) errors.push("Missing component category");
  if (!config.importStatement) errors.push("Missing import statement");
  if (!config.examples || config.examples.length === 0) {
    errors.push("Missing examples - at least one example is required");
  }

  // Validate examples
  config.examples?.forEach((example, index) => {
    if (!example.id) errors.push(`Example ${index}: Missing ID`);
    if (!example.title) errors.push(`Example ${index}: Missing title`);
    if (!example.description)
      errors.push(`Example ${index}: Missing description`);
    if (!example.code) errors.push(`Example ${index}: Missing code`);
    if (!example.preview) errors.push(`Example ${index}: Missing preview`);
  });

  return errors;
}
