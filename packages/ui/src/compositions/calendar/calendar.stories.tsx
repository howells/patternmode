import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar-root";

type CalendarStoryArgs = Parameters<typeof Calendar>[0];

const meta: Meta<CalendarStoryArgs> = {
  title: "Calendar",
  component: Calendar,
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "Selection mode",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
    },
  },
  args: {
    mode: "single",
    showOutsideDays: true,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "calendar",
    },
    docs: {
      description: {
        component:
          "Calendar component built on react-day-picker. Supports single, multiple, and range selection.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function BaseDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      onSelect={setDate}
      selected={date}
      showOutsideDays
    />
  );
}

/**
 * Base calendar with single selection.
 */
export const Base: Story = {
  render: () => <BaseDemo />,
};

function SelectionModesDemo() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([
    new Date(),
    addDays(new Date(), 2),
    addDays(new Date(), 5),
  ]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-medium text-sm">Single</span>
        <Calendar
          mode="single"
          onSelect={setSingleDate}
          selected={singleDate}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-sm">Multiple</span>
        <Calendar
          mode="multiple"
          onSelect={setMultipleDates}
          selected={multipleDates}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-sm">Range</span>
        <Calendar mode="range" onSelect={setDateRange} selected={dateRange} />
      </div>
    </div>
  );
}

/**
 * All selection modes.
 */
export const SelectionModes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Single, multiple, and range selection modes.",
      },
    },
  },
  render: () => <SelectionModesDemo />,
};
