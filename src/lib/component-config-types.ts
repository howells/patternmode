// Configuration Types for Patternmode Components
// These types ensure consistency across all component configurations

import { PropMetadata } from "./prop-explorer";

/**
 * Component example configuration - code examples only
 */
export interface ComponentExample {
  id: string;
  title: string;
  description: string;
  code: string;
  // Optional render function for live preview
  render?: () => React.ReactElement;
}

/**
 * API property documentation
 */
export interface APIProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

/**
 * API component documentation
 */
export interface APIComponent {
  name: string;
  description: string;
  properties: APIProperty[];
}

/**
 * Accessibility documentation
 */
export interface AccessibilityNote {
  key: string;
  description: string;
}

/**
 * Installation information
 */
export interface InstallationConfig {
  npm?: string;
  dependencies?: string[];
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  pattern?: {
    name: string;
    url: string;
  };
  keyboardShortcuts?: AccessibilityNote[];
  notes?: string[];
}

/**
 * Additional documentation section
 */
export interface DocumentationSection {
  title: string;
  content: string; // Pure string content, no JSX
}

/**
 * Component configuration - single source of truth for each component
 */
export interface ComponentConfig {
  // Basic metadata
  id: string;
  name: string;
  description: string;
  category: "text" | "layout" | "navigation" | "feedback" | "overlay" | "data" | "media" | "utility" | "inputs" | "forms" | "charts" | "ui";
  icon?: string;
  badge?: string;

  // Installation info
  installation?: InstallationConfig;

  // Import statement for documentation
  importStatement: string;

  // Component identifier for the example component
  componentId: string;

  // Props that users can experiment with
  props: PropMetadata[];

  // Code examples
  examples: ComponentExample[];

  // API Reference
  api?: APIComponent[];

  // Accessibility information
  accessibility?: AccessibilityConfig;

  // Additional sections
  sections?: DocumentationSection[];
}

/**
 * Type for the configuration registry
 */
export type ComponentConfigRegistry = Record<string, ComponentConfig>;

/**
 * Type guard to check if a config is valid
 */
export function isComponentConfig(config: unknown): config is ComponentConfig {
  return (
    config !== null &&
    typeof config === "object" &&
    "id" in config &&
    "name" in config &&
    "componentId" in config &&
    "props" in config
  );
}

/**
 * Validation helper to ensure config completeness
 */
export function validateComponentConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id) errors.push("Missing required field: id");
  if (!config.name) errors.push("Missing required field: name");
  if (!config.description) errors.push("Missing required field: description");
  if (!config.componentId) errors.push("Missing required field: componentId");
  if (!config.importStatement)
    errors.push("Missing required field: importStatement");
  if (!config.props) errors.push("Missing required field: props");
  if (!config.examples || config.examples.length === 0) {
    errors.push("Missing required field: examples (at least one required)");
  }

  return errors;
}
