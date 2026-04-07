"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

type SidepanelHeaderProps = ComponentProps<"div">;

/**
 * Header section of the sidepanel. Contains title and optional close button.
 */
function SidepanelHeader({ className, ...props }: SidepanelHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 border-b px-6 py-4", className)}
      data-component="sidepanel-header"
      data-slot="sidepanel-header"
      {...props}
    />
  );
}

export { SidepanelHeader, type SidepanelHeaderProps };
