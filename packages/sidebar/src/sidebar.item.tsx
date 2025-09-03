import { Button, type ButtonProps } from "@patternmode/button";
import type { buttonVariants } from "@patternmode/button/types";
import { Tooltip } from "@patternmode/tooltip";

import { useSidebar } from "./sidebar-store";

export const SidebarItem = ({ children, icon, ...props }: ButtonProps) => {
  const isExpanded = useSidebar((s) => s.isExpanded);
  const state = useSidebar((s) => s.state);
  const buttonSize = isExpanded ? "base" : "icon";
  const buttonVariant: (typeof buttonVariants)[number] = "ghost";

  const trigger = (
    <Button
      aria-label={typeof children === "string" ? children : undefined}
      icon={icon}
      size={buttonSize}
      variant={buttonVariant}
      {...props}
    >
      {isExpanded ? children : null}
    </Button>
  );

  // Show tooltip whenever the sidebar is not expanded (collapsed or locked)
  const showTooltip = !isExpanded;

  return showTooltip ? (
    <Tooltip
      align="center"
      content={children}
      delayDuration={0}
      render={trigger}
      side="right"
    />
  ) : (
    trigger
  );
};
