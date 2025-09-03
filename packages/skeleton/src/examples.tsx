"use client";

import { Skeleton } from "./component";

export function DefaultExample() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12" rounded="full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function ShimmerExample() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12" rounded="full" variant="shimmer" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" variant="shimmer" />
        <Skeleton className="h-4 w-[200px]" variant="shimmer" />
      </div>
    </div>
  );
}

export function CardExample() {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10" rounded="full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function ListExample() {
  return (
    <div className="space-y-4">
      {[...Array.from({ length: 3 })].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length demo list with no reordering
        <div className="flex items-center space-x-4" key={`item-${i}`}>
          <Skeleton className="h-12 w-12" rounded="md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArticleExample() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full" rounded="lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
}

export function RoundedVariantsExample() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" rounded="none" />
      <Skeleton className="h-12 w-full" rounded="sm" />
      <Skeleton className="h-12 w-full" rounded="md" />
      <Skeleton className="h-12 w-full" rounded="lg" />
      <Skeleton className="h-12 w-full" rounded="xl" />
      <div className="flex space-x-4">
        <Skeleton className="h-12 w-12" rounded="full" />
        <Skeleton className="h-12 w-12" rounded="full" />
        <Skeleton className="h-12 w-12" rounded="full" />
      </div>
    </div>
  );
}
