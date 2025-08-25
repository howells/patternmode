import { tv } from "tailwind-variants";

export const textareaStyles = tv({
	base: ["w-full resize-none rounded-md border"],
	variants: {
		size: {
			xs: "text-xs py-1 px-2",
			sm: "text-xs py-1.5 px-2.5",
			base: "text-sm py-2 px-3",
			lg: "text-base py-2.5 px-4",
		},
		fullWidth: { true: "w-full max-w-none", false: "max-w-sm" },
	},
	defaultVariants: { size: "base", fullWidth: false },
});
