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
  const [basicRange, setBasicRange] = useState<{from: Date | undefined, to?: Date | undefined} | undefined>();
  const [timeRange, setTimeRange] = useState<{from: Date | undefined, to?: Date | undefined} | undefined>();
  const [presetRange, setPresetRange] = useState<{from: Date | undefined, to?: Date | undefined} | undefined>();
  const [controlledRange, setControlledRange] = useState<{from: Date | undefined, to?: Date | undefined} | undefined>();

  // Preset configurations
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
    {
      label: "Last 7 Days",
      dateRange: { 
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
        to: today 
      },
    },
    {
      label: "Last 30 Days",
      dateRange: { 
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
        to: today 
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Basic date range picker */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Date Range Picker</h3>
        <DateRangePicker 
          placeholder={placeholder}
          value={basicRange}
          onChange={setBasicRange}
          disabled={disabled}
          hasError={hasError}
          showTimePicker={showTimePicker}
          enableYearNavigation={enableYearNavigation}
          align={align}
        />
        {basicRange?.from && (
          <p className="text-sm text-zinc-600">
            Selected: {basicRange.from.toLocaleDateString()}
            {basicRange.to && ` - ${basicRange.to.toLocaleDateString()}`}
          </p>
        )}
      </div>

      {/* With time picker */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Time Picker</h3>
        <DateRangePicker
          placeholder="Select date range with time"
          value={timeRange}
          onChange={setTimeRange}
          showTimePicker
          disabled={disabled}
          hasError={hasError}
          enableYearNavigation={enableYearNavigation}
          align={align}
        />
        {timeRange?.from && (
          <p className="text-sm text-zinc-600">
            Selected: {timeRange.from.toLocaleString()}
            {timeRange.to && ` - ${timeRange.to.toLocaleString()}`}
          </p>
        )}
      </div>

      {/* With presets */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Presets</h3>
        <DateRangePicker
          placeholder="Select or choose preset"
          value={presetRange}
          onChange={setPresetRange}
          presets={presets}
          disabled={disabled}
          hasError={hasError}
          showTimePicker={showTimePicker}
          enableYearNavigation={enableYearNavigation}
          align={align}
        />
        {presetRange?.from && (
          <p className="text-sm text-zinc-600">
            Selected: {presetRange.from.toLocaleDateString()}
            {presetRange.to && ` - ${presetRange.to.toLocaleDateString()}`}
          </p>
        )}
      </div>

      {/* Disabled state */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled State</h3>
        <DateRangePicker
          placeholder="Cannot select dates"
          disabled
          align={align}
        />
      </div>

      {/* Error state */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Error State</h3>
        <DateRangePicker
          placeholder="Date range required"
          hasError
          disabled={disabled}
          align={align}
        />
        <p className="text-sm text-red-600">Please select a valid date range.</p>
      </div>

      {/* Controlled example */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Controlled State</h3>
        <div className="space-y-3">
          <DateRangePicker
            placeholder="Pick date range"
            value={controlledRange}
            onChange={setControlledRange}
            disabled={disabled}
            hasError={hasError}
            showTimePicker={showTimePicker}
            enableYearNavigation={enableYearNavigation}
            align={align}
          />
          
          {controlledRange?.from && (
            <div className="text-sm text-zinc-600">
              <div>From: {controlledRange.from.toLocaleDateString()}</div>
              {controlledRange.to && (
                <div>To: {controlledRange.to.toLocaleDateString()}</div>
              )}
              {controlledRange.from && controlledRange.to && (
                <div className="font-medium">
                  Duration: {Math.ceil((controlledRange.to.getTime() - controlledRange.from.getTime()) / (1000 * 60 * 60 * 24))} days
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setControlledRange({ from: today, to: nextWeek })}
              className="px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
            >
              Set This Week
            </button>
            <button
              onClick={() => setControlledRange(undefined)}
              className="px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* With year navigation */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Year Navigation</h3>
        <DateRangePicker
          placeholder="Select date range with year nav"
          enableYearNavigation
          disabled={disabled}
          hasError={hasError}
          align={align}
        />
      </div>

      {/* Different alignments */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Different Alignments</h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">Start Aligned</label>
            <DateRangePicker
              placeholder="Popover aligned to start"
              align="start"
              disabled={disabled}
              hasError={hasError}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">Center Aligned</label>
            <DateRangePicker
              placeholder="Popover aligned to center"
              align="center"
              disabled={disabled}
              hasError={hasError}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">End Aligned</label>
            <DateRangePicker
              placeholder="Popover aligned to end"
              align="end"
              disabled={disabled}
              hasError={hasError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}