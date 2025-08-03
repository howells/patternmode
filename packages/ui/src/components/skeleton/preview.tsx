"use client";

import type { SkeletonProps } from "./component";
import React from "react";
import { Skeleton } from "./component";

export function SkeletonExample(props: SkeletonProps) {
  return <Skeleton className="h-4 w-32" {...props} />;
}
