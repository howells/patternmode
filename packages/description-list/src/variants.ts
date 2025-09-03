import { tv } from "tailwind-variants";

export const descriptionListVariants = tv({
  base: "grid grid-cols-1 gap-x-2 text-base sm:text-sm",
  variants: {
    columns: {
      default: "sm:[grid-template-columns:min(50%,--spacing(80))_auto]",
    },
    size: {
      "2xs": "[&>dd]:py-0.5 [&>dt]:py-0.5",
      xs: "[&>dd]:py-1 [&>dt]:py-1",
      sm: "[&>dd]:py-2 [&>dt]:py-2",
      base: "[&>dd]:py-3 [&>dt]:py-3",
      lg: "[&>dd]:py-4 [&>dt]:py-4",
    },
    border: {
      true: "[&>dd:nth-child(2)]:sm:border-none [&>dd]:sm:border-zinc-950/5 [&>dd]:sm:border-t dark:[&>dd]:sm:border-white/5 [&>dt:first-child]:border-none [&>dt]:border-zinc-950/5 [&>dt]:border-t dark:[&>dt]:border-white/5",
      false: "[&_dd]:sm:border-0 [&_dt]:border-0",
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
  base: "col-start-1 items-center text-zinc-500 dark:text-zinc-400",
});

export const descriptionDetailsVariants = tv({
  base: "items-center text-zinc-950 dark:text-white",
});
