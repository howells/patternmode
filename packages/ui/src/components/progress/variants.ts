import { tv } from "tailwind-variants";

import {
	progressAnimationClasses,
	progressLabelVariants,
	progressValueVariants,
	sharedProgressVariants,
} from "../progress-utils";

/**
 * Tailwind variants for progress components.
 *
 * Defines styling slots for different parts of the progress indicator
 * with variants for colors and animation states.
 */
export const progressVariants = tv({
	slots: {
		/**
		 * Root container with horizontal layout.
		 */
		root: "flex w-full items-center",
		/**
		 * Track background container.
		 */
		track: "relative flex h-1.5 w-full items-center rounded-full",
		/**
		 * Progress indicator fill.
		 */
		indicator: "h-full flex-col rounded-full",
		/**
		 * Label text styling.
		 */
		label: [progressLabelVariants.base, "ml-2 whitespace-nowrap"],
		/**
		 * Value text styling.
		 */
		value: [progressValueVariants.base, "ml-2 whitespace-nowrap"],
	},
	variants: {
		variant: {
			/**
			 * Default blue color scheme.
			 */
			default: {
				track: `bg-${sharedProgressVariants.default.lightBg} dark:bg-${sharedProgressVariants.default.darkBg}`,
				indicator: `bg-${sharedProgressVariants.default.light} dark:bg-${sharedProgressVariants.default.dark}`,
			},
			/**
			 * Neutral gray color scheme.
			 */
			neutral: {
				track: `bg-${sharedProgressVariants.neutral.lightBg} dark:bg-${sharedProgressVariants.neutral.darkBg}`,
				indicator: `bg-${sharedProgressVariants.neutral.light} dark:bg-${sharedProgressVariants.neutral.dark}`,
			},
			/**
			 * Warning yellow/orange color scheme.
			 */
			warning: {
				track: `bg-${sharedProgressVariants.warning.lightBg} dark:bg-${sharedProgressVariants.warning.darkBg}`,
				indicator: `bg-${sharedProgressVariants.warning.light} dark:bg-${sharedProgressVariants.warning.dark}`,
			},
			/**
			 * Error red color scheme.
			 */
			error: {
				track: `bg-${sharedProgressVariants.error.lightBg} dark:bg-${sharedProgressVariants.error.darkBg}`,
				indicator: `bg-${sharedProgressVariants.error.light} dark:bg-${sharedProgressVariants.error.dark}`,
			},
			/**
			 * Success green color scheme.
			 */
			success: {
				track: `bg-${sharedProgressVariants.success.lightBg} dark:bg-${sharedProgressVariants.success.darkBg}`,
				indicator: `bg-${sharedProgressVariants.success.light} dark:bg-${sharedProgressVariants.success.dark}`,
			},
		},
		/**
		 * Animation state variants.
		 */
		animated: {
			true: {
				indicator: progressAnimationClasses.enabled,
			},
			false: {},
		},
	},
	defaultVariants: {
		variant: "default",
		animated: false,
	},
});
