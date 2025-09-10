import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

type NavigationMenuContentProps = {
  /**
   * Reference to the content element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Content
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>;

/**
 * Navigation menu content component for dropdown content containers.
 *
 * The content component provides the styled container for navigation menu dropdown
 * content. It includes PatternMode's compact spacing and smooth fade animations
 * when opening and closing. This component automatically handles the layout and
 * positioning within the popup structure.
 *
 * @example
 * ```tsx
 * <NavigationMenuContent>
 *   <div className="space-y-2 p-4">
 *     <NavigationMenuLink href="/item1">Menu Item 1</NavigationMenuLink>
 *     <NavigationMenuLink href="/item2">Menu Item 2</NavigationMenuLink>
 *   </div>
 * </NavigationMenuContent>
 * ```
 */
export const NavigationMenuContent = ({
  ref,
  className,
  ...props
}: NavigationMenuContentProps) => (
  <BaseNavigationMenu.Content
    className={cx(
      // layout
      // Use tighter padding to match other floating surfaces (e.g., Select)
      "h-full p-1",
      // animations
      "transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
      // states
      "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      className
    )}
    ref={ref}
    {...props}
  />
);

NavigationMenuContent.displayName = "NavigationMenuContent";
