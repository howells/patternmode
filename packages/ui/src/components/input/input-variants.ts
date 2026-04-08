import { cva } from "class-variance-authority";
import { RADIUS_CLASSES } from "../../lib/radius";

/**
 * Standalone input variants.
 * For composed inputs with icons/addons, use InputGroup.
 */
export const standaloneInputVariants = cva(
  "w-full min-w-0 border-0 bg-input shadow-borders-base outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      size: {
        "2xs": "h-6 px-1.5 py-1 text-xs file:h-4 file:text-xs",
        xs: "h-7 px-2 py-1 text-xs file:h-5 file:text-xs",
        sm: "h-8 px-2.5 py-1 text-sm file:h-6 file:text-xs",
        base: "h-9 px-3 py-1.5 text-sm file:h-7 file:text-sm",
        lg: "h-10 px-3.5 py-2 text-base file:h-8 file:text-sm",
        xl: "h-11 px-3.5 py-2 text-base file:h-9 file:text-base",
        "2xl": "h-12 px-4 py-2.5 text-lg file:h-10 file:text-base",
        "3xl": "h-14 px-4 py-3 text-xl file:h-11 file:text-lg",
      },
      radius: RADIUS_CLASSES,
    },
    compoundVariants: [
      { radius: "rounded", size: ["2xs", "xs"], class: "rounded-md" },
    ],
    defaultVariants: {
      size: "lg",
      radius: "rounded",
    },
  },
);
