/**
 * Icon-only button size options.
 * Controls both width and height for square icon buttons.
 */
export type IconButtonSize = "icon-xs" | "icon-sm" | "icon" | "icon-lg";

/**
 * Button variant options.
 * All available visual styles for buttons.
 */
export const buttonVariants = [
  "primary",
  "secondary",
  "outline",
  "outline-dashed",
  "ghost",
  "destructive",
  "inverse-ghost",
  "link",
  "minimal"
] as const;
