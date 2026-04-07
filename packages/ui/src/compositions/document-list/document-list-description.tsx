import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * DocumentListDescription UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-sm leading-normal", className)}
      data-component="document-list-description"
      data-slot="document-list-description"
      {...props}
    />
  );
}
