"use client";

import { Button } from "@patternmode/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/select";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type { Locale } from "date-fns";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DayPickerProps, Matcher } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { ChevronComponent } from "./chevron";
import { createMonthCaptionWrapper } from "./month-caption";

/**
 * Props for the Calendar component.
 * Extends DayPicker props with additional calendar-specific options.
 */
export type CalendarProps = DayPickerProps & {
  enableYearNavigation?: boolean;
  showToday?: boolean;
  showTodayButton?: boolean;
  showOutsideDays?: boolean;
  showWeekNumber?: boolean;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  numberOfMonths?: number;
  disableNavigation?: boolean;
  startMonth?: Date;
  endMonth?: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: Partial<Locale>;
  classNames?: DayPickerProps["classNames"];
  className?: string;
};

/**
 * Calendar component for date selection with custom caption and navigation.
 */
export const Calendar = ({
  enableYearNavigation = false,
  showToday = true,
  showTodayButton = false,
  showOutsideDays = true,
  showWeekNumber = false,
  captionLayout = "label",
  numberOfMonths = 1,
  disableNavigation,
  startMonth = new Date(1900, 0, 1),
  endMonth = new Date(2100, 11, 31),
  weekStartsOn = 0,
  locale,
  className,
  classNames,
  ...props
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState(() => new Date());

  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-3" data-testid="calendar">
      <DayPicker
        captionLayout={captionLayout}
        className={cx("p-3", className)}
        classNames={{
          months: "flex space-y-0",
          month: "space-y-4",
          month_caption: "flex justify-center pt-1 relative items-center",
          caption_label: cx(
            "text-sm font-medium text-gray-900 dark:text-gray-50",
            "capitalize tabular-nums"
          ),
          nav: "hidden",
          month_grid: "w-full border-collapse space-y-1",
          weekdays: cx("grid", showWeekNumber ? "grid-cols-8" : "grid-cols-7"),
          weekday: cx(
            "w-9 h-9 font-medium text-sm text-center flex items-center justify-center",
            "text-gray-400 dark:text-gray-600 pb-2"
          ),
          week: cx(
            "grid w-full mt-0.5 grid-rows-1",
            showWeekNumber ? "grid-cols-8" : "grid-cols-7"
          ),
          day: cx(
            "relative p-0 text-center focus-within:relative",
            "h-9 w-9 inline-flex items-center justify-center",
            "text-sm font-normal text-gray-900 dark:text-gray-50"
          ),
          today: cx(showToday && "bg-gray-100 dark:bg-gray-800 "),
          week_number: cx(
            "h-9 w-9 p-0 font-normal text-sm",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md",
            "text-gray-900 dark:text-gray-50",
            "opacity-50"
          ),
          day_button: cx(
            "h-9 w-9 p-0 font-normal text-sm",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md",
            "transition-colors",
            "text-gray-900 dark:text-gray-50",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            focusRing,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          ),
          day_selected: cx(
            "bg-gray-900 text-gray-50 hover:bg-gray-900 hover:text-gray-50",
            "dark:bg-gray-50 dark:text-gray-900",
            "dark:hover:bg-gray-50 dark:hover:text-gray-900",
            "focus:bg-gray-900 focus:text-gray-50",
            "dark:focus:bg-gray-50 dark:focus:text-gray-900"
          ),
          day_disabled: cx(
            "text-gray-400 dark:text-gray-600",
            "opacity-50 cursor-not-allowed",
            "hover:bg-transparent dark:hover:bg-transparent"
          ),
          outside: "!opacity-50",
          day_range_middle: cx(
            "aria-selected:bg-gray-100 aria-selected:text-gray-900",
            "dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50",
            "rounded-none"
          ),
          day_range_start: cx("rounded-r-none"),
          day_range_end: cx("rounded-l-none"),
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          Chevron: ChevronComponent,
          MonthCaption: createMonthCaptionWrapper(
            captionLayout,
            enableYearNavigation,
            numberOfMonths,
            disableNavigation,
            startMonth,
            endMonth,
            locale
          ),
        }}
        disableNavigation={disableNavigation}
        endMonth={endMonth}
        locale={locale}
        numberOfMonths={numberOfMonths}
        showOutsideDays={showOutsideDays}
        showWeekNumber={showWeekNumber}
        startMonth={startMonth}
        today={currentDate}
        weekStartsOn={weekStartsOn}
        {...props}
      />
      {showTodayButton && (
        <div className="flex justify-center pt-1">
          <Button
            aria-label="Go to today"
            className="text-xs"
            leftIcon={CalendarIcon}
            onClick={handleGoToToday}
            size="sm"
            variant="outline"
          >
            Today
          </Button>
        </div>
      )}
    </div>
  );
};

Calendar.displayName = "Calendar";

export type { Matcher };
