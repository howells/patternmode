import type { Select as BaseSelect } from "@base-ui-components/react/select";
import type { useRender } from "@base-ui-components/react/use-render";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";

import type { Size } from "../../constants/sizes";
import type { selectTriggerVariants } from "./variants";

/**
 * Props for the SelectTrigger component.
 */
export type SelectTriggerProps = {
	/**
	 * Whether to display error styling for form validation.
	 * Adds red border and error state styling to indicate validation errors.
	 */
	hasError?: boolean;
	/**
	 * Size variant determining height and text size.
	 * - "xs": Extra small height and text size for very compact layouts
	 * - "sm": Small height and text size for compact layouts
	 * - "base": Regular height and text size for most use cases
	 * - "lg": Large height and text size for prominent displays
	 */
	size?: Size;
	/**
	 * Custom element to render (defaults to native trigger styling).
	 * Enables using Button or other components as the trigger.
	 */
	render?: useRender.RenderProp<Record<string, unknown>>;
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> &
	VariantProps<typeof selectTriggerVariants>;

/**
 * Props for the SelectScrollUpButton component.
 */
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
	typeof BaseSelect.ScrollUpArrow
>;

/**
 * Props for the SelectScrollDownButton component.
 */
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
	typeof BaseSelect.ScrollDownArrow
>;

/**
 * Props for the SelectBackdrop component.
 */
export type SelectBackdropProps = React.ComponentPropsWithoutRef<
	typeof BaseSelect.Backdrop
>;

/**
 * Props for the SelectPositioner component.
 */
export type SelectPositionerProps = {
	/**
	 * Distance from the trigger element in pixels.
	 */
	sideOffset?: number;
	/**
	 * Padding for collision detection in pixels.
	 */
	collisionPadding?: number;
	/**
	 * Whether to align the item with the trigger (for better visual alignment).
	 */
	alignItemWithTrigger?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>;

/**
 * Props for the SelectContent component.
 */
export type SelectContentProps = {
	/**
	 * Distance from the trigger element in pixels.
	 */
	sideOffset?: number;
	/**
	 * Padding for collision detection in pixels.
	 */
	collisionPadding?: number;
	/**
	 * Preferred placement side relative to the trigger.
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment relative to the trigger element.
	 */
	align?: "start" | "center" | "end";
	/**
	 * Whether to align the item with the trigger (for better visual alignment).
	 */
	alignItemWithTrigger?: boolean;
	/**
	 * Size variant for text and spacing (inherited from trigger).
	 */
	size?: Size;
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>;

/**
 * Props for the SelectGroupLabel component.
 */
export type SelectGroupLabelProps = React.ComponentPropsWithoutRef<
	typeof BaseSelect.GroupLabel
>;

/**
 * Props for the SelectItem component.
 */
export type SelectItemProps = {
	/**
	 * Size variant for text and spacing (inherited from trigger).
	 */
	size?: Size;
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Item>;

/**
 * Props for the SelectSeparator component.
 */
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<
	typeof BaseSelect.Separator
>;

/**
 * Props for the SelectArrow component.
 */
export type SelectArrowProps = React.ComponentPropsWithoutRef<
	typeof BaseSelect.Arrow
>;
