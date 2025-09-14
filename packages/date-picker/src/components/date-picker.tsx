"use client";

import { Time } from "@internationalized/date";
import { Button } from "@patternmode/button";
import { Calendar as CalendarPrimitive } from "@patternmode/calendar";
import { Popover } from "@patternmode/popover";
import { cx } from "@patternmode/utils/cx";
import type { TimeValue } from "@react-aria/datepicker";
import { enUS } from "date-fns/locale";
import * as React from "react";
import type { Locale } from "date-fns";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { TimeInput } from "./time-input";
import { Trigger } from "./trigger";
import { CalendarPopover } from "./calendar-popover";
import { PresetContainer } from "./preset-container";
import type { DatePreset, DateRange, DateRangePreset, Preset, PresetContainerProps, SingleDatePickerProps } from "../types";

const isBrowserLocaleClockType24h = () => {
  const language = typeof window !== "undefined" ? window.navigator.language : "en-US";
  const hr = new Intl.DateTimeFormat(language, { hour: "numeric" }).format();
  return Number.isInteger(Number(hr));
};

const formatDate = (date: Date, locale: Locale, includeTime?: boolean): string => {
  const usesAmPm = !isBrowserLocaleClockType24h();
  if (includeTime) {
    return usesAmPm
      ? format(date, "dd MMM, yyyy h:mm a", { locale })
      : format(date, "dd MMM, yyyy HH:mm", { locale });
  }
  return format(date, "dd MMM, yyyy", { locale });
};

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
  }, [date]);

  React.useEffect(() => {
    setDate(value ?? undefined);
  }, [value]);

  React.useEffect(() => {
    if (date) setMonth(date);
  }, [date]);

  React.useEffect(() => {
    if (!open) setMonth(date);
  }, [open, date]);

  const onCancel = () => {
    setDate(initialDate);
    setTime(initialDate ? new Time(initialDate.getHours(), initialDate.getMinutes()) : new Time(0, 0));
  };

  const onOpenChange = (isOpenValue: boolean) => {
    if (!isOpenValue) onCancel();
    setOpen(isOpenValue);
  };

  const onDateChange = (newDateValue: Date | undefined) => {
    const newDate = newDateValue;
    if (props.enableTime) {
      if (newDate && !time) setTime(new Time(0, 0));
      if (newDate && time) {
        newDate.setHours(time.hour);
        newDate.setMinutes(time.minute);
      }
    }
    setDate(newDate);
  };

  const onTimeChange = (newTime: TimeValue | null) => {
    setTime(newTime);
    if (!date) return;
    const newDate = new Date(date.getTime());
    if (newTime) {
      newDate.setHours(newTime.hour);
      newDate.setMinutes(newTime.minute);
    } else {
      newDate.setHours(0);
      newDate.setMinutes(0);
    }
    setDate(newDate);
  };

  const formattedDate = React.useMemo(() => {
    if (!date) return null;
    return formatDate(date, locale, props.enableTime);
  }, [date, locale, props.enableTime]);

  const onApply = () => {
    setOpen(false);
    onValueChange?.(date);
  };

  React.useEffect(() => {
    setDate(value ?? undefined);
    setTime(value ? new Time(value.getHours(), value.getMinutes()) : new Time(0, 0));
  }, [value]);

  return (
    <Popover data-testid="date-picker" onOpenChange={onOpenChange} open={open}>
      <Trigger
        aria-label={props["aria-label"]}
        className={className}
        disabled={disabled}
        hasError={hasError}
        icon={CalendarIcon}
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
                  <PresetContainer currentValue={date} onPresetSelect={onDateChange} presets={presets} />
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
                  <TimeInput aria-label="Time" isDisabled={!date} onChange={onTimeChange} value={time ?? undefined} />
                </div>
              )}
              <div className="flex items-center gap-x-2 border-t p-3 dark:border-zinc-800">
                <Button className="h-8 w-full" onClick={onCancel} type="button" variant="secondary">
                  {translations?.cancel ?? "Cancel"}
                </Button>
                <Button className="h-8 w-full" onClick={onApply} type="button" variant="primary">
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

const DatePicker = ({ presets, ...props }: SingleDatePickerProps) => {
  return <SingleDatePicker presets={presets} {...props} />;
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
