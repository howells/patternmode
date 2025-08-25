import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";
import { focusInput } from "@patternmode/utils/focus-input";
import { hasErrorInput } from "@patternmode/utils/has-error-input";
import { tv } from "tailwind-variants";

/**
 * Shared variants for form control containers (Input, Select, etc.)
 * Handles border radius, shadow, and basic container styling
 */
export const formControlContainerVariants = tv({
	base: [
		"relative flex w-full border transition",
		// border color
		" dark:border-zinc-800",
		// background color
		"bg-white dark:bg-zinc-950",
		// focus
		focusInput,
	],
	variants: {
		size: {
			"2xs": `h-control-2xs ${borderRadiusVariants.xs}`,
			xs: `h-control-xs ${borderRadiusVariants.xs}`,
			sm: `h-control-sm ${borderRadiusVariants.sm}`,
			base: `h-control-base ${borderRadiusVariants.base}`,
			lg: `h-control-lg ${borderRadiusVariants.lg}`,
		},
		hasError: {
			true: "border-red-500 dark:border-red-500",
		},
	},
	defaultVariants: {
		size: "base",
	},
});

/**
 * Shared variants for form control elements (input, select trigger, textarea)
 * Handles text sizing, padding, and inner element styling
 */
export const formControlElementVariants = tv({
	base: [
		"w-full outline-none transition",
		// text color
		"text-zinc-900 dark:text-zinc-50",
		// placeholder color
		"placeholder-zinc-400 dark:placeholder-zinc-500",
		// disabled
		"data-disabled:text-zinc-400 dark:data-disabled:text-zinc-500",
	],
	variants: {
		size: {
			"2xs": "text-xs leading-tight",
			xs: "text-xs leading-tight",
			sm: "text-sm",
			base: "text-sm",
			lg: "text-base",
		},
		variant: {
			// For standalone form controls (full styling)
			standalone: [
				"border appearance-none",
				" dark:border-zinc-800",
				"bg-white dark:bg-zinc-950",
				focusInput,
			],
			// For form controls within containers (minimal styling)
			contained: [
				"bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:border-0",
			],
		},
	},
	compoundVariants: [
		// Standalone sizing includes border radius and height
		{
			variant: "standalone",
			size: "2xs",
			class: `h-control-2xs px-1.5 ${borderRadiusVariants.xs}`,
		},
		{
			variant: "standalone",
			size: "xs",
			class: `h-control-xs px-2 ${borderRadiusVariants.xs}`,
		},
		{
			variant: "standalone",
			size: "sm",
			class: `h-control-sm px-2.5 ${borderRadiusVariants.sm}`,
		},
		{
			variant: "standalone",
			size: "base",
			class: `h-control-base px-3 ${borderRadiusVariants.base}`,
		},
		{
			variant: "standalone",
			size: "lg",
			class: `h-control-lg px-4 ${borderRadiusVariants.lg}`,
		},
		// Contained sizing includes padding only (height handled by container)
		{
			variant: "contained",
			size: "2xs",
			class: "py-0.5 px-1.5",
		},
		{
			variant: "contained",
			size: "xs",
			class: "py-1 px-2",
		},
		{
			variant: "contained",
			size: "sm",
			class: "py-1.5 px-2.5",
		},
		{
			variant: "contained",
			size: "base",
			class: "py-2 px-3",
		},
		{
			variant: "contained",
			size: "lg",
			class: "py-2.5 px-4",
		},
	],
	defaultVariants: {
		size: "base",
		variant: "standalone",
	},
});

/**
 * Shared variants for form control error states
 */
export const formControlErrorVariants = tv({
	variants: {
		hasError: {
			true: hasErrorInput,
		},
	},
});
