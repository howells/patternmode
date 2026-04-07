import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Card } from "../card";
import { Stack } from "../stack";
import { Text } from "../text";
import { SimpleGrid } from "./simple-grid-root";

type SimpleGridGap =
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
const GAP_OPTIONS: SimpleGridGap[] = [
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

type SimpleGridStoryArgs = React.ComponentProps<typeof SimpleGrid>;

const meta: Meta<SimpleGridStoryArgs> = {
  title: "Layout/SimpleGrid",
  component: SimpleGrid,
  argTypes: {
    // Visual
    cols: {
      control: { type: "number", min: 1, max: 12, step: 1 },
      description: "Number of columns in the grid",
    },
    gap: {
      control: "select",
      options: GAP_OPTIONS,
      description: "Gap between grid items",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    cols: 3,
    gap: "base",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "grid-3x3",
    },
    docs: {
      description: {
        component:
          "SimpleGrid creates equal-width column layouts with configurable gap. It uses CSS Grid under the hood for consistent, responsive layouts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children: React.ReactNode }) {
  return (
    <Text
      className="rounded-md border bg-secondary p-4 text-center"
      size="sm"
      variant="muted"
    >
      {children}
    </Text>
  );
}

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <SimpleGrid {...args}>
      {Array.from({ length: 6 }, (_, itemNumber) => itemNumber + 1).map(
        (itemNumber) => (
          <Box key={itemNumber}>{itemNumber}</Box>
        ),
      )}
    </SimpleGrid>
  ),
};

/**
 * Columns × Gap matrix showing combinations.
 */
type ColsConfig = 2 | 3 | 4;
export const ColsGapMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing column count and gap combinations.",
      },
    },
  },
  render: () => {
    const COLS_ROWS: { key: ColsConfig; label: string }[] = [
      { key: 2, label: "2 cols" },
      { key: 3, label: "3 cols" },
      { key: 4, label: "4 cols" },
    ];
    const GAP_COLUMNS: { key: SimpleGridGap; label: string }[] = [
      { key: "xs", label: "xs" },
      { key: "base", label: "base" },
      { key: "xl", label: "xl" },
    ];

    return (
      <VariantGrid<ColsConfig, SimpleGridGap>
        columns={GAP_COLUMNS}
        renderCell={(cols, gap) => (
          <SimpleGrid cols={cols} gap={gap}>
            {Array.from(
              { length: cols * 2 },
              (_, itemNumber) => itemNumber + 1,
            ).map((itemNumber) => (
              <Box key={itemNumber}>{itemNumber}</Box>
            ))}
          </SimpleGrid>
        )}
        rowLabels="Cols"
        rows={COLS_ROWS}
      />
    );
  },
};

/**
 * In context: card grid layout.
 */
export const CardGrid: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Common use case: displaying card-based content in a grid layout.",
      },
    },
  },
  render: () => (
    <SimpleGrid cols={3} gap="lg">
      {Array.from({ length: 6 }, (_, itemNumber) => itemNumber + 1).map(
        (itemNumber) => (
          <Card className="p-4" key={itemNumber}>
            <Stack gap="sm">
              <div className="h-24 rounded-md bg-muted" />
              <Text className="font-medium">Card Title {itemNumber}</Text>
              <Text size="sm" variant="muted">
                Description for card {itemNumber}.
              </Text>
            </Stack>
          </Card>
        ),
      )}
    </SimpleGrid>
  ),
};
