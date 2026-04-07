import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Container } from "./container-root";

const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-full bg-secondary/35 py-8">
      <Container size="lg">
        <Card>
          <CardHeader>
            <CardTitle>Bounded shell content</CardTitle>
          </CardHeader>
          <CardContent>
            Containers keep app pages readable while leaving density choices
            explicit.
          </CardContent>
        </Card>
      </Container>
    </div>
  ),
};
