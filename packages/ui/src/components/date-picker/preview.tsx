"use client";

import { DatePicker } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  DatePickerExample = ({
    placeholder = "Select date",
    disabled = false,
    hasError = false,
    showTimePicker = false,
    enableYearNavigation = false,
    align = "center",
    ...props
  }: {
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
    showTimePicker?: boolean;
    enableYearNavigation?: boolean;
    align?: "start" | "center" | "end";
    [key: string]: unknown;
  }) => {
    const [date, setDate] = React.useState<Date | undefined>();

    // Simple presets for demonstration
    const presets = React.useMemo(() => [
      { label: "Today", date: new Date() },
      {
        label: "Tomorrow",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        label: "Next Week",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ], []);

    return (
      <div className="w-full max-w-xs space-y-2">
        <DatePicker
          placeholder={placeholder}
          disabled={disabled}
          hasError={hasError}
          showTimePicker={showTimePicker}
          enableYearNavigation={enableYearNavigation}
          align={align}
          value={date}
          onChange={setDate}
          presets={presets}
          {...props}
        />
        {date && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Selected:
            {" "}
            {date.toLocaleString()}
          </p>
        )}
      </div>
    );
  };
