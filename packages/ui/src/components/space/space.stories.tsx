import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { Flex } from "../flex";
import { Stack } from "../stack";
import { Text } from "../text";
import { Space } from "./space-root";

type SpaceStoryArgs = React.ComponentProps<typeof Space>;

const meta: Meta<SpaceStoryArgs> = {
  title: "Layout/Space",
  component: Space,
  argTypes: {
    // Dimensions
    w: {
      control: "select",
      options: [undefined, "2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      description: "Width using ComponentSize token",
    },
    h: {
      control: "select",
      options: [undefined, "2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      description: "Height using ComponentSize token",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    w: undefined,
    h: "base",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "space",
    },
    docs: {
      description: {
        component:
          "Creates whitespace between elements. Use for vertical (height) or horizontal (width) spacing.",
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
  render: (args) => {
    const isHorizontal = args.w !== undefined;

    if (isHorizontal) {
      return (
        <Flex align="center" gap="3xs">
          <Text className="rounded-md border bg-secondary p-3" size="sm">
            Left
          </Text>
          <Space {...args} />
          <Text className="rounded-md border bg-secondary p-3" size="sm">
            Right
          </Text>
        </Flex>
      );
    }

    return (
      <Stack gap="3xs">
        <Text className="rounded-md border bg-secondary p-3" size="sm">
          Above
        </Text>
        <Space {...args} />
        <Text className="rounded-md border bg-secondary p-3" size="sm">
          Below
        </Text>
      </Stack>
    );
  },
};

/**
 * All available spacing sizes.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Visual reference of all available spacing sizes (vertical).",
      },
    },
  },
  render: () => {
    const sizes: ComponentSize[] = [
      "2xs",
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
    ];

    return (
      <Stack gap="2xl">
        {sizes.map((size) => (
          <Stack gap="sm" key={size}>
            <Text className="font-medium" size="sm">
              {size}
            </Text>
            <Stack gap="3xs">
              <Text className="rounded-md border bg-secondary p-3" size="sm">
                Above
              </Text>
              <Space h={size} />
              <Text className="rounded-md border bg-secondary p-3" size="sm">
                Below
              </Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    );
  },
};
