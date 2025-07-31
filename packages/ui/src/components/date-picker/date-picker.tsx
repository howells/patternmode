// Tremor Date Picker [v2.0.0]

"use client";

import type { AriaTimeFieldProps, TimeValue } from "@react-aria/datepicker";
import type { DateFieldState, DateSegment } from "@react-stately/datepicker";
import type { Locale } from "date-fns";
import type { VariantProps } from "tailwind-variants";
import type { Matcher } from "../calendar/calendar";
import { Time } from "@internationalized/date";
import {

  useDateSegment,
  useTimeField,
} from "@react-aria/datepicker";
import {

  useTimeFieldState,
} from "@react-stately/datepicker";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, Minus } from "lucide-react";
import * as React from "react";

import { tv } from "tailwind-variants";

import { cx, focusInput, focusRing, hasErrorInput } from "../../lib/utils";
import { Button } from "../button/button";
import {
  Calendar as CalendarPrimitive,

} from "../calendar/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

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

interface TimeSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
}

/**
 * Date Picker.
 *
 * @component
 * @id date-picker
 * @name Date Picker
 * @example
 * ```tsx
 * <TimeSegment>Content</TimeSegment>
 * ```
 */
const /**
       *
       */
  TimeSegment = ({ segment, state }: TimeSegmentProps) => {
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

type TimeInputProps = Omit<
  AriaTimeFieldProps<TimeValue>,
  "label" | "shouldForceLeadingZeros" | "description" | "errorMessage"
>;

/**
 * Time input component with segmented time entry.
 *
 * Built using React Aria's time field functionality, providing accessible
 * time input with separate segments for hours, minutes, and AM/PM. Features
 * automatic locale detection and format enforcement.
 *
 * @param value - Current time value.
 * @param onChange - Handler called when time changes.
 * @param hourCycle - Hour cycle format (12 or 24 hour).
 * @param isDisabled - Whether the time input is disabled.
 * @param isRequired - Whether the time input is required.
 */
const /**
       *
       */
  TimeInput = ({ ref, hourCycle, ...props }: TimeInputProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
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
        {state.segments.map((segment, i) => (
          <TimeSegment key={i} segment={segment} state={state} />
        ))}
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
    // invalid (optional)
    // "dark:aria-invalid:ring-red-400/20 aria-invalid:ring-2 aria-invalid:ring-red-200 aria-invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
});

/**
 * Props for the DatePicker trigger button.
 *
 * @interface TriggerProps
 * @augments React.ComponentProps<"button">
 * @augments VariantProps<typeof triggerStyles>
 */
interface TriggerProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof triggerStyles> {
  /**
   * Placeholder text when no date is selected.
   */
  placeholder?: string;
}

/**
 * Trigger button that opens the date picker popover.
 *
 * Features a calendar icon and displays the selected date or placeholder text.
 * Integrates with the Popover component to show/hide the date picker interface.
 *
 * @param placeholder - Text to show when no date is selected.
 * @param hasError - Whether to display error styling.
 * @param children - Selected date text to display.
 */
