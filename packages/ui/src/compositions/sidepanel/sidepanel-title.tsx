"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Title } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

type SidepanelTitleProps = ComponentProps<typeof Title>;

/**
 * Title element for the sidepanel. Provides accessible name.
 */
function SidepanelTitle({ className, ...props }: SidepanelTitleProps) {
  return (
    <Title
      className={cn("font-medium text-foreground", className)}
      data-component="sidepanel-title"
      data-slot="sidepanel-title"
      {...props}
    />
  );
}

export { SidepanelTitle, type SidepanelTitleProps };
