import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Flex } from "../flex";
import { Stack } from "../stack";
import { Skeleton } from "./skeleton-root";

type SkeletonStoryArgs = React.ComponentProps<typeof Skeleton> & {
  width?: string;
  height?: string;
  shape?: "rectangle" | "circle" | "rounded";
};

const meta: Meta<SkeletonStoryArgs> = {
  title: "Skeleton",
  component: Skeleton,
  argTypes: {
    // Visual
    width: {
      control: "text",
      description: "Width (e.g., 'w-40', 'w-full')",
    },
    height: {
      control: "text",
      description: "Height (e.g., 'h-4', 'h-12')",
    },
    shape: {
      control: "select",
      options: ["rectangle", "circle", "rounded"],
      description: "Shape of the skeleton",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    width: "w-40",
    height: "h-6",
    shape: "rectangle",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "rectangle-horizontal",
    },
    docs: {
      description: {
        component:
          "Placeholder preview while content is loading. Maintains layout stability during async operations.",
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
    const shapeMap = { circle: "rounded-full", rounded: "rounded-md" } as const;
    const shapeClass = shapeMap[args.shape as keyof typeof shapeMap] ?? "";
    return (
      <Skeleton className={`${args.height} ${args.width} ${shapeClass}`} />
    );
  },
};

/**
 * Common skeleton layout patterns.
 */
export const Layouts: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Common skeleton layouts for cards, lists, and profiles. Match skeleton shapes to your actual content layout.",
      },
    },
  },
  render: () => (
    <Flex gap="3xl" wrap="wrap">
      {/* Card layout */}
      <Stack className="w-72 rounded-xl border p-4" gap="sm">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Stack gap="sm">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </Stack>
      </Stack>

      {/* List layout */}
      <Stack className="w-80" gap="sm">
        {Array.from({ length: 3 }, (_, itemNumber) => itemNumber + 1).map(
          (itemNumber) => (
            <Flex align="center" gap="base" key={itemNumber}>
              <Skeleton className="h-10 w-10 rounded-full" />
              <Stack className="flex-1" gap="sm">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </Stack>
            </Flex>
          ),
        )}
      </Stack>

      {/* Profile layout */}
      <Stack className="w-72" gap="base">
        <Flex align="flex-start" gap="base">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Stack className="flex-1" gap="sm">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </Stack>
        </Flex>
        <Stack gap="sm">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </Stack>
      </Stack>
    </Flex>
  ),
};
