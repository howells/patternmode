import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card-root";

const meta = {
  title: "Overlay/Hover Card",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          className="rounded-[calc(var(--radius-md)-2px)] px-3 py-2 text-body text-foreground underline decoration-border-strong underline-offset-4"
          type="button"
        >
          Hover for context
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="grid gap-2">
        <Badge variant="accent">Patternmode</Badge>
        <p className="text-body text-muted-foreground">
          Hover cards work best for lightweight contextual identity and
          background information.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Contextual surfaces should stay restrained</CardTitle>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button
              className="rounded-[calc(var(--radius-md)-2px)] bg-secondary/70 px-3 py-2 text-body text-foreground"
              type="button"
            >
              Patternmode reviewer
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="grid gap-3">
            <div className="space-y-1">
              <p className="font-medium text-foreground">UI library reviewer</p>
              <p className="text-body text-muted-foreground">
                Checks whether a primitive is broadly reusable before it moves
                upstream.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  ),
};
