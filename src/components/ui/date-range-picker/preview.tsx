"use client";

import { useState } from "react";
import { DateRangePicker } from "@patternmode/ui";

interface DateRangePickerExampleProps {
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  showTimePicker?: boolean;
  enableYearNavigation?: boolean;
  align?: "start" | "center" | "end";
}

export function DateRangePickerExample({
  placeholder = "Select date range",
  disabled = false,
  hasError = false,
  showTimePicker = false,
  enableYearNavigation = false,
  align = "center",
}: DateRangePickerExampleProps) {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to?: Date | undefined} | undefined>();

  const presets = [
    {
      label: "Today",
      dateRange: { from: new Date(), to: new Date() },
    },
    {
      label: "Last 7 Days",
      dateRange: { 
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
        to: new Date() 
      },
    },
    {
      label: "Last 30 Days",
      dateRange: { 
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
        to: new Date() 
      },
    },
  ];

  return (
    <DateRangePicker
      placeholder={placeholder}
      value={dateRange}
      onChange={setDateRange}
      disabled={disabled}
      hasError={hasError}
      showTimePicker={showTimePicker}
      enableYearNavigation={enableYearNavigation}
      align={align}
      presets={presets}
    />
  );
}