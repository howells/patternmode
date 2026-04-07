"use client";

import { Root } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

type SidepanelRootProps = ComponentProps<typeof Root>;

/**
 * Root component for a sidepanel. Wraps Radix Dialog.Root.
 *
 * @param props.open - Controlled open state
 * @param props.onOpenChange - Callback when open state changes
 * @param props.modal - Whether background is interactive (default: true)
 */
function SidepanelRoot(props: SidepanelRootProps) {
  return <Root data-component="sidepanel" data-slot="sidepanel" {...props} />;
}

export { SidepanelRoot, type SidepanelRootProps };
