"use client";

import type { SelectNativeProps } from "./component";
import React from "react";
import { SelectNative } from "./component";

export function SelectNativeExample(props: SelectNativeProps) {
  return (
    <SelectNative {...props}>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </SelectNative>
  );
}
