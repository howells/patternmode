import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { Stack } from "../stack";
import { Text } from "../text";
import {
  Combobox,
  type ComboboxItem,
  type ComboboxProps,
} from "./combobox-root";

const meta: Meta<ComboboxProps> = {
  title: "Combobox",
  component: Combobox,
  argTypes: {
    // Content
    items: {
      control: "object",
      description: "List of selectable items",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no selection",
    },

    // Behavior
    value: {
      control: "text",
      description: "Controlled selected value",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable the combobox",
    },

    // Advanced (hidden)
    buttonClassName: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    virtualization: { table: { disable: true } },
  },
  args: {
    placeholder: "Select…",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  parameters: {
    builder: {
      category: "form",
      icon: "search",
    },
    docs: {
      description: {
        component:
          "Searchable select component with filtering. Supports large lists via virtualization.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const patternmodels: ComboboxItem[] = [
  { value: "cotton", label: "Cotton" },
  { value: "wool", label: "Wool" },
  { value: "linen", label: "Linen" },
  { value: "silk", label: "Silk" },
  { value: "polyester", label: "Polyester" },
];

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  args: {
    items: patternmodels,
    placeholder: "Select patternmodel type…",
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    items: patternmodels,
    placeholder: "Select patternmodel…",
    disabled: true,
  },
};

/**
 * Controlled example with value display.
 */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Controlled combobox showing the current value.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Stack gap="base">
        <Combobox
          items={patternmodels}
          onValueChange={setValue}
          placeholder="Select patternmodel…"
          value={value}
        />
        <Text color="muted" size="sm">
          Selected: {value || "(none)"}
        </Text>
      </Stack>
    );
  },
};

/**
 * Long list with many options.
 */
export const LongList: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Combobox handles long lists with scrolling and filtering.",
      },
    },
  },
  render: () => {
    const countries: ComboboxItem[] = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "es", label: "Spain" },
      { value: "it", label: "Italy" },
      { value: "jp", label: "Japan" },
      { value: "cn", label: "China" },
      { value: "in", label: "India" },
      { value: "br", label: "Brazil" },
      { value: "mx", label: "Mexico" },
      { value: "kr", label: "South Korea" },
      { value: "nl", label: "Netherlands" },
    ];

    return <Combobox items={countries} placeholder="Select a country…" />;
  },
};

/**
 * With virtualization for very large lists.
 */
export const Virtualized: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "For very large lists (1000+ items), enable virtualization to improve performance.",
      },
    },
  },
  render: () => {
    const manyItems: ComboboxItem[] = Array.from({ length: 1000 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i + 1}`,
    }));

    return (
      <Combobox
        items={manyItems}
        placeholder="Select from 1000 items…"
        virtualization={{ enabled: true }}
      />
    );
  },
};
