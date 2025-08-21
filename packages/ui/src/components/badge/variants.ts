import type { ClassValue } from "clsx";
import { tv } from "tailwind-variants";
import {
	buttonSpecificVariants,
	type GlobalSemanticVariant,
	getVariantClasses,
	globalSemanticVariants,
	tailwindColorVariants,
} from "../../constants/variants";
import { borderRadiusVariants } from "../../presentation/border-radius-variants";
import { borderRadiusVariantsWithFull as extendedBorderRadiusVariants } from "../../presentation/border-radius-variants-with-full";
import { cx } from "@patternmode/core/utils/cx";

// Badge variant configurations - generate dynamically from central variant system
const badgeVariantStyles: Record<string, ClassValue[]> = {
	// Generate semantic variants from central object
	...Object.fromEntries(
		Object.keys(globalSemanticVariants).map((variant) => [
			variant,
			getVariantClasses(variant as GlobalSemanticVariant),
		]),
	),
	// Generate Tailwind color variants from central array
	...Object.fromEntries(
		tailwindColorVariants.map((color) => [color, getVariantClasses(color)]),
	),
	// Button-like variants (adapted for badges - no hover states)
	...Object.fromEntries(
		Object.entries(buttonSpecificVariants).map(([key, classes]) => [
			key,
			// Filter out hover states and other interactive styles for badges
			classes.filter(
				(cls) =>
					!cls.includes("hover:") &&
					!cls.includes("active:") &&
					!cls.includes("disabled:") &&
					!cls.includes("data-["),
			),
		]),
	),
};

// Define variants structure using badge-specific variants
const badgeVariantsDefinition = {
	variants: {
		variant: badgeVariantStyles,
		size: {
			xs: "px-1.5 py-0.5 text-xs",
			sm: "px-2 py-0.5 text-xs",
			base: "px-2 py-1 text-sm",
			lg: "px-3 py-2 text-sm",
		},
		border: {
			true: "ring-1 ring-inset ring-current/10",
			false: "",
		},
		rounded: {
			true: extendedBorderRadiusVariants.full,
			false: borderRadiusVariants.base,
		},
	},
	defaultVariants: {
		variant: "default",
		size: "base",
		border: false,
		rounded: false,
	},
} as const;

// Update badge variants to handle dismiss button padding like Tag does
export const badgeVariants = tv({
	base: cx(
		"inline-flex items-center gap-x-1.5 whitespace-nowrap",
		borderRadiusVariants.base,
	),
	...badgeVariantsDefinition,
	compoundVariants: [
		// Adjust right padding when dismiss button is present
		{
			size: "xs",
			class: "has-[button]:pr-0.5",
		},
		{
			size: "sm",
			class: "has-[button]:pr-1",
		},
		{
			size: "base",
			class: "has-[button]:pr-1",
		},
		{
			size: "lg",
			class: "has-[button]:pr-1.5",
		},
		// Add extra horizontal padding for rounded badges to prevent cramped appearance
		{
			rounded: true,
			size: "xs",
			class: "px-2",
		},
		{
			rounded: true,
			size: "sm",
			class: "px-2.5",
		},
		{
			rounded: true,
			size: "base",
			class: "px-3",
		},
		{
			rounded: true,
			size: "lg",
			class: "px-3.5",
		},
		// When rounded AND has dismiss button, adjust right padding accordingly
		{
			rounded: true,
			size: "xs",
			class: "has-[button]:pr-1",
		},
		{
			rounded: true,
			size: "sm",
			class: "has-[button]:pr-1.5",
		},
		{
			rounded: true,
			size: "base",
			class: "has-[button]:pr-1.5",
		},
		{
			rounded: true,
			size: "lg",
			class: "has-[button]:pr-2",
		},
		// Adjust left padding when badge has left icon (reduces padding to prevent spacious appearance)
		{
			rounded: true,
			size: "xs",
			class: "has-[svg:first-child]:pl-1.5",
		},
		{
			rounded: true,
			size: "sm",
			class: "has-[svg:first-child]:pl-2",
		},
		{
			rounded: true,
			size: "base",
			class: "has-[svg:first-child]:pl-2.5",
		},
		{
			rounded: true,
			size: "lg",
			class: "has-[svg:first-child]:pl-3",
		},
		// Adjust right padding when badge has right icon (reduces padding to prevent spacious appearance)
		{
			rounded: true,
			size: "xs",
			class: "has-[svg:last-child]:pr-1.5",
		},
		{
			rounded: true,
			size: "sm",
			class: "has-[svg:last-child]:pr-2",
		},
		{
			rounded: true,
			size: "base",
			class: "has-[svg:last-child]:pr-2.5",
		},
		{
			rounded: true,
			size: "lg",
			class: "has-[svg:last-child]:pr-3",
		},
	],
});

// Map badge sizes to icon sizes
export const badgeToIconSizeMap = {
	xs: "xs",
	sm: "xs",
	base: "sm",
	lg: "base",
} as const;

// Inline Dot functionality for Badge
export const dotIndicatorVariants = tv({
	base: ["relative rounded-full", "flex-shrink-0"],
	variants: {
		size: {
			sm: "w-1.5 h-1.5",
			default: "w-2 h-2",
			lg: "w-2.5 h-2.5",
		},
		animated: {
			true: "animate-pulse before:absolute before:inset-0 before:rounded-full before:animate-ping before:opacity-75",
			false: "",
		},
	},
	defaultVariants: {
		size: "default",
		animated: false,
	},
});
