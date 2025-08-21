import { tv } from "tailwind-variants";
import { borderRadiusVariants } from "../../presentation/border-radius-variants";
import { containerButtonAdjustments } from "../../presentation/container-button-adjustments";
import { focusRing } from "@patternmode/styles/presentation/focus-ring";

export const tabsVariants = tv({
	slots: {
		root: "relative",
		list: [
			// base
			"relative",
		],
		tab: [
			// base
			"group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-150 ease-in-out",
			// cursor
			"cursor-pointer",
			// text color
			"text-zinc-600 dark:text-zinc-400",
			// hover
			"hover:text-zinc-900 dark:hover:text-zinc-100",
			// disabled
			"disabled:pointer-events-none disabled:text-zinc-400 dark:disabled:text-zinc-600",
			// focus
			focusRing,
		],
		indicator: [
			// base
			"absolute transition-all duration-200 ease-in-out",
			// line indicator - bottom line that sits on the divider
			"-bottom-px left-0 h-px w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] z-10",
			"bg-zinc-900 dark:bg-zinc-50",
		],
		panel: [
			// base
			"outline-hidden",
		],
	},
	variants: {
		variant: {
			line: {
				// Full-width, block-level list with bottom border
				list: "flex w-full border-b border-zinc-200 dark:border-zinc-700",
				tab: "border-b-2 border-transparent data-[selected]:border-zinc-900 data-[selected]:text-zinc-900 dark:data-[selected]:border-zinc-50 dark:data-[selected]:text-zinc-50",
			},
			solid: {
				list: [
					// base
					"inline-flex items-stretch border p-0.5",
					// colors
					"bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700",
				],
				tab: [
					// base
					"flex items-center justify-center text-sm font-medium select-none transition-all duration-100 ease-in-out",
					// colors
					"text-zinc-600 dark:text-zinc-400",
					// hover
					"hover:bg-zinc-100 dark:hover:bg-zinc-700",
					// selected
					"data-[selected]:bg-transparent data-[selected]:text-zinc-900 dark:data-[selected]:bg-transparent dark:data-[selected]:text-zinc-100",
					// disabled
					"disabled:pointer-events-none disabled:opacity-50",
					// focus
					focusRing,
					"focus-visible:bg-none focus-visible:-outline-offset-1",
				],
				indicator: [
					// base - grey block indicator that follows the tab
					"absolute transition-all duration-200 ease-in-out delay-75",
					"bottom-0.5 left-0.5 h-[calc(100%-4px)] w-[var(--active-tab-width)] translate-x-[calc(var(--active-tab-left)-1px)] z-0",
					"bg-zinc-100 dark:bg-zinc-700",
					// rounded corners to match the container
					"rounded-[calc(theme(borderRadius.lg)-2px)]",
				],
			},
		},
		size: {
			"2xs": {
				list: "gap-x-1.5",
				tab: "",
			},
			xs: {
				list: "gap-x-2", // very tight spacing for line variant
				tab: "", // very small height and text size for line variant only
			},
			sm: {
				list: "gap-x-3", // tighter spacing for line variant
				tab: "", // smaller height and text size for line variant only
			},
			base: {
				list: "gap-x-4", // spacing for line variant
				tab: "", // height and text size for line variant only
			},
			lg: {
				list: "gap-x-6", // wider spacing for line variant
				tab: "", // larger height and text size for line variant only
			},
		},
		hideDivider: {
			true: {},
		},
		hideBorder: {
			true: {},
		},
	},
	compoundVariants: [
		// Size adjustments for solid variant - override gap with padding
		{
			variant: "solid",
			size: "2xs",
			class: {
				list: [
					`gap-x-0 p-0.5 ${borderRadiusVariants.xs}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.xs,
				],
				indicator: ["rounded-[calc(theme(borderRadius.sm)-2px)]"],
			},
		},
		{
			variant: "solid",
			size: "xs",
			class: {
				list: [
					`gap-x-0 p-0.5 ${borderRadiusVariants.xs}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.xs,
				],
				indicator: ["rounded-[calc(theme(borderRadius.sm)-2px)]"],
			},
		},
		{
			variant: "solid",
			size: "sm",
			class: {
				list: [
					`gap-x-0 p-0.5 ${borderRadiusVariants.sm}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.sm,
				],
				indicator: ["rounded-[calc(theme(borderRadius.DEFAULT)-2px)]"],
			},
		},
		{
			variant: "solid",
			size: "base",
			class: {
				list: [
					`gap-x-0 p-0.5 ${borderRadiusVariants.base}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.base,
				],
				indicator: ["rounded-[calc(theme(borderRadius.md)-2px)]"],
			},
		},
		{
			variant: "solid",
			size: "lg",
			class: {
				list: [
					`gap-x-0 p-0.5 ${borderRadiusVariants.lg}`,
					// Use centralized button adjustments
					...containerButtonAdjustments.lg,
				],
				indicator: ["rounded-[calc(theme(borderRadius.lg)-2px)]"],
			},
		},
		{
			variant: "line",
			hideDivider: true,
			class: {
				list: "border-b-0",
			},
		},
		{
			variant: "line",
			hideBorder: true,
			class: {
				indicator: "hidden",
			},
		},
	],
	defaultVariants: {
		variant: "line",
		size: "base",
		hideDivider: false,
		hideBorder: false,
	},
});
