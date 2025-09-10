import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import type React from "react";

/**
 * Portal container for the Navigation Menu popup structure.
 *
 * The portal component renders the navigation menu popup content outside the
 * normal DOM hierarchy, typically at the document body level. This prevents
 * CSS overflow issues and ensures proper z-index stacking. It's automatically
 * used by NavigationMenuViewport but can be used directly for custom positioning.
 *
 * @example
 * ```tsx
 * <NavigationMenuPortal>
 *   <NavigationMenuPositioner>
 *     <NavigationMenuPopup>
 *       <NavigationMenuContent>Menu content</NavigationMenuContent>
 *     </NavigationMenuPopup>
 *   </NavigationMenuPositioner>
 * </NavigationMenuPortal>
 * ```
 */
export const NavigationMenuPortal = (props: NavigationMenuPortalProps) => (
  <BaseNavigationMenu.Portal {...props} />
);

export type NavigationMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Portal
>;

NavigationMenuPortal.displayName = "NavigationMenuPortal";
