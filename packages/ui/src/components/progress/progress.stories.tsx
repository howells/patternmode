import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Stack } from "../stack";
import { Text } from "../text";
import { Progress, ProgressCircle } from "./progress-root";

type ProgressStoryArgs = React.ComponentProps<typeof Progress>;

const meta: Meta<ProgressStoryArgs> = {
  title: "Progress",
  component: Progress,
  argTypes: {
    // Behavior
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    value: 50,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    builder: {
      category: "feedback",
      icon: "loader",
    },
    docs: {
      description: {
        component:
          "Progress bar component that displays completion status. Supports controlled value between 0-100 and accessible labels.",
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
 * Value columns for the matrix.
 */
type ProgressValue = 0 | 25 | 50 | 75 | 100;

const VALUE_COLUMNS: { key: ProgressValue; label: string }[] = [
  { key: 0, label: "0%" },
  { key: 25, label: "25%" },
  { key: 50, label: "50%" },
  { key: 75, label: "75%" },
  { key: 100, label: "100%" },
];

/**
 * Value matrix showing progress at different percentages.
 */
export const ValueMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing progress bar at various completion percentages.",
      },
    },
  },
  render: () => {
    type WidthRow = "full" | "medium" | "small";
    const WIDTH_ROWS: { key: WidthRow; label: string }[] = [
      { key: "full", label: "Full width" },
      { key: "medium", label: "Medium" },
      { key: "small", label: "Small" },
    ];

    const widthClasses: Record<WidthRow, string> = {
      full: "w-64",
      medium: "w-48",
      small: "w-32",
    };

    return (
      <VariantGrid<WidthRow, ProgressValue>
        columns={VALUE_COLUMNS}
        renderCell={(width, value) => (
          <Progress className={widthClasses[width]} value={value} />
        )}
        rowLabels="Width"
        rows={WIDTH_ROWS}
      />
    );
  },
};

/**
 * With labels.
 */
export const WithLabels: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Progress bars with descriptive labels for context.",
      },
    },
  },
  render: () => (
    <Stack gap="xl">
      <Stack gap="xs">
        <Flex align="center" justify="space-between">
          <Text className="font-medium" size="sm">
            Uploading files
          </Text>
          <Text color="muted" size="sm">
            33%
          </Text>
        </Flex>
        <Progress value={33} />
      </Stack>
      <Stack gap="xs">
        <Flex align="center" justify="space-between">
          <Text className="font-medium" size="sm">
            Processing images
          </Text>
          <Text color="muted" size="sm">
            67%
          </Text>
        </Flex>
        <Progress value={67} />
      </Stack>
      <Stack gap="xs">
        <Flex align="center" justify="space-between">
          <Text className="font-medium" size="sm">
            Installation complete
          </Text>
          <Text color="muted" size="sm">
            100%
          </Text>
        </Flex>
        <Progress value={100} />
      </Stack>
    </Stack>
  ),
};

/**
 * Indeterminate state.
 */
export const Indeterminate: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Progress bar without a value shows indeterminate state (empty).",
      },
    },
  },
  render: () => (
    <Stack gap="base">
      <Stack gap="xs">
        <Text color="muted" size="sm">
          Loading…
        </Text>
        <Progress />
      </Stack>
      <Stack gap="xs">
        <Text color="muted" size="sm">
          Known progress (45%)
        </Text>
        <Progress value={45} />
      </Stack>
    </Stack>
  ),
};

/**
 * Progress circle variant.
 */
export const Circle: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Circular progress indicator with optional center content.",
      },
    },
  },
  render: () => (
    <Flex align="center" gap="xl">
      <ProgressCircle label="Progress" value={25} />
      <ProgressCircle label="Progress" value={50} />
      <ProgressCircle label="Progress" value={75} />
      <ProgressCircle label="Progress" value={100} />
      <ProgressCircle label="Progress" size={60} strokeWidth={4} value={67}>
        <Text className="font-medium" size="xs">
          67%
        </Text>
      </ProgressCircle>
    </Flex>
  ),
};
