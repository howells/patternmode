import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { RequirementItem } from "./requirement-item-root";

type RequirementItemStoryArgs = React.ComponentProps<typeof RequirementItem>;

const meta: Meta<RequirementItemStoryArgs> = {
  title: "RequirementItem",
  component: RequirementItem,
  argTypes: {
    label: {
      control: "text",
      description: "The requirement label text",
    },
    met: {
      control: "boolean",
      description: "Whether the requirement has been met",
    },
  },
  args: {
    label: "At least 8 characters",
    met: false,
  },
  parameters: {
    builder: {
      category: "display",
      icon: "check-circle",
    },
    docs: {
      description: {
        component:
          "Displays a requirement item with a check/x icon indicating met/unmet status. Useful for password requirements, form validation lists, etc.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with controllable props.
 * Toggle the met state to see the visual change.
 */
export const Base: Story = {
  args: {
    label: "At least 8 characters",
    met: false,
  },
};

type MetState = "met" | "unmet";

const STATE_COLUMNS: { key: MetState; label: string }[] = [
  { key: "unmet", label: "Unmet" },
  { key: "met", label: "Met" },
];

const REQUIREMENT_ROWS: { key: string; label: string }[] = [
  { key: "length", label: "Length" },
  { key: "uppercase", label: "Uppercase" },
  { key: "number", label: "Number" },
  { key: "special", label: "Special" },
];

/**
 * State matrix showing different requirements in met/unmet states.
 */
export const StateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing various password requirements in both met and unmet states.",
      },
    },
  },
  render: () => {
    const labels: Record<string, string> = {
      length: "At least 8 characters",
      uppercase: "One uppercase letter",
      number: "One number",
      special: "One special character",
    };

    const renderCell = (requirement: string, state: MetState) => (
      <RequirementItem
        label={labels[requirement] ?? ""}
        met={state === "met"}
      />
    );

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Requirement"
        rows={REQUIREMENT_ROWS}
      />
    );
  },
};

/**
 * Password validation example showing realistic usage.
 */
export const PasswordValidation: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "A realistic password validation list with mixed states.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <RequirementItem label="At least 8 characters" met={true} />
      <RequirementItem label="One uppercase letter" met={true} />
      <RequirementItem label="One lowercase letter" met={true} />
      <RequirementItem label="One number" met={false} />
      <RequirementItem label="One special character (!@#$%)" met={false} />
    </div>
  ),
};
