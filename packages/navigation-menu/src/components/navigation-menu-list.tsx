import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Navigation menu list component for menu item containers.
 *
 * The list component provides the horizontal layout structure for navigation menu items.
 * It handles the layout and spacing of multiple navigation items within the menu.
 *
 * @example
 * ```tsx
 * <NavigationMenuList>
 *   <NavigationMenuItem>
 *     <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *   </NavigationMenuItem>
 *   <NavigationMenuItem>
 *     <NavigationMenuItemLink href="/about">About</NavigationMenuItemLink>
 *   </NavigationMenuItem>
 * </NavigationMenuList>
 * ```
 */
export const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuListProps) => (
  <BaseNavigationMenu.List
    className={cx(
      // Ensure horizontal layout and spacing by default
      "flex items-center gap-3",
      className
    )}
    {...props}
  />
);

export type NavigationMenuListProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.List
>;
