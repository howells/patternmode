"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
import { useContext } from "react";
import { ICON_CONTAINER_SIZE_CLASS } from "./radio-card-constants";
import { RadioCardContext } from "./radio-card-context";

/**
 * RadioCardIcon UI component.
 * Import from "@patternmode/ui/compositions/radio-card".
 */
export function RadioCardIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size = "base" } = useContext(RadioCardContext);
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-colors group-data-[state=checked]:border-primary/20 group-data-[state=checked]:bg-primary/10 group-data-[state=checked]:text-primary",
        ICON_CONTAINER_SIZE_CLASS[size],
        className,
      )}
      data-component="radio-card-icon"
      data-slot="radio-card-icon"
      {...props}
    />
  );
}
