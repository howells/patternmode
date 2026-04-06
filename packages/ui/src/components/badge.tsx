import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-[0.72rem] uppercase",
    "tracking-[0.08em] transition-colors duration-200 ease-[var(--ease-snappy)]",
  ],
  {
    variants: {
      variant: {
        neutral: "border-border/80 bg-white/84 text-foreground shadow-2xs",
        accent: "border-transparent bg-accent-soft text-accent-foreground",
        success:
          "border-transparent bg-success/20 text-[color:var(--color-success-foreground)]",
        outline: "border-border-strong/80 bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ className, variant }))}
      data-slot="badge"
      {...props}
    />
  );
}

export { badgeVariants };
