import type { useRender } from "@base-ui-components/react/use-render";
import type { Size } from "@patternmode/styles/constants/sizes";
import type { ButtonProps } from "../button/component";

export type ThemeToggleProps = {
	/**
	 * Current theme value.
	 * Used to determine which icon to display.
	 */
	theme: "light" | "dark";
	/**
	 * Callback fired when the toggle button is clicked.
	 * Should handle theme switching logic.
	 */
	onToggle: () => void;
	/**
	 * Loading state while theme is being determined.
	 * Shows a neutral state before theme is resolved.
	 */
	isLoading?: boolean;
	/**
	 * Size variant for the toggle button.
	 * Controls the overall dimensions and icon size.
	 */
	size?: Size;
	/**
	 * Visual variant for the toggle button.
	 * Controls the styling and background appearance.
	 */
	variant?: ButtonProps["variant"];
	/**
	 * Whether to use rounded/pill shape.
	 * When true, button becomes fully rounded instead of using border radius.
	 */
	rounded?: boolean;
} & useRender.ComponentProps<"button">;
