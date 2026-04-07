import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Stack } from "../stack";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select-root";

type NativeSelectStoryArgs = React.ComponentProps<typeof NativeSelect> & {
  fruitsLabel?: string;
  vegetablesLabel?: string;
  appleText?: string;
  bananaText?: string;
  orangeText?: string;
  carrotText?: string;
  broccoliText?: string;
  option1Text?: string;
  option2Text?: string;
  option3Text?: string;
  eastCoastLabel?: string;
  westCoastLabel?: string;
  newYorkText?: string;
  bostonText?: string;
  miamiText?: string;
  losAngelesText?: string;
  sanFranciscoText?: string;
  seattleText?: string;
  smallText?: string;
  mediumText?: string;
  largeText?: string;
  xlargeText?: string;
  shortOptionText?: string;
  longOptionText?: string;
  anotherLongOptionText?: string;
  briefText?: string;
};

const meta: Meta<NativeSelectStoryArgs> = {
  title: "NativeSelect",
  component: NativeSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    builder: {
      category: "form",
      icon: "list",
    },

    docs: {
      description: {
        component:
          "A styled native HTML select element that provides a consistent appearance across browsers while maintaining native accessibility and mobile behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base interactive story with controls
export const Base: Story = {
  args: {
    disabled: false,
    fruitsLabel: "Fruits",
    vegetablesLabel: "Vegetables",
    appleText: "Apple",
    bananaText: "Banana",
    orangeText: "Orange",
    carrotText: "Carrot",
    broccoliText: "Broccoli",
  },
  argTypes: {
    fruitsLabel: { control: "text" },
    vegetablesLabel: { control: "text" },
    appleText: { control: "text" },
    bananaText: { control: "text" },
    orangeText: { control: "text" },
    carrotText: { control: "text" },
    broccoliText: { control: "text" },
  },
  render: ({
    fruitsLabel,
    vegetablesLabel,
    appleText,
    bananaText,
    orangeText,
    carrotText,
    broccoliText,
    ...args
  }) => (
    <NativeSelect {...args} defaultValue="apple">
      <NativeSelectOptGroup label={fruitsLabel}>
        <NativeSelectOption value="apple">{appleText}</NativeSelectOption>
        <NativeSelectOption value="banana">{bananaText}</NativeSelectOption>
        <NativeSelectOption value="orange">{orangeText}</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label={vegetablesLabel}>
        <NativeSelectOption value="carrot">{carrotText}</NativeSelectOption>
        <NativeSelectOption value="broccoli">{broccoliText}</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    option1Text: "Option 1",
    option2Text: "Option 2",
    option3Text: "Option 3",
  },
  argTypes: {
    option1Text: { control: "text" },
    option2Text: { control: "text" },
    option3Text: { control: "text" },
  },
  render: ({ option1Text, option2Text, option3Text, ...args }) => (
    <NativeSelect {...args} defaultValue="option1">
      <NativeSelectOption value="option1">{option1Text}</NativeSelectOption>
      <NativeSelectOption value="option2">{option2Text}</NativeSelectOption>
      <NativeSelectOption value="option3">{option3Text}</NativeSelectOption>
    </NativeSelect>
  ),
};

// With opt groups
export const WithOptGroups: Story = {
  args: {
    eastCoastLabel: "East Coast",
    westCoastLabel: "West Coast",
    newYorkText: "New York",
    bostonText: "Boston",
    miamiText: "Miami",
    losAngelesText: "Los Angeles",
    sanFranciscoText: "San Francisco",
    seattleText: "Seattle",
  },
  argTypes: {
    eastCoastLabel: { control: "text" },
    westCoastLabel: { control: "text" },
    newYorkText: { control: "text" },
    bostonText: { control: "text" },
    miamiText: { control: "text" },
    losAngelesText: { control: "text" },
    sanFranciscoText: { control: "text" },
    seattleText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Group related options together using NativeSelectOptGroup for better organization.",
      },
    },
  },
  render: (args) => (
    <NativeSelect defaultValue="ny">
      <NativeSelectOptGroup label={args.eastCoastLabel}>
        <NativeSelectOption value="ny">{args.newYorkText}</NativeSelectOption>
        <NativeSelectOption value="boston">
          {args.bostonText}
        </NativeSelectOption>
        <NativeSelectOption value="miami">{args.miamiText}</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label={args.westCoastLabel}>
        <NativeSelectOption value="la">
          {args.losAngelesText}
        </NativeSelectOption>
        <NativeSelectOption value="sf">
          {args.sanFranciscoText}
        </NativeSelectOption>
        <NativeSelectOption value="seattle">
          {args.seattleText}
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

// Simple list
export const SimpleList: Story = {
  args: {
    smallText: "Small",
    mediumText: "Medium",
    largeText: "Large",
    xlargeText: "Extra Large",
  },
  argTypes: {
    smallText: { control: "text" },
    mediumText: { control: "text" },
    largeText: { control: "text" },
    xlargeText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story: "A simple select without option groups.",
      },
    },
  },
  render: (args) => (
    <NativeSelect defaultValue="medium">
      <NativeSelectOption value="small">{args.smallText}</NativeSelectOption>
      <NativeSelectOption value="medium">{args.mediumText}</NativeSelectOption>
      <NativeSelectOption value="large">{args.largeText}</NativeSelectOption>
      <NativeSelectOption value="xlarge">{args.xlargeText}</NativeSelectOption>
    </NativeSelect>
  ),
};

// Long options
export const LongOptions: Story = {
  args: {
    shortOptionText: "Short option",
    longOptionText:
      "This is a much longer option that demonstrates how the select handles extended text content",
    anotherLongOptionText:
      "Another relatively long option with descriptive text",
    briefText: "Brief",
  },
  argTypes: {
    shortOptionText: { control: "text" },
    longOptionText: { control: "text" },
    anotherLongOptionText: { control: "text" },
    briefText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story: "Native select handles long option text gracefully.",
      },
    },
  },
  render: (args) => (
    <Stack className="max-w-md">
      <NativeSelect defaultValue="1">
        <NativeSelectOption value="1">
          {args.shortOptionText}
        </NativeSelectOption>
        <NativeSelectOption value="2">{args.longOptionText}</NativeSelectOption>
        <NativeSelectOption value="3">
          {args.anotherLongOptionText}
        </NativeSelectOption>
        <NativeSelectOption value="4">{args.briefText}</NativeSelectOption>
      </NativeSelect>
    </Stack>
  ),
};
