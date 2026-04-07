import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { CountryCombobox } from "./country-combobox-root";

type CountryComboboxStoryArgs = React.ComponentProps<typeof CountryCombobox>;

const meta: Meta<CountryComboboxStoryArgs> = {
  title: "CountryCombobox",
  component: CountryCombobox,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    placeholder: "Select country\u2026",
    disabled: false,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "globe",
    },
    docs: {
      description: {
        component:
          "Searchable country combobox with ISO 3166-1 alpha-2 codes. Wraps the Combobox component with a pre-populated country list.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function BaseDemo(args: CountryComboboxStoryArgs) {
  const [value, setValue] = useState<string>("");
  return (
    <div className="w-64">
      <CountryCombobox {...args} onValueChange={setValue} value={value} />
    </div>
  );
}

/**
 * Base story with all controllable props.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

function WithValueDemo() {
  const [value, setValue] = useState("US");
  return (
    <div className="flex flex-col gap-4">
      <div className="w-64">
        <CountryCombobox onValueChange={setValue} value={value} />
      </div>
      <p className="text-muted-foreground text-sm">
        Selected code: {value || "None"}
      </p>
    </div>
  );
}

/**
 * Pre-selected country example.
 */
export const WithValue: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Shows combobox with a pre-selected country. Accepts both country codes (US) and full names (United States).",
      },
    },
  },
  render: () => <WithValueDemo />,
};

/**
 * States showing disabled.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Default and disabled states.",
      },
    },
  },
  render: () => (
    <div className="flex gap-8">
      <div className="flex w-64 flex-col gap-2">
        <span className="text-muted-foreground text-sm">Default</span>
        <CountryCombobox
          onValueChange={() => {
            // no-op
          }}
          value="GB"
        />
      </div>
      <div className="flex w-64 flex-col gap-2">
        <span className="text-muted-foreground text-sm">Disabled</span>
        <CountryCombobox
          disabled
          onValueChange={() => {
            // no-op
          }}
          value="GB"
        />
      </div>
    </div>
  ),
};
