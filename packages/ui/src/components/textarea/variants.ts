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
      "2xs": "min-h-control-2xs px-1.5 py-1 text-xs leading-relaxed",
      xs: "min-h-control-xs px-2 py-1.5 text-xs leading-relaxed",
      sm: "min-h-control-sm px-2.5 py-2 text-sm leading-relaxed",
      base: "min-h-control-base px-3 py-2 text-base leading-relaxed",
      lg: "min-h-control-lg px-4 py-2.5 text-lg leading-relaxed",
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
