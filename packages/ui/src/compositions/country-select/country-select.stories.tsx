// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { CountrySelect } from "./country-select-root";

type CountrySelectStoryArgs = React.ComponentProps<typeof CountrySelect>;

const SAMPLE_OPTIONS = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "JP", label: "Japan" },
  { value: "AU", label: "Australia" },
];

const meta: Meta<CountrySelectStoryArgs> = {
  title: "CountrySelect",
  component: CountrySelect,
  argTypes: {
    size: {
      ...sizeArgType,
      description: "Size of the select",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    size: "base",
    disabled: false,
    options: SAMPLE_OPTIONS,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "flag",
    },
    docs: {
      description: {
        component:
          "Country selector with flag display. Shows circular country flags from country-flag-icons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function BaseDemo(args: CountrySelectStoryArgs) {
  const [value, setValue] = useState("US");
  return (
    <div className="inline-flex rounded-md border border-border">
      <CountrySelect {...args} onChange={setValue} value={value} />
    </div>
  );
}

/**
 * Base story with all controllable props.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

type SelectState = "default" | "disabled";

const SIZE_ROWS: { key: ComponentSize; label: string }[] = COMPONENT_SIZES.map(
  (s) => ({ key: s, label: s.toUpperCase() }),
);

const STATE_COLUMNS: { key: SelectState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "disabled", label: "Disabled" },
];

/**
 * Size and state matrix.
 */
export const SizeStateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing all country select sizes in default and disabled states.",
      },
    },
  },
  render: () => {
    const renderCell = (size: ComponentSize, state: SelectState) => (
      <div className="inline-flex rounded-md border border-border">
        <CountrySelect
          disabled={state === "disabled"}
          onChange={() => {
            // no-op
          }}
          options={SAMPLE_OPTIONS}
          size={size}
          value="US"
        />
      </div>
    );

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Different country flags displayed.
 */
export const CountryFlags: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Shows how different country flags render in the selector.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {SAMPLE_OPTIONS.map((option) => (
        <div
          className="inline-flex rounded-md border border-border"
          key={option.value}
        >
          <CountrySelect
            onChange={() => {
              // no-op
            }}
            options={SAMPLE_OPTIONS}
            value={option.value}
          />
        </div>
      ))}
    </div>
  ),
};
