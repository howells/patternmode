import { tv } from "tailwind-variants";
import { focusRing } from "../../presentation/focus-ring";

export const checkboxVariants = tv({
	base: [
		// base
		"relative inline-flex size-4 shrink-0 appearance-none items-center justify-center rounded-sm  outline-hidden ring-1 ring-inset transition duration-100 enabled:cursor-pointer",
		// text color
		"text-white dark:text-zinc-50",
		// background color
		"bg-white dark:bg-zinc-950",
		// ring color
		"ring-zinc-300 dark:ring-zinc-800",
		// disabled
		"data-disabled:bg-zinc-100 data-disabled:text-zinc-400 data-disabled:ring-zinc-300",
		"dark:data-disabled:bg-zinc-800 dark:data-disabled:text-zinc-500 dark:data-disabled:ring-zinc-700",
		// checked and enabled - Base UI uses data-checked instead of data-[state=checked]
		"enabled:data-checked:bg-blue-500 enabled:data-checked:ring-0 enabled:data-checked:ring-transparent",
		// indeterminate - Base UI has data-indeterminate attribute
		"enabled:data-[indeterminate]:bg-blue-500 enabled:data-[indeterminate]:ring-0 enabled:data-[indeterminate]:ring-transparent",
		// focus
		focusRing,
	],
});

export const checkboxIndicatorVariants = tv({
	base: "flex size-full items-center justify-center",
});
