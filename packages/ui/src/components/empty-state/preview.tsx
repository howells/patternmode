"use client";

import type { EmptyStateProps } from "./empty-state";

import { EmptyState, getDynamicIconByName } from "@patternmode/ui";
import React from "react";

type EmptyStateExampleProps = {
  [key: string]: unknown;
};

export function EmptyStateExample(props: EmptyStateProps) {
  const IconComponent = getDynamicIconByName("FileX");

  return (
    <EmptyState
      title="No data found"
      description="There's nothing here yet. Try creating something new to get started."
      icon={IconComponent}
      {...props}
    />
  );
}
