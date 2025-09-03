import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { tooltipVariants } from "./variants";

export type TooltipProps = {
  /** The content for the trigger (label/icon). */
  children?: React.ReactNode;
  /** Content to display in the tooltip popup. */
  content: React.ReactNode;
  /** Preferred side for tooltip placement. */
  side?: "top" | "bottom" | "left" | "right";
  /** Distance from the trigger element in pixels. */
  sideOffset?: number;
  /** Alignment relative to the trigger. */
  align?: "start" | "center" | "end";
  /** Offset for alignment positioning in pixels. */
  alignOffset?: number;
  /** Whether to show the pointing arrow. */
  showArrow?: boolean;
  /** Delay before showing tooltip in milliseconds. */
  delayDuration?: number;
  /** Visual variant affecting the tooltip's appearance. */
  variant?: VariantProps<typeof tooltipVariants>["variant"];
  /** Size variant affecting padding and text size. */
  size?: VariantProps<typeof tooltipVariants>["size"];
  /** Time before tooltip hides after cursor leaves. */
  skipDelayDuration?: number;
  /** Custom class name for additional styling. */
  className?: string;
  /** Whether the tooltip is open by default. */
  defaultOpen?: boolean;
  /** Controlled open state of the tooltip. */
  open?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Click handler for the trigger element. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Custom trigger element to render. Defaults to a Button. */
  render?: React.ReactElement<Record<string, unknown>>;
};
