import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * DocumentListMeta UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListMeta({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 text-muted-foreground text-xs",
        className,
      )}
      data-component="document-list-meta"
      data-slot="document-list-meta"
      {...props}
    />
  );
}
