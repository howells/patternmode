"use client";

import { Checkbox } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  CheckboxExample = ({
    checked = false,
    disabled = false,
    name,
    value,
    ...props
  }: {
    checked?: boolean | "indeterminate";
    disabled?: boolean;
    name?: string;
    value?: string;
    [key: string]: unknown;
  }) => {
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          {...props}
        />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {checked === "indeterminate" ? "Indeterminate" : checked ? "Checked" : "Unchecked"}
        </span>
      </div>
    );
  };
