"use client";

import { Trigger } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

type SidepanelTriggerProps = ComponentProps<typeof Trigger>;

/**
 * Trigger button that opens the sidepanel when clicked.
 */
function SidepanelTrigger({ ...props }: SidepanelTriggerProps) {
  return (
    <Trigger
      data-component="sidepanel-trigger"
      data-slot="sidepanel-trigger"
      {...props}
    />
  );
}

export { SidepanelTrigger, type SidepanelTriggerProps };
