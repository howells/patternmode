"use client";

import type { AriaTimeFieldProps, TimeValue } from "@react-aria/datepicker";
import type { DateFieldState, DateSegment } from "@react-stately/datepicker";
import type { Locale } from "date-fns";
import type { VariantProps } from "tailwind-variants";
import type { Matcher } from "../calendar";

import { Time } from "@internationalized/date";
import { useDateSegment, useTimeField } from "@react-aria/datepicker";
import { useTimeFieldState } from "@react-stately/datepicker";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "lucide-react";
import * as React from "react";
import { tv } from "tailwind-variants";

import { cx, focusInput, focusRing, hasErrorInput } from "../../lib/utils";
import { Button } from "../button";
import { Calendar as CalendarPrimitive } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

// #region TimeInput
// ============================================================================

const isBrowserLocaleClockType24h = () => {
  const language
    = typeof window !== "undefined" ? window.navigator.language : "en-US";

  const hr = new Intl.DateTimeFormat(language, {
    hour: "numeric",
  }).format();

  return Number.isInteger(Number(hr));
};

type TimeSegmentProps = {
  segment: DateSegment;
  state: DateFieldState;
} & { key?: React.Key };

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  // Skip rendering for any non-editable segments except colon
  if (
    !segment.isEditable
    && segment.type === "literal"
    && segment.text !== ":"
  ) {
    return null;
  }

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cx(
        // base
        "relative block w-full appearance-none rounded-md border px-2.5 py-1.5 text-left uppercase tabular-nums shadow-xs outline-hidden transition sm:text-sm",
        // border color
        "border-zinc-200 dark:border-zinc-800",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // background color
        "bg-white dark:bg-zinc-950",
        // focus
        focusInput,
        // invalid (optional)
        "group-aria-invalid/time-input:border-red-500 group-aria-invalid/time-input:ring-2 group-aria-invalid/time-input:ring-red-200 invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 dark:group-aria-invalid/time-input:ring-red-400/20",
        {
          "w-fit! border-none bg-transparent px-0 text-zinc-400 shadow-none":
            segment.type === "literal",
          "border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500":
            state.isDisabled && segment.text !== ":",
        },
      )}
    >
      {segment.isPlaceholder ? segment.placeholder : segment.text}
    </div>
  );
};

type TimeInputProps = {
  /**
   * Hour cycle format (12 or 24 hour).
   * Determines the display format for hour values.
   */
  hourCycle?: 12 | 24;
} & Omit<
  AriaTimeFieldProps<TimeValue>,
  "label" | "shouldForceLeadingZeros" | "description" | "errorMessage"
> & {
  ref?: React.RefObject<HTMLDivElement | null>;
};

const TimeInput = ({ ref, hourCycle, ...props }: TimeInputProps) => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => innerRef?.current,
  );

  const locale = window !== undefined ? window.navigator.language : "en-US";

  const state = useTimeFieldState({
    hourCycle,
    locale,
    shouldForceLeadingZeros: true,
    autoFocus: true,
    ...props,
  });

  const { fieldProps } = useTimeField(
    {
      ...props,
      hourCycle,
      shouldForceLeadingZeros: true,
    },
    state,
    innerRef,
  );

  return (
    <div
      {...fieldProps}
      ref={innerRef}
      className="group/time-input inline-flex w-full gap-x-2"
    >
      {state.segments.map((segment, i) => {
        const props = { segment, state };
        // eslint-disable-next-line react/no-array-index-key
        return <TimeSegment key={i} {...props} />;
      })}
    </div>
  );
};
TimeInput.displayName = "TimeInput";

// #region Trigger
// ============================================================================

