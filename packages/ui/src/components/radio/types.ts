import type { Radio as BaseRadio } from "@base-ui-components/react/radio";
import type { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { Size } from "../../constants/sizes";
import type { radioGroupVariants, radioVariants } from "./variants";

export type RadioProps = React.ComponentPropsWithoutRef<typeof BaseRadio.Root>;

export type RadioGroupProps = {
	/**
	 * Layout orientation of the radio group.
	 * Vertical stacks radio items in a column, horizontal arranges them in a row.
	 */
	orientation?: VariantProps<typeof radioGroupVariants>["orientation"];

	/**
	 * Spacing size between radio items.
	 * Controls the gap between individual radio buttons within the group.
	 */
	size?: VariantProps<typeof radioGroupVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & {
		ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null>;
	};

export type RadioIndicatorProps = {
	/**
	 * Size of the radio indicator affecting the overall dimensions.
	 */
	size?: Size;

	/**
	 * Visual variant of the radio indicator affecting styling context.
	 */
	variant?: VariantProps<typeof radioVariants>["variant"];
} & React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator> & {
		ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Indicator> | null>;
	};

export type RadioItemProps = {
	/**
	 * Size of the radio button affecting the overall dimensions and internal spacing.
	 * Controls the circle size, dot size, and overall clickable area.
	 */
	size?: Size;

	/**
	 * Visual variant of the radio button affecting styling context.
	 * Default variant for standard forms, card variant for enhanced layouts.
	 */
	variant?: VariantProps<typeof radioVariants>["variant"];
} & React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & {
		ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
	};

export type RadioLabelProps = {
	/**
	 * Size variant affecting text size and spacing between radio and label.
	 * Should match the size of the associated radio button for consistent appearance.
	 */
	size?: Size;
} & React.ComponentPropsWithoutRef<"label"> & {
		ref?: React.RefObject<HTMLLabelElement | null>;
	};

export type RadioCardProps = {
	/**
	 * Size variant affecting the padding and overall card dimensions.
	 * Larger sizes provide more space for rich content layouts.
	 */
	size?: Size;

	/**
	 * Content to display within the radio card.
	 * Can include complex layouts, text, icons, and other UI elements.
	 */
	children?: React.ReactNode;

	/**
	 * Custom indicator component to replace the default radio indicator.
	 * Useful for specialized designs or when integrating with existing components.
	 */
	indicator?: React.ReactNode;

	/**
	 * Whether to display the radio selection indicator.
	 * When false, hides the visual radio button but maintains selection functionality.
	 */
	showIndicator?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & {
		ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
	};

export type RadioOptionProps = {
	/**
	 * The unique value for this radio option within the radio group.
	 * Used to identify which option is selected and for form submission.
	 */
	value: string;

	/**
	 * The main label content for the radio option.
	 * Can be a string or more complex React content like formatted text.
	 */
	label: React.ReactNode;

	/**
	 * Optional secondary text providing additional context or details.
	 * Displayed below the main label in a smaller, muted text style.
	 */
	description?: React.ReactNode;

	/**
	 * Whether this radio option is disabled and cannot be selected.
	 * Disabled options are visually dimmed and skip keyboard navigation.
	 */
	disabled?: boolean;

	/**
	 * Size variant affecting the radio button and text sizing.
	 * Should be consistent within a radio group for proper alignment.
	 */
	size?: Size;
} & {
	ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
};

export type RadioCardOptionProps = {
	/**
	 * The unique value for this radio card option within the radio group.
	 * Used to identify which option is selected and for form submission.
	 */
	value: string;

	/**
	 * The main title content for the radio card option.
	 * Typically displayed prominently at the top of the card.
	 */
	title: React.ReactNode;

	/**
	 * Optional descriptive content providing additional details about this option.
	 * Can include multiple lines, formatting, or additional UI elements.
	 */
	description?: React.ReactNode;

	/**
	 * Whether this radio card option is disabled and cannot be selected.
	 * Disabled cards are visually dimmed and skip keyboard navigation.
	 */
	disabled?: boolean;

	/**
	 * Size variant affecting the card padding and internal spacing.
	 * Larger sizes accommodate more complex content layouts.
	 */
	size?: Size;

	/**
	 * Whether to display the radio selection indicator within the card.
	 * When false, selection state is indicated only through card styling.
	 */
	showIndicator?: boolean;
} & {
	ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
};
