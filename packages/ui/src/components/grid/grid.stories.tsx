import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../card";
import { Grid, GridCol } from "./grid-root";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-[42rem]">
      <Grid columns={12} gap="sm">
        <GridCol span={8}>
          <Card className="p-4">Primary content</Card>
        </GridCol>
        <GridCol span={4}>
          <Card className="p-4">Sidebar</Card>
        </GridCol>
        <GridCol span={6}>
          <Card className="p-4">Secondary panel</Card>
        </GridCol>
        <GridCol span={6}>
          <Card className="p-4">Review queue</Card>
        </GridCol>
      </Grid>
    </div>
  ),
};
