"use client";

import type { Locale } from "date-fns";
import {
  addYears,
  eachMonthOfInterval,
  eachYearOfInterval,
  format,
  getMonth,
  getYear,
  isSameMonth,
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
  type DayPickerProps,
  type DayProps,
  type Matcher,
} from "react-day-picker";

import { cx, focusRing } from "../../lib/utils";
import { Button } from "../button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select";

/**
 * Custom dropdown caption component using our Button and Select components
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

  const hideNextButton =
    numberOfMonths && numberOfMonths > 1 && (isFirst || !isLast);
  const hidePreviousButton =
    numberOfMonths && numberOfMonths > 1 && (isLast || !isFirst);

  // Generate month options
  const monthOptions = React.useMemo(() => {
    if (!startMonth || !endMonth) return [];

    const monthsInRange = eachMonthOfInterval({
      start: startMonth,
      end: endMonth,
    });

    return monthsInRange.map((month) => ({
      value: getMonth(month).toString(),
      label: format(month, "MMMM"),
    }));
  }, [startMonth, endMonth, locale]);

  // Generate year options
  const yearOptions = React.useMemo(() => {
    if (!startMonth || !endMonth) return [];

    const yearsInRange = eachYearOfInterval({
      start: startMonth,
      end: endMonth,
    });

    return yearsInRange.map((year) => ({
      value: getYear(year).toString(),
      label: getYear(year).toString(),
    }));
  }, [startMonth, endMonth]);

  const handleMonthChange = (monthValue: string) => {
    const newMonth = setMonth(currentMonth, parseInt(monthValue));
    goToMonth(newMonth);
  };

  const handleYearChange = (yearValue: string) => {
    const newMonth = setYear(currentMonth, parseInt(yearValue));
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

  const showMonthDropdown =
    captionLayout === "dropdown" || captionLayout === "dropdown-months";
  const showYearDropdown =
    captionLayout === "dropdown" || captionLayout === "dropdown-years";

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
        {showMonthDropdown ? (
          <Select
            value={getMonth(currentMonth).toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger size="sm" className="w-auto min-w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <span className="text-sm font-medium capitalize tabular-nums text-gray-900 dark:text-gray-50">
            {format(currentMonth, "MMMM")}
          </span>
        )}

        {showYearDropdown ? (
          <Select
            value={getYear(currentMonth).toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger size="sm" className="w-auto min-w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
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
  /** Show year navigation buttons */
  enableYearNavigation?: boolean;
  /** Whether to highlight today's date (default: true) */
  showToday?: boolean;
  /** Whether to show the "Go to Today" button (default: false) */
  showTodayButton?: boolean;
  /** Whether to show days from adjacent months (default: true) */
  showOutsideDays?: boolean;
  /** Whether to show the week number (default: false) */
  showWeekNumber?: boolean;
  /** Choose the layout of the month caption */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  /** Start month for dropdown navigation */
  startMonth?: Date;
  /** End month for dropdown navigation */
  endMonth?: Date;
};

/**
 * A flexible calendar component built on React Day Picker.
 *
 * Based on React Day Picker (https://daypicker.dev/), providing accessible
 * date selection with single date and date range modes. Features custom styling,
 * localization support, navigation controls, and extensive customization options.
 *
 * @param mode - Selection mode ("single" or "range")
 * @param weekStartsOn - First day of week (0=Sunday, 1=Monday)
 * @param numberOfMonths - Number of months to display
 * @param enableYearNavigation - Show year navigation buttons
 * @param disableNavigation - Disable all navigation
 * @param showToday - Whether to highlight today's date (default: true)
 * @param showTodayButton - Whether to show the "Go to Today" button (default: false)
 * @param showOutsideDays - Whether to show days from adjacent months (default: true)
 * @param locale - Date formatting locale
 * @param selected - Selected date(s)
 * @param onSelect - Selection change callback
 * @param disabled - Disabled date matcher(s)
 * @param fromDate - Earliest selectable date
 * @param toDate - Latest selectable date
 *
 * @component
 * @example
 * ```tsx
 * // Single date selection
 * <Calendar
 *   mode="single"
 *   selected={selectedDate}
 *   onSelect={setSelectedDate}
 * />
 *
 * // Date range selection
 * <Calendar
 *   mode="range"
 *   selected={selectedRange}
 *   onSelect={setSelectedRange}
 * />
 *
 * // Multiple months with year navigation
 * <Calendar
 *   mode="single"
 *   numberOfMonths={2}
 *   enableYearNavigation
 *   selected={date}
 *   onSelect={setDate}
 * />
 *
 * // With date constraints
 * <Calendar
 *   mode="single"
 *   selected={selectedDate}
 *   onSelect={setSelectedDate}
 *   fromDate={new Date()}
 *   toDate={addMonths(new Date(), 6)}
 *   disabled={[
 *     { dayOfWeek: [0, 6] }, // Disable weekends
 *     new Date(2024, 0, 1)   // Disable specific date
 *   ]}
 * />
 *
 * // Localized calendar
 * <Calendar
 *   mode="single"
 *   selected={selectedDate}
 *   onSelect={setSelectedDate}
 *   locale={es} // Spanish locale
 *   weekStartsOn={1} // Start week on Monday
 * />
 * ```
 *
 * @see https://daypicker.dev/ - React Day Picker documentation
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
    setKey((prev) => prev + 1);
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
            "capitalize tabular-nums"
          ),
          nav: "hidden", // Always hide native nav since we provide custom navigation
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
            // Ensure consistent sizing for both interactive and non-interactive modes
            "h-9 w-9 inline-flex items-center justify-center",
            "text-sm font-normal text-gray-900 dark:text-gray-50"
          ),
          today: cx(showToday && "bg-gray-100 dark:bg-gray-800 font-semibold"),
          week_number: cx(
            "h-9 w-9 p-0 font-normal text-sm",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md",
            "text-gray-900 dark:text-gray-50",
            "opacity-50"
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
            const { goToMonth, nextMonth, previousMonth, months } =
              useDayPicker();

            if (captionLayout === "label") {
              // Original label layout with buttons
              const currentMonth = captionProps.calendarMonth.date;
              const displayIndex = captionProps.displayIndex;
              const isFirst = displayIndex === 0;
              const isLast = displayIndex === months.length - 1;

              const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
              const hidePreviousButton =
                numberOfMonths > 1 && (isLast || !isFirst);

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
                          previousMonth && goToMonth(previousMonth)
                        }
                        leftIcon={ChevronLeft}
                      />
                    )}
                  </div>

                  <div
                    role="presentation"
                    aria-live="polite"
                    className={cx(
                      "text-sm font-medium capitalize tabular-nums",
                      "text-gray-900 dark:text-gray-50"
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
            } else {
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
