"use client";

import { Time } from "@internationalized/date";
import { Button } from "@patternmode/button";
import { Calendar as CalendarPrimitive } from "@patternmode/calendar";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@patternmode/popover";
import { cx } from "@patternmode/utils/cx";
import { focusInput } from "@patternmode/utils/focus-input";
import { focusRing } from "@patternmode/utils/focus-ring";
import type { TimeValue } from "@react-aria/datepicker";
import { useDateSegment, useTimeField } from "@react-aria/datepicker";
import { useTimeFieldState } from "@react-stately/datepicker";
import type { Locale } from "date-fns";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "lucide-react";
import * as React from "react";
import type {
  DatePreset,
  DateRange,
  DateRangePreset,
  Preset,
  PresetContainerProps,
  SingleDatePickerProps,
  TimeInputProps,
  TimeSegmentProps,
  TriggerProps,
} from "./types";

// #region TimeInput
// ============================================================================

const isBrowserLocaleClockType24h = () => {
  const language =
    typeof window !== "undefined" ? window.navigator.language : "en-US";

  const hr = new Intl.DateTimeFormat(language, {
    hour: "numeric",
  }).format();

  return Number.isInteger(Number(hr));
};

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  // Skip rendering for any non-editable segments except colon
  if (
    !segment.isEditable &&
    segment.type === "literal" &&
    segment.text !== ":"
  ) {
    return null;
  }

  return (
    <div
      {...segmentProps}
      className={cx(
        // base
        "relative block w-full appearance-none rounded-md border px-2.5 py-1.5 text-left uppercase tabular-nums outline-hidden transition sm:text-sm",
        // border color
        "dark:border-zinc-800",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // background color
        "bg-white dark:bg-zinc-950",
        // focus
        focusInput,
        // invalid (optional)
        "invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 group-aria-invalid/time-input:border-red-500 group-aria-invalid/time-input:ring-2 group-aria-invalid/time-input:ring-red-200 dark:group-aria-invalid/time-input:ring-red-400/20",
        {
          "w-fit! border-none bg-transparent px-0 text-zinc-400 shadow-none":
            segment.type === "literal",
          "bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500":
            state.isDisabled && segment.text !== ":",
        }
      )}
      ref={ref}
    >
      {segment.isPlaceholder ? segment.placeholder : segment.text}
    </div>
  );
};

const TimeInput = ({ ref, hourCycle, ...props }: TimeInputProps) => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => innerRef?.current
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
    innerRef
  );

  return (
    <div
      {...fieldProps}
      className="group/time-input inline-flex w-full gap-x-2"
      ref={innerRef}
    >
      {state.segments.map((segment, i) => {
        const segProps = { segment, state };
        return <TimeSegment key={`${segment.type}-${i}`} {...segProps} />;
      })}
    </div>
  );
};
TimeInput.displayName = "TimeInput";

// #region Trigger
// ============================================================================

const Trigger = ({
  ref: forwardedRef,
  className,
  children,
  placeholder,
  hasError,
  icon: _icon,
  size = "base",
  ...props
}: TriggerProps) => {
  const IconComponent = Calendar;

  return (
    <PopoverTrigger
      render={
        <Button
          leftIcon={IconComponent}
          ref={forwardedRef}
          size={size}
          textAlign="left"
          {...props}
        />
      }
    >
      {children || placeholder ? <span>{placeholder}</span> : null}
    </PopoverTrigger>
  );
};

Trigger.displayName = "DatePicker.Trigger";

// #region Popover
// ============================================================================

