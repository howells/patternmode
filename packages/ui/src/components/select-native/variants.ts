import { tv } from "tailwind-variants";

import { formControlElementVariants } from "../../constants/form-control-variants";
import { hasErrorInput } from "../../presentation/has-error-input";

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
      "2xs": "pl-1.5 pr-7",
      xs: "pl-2 pr-8",
      sm: "pl-2.5 pr-9",
      base: "pl-3 pr-10",
      lg: "pl-4 pr-12",
    },
    /**
     * Whether to show error styling.
     */
    hasError: {
      true: hasErrorInput,
    },
  },
  compoundVariants: [
    // Override the inherited padding from formControlElementVariants
    {
      variant: "standalone",
      size: "2xs",
      class: "h-control-2xs pl-1.5 pr-7 rounded-sm",
    },
    {
      variant: "standalone",
      size: "xs",
      class: "h-control-xs pl-2 pr-8 rounded-sm",
    },
    {
      variant: "standalone",
      size: "sm",
      class: "h-control-sm pl-2.5 pr-9 rounded",
    },
    {
      variant: "standalone",
      size: "base",
      class: "h-control-base pl-3 pr-10 rounded-md",
    },
    {
      variant: "standalone",
      size: "lg",
      class: "h-control-lg pl-4 pr-12 rounded-lg",
    },
  ],
  defaultVariants: {
    size: "base",
    variant: "standalone",
  },
});
