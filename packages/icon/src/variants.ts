import { tv } from "tailwind-variants";

export const iconVariants = tv({
	base: "shrink-0",
	variants: {
		size: {
			xs: "size-3.5",
			sm: "size-4",
			base: "size-4",
			lg: "size-5",
			xl: "size-6",
			"2xl": "size-7",
			"3xl": "size-8",
		},
	},
	defaultVariants: {
		size: "base",
	},
});
