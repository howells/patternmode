import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Stack } from "../stack";
import { Text } from "../text";
import { Spinner, type SpinnerProps } from "./spinner-root";

const meta: Meta<SpinnerProps> = {
  title: "Spinner",
  component: Spinner,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Spinner size using shared ComponentSize scale",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    size: "base",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "loader-circle",
    },
    docs: {
      description: {
        component:
          "Loading spinner component. Animated circular indicator for async operations. Supports the full component size scale.",
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
 * Size matrix showing all spinner sizes.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Complete size scale from 2xs to 3xl.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    type ColorVariant = "default" | "muted" | "primary";
    const COLOR_COLS: { key: ColorVariant; label: string }[] = [
      { key: "default", label: "Default" },
      { key: "muted", label: "Muted" },
      { key: "primary", label: "Primary" },
    ];

    const colorClasses: Record<ColorVariant, string> = {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
    };

    return (
      <VariantGrid<ComponentSize, ColorVariant>
        columns={COLOR_COLS}
        renderCell={(size, color) => (
          <Spinner className={colorClasses[color]} size={size} />
        )}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * In context examples.
 */
export const InContext: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Spinners used in context with labels and descriptions.",
      },
    },
  },
  render: () => (
    <Stack gap="lg">
      <Flex align="center" gap="sm">
        <Spinner size="sm" />
        <Text color="muted" size="sm">
          Loading…
        </Text>
      </Flex>
      <Flex align="center" gap="sm">
        <Spinner size="base" />
        <Text size="sm">Processing your request</Text>
      </Flex>
      <Flex align="center" gap="sm">
        <Spinner size="lg" />
        <Stack gap="xs">
          <Text className="font-medium">Uploading files</Text>
          <Text color="muted" size="xs">
            This may take a few moments
          </Text>
        </Stack>
      </Flex>
    </Stack>
  ),
};
