import { tv } from "tailwind-variants";
import { borderRing } from "../../utils/src/border-ring";

export const cardVariants = tv({
	base: [
		...borderRing,
		"relative w-full rounded-xl",
		"bg-white dark:bg-[#090E1A]",
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
