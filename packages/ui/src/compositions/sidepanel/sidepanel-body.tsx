"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

type SidepanelBodyProps = ComponentProps<"div">;

/**
 * Body container for sidepanel content. Provides vertical flex layout
 * for header, scrollable content, and footer.
 */
function SidepanelBody({ className, ...props }: SidepanelBodyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col overflow-hidden",
        // Override vaul's user-select: none to allow text selection in body
        "select-text",
        className,
      )}
      data-component="sidepanel-body"
      data-slot="sidepanel-body"
      {...props}
    />
  );
}

export { SidepanelBody, type SidepanelBodyProps };
