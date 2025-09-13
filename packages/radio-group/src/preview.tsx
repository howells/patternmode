"use client";

import { RadioGroupItem } from "./components/radio-group-item";
import { RadioGroupRoot } from "./components/radio-group-root";

export type RadioGroupPreviewProps = {
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
};

export function RadioGroupPreview({
  defaultValue = "1",
  orientation = "horizontal",
}: RadioGroupPreviewProps) {
  return (
    <div className="p-4">
      <RadioGroupRoot defaultValue={defaultValue} orientation={orientation}>
        <RadioGroupItem value="1">Default</RadioGroupItem>
        <RadioGroupItem value="2">Comfortable</RadioGroupItem>
        <RadioGroupItem value="3">Compact</RadioGroupItem>
      </RadioGroupRoot>
    </div>
  );
}

export const radioGroupPreviewProps = [
  {
    name: "defaultValue",
    type: "select",
    options: ["1", "2", "3"],
    defaultValue: "1",
  },
  {
    name: "orientation",
    type: "select",
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
  },
];
