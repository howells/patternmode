import { tv } from "tailwind-variants";

export const listVariants = tv({
	base: "list-none space-y-1",
	variants: {
		variant: {
			marker:
				"list-disc list-inside marker:text-zinc-400 dark:marker:text-zinc-500",
			plain: "",
		},
		align: {
			start: "items-start",
			center: "items-center",
			end: "items-end",
		},
	},
	defaultVariants: {
		variant: "marker",
		align: "start",
	},
});

export const listItemVariants = tv({
	base: "text-zinc-700 dark:text-zinc-300",
	variants: {
		variant: {
			marker: "",
			plain: "flex gap-2",
		},
		align: {
			start: "items-start",
			center: "items-center",
			end: "items-end",
		},
	},
	defaultVariants: {
		variant: "marker",
		align: "start",
	},
});

export const indicatorVariants = tv({
	base: "shrink-0",
	variants: {
		variant: {
			marker: "hidden",
			plain: "block",
		},
	},
	defaultVariants: {
		variant: "marker",
	},
});
