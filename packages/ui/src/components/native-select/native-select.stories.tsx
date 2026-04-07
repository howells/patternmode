import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select-root";

const meta = {
  title: "Forms/Native Select",
  component: NativeSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-80">
      <NativeSelect defaultValue="default">
        <NativeSelectOption value="default">
          Patternmode Default
        </NativeSelectOption>
        <NativeSelectOption value="quiet">Quiet Editorial</NativeSelectOption>
        <NativeSelectOption value="accent">Accent Lift</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Native selects still need the house style</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="native-select-story">Fallback preset selector</Label>
        <NativeSelect defaultValue="default" id="native-select-story">
          <NativeSelectOptGroup label="Presets">
            <NativeSelectOption value="default">
              Patternmode Default
            </NativeSelectOption>
            <NativeSelectOption value="quiet">
              Quiet Editorial
            </NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Ownership">
            <NativeSelectOption value="local">
              App-local wrapper
            </NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </CardContent>
    </Card>
  ),
};
