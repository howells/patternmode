import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import type React from "react";

/**
 * Root navigation menu component with dropdown submenus and keyboard navigation.
 *
 * The navigation menu component serves as the main container for all navigation menu
 * functionality. It provides the context and state management for menu triggers,
 * content, and viewport positioning. This component handles keyboard navigation,
 * focus management, and the overall menu lifecycle.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink href="/products">View Products</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuItemLink href="/about">About</NavigationMenuItemLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu = (
  props: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root>
) => (
  <BaseNavigationMenu.Root
    className="inline-flex"
    // Prevent vertical stacking by ensuring inline/horizontal context
    data-testid="navigation-menu"
    {...props}
  >
    {props.children}
  </BaseNavigationMenu.Root>
);

export type NavigationMenuProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Root
>;

NavigationMenu.displayName = "NavigationMenu";
