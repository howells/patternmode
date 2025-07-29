"use client";

import { Skeleton } from "@patternmode/ui";

export function Example() {
  return (
    <div className="max-w-md space-y-4 p-4">
      {/* Profile skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      
      {/* Action buttons skeleton */}
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md ml-auto" />
      </div>
    </div>
  );
}