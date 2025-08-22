import type { VariantProps } from "tailwind-variants";
import type { ButtonProps } from "@patternmode/button";
import type { dropdownItemVariants } from "./variants";

export type DropdownItemProps = {
	/**
	 * Whether the item is highlighted/focused.
	 * Typically managed by dropdown component state.
	 */
	highlighted?: boolean;
	/**
	 * Whether the item is selected.
	 * Shows visual selection state and selection indicator.
	 */
	selected?: boolean;
	/**
	 * Hint text to display on the right.
	 * Useful for showing roles, statuses, or additional context.
	 */
	hint?: string;
	/**
	 * Visual style variant of the dropdown item.
	 * Use destructive for dangerous actions like delete.
	 * @default "default"
	 */
	variant?: "default" | "destructive";
} & Omit<ButtonProps, "variant" | "fullWidth" | "textAlign"> &
	VariantProps<typeof dropdownItemVariants> & {
		/**
		 * ARIA role for accessibility.
		 * Typically "option" for dropdown items.
		 */
		role?: string;
	};
