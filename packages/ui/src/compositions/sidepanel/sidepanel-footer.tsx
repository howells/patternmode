"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

type SidepanelFooterProps = ComponentProps<"div">;

/**
 * Footer section of the sidepanel. Typically contains action buttons.
 */
function SidepanelFooter({ className, ...props }: SidepanelFooterProps) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col gap-2 border-t px-6 py-4",
        className,
      )}
      data-component="sidepanel-footer"
      data-slot="sidepanel-footer"
      {...props}
    />
  );
}

export { SidepanelFooter, type SidepanelFooterProps };
