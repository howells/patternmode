/**
 * Size system for the PatternMode design system.
 *
 * Defines a shared T-shirt size scale (`ComponentSize`) used by most
 * components (Button, Icon, Badge, etc.) as well as domain-specific
 * scales for specialised components like `Swatch` and `Thumbnail`.
 *
 * Each domain scale provides a Tailwind class map, an icon-size map,
 * and pixel values for JS calculations (e.g., motion animations).
 *
 * @module
 */

/**
 * Shared component size scale used across UI components.
 * Keep this file icon-agnostic; icon-specific mapping lives in components/icon.tsx
 *
 * 2xs < xs < sm < base < lg < xl < 2xl < 3xl
 */
export const COMPONENT_SIZES = [
  "2xs",
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
] as const;

export type ComponentSize = (typeof COMPONENT_SIZES)[number];

/**
 * Swatch size system.
 * Used by SwatchVisual, SwatchGroup, SwatchSelector, ColorPicker.
 */
export type SwatchSize = "xs" | "sm" | "base" | "lg" | "xl";

/** Tailwind size classes for each swatch size */
export const swatchSizeMap: Record<SwatchSize, string> = {
  xs: "size-5", // 20px
  sm: "size-6", // 24px
  base: "size-7", // 28px (default)
  lg: "size-8", // 32px
  xl: "size-10", // 40px
};

/** Icon size for each swatch size (used by Swatch icon overlay and SwatchGroupItem) */
export const swatchIconSizeMap: Record<SwatchSize, ComponentSize> = {
  xs: "2xs",
  sm: "2xs",
  base: "xs",
  lg: "xs",
  xl: "sm",
};

/** Pixel values for JS calculations (e.g., motion animations) */
export const swatchSizePx: Record<SwatchSize, number> = {
  xs: 20,
  sm: 24,
  base: 28,
  lg: 32,
  xl: 40,
};

/**
 * Thumbnail size system.
 * Used by Thumbnail, RecentUploadsGallery, patternmodel stacks.
 */
export type ThumbnailSize =
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl";

/** Tailwind size classes for each thumbnail size */
export const thumbnailSizeMap: Record<ThumbnailSize, string> = {
  "3xs": "size-4", // 16px
  "2xs": "size-6", // 24px
  xs: "size-10", // 40px
  sm: "size-12", // 48px
  base: "size-16", // 64px
  lg: "size-20", // 80px
  xl: "size-24", // 96px
  "2xl": "size-28", // 112px
};

/** Pixel values for JS calculations (e.g., motion animations) */
export const thumbnailSizePx: Record<ThumbnailSize, number> = {
  "3xs": 16,
  "2xs": 24,
  xs: 40,
  sm: 48,
  base: 64,
  lg: 80,
  xl: 96,
  "2xl": 112,
};
