import { tv } from "tailwind-variants";

import {
  progressAnimationClasses,
  progressLabelVariants,
  progressValueVariants,
  sharedProgressVariants,
} from "../progress-utils";

/**
 * Tailwind variants for the progress circle component.
 *
 * Defines styling slots for different parts of the circular progress indicator
 * with variants for colors, animation states, and sizes.
 */
export const progressCircleVariants = tv({
  slots: {
    /**
     * Root container with relative positioning.
     */
    root: "relative",
    /**
     * SVG element rotated to start progress from top.
     */
    svg: "-rotate-90 transform",
    /**
     * Background track circle.
     */
    track: "transition-colors ease-linear",
    /**
     * Progress indicator circle.
     */
    indicator: "transition-colors ease-linear",
    /**
     * Content overlay area.
     */
    content: "absolute inset-0 flex items-center justify-center",
    /**
     * Label text styling.
     */
    label: progressLabelVariants.base,
    /**
     * Value text styling.
     */
    value: progressValueVariants.base,
  },
  variants: {
    variant: {
      /**
       * Default blue color scheme.
       */
      default: {
        track: `stroke-${sharedProgressVariants.default.lightBg} dark:stroke-${sharedProgressVariants.default.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.default.light} dark:stroke-${sharedProgressVariants.default.dark}`,
      },
      /**
       * Neutral gray color scheme.
       */
      neutral: {
        track: `stroke-${sharedProgressVariants.neutral.lightBg} dark:stroke-${sharedProgressVariants.neutral.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.neutral.light} dark:stroke-${sharedProgressVariants.neutral.dark}`,
      },
      /**
       * Warning yellow/orange color scheme.
       */
      warning: {
        track: `stroke-${sharedProgressVariants.warning.lightBg} dark:stroke-${sharedProgressVariants.warning.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.warning.light} dark:stroke-${sharedProgressVariants.warning.dark}`,
      },
      /**
       * Error red color scheme.
       */
      error: {
        track: `stroke-${sharedProgressVariants.error.lightBg} dark:stroke-${sharedProgressVariants.error.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.error.light} dark:stroke-${sharedProgressVariants.error.dark}`,
      },
      /**
       * Success green color scheme.
       */
      success: {
        track: `stroke-${sharedProgressVariants.success.lightBg} dark:stroke-${sharedProgressVariants.success.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.success.light} dark:stroke-${sharedProgressVariants.success.dark}`,
      },
    },
    showAnimation: {
      /**
       * Smooth progress animation enabled.
       */
      true: {
        indicator: progressAnimationClasses.enabled,
      },
      /**
       * No animation, instant progress updates.
       */
      false: {
        indicator: progressAnimationClasses.disabled,
      },
    },
    size: {
      /**
       * Extra small - 32px (2rem).
       */
      xs: { root: "w-8 h-8" },
      /**
       * Small - 48px (3rem).
       */
      sm: { root: "w-12 h-12" },
      /**
       * Medium - 64px (4rem).
       */
      md: { root: "w-16 h-16" },
      /**
       * Large - 80px (5rem).
       */
      lg: { root: "w-20 h-20" },
      /**
       * Extra large - 96px (6rem).
       */
      xl: { root: "w-24 h-24" },
    },
  },
  defaultVariants: {
    variant: "default",
    showAnimation: true,
    size: "md",
  },
});
