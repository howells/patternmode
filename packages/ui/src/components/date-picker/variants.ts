import { tv } from "tailwind-variants";

import { focusInput } from "../../presentation/focus-input";
import { hasErrorInput } from "../../presentation/has-error-input";

export const triggerStyles = tv({
	base: [
		// base
		"peer flex w-full cursor-pointer appearance-none items-center gap-x-2 truncate rounded-md border px-3 py-2  outline-hidden transition-all sm:text-sm",
		// background color
		"bg-white dark:bg-zinc-950",
		// border color
		" dark:border-zinc-800",
		// text color
		"text-zinc-900 dark:text-zinc-50",
		// placeholder color
		"placeholder-zinc-400 dark:placeholder-zinc-500",
		// hover
		"hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
		// disabled
		"disabled:pointer-events-none",
		"disabled:bg-zinc-100 disabled:text-zinc-400",
		"dark:disabled:border-zinc-800 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
		// focus
		focusInput,
	],
	variants: {
		hasError: {
			true: hasErrorInput,
		},
	},
});
