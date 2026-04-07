"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * CheckboxCardTitle UI component.
 * Import from "@patternmode/ui/compositions/checkbox-card".
 */
export function CheckboxCardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-medium text-sm leading-tight", className)}
      data-component="checkbox-card-title"
      data-slot="checkbox-card-title"
      {...props}
    />
  );
}
