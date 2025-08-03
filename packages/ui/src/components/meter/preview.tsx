"use client";

import type { MeterProps } from "./component";
import React from "react";

import { Meter } from "./component";

export function MeterExample(props: MeterProps) {
  return <Meter value={65} {...props} />;
}
