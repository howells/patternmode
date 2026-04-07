import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Text } from "../text";
import { HStack, VStack } from "./stack-root";

const meta = {
  title: "Layout/Stack",
  component: VStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Simple stacking should be shared too</CardTitle>
      </CardHeader>
      <CardContent>
        <VStack gap="sm">
          <Text>Foundation primitives reduce repetitive layout wrappers.</Text>
          <HStack gap="sm">
            <Text variant="muted">Horizontal grouping</Text>
            <Text variant="muted">with the same API.</Text>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  ),
};
