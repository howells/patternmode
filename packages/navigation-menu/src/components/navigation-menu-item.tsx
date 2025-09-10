import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import type React from "react";

/**
 * Navigation menu item component for individual menu sections.
 *
 * The item component wraps navigation menu triggers and content, providing
 * the structural foundation for each menu section. It manages the relationship
 * between triggers and their associated dropdown content.
 *
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *   <NavigationMenuContent>
 *     <NavigationMenuLink href="/products">View Products</NavigationMenuLink>
 *   </NavigationMenuContent>
 * </NavigationMenuItem>
 * ```
 */
export const NavigationMenuItem = BaseNavigationMenu.Item;

export type NavigationMenuItemProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Item
>;
