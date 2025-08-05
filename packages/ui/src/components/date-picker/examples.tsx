"use client";

import React from "react";
import { Calendar, CalendarDays, Clock } from "lucide-react";
import { DatePicker } from "./component";

export const DefaultExample = () => (
  <DatePicker placeholder="Select a date" />
);

export const WithTimeExample = () => (
  <DatePicker placeholder="Select date and time" showTimePicker />
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
      onChange={setValue}
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
    showTimePicker
  />
);
