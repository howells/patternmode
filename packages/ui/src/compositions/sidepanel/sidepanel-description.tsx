"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Description } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

type SidepanelDescriptionProps = ComponentProps<typeof Description>;

/**
 * Description element for the sidepanel. Provides accessible description.
 */
function SidepanelDescription({
  className,
  ...props
}: SidepanelDescriptionProps) {
  return (
    <Description
      className={cn("text-muted-foreground text-sm", className)}
      data-component="sidepanel-description"
      data-slot="sidepanel-description"
      {...props}
    />
  );
}

export { SidepanelDescription, type SidepanelDescriptionProps };
