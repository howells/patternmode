"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
/** checkbox card content area */

export function CheckboxCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 text-left", className)}
      data-component="checkbox-card-content"
      data-slot="checkbox-card-content"
      {...props}
    />
  );
}
