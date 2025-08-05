import { tv } from "tailwind-variants";

export const descriptionListVariants = tv({
  base: "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,--spacing(80))_auto] sm:text-sm/6",
});

export const descriptionTermVariants = tv({
  base: "col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5",
});

export const descriptionDetailsVariants = tv({
  base: "pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:nth-2:border-none dark:text-white dark:sm:border-white/5",
});