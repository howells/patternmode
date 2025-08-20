import { tv } from "tailwind-variants";
import { borderRadiusVariants } from "../../presentation/border-radius-variants";
import { containerButtonAdjustments } from "../../presentation/container-button-adjustments";
import { focusRing } from "../../presentation/focus-ring";

export const toggleGroupVariants = tv({
	slots: {
		root: [
			// base
			"flex gap-px border p-0.5",
			// colors
			"bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700",
		],
		item: [
			// base
			"flex items-center justify-center text-sm font-medium select-none transition-all duration-100 ease-in-out",
			// colors
			"text-zinc-600 dark:text-zinc-400",
			// hover
			"hover:bg-zinc-100 dark:hover:bg-zinc-700",
			// active
			"active:bg-zinc-200 dark:active:bg-zinc-600",
			// pressed
			"data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
			// disabled
			"disabled:pointer-events-none disabled:opacity-50",
			// focus
			focusRing,
			"focus-visible:bg-none focus-visible:-outline-offset-1",
		],
	},
	variants: {
		variant: {
			default: {
				root: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700",
				item: "",
			},
			outline: {
				root: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600",
				item: "border border-transparent data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
			},
			ghost: {
				root: "border-transparent bg-transparent",
				item: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
			},
		},
		size: {
			"2xs": {
				root: [
					`gap-0.5 p-0.5 ${borderRadiusVariants.xs}`,
					...containerButtonAdjustments.xs,
				],
				item: `h-3.5 px-1 text-[11px] ${borderRadiusVariants.xs}`,
			},
			xs: {
				root: [
					`gap-0.5 p-0.5 ${borderRadiusVariants.xs}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.xs,
				],
				item: `h-4 px-1 text-xs ${borderRadiusVariants.xs}`, // Extra small size
			},
			sm: {
				root: [
					`gap-0.5 p-0.5 ${borderRadiusVariants.sm}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.sm,
				],
				item: `h-6 px-2 text-xs ${borderRadiusVariants.sm}`, // Match button sm: py-1.5 px-2.5 text-xs but adjusted for toggle
			},
			base: {
				root: [
					`gap-px p-0.5 ${borderRadiusVariants.base}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.base,
				],
				item: `h-8 px-3 text-sm ${borderRadiusVariants.base}`, // Match button base: py-2 px-3 text-sm
			},
			lg: {
				root: [
					`gap-1 p-1 ${borderRadiusVariants.lg}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.lg,
				],
				item: `h-10 px-4 text-base ${borderRadiusVariants.lg}`, // Match button lg: py-2.5 px-4 text-base
			},
		},
		orientation: {
			horizontal: {
				root: "flex-row",
			},
			vertical: {
				root: "flex-col",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "base",
		orientation: "horizontal",
	},
});
