import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Label } from "../label";
import { Radio } from "../radio";
import { Stack } from "../stack";
import { Text } from "../text";
import { RadioGroup, RadioGroupItem } from "./radio-group-root";

type RadioGroupStoryArgs = React.ComponentProps<typeof RadioGroup>;

const meta: Meta<RadioGroupStoryArgs> = {
  title: "RadioGroup",
  component: RadioGroup,
  argTypes: {
    // Behavior
    defaultValue: {
      control: "text",
      description: "Uncontrolled default selected value",
    },
    value: {
      control: "text",
      description: "Controlled selected value",
    },
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Layout orientation of radio items",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable all radio options in the group",
    },
    required: {
      control: "boolean",
      description: "Mark group as required for form validation",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    defaultValue: "a",
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "circle-dot",
    },
    docs: {
      description: {
        component:
          "RadioGroup component for selecting a single option from a set of mutually exclusive choices. Use RadioGroupItem for labeled options.",
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
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="a">Option A</RadioGroupItem>
      <RadioGroupItem value="b">Option B</RadioGroupItem>
      <RadioGroupItem value="c">Option C</RadioGroupItem>
    </RadioGroup>
  ),
};

/**
 * State columns for the matrix.
 */
type RadioGroupState =
  | "default"
  | "selected"
  | "disabled"
  | "disabled-selected";

const STATE_COLUMNS: { key: RadioGroupState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
  { key: "disabled-selected", label: "Disabled Selected" },
];

/**
 * Size × State matrix showing radio group with different item sizes.
 */
export const SizeStateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing RadioGroupItem at different sizes across states.",
      },
    },
  },
  render: () => {
    const sizes: ComponentSize[] = ["xs", "sm", "base", "lg", "xl"];
    const SIZE_ROWS: { key: ComponentSize; label: string }[] = sizes.map(
      (s) => ({ key: s, label: s }),
    );

    const renderCell = (size: ComponentSize, state: RadioGroupState) => {
      const stateProps = (() => {
        switch (state) {
          case "selected":
            return { defaultValue: "option" };
          case "disabled":
            return { disabled: true };
          case "disabled-selected":
            return { defaultValue: "option", disabled: true };
          default:
            return {};
        }
      })();

      return (
        <RadioGroup {...stateProps}>
          <RadioGroupItem size={size} value="option">
            Option
          </RadioGroupItem>
        </RadioGroup>
      );
    };

    return (
      <VariantGrid<ComponentSize, RadioGroupState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
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
    defaultValue: "a",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="a">Option A</RadioGroupItem>
      <RadioGroupItem value="b">Option B</RadioGroupItem>
      <RadioGroupItem value="c">Option C</RadioGroupItem>
    </RadioGroup>
  ),
};

/**
 * Horizontal layout.
 */
export const Horizontal: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Radio group with horizontal layout using className override.",
      },
    },
  },
  render: () => (
    <RadioGroup className="flex flex-row gap-4" defaultValue="yes">
      <RadioGroupItem value="yes">Yes</RadioGroupItem>
      <RadioGroupItem value="no">No</RadioGroupItem>
      <RadioGroupItem value="maybe">Maybe</RadioGroupItem>
    </RadioGroup>
  ),
};

/**
 * With descriptions using Radio + Label directly for custom layout.
 */
export const WithDescriptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Radio options with descriptive text. Uses Radio + Label directly for custom layout.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="starter">
      <Flex align="flex-start" gap="xs">
        <Radio className="mt-1" id="starter" value="starter" />
        <Stack gap="2xs">
          <Label htmlFor="starter">Starter</Label>
          <Text color="muted" size="sm">
            Perfect for individuals and small projects
          </Text>
        </Stack>
      </Flex>
      <Flex align="flex-start" gap="xs">
        <Radio className="mt-1" id="pro" value="pro" />
        <Stack gap="2xs">
          <Label htmlFor="pro">Pro</Label>
          <Text color="muted" size="sm">
            Great for growing teams and businesses
          </Text>
        </Stack>
      </Flex>
      <Flex align="flex-start" gap="xs">
        <Radio className="mt-1" id="enterprise" value="enterprise" />
        <Stack gap="2xs">
          <Label htmlFor="enterprise">Enterprise</Label>
          <Text color="muted" size="sm">
            Advanced features for large organizations
          </Text>
        </Stack>
      </Flex>
    </RadioGroup>
  ),
};

/**
 * Mixed disabled options.
 */
export const MixedDisabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Radio group with some options disabled individually.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="enabled">
      <RadioGroupItem value="enabled">Enabled option</RadioGroupItem>
      <RadioGroupItem disabled value="disabled1">
        Disabled option
      </RadioGroupItem>
      <RadioGroupItem disabled value="disabled2">
        Another disabled option
      </RadioGroupItem>
    </RadioGroup>
  ),
};
