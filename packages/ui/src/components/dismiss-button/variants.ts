import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const dismissButtonVariants = tv({
	base: [
		// Base button styling
		"flex items-center justify-center rounded-full transition-colors",
		// Inherit text color from parent
		"text-current",
		// Hover states with current color
		"hover:bg-current/10 hover:text-current",
		// Focus states
		focusRing,
	],
	variants: {
		size: {
			xs: "size-3.5",
			sm: "size-4",
			base: "size-5",
			lg: "size-6",
		},
	},
	defaultVariants: {
		size: "base",
	},
});
