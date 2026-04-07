"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import { Close } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";

type SidepanelCloseProps = ComponentProps<typeof Close>;

/**
 * Close button for the sidepanel. Closes the panel when clicked.
 */
function SidepanelClose({
  className,
  children,
  ...props
}: SidepanelCloseProps) {
  return (
    <Close
      className={cn(
        "rounded-sm opacity-70 ring-offset-background transition-opacity",
        "hover:opacity-100",
        focusRing,
        "disabled:pointer-events-none",
        className,
      )}
      data-component="sidepanel-close"
      data-slot="sidepanel-close"
      {...props}
    >
      {children ?? (
        <>
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </>
      )}
    </Close>
  );
}

export { SidepanelClose, type SidepanelCloseProps };
