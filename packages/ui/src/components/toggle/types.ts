import type { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import type { useRender } from "@base-ui-components/react/use-render";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { Size } from "@patternmode/styles/constants/sizes";
import type { ButtonProps } from "../button/component";
import type { toggleVariants } from "./variants";

export type ToggleProps = {
	/**
	 * The visual style variant of the toggle button.
	 * @default "default"
	 */
	variant?: VariantProps<typeof toggleVariants>["variant"];
	/**
	 * The size of the toggle button.
	 * @default "base"
	 */
	size?: Size;
	/**
	 * Custom element to render (defaults to Button).
	 * Enables using custom components as the toggle.
	 */
	render?: useRender.RenderProp<Record<string, unknown>>;
	/**
	 * Icon component to display on the left side of the default Button render.
	 */
	leftIcon?: ButtonProps["leftIcon"];
	/**
	 * Icon component to display on the right side of the default Button render.
	 */
	rightIcon?: ButtonProps["rightIcon"];
	/**
	 * Icon component (proxy for leftIcon) for the default Button render.
	 */
	icon?: ButtonProps["icon"];
	/**
	 * Whether the button should take full width in the default render.
	 */
	fullWidth?: ButtonProps["fullWidth"];
	/**
	 * Whether the button should have rounded corners in the default render.
	 */
	rounded?: ButtonProps["rounded"];
} & React.ComponentPropsWithoutRef<typeof BaseToggle>;
