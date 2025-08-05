"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "./component";

const radioOptions = [
  { value: "option1", label: "Option 1", description: "First choice available" },
  { value: "option2", label: "Option 2", description: "Second choice available" },
  { value: "option3", label: "Option 3", description: "Third choice available" },
  { value: "option4", label: "Option 4", description: "Fourth choice available", disabled: true },
];

export type RadioGroupPreviewProps = {
  /**
   * Layout orientation of the radio group.
   * Vertical stacks radio items in a column, horizontal arranges them in a row.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Spacing size between radio items.
   * Controls the gap between individual radio buttons within the group.
   */
  spacing?: "sm" | "md" | "lg";
  /**
   * Number of radio options to display.
   * Controls how many radio button options are shown.
   */
  optionCount?: 2 | 3 | 4;
  /**
   * Whether to show option descriptions.
   * Displays additional descriptive text below each option when enabled.
   */
  showDescriptions?: boolean;
  /**
   * Whether to include a disabled option.
   * Demonstrates disabled state styling when enabled.
   */
  showDisabledOption?: boolean;
  /**
   * Default selected value.
   * Determines which option is pre-selected.
   */
  defaultValue?: "option1" | "option2" | "option3" | "option4";
};

export function RadioGroupPreview({
  orientation = "vertical",
  spacing = "md",
  optionCount = 3,
  showDescriptions = false,
  showDisabledOption = false,
  defaultValue = "option1",
}: RadioGroupPreviewProps = {}) {
  let displayedOptions = radioOptions.slice(0, optionCount);

  if (showDisabledOption && optionCount < 4) {
    displayedOptions = [...displayedOptions, radioOptions[3]];
  }

  return (
    <div className="p-8">
      <RadioGroup
        defaultValue={defaultValue}
        orientation={orientation}
        size={spacing}
      >
        {displayedOptions.map(option => (
          <div key={option.value} className="flex items-start space-x-3">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              disabled={option.disabled}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={option.value}
                className={`text-sm font-medium leading-none ${
                  option.disabled
                    ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                    : "text-zinc-700 dark:text-zinc-300 cursor-pointer"
                }`}
              >
                {option.label}
              </label>
              {showDescriptions && (
                <p className={`text-xs ${
                  option.disabled
                    ? "text-zinc-300 dark:text-zinc-700"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
                >
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

// Preview props for prop explorer
export const radioGroupPreviewProps = [
  {
    name: "orientation",
    type: "select",
    description: "Layout orientation of the radio group - vertical stacks in a column, horizontal arranges in a row.",
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
  },
  {
    name: "spacing",
    type: "select",
    description: "Spacing size between radio items - controls the gap between individual radio buttons.",
    options: ["sm", "md", "lg"],
    defaultValue: "md",
  },
  {
    name: "optionCount",
    type: "select",
    description: "Number of radio options to display - controls how many radio button options are shown.",
    options: [2, 3, 4],
    defaultValue: 3,
  },
  {
    name: "showDescriptions",
    type: "boolean",
    description: "Whether to show option descriptions - displays additional text below each radio option.",
    defaultValue: true,
  },
  {
    name: "showDisabledOption",
    type: "boolean",
    description: "Whether to include a disabled option - demonstrates disabled state styling.",
    defaultValue: true,
  },
];
