import type { useRender } from "@base-ui-components/react/use-render";
import type { Size } from "@patternmode/config/sizes";
import type { IconComponent } from "@patternmode/icon/types";
import type { VariantProps } from "tailwind-variants";

/**
 * Icon-only button size options.
 * Controls both width and height for square icon buttons.
 */
export type IconButtonSize =
	| "icon-2xs"
	| "icon-xs"
	| "icon-sm"
	| "icon"
	| "icon-lg";

/**
 * Button variant options.
 * All available visual styles for buttons.
 */
export const buttonVariants = [
	"primary",
	"secondary",
	"outline",
	"outline-dashed",
	"ghost",
	"destructive",
	"inverse-ghost",
	"link",
	"minimal",
] as const;

/**
 * Button variant type.
 * Extracted from buttonVariants array for reuse in other components.
 */
export type ButtonVariant = (typeof buttonVariants)[number];

/**
 * Props for the Button component.
 */
export type ButtonProps = {
	/**
	 * Whether the button is in a loading state.
	 * Shows spinner and disables interactions when true.
	 */
	isLoading?: boolean;
	/**
	 * Text to display when loading (defaults to children).
	 * Only shown when isLoading is true.
	 */
	loadingText?: string;
	/**
	 * Icon component (proxy for leftIcon).
	 * This is essentially an alias for leftIcon, useful for single-icon buttons.
	 * Takes precedence over leftIcon when both are provided.
	 */
	icon?: IconComponent;
	/**
	 * Icon component to display on the left side.
	 * Used for icon-text combinations.
	 */
	leftIcon?: IconComponent;
	/**
	 * Icon component to display on the right side.
	 * Not shown on icon-only button sizes.
	 */
	rightIcon?: IconComponent;
	/**
	 * Stroke width for icons (defaults to config value).
	 * Controls the thickness of icon strokes.
	 */
	iconStrokeWidth?: number;
	/**
	 * Whether the button should take full width.
	 * When true, button expands to container width.
	 */
	fullWidth?: boolean;
	/**
	 * Text alignment within the button.
	 * Controls horizontal text positioning.
	 */
	textAlign?: "left" | "center" | "right";
	/**
	 * Keyboard shortcut to display.
	 * Can be a single key or array of keys for combinations.
	 */
	kbd?: string | string[];
	/**
	 * Platform for keyboard shortcut display.
	 * Auto-detects platform when set to "auto".
	 */
	kbdPlatform?: "mac" | "pc" | "auto";
	/**
	 * Visual style variant of the button.
	 * Controls color scheme and visual emphasis.
	 */
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "outline-dashed"
		| "ghost"
		| "destructive"
		| "inverse-ghost"
		| "link"
		| "minimal";
	/**
	 * Size variant of the button.
	 * Icon sizes are for icon-only buttons without text.
	 */
	size?: Size | IconButtonSize;
	/**
	 * Whether to use full border radius for rounded appearance.
	 * Creates pill-shaped buttons when true.
	 */
	rounded?: boolean;

	/**
	 * Show left icon only on hover.
	 */
	showLeftIconOnHover?: boolean;
	/**
	 * Show right icon only on hover.
	 */
	showRightIconOnHover?: boolean;
} & useRender.ComponentProps<"button"> &
	VariantProps<typeof import("./variants").buttonStyles>;
