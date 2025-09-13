"use client";

import React from "react";
import { CheckboxCard, CheckboxCards } from "./components";

type Props = {
  orientation?: "vertical" | "horizontal";
  defaultValue?: string[];
};

export function CheckboxCardsPreview({
  orientation = "vertical",
  defaultValue = ["pro"],
}: Props = {}) {
  const [value, setValue] = React.useState<string[]>(defaultValue);

  const layoutClass =
    orientation === "horizontal"
      ? "grid grid-cols-1 md:grid-cols-3 gap-2 w-full"
      : "space-y-2 w-full";

  return (
    <CheckboxCards
      className={layoutClass}
      onValueChange={setValue}
      value={value}
    >
      <CheckboxCard value="basic">
        <div className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
          Basic Plan
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Choose the basic option
        </div>
      </CheckboxCard>

      <CheckboxCard value="pro">
        <div className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
          Pro Plan
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Choose the pro option
        </div>
      </CheckboxCard>

      <CheckboxCard value="enterprise">
        <div className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
          Enterprise Plan
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Choose the enterprise option
        </div>
      </CheckboxCard>
    </CheckboxCards>
  );
}

export const checkboxCardsPreviewProps = [
  {
    name: "orientation",
    type: "select",
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
  },
  {
    name: "defaultValue",
    type: "select",
    options: [["basic"], ["pro"], ["enterprise"], ["basic", "pro"]],
    defaultValue: ["pro"],
  },
];
