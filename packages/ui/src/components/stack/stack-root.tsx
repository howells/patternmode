import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
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
} from "../../lib/responsive-classes";

export interface StackProps extends React.ComponentProps<"div"> {
  /** Align items on the cross axis. Can be responsive. */
  align?: ResponsiveValue<FlexAlign>;
  /** Merge props onto child. */
  asChild?: boolean;
  /** Stack direction. Can be responsive. */
  direction?: ResponsiveValue<FlexDirection>;
  /** Expand to fill available space (flex: 1 1 0%). */
  grow?: boolean;
  /** Gap between items. Can be responsive. */
  gap?: ResponsiveValue<GapSize>;
  /** Set height to 100vh (full viewport). */
  fullHeight?: boolean;
  /** Show outline guidelines for development. */
  guidelines?: boolean;
  /** Justify items on the main axis. Can be responsive. */
  justify?: ResponsiveValue<FlexJustify>;
  /** Prevent flex item from shrinking (flex-shrink: 0). */
  noShrink?: boolean;
  /** Enable scrolling on this container. */
  overflow?: "auto" | "hidden" | "scroll";
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Prevent text/child overflow by setting min-width: 0. */
  truncate?: boolean;
}

/**
 * Vertical stack layout (column direction by default). Inherits all Flex capabilities.
 *
 * @example
 * ```tsx
 * // Sidebar with fixed header and scrollable content
 * <VStack noShrink className="w-56 border-r">
 *   <div>Header</div>
 *   <VStack grow overflow="auto"><nav>Links...</nav></VStack>
 *   <div>Footer</div>
 * </VStack>
 *
 * // Horizontal row of items
 * <HStack gap="sm" align="center">
 *   <Avatar /><Text>Username</Text>
 * </HStack>
 * ```
 */
export function Stack({
  className,
  gap = "base",
  align = "stretch",
  justify = "flex-start",
  direction = "column",
  grow = false,
  fullHeight = false,
  noShrink = false,
  overflow,
  truncate = false,
  style,
  asChild = false,
  responsiveMode = "screen",
  guidelines = false,
  ...props
}: StackProps) {
  const Comp = asChild ? Slot : "div";
  const classes: string[] = ["flex"];

  pushResponsiveClasses(classes, direction, DIRECTION_CLASS, responsiveMode);
  pushResponsiveClasses(classes, align, ALIGN_CLASS, responsiveMode);
  pushResponsiveClasses(classes, justify, JUSTIFY_CLASS, responsiveMode);
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
    <Comp
      className={cn(classes.join(" "), className)}
      data-component="stack"
      data-slot="stack"
      style={style}
      {...props}
    />
  );
}

/** Horizontal stack (row direction). */
export function HStack(props: Omit<StackProps, "direction">) {
  return <Stack direction="row" {...props} />;
}

/** Vertical stack (column direction). */
export function VStack(props: Omit<StackProps, "direction">) {
  return <Stack direction="column" {...props} />;
}
