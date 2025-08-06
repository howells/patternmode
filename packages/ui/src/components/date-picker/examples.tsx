"use client";

import { CalendarDays, Clock } from "lucide-react";
import React from "react";
import { DatePicker } from "./component";

export const DefaultExample = () => (
  <DatePicker placeholder="Select a date" />
);

export const WithTimeExample = () => (
  <DatePicker placeholder="Select date and time" enableTime />
);

export const WithPresetsExample = () => (
  <DatePicker
    placeholder="Select a date"
    presets={[
      {
        label: "Today",
        date: new Date(),
      },
      {
        label: "Tomorrow",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        label: "In a week",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ]}
  />
);

export const DisabledExample = () => (
  <DatePicker placeholder="Select a date" disabled />
);

export const ErrorStateExample = () => (
  <DatePicker placeholder="Select a date" hasError />
);

export const ControlledExample = () => {
  const [value, setValue] = React.useState<Date | undefined>();

  return (
    <DatePicker
      placeholder="Select a date"
      value={value}
      onValueChange={setValue}
    />
  );
};

export const WithCustomIconExample = () => (
  <DatePicker
    placeholder="Select a date"
    icon={CalendarDays}
  />
);

export const WithClockIconExample = () => (
  <DatePicker
    placeholder="Select date and time"
    icon={Clock}
    enableTime
  />
);

export const SizesExample = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-xs font-medium mb-1">Extra Small</label>
      <DatePicker size="xs" placeholder="Extra small date picker" />
    </div>
    <div>
      <label className="block text-xs font-medium mb-1">Small</label>
      <DatePicker size="sm" placeholder="Small date picker" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Base (Default)</label>
      <DatePicker size="base" placeholder="Base date picker" />
    </div>
    <div>
      <label className="block text-base font-medium mb-1">Large</label>
      <DatePicker size="lg" placeholder="Large date picker" />
    </div>
  </div>
);
