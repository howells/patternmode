"use client";

import type { CalendarProps } from "./component";
import React from "react";
import { Calendar } from "./component";

export function CalendarExample(props: CalendarProps) {
  return <Calendar {...props} />;
}
