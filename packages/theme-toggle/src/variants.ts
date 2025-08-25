import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";
import { componentVariants } from "@patternmode/config/variants";
import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";
import { borderRadiusVariantsWithFull as extendedBorderRadiusVariants } from "@patternmode/utils/border-radius-variants-with-full";

export const themeToggleVariants = tv({
	base: [
		// base
		"relative inline-flex items-center justify-center whitespace-nowrap text-sm outline-hidden",
		// cursor
		"cursor-pointer",
		// border
		"border border-transparent",
		// background transition
		"transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
		// disabled
		"disabled:pointer-events-none disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
		// focus
		focusRing,
		// icon transition
		"[&>svg]:transition-transform [&>svg]:duration-200",
	],
	variants: {
		variant: componentVariants.button,
		rounded: {
			true: extendedBorderRadiusVariants.full,
			false: borderRadiusVariants.base,
		},
		size: {
			"2xs": "size-control-2xs",
			xs: "size-control-xs",
			sm: "size-control-sm",
			base: "size-control-base",
			lg: "size-control-lg",
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "base",
		rounded: false,
	},
});
