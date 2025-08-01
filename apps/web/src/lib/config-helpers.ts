import type { ComponentConfig, ComponentExample } from "@patternmode/ui";

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
    component,
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
  > = {},
): ComponentConfig {
  return {
    id,
    name,
    description,
    category,
    badge: options.badge,
    icon: options.icon,
    importStatement:
      options.importStatement
      || `import { ${name} } from "@/components/${category}/${id}";`,
    componentId: options.componentId || name,
    props: options.props || [],
    examples: options.examples || [],
    installation: options.installation,
  };
}

/**
 * Validation helper to ensure configuration is complete
 */
export function validateConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id) { errors.push("Missing component ID"); }
  if (!config.name) { errors.push("Missing component name"); }
  if (!config.description) { errors.push("Missing component description"); }
  if (!config.category) { errors.push("Missing component category"); }
  if (!config.importStatement) { errors.push("Missing import statement"); }
  if (!config.examples || config.examples.length === 0) {
    errors.push("Missing examples - at least one example is required");
  }

  // Validate examples
  config.examples?.forEach((example, index) => {
    if (!example.id) { errors.push(`Example ${index}: Missing ID`); }
    if (!example.title) { errors.push(`Example ${index}: Missing title`); }
    if (!example.description) { errors.push(`Example ${index}: Missing description`); }
    if (!example.component) { errors.push(`Example ${index}: Missing component`); }
  });

  return errors;
}
