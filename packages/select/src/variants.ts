import { formControlElementVariants } from "@patternmode/constants/form-control-variants";
import { tv } from "tailwind-variants";

export const selectPopoverVariants = tv({
	slots: {
		base: "z-50 min-w-[var(--anchor-width)] max-h-[var(--available-height)] overflow-y-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-popover-foreground",
	},
	variants: {
		size: {
			xs: "w-[--anchor-width]",
			sm: "w-[--anchor-width]",
			base: "w-[--anchor-width]",
			lg: "w-[--anchor-width]",
		},
	},
});

export const selectItemVariants = tv({
	base: [
		"relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
		"bg-white dark:bg-zinc-950",
		"hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
		"focus:bg-zinc-100 focus:text-zinc-900 dark:focus:bg-zinc-800 dark:focus:text-zinc-100",
		"data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-100",
	],
	variants: {
		size: {
			xs: "px-2 py-1 text-xs",
			sm: "px-2 py-1.5 text-sm",
			base: "px-2 py-1.5 text-sm",
			lg: "px-3 py-2 text-base",
		},
	},
	defaultVariants: { size: "base" },
});

export const selectTriggerVariants = tv({
	extend: formControlElementVariants,
	base: [
		"flex w-full items-center justify-between",
		"rounded-md border border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800",
	],
	defaultVariants: { size: "base", variant: "standalone" },
});
