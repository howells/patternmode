"use client";

import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import * as React from "react";
import type { DatePreset, DateRange, DateRangePreset, Preset, PresetContainerProps } from "../types";

export const PresetContainer = <TPreset extends Preset, TValue>({
  presets,
  onPresetSelect,
  currentValue,
}: PresetContainerProps<TPreset, TValue>) => {
  const isDateRangePresets = (preset: TPreset): preset is TPreset & DateRangePreset => {
    return "dateRange" in preset;
  };
  const isDatePresets = (preset: TPreset): preset is TPreset & DatePreset => {
    return "date" in preset;
  };

  const handleClick = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      onPresetSelect(preset.dateRange as TValue);
    } else if (isDatePresets(preset)) {
      onPresetSelect(preset.date as TValue);
    }
  };

  const compareDates = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };

  const compareRanges = (range1: DateRange, range2: DateRange) => {
    const from1 = range1.from;
    const from2 = range2.from;
    let equalFrom = false;
    if (from1 && from2) {
      const sameFrom = compareDates(from1, from2);
      if (sameFrom) equalFrom = true;
    }
    const to1 = range1.to;
    const to2 = range2.to;
    let equalTo = false;
    if (to1 && to2) {
      const sameTo = compareDates(to1, to2);
      if (sameTo) equalTo = true;
    } else if (!(to1 || to2)) {
      equalTo = true;
    }
    return equalFrom && equalTo;
  };

  const matchesCurrent = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      const value = currentValue as DateRange | undefined;
      return value && compareRanges(value, preset.dateRange);
    }
    if (isDatePresets(preset)) {
      const value = currentValue as Date | undefined;
      return value && compareDates(value, preset.date);
    }
    return false;
  };

  return (
    <ul className="flex items-start gap-x-2 sm:flex-col">
      {presets.map((preset) => (
        <li className="sm:w-full sm:py-px" key={`preset-${preset.label}`}>
          <button
            aria-label={`Select ${preset.label}`}
            className={cx(
              "relative w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border px-2.5 py-1.5 text-left text-base outline-hidden transition-all sm:border-none sm:py-2 sm:text-sm sm:shadow-none",
              "text-zinc-700 dark:text-zinc-300",
              "dark:border-zinc-800",
              focusRing,
              "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
              "hover:bg-zinc-100 dark:hover:bg-zinc-900",
              { "bg-zinc-100 dark:bg-zinc-900": matchesCurrent(preset) }
            )}
            onClick={() => handleClick(preset)}
            title={preset.label}
            type="button"
          >
            <span>{preset.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

PresetContainer.displayName = "DatePicker.PresetContainer";

