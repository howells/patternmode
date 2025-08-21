import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";
import { borderRadiusVariants } from "../../presentation/border-radius-variants";

/**
 * Style variants for radio components.
 *
 * Provides consistent styling for radio buttons including sizing,
 * colors, states, and accessibility features.
 */
export const radioVariants = tv({
	slots: {
		root: "group relative inline-flex items-center",
		circle: [
			"relative flex shrink-0 items-center justify-center border-2 transition-all duration-150 ease-in-out",
			"border-zinc-300 dark:border-zinc-600",
			"bg-white dark:bg-zinc-950",
			focusRing,
			"disabled:pointer-events-none",
		],
		dot: [
			"absolute transition-all duration-150 ease-in-out",
			"bg-white dark:bg-zinc-50",
			"group-data-[disabled]:bg-zinc-100 dark:group-data-[disabled]:bg-zinc-800",
		],
	},
	variants: {
		size: {
			"2xs": {
				circle: `size-2.5 ${borderRadiusVariants.xs}`,
				dot: "size-1",
			},
			xs: {
				circle: `size-3 ${borderRadiusVariants.xs}`,
				dot: "size-1",
			},
			sm: {
				circle: `size-3.5 ${borderRadiusVariants.sm}`,
				dot: "size-1.5",
			},
			base: {
				circle: `size-4 ${borderRadiusVariants.base}`,
				dot: "size-2",
			},
			lg: {
				circle: `size-5 ${borderRadiusVariants.lg}`,
				dot: "size-2.5",
			},
		},
		variant: {
			default: {
				circle:
					"group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400 dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
				dot: "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
			},
			card: {
				circle:
					"group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400 dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
				dot: "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
			},
		},
	},
	defaultVariants: {
		size: "base",
		variant: "default",
	},
});

/**
 * Style variants for radio label components.
 *
 * Provides consistent styling for labels including text sizing,
 * spacing, and disabled states.
 */
export const radioLabelVariants = tv({
	base: [
		// base
		"flex items-center gap-2 cursor-pointer",
		// text
		"text-sm font-medium text-zinc-900 dark:text-zinc-50",
		// disabled
		"has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:text-zinc-400 dark:has-[[data-disabled]]:text-zinc-600",
	],
	variants: {
		size: {
			"2xs": "gap-1 text-[11px]",
			xs: "gap-1 text-xs",
			sm: "gap-1.5 text-xs",
			base: "gap-2 text-sm",
			lg: "gap-2.5 text-base",
		},
	},
	defaultVariants: {
		size: "base",
	},
});

/**
 * Style variants for radio card components.
 *
 * Provides enhanced card-based styling for radio options with
 * borders, backgrounds, focus states, and responsive sizing.
 */
export const radioCardVariants = tv({
	base: [
		// base
		"group relative w-full border p-4 text-left transition cursor-pointer",
		// background color
		"bg-white dark:bg-zinc-950",
		// border color
		"dark:border-zinc-800",
		// checked
		"data-[checked]:border-blue-500 dark:data-[checked]:border-blue-500",
		// disabled
		"data-[disabled]:border-zinc-100 dark:data-[disabled]:border-zinc-800",
		"data-[disabled]:bg-zinc-50 data-[disabled]:shadow-none dark:data-[disabled]:bg-zinc-900",
		"data-[disabled]:cursor-not-allowed",
		// focus
		"focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
	],
	variants: {
		size: {
			xs: `p-2 ${borderRadiusVariants.xs}`,
			sm: `p-3 ${borderRadiusVariants.sm}`,
			base: `p-4 ${borderRadiusVariants.base}`,
			lg: `p-5 ${borderRadiusVariants.lg}`,
		},
	},
	defaultVariants: {
		size: "base",
	},
});

/**
 * Style variants for radio group components.
 *
 * Provides layout and spacing control for radio button groups
 * including orientation and gap management.
 */
export const radioGroupVariants = tv({
	base: [
		// base
		"grid gap-2",
	],
	variants: {
		/**
		 * Layout orientation of radio items.
		 */
		orientation: {
			vertical: "grid-cols-1",
			horizontal: "grid-flow-col auto-cols-max gap-4",
		},
		/**
		 * Spacing size between radio items.
		 */
		size: {
			sm: "gap-1.5",
			md: "gap-2",
			lg: "gap-3",
		},
	},
	defaultVariants: {
		orientation: "vertical",
		size: "md",
	},
});
