"use client";

import type { SkeletonProps } from "./component";
import React from "react";
import { Skeleton } from "./component";

export function SkeletonPreview(props: SkeletonProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsLoading(true), 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading && !props.variant) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="space-y-2">
            <div className="h-4 w-[250px] bg-gray-800 dark:bg-gray-200 rounded" />
            <div className="h-4 w-[200px] bg-gray-600 dark:bg-gray-400 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12" rounded="full" {...props} />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" {...props} />
          <Skeleton className="h-4 w-[200px]" {...props} />
        </div>
      </div>
    </div>
  );
}