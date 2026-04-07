import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { ChevronsUpDown } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "../button";
import { Card } from "../card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Stack } from "../stack";
import { Text } from "../text";

type CollapsibleStoryArgs = React.ComponentProps<typeof Collapsible> & {
  title?: string;
  visibleItem?: string;
  hiddenItem1?: string;
  hiddenItem2?: string;
};

const meta: Meta<CollapsibleStoryArgs> = {
  title: "Collapsible",
  component: Collapsible,
  argTypes: {
    // Content
    title: {
      control: "text",
      description: "Header title text",
    },
    visibleItem: {
      control: "text",
      description: "Always visible item text",
    },
    hiddenItem1: {
      control: "text",
      description: "First hidden item text",
    },
    hiddenItem2: {
      control: "text",
      description: "Second hidden item text",
    },

    // State
    defaultOpen: {
      control: "boolean",
      description: "Whether open by default (uncontrolled)",
    },

    // Advanced (hidden)
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  args: {
    title: "Recent Projects",
    visibleItem: "Brand Guidelines 2024",
    hiddenItem1: "Product Photography",
    hiddenItem2: "Marketing Campaign",
    defaultOpen: false,
  },
  parameters: {
    builder: {
      category: "container",
      icon: "chevrons-up-down",
    },
    docs: {
      description: {
        component:
          "An interactive component which expands and collapses content. Built on Radix UI primitives.",
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
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Stack gap="sm">
      <Collapsible defaultOpen={args.defaultOpen}>
        <Flex
          align="center"
          className="px-4"
          gap="base"
          justify="space-between"
        >
          <Heading level="4" size="sm">
            {args.title}
          </Heading>
          <CollapsibleTrigger asChild>
            <Button
              appearance="ghost"
              aria-label="Toggle"
              icon={ChevronsUpDown}
              size="sm"
            />
          </CollapsibleTrigger>
        </Flex>
        <Text className="rounded-md border px-4 py-2 font-mono">
          {args.visibleItem}
        </Text>
        <CollapsibleContent>
          <Stack gap="sm">
            <Text className="rounded-md border px-4 py-2 font-mono">
              {args.hiddenItem1}
            </Text>
            <Text className="rounded-md border px-4 py-2 font-mono">
              {args.hiddenItem2}
            </Text>
          </Stack>
        </CollapsibleContent>
      </Collapsible>
    </Stack>
  ),
};

/**
 * Inline text expansion with show more/less.
 */
export const InlineExpansion: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use collapsible inline with text for expandable content with a show more/less toggle.",
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Card className="w-[500px] p-4">
        <div className="text-sm">
          PatternMode is an open-source collection of UI components and design
          patterns built with React, TypeScript, Tailwind CSS, and Motion.
          <Collapsible onOpenChange={setIsOpen} open={isOpen}>
            <CollapsibleContent>
              {" "}
              Pairs beautifully with modern design systems. Save time and build
              your next project faster with pre-built, accessible components.
            </CollapsibleContent>
            <div className="text-end">
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="link">
                  {isOpen ? "Show less" : "Show more"}
                </Button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>
        </div>
      </Card>
    );
  },
};
