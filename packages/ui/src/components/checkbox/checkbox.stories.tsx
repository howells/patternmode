import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Label } from "../label";
import { Checkbox } from "./checkbox-root";

type CheckboxStoryArgs = React.ComponentProps<typeof Checkbox>;

const meta: Meta<CheckboxStoryArgs> = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Checkbox size using shared ComponentSize scale",
    },

    // States
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled default checked state",
    },
    indeterminate: {
      control: "boolean",
      description: "Show indeterminate state (dash icon)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
    },
    required: {
      control: "boolean",
      description: "Mark as required for form validation",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    size: "sm",
    checked: false,
    disabled: false,
    indeterminate: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "check-square",
    },
    docs: {
      description: {
        component:
          "Checkbox input with checked, unchecked, and indeterminate states. Uses shared ComponentSize scale.",
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
 * State columns for the matrix.
 */
type CheckboxState =
  | "unchecked"
  | "checked"
  | "indeterminate"
  | "disabled"
  | "disabled-checked";

const STATE_COLUMNS: { key: CheckboxState; label: string }[] = [
  { key: "unchecked", label: "Unchecked" },
  { key: "checked", label: "Checked" },
  { key: "indeterminate", label: "Indeterminate" },
  { key: "disabled", label: "Disabled" },
  { key: "disabled-checked", label: "Disabled Checked" },
];

/**
 * Size × State matrix showing all checkbox variations.
 */
export const SizeStateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Complete matrix showing all sizes (2xs-3xl) across all states (unchecked, checked, indeterminate, disabled).",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    const renderCell = (size: ComponentSize, state: CheckboxState) => {
      const stateProps = (() => {
        switch (state) {
          case "checked":
            return { defaultChecked: true };
          case "indeterminate":
            return { indeterminate: true };
          case "disabled":
            return { disabled: true };
          case "disabled-checked":
            return { defaultChecked: true, disabled: true };
          default:
            return {};
        }
      })();

      return <Checkbox size={size} {...stateProps} />;
    };

    return (
      <VariantGrid<ComponentSize, CheckboxState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Checkbox with label for accessibility.
 */
export const WithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Checkbox paired with a label for accessibility.",
      },
    },
  },
  render: () => (
    <Flex align="center" gap="xs">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </Flex>
  ),
};
