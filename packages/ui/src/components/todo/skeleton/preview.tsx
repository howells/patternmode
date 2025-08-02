"use client";

import { Skeleton } from "@patternmode/ui";

import React from "react";

type SkeletonExampleProps = React.ComponentProps<typeof Skeleton>;

export function SkeletonExample(props: React.ComponentProps<typeof Skeleton>) {
  return <Skeleton {...props} />;
}
