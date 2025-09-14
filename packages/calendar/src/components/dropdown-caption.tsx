import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/select";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type { Locale } from "date-fns";
import { addYears, eachMonthOfInterval, eachYearOfInterval, format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";
import { Button } from "@patternmode/button";
import { useDayPicker } from "react-day-picker";

export const DropdownCaption = ({
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

  const hideNextButton =
    numberOfMonths && numberOfMonths > 1 && (isFirst || !isLast);
  const hidePreviousButton =
    numberOfMonths && numberOfMonths > 1 && (isLast || !isFirst);

  const monthOptions = React.useMemo(() => {
    if (!(startMonth && endMonth)) return [];
    const monthsInRange = eachMonthOfInterval({ start: startMonth, end: endMonth });
    return monthsInRange.map((month) => ({
      value: getMonth(month).toString(),
      label: format(month, "MMMM"),
    }));
  }, [startMonth, endMonth]);

  const yearOptions = React.useMemo(() => {
    if (!(startMonth && endMonth)) return [];
    const yearsInRange = eachYearOfInterval({ start: startMonth, end: endMonth });
    return yearsInRange.map((year) => ({
      value: getYear(year).toString(),
      label: getYear(year).toString(),
    }));
  }, [startMonth, endMonth]);

  const handleMonthChange = (monthValue: string) => {
    const newMonth = setMonth(currentMonth, Number.parseInt(monthValue, 10));
    goToMonth(newMonth);
  };

  const handleYearChange = (yearValue: string) => {
    const newMonth = setYear(currentMonth, Number.parseInt(yearValue, 10));
    goToMonth(newMonth);
  };

  const goToPreviousYear = () => {
    const targetMonth = addYears(currentMonth, -1);
    if (previousMonth) goToMonth(targetMonth);
  };

  const goToNextYear = () => {
    const targetMonth = addYears(currentMonth, 1);
    if (nextMonth) goToMonth(targetMonth);
  };

  const showMonthDropdown =
    captionLayout === "dropdown" || captionLayout === "dropdown-months";
  const showYearDropdown =
    captionLayout === "dropdown" || captionLayout === "dropdown-years";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {!hidePreviousButton && (
          <Button
            aria-label="Go to previous month"
            disabled={disableNavigation || !previousMonth}
            leftIcon={ChevronLeft}
            onClick={() => previousMonth && goToMonth(previousMonth)}
            size="icon-sm"
            variant="outline"
          />
        )}
        {enableYearNavigation && !hidePreviousButton && (
          <Button
            aria-label="Go to previous year"
            disabled={disableNavigation || !previousMonth}
            leftIcon={ChevronsLeft}
            onClick={goToPreviousYear}
            size="icon-sm"
            variant="outline"
          />
        )}
      </div>

      <div className="flex items-center gap-2" role="presentation">
        {showMonthDropdown ? (
          <Select onValueChange={(v: unknown) => handleMonthChange(String(v))} value={getMonth(currentMonth).toString()}>
            <SelectTrigger className="w-auto min-w-[120px]" size="sm">
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
          <span className="font-medium text-gray-900 text-sm capitalize tabular-nums dark:text-gray-50">
            {format(currentMonth, "MMMM")}
          </span>
        )}

        {showYearDropdown ? (
          <Select onValueChange={(v: unknown) => handleYearChange(String(v))} value={getYear(currentMonth).toString()}>
            <SelectTrigger className="w-auto min-w-[70px]" size="sm">
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
          <span className="font-medium text-gray-900 text-sm capitalize tabular-nums dark:text-gray-50">
            {format(currentMonth, "yyyy")}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {!hideNextButton && (
          <Button
            aria-label="Go to next month"
            disabled={disableNavigation || !nextMonth}
            leftIcon={ChevronRight}
            onClick={() => nextMonth && goToMonth(nextMonth)}
            size="icon-sm"
            variant="outline"
          />
        )}
        {enableYearNavigation && !hideNextButton && (
          <Button
            aria-label="Go to next year"
            disabled={disableNavigation || !nextMonth}
            leftIcon={ChevronsRight}
            onClick={goToNextYear}
            size="icon-sm"
            variant="outline"
          />
        )}
      </div>
    </div>
  );
};

