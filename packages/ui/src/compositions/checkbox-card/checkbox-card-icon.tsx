"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * CheckboxCardIcon UI component.
 * Renders a simple icon container without any box styling.
 * Icons should be 20px (size-5) for standard use.
 * Import from "@patternmode/ui/compositions/checkbox-card".
 */
export function CheckboxCardIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-5",
        className,
      )}
      data-component="checkbox-card-icon"
      data-slot="checkbox-card-icon"
      {...props}
    />
  );
}
