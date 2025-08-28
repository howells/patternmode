import type { Size } from "@patternmode/config/sizes";
import type { ButtonVariant } from "@patternmode/constants/variants";
import type { MenuContent } from "@patternmode/menu";
import type React from "react";

export type SplitButtonVariant = ButtonVariant;

export type SplitButtonProps = {
	/**
	 * Visual variant of the split button.
	 * Controls the overall appearance and color scheme of both the main button and dropdown trigger.
	 */
	variant?: SplitButtonVariant;
	/**
	 * Size of the split button.
	 * Affects both the main button and dropdown trigger dimensions.
	 */
	size?: Size;
	/**
	 * Whether the split button has rounded corners.
	 * When true, applies full border radius for a pill-like appearance.
	 */
	rounded?: boolean;
	/**
	 * Menu content - can be any valid menu content.
	 * Typically contains MenuItem, MenuSeparator, and MenuLabel components.
	 */
	children?: React.ReactNode;
	/**
	 * Props to pass to the MenuContent component.
	 * Allows customization of dropdown positioning and behavior.
	 */
	menuProps?: React.ComponentPropsWithoutRef<typeof MenuContent> & {
		sideOffset?: number;
		collisionPadding?: number;
		align?: "start" | "center" | "end";
	};
	/**
	 * Callback when the main button is clicked.
	 * This is the primary action that gets executed when the main button is pressed.
	 */
	onButtonClick?: () => void;
	/**
	 * The main button content.
	 * Can be text, elements, or any React node to display in the primary button.
	 */
	buttonContent: React.ReactNode;
	/**
	 * Whether the split button is disabled.
	 * When true, both the main button and dropdown become non-interactive.
	 */
	disabled?: boolean;
	/**
	 * Whether the main button is in loading state.
	 * Shows loading spinner and disables interaction while preserving dropdown access.
	 */
	isLoading?: boolean;
	/**
	 * Loading text for the main button.
	 * Text to display alongside the loading spinner when isLoading is true.
	 */
	loadingText?: string;
	/**
	 * Left icon for the main button.
	 * Icon component to display before the button content.
	 */
	leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	/**
	 * Custom dropdown icon (defaults to ChevronDown).
	 * Icon component to display in the dropdown trigger button.
	 */
	dropdownIcon?: React.ComponentType<{
		className?: string;
		strokeWidth?: number;
	}>;
	/**
	 * Whether to show the separator between the main button and dropdown trigger.
	 */
	showSeparator?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
