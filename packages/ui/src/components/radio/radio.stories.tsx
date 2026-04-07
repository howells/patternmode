import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Label } from "../label";
import { RadioGroup } from "../radio-group";
import { Radio, type RadioProps } from "./radio-root";

type StoryArgs = RadioProps & { selected?: boolean };

const meta: Meta<StoryArgs> = {
  title: "Radio",
  component: Radio,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Radio size using shared ComponentSize scale",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable the radio button",
    },
    selected: {
      control: "boolean",
      description: "Whether the radio is selected (for demo)",
    },

    // Required
    value: {
      control: "text",
      description: "Unique value for this radio option (required)",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    value: "radio",
    size: "sm",
    disabled: false,
    selected: true,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "circle-dot",
    },
    docs: {
      description: {
        component:
          "Radio component for selecting a single option from a set of mutually exclusive choices. Must be used within a RadioGroup. Uses the shared ComponentSize scale.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: ({ selected, ...args }) => (
    <RadioGroup value={selected ? "radio" : ""}>
      <Radio {...args} />
    </RadioGroup>
  ),
};

/**
 * State columns for the matrix.
 */
type RadioState = "unselected" | "selected" | "disabled" | "disabled-selected";

const STATE_COLUMNS: { key: RadioState; label: string }[] = [
  { key: "unselected", label: "Unselected" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
  { key: "disabled-selected", label: "Disabled Selected" },
];

/**
 * Size × State matrix showing all radio variations.
 */
export const SizeStateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Complete matrix showing all sizes (2xs-3xl) across all states.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    const renderCell = (size: ComponentSize, state: RadioState) => {
      const stateProps = (() => {
        switch (state) {
          case "selected":
            return { defaultValue: "radio" };
          case "disabled":
            return { disabled: true };
          case "disabled-selected":
            return { defaultValue: "radio", disabled: true };
          default:
            return {};
        }
      })();

      const { disabled, defaultValue } = stateProps as {
        disabled?: boolean;
        defaultValue?: string;
      };

      return (
        <RadioGroup defaultValue={defaultValue}>
          <Radio disabled={disabled} size={size} value="radio" />
        </RadioGroup>
      );
    };

    return (
      <VariantGrid<ComponentSize, RadioState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Radio with label for accessibility.
 */
export const WithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Radio paired with a label for better accessibility and usability.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="option1">
      <Flex align="center" gap="xs">
        <Radio id="option1" value="option1" />
        <Label htmlFor="option1">First option</Label>
      </Flex>
    </RadioGroup>
  ),
};
