import { tv } from "tailwind-variants";

import { formControlElementVariants } from "../../constants/form-control-variants";

export const textareaStyles = tv({
  extend: formControlElementVariants,
  base: [
    // textarea-specific styling
    "flex resize-none",
  ],
  variants: {
    /**
     * Size variant determining height and text size.
     */
    size: {
      xs: "min-h-control-xs px-2 py-1.5",
      sm: "min-h-control-sm px-2.5 py-2",
      base: "min-h-control-base px-3 py-2",
      lg: "min-h-control-lg px-4 py-2.5",
    },
    /**
     * Width variant
     */
    fullWidth: {
      true: "w-full",
      false: "w-full max-w-sm",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "standalone",
    fullWidth: false,
  },
});
