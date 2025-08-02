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

import { cx, focusRing } from "../../../lib/utils";
import { Button } from "../button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select";

/**
 * Calendar component for date selection and navigation with customizable appearance.
 *
 * @id calendar
 * @name Calendar
 * @icon Calendar
 * @category ui
 * @component
 * @see {@link https://react-day-picker.js.org/}
 * @param props - Component properties.
 */
const DropdownCaption = ({
  calendarMonth,
  displayIndex,
  startMonth,
  endMonth,
  locale,
  enableYearNavigation,
  captionLayout,
  disableNavigation,
  numberOfMonths,
}: {
  calendarMonth: { date: Date };
  displayIndex: number;
  startMonth?: Date;
  endMonth?: Date;
  locale?: Partial<Locale>;
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
    if (!startMonth || !endMonth) { return []; }

    const monthsInRange = eachMonthOfInterval({
      start: startMonth,
      end: endMonth,
    });

    return monthsInRange.map(month => ({
      value: getMonth(month).toString(),
      label: format(month, "MMMM"),
    }));
  }, [startMonth, endMonth, locale]);

  // Generate year options
  const yearOptions = React.useMemo(() => {
    if (!startMonth || !endMonth) { return []; }

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

/**
 * Props for the Calendar component.
 *
 * Extends DayPicker props with additional calendar-specific options.
 */
type CalendarProps = DayPickerProps & {
  /**
   * Show year navigation buttons.
   */
  enableYearNavigation?: boolean;
  /**
   * Whether to highlight today's date (default: true).
   */
  showToday?: boolean;
  /**
   * Whether to show the "Go to Today" button (default: false).
   */
  showTodayButton?: boolean;
  /**
   * Whether to show days from adjacent months (default: true).
   */
  showOutsideDays?: boolean;
  /**
   * Whether to show the week number (default: false).
   */
  showWeekNumber?: boolean;
  /**
   * Choose the layout of the month caption.
   */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  /**
   * Start month for dropdown navigation.
   */
  startMonth?: Date;
  /**
   * End month for dropdown navigation.
   */
  endMonth?: Date;
};

/**
 * Calendar component for date selection and navigation with customizable appearance.
 *
 * @id calendar
 * @name Calendar
 * @icon Calendar
 * @category ui
 * @component
 * @see {@link https://react-day-picker.js.org/}
 * @param props - Component properties.
 * @param props.weekStartsOn - Day of the week to start the calendar on (default: 1 for Monday).
 * @param props.numberOfMonths - Number of months to display (default: 1).
 * @param props.enableYearNavigation - Show year navigation buttons (default: false).
 * @param props.showToday - Whether to highlight today's date (default: true).
 * @param props.showTodayButton - Whether to show the "Go to Today" button (default: false).
 * @param props.showOutsideDays - Whether to show days from adjacent months (default: true).
 * @param props.showWeekNumber - Whether to show the week number (default: false).
 * @param props.captionLayout - Choose the layout of the month caption.
 * @param props.startMonth - Start month for dropdown navigation.
 * @param props.endMonth - End month for dropdown navigation.
 * @param props.disableNavigation - Whether to disable navigation controls.
 * @param props.locale - Locale for date formatting and localization.
 * @param props.className - Additional CSS classes.
 * @param props.classNames - Custom class names for calendar elements.
 * @param props.selected - Selected date(s) for controlled selection.
 * @param props.onSelect - Callback fired when date selection changes.
 * @param props.mode - Selection mode (single, multiple, range).
 * @param props.disabled - Date(s) or matcher function to disable specific dates.
 * @param props.hidden - Date(s) or matcher function to hide specific dates.
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
  startMonth = new Date(new Date().getFullYear() - 10, 0), // 10 years ago
  endMonth = new Date(new Date().getFullYear() + 10, 11), // 10 years from now
  disableNavigation,
  locale,
  className,
  classNames,
  ...props
}: CalendarProps) => {
  const [key, setKey] = React.useState(0);

  const handleGoToToday = () => {
    // Force re-render to go to today's month
    setKey(prev => prev + 1);
  };

  return (
    <div className="space-y-3">
      <DayPicker
        key={key}
        weekStartsOn={weekStartsOn}
        numberOfMonths={numberOfMonths}
        locale={locale}
        today={new Date()}
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
          Chevron: ({ orientation, ...chevronProps }) => {
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
          },
          // Use custom caption for all layouts
          MonthCaption: ({ ...captionProps }) => {
            // Always call hooks at the top level
            const { goToMonth, nextMonth, previousMonth, months }
              = useDayPicker();

            if (captionLayout === "label") {
              // Original label layout with buttons
              const currentMonth = captionProps.calendarMonth.date;
              const displayIndex = captionProps.displayIndex;
              const isFirst = displayIndex === 0;
              const isLast = displayIndex === months.length - 1;

              const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
              const hidePreviousButton
                = numberOfMonths > 1 && (isLast || !isFirst);

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
                        onClick={() =>
                          previousMonth && goToMonth(previousMonth)}
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
              // Use custom dropdown caption for dropdown layouts
              return (
                <DropdownCaption
                  calendarMonth={captionProps.calendarMonth}
                  displayIndex={captionProps.displayIndex}
                  startMonth={startMonth}
                  endMonth={endMonth}
                  locale={locale}
                  enableYearNavigation={enableYearNavigation}
                  captionLayout={captionLayout}
                  disableNavigation={disableNavigation}
                  numberOfMonths={numberOfMonths}
                />
              );
            }
          },
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
