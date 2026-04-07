// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { useState } from "react";
import { QuantityControl } from "./quantity-control";

type QuantityControlStoryArgs = React.ComponentProps<typeof QuantityControl> & {
  initialValue?: number;
  showRemove?: boolean;
};

const meta: Meta<QuantityControlStoryArgs> = {
  title: "QuantityControl",
  component: QuantityControl,
  argTypes: {
    // Value
    initialValue: {
      control: { type: "number", min: 1, max: 100 },
      description: "Initial quantity value",
    },
    min: {
      control: { type: "number", min: 0, max: 100 },
      description: "Minimum allowed value",
    },
    max: {
      control: { type: "number", min: 1, max: 100 },
      description: "Maximum allowed value",
    },

    // State
    disabled: {
      control: "boolean",
      description: "Disable the control",
    },
    showRemove: {
      control: "boolean",
      description: "Show remove button when value is 1",
    },

    // Advanced (hidden)
    value: { table: { disable: true } },
    onIncrement: { table: { disable: true } },
    onDecrement: { table: { disable: true } },
    onRemove: { table: { disable: true } },
  },
  args: {
    initialValue: 1,
    min: 1,
    max: 99,
    disabled: false,
    showRemove: false,
  },
  parameters: {
    layout: "centered",
    builder: {
      category: "form",
      icon: "plus-minus",
    },
    docs: {
      description: {
        component:
          "Quantity control for incrementing and decrementing numeric values. Commonly used for cart quantities.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.initialValue ?? 1);
    const min = args.min ?? 1;
    const max = args.max ?? 99;

    return (
      <QuantityControl
        disabled={args.disabled}
        max={max}
        min={min}
        onDecrement={() => setValue((v) => Math.max(min, v - 1))}
        onIncrement={() => setValue((v) => Math.min(max, v + 1))}
        onRemove={args.showRemove ? () => setValue(0) : undefined}
        value={value}
      />
    );
  },
};
