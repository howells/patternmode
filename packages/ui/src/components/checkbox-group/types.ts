import type { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import type React from "react";

export type CheckboxGroupProps = {
	/**
	 * Optional label text displayed above the checkbox group.
	 * Provides context and improves accessibility for screen readers.
	 */
	label?: string;
	/**
	 * ID for the label element to establish proper ARIA relationships.
	 * Used for aria-labelledby attribute on the group container.
	 */
	labelId?: string;
	/**
	 * Additional CSS classes to apply to the group container.
	 * Allows for custom styling while maintaining accessibility.
	 */
	className?: string;
	/**
	 * Child checkbox elements, typically CheckboxGroupItem components.
	 * Each child should have a unique value prop for proper state management.
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>;

export type CheckboxGroupItemProps = {
	/**
	 * Unique value identifier for this checkbox item within the group.
	 * Used by the parent CheckboxGroup to track selection state.
	 */
	value: string;
	/**
	 * Optional name attribute for the underlying checkbox input.
	 * Useful for form submission and accessibility when needed.
	 */
	name?: string;
	/**
	 * Label content displayed next to the checkbox.
	 * Can be simple text or complex React elements for rich layouts.
	 */
	children?: React.ReactNode;
	/**
	 * Whether this specific checkbox item is disabled.
	 * When disabled, the item becomes unclickable and visually dimmed.
	 */
	disabled?: boolean;
	/**
	 * Additional CSS classes to apply to the label container.
	 * Allows for custom styling while maintaining accessibility.
	 */
	className?: string;
};
