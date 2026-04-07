import type { HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

type SkeletonVariant = "default" | "light";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, string> = {
  default: "bg-secondary/80",
  light: "bg-white/70",
};

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse overflow-hidden rounded-[calc(var(--radius-md)-4px)]",
        variantStyles[variant],
        className
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
