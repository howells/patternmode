import { Separator } from "@patternmode/ui/components/separator";
import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

type SidebarSeparatorProps = React.ComponentProps<typeof Separator> & {
  /** Whether to show the border line. Defaults to true. */
  showBorder?: boolean;
};

/**
 * SidebarSeparator UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarSeparator({
  className,
  showBorder = true,
  ...props
}: SidebarSeparatorProps) {
  return (
    <Separator
      className={cn(
        "w-auto",
        showBorder ? "bg-sidebar-border" : "bg-transparent",
        className,
      )}
      data-component="sidebar-separator"
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
}
