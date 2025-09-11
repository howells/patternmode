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

/**
 * Props passed to render prop children functions.
 */
export type StackRenderProps = {
  /**
   * The computed CSS classes applied to the stack container.
   */
  className: string;
  /**
   * The resolved direction (non-responsive base value).
   */
  direction: StackDirection;
  /**
   * The resolved gap value (non-responsive base value).
   */
  gap: number;
  /**
   * The resolved padding value (non-responsive base value).
   */
  padding: number | undefined;
};

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
   * Custom element to render instead of the default.
   * When provided, the Stack will clone this element with layout classes applied.
   */
  render?: React.JSX.Element;
  /**
   * Stack content.
   * The child elements to be arranged in the stack layout.
   * Can be React nodes or a render prop function that receives layout information.
   */
  children: React.ReactNode | ((props: StackRenderProps) => React.ReactNode);
} & React.HTMLAttributes<HTMLElement> &
  Omit<VariantProps<typeof stackVariants>, "gap" | "padding" | "direction">;
