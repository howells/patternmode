import { tv } from "tailwind-variants";

export const iconContainerVariants = tv({
	base: "rounded-lg flex items-center justify-center shrink-0",
	variants: {
		size: {
			sm: "w-8 h-8",
			base: "w-10 h-10",
			lg: "w-12 h-12",
			xl: "w-16 h-16",
		},
		variant: {
			default: "bg-blue-100 dark:bg-blue-900/20",
			neutral: "bg-zinc-100 dark:bg-zinc-900/20",
			success: "bg-emerald-100 dark:bg-emerald-900/20",
			info: "bg-sky-100 dark:bg-sky-900/20",
			warning: "bg-amber-100 dark:bg-amber-900/20",
			error: "bg-red-100 dark:bg-red-900/20",
			critical: "bg-rose-100 dark:bg-rose-900/20",
			positive: "bg-teal-100 dark:bg-teal-900/20",
			negative: "bg-rose-100 dark:bg-rose-900/20",
		},
	},
	defaultVariants: {
		size: "base",
		variant: "neutral",
	},
});
