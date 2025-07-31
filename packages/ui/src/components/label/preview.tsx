import React from "react";
import { Label } from "@patternmode/ui";

// Example component for preview system
export const LabelExample = ({
  children = "Label text",
  required = false,
  htmlFor,
  ...props
}: {
  children?: string;
  required?: boolean;
  htmlFor?: string;
  [key: string]: unknown;
}) => {
  const displayText = required ? `${children} *` : children;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} {...props}>
        {displayText}
      </Label>
      {htmlFor && (
        <input
          id={htmlFor}
          type="text"
          placeholder="Example input"
          className="block w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
      )}
    </div>
  );
};