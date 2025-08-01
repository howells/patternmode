"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { DatePicker } from "@patternmode/ui";

import React, { useState } from "react";

// Default date picker
export const DefaultExample = () => (
  <DatePicker placeholder="Select a date" />
);

// With time picker
export const WithTimeExample = () => (
  <DatePicker
    placeholder="Select date and time"
    showTimePicker
  />
);

// With presets
export const WithPresetsExample = () => {
  const presets = [
    { label: "Today", date: new Date() },
    { label: "Tomorrow", date: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { label: "In a week", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  ];

  return (
    <DatePicker
      placeholder="Select or choose preset"
      presets={presets}
    />
  );
};

// Disabled state
export const DisabledExample = () => (
  <DatePicker
    placeholder="Cannot select date"
    disabled
  />
);

// Error state
export const ErrorStateExample = () => (
  <DatePicker
    placeholder="Date required"
    hasError
  />
);

// Controlled
export const ControlledExample = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="space-y-2">
      <DatePicker
        placeholder="Pick a date"
        value={date}
        onChange={setDate}
      />
      {date && (
        <p className="text-sm text-zinc-600">
          Selected:
          {" "}
          {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export const DatePickerExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithTimeExample",
    title: "With Time",
    description: "With Time example",
    component: WithTimeExample,
  },
  {
    id: "WithPresetsExample",
    title: "With Presets",
    description: "With Presets example",
    component: WithPresetsExample,
  },
  {
    id: "DisabledExample",
    title: "Disabled",
    description: "Disabled example",
    component: DisabledExample,
  },
  {
    id: "ErrorStateExample",
    title: "Error State",
    description: "Error State example",
    component: ErrorStateExample,
  },
  {
    id: "ControlledExample",
    title: "Controlled",
    description: "Controlled example",
    component: ControlledExample,
  },
  {
    id: "DatePickerExample",
    title: "Date Picker",
    description: "Date Picker example",
    component: DatePickerExample,
  },
];
