import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { User } from "lucide-react";
import type React from "react";
import { Button } from "../button";
import { Card } from "../card";
import { Group } from "../group";
import { Icon } from "../icon";
import { Stack } from "../stack";
import { Text } from "../text";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card-root";

type HoverCardStoryArgs = React.ComponentProps<typeof HoverCard> & {
  triggerText?: string;
  title?: string;
  description?: string;
};

const meta: Meta<HoverCardStoryArgs> = {
  title: "HoverCard",
  component: HoverCard,
  argTypes: {
    // Content
    triggerText: {
      control: "text",
      description: "Text for the trigger element",
    },
    title: {
      control: "text",
      description: "Title in the hover card",
    },
    description: {
      control: "text",
      description: "Description text",
    },
  },
  args: {
    triggerText: "Hover me",
    title: "Hover title",
    description: "Details shown on hover.",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "square-mouse-pointer",
    },
    docs: {
      description: {
        component:
          "HoverCard displays rich information in a popup when hovering over a trigger element. Built on Radix UI Hover Card primitive.",
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
    <Group
      align="center"
      className="min-h-[200px]"
      gap="base"
      position="center"
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button size="sm">{args.triggerText}</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <Stack gap="3xs">
            <Text className="font-medium" size="sm">
              {args.title}
            </Text>
            <Text size="sm" variant="muted">
              {args.description}
            </Text>
          </Stack>
        </HoverCardContent>
      </HoverCard>
    </Group>
  ),
};

/**
 * User profile hover card example.
 */
export const WithUserProfile: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Example of a user profile card with avatar and details.",
      },
    },
  },
  render: () => (
    <Group
      align="center"
      className="min-h-[200px]"
      gap="base"
      position="center"
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@username</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <Group align="flex-start" gap="base">
            <Card className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Icon icon={User} size="lg" />
            </Card>
            <Stack className="flex-1" gap="xs">
              <Text className="font-semibold">Jane Doe</Text>
              <Text size="sm" variant="muted">
                @username
              </Text>
              <Text size="sm">
                Product designer passionate about creating delightful user
                experiences.
              </Text>
              <Group gap="base">
                <Text size="xs" variant="muted">
                  <span className="font-semibold text-foreground">1.2k</span>{" "}
                  Following
                </Text>
                <Text size="xs" variant="muted">
                  <span className="font-semibold text-foreground">3.4k</span>{" "}
                  Followers
                </Text>
              </Group>
            </Stack>
          </Group>
        </HoverCardContent>
      </HoverCard>
    </Group>
  ),
};
