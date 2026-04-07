"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
import { useContext } from "react";
import { TITLE_SIZE_CLASS } from "./radio-card-constants";
import { RadioCardContext } from "./radio-card-context";

/**
 * RadioCardTitle UI component.
 * Import from "@patternmode/ui/compositions/radio-card".
 */
export function RadioCardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size = "base" } = useContext(RadioCardContext);
  return (
    <div
      className={cn(
        "font-medium leading-tight",
        TITLE_SIZE_CLASS[size],
        className,
      )}
      data-component="radio-card-title"
      data-slot="radio-card-title"
      {...props}
    />
  );
}
