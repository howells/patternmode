import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

type NavigationMenuItemLinkProps = {
  /**
   * Reference to the link element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BaseNavigationMenu.Link
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>;

/**
 * Navigation menu item link component for top-level navigation links.
 *
 * The item link component provides styled navigation links for top-level menu items
 * that don't require dropdown content. It uses PatternMode Button styling and is
 * designed for direct navigation scenarios like "Home", "About", or "Contact" pages.
 * This component renders as a button with link behavior.
 *
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuItemLink href="/about">
 *     About Us
 *   </NavigationMenuItemLink>
 * </NavigationMenuItem>
 *
 * <NavigationMenuItem>
 *   <NavigationMenuItemLink href="/contact" className="font-medium">
 *     Contact
 *   </NavigationMenuItemLink>
 * </NavigationMenuItem>
 * ```
 */
export const NavigationMenuItemLink = ({
  ref,
  className,
  ...props
}: NavigationMenuItemLinkProps) => (
  <BaseNavigationMenu.Link
    // Compose with PatternMode Button so top-level item looks like a button/link
    className={cx("inline-flex", className)}
    ref={ref}
    render={<Button size="base" variant="ghost" />}
    {...props}
  />
);

NavigationMenuItemLink.displayName = "NavigationMenuItemLink";
