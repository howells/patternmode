"use client";

import { CalendarDays, Clock } from "lucide-react";
import React from "react";
import { DatePicker } from "./component";

export const DefaultExample = () => <DatePicker placeholder="Select a date" />;

export const WithTimeExample = () => (
  <DatePicker enableTime placeholder="Select date and time" />
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
  <DatePicker disabled placeholder="Select a date" />
);

export const ErrorStateExample = () => (
  <DatePicker hasError placeholder="Select a date" />
);

export const ControlledExample = () => {
  const [value, setValue] = React.useState<Date | undefined>();

  return (
    <DatePicker
      onValueChange={setValue}
      placeholder="Select a date"
      value={value}
    />
  );
};

export const WithCustomIconExample = () => (
  <DatePicker icon={CalendarDays} placeholder="Select a date" />
);

export const WithClockIconExample = () => (
  <DatePicker enableTime icon={Clock} placeholder="Select date and time" />
);

export const SizesExample = () => (
  <div className="space-y-4">
    <div>
      <label className="mb-1 block font-medium text-xs" htmlFor="dp-xs">
        Extra Small
      </label>
      <DatePicker id="dp-xs" placeholder="Extra small date picker" size="xs" />
    </div>
    <div>
      <label className="mb-1 block font-medium text-xs" htmlFor="dp-sm">
        Small
      </label>
      <DatePicker id="dp-sm" placeholder="Small date picker" size="sm" />
    </div>
    <div>
      <label className="mb-1 block font-medium text-sm" htmlFor="dp-base">
        Base (Default)
      </label>
      <DatePicker id="dp-base" placeholder="Base date picker" size="base" />
    </div>
    <div>
      <label className="mb-1 block font-medium text-base" htmlFor="dp-lg">
        Large
      </label>
      <DatePicker id="dp-lg" placeholder="Large date picker" size="lg" />
    </div>
  </div>
);
