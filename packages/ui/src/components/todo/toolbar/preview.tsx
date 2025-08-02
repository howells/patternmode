"use client";

import type { ToolbarProps } from "./toolbar";
import { Toolbar } from "@patternmode/ui";

import React from "react";

type ToolbarExampleProps = ToolbarProps;

export function ToolbarExample(props: ToolbarProps) {
  return <Toolbar {...props} />;
}
