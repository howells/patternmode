import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Stack } from "../stack";
import { Text } from "../text";
import { Heading } from "./heading-root";

type HeadingLevel = "1" | "2" | "3" | "4" | "5" | "6";
const HEADING_LEVELS: HeadingLevel[] = ["1", "2", "3", "4", "5", "6"];
const HEADING_SIZES: ComponentSize[] = ["sm", "base", "lg", "xl", "2xl", "3xl"];

type HeadingStoryArgs = React.ComponentProps<typeof Heading>;

const meta: Meta<HeadingStoryArgs> = {
  title: "Heading",
  component: Heading,
  argTypes: {
    // Visual
    level: {
      control: "select",
      options: HEADING_LEVELS,
      labels: {
        "1": "h1",
        "2": "h2",
        "3": "h3",
        "4": "h4",
        "5": "h5",
        "6": "h6",
      },
      description: "The semantic HTML heading level (h1-h6)",
    },
    size: {
      ...sizeArgType,
      description: "Visual size (defaults to match semantic level)",
    },

    // Content
    children: {
      control: "text",
      description: "Heading text content",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    level: "1",
    size: "3xl",
    children: "Welcome to PatternMode",
  },
  parameters: {
    builder: {
      category: "typography",
      icon: "heading",
    },
    docs: {
      description: {
        component:
          "Heading component supporting h1-h6 with customizable visual sizes. Visual size defaults to semantic level but can be overridden.",
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
    <Heading level={args.level} size={args.size}>
      {args.children}
    </Heading>
  ),
};

/**
 * Level × Size matrix showing all heading combinations.
 */
export const LevelSizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing heading levels across visual sizes.",
      },
    },
  },
  render: () => {
    const LEVEL_ROWS: { key: HeadingLevel; label: string }[] =
      HEADING_LEVELS.map((l) => ({ key: l, label: `h${l}` }));
    const SIZE_COLUMNS: { key: ComponentSize; label: string }[] =
      HEADING_SIZES.map((s) => ({ key: s, label: s }));

    return (
      <VariantGrid<HeadingLevel, ComponentSize>
        columns={SIZE_COLUMNS}
        renderCell={(level, size) => (
          <Heading level={level} size={size}>
            Heading
          </Heading>
        )}
        rowLabels="Level"
        rows={LEVEL_ROWS}
      />
    );
  },
};

/**
 * All heading levels with recommended sizes.
 */
export const Levels: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All heading levels (h1-h6) with suggested sizes from the typography scale.",
      },
    },
  },
  render: () => (
    <Stack gap="xl">
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          h1 - size 3xl
        </Text>
        <Heading level="1" size="3xl">
          The quick brown fox
        </Heading>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          h2 - size 2xl
        </Text>
        <Heading level="2" size="2xl">
          The quick brown fox
        </Heading>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          h3 - size xl
        </Text>
        <Heading level="3" size="xl">
          The quick brown fox
        </Heading>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          h4 - size lg
        </Text>
        <Heading level="4" size="lg">
          The quick brown fox
        </Heading>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          h5 - size base
        </Text>
        <Heading level="5" size="base">
          The quick brown fox
        </Heading>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          h6 - size sm
        </Text>
        <Heading level="6" size="sm">
          The quick brown fox
        </Heading>
      </Stack>
    </Stack>
  ),
};
