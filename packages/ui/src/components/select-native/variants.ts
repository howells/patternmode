import { tv } from "tailwind-variants";

import { formControlElementVariants } from "../../lib/form-control-variants";
import { hasErrorInput } from "../../lib/utils";

export const selectNativeStyles = tv({
  extend: formControlElementVariants,
  base: [
    // select-native specific styling
    "peer max-w-sm cursor-pointer appearance-none truncate transition-all",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "disabled:pointer-events-none",
    "disabled:bg-zinc-100 disabled:text-zinc-400",
    "dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
  ],
  variants: {
    /**
     * Size variant determining height and text size.
     */
    size: {
      xs: "h-control-xs pl-2 pr-6",
      sm: "h-control-sm pl-2.5 pr-7",
      base: "h-control-base pl-3 pr-7",
      lg: "h-control-lg pl-4 pr-8",
    },
    /**
     * Whether to show error styling.
     */
    hasError: {
      true: hasErrorInput,
    },
  },
  defaultVariants: {
    size: "base",
    variant: "standalone",
  },
});
