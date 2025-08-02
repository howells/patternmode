"use client";

import type { SeparatorProps } from "./separator";
import { Separator } from "@patternmode/ui";

import React from "react";

type SeparatorExampleProps = SeparatorProps;

export function SeparatorExample(props: SeparatorProps) {
  return <Separator {...props} />;
}
