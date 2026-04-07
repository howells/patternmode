import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Text } from "../../components/text";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { InputCard } from "./input-card-root";

const meta = {
  title: "InputCard",
  component: InputCard,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Card size using shared ComponentSize scale",
    },

    // States
    selected: {
      control: "boolean",
      description: "Whether the card is in a selected state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the card is disabled",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    size: "base",
    selected: false,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "credit-card",
    },
    docs: {
      description: {
        component:
          "A primitive card component for building selection interfaces. Used as a base for RadioCard and CheckboxCard.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Base: Story = {
  render: (args) => (
    <InputCard {...args} className="max-w-xs">
      <Text size="sm">Content</Text>
    </InputCard>
  ),
};

type SizeKey = "xs" | "sm" | "base" | "lg";
type StateKey = "default" | "selected" | "disabled";

const SIZES: { key: SizeKey; label: React.ReactNode }[] = [
  { key: "xs", label: <code>xs</code> },
  { key: "sm", label: <code>sm</code> },
  { key: "base", label: <code>base</code> },
  { key: "lg", label: <code>lg</code> },
];

const STATES: { key: StateKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
];

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <VariantGrid<SizeKey, StateKey>
      columns={STATES}
      renderCell={(size, state) => (
        <InputCard
          disabled={state === "disabled"}
          selected={state === "selected"}
          size={size}
        >
          <Text size="sm">Content</Text>
        </InputCard>
      )}
      rowLabels="Size"
      rows={SIZES}
    />
  ),
};
