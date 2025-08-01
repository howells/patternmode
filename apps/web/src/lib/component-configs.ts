import type React from "react";

import type { PropExplorerConfig } from "./prop-explorer";

// Base types for component documentation
export type ComponentExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
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

  // Prop Explorer Configuration (optional)
  propExplorer?: PropExplorerConfig;

  // Component identifier for prop explorer (optional)
  componentId?: string;

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
    content: string | React.ReactNode;
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
