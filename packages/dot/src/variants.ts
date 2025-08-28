import { tv } from "tailwind-variants";

export const dotVariants = tv({
	base: "inline-flex items-center gap-2 text-sm",
	variants: {
		size: {
			sm: "text-xs",
			default: "text-sm",
			lg: "text-base",
		},
	},
	defaultVariants: { size: "default" },
});

export const dotIndicatorVariants = tv({
	base: ["relative rounded-full", "flex-shrink-0"],
	variants: {
		size: { sm: "w-1.5 h-1.5", default: "w-2 h-2", lg: "w-2.5 h-2.5" },
		animated: {
			true: "animate-pulse before:absolute before:inset-0 before:rounded-full before:animate-ping before:opacity-75",
			false: "",
		},
	},
	defaultVariants: { size: "default", animated: false },
});
