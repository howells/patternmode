import type { ComponentConfig } from "@patternmode/config/component-types";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./component";
import {
  CompactExample,
  ControlledRangeExample,
  ControlledSingleExample,
  DefaultExample,
  DisabledNavigationExample,
  DropdownCaptionExample,
  FixedWeeksExample,
  MultipleMonthsExample,
  RangeModeExample,
  RangeWithMultipleMonthsExample,
  SpecificDefaultDateExample,
  ThreeMonthsExample,
  WeekStartsOnExample,
  WeekStartsSundayExample,
  WithDisabledDatesExample,
  WithoutTodayHighlightExample,
  WithPreselectedExample,
  WithTodayButtonExample,
  WithWeekNumbersExample,
  WithYearNavigationExample,
} from "./examples";

export const calendarConfig: ComponentConfig = {
  id: "calendar",
  name: "Calendar",
  description:
    "Date picker component for selecting single dates, date ranges, or multiple dates with customizable navigation and display options.",
  category: "controls",
  icon: CalendarIcon,
  importStatement: `import { Calendar } from "@patternmode/calendar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic calendar with single date selection",
      component: DefaultExample,
    },
    {
      id: "range-mode",
      title: "Range Mode",
      description: "Calendar with date range selection",
      component: RangeModeExample,
    },
    {
      id: "multiple-months",
      title: "Multiple Months",
      description: "Calendar displaying two months side by side",
      component: MultipleMonthsExample,
    },
    {
      id: "with-year-navigation",
      title: "With Year Navigation",
      description: "Calendar with additional year navigation buttons",
      component: WithYearNavigationExample,
    },
    {
      id: "week-starts-sunday",
      title: "Week Starts Sunday",
      description: "Calendar with Sunday as the first day of the week",
      component: WeekStartsSundayExample,
    },
    {
      id: "disabled-navigation",
      title: "Disabled Navigation",
      description: "Calendar with navigation controls disabled",
      component: DisabledNavigationExample,
    },
    {
      id: "with-preselected",
      title: "With Preselected Date",
      description: "Calendar with a pre-selected current date",
      component: WithPreselectedExample,
    },
    {
      id: "range-with-multiple-months",
      title: "Range with Multiple Months",
      description: "Date range selection across multiple months",
      component: RangeWithMultipleMonthsExample,
    },
    {
      id: "specific-default-date",
      title: "Specific Default Date",
      description: "Calendar starting with a specific pre-selected date",
      component: SpecificDefaultDateExample,
    },
    {
      id: "three-months",
      title: "Three Months",
      description: "Calendar displaying three months simultaneously",
      component: ThreeMonthsExample,
    },
    {
      id: "controlled-single",
      title: "Controlled Single",
      description: "Controlled single date selection with state display",
      component: ControlledSingleExample,
    },
    {
      id: "controlled-range",
      title: "Controlled Range",
      description: "Controlled date range selection",
      component: ControlledRangeExample,
    },
    {
      id: "with-disabled-dates",
      title: "With Disabled Dates",
      description: "Calendar with specific dates disabled",
      component: WithDisabledDatesExample,
    },
    {
      id: "week-starts-on",
      title: "Week Start Comparison",
      description: "Comparison of Monday vs Sunday week start",
      component: WeekStartsOnExample,
    },
    {
      id: "compact",
      title: "Compact",
      description: "Calendar with compact styling and border",
      component: CompactExample,
    },
    {
      id: "without-today-highlight",
      title: "Today Highlight Toggle",
      description: "Comparison of calendar with and without today highlighting",
      component: WithoutTodayHighlightExample,
    },
    {
      id: "with-today-button",
      title: "Today Button",
      description: "Calendar with optional 'Go to Today' button",
      component: WithTodayButtonExample,
    },
    {
      id: "fixed-weeks",
      title: "Fixed Weeks",
      description: "Comparison of variable vs fixed week display",
      component: FixedWeeksExample,
    },
    {
      id: "with-week-numbers",
      title: "With Week Numbers",
      description: "Calendar displaying ISO week numbers",
      component: WithWeekNumbersExample,
    },
    {
      id: "dropdown-caption",
      title: "Dropdown Caption",
      description: "Calendar with dropdown month/year selection",
      component: DropdownCaptionExample,
    },
  ],
  components: [
    {
      name: "Calendar",
      description:
        "Date selection component with customizable display and navigation options",
      component: Calendar,
    },
  ],
};
