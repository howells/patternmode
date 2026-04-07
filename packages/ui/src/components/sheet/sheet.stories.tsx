import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Button } from "../button";
import { Flex } from "../flex";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { Stack } from "../stack";
import { Text } from "../text";

type SheetSide = "right" | "left" | "top" | "bottom";
const SIDE_OPTIONS: SheetSide[] = ["right", "left", "top", "bottom"];

type SheetStoryArgs = React.ComponentProps<typeof Sheet> & {
  side?: SheetSide;
  triggerText?: string;
  title?: string;
  description?: string;
  content?: string;
};

const meta: Meta<SheetStoryArgs> = {
  title: "Sheet",
  component: Sheet,
  argTypes: {
    // Visual
    side: {
      control: "select",
      options: SIDE_OPTIONS,
      description: "Side from which the sheet slides in",
    },

    // Content
    triggerText: {
      control: "text",
      description: "Text for the trigger button",
    },
    title: {
      control: "text",
      description: "Sheet title",
    },
    description: {
      control: "text",
      description: "Sheet description",
    },
    content: {
      control: "text",
      description: "Body content text",
    },
  },
  args: {
    side: "right",
    triggerText: "Open Sheet",
    title: "Sheet Title",
    description: "This is a description of what the sheet contains.",
    content: "Your content goes here.",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "panel-right",
    },
    docs: {
      description: {
        component:
          "Sheet is a sliding panel that appears from the edge of the screen. It provides a focused overlay for forms, settings, or additional content without leaving the current page.",
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
    <Sheet>
      <SheetTrigger asChild>
        <Button>{args.triggerText}</Button>
      </SheetTrigger>
      <SheetContent side={args.side}>
        <SheetHeader>
          <SheetTitle>{args.title}</SheetTitle>
          <SheetDescription>{args.description}</SheetDescription>
        </SheetHeader>
        <Text className="mt-4">{args.content}</Text>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheets can slide in from any side.
 */
export const Sides: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Sheets can slide in from any side: right (default), left, top, or bottom.",
      },
    },
  },
  render: () => (
    <Flex gap="xs" wrap="wrap">
      <Sheet>
        <SheetTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Right (Default)
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Side</SheetTitle>
            <SheetDescription>Slides in from the right edge.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Left
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Side</SheetTitle>
            <SheetDescription>Slides in from the left edge.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Top
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Side</SheetTitle>
            <SheetDescription>Slides in from the top edge.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button appearance="outline" variant="secondary">
            Bottom
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Side</SheetTitle>
            <SheetDescription>Slides in from the bottom edge.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Flex>
  ),
};

/**
 * Common use case: a sheet containing a form for user input.
 */
export const WithForm: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common use case: a sheet containing a form for user input.",
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when done.
          </SheetDescription>
        </SheetHeader>
        <Stack className="mt-4" gap="lg">
          <Stack gap="xs">
            <Text asChild className="font-medium" size="sm">
              <label htmlFor="name">Name</label>
            </Text>
            <input
              className="w-full rounded-md border px-3 py-2"
              id="name"
              placeholder="Your name"
              type="text"
            />
          </Stack>
          <Stack gap="xs">
            <Text asChild className="font-medium" size="sm">
              <label htmlFor="email">Email</label>
            </Text>
            <input
              className="w-full rounded-md border px-3 py-2"
              id="email"
              placeholder="your@email.com"
              type="email"
            />
          </Stack>
          <Button className="w-full">Save Changes</Button>
        </Stack>
      </SheetContent>
    </Sheet>
  ),
};
