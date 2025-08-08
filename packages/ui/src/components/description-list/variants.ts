import { tv } from "tailwind-variants";

export const descriptionListVariants = tv({
  base: "grid grid-cols-1 gap-x-2 text-base sm:text-sm",
  variants: {
    columns: {
      default: "sm:[grid-template-columns:min(50%,--spacing(80))_auto]",
    },
    size: {
      xs: "[&>dt]:py-1 [&>dd]:py-1",
      sm: "[&>dt]:py-2 [&>dd]:py-2",
      base: "[&>dt]:py-3 [&>dd]:py-3",
      lg: "[&>dt]:py-4 [&>dd]:py-4",
    },
    border: {
      true: "[&>dt]:border-t [&>dt]:border-zinc-950/5 dark:[&>dt]:border-white/5 [&>dd]:sm:border-t [&>dd]:sm:border-zinc-950/5 dark:[&>dd]:sm:border-white/5 [&>dt:first-child]:border-none [&>dd:nth-child(2)]:sm:border-none",
      false: "[&_dt]:border-0 [&_dd]:sm:border-0",
    },
    truncateTerms: {
      true: "[&>dt]:min-w-0 [&>dt]:truncate",
      false: "",
    },
  },
  defaultVariants: {
    columns: "default",
    size: "base",
    border: true,
    truncateTerms: false,
  },
});

export const descriptionTermVariants = tv({
  base: "col-start-1 text-zinc-500 dark:text-zinc-400 items-center",
});

export const descriptionDetailsVariants = tv({
  base: "text-zinc-950 dark:text-white items-center",
});
