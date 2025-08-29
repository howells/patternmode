import { componentVariants } from "@patternmode/config/variants";
import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";
import { borderRadiusVariantsWithFull as extendedBorderRadiusVariants } from "@patternmode/utils/border-radius-variants-with-full";
import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";
import { buttonVariants as buttonVariantNames } from "./types";

export const buttonVariants = tv({
	base: [
		// base
		"relative inline-flex items-center whitespace-nowrap text-sm outline-hidden",
		// cursor - explicit hand pointer for all interactive buttons
		"cursor-pointer",
		// add transparent border to match input height
		"border border-transparent",
		// background transition - only animate colors and shadows, not position
		"transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
		// disabled
		"disabled:pointer-events-none disabled:shadow-none disabled:cursor-not-allowed",
		// focus
		focusRing,
	],
	variants: {
		variant: componentVariants.button,
		rounded: {
			true: extendedBorderRadiusVariants.full,
		},
		size: {
			"2xs": `h-control-2xs px-2 text-xs has-[>svg]:px-1.5`,
			xs: `h-control-xs px-2 text-xs has-[>svg]:px-1.5`,
			sm: `h-control-sm px-2.5 text-sm has-[>svg]:px-2`,
			base: `h-control-base px-3 text-sm has-[>svg]:px-2.5`,
			lg: `h-control-lg px-4 text-sm has-[>svg]:px-3`,
			"icon-2xs": `size-control-2xs`,
			"icon-xs": `size-control-xs`,
			// no dedicated icon-2xs; icon-xs covers the smallest square icon button
			"icon-sm": `size-control-sm`,
			icon: `size-control-base`,
			"icon-lg": `size-control-lg`,
		},
	},
	compoundVariants: [
		// Gap variants
		{
			size: "2xs",
			variant: [...buttonVariantNames],
			class: "gap-1",
		},
		{
			size: "xs",
			variant: [...buttonVariantNames],
			class: "gap-1",
		},
		{
			size: "sm",
			variant: [...buttonVariantNames],
			class: "gap-1.5",
		},
		{
			size: "base",
			variant: [...buttonVariantNames],
			class: "gap-2",
		},
		{
			size: "lg",
			variant: [...buttonVariantNames],
			class: "gap-2.5",
		},
		// Border radius variants (when not rounded)
		{
			size: "2xs",
			rounded: false,
			class: borderRadiusVariants.xs,
		},
		{
			size: "xs",
			rounded: false,
			class: borderRadiusVariants.xs,
		},
		{
			size: "sm",
			rounded: false,
			class: borderRadiusVariants.sm,
		},
		{
			size: "base",
			rounded: false,
			class: borderRadiusVariants.base,
		},
		{
			size: "lg",
			rounded: false,
			class: borderRadiusVariants.lg,
		},
		{
			size: "icon-2xs",
			rounded: false,
			class: borderRadiusVariants.xs,
		},
		{
			size: "icon-xs",
			rounded: false,
			class: borderRadiusVariants.xs,
		},
		{
			size: "icon-sm",
			rounded: false,
			class: borderRadiusVariants.sm,
		},
		{
			size: "icon",
			rounded: false,
			class: borderRadiusVariants.base,
		},
		{
			size: "icon-lg",
			rounded: false,
			class: borderRadiusVariants.lg,
		},
	],
	defaultVariants: {
		variant: "primary",
		size: "base",
	},
});

// Backwards-compatible alias: some types reference `buttonStyles`
// Keep this in sync with `buttonVariants` to satisfy VariantProps<...> usage.
export const buttonStyles = buttonVariants;

/**
 * Creates button-style variants for other components that want to look like buttons
 * but maintain their own semantic behavior (like toggles, tabs, etc.).
 */
export const createButtonStyleVariants = (
	pressedVariant: keyof typeof componentVariants.button = "destructive",
) => ({
	base: buttonVariants.base,
	variants: {
		// Map button variants to toggle states
		primary: [
			...componentVariants.button.primary,
			// Add pressed state using the specified variant
			`data-[pressed]:${componentVariants.button[pressedVariant].join(
				" data-[pressed]:",
			)}`,
		],
		secondary: [
			...componentVariants.button.secondary,
			`data-[pressed]:${componentVariants.button[pressedVariant].join(
				" data-[pressed]:",
			)}`,
		],
		outline: [
			...componentVariants.button.outline,
			`data-[pressed]:${componentVariants.button[pressedVariant].join(
				" data-[pressed]:",
			)}`,
		],
		ghost: [
			...componentVariants.button.ghost,
			`data-[pressed]:${componentVariants.button[pressedVariant].join(
				" data-[pressed]:",
			)}`,
		],
		"inverse-ghost": [
			...componentVariants.button["inverse-ghost"],
			`data-[pressed]:${componentVariants.button[pressedVariant].join(
				" data-[pressed]:",
			)}`,
		],
		destructive: [
			...componentVariants.button.destructive,
			// When destructive is pressed, make it even more intense
			"data-[pressed]:bg-red-700 data-[pressed]:hover:bg-red-800 dark:data-[pressed]:bg-red-600 dark:data-[pressed]:hover:bg-red-700",
		],
	},
	sizes: buttonVariants.variants.size,
});
