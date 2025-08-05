import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { GlobalSemanticVariant, TailwindColor } from "../../lib/variants";
import type { dotVariants } from "./variants";

// Dot-specific variant type (semantic + all Tailwind colors)
export type DotVariant = GlobalSemanticVariant | TailwindColor;

export type DotProps = {
  /**
   * The semantic variant to display.
   * Supports both semantic variants (success, warning, error, etc.) and all Tailwind color names.
   * @default "default"
   * @example
   * ```tsx
   * <Dot variant="success" />
   * <Dot variant="blue" />
   * ```
   */
  variant?: DotVariant;
  /**
   * Optional label to display next to the dot.
   * When provided, creates a labeled indicator with text.
   */
  label?: string;
  /**
   * Whether to show animation for active statuses.
   * Adds a pulsing animation effect to indicate activity.
   * @default false
   */
  animated?: boolean;
  /**
   * Size of the dot.
   * Controls both the dot size and text size when label is provided.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
} & React.HTMLAttributes<HTMLSpanElement> & Omit<VariantProps<typeof dotVariants>, "variant">;
