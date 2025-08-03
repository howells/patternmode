"use client";

import type { ToggleProps } from "./component";
import React from "react";
import { Toggle } from "./component";

export function ToggleExample(props: ToggleProps) {
  return <Toggle {...props}>Toggle</Toggle>;
}
