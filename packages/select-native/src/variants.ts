import { tv } from "tailwind-variants";

export const selectNativeStyles = tv({
  base: [
    "block w-full appearance-none rounded-md border bg-background text-foreground",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "pr-9", // space for chevrons
  ],
  variants: {
    hasError: {
      true: "border-red-500 focus:ring-red-500",
      false: "border-input",
    },
    size: {
      xs: "px-2 py-1 text-xs",
      sm: "px-2.5 py-1.5 text-sm",
      base: "px-3 py-2 text-sm",
      lg: "px-4 py-2.5 text-base",
    },
  },
  defaultVariants: { size: "base", hasError: false },
});
