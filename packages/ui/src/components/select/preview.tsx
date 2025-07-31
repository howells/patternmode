"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@patternmode/ui";
import React from "react";

interface SelectExampleProps {
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  defaultValue?: string;
  size?: "default" | "sm";
}

// Example component for preview system
export const /**
              *
              */
  SelectExample = ({
    placeholder = "Select an option...",
    disabled = false,
    hasError = false,
    defaultValue,
    size = "default",
  }: SelectExampleProps) => {
    return (
      <Select disabled={disabled} defaultValue={defaultValue}>
        <SelectTrigger hasError={hasError} size={size}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="elderberry">Elderberry</SelectItem>
          <SelectItem value="fig">Fig</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </Select>
    );
  };
