import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { sizeArgType } from "../../lib/storybook";
import { Card } from "../card";
import { Heading } from "../heading";
import { Stack } from "../stack";
import { Text } from "../text";
import { Container } from "./container-root";

type ContainerStoryArgs = React.ComponentProps<typeof Container>;

const meta: Meta<ContainerStoryArgs> = {
  title: "Layout/Container",
  component: Container,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Maximum width of the container",
    },
    fluid: {
      control: "boolean",
      description: "Expand to fill available width (ignores size)",
    },
    px: {
      ...sizeArgType,
      description: "Horizontal padding",
    },
    py: {
      ...sizeArgType,
      description: "Vertical padding",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    size: "xl",
    fluid: false,
    px: "base",
    py: "sm",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "box",
    },
    docs: {
      description: {
        component:
          "Container component centers content with a maximum width and consistent padding.",
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
  decorators: [
    (Story) => (
      <div className="bg-muted p-8">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Container {...args}>
      <Stack gap="base">
        <Card className="shadow-xs">
          <Heading level="3" size="lg">
            Container Component
          </Heading>
          <Text className="mt-2" variant="muted">
            The Container component centers content with a maximum width and
            optional padding.
          </Text>
        </Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <Text className="font-medium">Max Width</Text>
            <Text className="mt-1 text-xs" variant="muted">
              Current: {args.fluid ? "100% (fluid)" : String(args.size)}
            </Text>
          </Card>
          <Card>
            <Text className="font-medium">Padding</Text>
            <Text className="mt-1 text-xs" variant="muted">
              X: {String(args.px)}, Y: {String(args.py)}
            </Text>
          </Card>
        </div>
        <Card border="none" className="bg-muted/50" variant="muted">
          <Text className="text-center text-xs" variant="muted">
            Resize the viewport to see how the container adapts
          </Text>
        </Card>
      </Stack>
    </Container>
  ),
};
