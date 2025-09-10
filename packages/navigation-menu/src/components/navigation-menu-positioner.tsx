import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

/**
 * Positioned container for `Popup`, with PatternMode spacing and transitions.
 *
 * The positioner component handles the smart positioning of navigation menu popups
 * relative to their triggers. It includes collision detection, smooth animations,
 * and proper hit slop areas to prevent accidental dismissals. The component
 * automatically adjusts positioning based on available viewport space.
 *
 * @example
 * ```tsx
 * <NavigationMenuPositioner
 *   collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
 *   sideOffset={10}
 * >
 *   <NavigationMenuPopup>
 *     <NavigationMenuContent>Menu content</NavigationMenuContent>
 *   </NavigationMenuPopup>
 * </NavigationMenuPositioner>
 * ```
 */
export const NavigationMenuPositioner = ({
  className,
  ...props
}: NavigationMenuPositionerProps) => (
  <BaseNavigationMenu.Positioner
    className={cx(
      // layout
      "box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
      // animation
      "transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
      // hit slop
      "before:absolute before:content-['']",
      // disable transition when instant
      "data-[instant]:transition-none",
      // side-specific hit slop
      "data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5",
      "data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5",
      "data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5",
      "data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5",
      className
    )}
    {...props}
  />
);

export type NavigationMenuPositionerProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Positioner
> & {
  /** Additional CSS classes for styling customization. */
  className?: string;
};

NavigationMenuPositioner.displayName = "NavigationMenuPositioner";
