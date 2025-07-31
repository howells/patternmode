"use client";

import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@patternmode/ui";
import { useState } from "react";

interface RadioCardGroupExampleProps {
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  value?: string;
}

export function RadioCardGroupExample({
  orientation = "vertical",
  size = "md",
  disabled = false,
  value = "basic",
}: RadioCardGroupExampleProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <RadioCardGroup
      value={selectedValue}
      onValueChange={value => setSelectedValue(value as string)}
      disabled={disabled}
    >
      <RadioCardItem value="basic">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Basic Plan
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Perfect for individuals and small projects
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="pro">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Pro Plan
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Best for growing teams and businesses
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="enterprise">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Enterprise
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Advanced features for large organizations
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}
