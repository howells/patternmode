"use client";

import { Root } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

type SidepanelNestedRootProps = ComponentProps<typeof Root>;

/**
 * Nested root component for stacking sidepanels.
 * Creates a stacking effect where the parent panel shifts and scales.
 *
 * @param props.open - Controlled open state
 * @param props.onOpenChange - Callback when open state changes
 */
function SidepanelNestedRoot(props: SidepanelNestedRootProps) {
  return (
    <Root
      data-component="sidepanel-nested"
      data-slot="sidepanel-nested"
      {...props}
    />
  );
}

export { SidepanelNestedRoot, type SidepanelNestedRootProps };
