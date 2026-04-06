import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Avatar, AvatarFallback } from "./avatar-root";

const meta = {
  title: "Identity/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>PM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <Badge variant="accent">Identity</Badge>
        <CardTitle>Shared surfaces need calm presence</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="font-medium text-body text-foreground">
            Patternmode upstream
          </p>
          <p className="text-body text-muted-foreground">
            Neutral identity tokens keep avatars usable across product contexts.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};
