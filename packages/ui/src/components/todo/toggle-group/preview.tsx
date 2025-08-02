"use client";

import type { ToggleGroupProps } from "./toggle-group";
import { ToggleGroup } from "@patternmode/ui";

import React from "react";

type ToggleGroupExampleProps = ToggleGroupProps;

export function ToggleGroupExample(props: ToggleGroupProps) {
  return <ToggleGroup {...props} />;
}