const triggerStyles = tv({
  base: [
    // base
    "peer flex w-full cursor-pointer appearance-none items-center gap-x-2 truncate rounded-md border px-3 py-2 shadow-xs outline-hidden transition-all sm:text-sm",
    // background color
    "bg-white dark:bg-zinc-950",
    // border color
    "border-zinc-200 dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder color
    "placeholder-zinc-400 dark:placeholder-zinc-500",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "disabled:pointer-events-none",
    "disabled:bg-zinc-100 disabled:text-zinc-400",
    "dark:disabled:border-zinc-800 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
    // focus
    focusInput,
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
});

type TriggerProps = {
  /**
   * Placeholder text when no date is selected.
   * Displayed in muted colors when no value is present.
   */
  placeholder?: string;
} & React.ComponentProps<"button">
& VariantProps<typeof triggerStyles> & {
  ref?: React.RefObject<HTMLButtonElement | null>;
};

const Trigger = ({
  ref: forwardedRef,
  className,
  children,
  placeholder,
  hasError,
  ...props
}: TriggerProps) => {
  return (
    <PopoverTrigger
      ref={forwardedRef}
      className={cx(triggerStyles({ hasError }), className)}
      {...props}
    >
      <Calendar className="size-5 shrink-0 text-zinc-400 dark:text-zinc-600" />
      <span className="flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap text-zinc-900 dark:text-zinc-50">
        {children
          || (placeholder
            ? (
                <span className="text-zinc-400 dark:text-zinc-600">
                  {placeholder}
                </span>
              )
            : null)}
      </span>
    </PopoverTrigger>
  );
};

Trigger.displayName = "DatePicker.Trigger";

// #region Popover
// ============================================================================

const CalendarPopover = ({
  ref: forwardedRef,
  align,
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent> & {
  ref?: React.RefObject<React.ElementRef<typeof PopoverContent> | null>;
}) => {
  return (
    <PopoverContent
      ref={forwardedRef}
      sideOffset={10}
      side="bottom"
      align={align}
      className={cx(
        // base
        "w-fit text-sm",
        // widths
        "max-w-[95vw]",
        className,
      )}
      {...props}
    >
      {children}
    </PopoverContent>
  );
};

CalendarPopover.displayName = "DatePicker.CalendarPopover";

// #region Types
// ============================================================================

type DateRange = {
  /**
   * Start date of the range.
   * Can be undefined for incomplete ranges.
   */
  from: Date | undefined;
  /**
   * End date of the range.
   * Optional for single-ended ranges or incomplete selections.
   */
  to?: Date | undefined;
};

type Preset = {
  /**
   * Display label for the preset option.
   * Shown in the preset selection UI.
   */
  label: string;
};

type DatePreset = {
  /**
   * The preset date value.
   * Date that will be selected when this preset is chosen.
   */
  date: Date;
} & Preset;

type DateRangePreset = {
  /**
   * The preset date range value.
   * Date range that will be selected when this preset is chosen.
   */
  dateRange: DateRange;
} & Preset;

type Translations = {
  /**
   * Text for the cancel button.
   * Used in date picker popover actions.
   */
  cancel?: string;
  /**
   * Text for the apply button.
   * Used in date picker popover actions.
   */
  apply?: string;
  /**
   * Label for the start date in range picker.
   * Displayed next to start time input.
   */
  start?: string;
  /**
   * Label for the end date in range picker.
   * Displayed next to end time input.
   */
  end?: string;
  /**
   * Label for the date range selection.
   * Displayed before the selected range text.
   */
  range?: string;
};

type CalendarProps = {
  /**
   * Earliest selectable year.
   * Restricts calendar navigation and date selection.
   */
  fromYear?: number;
  /**
   * Latest selectable year.
   * Restricts calendar navigation and date selection.
   */
  toYear?: number;
  /**
   * Earliest selectable month.
   * Restricts calendar navigation and date selection.
   */
  fromMonth?: Date;
  /**
   * Latest selectable month.
   * Restricts calendar navigation and date selection.
   */
  toMonth?: Date;
  /**
   * Earliest selectable day.
   * Restricts calendar navigation and date selection.
   */
  fromDay?: Date;
  /**
   * Latest selectable day.
   * Restricts calendar navigation and date selection.
   */
  toDay?: Date;
  /**
   * Earliest selectable date.
   * Alternative to individual year/month/day restrictions.
   */
  fromDate?: Date;
  /**
   * Latest selectable date.
   * Alternative to individual year/month/day restrictions.
   */
  toDate?: Date;
  /**
   * Locale for date formatting and localization.
   * Controls month names, day names, and date formats.
   */
  locale?: Locale;
};

type PickerProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the trigger button element.
   */
  "className"?: string;
  /**
   * Whether the picker is disabled.
   * Prevents interaction and shows disabled styling.
   */
  "disabled"?: boolean;
  /**
   * Days to disable in the calendar.
   * Uses react-day-picker matchers for flexible date filtering.
   */
  "disabledDays"?: Matcher | Matcher[] | undefined;
  /**
   * Whether the field is required.
   * Affects form validation and accessibility attributes.
   */
  "required"?: boolean;
  /**
   * Whether to show the time picker component.
   * Adds time selection alongside date selection.
   */
  "showTimePicker"?: boolean;
  /**
   * Placeholder text for the input.
   * Displayed when no date is selected.
   */
  "placeholder"?: string;
  /**
   * Whether to enable year navigation controls.
   * Adds dropdown for quick year selection.
   */
  "enableYearNavigation"?: boolean;
  /**
   * Whether to disable calendar navigation.
   * Prevents month/year navigation controls.
   */
  "disableNavigation"?: boolean;
  /**
   * Whether to show error styling.
   * Adds error visual states to the component.
   */
  "hasError"?: boolean;
  /**
   * ID for the picker element.
   * Used for form association and accessibility.
   */
  "id"?: string;
  /**
   * Custom translations for date picker text.
   * Localizes button labels and UI text.
   */
  "translations"?: Translations;
  /**
   * Alignment of the popover relative to trigger.
   * Controls how the calendar popover positions itself.
   */
  "align"?: "center" | "end" | "start";
  /**
   * ARIA invalid state.
   * Indicates validation errors for accessibility.
   */
  "aria-invalid"?: boolean;
  /**
   * ARIA label for accessibility.
   * Provides accessible name for screen readers.
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this picker.
   * Alternative to aria-label for accessibility.
   */
  "aria-labelledby"?: string;
  /**
   * ARIA required state.
   * Indicates required field for accessibility.
   */
  "aria-required"?: boolean;
} & CalendarProps;

type SingleDatePickerProps = {
  /**
   * Preset date options to display in sidebar.
   * Provides quick selection for common dates.
   */
  presets?: DatePreset[];
  /**
   * Default selected date for uncontrolled mode.
   * Initial date value when component is not controlled.
   */
  defaultValue?: Date;
  /**
   * Currently selected date for controlled mode.
   * Date value managed by parent component.
   */
  value?: Date;
  /**
   * Callback when date selection changes.
   * Called with new date value or undefined for clearing.
   */
  onChange?: (date: Date | undefined) => void;
  /**
   * Translations excluding range-specific labels.
   * Localizes UI text for single date picker.
   */
  translations?: Omit<Translations, "range">;
} & Omit<PickerProps, "translations">;

type _RangeDatePickerProps = {
  /**
   * Preset date range options to display in sidebar.
   * Provides quick selection for common date ranges.
   */
  presets?: DateRangePreset[];
  /**
   * Default selected date range for uncontrolled mode.
   * Initial range value when component is not controlled.
   */
  defaultValue?: DateRange;
  /**
   * Currently selected date range for controlled mode.
   * Range value managed by parent component.
   */
  value?: DateRange;
  /**
   * Callback when date range selection changes.
   * Called with new range value or undefined for clearing.
   */
  onChange?: (dateRange: DateRange | undefined) => void;
} & PickerProps;

// #region Utility Functions
// ============================================================================

const formatDate = (
  date: Date,
  locale: Locale,
  includeTime?: boolean,
): string => {
  const usesAmPm = !isBrowserLocaleClockType24h();
  let dateString: string;

  if (includeTime) {
    dateString = usesAmPm
      ? format(date, "dd MMM, yyyy h:mm a", { locale })
      : format(date, "dd MMM, yyyy HH:mm", { locale });
  }
  else {
    dateString = format(date, "dd MMM, yyyy", { locale });
  }

  return dateString;
};

type PresetContainerProps<TPreset extends Preset, TValue> = {
  presets: TPreset[];
  onSelect: (value: TValue) => void;
  currentValue?: TValue;
};

const PresetContainer = <TPreset extends Preset, TValue>({
  presets,
  onSelect,
  currentValue,
}: PresetContainerProps<TPreset, TValue>) => {
  const isDateRangePresets = (
    preset: TPreset,
  ): preset is TPreset & DateRangePreset => {
    return "dateRange" in preset;
  };
  const isDatePresets = (preset: TPreset): preset is TPreset & DatePreset => {
    return "date" in preset;
  };

  const handleClick = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      onSelect(preset.dateRange as TValue);
    }
    else if (isDatePresets(preset)) {
      onSelect(preset.date as TValue);
    }
  };

  const compareDates = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate()
      && date1.getMonth() === date2.getMonth()
      && date1.getFullYear() === date2.getFullYear()
    );
  };

  const compareRanges = (range1: DateRange, range2: DateRange) => {
    const from1 = range1.from;
    const from2 = range2.from;

    let equalFrom = false;

    if (from1 && from2) {
      const sameFrom = compareDates(from1, from2);

      if (sameFrom) {
        equalFrom = true;
      }
    }

    const to1 = range1.to;
    const to2 = range2.to;

    let equalTo = false;

    if (to1 && to2) {
      const sameTo = compareDates(to1, to2);

      if (sameTo) {
        equalTo = true;
      }
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
      {presets.map((preset) => {
        return (
          <li key={`preset-${preset.label}`} className="sm:w-full sm:py-px">
            <button
              type="button"
              title={preset.label}
              className={cx(
                // base
                "relative w-full overflow-hidden rounded-sm border px-2.5 py-1.5 text-left text-base text-ellipsis whitespace-nowrap shadow-xs outline-hidden transition-all sm:border-none sm:py-2 sm:text-sm sm:shadow-none",
                // text color
                "text-zinc-700 dark:text-zinc-300",
                // border color
                "border-zinc-200 dark:border-zinc-800",
                // focus
                focusRing,
                // background color
                "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
                "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                {
                  "bg-zinc-100 dark:bg-zinc-900": matchesCurrent(preset),
                },
              )}
              onClick={() => handleClick(preset)}
              aria-label={`Select ${preset.label}`}
            >
              <span>{preset.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

PresetContainer.displayName = "DatePicker.PresetContainer";

// I'll continue with the rest of the component implementation...

type SingleProps = {
  presets?: DatePreset[];
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  translations?: Omit<Translations, "range">;
} & Omit<PickerProps, "translations">;

const SingleDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disabledDays,
  disableNavigation,
  className,
  showTimePicker,
  placeholder = "Select date",
  hasError,
  translations,
  enableYearNavigation = false,
  locale = enUS,
  align = "center",
  ...props
}: SingleProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ?? defaultValue ?? undefined,
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);

  const [time, setTime] = React.useState<TimeValue | null>(() =>
    value
      ? new Time(value.getHours(), value.getMinutes())
      : defaultValue
        ? new Time(defaultValue.getHours(), defaultValue.getMinutes())
        : new Time(0, 0),
  );

  const initialDate = React.useMemo(() => {
    return date;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    setDate(value ?? defaultValue ?? undefined);
  }, [value, defaultValue]);

  React.useEffect(() => {
    if (date) {
      setMonth(date);
    }
  }, [date]);

  React.useEffect(() => {
    if (!open) {
      setMonth(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onCancel = () => {
    setDate(initialDate);
    setTime(
      initialDate
        ? new Time(initialDate.getHours(), initialDate.getMinutes())
        : new Time(0, 0),
    );
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onCancel();
    }

    setOpen(open);
  };

  const onDateChange = (date: Date | undefined) => {
    const newDate = date;
    if (showTimePicker) {
      if (newDate && !time) {
        setTime(new Time(0, 0));
      }
      if (newDate && time) {
        newDate.setHours(time.hour);
        newDate.setMinutes(time.minute);
      }
    }
    setDate(newDate);
  };

  const onTimeChange = (time: TimeValue | null) => {
    setTime(time);

    if (!date) {
      return;
    }

    const newDate = new Date(date.getTime());

    if (!time) {
      newDate.setHours(0);
      newDate.setMinutes(0);
    }
    else {
      newDate.setHours(time.hour);
      newDate.setMinutes(time.minute);
    }

    setDate(newDate);
  };

  const formattedDate = React.useMemo(() => {
    if (!date) {
      return null;
    }

    return formatDate(date, locale, showTimePicker);
  }, [date, locale, showTimePicker]);

  const onApply = () => {
    setOpen(false);
    onChange?.(date);
  };

  React.useEffect(() => {
    setDate(value ?? defaultValue ?? undefined);
    setTime(
      value
        ? new Time(value.getHours(), value.getMinutes())
        : defaultValue
          ? new Time(defaultValue.getHours(), defaultValue.getMinutes())
          : new Time(0, 0),
    );
  }, [value, defaultValue]);

  return (
    <Popover open={open} onOpenChange={onOpenChange} data-testid="date-picker">
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        hasError={hasError}
        aria-required={props.required || props["aria-required"]}
        aria-invalid={props["aria-invalid"]}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
      >
        {formattedDate}
      </Trigger>
      <CalendarPopover align={align}>
        <div className="flex">
          <div className="flex flex-col sm:flex-row sm:items-start">
            {presets && presets.length > 0 && (
              <div
                className={cx(
                  "relative flex h-14 w-full items-center sm:h-full sm:w-40",
                  "border-b border-zinc-200 sm:border-r sm:border-b-0 dark:border-zinc-800",
                  "overflow-auto",
                )}
              >
                <div className="absolute px-2 pr-2 sm:inset-0 sm:left-0 sm:py-2">
                  <PresetContainer
                    currentValue={date}
                    presets={presets}
                    onSelect={onDateChange}
                  />
                </div>
              </div>
            )}
            <div>
              <CalendarPrimitive
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={onDateChange}
                disabled={disabledDays}
                locale={locale}
                enableYearNavigation={enableYearNavigation}
                disableNavigation={disableNavigation}
                initialFocus
                {...(({
                  required,
                  "aria-required": ariaRequired,
                  ...rest
                }) => rest)(props)}
              />
              {showTimePicker && (
                <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
                  <TimeInput
                    aria-label="Time"
                    onChange={onTimeChange}
                    isDisabled={!date}
                    value={time}
                    isRequired={props.required}
                  />
                </div>
              )}
              <div className="flex items-center gap-x-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
                <Button
                  variant="secondary"
                  className="h-8 w-full"
                  type="button"
                  onClick={onCancel}
                >
                  {translations?.cancel ?? "Cancel"}
                </Button>
                <Button
                  variant="default"
                  className="h-8 w-full"
                  type="button"
                  onClick={onApply}
                >
                  {translations?.apply ?? "Apply"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </Popover>
  );
};

/**
 * Date selection component with calendar interface and input field.
 */
const DatePicker = ({ presets, ...props }: SingleDatePickerProps) => {
  return <SingleDatePicker presets={presets} {...(props as SingleProps)} />;
};

DatePicker.displayName = "DatePicker";

export { DatePicker, type DatePreset, type DateRange, type DateRangePreset };
