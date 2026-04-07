import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * CommandShortcut helper for displaying keyboard shortcuts.
 * Import from "@patternmode/ui/components/command".
 */
export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        className,
      )}
      data-component="command-shortcut"
      data-slot="command-shortcut"
      {...props}
    />
  );
}
