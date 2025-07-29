"use client";

import React, { useState } from "react";
import { DateRangePicker } from "@patternmode/ui";

// Default date range picker
export const DefaultExample = () => (
  <DateRangePicker placeholder="Select date range" />
);

// With time picker
export const WithTimeExample = () => (
  <DateRangePicker
    placeholder="Select date range with time"
    showTimePicker
  />
);

// With presets
export const WithPresetsExample = () => {
  const today = new Date();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const presets = [
    {
      label: "Today",
      dateRange: { from: today, to: today },
    },
    {
      label: "Tomorrow",
      dateRange: { from: tomorrow, to: tomorrow },
    },
    {
      label: "This Week",
      dateRange: { from: today, to: nextWeek },
    },
  ];

  return (
    <DateRangePicker
      placeholder="Select or choose preset"
      presets={presets}
    />
  );
};

// Disabled state
export const DisabledExample = () => (
  <DateRangePicker
    placeholder="Cannot select dates"
    disabled
  />
);

// Error state
export const ErrorStateExample = () => (
  <DateRangePicker
    placeholder="Date range required"
    hasError
  />
);

// Controlled
export const ControlledExample = () => {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to?: Date | undefined} | undefined>();

  return (
    <div className="space-y-2">
      <DateRangePicker
        placeholder="Pick date range"
        value={dateRange}
        onChange={setDateRange}
      />
      {dateRange?.from && (
        <p className="text-sm text-zinc-600">
          Range: {dateRange.from.toLocaleDateString()}
          {dateRange.to && ` - ${dateRange.to.toLocaleDateString()}`}
        </p>
      )}
    </div>
  );
};