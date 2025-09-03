import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import type {
  GapValue,
  ResponsiveSpacing,
  SpacingValue,
} from "@patternmode/utils/spacing";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { stackVariants } from "./variants";

/**
 * Stack direction options.
 */
export type StackDirection = "vertical" | "horizontal";

export type StackProps = {
  /**
   * The direction of the stack - can be responsive.
   * Controls whether children are arranged vertically or horizontally.
   */
  direction?: ResponsiveValue<StackDirection>;
  /**
   * Gap between items (4px grid scale) - can be responsive.
   * Supports values from 0-24 using the 4px grid system, plus negative values for overlapping.
   */
  gap?: ResponsiveSpacing<GapValue>;
  /**
   * Padding around the stack (4px grid scale) - can be responsive.
   * Adds internal spacing around all stack content using the 4px grid system.
   */
  padding?: ResponsiveSpacing<SpacingValue>;
  /**
   * How to align items along the cross axis.
   * Controls alignment perpendicular to the stack direction.
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /**
   * How to distribute items along the main axis.
   * Controls spacing and distribution along the stack direction.
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Whether items should wrap to new lines.
   * Allows content to flow to multiple rows/columns when space is limited.
   */
  wrap?: boolean;
  /**
   * The HTML element to render.
   * Allows semantic flexibility while maintaining stack layout behavior.
   */
  as?: React.ElementType;
  /**
   * Stack content.
   * The child elements to be arranged in the stack layout.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement> &
  Omit<VariantProps<typeof stackVariants>, "gap" | "padding" | "direction">;
