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
  base: "text-zinc-700 dark:text-zinc-300 relative",
  variants: {
    variant: { marker: "", plain: "" },
    align: { start: "text-left", center: "text-center", end: "text-right" },
  },
  defaultVariants: { variant: "marker", align: "start" },
});

export const indicatorVariants = tv({
  base: "shrink-0 absolute left-0 top-1",
  variants: { variant: { marker: "", plain: "" } },
  defaultVariants: { variant: "marker" },
});

