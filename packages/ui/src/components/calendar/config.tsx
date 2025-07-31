import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { CalendarExample, DefaultExample, DisabledNavigationExample, DropdownCaptionExample, FixedWeeksExample, MultipleMonthsExample, RangeModeExample, RangeWithMultipleMonthsExample, WeekStartsSundayExample, WithoutTodayHighlightExample, WithPreselectedExample, WithTodayButtonExample, WithWeekNumbersExample, WithYearNavigationExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "calendar",
  name: "Calendar",
  description:
    "A date picker calendar component with support for single date and date range selection.",
  category: "inputs" as const,
  icon: "Calendar",

  installation: {
    npm: "react-day-picker date-fns",
  },
  importStatement: `import { Calendar } from "@/components/ui/calendar";`,
  componentId: "CalendarExample",
  props: [
    {
      name: "mode",
      type: "select",
      options: ["single", "range"],
      defaultValue: "single",
      description: "The selection mode of the calendar.",
    },
    {
      name: "numberOfMonths",
      type: "number",
      defaultValue: 1,
      description: "Number of months to display at once.",
    },
    {
      name: "enableYearNavigation",
      type: "boolean",
      defaultValue: false,
      description: "Enable year navigation buttons.",
    },
    {
      name: "disableNavigation",
      type: "boolean",
      defaultValue: false,
      description: "Disable all navigation controls.",
    },
    {
      name: "showToday",
      type: "boolean",
      defaultValue: true,
      description: "Whether to highlight today's date.",
    },
    {
      name: "showTodayButton",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show the 'Go to Today' button.",
    },
    {
      name: "showOutsideDays",
      type: "boolean",
      defaultValue: true,
      description: "Display the days falling into other months.",
    },
    {
      name: "fixedWeeks",
      type: "boolean",
      defaultValue: false,
      description: "Display 6 weeks per month to prevent height changes.",
    },
    {
      name: "showWeekNumber",
      type: "boolean",
      defaultValue: false,
      description: "Display the column with week numbers.",
    },
    {
      name: "hideWeekdays",
      type: "boolean",
      defaultValue: false,
      description: "Hide the row displaying the weekday names.",
    },
    {
      name: "captionLayout",
      type: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      defaultValue: "label",
      description: "Choose the layout of the month caption.",
    },
    {
      name: "startMonth",
      type: "date",
      description:
        "Start month for dropdown navigation (defaults to 10 years ago).",
    },
    {
      name: "endMonth",
      type: "date",
      description:
        "End month for dropdown navigation (defaults to 10 years from now).",
    },
    {
      name: "pagedNavigation",
      type: "boolean",
      defaultValue: false,
      description: "Navigate by the number of months displayed at once.",
    },
    {
      name: "weekStartsOn",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 6,
      description:
        "Which day of the week to start on (0 = Sunday, 1 = Monday, etc.).",
    },
    {
      name: "selected",
      type: "date",
      description: "The selected date (for single mode).",
    },
    {
      name: "defaultSelected",
      type: "date",
      description: "Default selected date (for single mode).",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic calendar with single date selection.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "range-mode",
      title: "Range Selection",
      description: "Calendar with date range selection.",
      code: jsxToString(<RangeModeExample />),
    },
    {
      id: "multiple-months",
      title: "Multiple Months",
      description: "Calendar showing multiple months at once.",
      code: jsxToString(<MultipleMonthsExample />),
    },
    {
      id: "with-year-navigation",
      title: "With Year Navigation",
      description: "Calendar with year navigation buttons.",
      code: jsxToString(<WithYearNavigationExample />),
    },
    {
      id: "week-starts-sunday",
      title: "Week Starts Sunday",
      description: "Calendar starting week on Sunday.",
      code: jsxToString(<WeekStartsSundayExample />),
    },
    {
      id: "disabled-navigation",
      title: "Disabled Navigation",
      description: "Calendar with navigation disabled.",
      code: jsxToString(<DisabledNavigationExample />),
    },
    {
      id: "with-preselected",
      title: "With Pre-selected Date",
      description: "Calendar with a pre-selected date.",
      code: jsxToString(<WithPreselectedExample />),
    },
    {
      id: "range-with-multiple-months",
      title: "Range with Multiple Months",
      description: "Range selection with multiple months displayed.",
      code: jsxToString(<RangeWithMultipleMonthsExample />),
    },
    {
      id: "without-today-highlight",
      title: "Today Highlight Control",
      description: "Calendar with today highlighting enabled or disabled.",
      code: jsxToString(<WithoutTodayHighlightExample />),
    },
    {
      id: "with-today-button",
      title: "Go to Today Button",
      description: "Calendar with a button to navigate back to today's month.",
      code: jsxToString(<WithTodayButtonExample />),
    },
    {
      id: "fixed-weeks",
      title: "Fixed Weeks",
      description: "Calendar with 6 weeks displayed to prevent height changes.",
      code: jsxToString(<FixedWeeksExample />),
    },
    {
      id: "with-week-numbers",
      title: "Week Numbers",
      description: "Calendar displaying week numbers.",
      code: jsxToString(<WithWeekNumbersExample />),
    },
    {
      id: "dropdown-caption",
      title: "Dropdown Caption",
      description: "Calendar with dropdown navigation for month and year.",
      code: jsxToString(<DropdownCaptionExample />),
    },
  ],
};
