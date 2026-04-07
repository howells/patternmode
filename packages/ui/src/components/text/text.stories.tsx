import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Stack } from "../stack";
import { Text } from "./text-root";

type TextVariant = "default" | "muted" | "accent";
const TEXT_VARIANTS: TextVariant[] = ["default", "muted", "accent"];

const meta = {
  title: "Text",
  component: Text,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Text size using shared ComponentSize scale",
    },
    variant: {
      control: "select",
      options: TEXT_VARIANTS,
      description: "Text color variant",
    },

    // Content
    children: {
      control: "text",
      description: "Text content",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    size: "sm",
    variant: "default",
    children: "High-quality patternmodels sourced from sustainable suppliers.",
  },
  parameters: {
    builder: {
      category: "typography",
      icon: "type",
    },
    docs: {
      description: {
        component:
          "A text component for body copy. Renders a paragraph with optimal line length and consistent text sizing.",
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => <Text {...args} />,
};

/**
 * Size × Variant matrix showing all combinations.
 */
export const SizeVariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing text sizes across all variants.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));
    const VARIANT_COLUMNS: { key: TextVariant; label: string }[] =
      TEXT_VARIANTS.map((v) => ({ key: v, label: v }));

    return (
      <VariantGrid<ComponentSize, TextVariant>
        columns={VARIANT_COLUMNS}
        renderCell={(size, variant) => (
          <Text size={size} variant={variant}>
            Sample text
          </Text>
        )}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

export const LongForm: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Multiple paragraphs demonstrating the automatic line-length constraint.",
      },
    },
  },
  render: () => (
    <Stack className="w-96" gap="base">
      <Text>
        PatternMode is an open-source collection of UI components and design
        patterns built with React, TypeScript, Tailwind CSS, and Motion.
      </Text>
      <Text>
        Each component is carefully crafted to provide a delightful user
        experience while maintaining accessibility and performance standards.
      </Text>
      <Text>
        The text component automatically constrains line length to improve
        readability, following established typography best practices.
      </Text>
    </Stack>
  ),
};

export const CustomClassName: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Text can be customized with additional className props.",
      },
    },
  },
  render: () => (
    <Text className="text-muted-foreground italic">
      Styled text with custom classes
    </Text>
  ),
};
