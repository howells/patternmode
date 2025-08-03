"use client";

import type { RadioCardGroupProps } from "./component";
import React from "react";
import { RadioCardGroup, RadioCardItem } from "./component";

export function RadioCardGroupExample(props: RadioCardGroupProps) {
  return (
    <RadioCardGroup defaultValue="option1" {...props}>
      <RadioCardItem value="option1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Option 1
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              First option with description
            </div>
          </div>
        </div>
      </RadioCardItem>
      <RadioCardItem value="option2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Option 2
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Second option with description
            </div>
          </div>
        </div>
      </RadioCardItem>
      <RadioCardItem value="option3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Option 3
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Third option with description
            </div>
          </div>
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}
