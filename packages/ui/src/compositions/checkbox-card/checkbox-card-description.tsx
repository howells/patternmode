"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * CheckboxCardDescription UI component.
 * Import from "@patternmode/ui/compositions/checkbox-card".
 */
export function CheckboxCardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground text-xs leading-relaxed", className)}
      data-component="checkbox-card-description"
      data-slot="checkbox-card-description"
      {...props}
    />
  );
}
