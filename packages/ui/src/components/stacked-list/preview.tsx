"use client";

import type { StackedListProps } from "./stacked-list";
import { StackedList } from "@patternmode/ui";

import React from "react";

type StackedListExampleProps = StackedListProps;

export function StackedListExample(props: StackedListProps) {
  return <StackedList {...props} />;
}
