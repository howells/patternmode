import type { LucideIcon } from "lucide-react";
import type React from "react";

// Configuration Types for Patternmode Components
// These types ensure consistency across all component configurations

/**
 * Prop metadata interface for component documentation
 */
export type PropMetadata = {
  name: string;
  type: unknown;
  description?: string;
  defaultValue?: unknown;
  required?: boolean;
  options?: unknown;
  min?: number;
  max?: number;
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
 * Individual component within a component family
 */
export type ComponentDefinition = {
  /** The actual React component */
  component: React.ComponentType<any>;
  /** Display name for the component */
  name: string;
  /** Whether this is the primary component in the family */
  primary?: boolean;
  /** Custom description for this specific component */
  description?: string;
  /** Props specific to this component (optional) */
  props?: PropMetadata[];
};

/**
 * Component configuration - single source of truth for each component
 */
export type ComponentConfig = {
  // Basic metadata
  id: string;
  name: string;
  description: string;
  category: "display" | "controls" | "layout" | "overlay" | "visual" | "actions" | "media" | "typography" | "navigation" | "charts" | "feedback" | "forms" | "data" | "ui" | "inputs" | "utility";
  icon?: React.ReactNode | LucideIcon;
  badge?: string;

  /**
   * Whether this is a featured component - core to any UI library.
   * Featured components are fundamental building blocks that users expect
   * from a complete UI system (Button, Input, Card, etc.).
   */
  featured?: boolean;

  // Installation info
  installation?: InstallationConfig;

  // Import statement for documentation
  importStatement: string;

  // Primary component for automatic prop extraction (optional)
  component?: React.ComponentType<any>;

  // Component definitions (for single or multi-component families)
  components?: ComponentDefinition[];

  // Props that users can experiment with (for single components)
  props?: PropMetadata[];

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
  if (!config.importStatement) {
    errors.push("Missing required field: importStatement");
  }

  // Examples are now optional when using self-contained examples system

  return errors;
}
