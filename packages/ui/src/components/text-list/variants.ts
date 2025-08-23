import { tv } from "tailwind-variants";

export const listVariants = tv({
	base: "space-y-1 text-sm",
	variants: {
		variant: {
			marker: "list-none pl-0",
			plain: "list-none pl-0",
		},
		align: {
			start: "text-left",
			center: "text-center",
			end: "text-right",
		},
	},
	defaultVariants: {
		variant: "marker",
		align: "start",
	},
});

export const listItemVariants = tv({
	base: "text-zinc-700 dark:text-zinc-300 relative pl-6",
	variants: {
		variant: {
			marker: "",
			plain: "",
		},
		align: {
			start: "text-left",
			center: "text-center",
			end: "text-right",
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
			marker: "absolute left-0 top-1",
			plain: "absolute left-0 top-1",
		},
	},
	defaultVariants: {
		variant: "marker",
	},
});
