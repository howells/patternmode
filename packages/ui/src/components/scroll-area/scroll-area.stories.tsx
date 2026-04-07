import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ScrollArea } from "./scroll-area-root";

const meta = {
  title: "Utilities/Scroll Area",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

const reviewCheckpoints = [
  "Review checkpoint 1",
  "Review checkpoint 2",
  "Review checkpoint 3",
  "Review checkpoint 4",
  "Review checkpoint 5",
  "Review checkpoint 6",
  "Review checkpoint 7",
  "Review checkpoint 8",
  "Review checkpoint 9",
  "Review checkpoint 10",
  "Review checkpoint 11",
  "Review checkpoint 12",
] as const;

export const Base: Story = {
  render: () => (
    <div className="h-56 w-[22rem]">
      <ScrollArea className="h-full rounded-[var(--radius-xl)] border border-border/80 bg-panel/94 p-4">
        <div className="grid gap-3">
          {reviewCheckpoints.map((item) => (
            <div
              className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary/70 px-4 py-3 text-body text-secondary-foreground"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <Badge variant="accent">Utility</Badge>
        <CardTitle>Scrollable regions should feel unobtrusive</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ScrollArea className="h-full rounded-[calc(var(--radius-lg)-4px)] border border-border/80 bg-secondary/35 p-3">
            <div className="grid gap-2">
              {[
                "Token audit",
                "Primitive backlog",
                "Storybook review queue",
                "Package documentation notes",
                "Downstream adoption checks",
                "Accessibility follow-ups",
                "Design polish tasks",
                "Testing gaps",
              ].map((item) => (
                <div
                  className="rounded-[calc(var(--radius-md)-4px)] bg-white/80 px-3 py-2 text-body text-foreground shadow-2xs"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  ),
};
