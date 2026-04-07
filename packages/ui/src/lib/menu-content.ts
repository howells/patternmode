/**
 * Shared constants for menu-like container + item radius pairing.
 *
 * Follows the concentric radii rule: inner_radius = outer_radius - padding.
 * This ensures item highlights sit flush inside the container's rounded corners.
 */

/**
 * Container classes for menu-like popover surfaces.
 */
export const MENU_CONTAINER_CLASSES = {
  /** rounded-3xl (24px) with p-1.5 (6px) padding — pill-shaped items */
  default: "rounded-3xl p-1.5",
  /** rounded-2xl (16px) with p-1 (4px) padding — compact variant */
  compact: "rounded-2xl p-1",
  /** Alias for default (backwards compat) */
  full: "rounded-3xl p-1.5",
} as const;

/**
 * Concentric item radius classes for menu containers.
 * Each value is the inner radius that sits flush inside the corresponding container.
 */
export const MENU_ITEM_RADIUS = {
  /** 24px - 6px ≈ 18px → rounded-2xl */
  default: "rounded-2xl",
  /** 16px - 4px = 12px → rounded-xl */
  compact: "rounded-xl",
  /** Alias for default (backwards compat) */
  full: "rounded-2xl",
  /** No rounding */
  square: "rounded-none",
} as const;
