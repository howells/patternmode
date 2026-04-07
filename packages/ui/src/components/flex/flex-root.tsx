import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import type { FlexAlign } from "../../lib/alignment";
import type { FlexDirection } from "../../lib/direction";
import type { FlexJustify } from "../../lib/justify";
import {
  pushResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import {
  ALIGN_CLASS,
  DIRECTION_CLASS,
  GAP_CLASS,
  type GapSize,
  JUSTIFY_CLASS,
  WRAP_CLASS,
} from "../../lib/responsive-classes";
import type { FlexWrap } from "../../lib/wrap";

export interface FlexProps extends React.ComponentProps<"div"> {
  /** Align items (cross axis). Can be responsive. */
  align?: ResponsiveValue<FlexAlign>;
  /** Flex direction. Can be responsive. */
  direction?: ResponsiveValue<FlexDirection>;
  /** Expand to fill available space (flex: 1 1 0%). */
  grow?: boolean;
  /** Gap between items. Can be responsive. */
  gap?: ResponsiveValue<GapSize>;
  /** Show outline guidelines for development. */
  guidelines?: boolean;
  /** Set height to 100vh (full viewport). */
  fullHeight?: boolean;
  /** Use inline-flex instead of flex. */
  inline?: boolean;
  /** Justify content (main axis). Can be responsive. */
  justify?: ResponsiveValue<FlexJustify>;
  /** Prevent flex item from shrinking (flex-shrink: 0). */
  noShrink?: boolean;
  /** Enable vertical scrolling on this container. */
  overflow?: "auto" | "hidden" | "scroll";
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Prevent text/child overflow by setting min-width: 0. */
  truncate?: boolean;
  /** Flex wrap. Can be responsive. */
  wrap?: ResponsiveValue<FlexWrap>;
}

/**
 * Flexible box layout component with responsive support for direction, alignment, and spacing.
 *
 * @example
 * ```tsx
 * // Basic row layout
 * <Flex direction="column" gap="base">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * // App shell with full-height sidebar + scrollable content
 * <Flex fullHeight>
 *   <Flex direction="column" noShrink className="w-56">Sidebar</Flex>
 *   <Flex direction="column" grow overflow="auto">Content</Flex>
 * </Flex>
 *
 * // Responsive layout
 * <Flex direction={{ base: "column", md: "row" }} gap={{ base: "sm", lg: "lg" }} />
 * ```
 */
export const Flex = function Flex({
  className,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap,
  grow = false,
  fullHeight = false,
  inline = false,
  noShrink = false,
  overflow,
  responsiveMode = "screen",
  truncate = false,
  guidelines = false,
  style,
  ref,
  ...props
}: FlexProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const classes: string[] = [inline ? "inline-flex" : "flex"];

  pushResponsiveClasses(classes, direction, DIRECTION_CLASS, responsiveMode);
  pushResponsiveClasses(classes, justify, JUSTIFY_CLASS, responsiveMode);
  pushResponsiveClasses(classes, align, ALIGN_CLASS, responsiveMode);
  pushResponsiveClasses(classes, wrap, WRAP_CLASS, responsiveMode);
  pushResponsiveClasses(classes, gap, GAP_CLASS, responsiveMode);

  if (grow) classes.push("flex-1", "min-w-0");
  if (fullHeight) classes.push("h-screen");
  if (noShrink) classes.push("shrink-0");
  if (truncate) classes.push("min-w-0");
  if (overflow === "auto") classes.push("overflow-auto");
  if (overflow === "hidden") classes.push("overflow-hidden");
  if (overflow === "scroll") classes.push("overflow-scroll");

  if (guidelines) {
    classes.push(
      "outline",
      "outline-1",
      "outline-dashed",
      "outline-muted-foreground/30",
    );
  }

  return (
    <div
      className={cn(classes.join(" "), className)}
      data-component="flex"
      data-slot="flex"
      ref={ref}
      style={style}
      {...props}
    />
  );
};
