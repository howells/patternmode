import { tv } from "tailwind-variants";

/**
 * Responsive container variants.
 *
 * Uses fixed max-width breakpoints mapped from our shared size keys
 * and provides sensible defaults: full-width, centered, with safe padding.
 */
export const containerVariants = tv({
  base: [
    // layout
    "w-full",
    // center by default
    "mx-auto",
    // default horizontal padding for breathing room
    "px-4 sm:px-6 lg:px-8",
  ].join(" "),
  variants: {
    size: {
      // Map to explicit pixel widths for predictable content measures
      "2xs": "max-w-[480px]",
      xs: "max-w-[640px]",
      sm: "max-w-[768px]",
      base: "max-w-[1024px]",
      lg: "max-w-[1280px]",
    },
    center: {
      true: "mx-auto",
      false: "mx-0",
    },
    fluid: {
      true: "max-w-none",
    },
  },
  defaultVariants: {
    size: "base",
    center: true,
  },
});

export type ContainerVariantProps = Parameters<typeof containerVariants>[0];
