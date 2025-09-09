import { tv } from "tailwind-variants";

/**
 * Shared list-item styling for dropdown-like components (Menu/ContextMenu/Select/Combobox).
 * Parity goals:
 * - Neutral text, rounded corners, no shadow.
 * - Consistent hover/highlight/selected/disabled states.
 * - Works in light/dark; hover/highlight use zinc-100 / dark:zinc-800.
 */
export const floatingItemVariants = tv({
  base: [
    // layout/interaction
    "relative flex w-full cursor-pointer select-none items-center rounded-sm outline-hidden transition-colors",
    // typography & color
    "text-zinc-900 dark:text-zinc-50",
    // states
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
    // focus/hover/highlight
    "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800",
    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
  ],
  variants: {
    size: {
      xs: "px-2 py-1 text-xs",
      sm: "px-2 py-1.5 text-sm",
      base: "px-2 py-1.5 text-sm",
      lg: "px-3 py-2 text-base",
    },
    tone: {
      default: "",
      destructive: [
        "text-red-900 dark:text-red-100",
        "hover:bg-red-50 dark:hover:bg-red-900/20",
        "data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-900/20",
      ],
      selected: [
        "data-[selected]:bg-blue-50 data-[selected]:text-blue-900",
        "dark:data-[selected]:bg-blue-900/20 dark:data-[selected]:text-blue-100",
      ],
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
  },
});

