import { tv } from "tailwind-variants";

export const checkboxVariants = tv({
	base: [
		"peer inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border",
		"transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
		"border-zinc-300 dark:border-zinc-700",
		"data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
	],
});

export const checkboxIndicatorVariants = tv({
	base: ["flex items-center justify-center text-current"],
});
