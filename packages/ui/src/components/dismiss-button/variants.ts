import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";

export const dismissButtonVariants = tv({
  base: [
    // Base button styling
    "flex items-center justify-center rounded-full transition-colors",
    // Color styling (low opacity for any background)
    "text-zinc-700/60 dark:text-zinc-300/70",
    // Hover states
    "hover:bg-zinc-600/10 hover:text-zinc-700/80 dark:hover:bg-zinc-300/15 dark:hover:text-zinc-300/90",
    // Focus states
    focusRing,
  ],
  variants: {
    size: {
      xs: "size-4",
      sm: "size-5",
      base: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "base",
  },
});