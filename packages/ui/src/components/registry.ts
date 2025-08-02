import type { ComponentConfig } from "../lib/component-config-types";

import { componentConfig as accordionConfig } from "./accordion/component.config";
import { componentConfig as fieldArrayConfig } from "./field-array/component.config";
import { componentConfig as textareaConfig } from "./textarea/component.config";

export const COMPONENT_REGISTRY = {
  accordion: accordionConfig,
  fieldArray: fieldArrayConfig,
  textarea: textareaConfig,
} as const satisfies Record<string, ComponentConfig>;

// Derive types automatically
export type ComponentId = keyof typeof COMPONENT_REGISTRY;

// Helper functions
export function getComponentConfig(id: string): ComponentConfig | undefined {
  return COMPONENT_REGISTRY[id as ComponentId];
}

export function getAllComponents(): ComponentConfig[] {
  return Object.values(COMPONENT_REGISTRY);
}

export function getComponentsByCategory(category: string): ComponentConfig[] {
  return Object.values(COMPONENT_REGISTRY).filter(
    config => config.category === category,
  );
}

export function getTotalComponentsCount(): number {
  return Object.keys(COMPONENT_REGISTRY).length;
}

// Component list organized by categories (derived automatically)
export const COMPONENT_LIST = Object.values(COMPONENT_REGISTRY).reduce((acc, config) => {
  const category = config.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(config.id);
  return acc;
}, {} as Record<string, string[]>);

// Category configuration for web app
export const CATEGORY_CONFIG = [
  { key: "data", name: "Data", description: "Components for displaying data" },
  { key: "ui", name: "Interface", description: "Core UI components" },
  { key: "charts", name: "Charts", description: "Data visualization components" },
  { key: "navigation", name: "Navigation", description: "Navigation components" },
  { key: "inputs", name: "Inputs", description: "Form input components" },
  { key: "utility", name: "Utility", description: "Utility components" },
  { key: "forms", name: "Forms", description: "Form components" },
  { key: "layout", name: "Layout", description: "Layout components" },
  { key: "typography", name: "Typography", description: "Text components" },
  { key: "feedback", name: "Feedback", description: "Feedback components" },
] as const;

export type CategoryKey = typeof CATEGORY_CONFIG[number]["key"];

// Legacy compatibility exports (for existing imports)
export const componentRegistry = COMPONENT_REGISTRY;
export type ComponentConfigRegistry = typeof COMPONENT_REGISTRY;
