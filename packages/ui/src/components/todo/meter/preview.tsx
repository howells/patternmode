"use client";

import type { MeterProps } from "./meter";
import { Meter } from "@patternmode/ui";

import React from "react";

type MeterExampleProps = MeterProps;

export function MeterExample(props: MeterProps) {
  return <Meter value={65} {...props} />;
}
