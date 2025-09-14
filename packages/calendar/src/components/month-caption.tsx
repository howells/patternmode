import { addYears, format } from "date-fns";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import type { Locale } from "date-fns";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { useDayPicker } from "react-day-picker";
import { DropdownCaption } from "./dropdown-caption";

export const MonthCaptionComponent = ({
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
      if (previousMonth) goToMonth(targetMonth);
    };

    const goToNextYear = () => {
      const targetMonth = addYears(currentMonth, 1);
      if (nextMonth) goToMonth(targetMonth);
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
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
        </div>

        <div
          aria-live="polite"
          className={cx(
            "font-medium text-sm capitalize tabular-nums",
            "text-gray-900 dark:text-gray-50"
          )}
          role="presentation"
        >
          {format(currentMonth, "LLLL yyy")}
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
  }
  return (
    <DropdownCaption
      _locale={locale}
      calendarMonth={captionProps.calendarMonth}
      captionLayout={captionLayout}
      disableNavigation={disableNavigation}
      displayIndex={captionProps.displayIndex}
      enableYearNavigation={enableYearNavigation}
      endMonth={endMonth}
      numberOfMonths={numberOfMonths}
      startMonth={startMonth}
    />
  );
};

export const createMonthCaptionWrapper = (
  captionLayout: "label" | "dropdown" | "dropdown-months" | "dropdown-years",
  enableYearNavigation: boolean,
  numberOfMonths: number,
  disableNavigation?: boolean,
  startMonth?: Date,
  endMonth?: Date,
  locale?: Partial<Locale>
) =>
  (captionProps: any) => (
    <MonthCaptionComponent
      captionLayout={captionLayout}
      captionProps={captionProps}
      disableNavigation={disableNavigation}
      enableYearNavigation={enableYearNavigation}
      endMonth={endMonth!}
      locale={locale}
      numberOfMonths={numberOfMonths}
      startMonth={startMonth!}
    />
  );

