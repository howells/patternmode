"use client";

import type { DotProps } from "./dot";
import { Dot } from "@patternmode/ui";

import React from "react";

type DotExampleProps = DotProps;

export function DotExample(props: DotProps) {
  return <Dot {...props} />;
}
