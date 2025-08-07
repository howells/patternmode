/**
 * Component categories for organizing the UI library
 */
export const COMPONENT_CATEGORIES = [
  "display",
  "controls", 
  "layout",
  "overlay",
  "visual",
  "actions",
  "media",
  "typography",
  "navigation",
  "charts",
  "feedback",
  "forms",
  "data",
  "ui",
  "inputs",
  "utility",
] as const;

/**
 * Component category type derived from the categories array
 */
export type ComponentCategory = typeof COMPONENT_CATEGORIES[number];