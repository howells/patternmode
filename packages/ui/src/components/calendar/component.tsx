"use client";

import type { Locale } from "date-fns";
import type { DayPickerProps, Matcher } from "react-day-picker";

import {
  addYears,
  eachMonthOfInterval,
  eachYearOfInterval,
  format,
  getMonth,
  getYear,
  setMonth,
  setYear,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  useDayPicker,
} from "react-day-picker";

import { cx, focusRing } from "../../lib/utils";
import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

const DropdownCaption = ({
  calendarMonth,
  displayIndex,
  startMonth,
  endMonth,
  _locale,
  enableYearNavigation,
  captionLayout,
  disableNavigation,
  numberOfMonths,
}: {
  calendarMonth: { date: Date };
  displayIndex: number;
  startMonth?: Date;
  endMonth?: Date;
  _locale?: Partial<Locale>;
  enableYearNavigation?: boolean;
  captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years";
  disableNavigation?: boolean;
  numberOfMonths?: number;
}) => {
  const { goToMonth, nextMonth, previousMonth, months } = useDayPicker();

  const currentMonth = calendarMonth.date;
  const isFirst = displayIndex === 0;
  const isLast = displayIndex === months.length - 1;

  const hideNextButton
    = numberOfMonths && numberOfMonths > 1 && (isFirst || !isLast);
  const hidePreviousButton
    = numberOfMonths && numberOfMonths > 1 && (isLast || !isFirst);

  // Generate month options
  const monthOptions = React.useMemo(() => {
    if (!startMonth || !endMonth) {
      return [];
    }

    const monthsInRange = eachMonthOfInterval({
      start: startMonth,
      end: endMonth,
    });

    return monthsInRange.map(month => ({
      value: getMonth(month).toString(),
      label: format(month, "MMMM"),
    }));
  }, [startMonth, endMonth]);

  // Generate year options
  const yearOptions = React.useMemo(() => {
    if (!startMonth || !endMonth) {
      return [];
    }

    const yearsInRange = eachYearOfInterval({
      start: startMonth,
      end: endMonth,
    });

    return yearsInRange.map(year => ({
      value: getYear(year).toString(),
      label: getYear(year).toString(),
    }));
  }, [startMonth, endMonth]);

  const handleMonthChange = (monthValue: string) => {
    const newMonth = setMonth(currentMonth, Number.parseInt(monthValue));
    goToMonth(newMonth);
  };

  const handleYearChange = (yearValue: string) => {
    const newMonth = setYear(currentMonth, Number.parseInt(yearValue));
    goToMonth(newMonth);
  };

  const goToPreviousYear = () => {
    const targetMonth = addYears(currentMonth, -1);
    if (previousMonth) {
      goToMonth(targetMonth);
    }
  };

  const goToNextYear = () => {
    const targetMonth = addYears(currentMonth, 1);
    if (nextMonth) {
      goToMonth(targetMonth);
    }
  };

  const showMonthDropdown
    = captionLayout === "dropdown" || captionLayout === "dropdown-months";
  const showYearDropdown
    = captionLayout === "dropdown" || captionLayout === "dropdown-years";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {enableYearNavigation && !hidePreviousButton && (
          <Button
            variant="outline"
            size="icon-sm"
            disabled={disableNavigation || !previousMonth}
            aria-label="Go to previous year"
            onClick={goToPreviousYear}
            leftIcon={ChevronsLeft}
          />
        )}
        {!hidePreviousButton && (
          <Button
            variant="outline"
            size="icon-sm"
            disabled={disableNavigation || !previousMonth}
            aria-label="Go to previous month"
            onClick={() => previousMonth && goToMonth(previousMonth)}
            leftIcon={ChevronLeft}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {showMonthDropdown
          ? (
              <Select
                value={getMonth(currentMonth).toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger size="sm" className="w-auto min-w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(month => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          : (
              <span className="text-sm font-medium capitalize tabular-nums text-gray-900 dark:text-gray-50">
                {format(currentMonth, "MMMM")}
              </span>
            )}

        {showYearDropdown
          ? (
              <Select
                value={getYear(currentMonth).toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger size="sm" className="w-auto min-w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map(year => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          : (
              <span className="text-sm font-medium capitalize tabular-nums text-gray-900 dark:text-gray-50">
                {format(currentMonth, "yyyy")}
              </span>
            )}
      </div>

      <div className="flex items-center gap-1">
        {!hideNextButton && (
          <Button
            variant="outline"
            size="icon-sm"
            disabled={disableNavigation || !nextMonth}
            aria-label="Go to next month"
            onClick={() => nextMonth && goToMonth(nextMonth)}
            leftIcon={ChevronRight}
          />
        )}
        {enableYearNavigation && !hideNextButton && (
          <Button
            variant="outline"
            size="icon-sm"
            disabled={disableNavigation || !nextMonth}
            aria-label="Go to next year"
            onClick={goToNextYear}
            leftIcon={ChevronsRight}
          />
        )}
      </div>
    </div>
  );
};

const ChevronComponent = ({ orientation = "right", ...chevronProps }: { orientation?: "left" | "up" | "down" | "right"; [key: string]: any }) => {
  if (orientation === "left") {
    return (
      <ChevronLeft
        aria-hidden="true"
        className="h-4 w-4"
        {...chevronProps}
      />
    );
  }
  return (
    <ChevronRight
      aria-hidden="true"
      className="h-4 w-4"
      {...chevronProps}
    />
  );
};

const MonthCaptionComponent = ({
  captionProps,
  captionLayout,
  enableYearNavigation,
  numberOfMonths,
  disableNavigation,
  startMonth,
  endMonth,
  locale,
}: {
  captionProps: any;
  captionLayout: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  enableYearNavigation: boolean;
  numberOfMonths: number;
  disableNavigation?: boolean;
  startMonth: Date;
  endMonth: Date;
  locale?: Partial<Locale>;
}) => {
  const { goToMonth, nextMonth, previousMonth, months } = useDayPicker();

  if (captionLayout === "label") {
    const currentMonth = captionProps.calendarMonth.date;
    const displayIndex = captionProps.displayIndex;
    const isFirst = displayIndex === 0;
    const isLast = displayIndex === months.length - 1;

    const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
    const hidePreviousButton = numberOfMonths > 1 && (isLast || !isFirst);

    const goToPreviousYear = () => {
      const targetMonth = addYears(currentMonth, -1);
      if (previousMonth) {
        goToMonth(targetMonth);
      }
    };

    const goToNextYear = () => {
      const targetMonth = addYears(currentMonth, 1);
      if (nextMonth) {
        goToMonth(targetMonth);
      }
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {enableYearNavigation && !hidePreviousButton && (
            <Button
              variant="outline"
              size="icon-sm"
              disabled={disableNavigation || !previousMonth}
              aria-label="Go to previous year"
              onClick={goToPreviousYear}
              leftIcon={ChevronsLeft}
            />
          )}
          {!hidePreviousButton && (
            <Button
              variant="outline"
              size="icon-sm"
              disabled={disableNavigation || !previousMonth}
              aria-label="Go to previous month"
              onClick={() => previousMonth && goToMonth(previousMonth)}
              leftIcon={ChevronLeft}
            />
          )}
        </div>

        <div
          role="presentation"
          aria-live="polite"
          className={cx(
            "text-sm font-medium capitalize tabular-nums",
            "text-gray-900 dark:text-gray-50",
          )}
        >
          {format(currentMonth, "LLLL yyy")}
        </div>

        <div className="flex items-center gap-1">
          {!hideNextButton && (
            <Button
              variant="outline"
              size="icon-sm"
              disabled={disableNavigation || !nextMonth}
              aria-label="Go to next month"
              onClick={() => nextMonth && goToMonth(nextMonth)}
              leftIcon={ChevronRight}
            />
          )}
          {enableYearNavigation && !hideNextButton && (
            <Button
              variant="outline"
              size="icon-sm"
              disabled={disableNavigation || !nextMonth}
              aria-label="Go to next year"
              onClick={goToNextYear}
              leftIcon={ChevronsRight}
            />
          )}
        </div>
      </div>
    );
  }
  else {
    return (
      <DropdownCaption
        calendarMonth={captionProps.calendarMonth}
        displayIndex={captionProps.displayIndex}
        startMonth={startMonth}
        endMonth={endMonth}
        _locale={locale}
        enableYearNavigation={enableYearNavigation}
        captionLayout={captionLayout}
        disableNavigation={disableNavigation}
        numberOfMonths={numberOfMonths}
      />
    );
  }
};

const createMonthCaptionWrapper = (
  captionLayout: "label" | "dropdown" | "dropdown-months" | "dropdown-years",
  enableYearNavigation: boolean,
  numberOfMonths: number,
  disableNavigation?: boolean,
  startMonth?: Date,
  endMonth?: Date,
  locale?: Partial<Locale>,
) => (captionProps: any) => (
  <MonthCaptionComponent
    captionProps={captionProps}
    captionLayout={captionLayout}
    enableYearNavigation={enableYearNavigation}
    numberOfMonths={numberOfMonths}
    disableNavigation={disableNavigation}
    startMonth={startMonth!}
    endMonth={endMonth!}
    locale={locale}
  />
);

/**
 * Props for the Calendar component.
 * Extends DayPicker props with additional calendar-specific options.
 */
type CalendarProps = DayPickerProps & {
  /**
   * Show year navigation buttons that allow jumping forward and backward by year.
   * When enabled, additional year navigation buttons appear alongside month navigation.
   */
  enableYearNavigation?: boolean;

  /**
   * Whether to highlight today's date with special styling.
   * When enabled, today's date will have a distinct background color.
   */
  showToday?: boolean;

  /**
   * Whether to show a "Go to Today" button below the calendar.
   * When enabled, provides a quick way to navigate back to the current date.
   */
  showTodayButton?: boolean;

  /**
   * Whether to show days from adjacent months in the calendar grid.
   * When enabled, shows grayed-out dates from previous/next months to fill the grid.
   */
  showOutsideDays?: boolean;

  /**
   * Whether to show week numbers in the first column of the calendar.
   * When enabled, displays ISO week numbers for each week row.
   */
  showWeekNumber?: boolean;

  /**
   * Choose the layout style for the month/year caption header.
   * - "label": Static text with navigation arrows
   * - "dropdown": Both month and year as dropdowns
   * - "dropdown-months": Only month as dropdown
   * - "dropdown-years": Only year as dropdown.
   */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";

  /**
   * Start month for dropdown navigation boundaries.
   * Sets the earliest selectable month when using dropdown caption layouts.
   */
  startMonth?: Date;

  /**
   * End month for dropdown navigation boundaries.
   * Sets the latest selectable month when using dropdown caption layouts.
   */
  endMonth?: Date;
};

const DEFAULT_START_MONTH = new Date(new Date().getFullYear() - 10, 0); // 10 years ago
const DEFAULT_END_MONTH = new Date(new Date().getFullYear() + 10, 11); // 10 years from now

/**
 * Calendar component for date selection and navigation with customizable appearance.
 */
const Calendar = ({
  weekStartsOn = 1,
  numberOfMonths = 1,
  enableYearNavigation = false,
  showToday = true,
  showTodayButton = false,
  showOutsideDays = true,
  showWeekNumber = false,
  captionLayout = "label",
  startMonth = DEFAULT_START_MONTH,
  endMonth = DEFAULT_END_MONTH,
  disableNavigation,
  locale,
  className,
  classNames,
  ...props
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState(() => new Date());

  const handleGoToToday = () => {
    // Force re-render to go to today's month
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-3">
      <DayPicker
        weekStartsOn={weekStartsOn}
        numberOfMonths={numberOfMonths}
        locale={locale}
        today={currentDate}
        showOutsideDays={showOutsideDays}
        showWeekNumber={showWeekNumber}
        captionLayout={captionLayout}
        startMonth={startMonth}
        endMonth={endMonth}
        className={cx("p-3", className)}
        classNames={{
          months: "flex space-y-0",
          month: "space-y-4",
          month_caption: "flex justify-center pt-1 relative items-center",
          caption_label: cx(
            "text-sm font-medium text-gray-900 dark:text-gray-50",
            "capitalize tabular-nums",
          ),
          nav: "hidden", // Always hide native nav since we provide custom navigation
          month_grid: "w-full border-collapse space-y-1",
          weekdays: cx("grid", showWeekNumber ? "grid-cols-8" : "grid-cols-7"),
          weekday: cx(
            "w-9 h-9 font-medium text-sm text-center flex items-center justify-center",
            "text-gray-400 dark:text-gray-600 pb-2",
          ),
          week: cx(
            "grid w-full mt-0.5 grid-rows-1",
            showWeekNumber ? "grid-cols-8" : "grid-cols-7",
          ),
          day: cx(
            "relative p-0 text-center focus-within:relative",
            // Ensure consistent sizing for both interactive and non-interactive modes
            "h-9 w-9 inline-flex items-center justify-center",
            "text-sm font-normal text-gray-900 dark:text-gray-50",
          ),
          today: cx(showToday && "bg-gray-100 dark:bg-gray-800 font-semibold"),
          week_number: cx(
            "h-9 w-9 p-0 font-normal text-sm",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md",
            "text-gray-900 dark:text-gray-50",
            "opacity-50",
          ),
          day_button: cx(
            // Base styles
            "h-9 w-9 p-0 font-normal text-sm",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md",
            "transition-colors",
            // Default state
            "text-gray-900 dark:text-gray-50",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            // Focus styles
            focusRing,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          ),
          day_selected: cx(
            "bg-gray-900 text-gray-50 hover:bg-gray-900 hover:text-gray-50",
            "dark:bg-gray-50 dark:text-gray-900",
            "dark:hover:bg-gray-50 dark:hover:text-gray-900",
            "focus:bg-gray-900 focus:text-gray-50",
            "dark:focus:bg-gray-50 dark:focus:text-gray-900",
          ),
          day_disabled: cx(
            "text-gray-400 dark:text-gray-600",
            "opacity-50 cursor-not-allowed",
            "hover:bg-transparent dark:hover:bg-transparent",
          ),
          outside: "!opacity-50",
          day_range_middle: cx(
            "aria-selected:bg-gray-100 aria-selected:text-gray-900",
            "dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50",
            "rounded-none",
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
            locale,
          ),
        }}
        disableNavigation={disableNavigation}
        {...props}
      />
      {showTodayButton && (
        <div className="flex justify-center pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoToToday}
            aria-label="Go to today"
            leftIcon={CalendarIcon}
            className="text-xs"
          >
            Today
          </Button>
        </div>
      )}
    </div>
  );
};

Calendar.displayName = "Calendar";

export { Calendar, type CalendarProps, type Matcher };
