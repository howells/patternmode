// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { EditableText } from "./editable-text";

type EditableTextStoryArgs = React.ComponentProps<typeof EditableText>;

const meta: Meta<EditableTextStoryArgs> = {
  title: "EditableText",
  component: EditableText,
  argTypes: {
    value: {
      control: "text",
      description: "Current text value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder when value is empty",
    },
    multiline: {
      control: "boolean",
      description: "Enable multiline editing (textarea vs input)",
    },
    showEditIcon: {
      control: "boolean",
      description: "Show edit icon on hover",
    },
    selectOnFocus: {
      control: "boolean",
      description: "Select all text when entering edit mode",
    },
  },
  args: {
    value: "Click to edit",
    placeholder: "Enter text\u2026",
    multiline: false,
    showEditIcon: false,
    selectOnFocus: false,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "edit",
    },
    docs: {
      description: {
        component:
          "Inline editable text component. Click to edit, blur or Enter to save, Escape to cancel. Supports single-line and multiline editing.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function BaseDemo(args: EditableTextStoryArgs) {
  const [value, setValue] = useState(args.value);
  return <EditableText {...args} onSave={setValue} value={value} />;
}

/**
 * Base story with all controllable props.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

type EditMode = "single" | "multiline";
type EditFeature = "default" | "with-icon" | "select-on-focus";

const MODE_ROWS: { key: EditMode; label: string }[] = [
  { key: "single", label: "Single-line" },
  { key: "multiline", label: "Multiline" },
];

const FEATURE_COLUMNS: { key: EditFeature; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "with-icon", label: "With Edit Icon" },
  { key: "select-on-focus", label: "Select on Focus" },
];

function FeatureMatrixDemo() {
  const [values, setValues] = useState<Record<string, string>>({
    "single-default": "Click to edit",
    "single-with-icon": "Click to edit",
    "single-select-on-focus": "Click to edit",
    "multiline-default": "Click to edit\nMultiple lines",
    "multiline-with-icon": "Click to edit\nMultiple lines",
    "multiline-select-on-focus": "Click to edit\nMultiple lines",
  });

  const renderCell = (mode: EditMode, feature: EditFeature) => {
    const key = `${mode}-${feature}`;
    return (
      <div className="w-48">
        <EditableText
          multiline={mode === "multiline"}
          onSave={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
          placeholder="Enter text\u2026"
          selectOnFocus={feature === "select-on-focus"}
          showEditIcon={feature === "with-icon"}
          value={values[key] ?? ""}
        />
      </div>
    );
  };

  return (
    <VariantGrid
      columns={FEATURE_COLUMNS}
      renderCell={renderCell}
      rowLabels="Mode"
      rows={MODE_ROWS}
    />
  );
}

/**
 * Feature matrix showing different configurations.
 */
export const FeatureMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing single-line and multiline modes with different feature combinations.",
      },
    },
  },
  render: () => <FeatureMatrixDemo />,
};

function EmptyStateDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <EditableText
        onSave={setValue}
        placeholder="Untitled document"
        showEditIcon
        value={value}
      />
      <p className="text-muted-foreground text-sm">
        Current value: {value || "(empty)"}
      </p>
    </div>
  );
}

/**
 * Empty state with placeholder.
 */
export const EmptyState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Shows how the component appears with no value, displaying the placeholder in italic muted style.",
      },
    },
  },
  render: () => <EmptyStateDemo />,
};

function StyledExamplesDemo() {
  const [title, setTitle] = useState("Project Title");
  const [description, setDescription] = useState(
    "Add a description for your project",
  );

  return (
    <div className="flex flex-col gap-4">
      <EditableText
        className="font-semibold text-2xl"
        onSave={setTitle}
        placeholder="Untitled"
        selectOnFocus
        showEditIcon
        value={title}
      />
      <EditableText
        className="text-muted-foreground text-sm"
        multiline
        onSave={setDescription}
        placeholder="Add a description\u2026"
        value={description}
      />
    </div>
  );
}

/**
 * Styled example showing common use cases.
 */
export const StyledExamples: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Common styling patterns: page titles, descriptions, and labels.",
      },
    },
  },
  render: () => <StyledExamplesDemo />,
};
