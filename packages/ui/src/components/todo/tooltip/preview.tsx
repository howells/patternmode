"use client";

import type { TooltipProps } from "./tooltip";
import { Tooltip } from "@patternmode/ui";

import React from "react";

type TooltipExampleProps = TooltipProps;

export function TooltipExample(props: TooltipProps) {
  return <Tooltip {...props} />;
}
