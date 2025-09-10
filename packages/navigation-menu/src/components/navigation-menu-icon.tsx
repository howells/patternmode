import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import type React from "react";

/**
 * Navigation menu icon wrapper. Use inside `NavigationMenuTrigger`.
 *
 * The icon component is a styled container for icons within navigation menu triggers.
 * It provides consistent positioning and styling for chevron or other indicator icons.
 * This component automatically handles rotation animations when the menu opens/closes.
 *
 * @example
 * ```tsx
 * <NavigationMenuTrigger>
 *   Products
 *   <NavigationMenuIcon>
 *     <ChevronDown className="h-4 w-4" />
 *   </NavigationMenuIcon>
 * </NavigationMenuTrigger>
 * ```
 */
export const NavigationMenuIcon = (props: NavigationMenuIconProps) => (
  <BaseNavigationMenu.Icon {...props} />
);

export type NavigationMenuIconProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Icon
>;

NavigationMenuIcon.displayName = "NavigationMenuIcon";
