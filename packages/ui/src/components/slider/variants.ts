import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const sliderVariants = tv({
	slots: {
		root: [
			// base
			"relative flex cursor-pointer touch-none select-none",
			// orientation
			"data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
			"data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
			// disabled
			"data-[disabled]:pointer-events-none",
		],
		control: [
			// base
			"relative w-full h-full flex items-center",
			// orientation
			"data-[orientation='horizontal']:w-full",
			"data-[orientation='vertical']:h-full data-[orientation='vertical']:flex-col",
		],
		track: [
			// base
			"relative grow rounded-full bg-zinc-200 dark:bg-zinc-800",
			// orientation
			"data-[orientation='horizontal']:h-1.5 data-[orientation='horizontal']:w-full",
			"data-[orientation='vertical']:h-full data-[orientation='vertical']:w-1.5",
		],
		indicator: [
			// base
			"absolute rounded-full bg-blue-500 dark:bg-blue-500",
			// orientation
			"data-[orientation='horizontal']:h-full",
			"data-[orientation='vertical']:w-full",
			// disabled
			"data-[disabled]:bg-zinc-300 dark:data-[disabled]:bg-zinc-700",
		],
		thumb: [
			// base
			"block size-4 shrink-0 rounded-full border shadow-sm",
			// border color
			"border-zinc-400 dark:border-zinc-500",
			// background color
			"bg-white dark:bg-white",
			// disabled
			"data-[disabled]:pointer-events-none data-[disabled]:bg-zinc-200 dark:data-[disabled]:border-zinc-800 dark:data-[disabled]:bg-zinc-600",
			// focus
			focusRing,
			"outline-offset-0",
		],
		value: [
			// base
			"text-sm font-medium text-zinc-900 dark:text-zinc-50",
			// spacing
			"mb-2",
		],
	},
});
