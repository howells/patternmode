import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Calendar, Mail, User } from "lucide-react";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Icon } from "../icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Text } from "../text";

type SelectStoryArgs = React.ComponentProps<typeof Select>;

const meta: Meta<SelectStoryArgs> = {
  title: "Select",
  component: Select,
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

    // States
    disabled: {
      control: "boolean",
      description: "Disable the select",
    },
    required: {
      control: "boolean",
      description: "Mark as required for form validation",
    },

    // Advanced (hidden)
    onValueChange: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  args: {
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "chevron-down",
    },
    docs: {
      description: {
        component:
          "Select component for choosing from a list of options. Supports grouping, separators, and icons.",
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
    <Select {...args}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select patternmodel type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Natural PatternModels</SelectLabel>
          <SelectItem value="wood">Wood</SelectItem>
          <SelectItem value="stone">Stone</SelectItem>
          <SelectItem value="cotton">Cotton</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Synthetic PatternModels</SelectLabel>
          <SelectItem value="plastic">Plastic</SelectItem>
          <SelectItem value="polymer">Polymer</SelectItem>
          <SelectItem value="composite">Composite</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * State columns for the matrix.
 */
type SelectState = "default" | "selected" | "disabled";

const STATE_COLUMNS: { key: SelectState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
];

/**
 * State matrix showing select in different states.
 */
export const StateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing select in default, selected, and disabled states.",
      },
    },
  },
  render: () => {
    type ConfigRow = "simple" | "grouped";
    const CONFIG_ROWS: { key: ConfigRow; label: string }[] = [
      { key: "simple", label: "Simple" },
      { key: "grouped", label: "Grouped" },
    ];

    const renderCell = (config: ConfigRow, state: SelectState) => {
      const stateProps = (() => {
        switch (state) {
          case "selected":
            return { defaultValue: "wood" };
          case "disabled":
            return { disabled: true };
          default:
            return {};
        }
      })();

      if (config === "simple") {
        return (
          <Select {...stateProps}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="stone">Stone</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
            </SelectContent>
          </Select>
        );
      }

      return (
        <Select {...stateProps}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select patternmodel" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Natural</SelectLabel>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="stone">Stone</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Synthetic</SelectLabel>
              <SelectItem value="plastic">Plastic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    };

    return (
      <VariantGrid<ConfigRow, SelectState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Config"
        rows={CONFIG_ROWS}
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
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">Option One</SelectItem>
        <SelectItem value="two">Option Two</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Simple select without groups.
 */
export const Simple: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Simple select without groups or separators.",
      },
    },
  },
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">Option One</SelectItem>
        <SelectItem value="two">Option Two</SelectItem>
        <SelectItem value="three">Option Three</SelectItem>
        <SelectItem value="four">Option Four</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select items with icons.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Select items can include icons for better visual recognition.",
      },
    },
  },
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Choose type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">
          <Flex align="center" gap="xs">
            <Icon icon={User} />
            <Text>User</Text>
          </Flex>
        </SelectItem>
        <SelectItem value="mail">
          <Flex align="center" gap="xs">
            <Icon icon={Mail} />
            <Text>Email</Text>
          </Flex>
        </SelectItem>
        <SelectItem value="calendar">
          <Flex align="center" gap="xs">
            <Icon icon={Calendar} />
            <Text>Calendar</Text>
          </Flex>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Long list with scrolling.
 */
export const LongList: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Select handles long lists with scrolling.",
      },
    },
  },
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Choose a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="au">Australia</SelectItem>
        <SelectItem value="de">Germany</SelectItem>
        <SelectItem value="fr">France</SelectItem>
        <SelectItem value="es">Spain</SelectItem>
        <SelectItem value="it">Italy</SelectItem>
        <SelectItem value="jp">Japan</SelectItem>
        <SelectItem value="cn">China</SelectItem>
        <SelectItem value="in">India</SelectItem>
        <SelectItem value="br">Brazil</SelectItem>
      </SelectContent>
    </Select>
  ),
};
