"use client";

import type { DividerProps } from "./divider";

import { Divider } from "@patternmode/ui";
import React from "react";

type DividerExampleProps = {
  [key: string]: unknown;
};

export function DividerExample(props: DividerProps) {
  return <Divider {...props} />;
}
