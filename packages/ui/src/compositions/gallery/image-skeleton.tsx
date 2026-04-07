"use client";

import { cn } from "@patternmode/ui/utils/cn";

interface ImageSkeletonProps {
  className?: string;
}

/** Shimmer skeleton for loading state */
export function ImageSkeleton({ className }: ImageSkeletonProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 bg-gray-200",
        "after:absolute after:inset-0 after:translate-x-[-100%]",
        "after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent",
        "after:animate-[shimmer_1.5s_infinite]",
        className,
      )}
    />
  );
}
