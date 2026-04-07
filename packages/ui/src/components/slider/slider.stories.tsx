import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { useState } from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Stack } from "../stack";
import { Text } from "../text";
import { Slider } from "./slider-root";

type SliderStoryArgs = React.ComponentProps<typeof Slider>;

const meta: Meta<SliderStoryArgs> = {
  title: "Slider",
  component: Slider,
  argTypes: {
    // Behavior
    defaultValue: {
      control: "object",
      description: "Uncontrolled default value(s)",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Slider orientation",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable the slider",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    builder: {
      category: "form",
      icon: "sliders-horizontal",
    },
    docs: {
      description: {
        component:
          "Slider component for selecting a value or range from a continuous scale. Supports single value and range selection.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {};

/**
 * Configuration columns for the matrix.
 */
type SliderConfig = "single" | "range" | "stepped" | "disabled";

const CONFIG_COLUMNS: { key: SliderConfig; label: string }[] = [
  { key: "single", label: "Single" },
  { key: "range", label: "Range" },
  { key: "stepped", label: "Stepped" },
  { key: "disabled", label: "Disabled" },
];

/**
 * Configuration matrix showing different slider types.
 */
export const ConfigMatrix: Story = {
  decorators: [], // Override default decorator - VariantGrid handles its own layout
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing single value, range, stepped, and disabled sliders.",
      },
    },
  },
  render: () => {
    type ValueRow = "low" | "mid" | "high";
    const VALUE_ROWS: { key: ValueRow; label: string }[] = [
      { key: "low", label: "Low (25%)" },
      { key: "mid", label: "Mid (50%)" },
      { key: "high", label: "High (75%)" },
    ];

    const renderCell = (valueRow: ValueRow, config: SliderConfig) => {
      const valueMap = { low: 25, mid: 50, high: 75 } as const;
      const baseValue = valueMap[valueRow];

      switch (config) {
        case "single":
          return <Slider defaultValue={[baseValue]} />;
        case "range":
          return <Slider defaultValue={[baseValue - 15, baseValue + 15]} />;
        case "stepped":
          return <Slider defaultValue={[baseValue]} step={25} />;
        case "disabled":
          return <Slider defaultValue={[baseValue]} disabled />;
        default:
          return null;
      }
    };

    return (
      <VariantGrid<ValueRow, SliderConfig>
        columns={CONFIG_COLUMNS}
        renderCell={renderCell}
        rowLabels="Value"
        rows={VALUE_ROWS}
      />
    );
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Range slider.
 */
export const Range: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Range slider for selecting a minimum and maximum value.",
      },
    },
  },
  render: () => <Slider defaultValue={[25, 75]} />,
};

/**
 * Controlled slider with value display.
 */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Controlled slider with value display.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState([50]);
    return (
      <Stack gap="lg">
        <Text color="muted" size="sm">
          Value: {value[0]}
        </Text>
        <Slider onValueChange={setValue} value={value} />
      </Stack>
    );
  },
};

/**
 * Controlled range slider with value display.
 */
export const ControlledRange: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Controlled range slider with value display.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState([25, 75]);
    return (
      <Stack gap="lg">
        <Text color="muted" size="sm">
          Range: {value[0]} – {value[1]}
        </Text>
        <Slider onValueChange={setValue} value={value} />
      </Stack>
    );
  },
};
