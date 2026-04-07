import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import {
  MonthYearPicker,
  type MonthYearPickerValue,
} from "./month-year-picker-root";

type MonthYearPickerStoryArgs = React.ComponentProps<typeof MonthYearPicker>;

const meta: Meta<MonthYearPickerStoryArgs> = {
  title: "MonthYearPicker",
  component: MonthYearPicker,
  argTypes: {
    yearsAhead: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of years to show from current year",
    },
    beyondLabel: {
      control: "text",
      description: 'Label for "beyond" option',
    },
    showUnsure: {
      control: "boolean",
      description: 'Show "I\'m not sure" option',
    },
    unsureLabel: {
      control: "text",
      description: 'Label for "unsure" option',
    },
    variant: {
      control: "select",
      options: ["default", "secondary"],
      description: "Toggle variant",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Toggle size",
    },
    monthLabel: {
      control: "text",
      description: "Month section label",
    },
    yearLabel: {
      control: "text",
      description: "Year section label",
    },
  },
  args: {
    yearsAhead: 10,
    showUnsure: false,
    unsureLabel: "I'm not sure",
    variant: "default",
    size: "lg",
    monthLabel: "Choose Month",
    yearLabel: "Choose Year",
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "calendar",
    },
    docs: {
      description: {
        component:
          "Month and year picker with toggle-based selection. Auto-advances when both month and year are selected.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function formatValue(value: MonthYearPickerValue | null): string {
  if (value === null) {
    return "null";
  }
  if (value === "beyond") {
    return '"beyond"';
  }
  if (value === "unsure") {
    return '"unsure"';
  }
  return value.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function BaseDemo(args: MonthYearPickerStoryArgs) {
  const [value, setValue] = useState<MonthYearPickerValue | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <MonthYearPicker {...args} onChange={setValue} value={value} />
      <p className="text-muted-foreground text-sm">
        Selected: {formatValue(value)}
      </p>
    </div>
  );
}

/**
 * Base month/year picker with interactive controls.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

function WithValueDemo(args: MonthYearPickerStoryArgs) {
  const [value, setValue] = useState<MonthYearPickerValue | null>(
    args.value ?? null,
  );
  return (
    <div className="flex flex-col gap-4">
      <MonthYearPicker {...args} onChange={setValue} value={value} />
      <p className="text-muted-foreground text-sm">
        Selected: {formatValue(value)}
      </p>
    </div>
  );
}

/**
 * Pre-selected with a specific month and year.
 */
export const WithValue: Story = {
  args: {
    value: new Date(2026, 2, 1), // March 2026
  },
  render: (args) => <WithValueDemo {...args} />,
};

function SpecialStatesDemo(args: MonthYearPickerStoryArgs) {
  const [beyondValue, setBeyondValue] = useState<MonthYearPickerValue | null>(
    "beyond",
  );
  const [unsureValue, setUnsureValue] = useState<MonthYearPickerValue | null>(
    "unsure",
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-sm">Beyond selected:</p>
        <MonthYearPicker
          {...args}
          onChange={setBeyondValue}
          value={beyondValue}
        />
        <p className="text-muted-foreground text-sm">
          Value: {formatValue(beyondValue)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-medium text-sm">Unsure selected:</p>
        <MonthYearPicker
          {...args}
          onChange={setUnsureValue}
          value={unsureValue}
        />
        <p className="text-muted-foreground text-sm">
          Value: {formatValue(unsureValue)}
        </p>
      </div>
    </div>
  );
}

/**
 * Shows "beyond" and "unsure" selected states.
 */
export const SpecialStates: Story = {
  args: {
    showUnsure: true,
  },
  parameters: {
    controls: { disable: true },
  },
  render: (args) => <SpecialStatesDemo {...args} />,
};
