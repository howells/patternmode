import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { iconVariants } from "./variants";

export type IconProps = {
  /**
   * The Lucide icon component to render.
   * Should be a React component that accepts className and strokeWidth props.
   */
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Visual size of the icon affecting its dimensions.
   * Xs (12px) for very small contexts, sm (14px) for small buttons,
   * base (16px) default size, lg (20px) for larger contexts,
   * xl (24px) for headers, 2xl (32px) for display, 3xl (48px) for hero sections.
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
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
  fallbackIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
} & VariantProps<typeof iconVariants>;

export type { VariantProps as IconVariantProps } from "tailwind-variants";
