import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Card } from "../card";
import { Text } from "../text";
import { Group } from "./group-root";

type GroupPosition =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type GroupAlign = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
type GroupGap =
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

const POSITION_OPTIONS: GroupPosition[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];
const ALIGN_OPTIONS: GroupAlign[] = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];
const GAP_OPTIONS: GroupGap[] = [
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

type GroupStoryArgs = React.ComponentProps<typeof Group>;

const meta: Meta<GroupStoryArgs> = {
  title: "Layout/Group",
  component: Group,
  argTypes: {
    // Visual
    position: {
      control: "select",
      options: POSITION_OPTIONS,
      description: "Horizontal distribution of children",
    },
    align: {
      control: "select",
      options: ALIGN_OPTIONS,
      description: "Vertical alignment of children",
    },
    gap: {
      control: "select",
      options: GAP_OPTIONS,
      description: "Gap between children",
    },
    wrap: {
      control: "boolean",
      description: "Allow children to wrap to multiple rows",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    position: "flex-start",
    align: "center",
    gap: "base",
    wrap: false,
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "layers",
    },
    docs: {
      description: {
        component:
          "Group is a horizontal flexbox container that arranges children in a row with configurable alignment, spacing, and wrapping behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-md border bg-secondary p-3">
      <Text size="sm">{children}</Text>
    </Card>
  );
}

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <Group {...args}>
      {Array.from({ length: 5 }, (_, itemNumber) => itemNumber + 1).map(
        (itemNumber) => (
          <Box key={itemNumber}>{itemNumber}</Box>
        ),
      )}
    </Group>
  ),
};

/**
 * Position × Align matrix showing layout combinations.
 */
export const PositionAlignMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing position and align combinations.",
      },
    },
  },
  render: () => {
    const POSITION_ROWS: { key: GroupPosition; label: string }[] = [
      { key: "flex-start", label: "start" },
      { key: "center", label: "center" },
      { key: "space-between", label: "between" },
    ];
    const ALIGN_COLUMNS: { key: GroupAlign; label: string }[] = [
      { key: "flex-start", label: "start" },
      { key: "center", label: "center" },
      { key: "stretch", label: "stretch" },
    ];

    return (
      <VariantGrid<GroupPosition, GroupAlign>
        columns={ALIGN_COLUMNS}
        renderCell={(position, align) => (
          <Group
            align={align}
            className="min-h-[60px] w-full rounded border bg-secondary/30"
            gap="xs"
            position={position}
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Group>
        )}
        rowLabels="Position"
        rows={POSITION_ROWS}
      />
    );
  },
};

/**
 * Wrapping behavior with many items.
 */
export const WithWrapping: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Groups can wrap children to multiple rows when wrap is enabled.",
      },
    },
  },
  render: () => (
    <Group gap="sm" wrap>
      {Array.from({ length: 15 }, (_, itemNumber) => itemNumber + 1).map(
        (itemNumber) => (
          <Box key={itemNumber}>{itemNumber}</Box>
        ),
      )}
    </Group>
  ),
};
