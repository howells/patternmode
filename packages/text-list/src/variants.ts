import { tv } from "tailwind-variants";

export const listVariants = tv({
  base: "space-y-1 text-sm",
  variants: {
    variant: { marker: "list-disc pl-5", plain: "list-none pl-0" },
    align: { start: "text-left", center: "text-center", end: "text-right" },
  },
  defaultVariants: { variant: "marker", align: "start" },
});

export const listItemVariants = tv({
  base: "relative text-zinc-700 dark:text-zinc-300",
  variants: {
    variant: { marker: "", plain: "" },
    align: { start: "text-left", center: "text-center", end: "text-right" },
  },
  defaultVariants: { variant: "marker", align: "start" },
});

export const indicatorVariants = tv({
  base: "absolute top-1 left-0 shrink-0",
  variants: { variant: { marker: "", plain: "" } },
  defaultVariants: { variant: "marker" },
});