const CalendarPopover = ({
  ref: forwardedRef,
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent> & {
  ref?: React.RefObject<React.ElementRef<typeof PopoverContent> | null>;
}) => {
  return (
    <PopoverPortal>
      <PopoverContent
        className={cx(
          // base
          "w-fit text-sm",
          // widths
          "max-w-[95vw]",
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </PopoverContent>
    </PopoverPortal>
  );
};

CalendarPopover.displayName = "DatePicker.CalendarPopover";

// #region Utility Functions
// ============================================================================

const formatDate = (
  date: Date,
  locale: Locale,
  includeTime?: boolean
): string => {
  const usesAmPm = !isBrowserLocaleClockType24h();
  let dateString: string;

  if (includeTime) {
    dateString = usesAmPm
      ? format(date, "dd MMM, yyyy h:mm a", { locale })
      : format(date, "dd MMM, yyyy HH:mm", { locale });
  } else {
    dateString = format(date, "dd MMM, yyyy", { locale });
  }

  return dateString;
};

const PresetContainer = <TPreset extends Preset, TValue>({
  presets,
  onPresetSelect,
  currentValue,
}: PresetContainerProps<TPreset, TValue>) => {
  const isDateRangePresets = (
    preset: TPreset
  ): preset is TPreset & DateRangePreset => {
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
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
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
      {presets.map((preset) => {
        return (
          <li className="sm:w-full sm:py-px" key={`preset-${preset.label}`}>
            <button
              aria-label={`Select ${preset.label}`}
              className={cx(
                // base
                "relative w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border px-2.5 py-1.5 text-left text-base outline-hidden transition-all sm:border-none sm:py-2 sm:text-sm sm:shadow-none",
                // text color
                "text-zinc-700 dark:text-zinc-300",
                // border color
                "dark:border-zinc-800",
                // focus
                focusRing,
                // background color
                "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
                "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                {
                  "bg-zinc-100 dark:bg-zinc-900": matchesCurrent(preset),
                }
              )}
              onClick={() => handleClick(preset)}
              title={preset.label}
              type="button"
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

const SingleDatePicker = ({
  value,
  onValueChange,
  presets,
  disabled,
  placeholder = "Select date",
  size = "base",
  hasError,
  icon: _icon,
  translations,
  enableYearNavigation = false,
  locale = enUS,
  className,
  ...props
}: SingleDatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value ?? undefined);
  const [month, setMonth] = React.useState<Date | undefined>(date);

  const [time, setTime] = React.useState<TimeValue | null>(() =>
    value ? new Time(value.getHours(), value.getMinutes()) : new Time(0, 0)
  );

  const initialDate = React.useMemo(() => {
    return date;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  React.useEffect(() => {
    setDate(value ?? undefined);
  }, [value]);

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
  }, [open, date]);

  const onCancel = () => {
    setDate(initialDate);
    setTime(
      initialDate
        ? new Time(initialDate.getHours(), initialDate.getMinutes())
        : new Time(0, 0)
    );
    setOpen(false);
  };

  const onOpenChange = (isOpenValue: boolean) => {
    if (!isOpenValue) {
      onCancel();
    }

    setOpen(isOpenValue);
  };

  const onDateChange = (newDateValue: Date | undefined) => {
    const newDate = newDateValue;
    if (props.enableTime) {
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

  const onTimeChange = (newTime: TimeValue | null) => {
    setTime(newTime);

    if (!date) {
      return;
    }

    const newDate = new Date(date.getTime());

    if (time) {
      newDate.setHours(time.hour);
      newDate.setMinutes(time.minute);
    } else {
      newDate.setHours(0);
      newDate.setMinutes(0);
    }

    setDate(newDate);
  };

  const formattedDate = React.useMemo(() => {
    if (!date) {
      return null;
    }

    return formatDate(date, locale, props.enableTime);
  }, [date, locale, props.enableTime]);

  const onApply = () => {
    setOpen(false);
    onValueChange?.(date);
  };

  React.useEffect(() => {
    setDate(value ?? undefined);
    setTime(
      value ? new Time(value.getHours(), value.getMinutes()) : new Time(0, 0)
    );
  }, [value]);

  return (
    <Popover data-testid="date-picker" onOpenChange={onOpenChange} open={open}>
      <Trigger
        aria-label={props["aria-label"]}
        className={className}
        disabled={disabled}
        hasError={hasError}
        icon={_icon}
        placeholder={placeholder}
        size={size}
      >
        {formattedDate}
      </Trigger>
      <CalendarPopover>
        <div className="flex">
          <div className="flex flex-col sm:flex-row sm:items-start">
            {presets && presets.length > 0 && (
              <div
                className={cx(
                  "relative flex h-14 w-full items-center sm:h-full sm:w-40",
                  "border-b sm:border-r sm:border-b-0 dark:border-zinc-800",
                  "overflow-auto"
                )}
              >
                <div className="absolute px-2 pr-2 sm:inset-0 sm:left-0 sm:py-2">
                  <PresetContainer
                    currentValue={date}
                    onPresetSelect={onDateChange}
                    presets={presets}
                  />
                </div>
              </div>
            )}
            <div>
              <CalendarPrimitive
                disabled={disabled}
                enableYearNavigation={enableYearNavigation}
                initialFocus
                locale={locale}
                mode="single"
                month={month}
                onMonthChange={setMonth}
                onSelect={onDateChange}
                selected={date}
              />
              {props.enableTime && (
                <div className="border-t p-3 dark:border-zinc-800">
                  <TimeInput
                    aria-label="Time"
                    isDisabled={!date}
                    onChange={onTimeChange}
                    value={time ?? undefined}
                  />
                </div>
              )}
              <div className="flex items-center gap-x-2 border-t p-3 dark:border-zinc-800">
                <Button
                  className="h-8 w-full"
                  onClick={onCancel}
                  type="button"
                  variant="secondary"
                >
                  {translations?.cancel ?? "Cancel"}
                </Button>
                <Button
                  className="h-8 w-full"
                  onClick={onApply}
                  type="button"
                  variant="primary"
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
  return <SingleDatePicker presets={presets} {...props} />;
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
