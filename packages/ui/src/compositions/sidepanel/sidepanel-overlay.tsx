"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

type SidepanelOverlayProps = ComponentProps<"div">;

/**
 * Backdrop overlay for the sidepanel. Dims content behind the panel.
 * Uses a plain div instead of Vaul's Drawer.Overlay to avoid React 19 hooks bug.
 * Click-to-close is handled by Vaul's modal behavior.
 */
function SidepanelOverlay({ className, ...props }: SidepanelOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("fixed inset-0 z-50 bg-black/40", className)}
      data-component="sidepanel-overlay"
      data-slot="sidepanel-overlay"
      data-vaul-overlay=""
      {...props}
    />
  );
}

export { SidepanelOverlay, type SidepanelOverlayProps };
