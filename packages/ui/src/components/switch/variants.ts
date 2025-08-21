import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const switchVariants = tv({
	slots: {
		root: [
			// base
			"group relative isolate inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-inner outline-hidden ring-1 ring-inset transition-all",
			"bg-zinc-200 dark:bg-zinc-950",
			// ring color
			"ring-black/5 dark:ring-zinc-800",
			// checked
			"data-[checked]:bg-blue-500 dark:data-[checked]:bg-blue-500",
			// disabled
			"data-[disabled]:cursor-default",
			// disabled checked
			"data-[disabled]:data-[checked]:bg-blue-200",
			"data-[disabled]:data-[checked]:ring-zinc-300",
			// disabled checked dark
			"dark:data-[disabled]:data-[checked]:ring-zinc-900",
			"dark:data-[disabled]:data-[checked]:bg-blue-900",
			// disabled unchecked
			"data-[disabled]:data-[unchecked]:ring-zinc-300",
			"data-[disabled]:data-[unchecked]:bg-zinc-100",
			// disabled unchecked dark
			"dark:data-[disabled]:data-[unchecked]:ring-zinc-700",
			"dark:data-[disabled]:data-[unchecked]:bg-zinc-800",
			focusRing,
		],
		thumb: [
			// base
			"pointer-events-none relative inline-block transform appearance-none rounded-full border-none shadow-lg outline-hidden transition-all duration-150 ease-in-out focus:border-none focus:outline-hidden focus:outline-transparent",
			// background color
			"bg-white dark:bg-zinc-50",
			// disabled
			"group-data-[disabled]:shadow-none",
			"group-data-[disabled]:bg-zinc-50 dark:group-data-[disabled]:bg-zinc-500",
		],
	},
	variants: {
		size: {
			xs: {
				root: "h-3.5 w-6",
				thumb:
					"h-2.5 w-2.5 data-[checked]:translate-x-2.5 data-[unchecked]:translate-x-0",
			},
			sm: {
				root: "h-4 w-7",
				thumb:
					"h-3 w-3 data-[checked]:translate-x-3 data-[unchecked]:translate-x-0",
			},
			base: {
				root: "h-5 w-9",
				thumb:
					"h-4 w-4 data-[checked]:translate-x-4 data-[unchecked]:translate-x-0",
			},
			lg: {
				root: "h-6 w-11",
				thumb:
					"h-5 w-5 data-[checked]:translate-x-5 data-[unchecked]:translate-x-0",
			},
		},
	},
	defaultVariants: {
		size: "base",
	},
});
