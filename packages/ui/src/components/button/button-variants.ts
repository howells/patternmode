import { cva } from "class-variance-authority";

import { focusRing } from "../../utils/focus-ring";

export const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "ghost",
  "accent",
  "destructive",
] as const;

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[calc(var(--radius-md)-2px)]",
    "font-medium text-[0.95rem] tracking-[var(--tracking-body)] transition-all duration-200 ease-[var(--ease-snappy)]",
    "active:translate-y-0 disabled:pointer-events-none disabled:opacity-45",
    ...focusRing(),
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/96 hover:shadow-md",
        secondary:
          "bg-white/88 text-secondary-foreground shadow-2xs ring-1 ring-border/80 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm",
        ghost: "text-foreground hover:bg-secondary/85",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:bg-accent/92 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:-translate-y-0.5 hover:bg-destructive/92 hover:shadow-md",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.875rem]",
        base: "h-11 px-4.5",
        lg: "h-12 px-5 text-[1rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);
