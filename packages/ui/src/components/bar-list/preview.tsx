"use client";

import type { BarListProps } from "./bar-list";
import { BarList } from "@patternmode/ui";

import React from "react";

type BarListExampleProps = BarListProps;

export function BarListExample(props: BarListProps) {
  return <BarList {...props} />;
}
