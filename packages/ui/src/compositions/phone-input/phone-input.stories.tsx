import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { type E164Number, PhoneInput } from "./phone-input-root";

type PhoneInputStoryArgs = React.ComponentProps<typeof PhoneInput>;

const meta: Meta<PhoneInputStoryArgs> = {
  title: "PhoneInput",
  component: PhoneInput,
  argTypes: {
    size: {
      ...sizeArgType,
      description: "Size of the input",
    },
    radius: {
      control: "select",
      options: ["rounded", "full"],
      description: "Border radius style",
    },
    hasError: {
      control: "boolean",
      description: "Show error styling",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    defaultCountry: {
      control: "text",
      description: "Default country code (ISO 3166-1 alpha-2)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
  args: {
    size: "base",
    radius: "rounded",
    hasError: false,
    disabled: false,
    defaultCountry: "US",
    placeholder: "+1 (555) 000-0000",
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "phone",
    },
    docs: {
      description: {
        component:
          "Phone number input with integrated country selector. Uses react-phone-number-input for E.164 format validation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function BaseDemo(args: PhoneInputStoryArgs) {
  const [value, setValue] = useState<E164Number | undefined>();
  return <PhoneInput {...args} onChange={setValue} value={value} />;
}

/**
 * Base story with all controllable props.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

type InputState = "default" | "error" | "disabled";

const SIZE_ROWS: { key: ComponentSize; label: string }[] = COMPONENT_SIZES.map(
  (s) => ({ key: s, label: s.toUpperCase() }),
);

const STATE_COLUMNS: { key: InputState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "error", label: "Error" },
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
        story: "Matrix showing all phone input sizes across different states.",
      },
    },
  },
  render: () => {
    const renderCell = (size: ComponentSize, state: InputState) => (
      <div className="w-64">
        <PhoneInput
          defaultCountry="US"
          disabled={state === "disabled"}
          hasError={state === "error"}
          placeholder="+1 (555) 000-0000"
          size={size}
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
 * Radius variants showing rounded vs pill shapes.
 */
export const RadiusVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Comparing rounded (default) and full (pill) border radius styles.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Rounded</span>
        <PhoneInput
          defaultCountry="US"
          placeholder="+1 (555) 000-0000"
          radius="rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Full (Pill)</span>
        <PhoneInput
          defaultCountry="US"
          placeholder="+1 (555) 000-0000"
          radius="full"
        />
      </div>
    </div>
  ),
};
