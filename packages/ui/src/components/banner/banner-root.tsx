import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

const bannerVariants = cva(
  "grid gap-3 rounded-[var(--radius-xl)] border px-5 py-4 shadow-2xs",
  {
    variants: {
      variant: {
        default: "border-border/80 bg-panel/94 text-panel-foreground",
        accent: "border-accent/25 bg-accent-soft/85 text-foreground",
        success: "border-success/25 bg-success/10 text-foreground",
        warning: "border-warning/25 bg-warning/10 text-foreground",
        destructive: "border-destructive/25 bg-destructive/10 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {}

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(bannerVariants({ className, variant }))}
        data-slot="banner"
        ref={ref}
        role="status"
        {...props}
      />
    );
  }
);

Banner.displayName = "Banner";

const BannerTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("font-medium text-[0.96rem] text-foreground", className)}
      data-slot="banner-title"
      ref={ref}
      {...props}
    />
  );
});

BannerTitle.displayName = "BannerTitle";

const BannerDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("max-w-[68ch] text-body text-muted-foreground", className)}
      data-slot="banner-description"
      ref={ref}
      {...props}
    />
  );
});

BannerDescription.displayName = "BannerDescription";

const BannerActions = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3", className)}
      data-slot="banner-actions"
      ref={ref}
      {...props}
    />
  );
});

BannerActions.displayName = "BannerActions";

export { Banner, BannerActions, BannerDescription, BannerTitle };
