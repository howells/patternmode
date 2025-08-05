import { tv } from "tailwind-variants";

/**
 * Tailwind variants for the loader component.
 *
 * Defines size variants and base styling for the spinning loader icon.
 * Uses CSS animation for smooth rotation and inherits color from parent.
 */
export const loaderVariants = tv({
  base: [
    // base
    "animate-spin",
    // text color - inherit from parent
    "text-current",
  ],
  variants: {
    size: {
      /**
       * Extra small - 12px (0.75rem).
       */
      xs: "size-3",
      /**
       * Small - 16px (1rem).
       */
      sm: "size-4",
      /**
       * Base/default - 16px (1rem).
       */
      base: "size-4",
      /**
       * Large - 24px (1.5rem).
       */
      lg: "size-6",
      /**
       * Extra large - 32px (2rem).
       */
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "base",
  },
});
