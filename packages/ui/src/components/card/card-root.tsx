import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-xl)] border border-border/80 bg-panel/94 text-panel-foreground shadow-sm",
          "backdrop-blur-sm",
          className
        )}
        data-slot="card"
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col gap-2 px-6 pt-6", className)}
        data-slot="card-header"
        ref={ref}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn("font-display text-foreground text-title-sm", className)}
      data-slot="card-title"
      ref={ref}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("max-w-[60ch] text-body text-muted-foreground", className)}
      data-slot="card-description"
      ref={ref}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("px-6 py-5", className)}
        data-slot="card-content"
        ref={ref}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center gap-3 px-6 pt-1 pb-6", className)}
        data-slot="card-footer"
        ref={ref}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
