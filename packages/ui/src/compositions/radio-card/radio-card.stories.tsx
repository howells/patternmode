import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Check } from "lucide-react";
import { sizeArgType } from "../../lib/storybook";
import {
  RadioCard,
  RadioCardContent,
  RadioCardDescription,
  RadioCardItem,
  RadioCardTitle,
} from "../radio-card";

const meta = {
  title: "RadioCard",
  component: RadioCard,
  argTypes: {
    showIndicator: {
      control: "boolean",
      description: "Show radio button indicator",
    },
    indicatorSide: {
      control: "radio",
      options: ["start", "end"],
      description: "Position of the indicator/icon",
    },
    size: sizeArgType,
  },
  args: {
    showIndicator: true,
    indicatorSide: "start",
    size: "base",
  },
  parameters: {
    builder: {
      category: "form",
      icon: "circle-dot",
    },
    docs: {
      description: {
        component:
          "Radio group presented as interactive cards. Supports icons, titles, descriptions, and indicators.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Base radio card group.
 */
export const Base: Story = {
  render: (args) => (
    <RadioCard {...args} className="max-w-md" defaultValue="option-1">
      <RadioCardItem value="option-1">
        <RadioCardContent>
          <RadioCardTitle>Option One</RadioCardTitle>
          <RadioCardDescription>
            Choose this for the first selection.
          </RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
      <RadioCardItem value="option-2">
        <RadioCardContent>
          <RadioCardTitle>Option Two</RadioCardTitle>
          <RadioCardDescription>
            Choose this for the second selection.
          </RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
      <RadioCardItem disabled value="option-3">
        <RadioCardContent>
          <RadioCardTitle>Disabled Option</RadioCardTitle>
          <RadioCardDescription>
            This option is currently unavailable.
          </RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
    </RadioCard>
  ),
};

/**
 * Custom icon instead of radio indicator.
 */
export const WithIcon: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use a custom icon (like a checkmark) instead of the radio indicator.",
      },
    },
  },
  render: () => (
    <RadioCard
      className="max-w-md"
      defaultValue="option-1"
      icon={Check}
      indicatorSide="end"
    >
      <RadioCardItem value="option-1">
        <RadioCardContent>
          <RadioCardTitle>Option One</RadioCardTitle>
          <RadioCardDescription>
            Check icon positioned on the end.
          </RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
      <RadioCardItem value="option-2">
        <RadioCardContent>
          <RadioCardTitle>Option Two</RadioCardTitle>
          <RadioCardDescription>
            Icon changes color when selected.
          </RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
    </RadioCard>
  ),
};

/**
 * Grid layout with multiple columns.
 */
export const GridLayout: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Use grid-cols-* classes for multi-column layouts.",
      },
    },
  },
  render: () => (
    <RadioCard
      className="max-w-2xl grid-cols-3"
      defaultValue="standard"
      showIndicator={false}
    >
      <RadioCardItem value="basic">
        <RadioCardContent>
          <RadioCardTitle>Basic</RadioCardTitle>
          <RadioCardDescription>Essential features.</RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
      <RadioCardItem value="standard">
        <RadioCardContent>
          <RadioCardTitle>Standard</RadioCardTitle>
          <RadioCardDescription>Most popular.</RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
      <RadioCardItem value="premium">
        <RadioCardContent>
          <RadioCardTitle>Premium</RadioCardTitle>
          <RadioCardDescription>All features.</RadioCardDescription>
        </RadioCardContent>
      </RadioCardItem>
    </RadioCard>
  ),
};
