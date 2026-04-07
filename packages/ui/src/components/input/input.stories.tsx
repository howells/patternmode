import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Input } from "./input-root";

type InputStoryArgs = React.ComponentProps<typeof Input>;

const meta: Meta<InputStoryArgs> = {
  title: "Input",
  component: Input,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Input size using shared ComponentSize scale",
    },
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "search",
        "tel",
        "url",
        "number",
        "date",
        "time",
        "datetime-local",
        "file",
      ],
      description: "HTML input type",
    },

    // Content
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    defaultValue: {
      control: "text",
      description: "Uncontrolled default value",
    },

    // States
    focused: {
      control: "boolean",
      description: "Force focus ring display (for documentation)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    readOnly: {
      control: "boolean",
      description: "Make the input read-only",
    },
    hasError: {
      control: "boolean",
      description: "Show error styling",
    },
    required: {
      control: "boolean",
      description: "Mark as required for form validation",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    type: "text",
    placeholder: "Enter text…",
    size: "base",
    disabled: false,
    readOnly: false,
    hasError: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "text-cursor-input",
    },
    docs: {
      description: {
        component:
          "Simple standalone input field. For inputs with icons, addons, or buttons, use InputGroup.",
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
type InputState = "default" | "focus" | "disabled" | "readonly" | "error";

const STATE_COLUMNS: { key: InputState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "readonly", label: "Read-only" },
  { key: "error", label: "Error" },
];

/**
 * Size × State matrix showing all input variations.
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

    const renderCell = (size: ComponentSize, state: InputState) => {
      const stateProps = (() => {
        switch (state) {
          case "focus":
            return { focused: true };
          case "disabled":
            return { disabled: true };
          case "readonly":
            return { readOnly: true, defaultValue: "Read-only" };
          case "error":
            return { hasError: true };
          default:
            return {};
        }
      })();

      return <Input placeholder="Input" size={size} {...stateProps} />;
    };

    return (
      <VariantGrid<ComponentSize, InputState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * All input types showcase.
 */
export const Types: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common input types for various data entry scenarios.",
      },
    },
  },
  render: () => {
    type InputType =
      | "text"
      | "email"
      | "password"
      | "search"
      | "number"
      | "tel"
      | "url"
      | "date"
      | "time"
      | "file";

    const TYPE_ROWS: { key: InputType; label: string }[] = [
      { key: "text", label: "text" },
      { key: "email", label: "email" },
      { key: "password", label: "password" },
      { key: "search", label: "search" },
      { key: "number", label: "number" },
      { key: "tel", label: "tel" },
      { key: "url", label: "url" },
      { key: "date", label: "date" },
      { key: "time", label: "time" },
      { key: "file", label: "file" },
    ];

    type SizeCol = "sm" | "base" | "lg";
    const SIZE_COLS: { key: SizeCol; label: string }[] = [
      { key: "sm", label: "sm" },
      { key: "base", label: "base" },
      { key: "lg", label: "lg" },
    ];

    const placeholders: Record<InputType, string> = {
      text: "Text input",
      email: "email@example.com",
      password: "Password",
      search: "Search…",
      number: "0",
      tel: "+1 (555) 000-0000",
      url: "https://",
      date: "",
      time: "",
      file: "",
    };

    return (
      <VariantGrid<InputType, SizeCol>
        columns={SIZE_COLS}
        renderCell={(type, size) => (
          <Input placeholder={placeholders[type]} size={size} type={type} />
        )}
        rowLabels="Type"
        rows={TYPE_ROWS}
      />
    );
  },
};
