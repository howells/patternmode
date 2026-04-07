import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import {
  pushResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import { HEIGHT_CLASS, WIDTH_CLASS } from "../../lib/responsive-classes";
import type { ComponentSize } from "../../lib/size";

export interface SpaceProps extends React.ComponentProps<"div"> {
  /** Height - ComponentSize token. Can be responsive. */
  h?: ResponsiveValue<ComponentSize>;
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Width - ComponentSize token. Can be responsive. */
  w?: ResponsiveValue<ComponentSize>;
}

/**
 * Spacer component for adding fixed width or height gaps in layouts.
 *
 * @param props - The space props
 * @param props.w - Width. ComponentSize token. Can be responsive.
 * @param props.h - Height. ComponentSize token. Can be responsive.
 * @param props.responsiveMode - "screen" (viewport, default) or "container" (container queries).
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <Space h="lg" />
 * <Space w="base" h="sm" />
 * <Space h={{ base: "sm", md: "lg" }} responsiveMode="container" />
 * ```
 */
export function Space({
  w,
  h,
  className,
  responsiveMode = "screen",
  ...props
}: SpaceProps) {
  const classes: string[] = [];

  if (w !== undefined) {
    pushResponsiveClasses(classes, w, WIDTH_CLASS, responsiveMode);
  }

  if (h !== undefined) {
    pushResponsiveClasses(classes, h, HEIGHT_CLASS, responsiveMode);
  }

  return (
    <div
      className={cn(classes.join(" "), className)}
      data-component="space"
      data-slot="space"
      {...props}
    />
  );
}
