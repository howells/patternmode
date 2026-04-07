"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
import { useContext } from "react";
import { DESCRIPTION_SIZE_CLASS } from "./radio-card-constants";
import { RadioCardContext } from "./radio-card-context";

/**
 * RadioCardDescription UI component.
 * Import from "@patternmode/ui/compositions/radio-card".
 */
export function RadioCardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size = "base" } = useContext(RadioCardContext);
  return (
    <div
      className={cn(
        "text-muted-foreground leading-relaxed",
        DESCRIPTION_SIZE_CLASS[size],
        className,
      )}
      data-component="radio-card-description"
      data-slot="radio-card-description"
      {...props}
    />
  );
}
