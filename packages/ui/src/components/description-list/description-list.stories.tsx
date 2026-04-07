import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "./description-list-root";

const meta = {
  title: "Data Display/Description List",
  component: DescriptionList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Card className="w-[40rem]">
      <CardHeader>
        <CardTitle>Release metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <DescriptionList dividers>
          <DescriptionItem>
            <DescriptionTerm>Status</DescriptionTerm>
            <DescriptionDetails>Ready for review</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Shared owner</DescriptionTerm>
            <DescriptionDetails>Patternmode UI package</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Notes</DescriptionTerm>
            <DescriptionDetails>
              Added the remaining layout and display primitives needed for a
              credible upstream baseline.
            </DescriptionDetails>
          </DescriptionItem>
        </DescriptionList>
      </CardContent>
    </Card>
  ),
};
