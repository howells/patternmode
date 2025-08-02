"use client";

import type { TrackerProps } from "./tracker";
import { Tracker } from "@patternmode/ui";

import React from "react";

type TrackerExampleProps = TrackerProps;

export function TrackerExample(props: TrackerProps) {
  const defaultData = [
    { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
    { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
    { color: "bg-zinc-300", tooltip: "Step 3: Pending" },
  ];

  return <Tracker data={defaultData} {...props} />;
}
