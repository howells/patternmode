import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import type React from "react";
import {
  NavigationMenuArrow,
  NavigationMenuPopup,
} from "./navigation-menu-popup";
import { NavigationMenuPortal } from "./navigation-menu-portal";
import { NavigationMenuPositioner } from "./navigation-menu-positioner";

type NavigationMenuViewportProps = {
  /**
   * Reference to the viewport element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Viewport
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport>;

/**
 * Navigation menu viewport component for dropdown rendering with smart positioning.
 *
 * The viewport component provides the complete portal-based rendering system for
 * navigation menus. It automatically handles positioning, collision detection,
 * animations, and z-index management. This component combines the portal,
 * positioner, popup, and arrow components into a single convenient wrapper.
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
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 * ```
 */
export const NavigationMenuViewport = ({
  ref,
  className,
  ...props
}: NavigationMenuViewportProps) => (
  <NavigationMenuPortal>
    <NavigationMenuPositioner
      collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
      sideOffset={10}
    >
      <NavigationMenuPopup
        className={cx(
          floatingSurfaceVariants({ density: "compact", width: "auto" }).base()
        )}
      >
        <NavigationMenuArrow />
        <BaseNavigationMenu.Viewport
          className={cx("relative h-full w-full overflow-hidden", className)}
          ref={ref}
          {...props}
        />
      </NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
);

NavigationMenuViewport.displayName = "NavigationMenuViewport";
