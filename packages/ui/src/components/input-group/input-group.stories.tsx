import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Copy, Mail, Search, Send, X } from "lucide-react";
import { useState } from "react";
import { RADIUS_OPTIONS } from "../../lib/radius";
import { COMPONENT_SIZES } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { InputGroupAddon } from "./input-group-addon";
import { inputGroupAnatomy } from "./input-group-anatomy";
import { InputGroupButton } from "./input-group-button";
import { InputGroupIcon } from "./input-group-icon";
import { InputGroupInput } from "./input-group-input";
import { InputGroup } from "./input-group-root";
import { InputGroupTextarea } from "./input-group-textarea";
import type { InputGroupSize } from "./input-group-types";

const meta: Meta<typeof InputGroup> = {
  title: "InputGroup",
  component: InputGroup,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Size of the input group and its children",
    },
    radius: {
      control: "select",
      options: RADIUS_OPTIONS,
      description: "Border radius style",
    },

    // States
    hasError: {
      control: "boolean",
      description: "Show error styling",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input group and its children",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    size: "base",
    radius: "rounded",
    hasError: false,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "text-cursor-input",
    },
    anatomy: inputGroupAnatomy,
    docs: {
      description: {
        component:
          "Composition container for inputs with addons, icons, and buttons. Use for complex input layouts like search fields, currency inputs, or inputs with action buttons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore all input group options.
 */
export const Base: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupIcon icon={Search} />
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

// State configuration for variant matrix
type InputGroupState = "default" | "focus" | "error" | "disabled";

const STATE_COLUMNS: { key: InputGroupState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "focus", label: "Focus" },
  { key: "error", label: "Error" },
  { key: "disabled", label: "Disabled" },
];

// Sizes to display in matrices
const DISPLAY_SIZES: InputGroupSize[] = ["xs", "sm", "base", "lg", "xl", "2xl"];

/**
 * Size × State matrix showing all size variants and states.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Complete size scale showing all InputGroup sizes across different states.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({
      key: size,
      label: size,
    }));

    const renderCell = (sizeKey: InputGroupSize, state: InputGroupState) => (
      <InputGroup
        disabled={state === "disabled"}
        hasError={state === "error"}
        size={sizeKey}
      >
        <InputGroupIcon icon={Search} />
        <InputGroupInput
          autoFocus={state === "focus"}
          placeholder="Search..."
        />
      </InputGroup>
    );

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};

// Icon configuration types
type IconConfig = "no-icon" | "icon-start" | "icon-button" | "icon-both";

const ICON_CONFIGS: { key: IconConfig; label: string }[] = [
  { key: "no-icon", label: "No Icon" },
  { key: "icon-start", label: "Icon Start" },
  { key: "icon-button", label: "Icon Button" },
  { key: "icon-both", label: "Icon + Button" },
];

/**
 * Icon configuration matrix showing different icon placements across sizes.
 */
export const IconMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing icon placement configurations (no icon, icon start, icon button, icon + button) across sizes.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({
      key: size,
      label: size,
    }));

    const renderCell = (sizeKey: InputGroupSize, config: IconConfig) => {
      switch (config) {
        case "no-icon":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput placeholder="Enter text..." />
            </InputGroup>
          );
        case "icon-start":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupIcon icon={Search} />
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
          );
        case "icon-button":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput placeholder="Enter text..." />
              <InputGroupButton icon={X} />
            </InputGroup>
          );
        case "icon-both":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupIcon icon={Search} />
              <InputGroupInput placeholder="Search..." />
              <InputGroupButton icon={X} />
            </InputGroup>
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={ICON_CONFIGS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};

// Addon configuration types
type AddonConfig =
  | "prefix-text"
  | "suffix-text"
  | "prefix-suffix"
  | "prefix-muted"
  | "suffix-muted"
  | "both-muted";

const ADDON_CONFIGS: { key: AddonConfig; label: string }[] = [
  { key: "prefix-text", label: "Prefix Text" },
  { key: "suffix-text", label: "Suffix Text" },
  { key: "prefix-suffix", label: "Both Text" },
  { key: "prefix-muted", label: "Prefix Muted" },
  { key: "suffix-muted", label: "Suffix Muted" },
  { key: "both-muted", label: "Both Muted" },
];

/**
 * Addon configuration matrix showing different addon variants across sizes.
 */
