import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, WithTimeExample, WithPresetsExample, DisabledExample, ErrorStateExample, ControlledExample  } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "date-picker",
  name: "Date Picker",
  description: "A comprehensive date picker component with time selection, presets, and range support built on React Aria.",
  category: "inputs" as const,
  icon: "CalendarDays",

  importStatement: `import { DatePicker } from "@/components/ui/date-picker";`,
  componentId: "DatePickerExample",
  props: [
    {
      name: "placeholder",
      type: "string",
      defaultValue: "Select date",
      description: "Placeholder text for the date picker."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the date picker is disabled."
    },
    {
      name: "hasError",
      type: "boolean",
      defaultValue: false,
      description: "Whether the date picker has an error state."
    },
    {
      name: "showTimePicker",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show time selection controls."
    },
    {
      name: "enableYearNavigation",
      type: "boolean",
      defaultValue: false,
      description: "Whether to enable year navigation in the calendar."
    },
    {
      name: "align",
      type: "select",
      options: ["start", "center", "end"],
      defaultValue: "center",
      description: "Alignment of the popover relative to the trigger."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic date picker for single date selection.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "with-time",
      title: "With Time Picker",
      description: "Date picker with time selection.",
      code: jsxToString(<WithTimeExample />)},
    {
      id: "with-presets",
      title: "With Presets",
      description: "Date picker with common date presets.",
      code: `const WithPresetsExample = () => {
  const presets = [
    { label: "Today", date: new Date() },
    { label: "Tomorrow", date: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { label: "In a week", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
  ];

  return (
    <DatePicker
      placeholder="Select or choose preset"
      presets={presets}
    />
  );
};`},
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled date picker.",
      code: jsxToString(<DisabledExample />)},
    {
      id: "error-state",
      title: "Error State",
      description: "Date picker with error styling.",
      code: jsxToString(<ErrorStateExample />)},
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled date picker with external state.",
      code: `const ControlledExample = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="space-y-2">
      <DatePicker
        placeholder="Pick a date"
        value={date}
        onChange={setDate}
      />
      {date && (
        <p className="text-sm text-zinc-600">
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};`}
  ]
};