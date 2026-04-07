import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import "@patternmode/tailwind-config/shared-styles.css";
import { GAP_SIZES, type GapSize } from "../../lib/responsive-classes";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Card } from "../card";
import { Grid, GridCol } from "../grid";

const GAP_OPTIONS: GapSize[] = [...GAP_SIZES];
const JUSTIFY_OPTIONS = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
] as const;
const ALIGN_OPTIONS = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
] as const;

type GridStoryArgs = React.ComponentProps<typeof Grid>;

const meta: Meta<GridStoryArgs> = {
  title: "Layout/Grid",
  component: Grid,
  argTypes: {
    // Visual
    columns: {
      control: { type: "number", min: 1, max: 24, step: 1 },
      description: "Number of columns in the grid",
    },
    gap: {
      control: "select",
      options: GAP_OPTIONS,
      description: "Gap between grid cells",
    },
    grow: {
      control: "boolean",
      description: "Allow columns to grow to fill space",
    },
    justify: {
      control: "select",
      options: JUSTIFY_OPTIONS,
      description: "Main-axis distribution",
    },
    align: {
      control: "select",
      options: ALIGN_OPTIONS,
      description: "Cross-axis alignment",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    columns: 12,
    gap: "base",
    grow: false,
    justify: "flex-start",
    align: "stretch",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "grid-3x3",
    },
    docs: {
      description: {
        component:
          "A flexible grid system based on a 12-column layout by default. Supports column spanning, offsets, ordering, and responsive behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children: React.ReactNode }) {
  return <Card className="p-4 text-center">{children}</Card>;
}

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <Grid {...args}>
      <GridCol span={4}>
        <Box>1</Box>
      </GridCol>
      <GridCol span={4}>
        <Box>2</Box>
      </GridCol>
      <GridCol span={4}>
        <Box>3</Box>
      </GridCol>
      <GridCol span={4}>
        <Box>4</Box>
      </GridCol>
    </Grid>
  ),
};

/**
 * Column span configurations.
 */
type SpanConfig = "equal" | "mixed" | "full";
export const ColumnSpanMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Different column span configurations in a 12-column grid.",
      },
    },
  },
  render: () => {
    const SPAN_ROWS: { key: SpanConfig; label: string }[] = [
      { key: "equal", label: "Equal (4+4+4)" },
      { key: "mixed", label: "Mixed (8+4)" },
      { key: "full", label: "Full (12)" },
    ];
    const GAP_COLUMNS: { key: GapSize; label: string }[] = [
      { key: "xs", label: "xs" },
      { key: "base", label: "base" },
      { key: "xl", label: "xl" },
    ];

    return (
      <VariantGrid<SpanConfig, GapSize>
        columns={GAP_COLUMNS}
        renderCell={(config, gap) => (
          <Grid gap={gap}>
            {config === "equal" && (
              <>
                <GridCol span={4}>
                  <Box>4</Box>
                </GridCol>
                <GridCol span={4}>
                  <Box>4</Box>
                </GridCol>
                <GridCol span={4}>
                  <Box>4</Box>
                </GridCol>
              </>
            )}
            {config === "mixed" && (
              <>
                <GridCol span={8}>
                  <Box>8</Box>
                </GridCol>
                <GridCol span={4}>
                  <Box>4</Box>
                </GridCol>
              </>
            )}
            {config === "full" && (
              <GridCol span={12}>
                <Box>12</Box>
              </GridCol>
            )}
          </Grid>
        )}
        rowLabels="Span"
        rows={SPAN_ROWS}
      />
    );
  },
};

/**
 * Grid with grow enabled.
 */
export const WithGrow: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "When grow is enabled, columns without explicit spans distribute space equally.",
      },
    },
  },
  render: () => (
    <Grid grow>
      <GridCol>
        <Box>1</Box>
      </GridCol>
      <GridCol>
        <Box>2</Box>
      </GridCol>
      <GridCol>
        <Box>3</Box>
      </GridCol>
      <GridCol>
        <Box>4</Box>
      </GridCol>
      <GridCol>
        <Box>5</Box>
      </GridCol>
    </Grid>
  ),
};
