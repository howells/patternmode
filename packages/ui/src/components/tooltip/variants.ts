import { tv } from "tailwind-variants";

export const tooltipVariants = tv({
  slots: {
    popup: [
      // base
      "origin-[var(--transform-origin)] flex flex-col rounded-md px-2 py-1 text-sm shadow-lg z-50",
      // colors
      "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
      // transitions
      "transition-[transform,scale,opacity] duration-150 ease-in-out",
      // animations
      "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
    ],
    arrow: [
      // positioning based on side
      "data-[side=bottom]:top-[-8px]",
      "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
      "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
    ],
  },
  variants: {
    variant: {
      default: {
        popup: "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
      },
      inverse: {
        popup: "bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
      },
    },
    size: {
      sm: {
        popup: "px-2 py-1 text-xs",
      },
      default: {
        popup: "px-2 py-1 text-sm",
      },
      lg: {
        popup: "px-3 py-2 text-base",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
