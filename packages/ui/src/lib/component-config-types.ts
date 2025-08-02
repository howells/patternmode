import type { LucideIcon } from "lucide-react";

// Configuration Types for Patternmode Components
// These types ensure consistency across all component configurations

/**
 * Prop metadata interface for component documentation
 */
export type PropMetadata = {
  name: string;
  type: unknown;
  description?: string;
  defaultValue?: string | boolean | number;
  required?: boolean;
  options?: string[];
};

/**
 * Example metadata interface - each example must export this along with the component
 */
export type ExampleMetadata = {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
};

/**
 * Complete example definition with component and metadata
 * Used in the new self-contained examples system
 */
export type ComponentExample = {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  component: React.ComponentType;
};

/**
 * API property documentation
 */
export type APIProperty = {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
};

/**
 * API component documentation
 */
export type APIComponent = {
  name: string;
  description: string;
  properties: APIProperty[];
};

/**
 * Accessibility documentation
 */
export type AccessibilityNote = {
  key: string;
  description: string;
};

/**
 * Installation information
 */
export type InstallationConfig = {
  npm?: string;
  dependencies?: string[];
};

/**
 * Accessibility configuration
 */
export type AccessibilityConfig = {
  pattern?: {
    name: string;
    url: string;
  };
  keyboardShortcuts?: AccessibilityNote[];
  notes?: string[];
};

/**
 * Additional documentation section
 */
export type DocumentationSection = {
  title: string;
  content: string; // Pure string content, no JSX
};

/**
 * Component configuration - single source of truth for each component
 */
export type ComponentConfig = {
  // Basic metadata
  id: string;
  name: string;
  description: string;
  category: "text" | "layout" | "navigation" | "feedback" | "overlay" | "data" | "media" | "utility" | "inputs" | "forms" | "charts" | "ui" | "typography";
  icon?: React.ReactNode | LucideIcon;
  badge?: string;

  // Installation info
  installation?: InstallationConfig;

  // Import statement for documentation
  importStatement: string;

  // Component identifier for the example component
  componentId: string;

  // Examples using the self-contained component system
  examples?: ComponentExample[];

  // API Reference
  api?: APIComponent[];

  // Accessibility information
  accessibility?: AccessibilityConfig;

  // Additional sections
  sections?: DocumentationSection[];
};

/**
 * Type for the configuration registry
 */
export type ComponentConfigRegistry = Record<string, ComponentConfig>;

/**
 * Type guard to check if a config is valid
 */
export function isComponentConfig(config: unknown): config is ComponentConfig {
  return (
    config !== null
    && typeof config === "object"
    && "id" in config
    && "name" in config
    && "componentId" in config
    && "props" in config
  );
}

/**
 * Validation helper to ensure config completeness
 */
export function validateComponentConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id) {
    errors.push("Missing required field: id");
  }
  if (!config.name) {
    errors.push("Missing required field: name");
  }
  if (!config.description) {
    errors.push("Missing required field: description");
  }
  if (!config.componentId) {
    errors.push("Missing required field: componentId");
  }
  if (!config.importStatement) {
    errors.push("Missing required field: importStatement");
  }

  // Examples are now optional when using self-contained examples system

  return errors;
}
