import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Text } from "../text";
import { Stack } from "./stack-root";

type StackDirection = "column" | "row";
type StackGap =
  | "none"
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
type StackAlign = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

const GAP_OPTIONS: StackGap[] = [
  "none",
  "3xs",
  "2xs",
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
];
const ALIGN_OPTIONS: StackAlign[] = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];
const JUSTIFY_OPTIONS = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
] as const;

type StackStoryArgs = React.ComponentProps<typeof Stack>;

const meta: Meta<StackStoryArgs> = {
  title: "Layout/Stack",
  component: Stack,
  argTypes: {
    // Visual
    direction: {
      control: "select",
      options: ["column", "row"],
      description: "Stack direction (column = vertical, row = horizontal)",
    },
    gap: {
      control: "select",
      options: GAP_OPTIONS,
      description: "Gap between children using spacing scale",
    },
    align: {
      control: "select",
      options: ALIGN_OPTIONS,
      description: "Cross-axis alignment",
    },
    justify: {
      control: "select",
      options: JUSTIFY_OPTIONS,
      description: "Main-axis distribution",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    direction: "column",
    gap: "base",
    align: "stretch",
    justify: "flex-start",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "layers",
    },
    docs: {
      description: {
        component:
          "Stack is a layout component for arranging children vertically or horizontally. It provides consistent spacing, alignment, and justification options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <Stack {...args} className="w-96">
      <Text className="rounded-md border bg-secondary p-3" size="sm">
        Item One
      </Text>
      <Text className="rounded-md border bg-secondary p-3" size="sm">
        Item Two
      </Text>
      <Text className="rounded-md border bg-secondary p-3" size="sm">
        Item Three
      </Text>
    </Stack>
  ),
};

/**
 * Gap × Direction matrix showing all combinations.
 */
export const GapDirectionMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing gap sizes across directions.",
      },
    },
  },
  render: () => {
    const GAP_ROWS: { key: StackGap; label: string }[] = [
      "2xs",
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
    ].map((g) => ({ key: g as StackGap, label: g }));
    const DIRECTION_COLUMNS: { key: StackDirection; label: string }[] = [
      { key: "column", label: "Column" },
      { key: "row", label: "Row" },
    ];

    return (
      <VariantGrid<StackGap, StackDirection>
        columns={DIRECTION_COLUMNS}
        renderCell={(gap, direction) => (
          <Stack direction={direction} gap={gap}>
            <Text className="rounded border bg-secondary px-2 py-1" size="xs">
              A
            </Text>
            <Text className="rounded border bg-secondary px-2 py-1" size="xs">
              B
            </Text>
            <Text className="rounded border bg-secondary px-2 py-1" size="xs">
              C
            </Text>
          </Stack>
        )}
        rowLabels="Gap"
        rows={GAP_ROWS}
      />
    );
  },
};
