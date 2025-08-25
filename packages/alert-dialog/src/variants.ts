import { tv } from "tailwind-variants";

export const alertDialogTriggerVariants = tv({
	base: [
		"inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium transition-colors",
		"hover:bg-zinc-50 hover:text-zinc-900",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
		"disabled:pointer-events-none disabled:opacity-50",
		"dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
	],
});

export const alertDialogBackdropVariants = tv({
	base: [
		"fixed inset-0 z-50 bg-black/50 transition-all duration-150",
		"data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
		"dark:bg-black/70",
	],
});

export const alertDialogContentVariants = tv({
	base: [
		"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 rounded-lg",
		"data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
		"data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
		"dark:border-zinc-800 dark:bg-zinc-950",
	],
});

export const alertDialogHeaderVariants = tv({
	base: "flex flex-col space-y-2 text-center sm:text-left",
});

export const alertDialogFooterVariants = tv({
	base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
});

export const alertDialogCancelVariants = tv({
	base: "mt-2 sm:mt-0",
});
