import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { tooltipVariants } from "./variants";

export type TooltipProps = {
  /**
   * The element that triggers the tooltip when hovered or focused.
   */
  children: React.ReactElement;
  /**
   * Content to display in the tooltip popup. Can be text or rich JSX content.
   */
  content: React.ReactNode;
  /**
   * Preferred side for tooltip placement relative to the trigger.
   * @default "top"
   */
  side?: "top" | "bottom" | "left" | "right";
  /**
   * Distance from the trigger element in pixels.
   * @default 10
   */
  sideOffset?: number;
  /**
   * Alignment relative to the trigger element.
   * @default "center"
   */
  align?: "start" | "center" | "end";
  /**
   * Offset for alignment positioning in pixels.
   * @default 0
   */
  alignOffset?: number;
  /**
   * Whether to show the pointing arrow that connects tooltip to trigger.
   * @default true
   */
  showArrow?: boolean;
  /**
   * Delay before showing tooltip in milliseconds.
   * @default 150
   */
  delayDuration?: number;
  /**
   * Visual variant affecting the tooltip's appearance.
   * @default "default"
   */
  variant?: VariantProps<typeof tooltipVariants>["variant"];
  /**
   * Size variant affecting padding and text size.
   * @default "default"
   */
  size?: VariantProps<typeof tooltipVariants>["size"];
  /**
   * Override the default close delay duration in milliseconds.
   * Time before tooltip hides after cursor leaves.
   * @default 250
   */
  skipDelayDuration?: number;
  /**
   * Custom class name for additional styling.
   */
  className?: string;
};
