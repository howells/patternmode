import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Button } from "../button";
import { Heading } from "../heading";
import { Text } from "../text";
import { Center } from "./center-root";

type CenterStoryArgs = React.ComponentProps<typeof Center>;

const meta: Meta<CenterStoryArgs> = {
  title: "Layout/Center",
  component: Center,
  argTypes: {
    // Visual
    inline: {
      control: "boolean",
      description: "Use inline-flex instead of flex",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    inline: false,
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "box",
    },
    docs: {
      description: {
        component:
          "Center is a layout component that centers its children both horizontally and vertically.",
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
      <div className="h-[300px] border border-border border-dashed">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Center {...args} className="h-full gap-4">
      <Button>First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="outline">Third</Button>
    </Center>
  ),
};

/**
 * Inline centering within text flow.
 */
export const Inline: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Center can be used inline within text content using the inline prop and asChild.",
      },
    },
  },
  render: () => (
    <Text>
      This is a paragraph with{" "}
      <Center asChild className="gap-2" inline>
        <span>
          <span className="font-bold">inline</span>
          <span>centered</span>
          <span className="italic">content</span>
        </span>
      </Center>{" "}
      in the middle.
    </Text>
  ),
};

/**
 * Using asChild to render as a different element.
 */
export const AsSection: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Using asChild to render Center as a semantic section element.",
      },
    },
  },
  render: () => (
    <div className="h-[300px] border border-border border-dashed">
      <Center asChild className="h-full">
        <section>
          <Heading className="mb-4" level="2">
            Centered Section
          </Heading>
          <Text variant="muted">This entire section is centered</Text>
        </section>
      </Center>
    </div>
  ),
};
