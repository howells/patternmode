import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * DocumentListTitle UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-medium text-sm leading-snug", className)}
      data-component="document-list-title"
      data-slot="document-list-title"
      {...props}
    />
  );
}
