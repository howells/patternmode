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
	base: "relative",
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
		withHeading: {
			true: "text-zinc-600 dark:text-zinc-300",
			false: "text-zinc-900 dark:text-zinc-100",
		},
	},
	defaultVariants: {
		variant: "marker",
		align: "start",
		withHeading: false,
	},
});

export const indicatorVariants = tv({
	base: "shrink-0 absolute",
	variants: {
		variant: {
			marker: "",
			plain: "",
		},
		withIcon: {
			true: "-left-6 top-0.5",
			false: "-left-4.5 top-1.5",
		},
	},
	defaultVariants: {
		variant: "marker",
		withIcon: false,
	},
});
