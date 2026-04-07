import type { Meta, StoryObj } from "@storybook/react";
import type { LucideIcon } from "lucide-react";
import { Check, Circle, FileText, Package, Truck } from "lucide-react";
import type { ComponentProps } from "react";
import { sizeArgType } from "../../lib/storybook";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { Stepper, StepperItem } from "../stepper";
import type { StepperSize } from "./stepper-context";

const SIZE_OPTIONS: StepperSize[] = ["sm", "base", "lg"];

type StoryArgs = ComponentProps<typeof Stepper> & {
  icon?: LucideIcon;
  showLabels?: boolean;
  disabledAfterCurrent?: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Stepper",
  component: Stepper,
  argTypes: {
    // Visual
    size: sizeArgType,
    icon: iconControlArgType,

    // State
    defaultValue: {
      control: { type: "number", min: 0, max: 4 },
      description: "Current step index (0-based)",
    },
    showLabels: {
      control: "boolean",
      description: "Whether to show step labels",
    },
    disabledAfterCurrent: {
      control: "boolean",
      description: "Disable steps after current step",
    },

    // Advanced (hidden)
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    defaultValue: 1,
    size: "base",
    icon: ICON_OPTIONS.Circle,
    showLabels: true,
    disabledAfterCurrent: false,
  },
  parameters: {
    builder: {
      category: "navigation",
      icon: "route",
    },
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-step progress indicator for guiding users through a process. Supports icons, labels, and various sizes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const STEP_LABELS = [
  "Concept",
  "Design Dev",
  "Spec",
  "Construction",
  "Complete",
];

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const {
      showLabels = true,
      disabledAfterCurrent = false,
      defaultValue = 1,
      ...stepperProps
    } = args;

    return (
      <Stepper defaultValue={defaultValue} {...stepperProps}>
        {STEP_LABELS.map((label, index) => (
          <StepperItem
            disabled={disabledAfterCurrent && index > defaultValue}
            icon={args.icon}
            key={label}
            label={showLabels ? label : undefined}
            value={index}
          />
        ))}
      </Stepper>
    );
  },
};

/**
 * Size comparison.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Stepper supports sm, base (default), and lg sizes.",
      },
    },
  },
  render: () => (
    <div className="flex w-[600px] flex-col gap-8">
      {SIZE_OPTIONS.map((size) => (
        <div key={size}>
          <p className="mb-2 text-muted-foreground text-xs capitalize">
            {size}
          </p>
          <Stepper defaultValue={2} size={size}>
            <StepperItem label="Step 1" value={0} />
            <StepperItem label="Step 2" value={1} />
            <StepperItem label="Step 3" value={2} />
            <StepperItem label="Step 4" value={3} />
          </Stepper>
        </div>
      ))}
    </div>
  ),
};

/**
 * Custom icons for each step.
 */
export const CustomIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Each step can have a custom icon to represent its purpose in the workflow.",
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <Stepper defaultValue={2} size="base">
        <StepperItem icon={Circle} label="Order" value={0} />
        <StepperItem icon={FileText} label="Payment" value={1} />
        <StepperItem icon={Package} label="Packing" value={2} />
        <StepperItem icon={Truck} label="Shipping" value={3} />
        <StepperItem icon={Check} label="Delivered" value={4} />
      </Stepper>
    </div>
  ),
};
