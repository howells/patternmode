import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

/**
 * DocumentListAction UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2", className)}
      data-component="document-list-action"
      data-slot="document-list-action"
      {...props}
    />
  );
}
