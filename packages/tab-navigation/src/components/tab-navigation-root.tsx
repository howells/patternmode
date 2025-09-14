import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type TabNavigationProps = Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenu.Root>,
  "orientation" | "defaultValue"
> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenu.Root> | null>;
};

/**
 * Tab-based navigation component for switching between related content sections.
 */
export const TabNavigation = ({
  ref: forwardedRef,
  className,
  children,
  ...props
}: TabNavigationProps) => (
  <NavigationMenu.Root
    data-testid="tab-navigation"
    ref={forwardedRef}
    {...props}
  >
    <NavigationMenu.List
      className={cx(
        // base
        "flex items-center justify-start whitespace-nowrap border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // border color
        "dark:border-zinc-800",
        className
      )}
    >
      {children}
    </NavigationMenu.List>
  </NavigationMenu.Root>
);

TabNavigation.displayName = "TabNavigation";
