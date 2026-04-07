"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
/** radio card content area */

export function RadioCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 text-left", className)}
      data-component="radio-card-content"
      data-slot="radio-card-content"
      {...props}
    />
  );
}
