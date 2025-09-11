import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { useNavigationMenuContext } from "../context";
import { navigationMenuContentVariants } from "../variants";

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
 * content. It uses the shared floating surface styling with compact density for
 * consistent spacing and smooth fade animations when opening and closing.
 * This component automatically handles the layout and positioning within the popup structure.
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
}: NavigationMenuContentProps) => {
  const { rounded = false, ring = false } = useNavigationMenuContext();

  return (
    <BaseNavigationMenu.Content
      className={cx(
        // Use navigation menu content variants for rounded and ring styling
        navigationMenuContentVariants({ rounded, ring }),
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

NavigationMenuContent.displayName = "NavigationMenuContent";
