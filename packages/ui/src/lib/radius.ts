/**
 * Shared border radius options used across UI components.
 * - rounded: Default border radius (rounded-md)
 * - square: No border radius (sharp corners)
 * - full: Fully rounded (pill/circle shape)
 */
export const RADIUS_OPTIONS = ["rounded", "square", "full"] as const;

export type Radius = (typeof RADIUS_OPTIONS)[number];

/**
 * Default Tailwind class mappings for radius options.
 * Components may override with compound variants for size-specific behavior.
 */
export const RADIUS_CLASSES: Record<Radius, string> = {
  rounded: "rounded-lg",
  square: "rounded-none",
  full: "rounded-full",
};
