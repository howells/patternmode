import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "../lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[calc(var(--radius-md)-2px)]",
    "font-medium text-[0.95rem] tracking-[var(--tracking-body)] transition-all duration-200 ease-[var(--ease-snappy)]",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15 focus-visible:ring-offset-0",
    "active:translate-y-0 disabled:pointer-events-none disabled:opacity-45",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/96 hover:shadow-md",
        secondary:
          "bg-white/88 text-secondary-foreground shadow-2xs ring-1 ring-border/80 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm",
        ghost: "text-foreground hover:bg-secondary/85",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:bg-accent/92 hover:shadow-md",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.875rem]",
        md: "h-11 px-4.5",
        lg: "h-12 px-5 text-[1rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
