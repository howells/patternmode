"use client";

import type { StackProps } from "./component";
import React from "react";
import { Stack } from "./component";

export function StackExample(props: StackProps) {
  return (
    <Stack {...props}>
      <div className="p-4 bg-blue-100 rounded">Item 1</div>
      <div className="p-4 bg-green-100 rounded">Item 2</div>
      <div className="p-4 bg-yellow-100 rounded">Item 3</div>
    </Stack>
  );
}
