import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { COMPONENT_SIZES } from "../../lib/size";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Card } from "../card";
import { Flex } from "./flex-root";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexJustify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type FlexAlign = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

const DIRECTION_OPTIONS: FlexDirection[] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
];
const JUSTIFY_OPTIONS: FlexJustify[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];
const ALIGN_OPTIONS: FlexAlign[] = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];
const WRAP_OPTIONS: FlexWrap[] = ["nowrap", "wrap", "wrap-reverse"];

type FlexStoryArgs = React.ComponentProps<typeof Flex>;

const meta: Meta<FlexStoryArgs> = {
  title: "Layout/Flex",
  component: Flex,
  argTypes: {
    // Visual
    direction: {
      control: "select",
      options: DIRECTION_OPTIONS,
      description: "Flex direction",
    },
    wrap: {
      control: "select",
      options: WRAP_OPTIONS,
      description: "Wrap behavior",
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
    gap: {
      control: "select",
      options: COMPONENT_SIZES,
      description: "Gap between children",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    direction: "row",
    wrap: "wrap",
    justify: "flex-start",
    align: "center",
    gap: "base",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "move",
    },
    docs: {
      description: {
        component:
          "Flexbox container with semantic props for direction, wrapping, justification, alignment, and gap.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children: React.ReactNode }) {
  return <Card className="p-3 text-center">{children}</Card>;
}

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <Flex {...args}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Box key={i}>{i}</Box>
      ))}
    </Flex>
  ),
};

/**
 * Justify × Align matrix showing layout combinations.
 */
export const JustifyAlignMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing justify and align combinations.",
      },
    },
  },
  render: () => {
    const JUSTIFY_ROWS: { key: FlexJustify; label: string }[] = [
      "flex-start",
      "center",
      "space-between",
    ].map((j) => ({ key: j as FlexJustify, label: j.replace("flex-", "") }));
    const ALIGN_COLUMNS: { key: FlexAlign; label: string }[] = [
      "flex-start",
      "center",
      "stretch",
    ].map((a) => ({ key: a as FlexAlign, label: a.replace("flex-", "") }));

    return (
      <VariantGrid<FlexJustify, FlexAlign>
        columns={ALIGN_COLUMNS}
        renderCell={(justify, align) => (
          <Flex
            align={align}
            className="min-h-[80px] w-full rounded border bg-secondary/30"
            gap="xs"
            justify={justify}
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        )}
        rowLabels="Justify"
        rows={JUSTIFY_ROWS}
      />
    );
  },
};
