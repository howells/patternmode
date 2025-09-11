import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { NavigationMenuProvider } from "../context";
import { navigationMenuVariants } from "../variants";

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
 *
 * @example
 * ```tsx
 * <NavigationMenu rounded>
 *   <NavigationMenuList>
 *     <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *     <NavigationMenuContent>
 *       <NavigationMenuLink href="/products">View Products</NavigationMenuLink>
 *     </NavigationMenuContent>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 *
 * @example
 * ```tsx
 * <NavigationMenu ring>
 *   <NavigationMenuList>
 *     <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *     <NavigationMenuContent>
 *       <NavigationMenuLink href="/products">View Products</NavigationMenuLink>
 *     </NavigationMenuContent>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 *
 * @example
 * ```tsx
 * <NavigationMenu rounded ring>
 *   <NavigationMenuList>
 *     <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *     <NavigationMenuContent>
 *       <NavigationMenuLink href="/products">View Products</NavigationMenuLink>
 *     </NavigationMenuContent>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu = ({
  rounded = false,
  ring = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root> & {
  /** Apply fully rounded styling to the navigation menu */
  rounded?: boolean;
  /** Apply ring styling to the navigation menu */
  ring?: boolean;
}) => (
  <NavigationMenuProvider ring={ring} rounded={rounded}>
    <BaseNavigationMenu.Root
      className={cx(navigationMenuVariants({ rounded, ring }), className)}
      // Prevent vertical stacking by ensuring inline/horizontal context
      data-testid="navigation-menu"
      {...props}
    >
      {props.children}
    </BaseNavigationMenu.Root>
  </NavigationMenuProvider>
);

export type NavigationMenuProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Root
>;

NavigationMenu.displayName = "NavigationMenu";
