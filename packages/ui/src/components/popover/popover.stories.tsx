import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Button } from "../button";
import { Text } from "../text";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./popover-root";

type PopoverSide = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";
const SIDE_OPTIONS: PopoverSide[] = ["top", "right", "bottom", "left"];
const ALIGN_OPTIONS: PopoverAlign[] = ["start", "center", "end"];

type PopoverStoryArgs = React.ComponentProps<typeof PopoverContent> & {
  buttonText?: string;
  contentText?: string;
};

const meta: Meta<PopoverStoryArgs> = {
  title: "Popover",
  component: PopoverContent,
  argTypes: {
    // Visual
    side: {
      control: "select",
      options: SIDE_OPTIONS,
      description: "Side relative to trigger",
    },
    align: {
      control: "select",
      options: ALIGN_OPTIONS,
      description: "Alignment relative to trigger",
    },
    sideOffset: {
      control: { type: "number", min: 0, max: 20 },
      description: "Distance from trigger in pixels",
    },

    // Content
    buttonText: {
      control: "text",
      description: "Trigger button text",
    },
    contentText: {
      control: "text",
      description: "Popover content text",
    },
  },
  args: {
    side: "bottom",
    align: "center",
    sideOffset: 10,
    buttonText: "Open popover",
    contentText: "Popover content goes here.",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "message-square",
    },
    docs: {
      description: {
        component:
          "Rich content in a floating panel anchored to a trigger. Dismisses on outside click or Escape.",
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
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button appearance="outline" variant="secondary">
          {args.buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={args.align}
        side={args.side}
        sideOffset={args.sideOffset}
      >
        <PopoverArrow />
        <Text size="sm">{args.contentText}</Text>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popovers can appear on any side.
 */
export const Sides: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Popovers can be positioned on any side of the trigger element.",
      },
    },
  },
  render: () => (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Top
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <PopoverArrow />
          <Text size="sm">Top</Text>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Bottom
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <PopoverArrow />
          <Text size="sm">Bottom</Text>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Left
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <PopoverArrow />
          <Text size="sm">Left</Text>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Right
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <PopoverArrow />
          <Text size="sm">Right</Text>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
