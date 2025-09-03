import type { ComponentCategory } from "@patternmode/constants/component-categories";
import type { IconComponent } from "@patternmode/icons";
import type React from "react";

/**
 * Complete example definition with component and metadata
 * Used in the self-contained examples system
 */
export type ComponentExample = {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  component: React.ElementType;
};

/**
 * Individual component within a component family
 */
export type ComponentDefinition = {
  /** The actual React component */
  component: React.ElementType;
  /** Display name for the component */
  name: string;
  /** Whether this is the primary component in the family */
  primary?: boolean;
  /** Custom description for this specific component */
  description?: string;
};

/**
 * Component configuration - single source of truth for each component
 */
export type ComponentConfig = {
  // Basic metadata
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  icon?: IconComponent;
  badge?: string;

  /**
   * Whether this is a featured component - core to any UI library.
   * Featured components are fundamental building blocks that users expect
   * from a complete UI system (Button, Input, Card, etc.).
   */
  featured?: boolean;

  // Import statement for documentation
  importStatement: string;

  // Primary component for automatic prop extraction (optional)
  component?: React.ElementType;

  // Component definitions (for single or multi-component families)
  components?: ComponentDefinition[];

  // Examples using the self-contained component system
  examples?: ComponentExample[];
};
