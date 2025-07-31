"use client";

import { DatePicker } from "@patternmode/ui";
import React, { useState } from "react";

// Default date picker
export const /**
              *
              */
  DefaultExample = () => (
    <DatePicker placeholder="Select a date" />
  );

// With time picker
export const /**
              *
              */
  WithTimeExample = () => (
    <DatePicker
      placeholder="Select date and time"
      showTimePicker
    />
  );

// With presets
export const /**
              *
              */
  WithPresetsExample = () => {
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
export const /**
              *
              */
  DisabledExample = () => (
    <DatePicker
      placeholder="Cannot select date"
      disabled
    />
  );

// Error state
export const /**
              *
              */
  ErrorStateExample = () => (
    <DatePicker
      placeholder="Date required"
      hasError
    />
  );

// Controlled
export const /**
              *
              */
  ControlledExample = () => {
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
  }; export const /**
                   *
                   */
  DatePickerExample = DefaultExample;
