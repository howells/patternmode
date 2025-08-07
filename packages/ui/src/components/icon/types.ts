import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { iconVariants } from "./variants";

/**
 * Standard icon component type used across all components.
 * Compatible with Lucide icons and other icon libraries.
 */
export type IconComponent = React.ComponentType<{ className?: string; strokeWidth?: number }>;

// Icon-specific sizes allow larger display options than general control sizes
export type IconSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export type IconProps = {
  /**
   * The Lucide icon component to render.
   * Should be a React component that accepts className and strokeWidth props.
   */
  icon: IconComponent;
  /**
   * Visual size of the icon affecting its dimensions.
   * Uses the standard Size type (xs, sm, base, lg) for consistency across all components.
   */
  size?: IconSize;
  /**
   * Custom stroke width for the icon lines.
   * When not specified, uses the global configuration default.
   * Higher values create bolder lines, lower values create thinner lines.
   */
  strokeWidth?: number;
  /**
   * Additional CSS classes to apply to the icon.
   * Can be used for custom styling, colors, or spacing adjustments.
   */
  className?: string;
  /**
   * Fallback icon component to display if the main icon fails to render.
   * Provides graceful degradation when icons are missing or fail to load.
   */
  fallbackIcon?: IconComponent;
} & VariantProps<typeof iconVariants>;

export type { VariantProps as IconVariantProps } from "tailwind-variants";
