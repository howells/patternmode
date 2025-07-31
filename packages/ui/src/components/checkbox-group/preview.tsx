"use client";

import { CheckboxGroup, CheckboxGroupItem } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  CheckboxGroupExample = ({
    label = "Select preferences",
    disabled = false,
    defaultValue,
    ...props
  }: {
    label?: string;
    disabled?: boolean;
    defaultValue?: string;
    [key: string]: unknown;
  }) => {
  // Parse comma-separated default values
    const defaultValueArray = defaultValue ? defaultValue.split(",").map(v => v.trim()) : [];

    return (
      <CheckboxGroup
        label={label}
        disabled={disabled}
        defaultValue={defaultValueArray}
        {...props}
      >
        <CheckboxGroupItem value="notifications" disabled={disabled}>
          Email notifications
        </CheckboxGroupItem>
        <CheckboxGroupItem value="updates" disabled={disabled}>
          Product updates
        </CheckboxGroupItem>
        <CheckboxGroupItem value="marketing" disabled={disabled}>
          Marketing communications
        </CheckboxGroupItem>
        <CheckboxGroupItem value="newsletter" disabled={disabled}>
          Weekly newsletter
        </CheckboxGroupItem>
      </CheckboxGroup>
    );
  };
