import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Label } from "../label";
import { Switch } from "./switch-root";

type SwitchStoryArgs = React.ComponentProps<typeof Switch>;

const meta: Meta<SwitchStoryArgs> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Switch size using shared ComponentSize scale",
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
    disabled: {
      control: "boolean",
      description: "Disable the switch",
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
    size: "base",
    checked: false,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "toggle-left",
    },
    docs: {
      description: {
        component:
          "Toggle switch for binary on/off states. Uses shared ComponentSize scale.",
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
type SwitchState = "unchecked" | "checked" | "disabled" | "disabled-checked";

const STATE_COLUMNS: { key: SwitchState; label: string }[] = [
  { key: "unchecked", label: "Unchecked" },
  { key: "checked", label: "Checked" },
  { key: "disabled", label: "Disabled" },
  { key: "disabled-checked", label: "Disabled Checked" },
];

/**
 * Size × State matrix showing all switch variations.
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

    const renderCell = (size: ComponentSize, state: SwitchState) => {
      const stateProps = (() => {
        switch (state) {
          case "checked":
            return { defaultChecked: true };
          case "disabled":
            return { disabled: true };
          case "disabled-checked":
            return { defaultChecked: true, disabled: true };
          default:
            return {};
        }
      })();

      return <Switch size={size} {...stateProps} />;
    };

    return (
      <VariantGrid<ComponentSize, SwitchState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Switch with label for accessibility.
 */
export const WithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Switch paired with a label for accessibility.",
      },
    },
  },
  render: () => (
    <Flex align="center" gap="sm">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </Flex>
  ),
};
