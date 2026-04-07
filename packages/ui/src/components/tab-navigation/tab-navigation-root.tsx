"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentSize } from "../../lib/size";
import { TabsContext } from "../tabs/tabs-context";

export interface TabNavigationProps extends React.ComponentProps<"nav"> {
  /** Whether tabs should fill container width with equal widths */
  fullWidth?: boolean;
  /** Component size */
  size?: ComponentSize;
  /** Visual style variant: pill or line */
  variant?: "pill" | "line";
}

/**
 * TabNavigation UI component for router-based navigation tabs.
 * Import from "@patternmode/ui/components/tab-navigation".
 * Uses the same styling as Tabs component.
 */
export function TabNavigation({
  className,
  variant = "line",
  size = "base",
  fullWidth = false,
  children,
  ...props
}: TabNavigationProps) {
  return (
    <TabsContext.Provider value={{ variant, size, fullWidth }}>
      <nav
        className={cn("flex flex-col gap-2", className)}
        data-component="tab-navigation"
        data-slot="tab-navigation"
        {...props}
      >
        {children}
      </nav>
    </TabsContext.Provider>
  );
}
