import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { floatingItemVariants } from "@patternmode/utils/floating-item";
import type React from "react";

type NavigationMenuLinkProps = {
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
 * Navigation menu link component for dropdown links.
 *
 * The link component provides interactive navigation elements within dropdown menus.
 * It includes PatternMode Button styling and floating item variants for consistent
 * appearance. This component is optimized for use within dropdown content and
 * supports both href-based navigation and custom click handlers.
 *
 * @example
 * ```tsx
 * <NavigationMenuLink href="/products">
 *   View All Products
 * </NavigationMenuLink>
 *
 * // With custom styling
 * <NavigationMenuLink href="/contact" className="font-semibold">
 *   Contact Us
 * </NavigationMenuLink>
 * ```
 */
export const NavigationMenuLink = ({
	ref,
	className,
	...props
}: NavigationMenuLinkProps) => (
	<BaseNavigationMenu.Link
		// Use PatternMode Button for consistent link styles in dropdown content
		className={cx(
			floatingItemVariants({ size: "base" }),
			// make sure it doesn't cause line breaks in top-level layout
			"inline-flex no-underline",
			className,
		)}
		ref={ref}
		render={<Button size="sm" variant="ghost" />}
		{...props}
	/>
);

NavigationMenuLink.displayName = "NavigationMenuLink";
