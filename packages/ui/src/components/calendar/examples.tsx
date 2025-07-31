"use client";

import { Calendar } from "@patternmode/ui";
import { addDays, subDays } from "date-fns";
import React from "react";

// Default calendar
export const /**
              *
              */
  DefaultExample = () => <Calendar mode="single" />;

// Range selection calendar
export const /**
              *
              */
  RangeModeExample = () => <Calendar mode="range" />;

// Multiple months calendar
export const /**
              *
              */
  MultipleMonthsExample = () => <Calendar numberOfMonths={2} />;

// Calendar with year navigation
export const /**
              *
              */
  WithYearNavigationExample = () => (
    <Calendar enableYearNavigation />
  );

// Week starts on Sunday
export const /**
              *
              */
  WeekStartsSundayExample = () => <Calendar weekStartsOn={0} />;

// Disabled navigation
export const /**
              *
              */
  DisabledNavigationExample = () => <Calendar disableNavigation />;

// With pre-selected date
export const /**
              *
              */
  WithPreselectedExample = () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={selected} onSelect={setSelected} />;
  };

// Range with multiple months
export const /**
              *
              */
  RangeWithMultipleMonthsExample = () => (
    <Calendar mode="range" numberOfMonths={2} />
  );

// Calendar with specific default date
export const /**
              *
              */
  SpecificDefaultDateExample = () => {
    const [selected, setSelected] = React.useState<Date | undefined>(
      new Date(2024, 5, 15),
    ); // June 15, 2024
    return <Calendar mode="single" selected={selected} onSelect={setSelected} />;
  };

// Calendar with three months
export const /**
              *
              */
  ThreeMonthsExample = () => <Calendar numberOfMonths={3} />;

// Controlled single date
export const /**
              *
              */
  ControlledSingleExample = () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date());

    return (
      <div className="space-y-4">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Selected:
          {" "}
          {selected?.toLocaleDateString() || "None"}
        </p>
      </div>
    );
  };

// Controlled range selection
export const /**
              *
              */
  ControlledRangeExample = () => {
    return (
      <div className="space-y-4">
        <Calendar mode="range" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Select a date range using the calendar above
        </p>
      </div>
    );
  };

// Calendar with disabled dates
export const /**
              *
              */
  WithDisabledDatesExample = () => {
    const disabledDays = [
      subDays(new Date(), 2),
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ];

    return <Calendar disabled={disabledDays} />;
  };

// Week starts on different days
export const /**
              *
              */
  WeekStartsOnExample = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Monday start</p>
        <Calendar weekStartsOn={1} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Sunday start</p>
        <Calendar weekStartsOn={0} />
      </div>
    </div>
  );

// Compact calendar
export const /**
              *
              */
  CompactExample = () => (
    <Calendar className="rounded-md border shadow-sm" />
  );

// Calendar with today highlighting disabled
export const /**
              *
              */
  WithoutTodayHighlightExample = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">With today highlight (default)</p>
        <Calendar showToday={true} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Without today highlight</p>
        <Calendar showToday={false} />
      </div>
    </div>
  );

// Calendar with "Go to Today" button
export const /**
              *
              */
  WithTodayButtonExample = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Without today button (default)</p>
        <Calendar />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With today button</p>
        <Calendar showTodayButton={true} />
      </div>
    </div>
  );

// Calendar with fixed weeks
export const /**
              *
              */
  FixedWeeksExample = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Variable weeks (default)</p>
        <Calendar />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Fixed 6 weeks</p>
        <Calendar fixedWeeks={true} />
      </div>
    </div>
  );

// Calendar with week numbers
export const /**
              *
              */
  WithWeekNumbersExample = () => <Calendar showWeekNumber={true} />;

// Calendar with dropdown caption
export const /**
              *
              */
  DropdownCaptionExample = () => (
    <Calendar
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  );

// Default export for prop explorer
export const /**
              *
              */
  CalendarExample = DefaultExample;
