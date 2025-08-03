"use client";

import type { RadioGroupProps } from "./component";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./component";

export function RadioGroupExample(props: RadioGroupProps) {
  return (
    <RadioGroup defaultValue="option1" {...props}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <label htmlFor="option1" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <label htmlFor="option2" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <label htmlFor="option3" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Option 3</label>
      </div>
    </RadioGroup>
  );
}
