import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import {
  Banner,
  BannerActions,
  BannerDescription,
  BannerTitle,
} from "./banner-root";

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Banner className="max-w-3xl" variant="accent">
      <BannerTitle>Library review window is open</BannerTitle>
      <BannerDescription>
        Freeze API churn, finish package-owned stories, and raise regression
        coverage before promoting this slice as the default upstream baseline.
      </BannerDescription>
      <BannerActions>
        <Button size="sm">Open review board</Button>
        <Button size="sm" variant="secondary">
          See open gaps
        </Button>
      </BannerActions>
    </Banner>
  ),
};
