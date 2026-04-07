import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

const alertVariants = cva(
  [
    "relative w-full rounded-[var(--radius-xl)] border px-4 py-3 shadow-2xs",
    "grid gap-1.5",
  ],
  {
    variants: {
      variant: {
        default: "border-border/80 bg-panel/92 text-panel-foreground",
        accent: "border-accent/25 bg-accent/8 text-foreground",
        destructive: "border-destructive/25 bg-destructive/8 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(alertVariants({ className, variant }))}
        data-slot="alert"
        ref={ref}
        role="alert"
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("font-medium text-[0.96rem] text-foreground", className)}
        data-slot="alert-title"
        ref={ref}
        {...props}
      />
    );
  }
);

AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "text-body text-muted-foreground [&_p]:leading-relaxed",
        className
      )}
      data-slot="alert-description"
      ref={ref}
      {...props}
    />
  );
});

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
