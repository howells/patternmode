"use client";

import type { SkeletonProps } from "./component";
import { Skeleton } from "./component";

// Always render a visible skeleton state for preview consistency
export function SkeletonPreview(props: SkeletonProps) {
  return (
    <div className="space-y-4 w-full max-w-[320px]">
      <Skeleton className="h-20 w-full" {...props} />
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12" rounded="full" {...props} />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" {...props} />
          <Skeleton className="h-4 w-1/2" {...props} />
        </div>
      </div>
    </div>
  );
}
