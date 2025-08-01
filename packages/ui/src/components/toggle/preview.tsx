"use client";

import type { ToggleProps } from "./toggle";
import { Toggle } from "@patternmode/ui";

import React from "react";

type ToggleExampleProps = ToggleProps;

export function ToggleExample(props: ToggleProps) {
  return <Toggle {...props} />;
}
