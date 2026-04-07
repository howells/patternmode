import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { CheckboxField, type CheckboxFieldProps } from "./checkbox-field-root";

const meta: Meta<CheckboxFieldProps> = {
  title: "CheckboxField",
  component: CheckboxField,
  argTypes: {
    // Content
    label: {
      control: "text",
      description: "Label text for the checkbox",
    },
    description: {
      control: "text",
      description: "Helper text displayed below the label",
    },

    // Visual
    size: {
      control: "radio",
      options: ["xs", "sm"],
      description: "Checkbox size",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable the checkbox and label",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
    },
    required: {
      control: "boolean",
      description: "Mark as required for form validation",
    },
    indeterminate: {
      control: "boolean",
      description: "Show indeterminate state",
    },

    // Hidden
    className: { table: { disable: true } },
    checkboxClassName: { table: { disable: true } },
    labelClassName: { table: { disable: true } },
    descriptionClassName: { table: { disable: true } },
    id: { table: { disable: true } },
    checked: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
  },
  args: {
    label: "Email me product updates",
    description: "This is helper text that stays associated with the checkbox.",
    size: "xs",
    disabled: false,
    defaultChecked: false,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "check-square",
    },
    layout: "padded",
    docs: {
      description: {
        component:
          "Checkbox with integrated label and optional description. Handles accessibility automatically.",
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
