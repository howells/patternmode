import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import type { FlexAlign } from "../../lib/alignment";
import type { FlexJustify } from "../../lib/justify";
import {
  pushResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import {
  ALIGN_CLASS,
  GAP_CLASS,
  type GapSize,
  JUSTIFY_CLASS,
} from "../../lib/responsive-classes";

/** Wrap class map for boolean wrap prop */
const WRAP_BOOL_CLASS: Record<"true" | "false", string> = {
  true: "flex-wrap",
  false: "flex-nowrap",
};

export interface GroupProps extends React.ComponentProps<"div"> {
  /** Align items (vertical alignment). Can be responsive. */
  align?: ResponsiveValue<FlexAlign>;
  /** Gap between items. Can be responsive. */
  gap?: ResponsiveValue<GapSize>;
  /** Justify content (horizontal alignment). Can be responsive. */
  position?: ResponsiveValue<FlexJustify>;
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Allow items to wrap. Can be responsive. */
  wrap?: ResponsiveValue<boolean>;
}

/**
 * Horizontal flex container for grouping related elements with consistent spacing.
 *
 * @param props - The group props
 * @param props.position - Justify content (horizontal alignment). Can be responsive.
 * @param props.align - Align items (vertical alignment). Can be responsive.
 * @param props.gap - Gap between items. Can be responsive. Defaults to "base" (16px).
 * @param props.wrap - Allow items to wrap to next line. Can be responsive. Defaults to false.
 * @param props.responsiveMode - "screen" (viewport, default) or "container" (container queries).
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Grouped elements.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <Group gap="sm">
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </Group>
 * <Group gap={{ base: "sm", md: "lg" }} responsiveMode="container" />
 * ```
 */
export function Group({
  className,
  position = "flex-start",
  align = "center",
  gap = "base",
  wrap = false,
  responsiveMode = "screen",
  ...props
}: GroupProps) {
  const classes: string[] = ["flex"];

  pushResponsiveClasses(classes, position, JUSTIFY_CLASS, responsiveMode);
  pushResponsiveClasses(classes, align, ALIGN_CLASS, responsiveMode);
  pushResponsiveClasses(classes, gap, GAP_CLASS, responsiveMode);

  // Handle wrap - convert boolean to string key for class map
  const getWrapValue = (): ResponsiveValue<"true" | "false"> => {
    if (typeof wrap === "boolean") {
      return String(wrap) as "true" | "false";
    }
    if (typeof wrap === "object") {
      return Object.fromEntries(
        Object.entries(wrap).map(([k, v]) => [k, String(v)]),
      ) as ResponsiveValue<"true" | "false">;
    }
    return wrap;
  };
  const wrapValue = getWrapValue();
  pushResponsiveClasses(classes, wrapValue, WRAP_BOOL_CLASS, responsiveMode);

  return (
    <div
      className={cn(classes.join(" "), className)}
      data-component="group"
      data-slot="group"
      {...props}
    />
  );
}
