import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import {
  pushResponsiveClasses,
  type ResponsiveMode,
  type ResponsiveValue,
} from "../../lib/responsive";
import {
  MAX_WIDTH_CLASS,
  PADDING_X_CLASS,
  PADDING_Y_CLASS,
} from "../../lib/responsive-classes";
import type { ComponentSize } from "../../lib/size";

export interface ContainerProps extends React.ComponentProps<"div"> {
  /** When true, container is full width (ignores size). */
  fluid?: boolean;
  /** Horizontal padding. Can be responsive. */
  px?: ResponsiveValue<ComponentSize>;
  /** Vertical padding. Can be responsive. */
  py?: ResponsiveValue<ComponentSize>;
  /** Responsive mode: "screen" (viewport) or "container" (container queries). */
  responsiveMode?: ResponsiveMode;
  /** Max width. Can be responsive. */
  size?: ResponsiveValue<ComponentSize>;
}

/**
 * Container UI component.
 * Import from "@patternmode/ui/components/container".
 */
export function Container({
  className,
  children,
  size = "xl",
  fluid = false,
  px,
  py,
  responsiveMode = "screen",
  ...props
}: ContainerProps) {
  const classes: string[] = ["mx-auto"];

  if (fluid) {
    classes.push("w-full");
  } else {
    pushResponsiveClasses(classes, size, MAX_WIDTH_CLASS, responsiveMode);
  }

  if (px !== undefined) {
    pushResponsiveClasses(classes, px, PADDING_X_CLASS, responsiveMode);
  }

  if (py !== undefined) {
    pushResponsiveClasses(classes, py, PADDING_Y_CLASS, responsiveMode);
  }

  return (
    <div
      className={cn(classes.join(" "), className)}
      data-component="container"
      data-slot="container"
      {...props}
    >
      {children}
    </div>
  );
}
