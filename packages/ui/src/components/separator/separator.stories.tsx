import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Card } from "../card";
import { Flex } from "../flex";
import { Stack } from "../stack";
import { Text } from "../text";
import { Separator } from "./separator-root";

type SeparatorOrientation = "horizontal" | "vertical";
const ORIENTATION_OPTIONS: SeparatorOrientation[] = ["horizontal", "vertical"];

const meta = {
  title: "Separator",
  component: Separator,
  argTypes: {
    // Visual
    orientation: {
      control: "radio",
      options: ORIENTATION_OPTIONS,
      description: "The orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is purely decorative (default: true)",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "minus",
    },
    docs: {
      description: {
        component:
          "Separator visually divides content sections. It can be horizontal or vertical and supports ARIA attributes for accessibility.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => {
    const typedArgs = args as Record<string, unknown>;
    const orientation =
      (typedArgs.orientation as SeparatorOrientation) || "horizontal";
    const decorative = typedArgs.decorative as boolean;

    if (orientation === "vertical") {
      return (
        <Flex align="center" className="h-24" gap="base">
          <Text>Left</Text>
          <Separator decorative={decorative} orientation="vertical" />
          <Text>Right</Text>
        </Flex>
      );
    }

    return (
      <Stack className="w-80">
        <Text className="py-2">Above</Text>
        <Separator decorative={decorative} orientation="horizontal" />
        <Text className="py-2">Below</Text>
      </Stack>
    );
  },
};

/**
 * Orientation matrix showing both orientations.
 */
export const OrientationMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Separators can be horizontal or vertical.",
      },
    },
  },
  render: () => (
    <Flex gap="xl">
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          Horizontal
        </Text>
        <Stack className="w-40">
          <Text size="sm">Above</Text>
          <Separator orientation="horizontal" />
          <Text size="sm">Below</Text>
        </Stack>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" variant="muted">
          Vertical
        </Text>
        <Flex align="center" className="h-16" gap="base">
          <Text size="sm">Left</Text>
          <Separator orientation="vertical" />
          <Text size="sm">Right</Text>
        </Flex>
      </Stack>
    </Flex>
  ),
};

/**
 * In context: card with separator.
 */
export const InCard: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common usage of separators within card layouts.",
      },
    },
  },
  render: () => (
    <Card className="w-80 p-4">
      <Text className="font-medium">Card Title</Text>
      <Text className="mt-1" size="sm" variant="muted">
        Card description
      </Text>
      <Separator className="my-4" />
      <Stack gap="xs">
        <Text size="sm">Item 1</Text>
        <Text size="sm">Item 2</Text>
        <Text size="sm">Item 3</Text>
      </Stack>
    </Card>
  ),
};
