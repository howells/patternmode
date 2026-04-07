import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { CircularProgress } from "./circular-progress-root";

type CircularProgressStoryArgs = React.ComponentProps<typeof CircularProgress>;

const meta: Meta<CircularProgressStoryArgs> = {
  title: "CircularProgress",
  component: CircularProgress,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value from 0-100",
    },
    size: {
      ...sizeArgType,
      description:
        "Size using shared component size scale (matches Button heights)",
    },
  },
  args: {
    value: 60,
    size: "base",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "loader",
    },
    docs: {
      description: {
        component:
          "Circular progress indicator with spring-animated transitions. Uses the shared ComponentSize scale for consistent sizing with Button and other components.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore progress values and sizes.
 */
export const Base: Story = {
  args: {
    value: 60,
    size: "base",
  },
};

type ProgressValue = 0 | 25 | 50 | 75 | 100;

const VALUE_COLUMNS: { key: ProgressValue; label: string }[] = [
  { key: 0, label: "0%" },
  { key: 25, label: "25%" },
  { key: 50, label: "50%" },
  { key: 75, label: "75%" },
  { key: 100, label: "100%" },
];

const SIZE_ROWS: { key: ComponentSize; label: string }[] = COMPONENT_SIZES.map(
  (s) => ({
    key: s,
    label: s,
  }),
);

/**
 * Size matrix showing all sizes at different progress values.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing all component sizes (2xs through 3xl) at various progress values.",
      },
    },
  },
  render: () => {
    const renderCell = (size: ComponentSize, value: ProgressValue) => (
      <CircularProgress size={size} value={value} />
    );

    return (
      <VariantGrid
        columns={VALUE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};
