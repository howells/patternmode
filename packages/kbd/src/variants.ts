import { tv } from "tailwind-variants";

export const kbdVariants = tv({
  base: [
    // Base styling
    "pointer-events-none inline-flex items-center gap-1 rounded border font-medium font-mono",
  ],
  variants: {
    variant: {
      default: [
        // Light mode
        "bg-zinc-100 text-zinc-600",
        // Dark mode
        "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
      ],
      onDarkButton: [
        // For use on dark buttons (default, destructive)
        "border-white/20 bg-white/10 text-white/90",
        "dark:border-white/20 dark:bg-white/10 dark:text-white/90",
      ],
      onLightButton: [
        // For use on light buttons (secondary, outline, ghost)
        "border-zinc-900/20 bg-zinc-900/10 text-zinc-900/90",
        "dark:border-zinc-100/20 dark:bg-zinc-100/10 dark:text-zinc-100/90",
      ],
    },
    size: {
      xs: "h-4 px-1 text-[9px]",
      sm: "h-5 px-1.5 text-[10px]",
      base: "h-6 px-2 text-sm",
      lg: "h-7 px-2.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});
