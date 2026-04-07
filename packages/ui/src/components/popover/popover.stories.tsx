import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./popover-root";

const meta = {
  title: "Overlay/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          <p className="font-medium text-foreground">House style guidance</p>
          <p className="text-body text-muted-foreground">
            Popovers should support short editing or contextual review, not
            replace full dialogs.
          </p>
        </div>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Floating panels should feel deliberate</CardTitle>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="accent">Open review note</Button>
          </PopoverTrigger>
          <PopoverContent className="grid gap-3">
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Promote only shared behavior
              </p>
              <p className="text-body text-muted-foreground">
                Keep workflow-heavy multi-step interactions in app-local
                compositions until they stabilize.
              </p>
            </div>
            <PopoverArrow />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  ),
};
