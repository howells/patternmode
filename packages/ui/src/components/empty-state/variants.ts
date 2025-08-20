import { tv } from "tailwind-variants";

export const emptyStateVariants = tv({
	base: [
		// Base styles
		"flex flex-col items-center justify-center text-center",
		// Max width
		"max-w-md mx-auto",
	],
	variants: {
		size: {
			"2xs": "gap-1.5 py-4 px-2",
			xs: "gap-2 py-6 px-3",
			sm: "gap-3 py-8 px-4",
			base: "gap-4 py-12 px-6",
			lg: "gap-6 py-16 px-12",
		},
	},
	defaultVariants: {
		size: "base",
	},
});

export const emptyStateContentVariants = tv({
	base: "space-y-2",
});

export const emptyStateActionsVariants = tv({
	base: "flex flex-col items-center",
	variants: {
		size: {
			"2xs": "gap-1 mt-1",
			xs: "gap-1 mt-1",
			sm: "gap-2 mt-2",
			base: "gap-3 mt-4",
			lg: "gap-4 mt-6",
		},
		hasMultipleActions: {
			true: "sm:flex-row sm:gap-3",
			false: "",
		},
	},
	defaultVariants: {
		size: "base",
		hasMultipleActions: false,
	},
});
