import { tv } from "tailwind-variants";

export const cardVariants = tv({
	base: [
		"relative w-full rounded-xl",
		"bg-white dark:bg-[#090E1A]",
		"border border-zinc-100 dark:border-zinc-800",
		"shadow-2xs dark:shadow-none",
	].join(" "),
	variants: {
		variant: {
			default: "",
			dashed: "border border-dashed bg-transparent",
		},
		fillHeight: {
			true: "h-full",
		},
	},
});
