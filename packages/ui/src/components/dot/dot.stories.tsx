import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { DOT_VARIANTS, type DotVariant } from "../../lib/variant";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Text } from "../text";
import { Dot } from "./dot-root";

const meta = {
  title: "Dot",
  component: Dot,
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: DOT_VARIANTS,
      description: "Semantic color variant",
    },
    size: {
      ...sizeArgType,
      description: "Dot size using shared ComponentSize scale",
    },
    color: {
      control: "color",
      description: "Custom color override (overrides variant)",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    variant: "default",
    size: "base",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "circle",
    },
    docs: {
      description: {
        component:
          "A simple dot indicator for status, presence, or visual markers. Supports semantic design token variants with optional custom color override.",
      },
    },
  },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

/**
 * Variant × Size matrix showing all combinations.
 */
export const VariantSizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing all variant and size combinations.",
      },
    },
  },
  render: () => {
    const VARIANT_ROWS: { key: DotVariant; label: string }[] = DOT_VARIANTS.map(
      (v) => ({ key: v, label: v }),
    );
    const SIZE_COLUMNS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    return (
      <VariantGrid<DotVariant, ComponentSize>
        columns={SIZE_COLUMNS}
        renderCell={(variant, size) => <Dot size={size} variant={variant} />}
        rowLabels="Variant"
        rows={VARIANT_ROWS}
      />
    );
  },
};

export const CustomColors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The color prop allows custom color overrides when the semantic variants don't fit your needs.",
      },
    },
  },
  render: () => (
    <Flex align="center" gap="base">
      <Dot color="hsl(0, 80%, 50%)" />
      <Dot color="hsl(30, 80%, 50%)" />
      <Dot color="hsl(60, 80%, 50%)" />
      <Dot color="hsl(120, 80%, 50%)" />
      <Dot color="hsl(200, 80%, 50%)" />
      <Dot color="hsl(280, 80%, 50%)" />
      <Dot color="#ff6b6b" />
      <Dot color="rgb(147, 51, 234)" />
    </Flex>
  ),
};

export const StatusIndicators: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common use case: status indicators with labels.",
      },
    },
  },
  render: () => (
    <Flex direction="column" gap="sm">
      <Flex align="center" gap="xs">
        <Dot size="sm" variant="affirmative" />
        <Text size="sm">Online</Text>
      </Flex>
      <Flex align="center" gap="xs">
        <Dot size="sm" variant="warning" />
        <Text size="sm">Away</Text>
      </Flex>
      <Flex align="center" gap="xs">
        <Dot size="sm" variant="destructive" />
        <Text size="sm">Busy</Text>
      </Flex>
      <Flex align="center" gap="xs">
        <Dot size="sm" variant="default" />
        <Text size="sm">Offline</Text>
      </Flex>
    </Flex>
  ),
};

export const WithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Dots can be paired with text for labeled indicators.",
      },
    },
  },
  render: () => (
    <Flex align="center" gap="xs">
      <Dot size="sm" variant="affirmative" />
      <Text size="sm">Available</Text>
    </Flex>
  ),
};
