import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * DocumentListContent UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      data-component="document-list-content"
      data-slot="document-list-content"
      {...props}
    />
  );
}
