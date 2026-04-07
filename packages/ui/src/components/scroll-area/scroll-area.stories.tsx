import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Flex } from "../flex";
import { Stack } from "../stack";
import { Text } from "../text";
import { ScrollArea } from "./scroll-area-root";

type ScrollAreaStoryArgs = React.ComponentProps<typeof ScrollArea> & {
  itemCount?: number;
  scrollDirection?: "vertical" | "horizontal" | "both";
};

const meta: Meta<ScrollAreaStoryArgs> = {
  title: "ScrollArea",
  component: ScrollArea,
  argTypes: {
    // Content
    itemCount: {
      control: { type: "number", min: 5, max: 50 },
      description: "Number of items to display",
    },
    scrollDirection: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
      description: "Direction of scrolling",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    itemCount: 20,
    scrollDirection: "vertical",
  },
  parameters: {
    builder: {
      category: "layout",
      icon: "scroll",
    },
    docs: {
      description: {
        component:
          "Custom-styled scrollbars that match your design system. Supports vertical, horizontal, and bidirectional scrolling.",
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
    const items = Array.from({ length: args.itemCount || 20 }, (_, i) => i + 1);

    if (args.scrollDirection === "horizontal") {
      return (
        <div className="h-40 w-80 rounded-md border p-4">
          <ScrollArea className="h-full w-full">
            <Flex gap="xs">
              {items.map((n) => (
                <Stack
                  className="flex-shrink-0 rounded-sm bg-secondary p-3"
                  key={n}
                >
                  <Text size="sm">Column {n}</Text>
                </Stack>
              ))}
            </Flex>
          </ScrollArea>
        </div>
      );
    }

    if (args.scrollDirection === "both") {
      return (
        <div className="h-60 w-80 rounded-md border p-4">
          <ScrollArea className="h-full w-full">
            <Stack gap="xs">
              {items.map((row) => (
                <Flex gap="xs" key={row}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => (
                    <Stack
                      className="flex-shrink-0 rounded-sm bg-secondary p-3"
                      key={col}
                    >
                      <Text size="sm">
                        {row},{col}
                      </Text>
                    </Stack>
                  ))}
                </Flex>
              ))}
            </Stack>
          </ScrollArea>
        </div>
      );
    }

    // Default: vertical
    return (
      <div className="h-60 w-80 rounded-md border p-4">
        <ScrollArea className="h-full w-full">
          <Stack gap="xs">
            {items.map((n) => (
              <Stack className="rounded-sm bg-secondary p-3" key={n}>
                <Text size="sm">Item {n} - Scrollable content</Text>
              </Stack>
            ))}
          </Stack>
        </ScrollArea>
      </div>
    );
  },
};

/**
 * Scroll area with padding.
 */
export const WithPadding: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "ScrollArea maintains padding around content while scrolling.",
      },
    },
  },
  render: () => (
    <div className="h-60 w-80 rounded-md border">
      <ScrollArea className="h-full w-full p-4">
        <Stack gap="xs">
          {Array.from({ length: 25 }, (_, i) => i + 1).map((n) => (
            <Stack className="rounded-sm bg-secondary p-3" key={n}>
              <Text size="sm">Padded item {n}</Text>
            </Stack>
          ))}
        </Stack>
      </ScrollArea>
    </div>
  ),
};
