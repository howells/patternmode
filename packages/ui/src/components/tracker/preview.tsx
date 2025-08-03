"use client";

import type { TrackerProps } from "./component";
import React from "react";
import { Tracker } from "./component";

export function TrackerExample(props: TrackerProps) {
  const data = [
    { date: "2024-01-01", value: 1 },
    { date: "2024-01-02", value: 3 },
    { date: "2024-01-03", value: 2 },
    { date: "2024-01-04", value: 4 },
    { date: "2024-01-05", value: 1 },
  ];

  return <Tracker data={data} {...props} />;
}
