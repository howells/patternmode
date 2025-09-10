import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Semi-transparent backdrop shown behind open popups.
 *
 * The backdrop component provides a visual overlay that appears behind open navigation
 * menu popups. It includes smooth fade animations and supports both light and dark themes.
 * The backdrop helps focus user attention on the menu content and provides a dismissal
 * mechanism when clicked.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
 *       <NavigationMenuContent>Content</NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuBackdrop />
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 */
export const NavigationMenuBackdrop = ({
  className,
  ...props
}: NavigationMenuBackdropProps) => (
  <BaseNavigationMenu.Backdrop
    className={cx(
      // positioning & layout
      "fixed inset-0",
      // visuals
      "bg-black/40 dark:bg-black/50",
      // animation hooks
      "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      className
    )}
    {...props}
  />
);

export type NavigationMenuBackdropProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Backdrop
> & {
  /** Additional CSS classes for styling customization. */
  className?: string;
};

NavigationMenuBackdrop.displayName = "NavigationMenuBackdrop";
