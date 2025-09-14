import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useNavigationMenuContext } from "../context";
import { navigationMenuTriggerVariants } from "../variants";

type NavigationMenuTriggerProps = {
	/**
	 * Reference to the trigger element.
	 */
	ref?: React.RefObject<React.ElementRef<
		typeof BaseNavigationMenu.Trigger
	> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Content to display within the trigger button.
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>;

/**
 * Navigation menu trigger component that opens dropdown content when activated.
 *
 * The trigger component serves as the interactive button that opens and closes
 * navigation menu content. It includes PatternMode Button styling and handles
 * keyboard navigation, focus management, and visual feedback. The trigger
 * automatically shows an icon (typically a chevron) that rotates when the
 * menu is open.
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
export const NavigationMenuTrigger = ({
	ref,
	className,
	children,
	render,
	...props
}: NavigationMenuTriggerProps) => {
	const { rounded = false, ring = false } = useNavigationMenuContext();

	// Handle render prop - Base UI expects a render function
	const triggerRender = render
		? typeof render === "function"
			? render
			: (renderProps: any) => {
					// If render is a React element, clone it with merged props
					if (React.isValidElement(render)) {
						// Extract className from renderProps to avoid conflicts
						const { className: _, ...otherTriggerProps } = renderProps;

						return React.cloneElement(render, {
							...render.props, // Original props first (including rounded!)
							...otherTriggerProps, // Trigger props second (event handlers, etc.)
						});
					}
					return render;
				}
		: (renderProps: any) => (
				<Button {...renderProps} rounded={rounded} size="base" variant="ghost">
					{children}
					<BaseNavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
						<ChevronDown className="h-3 w-3" />
					</BaseNavigationMenu.Icon>
				</Button>
			);

	return (
		<BaseNavigationMenu.Trigger
			className={cx(
				// Apply navigation menu trigger variants for ring styling
				navigationMenuTriggerVariants({ rounded, ring }),
				// Keep minimal layout adjustments; Button handles the rest
				"inline-flex items-center gap-1.5",
				className,
			)}
			ref={ref}
			render={triggerRender}
			{...props}
		>
			{/* Children are handled by the render function */}
		</BaseNavigationMenu.Trigger>
	);
};

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
