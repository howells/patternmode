import { tv } from "tailwind-variants";

export const avatarVariants = tv({
	base: [
		// Basic layout - using CSS Grid like Catalyst for better layering
		"inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1",
		// Semi-transparent inset ring for better visual definition
		"inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15",
	],
	variants: {
		size: {
			"2xs": "size-4", // 16px - for very compact UI, inline elements
			xs: "size-control-xs", // 28px - aligns with control system for form contexts
			sm: "size-control-sm", // 36px - aligns with control system for form contexts
			base: "size-control-base", // 40px - aligns with control system for form contexts
			lg: "size-control-lg", // 48px - aligns with control system for form contexts
			xl: "size-16", // 64px - for profile pages, large display
			"2xl": "size-20", // 80px - for hero sections, main profiles
			"3xl": "size-24", // 96px - for very large display contexts
		},
		square: {
			true: "rounded-[--avatar-radius] *:rounded-[--avatar-radius]",
			false: "rounded-full *:rounded-full",
		},
	},
	defaultVariants: {
		size: "base",
		square: false,
	},
});