const /**
       *
       */
  Trigger = (
    { ref: forwardedRef, className, children, placeholder, hasError, ...props }: TriggerProps & { ref?: React.RefObject<HTMLButtonElement | null> },
  ) => {
    return (
      <PopoverTrigger
        ref={forwardedRef}
        className={cx(triggerStyles({ hasError }), className)}
        {...props}
      >
        <Calendar className="size-5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <span className="flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap text-zinc-900 dark:text-zinc-50">
          {children || (placeholder
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

const /**
       *
       */
  CalendarPopover = ({ ref: forwardedRef, align, className, children, ...props }: React.ComponentProps<typeof PopoverContent> & { ref?: React.RefObject<React.ElementRef<typeof PopoverContent> | null> }) => {
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

// #region Preset
// ============================================================================

/**
 * Represents a date range with optional start and end dates.
 *
 * @interface DateRange
 */
interface DateRange {
  /**
   * Start date of the range.
   */
  from: Date | undefined;
  /**
   * End date of the range (optional for single-ended ranges).
   */
  to?: Date | undefined;
}

/**
 * Base interface for preset configurations.
 *
 * @interface Preset
 */
interface Preset {
  /**
   * Display label for the preset option.
   */
  label: string;
}

/**
 * Preset configuration for single date selection.
 *
 * @interface DatePreset
 * @augments Preset
 */
interface DatePreset extends Preset {
  /**
   * The preset date value.
   */
  date: Date;
}

/**
 * Preset configuration for date range selection.
 *
 * @interface DateRangePreset
 * @augments Preset
 */
interface DateRangePreset extends Preset {
  /**
   * The preset date range value.
   */
  dateRange: DateRange;
}

interface PresetContainerProps<TPreset extends Preset, TValue> {
  presets: TPreset[];
  onSelect: (value: TValue) => void;
  currentValue?: TValue;
}

const /**
       *
       */
  PresetContainer = <TPreset extends Preset, TValue>({
  // Available preset configurations
    presets,
    // Event handler when a preset is selected
    onSelect,
    // Currently selected preset
    currentValue,
  }: PresetContainerProps<TPreset, TValue>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isDateRangePresets = (preset: any): preset is DateRangePreset => {
      return "dateRange" in preset;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isDatePresets = (preset: any): preset is DatePreset => {
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

// #region Date Picker Shared
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

interface CalendarProps {
  fromYear?: number;
  toYear?: number;
  fromMonth?: Date;
  toMonth?: Date;
  fromDay?: Date;
  toDay?: Date;
  fromDate?: Date;
  toDate?: Date;
  locale?: Locale;
}

/**
 * Translations for date picker text labels.
 *
 * Used to customize the text displayed in date picker buttons and labels
 * for different languages and locales.
 */
interface Translations {
  /**
   * Text for the cancel button.
   */
  cancel?: string;
  /**
   * Text for the apply button.
   */
  apply?: string;
  /**
   * Label for the start date in range picker.
   */
  start?: string;
  /**
   * Label for the end date in range picker.
   */
  end?: string;
  /**
   * Label for the date range selection.
   */
  range?: string;
}

/**
 * Base props interface for date picker components.
 *
 * Extends CalendarProps from react-day-picker with additional
 * date picker-specific configuration options.
 *
 * @interface PickerProps
 * @augments CalendarProps
 */
interface PickerProps extends CalendarProps {
  /**
   * Additional CSS classes for styling.
   */
  "className"?: string;
  /**
   * Whether the picker is disabled.
   */
  "disabled"?: boolean;
  /**
   * Days to disable in the calendar (using react-day-picker matchers).
   */
  "disabledDays"?: Matcher | Matcher[] | undefined;
  /**
   * Whether the field is required.
   */
  "required"?: boolean;
  /**
   * Whether to show the time picker component.
   */
  "showTimePicker"?: boolean;
  /**
   * Placeholder text for the input.
   */
  "placeholder"?: string;
  /**
   * Whether to enable year navigation controls.
   */
  "enableYearNavigation"?: boolean;
  /**
   * Whether to disable calendar navigation.
   */
  "disableNavigation"?: boolean;
  /**
   * Whether to show error styling.
   */
  "hasError"?: boolean;
  /**
   * ID for the picker element.
   */
  "id"?: string;
  /**
   * Custom translations for date picker text.
   */
  "translations"?: Translations;
  /**
   * Alignment of the popover relative to trigger.
   */
  "align"?: "center" | "end" | "start";
  /**
   * ARIA invalid state.
   */
  "aria-invalid"?: boolean;
  /**
   * ARIA label for accessibility.
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this picker.
   */
  "aria-labelledby"?: string;
  /**
   * ARIA required state.
   */
  "aria-required"?: boolean;
}

// #region Single Date Picker
// ============================================================================

/**
 * Props for the single date picker component.
 *
 * Extends PickerProps with single-date specific options including
 * presets, value handling, and change callbacks.
 *
 * @interface SingleProps
 * @augments Omit<PickerProps, "translations">
 */
interface SingleProps extends Omit<PickerProps, "translations"> {
  /**
   * Preset date options to show in sidebar.
   */
  presets?: DatePreset[];
  /**
   * Default selected date for uncontrolled mode.
   */
  defaultValue?: Date;
  /**
   * Currently selected date for controlled mode.
   */
  value?: Date;
  /**
   * Callback when date selection changes.
   */
  onChange?: (date: Date | undefined) => void;
  /**
   * Translations excluding range-specific labels.
   */
  translations?: Omit<Translations, "range">;
}

/**
 * Internal single date picker component.
 *
 * Handles single date selection with optional time picker and presets.
 * Manages internal state for date, time, and popover visibility.
 * Provides smooth animations and proper keyboard navigation.
 *
 * @param defaultValue - Default date for uncontrolled mode.
 * @param value - Current date for controlled mode.
 * @param onChange - Callback when date changes.
 * @param presets - Available date presets.
 * @param showTimePicker - Whether to show time selection.
 * @param placeholder - Input placeholder text.
 * @param translations - Custom text translations.
 */
const /**
       *
       */
  SingleDatePicker = ({
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

    const [time, setTime] = React.useState<TimeValue | null>(
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
      <Popover open={open} onOpenChange={onOpenChange}>
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
                  {...props}
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

// #region Range Date Picker
// ============================================================================

/**
 * Props for the range date picker component.
 *
 * Extends PickerProps with range-specific options including
 * date range presets, value handling, and change callbacks.
 *
 * @interface RangeProps
 * @augments PickerProps
 */
interface RangeProps extends PickerProps {
  /**
   * Preset date range options to show in sidebar.
   */
  presets?: DateRangePreset[];
  /**
   * Default selected date range for uncontrolled mode.
   */
  defaultValue?: DateRange;
  /**
   * Currently selected date range for controlled mode.
   */
  value?: DateRange;
  /**
   * Callback when date range selection changes.
   */
  onChange?: (dateRange: DateRange | undefined) => void;
}

/**
 * Internal range date picker component.
 *
 * Handles date range selection with optional time picker and presets.
 * Manages internal state for start/end dates, times, and popover visibility.
 * Provides smooth animations and proper keyboard navigation for range selection.
 *
 * @param defaultValue - Default date range for uncontrolled mode.
 * @param value - Current date range for controlled mode.
 * @param onChange - Callback when date range changes.
 * @param presets - Available date range presets.
 * @param showTimePicker - Whether to show time selection for both dates.
 * @param placeholder - Input placeholder text.
 * @param translations - Custom text translations.
 */
const /**
       *
       */
  RangeDatePicker = ({
    defaultValue,
    value,
    onChange,
    presets,
    disabled,
    disableNavigation,
    disabledDays,
    enableYearNavigation = false,
    locale = enUS,
    showTimePicker,
    placeholder = "Select date range",
    hasError,
    translations,
    align = "center",
    className,
    ...props
  }: RangeProps) => {
    const [open, setOpen] = React.useState(false);
    const [range, setRange] = React.useState<DateRange | undefined>(
      value ?? defaultValue ?? undefined,
    );
    const [month, setMonth] = React.useState<Date | undefined>(range?.from);

    const [startTime, setStartTime] = React.useState<TimeValue | null>(
      value?.from
        ? new Time(value.from.getHours(), value.from.getMinutes())
        : defaultValue?.from
          ? new Time(defaultValue.from.getHours(), defaultValue.from.getMinutes())
          : new Time(0, 0),
    );
    const [endTime, setEndTime] = React.useState<TimeValue | null>(
      value?.to
        ? new Time(value.to.getHours(), value.to.getMinutes())
        : defaultValue?.to
          ? new Time(defaultValue.to.getHours(), defaultValue.to.getMinutes())
          : new Time(0, 0),
    );

    const initialRange = React.useMemo(() => {
      return range;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    React.useEffect(() => {
      setRange(value ?? defaultValue ?? undefined);
    }, [value, defaultValue]);

    React.useEffect(() => {
      if (range) {
        setMonth(range.from);
      }
    }, [range]);

    React.useEffect(() => {
      if (!open) {
        setMonth(range?.from);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const onRangeChange = (range: DateRange | undefined) => {
      const newRange = range;
      if (showTimePicker) {
        if (newRange?.from && !startTime) {
          setStartTime(new Time(0, 0));
        }

        if (newRange?.to && !endTime) {
          setEndTime(new Time(0, 0));
        }

        if (newRange?.from && startTime) {
          newRange.from.setHours(startTime.hour);
          newRange.from.setMinutes(startTime.minute);
        }

        if (newRange?.to && endTime) {
          newRange.to.setHours(endTime.hour);
          newRange.to.setMinutes(endTime.minute);
        }
      }

      setRange(newRange);
    };

    const onCancel = () => {
      setRange(initialRange);
      setStartTime(
        initialRange?.from
          ? new Time(initialRange.from.getHours(), initialRange.from.getMinutes())
          : new Time(0, 0),
      );
      setEndTime(
        initialRange?.to
          ? new Time(initialRange.to.getHours(), initialRange.to.getMinutes())
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

    const onTimeChange = (time: TimeValue | null, pos: "start" | "end") => {
      switch (pos) {
        case "start":
          setStartTime(time);
          break;
        case "end":
          setEndTime(time);
          break;
      }

      if (!range) {
        return;
      }

      if (pos === "start") {
        if (!range.from) {
          return;
        }

        const newDate = new Date(range.from.getTime());

        if (!time) {
          newDate.setHours(0);
          newDate.setMinutes(0);
        }
        else {
          newDate.setHours(time.hour);
          newDate.setMinutes(time.minute);
        }

        setRange({
          ...range,
          from: newDate,
        });
      }

      if (pos === "end") {
        if (!range.to) {
          return;
        }

        const newDate = new Date(range.to.getTime());

        if (!time) {
          newDate.setHours(0);
          newDate.setMinutes(0);
        }
        else {
          newDate.setHours(time.hour);
          newDate.setMinutes(time.minute);
        }

        setRange({
          ...range,
          to: newDate,
        });
      }
    };

    React.useEffect(() => {
      setRange(value ?? defaultValue ?? undefined);

      setStartTime(
        value?.from
          ? new Time(value.from.getHours(), value.from.getMinutes())
          : defaultValue?.from
            ? new Time(defaultValue.from.getHours(), defaultValue.from.getMinutes())
            : new Time(0, 0),
      );
      setEndTime(
        value?.to
          ? new Time(value.to.getHours(), value.to.getMinutes())
          : defaultValue?.to
            ? new Time(defaultValue.to.getHours(), defaultValue.to.getMinutes())
            : new Time(0, 0),
      );
    }, [value, defaultValue]);

    const displayRange = React.useMemo(() => {
      if (!range) {
        return null;
      }

      return `${
        range.from ? formatDate(range.from, locale, showTimePicker) : ""
      } - ${range.to ? formatDate(range.to, locale, showTimePicker) : ""}`;
    }, [range, locale, showTimePicker]);

    const onApply = () => {
      setOpen(false);
      onChange?.(range);
    };

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
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
          {displayRange}
        </Trigger>
        <CalendarPopover align={align}>
          <div className="flex">
            <div className="flex flex-col overflow-x-auto sm:flex-row sm:items-start">
              {presets && presets.length > 0 && (
                <div
                  className={cx(
                    "relative flex h-16 w-full items-center sm:h-full sm:w-40",
                    "border-b border-zinc-200 sm:border-r sm:border-b-0 dark:border-zinc-800",
                    "overflow-auto",
                  )}
                >
                  <div className="absolute px-3 sm:inset-0 sm:left-0 sm:p-2">
                    <PresetContainer
                      currentValue={range}
                      presets={presets}
                      onSelect={onRangeChange}
                    />
                  </div>
                </div>
              )}
              <div className="overflow-x-auto">
                <CalendarPrimitive
                  mode="range"
                  selected={range}
                  onSelect={onRangeChange}
                  month={month}
                  onMonthChange={setMonth}
                  numberOfMonths={2}
                  disabled={disabledDays}
                  disableNavigation={disableNavigation}
                  enableYearNavigation={enableYearNavigation}
                  locale={locale}
                  initialFocus
                  classNames={{
                    months:
                    "flex flex-row divide-x divide-zinc-200 dark:divide-zinc-800 overflow-x-auto",
                  }}
                  {...props}
                />
                {showTimePicker && (
                  <div className="flex items-center justify-evenly gap-x-3 border-t border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="flex flex-1 items-center gap-x-2">
                      <span className="dark:text-zinc-30 text-zinc-700">
                        {translations?.start ?? "Start"}
                        :
                      </span>
                      <TimeInput
                        value={startTime}
                        onChange={v => onTimeChange(v, "start")}
                        aria-label="Start date time"
                        isDisabled={!range?.from}
                        isRequired={props.required}
                      />
                    </div>
                    <Minus className="size-4 shrink-0 text-zinc-400" />
                    <div className="flex flex-1 items-center gap-x-2">
                      <span className="dark:text-zinc-30 text-zinc-700">
                        {translations?.end ?? "End"}
                        :
                      </span>
                      <TimeInput
                        value={endTime}
                        onChange={v => onTimeChange(v, "end")}
                        aria-label="End date time"
                        isDisabled={!range?.to}
                        isRequired={props.required}
                      />
                    </div>
                  </div>
                )}
                <div className="border-t border-zinc-200 p-3 sm:flex sm:items-center sm:justify-between dark:border-zinc-800">
                  <p className="text-zinc-900 tabular-nums dark:text-zinc-50">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {translations?.range ?? "Range"}
                      :
                    </span>
                    {" "}
                    <span className="font-medium">{displayRange}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-x-2 sm:mt-0">
                    <Button
                      variant="secondary"
                      className="h-8 w-full sm:w-fit"
                      type="button"
                      onClick={onCancel}
                    >
                      {translations?.cancel ?? "Cancel"}
                    </Button>
                    <Button
                      variant="default"
                      className="h-8 w-full sm:w-fit"
                      type="button"
                      onClick={onApply}
                    >
                      {translations?.apply ?? "Apply"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CalendarPopover>
      </Popover>
    );
  };

// #region Preset Validation
// ============================================================================

/**
 * Validates that preset dates/ranges fall within the configured date constraints.
 *
 * Checks all provided presets against the picker's date range limits (fromYear,
 * toYear, fromMonth, toMonth, fromDay, toDay) and throws descriptive errors
 * if any presets fall outside the allowed range.
 *
 * @param presets - Array of date or date range presets to validate.
 * @param rules - Picker configuration with date constraints.
 * @throws {Error} When presets violate date range constraints.
 */
const validatePresets = (
  presets: DateRangePreset[] | DatePreset[],
  rules: PickerProps,
) => {
  const { toYear, fromYear, fromMonth, toMonth, fromDay, toDay } = rules;

  if (presets && presets.length > 0) {
    const fromYearToUse = fromYear;
    const toYearToUse = toYear;

    for (const preset of presets) {
      if ("date" in preset) {
        const presetYear = preset.date.getFullYear();

        if (fromYear && presetYear < fromYear) {
          throw new Error(
            `Preset ${preset.label} is before fromYear ${fromYearToUse}.`,
          );
        }

        if (toYear && presetYear > toYear) {
          throw new Error(
            `Preset ${preset.label} is after toYear ${toYearToUse}.`,
          );
        }

        if (fromMonth) {
          const presetMonth = preset.date.getMonth();

          if (presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label} is before fromMonth ${fromMonth}.`,
            );
          }
        }

        if (toMonth) {
          const presetMonth = preset.date.getMonth();

          if (presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label} is after toMonth ${toMonth}.`,
            );
          }
        }

        if (fromDay) {
          const presetDay = preset.date.getDate();

          if (presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is before fromDay ${fromDay}.`,
            );
          }
        }

        if (toDay) {
          const presetDay = preset.date.getDate();

          if (presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is after toDay ${format(
                toDay,
                "MMM dd, yyyy",
              )}.`,
            );
          }
        }
      }

      if ("dateRange" in preset) {
        const presetFromYear = preset.dateRange.from?.getFullYear();
        const presetToYear = preset.dateRange.to?.getFullYear();

        if (presetFromYear && fromYear && presetFromYear < fromYear) {
          throw new Error(
            `Preset ${preset.label}'s 'from' is before fromYear ${fromYearToUse}.`,
          );
        }

        if (presetToYear && toYear && presetToYear > toYear) {
          throw new Error(
            `Preset ${preset.label}'s 'to' is after toYear ${toYearToUse}.`,
          );
        }

        if (fromMonth) {
          const presetMonth = preset.dateRange.from?.getMonth();

          if (presetMonth && presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'from' is before fromMonth ${format(
                fromMonth,
                "MMM, yyyy",
              )}.`,
            );
          }
        }

        if (toMonth) {
          const presetMonth = preset.dateRange.to?.getMonth();

          if (presetMonth && presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toMonth ${format(
                toMonth,
                "MMM, yyyy",
              )}.`,
            );
          }
        }

        if (fromDay) {
          const presetDay = preset.dateRange.from?.getDate();

          if (presetDay && presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${
                preset.dateRange.from
              }'s 'from' is before fromDay ${format(fromDay, "MMM dd, yyyy")}.`,
            );
          }
        }

        if (toDay) {
          const presetDay = preset.dateRange.to?.getDate();

          if (presetDay && presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toDay ${format(
                toDay,
                "MMM dd, yyyy",
              )}.`,
            );
          }
        }
      }
    }
  }
};

// #region Types & Exports
// ============================================================================

/**
 * Props for the SingleDatePicker component.
 *
 * Combines single date specific props with base picker configuration.
 * Used for selecting individual dates with optional presets and time selection.
 */
type SingleDatePickerProps = {
  /**
   * Preset date options to display.
   */
  presets?: DatePreset[];
  /**
   * Default date for uncontrolled mode.
   */
  defaultValue?: Date;
  /**
   * Current date for controlled mode.
   */
  value?: Date;
  /**
   * Callback when date selection changes.
   */
  onChange?: (date: Date | undefined) => void;
} & PickerProps;

/**
 * A comprehensive single date picker component with optional time selection.
 *
 * Features include calendar navigation, preset date options, time picker integration,
 * localization support, and comprehensive date validation. Built with accessibility
 * in mind and supports both controlled and uncontrolled modes.
 *
 * @param value - Current selected date (controlled mode).
 * @param defaultValue - Default selected date (uncontrolled mode).
 * @param onChange - Handler called when date changes.
 * @param presets - Array of preset date options.
 * @param placeholder - Placeholder text for the trigger button.
 * @param showTimePicker - Whether to include time selection.
 * @param disabled - Whether the picker is disabled.
 * @param disabledDays - Days that cannot be selected.
 * @param locale - Date formatting locale.
 * @param translations - Custom text translations.
 * @param hasError - Whether to show error styling
 * @param enableYearNavigation - Whether to enable year dropdown navigation
 * @param fromYear - Minimum selectable year
 * @param toYear - Maximum selectable year
 * @param fromMonth - Minimum selectable month
 * @param toMonth - Maximum selectable month
 *
 * @component
 * @example
 * ```tsx
 * // Basic date picker
 * <DatePicker placeholder="Select date" onChange={setSelectedDate} />
 *
 * // With presets and time picker
 * <DatePicker
 *   showTimePicker
 *   presets={[
 *     { label: "Today", date: new Date() },
 *     { label: "Tomorrow", date: addDays(new Date(), 1) },
 *     { label: "Next Week", date: addDays(new Date(), 7) }
 *   ]}
 *   onChange={setSelectedDate}
 * />
 *
 * // Controlled with validation
 * <DatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   fromYear={2020}
 *   toYear={2030}
 *   hasError={!!dateError}
 *   required
 * />
 *
 * // With custom locale and translations
 * <DatePicker
 *   locale={es}
 *   translations={{ cancel: "Cancelar", apply: "Aplicar" }}
 *   enableYearNavigation
 * />
 * ```
 */
const /**
       *
       */
  DatePicker = ({ presets, ...props }: SingleDatePickerProps) => {
    if (presets) {
      validatePresets(presets, props);
    }

    return <SingleDatePicker presets={presets} {...(props as SingleProps)} />;
  };

DatePicker.displayName = "DatePicker";

/**
 * Props for the DateRangePicker component.
 *
 * Combines date range specific props with base picker configuration.
 * Used for selecting date ranges with optional presets and time selection.
 */
type RangeDatePickerProps = {
  /**
   * Preset date range options to display.
   */
  presets?: DateRangePreset[];
  /**
   * Default date range for uncontrolled mode.
   */
  defaultValue?: DateRange;
  /**
   * Current date range for controlled mode.
   */
  value?: DateRange;
  /**
   * Callback when date range selection changes.
   */
  onChange?: (dateRange: DateRange | undefined) => void;
} & PickerProps;

/**
 * A comprehensive date range picker component with optional time selection.
 *
 * Features include dual calendar navigation, preset date range options, time picker
 * integration for both start and end dates, localization support, and comprehensive
 * validation. Perfect for booking systems, analytics dashboards, and date filtering.
 *
 * @param value - Current selected date range (controlled mode).
 * @param defaultValue - Default selected date range (uncontrolled mode).
 * @param onChange - Handler called when date range changes.
 * @param presets - Array of preset date range options.
 * @param placeholder - Placeholder text for the trigger button.
 * @param showTimePicker - Whether to include time selection for both dates.
 * @param disabled - Whether the picker is disabled.
 * @param disabledDays - Days that cannot be selected.
 * @param locale - Date formatting locale.
 * @param translations - Custom text translations.
 * @param hasError - Whether to show error styling
 * @param enableYearNavigation - Whether to enable year dropdown navigation
 *
 * @component
 * @example
 * ```tsx
 * // Basic date range picker
 * <DateRangePicker
 *   placeholder="Select date range"
 *   onChange={setDateRange}
 * />
 *
 * // With presets and time picker
 * <DateRangePicker
 *   showTimePicker
 *   presets={[
 *     { label: "Last 7 days", dateRange: {
 *       from: subDays(new Date(), 7), to: new Date() } },
 *     { label: "Last 30 days", dateRange: {
 *       from: subDays(new Date(), 30), to: new Date() } },
 *     { label: "This month", dateRange: {
 *       from: startOfMonth(new Date()), to: endOfMonth(new Date()) } }
 *   ]}
 *   onChange={setDateRange}
 * />
 *
 * // Controlled with validation
 * <DateRangePicker
 *   value={selectedRange}
 *   onChange={setSelectedRange}
 *   fromYear={2020}
 *   toYear={2030}
 *   hasError={!!rangeError}
 *   required
 * />
 *
 * // Custom translations
 * <DateRangePicker
 *   translations={{
 *     cancel: "Cancel",
 *     apply: "Apply",
 *     start: "Check-in",
 *     end: "Check-out",
 *     range: "Stay Duration"
 *   }}
 * />
 * ```
 */
const /**
       *
       */
  DateRangePicker = ({ presets, ...props }: RangeDatePickerProps) => {
    if (presets) {
      validatePresets(presets, props);
    }

    return <RangeDatePicker presets={presets} {...(props as RangeProps)} />;
  };

DateRangePicker.displayName = "DateRangePicker";

export {
  DatePicker,
  type DatePreset,
  type DateRange,
  DateRangePicker,
  type DateRangePreset,
};
