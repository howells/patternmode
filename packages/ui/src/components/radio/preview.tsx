"use client";

import type { RadioProps } from "./component";
import React from "react";
import { RadioOption } from "./component";

export function RadioExample(props: RadioProps) {
  return (
    <div className="flex items-center space-x-2">
      <RadioOption value="option1" label="Option 1" {...props} />
    </div>
  );
}