export const AddonMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing addon configurations (text vs muted, prefix vs suffix) across sizes.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({
      key: size,
      label: size,
    }));

    const renderCell = (sizeKey: InputGroupSize, config: AddonConfig) => {
      switch (config) {
        case "prefix-text":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupAddon>https://</InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          );
        case "suffix-text":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput placeholder="username" />
              <InputGroupAddon align="inline-end">@domain.com</InputGroupAddon>
            </InputGroup>
          );
        case "prefix-suffix":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupAddon>$</InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
              <InputGroupAddon align="inline-end">USD</InputGroupAddon>
            </InputGroup>
          );
        case "prefix-muted":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupAddon variant="muted">https://</InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          );
        case "suffix-muted":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput placeholder="username" />
              <InputGroupAddon align="inline-end" variant="muted">
                @domain.com
              </InputGroupAddon>
            </InputGroup>
          );
        case "both-muted":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupAddon variant="muted">$</InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
              <InputGroupAddon align="inline-end" variant="muted">
                USD
              </InputGroupAddon>
            </InputGroup>
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={ADDON_CONFIGS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};

// Button configuration types
type ButtonConfig = "clear" | "copy" | "submit" | "multiple";

const BUTTON_CONFIGS: { key: ButtonConfig; label: string }[] = [
  { key: "clear", label: "Clear" },
  { key: "copy", label: "Copy" },
  { key: "submit", label: "Submit" },
  { key: "multiple", label: "Multiple" },
];

/**
 * Button configuration matrix showing different button uses across sizes.
 */
export const ButtonMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing button configurations (clear, copy, submit, multiple) across sizes.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({
      key: size,
      label: size,
    }));

    const renderCell = (sizeKey: InputGroupSize, config: ButtonConfig) => {
      switch (config) {
        case "clear":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput defaultValue="Some text" />
              <InputGroupButton icon={X} />
            </InputGroup>
          );
        case "copy":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput readOnly value="sk-1234..." />
              <InputGroupButton icon={Copy} />
            </InputGroup>
          );
        case "submit":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupIcon icon={Mail} />
              <InputGroupInput placeholder="Email..." />
              <InputGroupButton icon={Send} variant="default" />
            </InputGroup>
          );
        case "multiple":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput defaultValue="Editable" />
              <InputGroupButton icon={Copy} />
              <InputGroupButton icon={X} />
            </InputGroup>
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={BUTTON_CONFIGS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};

// Combined configuration types
type CombinedConfig = "search" | "currency" | "email" | "api-key";

const COMBINED_CONFIGS: { key: CombinedConfig; label: string }[] = [
  { key: "search", label: "Search" },
  { key: "currency", label: "Currency" },
  { key: "email", label: "Email" },
  { key: "api-key", label: "API Key" },
];

/**
 * Real-world use case matrix showing practical input patterns across sizes.
 */
export const UseCaseMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Real-world use cases (search, currency, email, API key) demonstrating practical InputGroup patterns.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({
      key: size,
      label: size,
    }));

    const renderCell = (sizeKey: InputGroupSize, config: CombinedConfig) => {
      switch (config) {
        case "search":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupIcon icon={Search} />
              <InputGroupInput placeholder="Search..." />
              <InputGroupButton icon={X} />
            </InputGroup>
          );
        case "currency":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupAddon variant="muted">$</InputGroupAddon>
              <InputGroupInput placeholder="0.00" type="number" />
              <InputGroupAddon align="inline-end" variant="muted">
                USD
              </InputGroupAddon>
            </InputGroup>
          );
        case "email":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupIcon icon={Mail} />
              <InputGroupInput placeholder="you" />
              <InputGroupAddon align="inline-end" variant="muted">
                @example.com
              </InputGroupAddon>
            </InputGroup>
          );
        case "api-key":
          return (
            <InputGroup size={sizeKey}>
              <InputGroupInput readOnly value="sk-1234567890..." />
              <InputGroupButton icon={Copy} />
            </InputGroup>
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={COMBINED_CONFIGS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};

/**
 * Interactive clear button example with state.
 */
export const ClearableInput: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing a clearable input with icon and clear button.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("Hello world");

    return (
      <InputGroup size="base">
        <InputGroupIcon icon={Search} />
        <InputGroupInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          value={value}
        />
        {value && <InputGroupButton icon={X} onClick={() => setValue("")} />}
      </InputGroup>
    );
  },
};

/**
 * Textarea with send button example.
 */
export const TextareaExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "InputGroup with textarea for multi-line input with action button. Use `h-auto` and `items-end` to allow textarea to grow.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <InputGroup className="h-auto items-end" size="base">
      <InputGroupTextarea placeholder="Enter your message..." />
      <InputGroupButton icon={Send} variant="ghost" />
    </InputGroup>
  ),
};

/**
 * All sizes displayed vertically for comparison.
 */
export const AllSizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All InputGroup sizes displayed vertically for visual comparison.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {COMPONENT_SIZES.map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroupIcon icon={Search} />
          <InputGroupInput placeholder={`Size: ${size}`} />
          <InputGroupButton icon={X} />
        </InputGroup>
      ))}
    </div>
  ),
};
