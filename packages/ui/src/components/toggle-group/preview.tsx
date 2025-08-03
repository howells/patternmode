"use client";

import type { ToggleGroupProps } from "./component";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./component";

export function ToggleGroupExample(props: ToggleGroupProps) {
  return (
    <ToggleGroup defaultValue={["center"]} {...props}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}
