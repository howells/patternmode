import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "flex w-full rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-input px-3.5",
    "text-body text-foreground shadow-2xs placeholder:text-muted-foreground/90",
    "disabled:cursor-not-allowed disabled:bg-muted/70 disabled:opacity-60",
  ],
  {
    variants: {
      size: {
        sm: "h-9 text-[0.9rem]",
        base: "h-11",
        lg: "h-12 text-[1rem]",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);
