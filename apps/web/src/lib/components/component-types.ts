/**
 * Component Configuration Types
 *
 * TypeScript type definitions for component documentation and configuration system.
 */

import type React from "react";

import type { PreviewConfig } from "../preview/preview-types";

// Base types for component documentation
export type ComponentExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  component?: React.ComponentType;
};

export type APIProperty = {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
};

export type APIComponent = {
  name: string;
  description: string;
  properties: APIProperty[];
};

export type AccessibilityNote = {
  key: string;
  description: string;
};

export type ComponentConfig = {
  // Basic metadata
  id: string;
  name: string;
  description: string;
  category: "ui" | "inputs" | "forms" | "charts";
  badge?: string;

  // Installation info
  installation?: {
    npm?: string;
    dependencies?: string[];
  };

  // Import statement
  importStatement: string;

  // Examples with live previews
  examples: ComponentExample[];

  // API Reference
  api?: APIComponent[];

  // Preview Configuration (optional)
  preview?: PreviewConfig;

  // Component identifier for preview system (optional)
  componentId?: string;

  // Component definitions (for multi-component families)
  components?: Array<{
    name: string;
    component?: React.ComponentType;
  }>;

  // Accessibility information
  accessibility?: {
    pattern?: {
      name: string;
      url: string;
    };
    keyboardShortcuts?: AccessibilityNote[];
    notes?: string[];
  };

  // Additional sections
  sections?: {
    title: string;
    content: string;
  }[];
};

// Type for the configuration registry
export type ComponentConfigRegistry = Record<string, ComponentConfig>;

// Utility type for components that export their config
export type ComponentWithConfig = {
  componentConfig: ComponentConfig;
};

// Helper to check if a module exports a config
export function hasComponentConfig(
  module: unknown,
): module is ComponentWithConfig {
  return (
    module !== null && typeof module === "object" && "componentConfig" in module
  );
}
