import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Label } from "../label";
import { Stack } from "../stack";
import { Text } from "../text";
import { Textarea } from "./textarea-root";

type TextareaStoryArgs = React.ComponentProps<typeof Textarea>;

const meta: Meta<TextareaStoryArgs> = {
  title: "Textarea",
  component: Textarea,
  argTypes: {
    // Content
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    defaultValue: {
      control: "text",
      description: "Uncontrolled default value",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
    },
    readOnly: {
      control: "boolean",
      description: "Make the textarea read-only",
    },
    required: {
      control: "boolean",
      description: "Mark as required for form validation",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
    testId: { table: { disable: true } },
  },
  args: {
    placeholder: "Enter text here…",
    rows: 4,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "align-left",
    },
    docs: {
      description: {
        component:
          "Textarea is a multi-line text input component for longer form content. It extends the native textarea element with consistent styling.",
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
type TextareaState = "default" | "focus" | "disabled" | "readonly" | "error";

const STATE_COLUMNS: { key: TextareaState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "readonly", label: "Read-only" },
  { key: "error", label: "Error" },
];

/**
 * Rows × State matrix showing all textarea variations.
 */
export const RowsStateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing different row heights across all states.",
      },
    },
  },
  render: () => {
    type RowCount = 2 | 4 | 6;
    const ROW_ROWS: { key: RowCount; label: string }[] = [
      { key: 2, label: "2 rows" },
      { key: 4, label: "4 rows" },
      { key: 6, label: "6 rows" },
    ];

    const renderCell = (rows: RowCount, state: TextareaState) => {
      const stateProps = (() => {
        switch (state) {
          case "focus":
            return { autoFocus: true };
          case "disabled":
            return { disabled: true };
          case "readonly":
            return { readOnly: true, defaultValue: "Read-only content" };
          case "error":
            return { "aria-invalid": true };
          default:
            return {};
        }
      })();

      return (
        <Textarea
          className="w-48"
          placeholder="Enter text…"
          rows={rows}
          {...stateProps}
        />
      );
    };

    return (
      <VariantGrid<RowCount, TextareaState>
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Rows"
        rows={ROW_ROWS}
      />
    );
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
};

/**
 * Error state.
 */
export const ErrorState: Story = {
  name: "Error",
  args: {
    placeholder: "Invalid textarea",
    "aria-invalid": true,
  },
};

/**
 * With label pattern.
 */
export const WithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Textarea paired with label and helper text for accessibility.",
      },
    },
  },
  render: () => (
    <Stack className="w-80" gap="xs">
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" placeholder="Enter a description…" />
      <Text color="muted" size="xs">
        Provide a detailed description of the item.
      </Text>
    </Stack>
  ),
};
