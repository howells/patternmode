"use client";

import type { CalendarProps } from "./calendar";
import { Calendar } from "@patternmode/ui";

import React from "react";

type CalendarExampleProps = CalendarProps;

export function CalendarExample(props: CalendarProps) {
  return <Calendar {...props} />;
}
