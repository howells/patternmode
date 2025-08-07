import type { AriaTimeFieldProps, TimeValue } from "@react-aria/datepicker";
import type { DateFieldState, DateSegment } from "@react-stately/datepicker";
import type { Locale } from "date-fns";
import type React from "react";
import type { Size } from "../../constants/sizes";
import type { IconComponent } from "../icon/types";
import type { Button } from "../button/component";

export type TimeSegmentProps = {
  segment: DateSegment;
  state: DateFieldState;
} & { key?: React.Key };

export type TimeInputProps = {
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
  ref?: React.RefObject<HTMLDivElement | null>;
} & Omit<AriaTimeFieldProps<TimeValue>, "value" | "onChange">;

export type TriggerProps = {
  /**
   * Whether the date picker is in an error state.
   * When true, applies error styling to indicate validation issues.
   */
  hasError?: boolean;
  /**
   * Placeholder text to show when no date is selected.
   * Provides guidance on the expected date format or selection.
   */
  placeholder?: string;
  /**
   * Size variant determining height and text size.
   * Controls the overall dimensions of the date picker trigger.
   */
  size?: Size;
  /**
   * Icon component to display in the trigger.
   * Defaults to Calendar icon when not provided.
   */
  icon?: IconComponent;
  /**
   * Content to display in the trigger.
   * Usually the formatted selected date or placeholder text.
   */
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Button>, "leftIcon" | "children" | "size">;

export type DateRange = {
  /**
   * Start date of the range.
   * Can be undefined when no start date is selected yet.
   */
  from: Date | undefined;
  /**
   * End date of the range.
   * Can be undefined when no end date is selected yet.
   */
  to?: Date | undefined;
};

export type Preset = {
  /**
   * Display label for the preset option.
   * Shown in the preset selection interface.
   */
  label: string;
};

export type DatePreset = {
  /**
   * Display label for the date preset.
   * Shown in the preset selection interface.
   */
  label: string;
  /**
   * The preset date value.
   * Applied when the preset is selected.
   */
  date: Date;
} & Preset;

export type DateRangePreset = {
  /**
   * Display label for the date range preset.
   * Shown in the preset selection interface.
   */
  label: string;
  /**
   * The preset date range value.
   * Applied when the preset is selected.
   */
  dateRange: DateRange;
} & Preset;

export type Translations = {
  /**
   * Text for the cancel button.
   * Used to dismiss the date picker without making a selection.
   */
  cancel?: string;
  /**
   * Text for the apply/confirm button.
   * Used to confirm the selected date or date range.
   */
  apply?: string;
  /**
   * Text for the start date input label.
   * Used in date range pickers to label the start date field.
   */
  start?: string;
  /**
   * Text for the end date input label.
   * Used in date range pickers to label the end date field.
   */
  end?: string;
  /**
   * Text for the range separator.
   * Displayed between start and end dates in range pickers.
   */
  range?: string;
};

export type CalendarProps = {
  /**
   * The current date or date range selection.
   * Controls the calendar's selected state.
   */
  value?: Date | DateRange;
  /**
   * Callback fired when a date or date range is selected.
   * Receives the new selection as a parameter.
   */
  onValueChange?: (value: Date | DateRange | undefined) => void;
  /**
   * Whether to show preset options.
   * When true, displays preset buttons alongside the calendar.
   */
  showPresets?: boolean;
  /**
   * Array of preset options to display.
   * Provides quick selection shortcuts for common date choices.
   */
  presets?: DatePreset[] | DateRangePreset[];
  /**
   * Translation strings for localization.
   * Customizes button and label text for different languages.
   */
  translations?: Translations;
} & React.ComponentPropsWithoutRef<typeof import("../calendar/component").Calendar>;

export type PickerProps = {
  /**
   * The selected date or date range.
   * Controls the picker's current value.
   */
  value?: Date | DateRange;
  /**
   * Callback fired when selection changes.
   * Receives the new date or date range value.
   */
  onValueChange?: (value: Date | DateRange | undefined) => void;
  /**
   * Placeholder text for the input trigger.
   * Shown when no date is selected.
   */
  placeholder?: string;
  /**
   * Size variant determining height and text size.
   * Controls the overall dimensions of the date picker trigger.
   */
  size?: Size;
  /**
   * Whether the picker is disabled.
   * Prevents interaction when true.
   */
  disabled?: boolean;
  /**
   * Whether to show preset options.
   * Displays quick selection shortcuts when true.
   */
  showPresets?: boolean;
  /**
   * Array of preset options.
   * Provides common date selections for user convenience.
   */
  presets?: DatePreset[] | DateRangePreset[];
  /**
   * Translation strings for UI text.
   * Enables localization of buttons and labels.
   */
  translations?: Translations;
  /**
   * Whether the picker is in an error state.
   * Applies error styling when true.
   */
  hasError?: boolean;
  /**
   * Date formatting locale.
   * Controls how dates are displayed and formatted.
   */
  locale?: Locale;
  /**
   * Whether to show time selection.
   * Enables time input alongside date selection when true.
   */
  enableTime?: boolean;
  /**
   * Icon component to display in the trigger.
   * Defaults to Calendar icon when not provided.
   */
  icon?: IconComponent;
} & Omit<React.ComponentPropsWithoutRef<typeof import("../calendar/component").Calendar>, "value" | "onValueChange">;

export type SingleDatePickerProps = {
  /**
   * The selected date value.
   * Controls the single date picker's current selection.
   */
  value?: Date;
  /**
   * Callback fired when date selection changes.
   * Receives the new selected date.
   */
  onValueChange?: (value: Date | undefined) => void;
  /**
   * Array of single date presets.
   * Provides quick selection options for common dates.
   */
  presets?: DatePreset[];
} & Omit<PickerProps, "value" | "onValueChange" | "presets">;

export type _RangeDatePickerProps = {
  /**
   * The selected date range value.
   * Controls the range picker's current selection.
   */
  value?: DateRange;
  /**
   * Callback fired when date range selection changes.
   * Receives the new selected date range.
   */
  onValueChange?: (value: DateRange | undefined) => void;
  /**
   * Array of date range presets.
   * Provides quick selection options for common date ranges.
   */
  presets?: DateRangePreset[];
} & Omit<PickerProps, "value" | "onValueChange" | "presets">;

export type PresetContainerProps<TPreset extends Preset, TValue> = {
  /**
   * Array of preset options to display.
   * Each preset provides a quick selection shortcut.
   */
  presets: TPreset[];
  /**
   * The currently selected value.
   * Used to highlight the active preset if any.
   */
  currentValue?: TValue;
  /**
   * Callback fired when a preset is selected.
   * Receives the selected preset value.
   */
  onPresetSelect: (value: TValue) => void;
};

export type SingleProps = {
  /**
   * The selected single date.
   * Controls the current date selection.
   */
  value?: Date;
  /**
   * Callback for single date selection changes.
   * Receives the new selected date.
   */
  onValueChange?: (value: Date | undefined) => void;
  /**
   * Single date preset options.
   * Provides quick selection shortcuts for common dates.
   */
  presets?: DatePreset[];
} & Omit<PickerProps, "value" | "onValueChange" | "presets">;
