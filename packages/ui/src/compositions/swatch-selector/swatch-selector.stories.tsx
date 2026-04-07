import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";

import { SwatchSelector, SwatchSelectorItem } from "../swatch-selector";

type SwatchSelectorStoryArgs = React.ComponentProps<typeof SwatchSelector> & {
  swatchType?: "color" | "image";
};

const meta: Meta<SwatchSelectorStoryArgs> = {
  title: "SwatchSelector",
  component: SwatchSelector,
  argTypes: {
    size: {
      control: "radio",
      options: ["xs", "sm", "base", "lg", "xl"],
      description: "Size of swatches",
    },
    swatchType: {
      control: "radio",
      options: ["color", "image"],
      description: "Type of swatch content",
    },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    size: "base",
    swatchType: "color",
  },
  parameters: {
    builder: {
      category: "form",
      icon: "swatchbook",
    },
    docs: {
      description: {
        component:
          "Button-based row of selectable circular swatches for colors or images. Single selection with controlled state.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function BaseDemo(args: SwatchSelectorStoryArgs) {
  const [value, setValue] = useState("c1");

  if (args.swatchType === "image") {
    return (
      <SwatchSelector onValueChange={setValue} size={args.size} value={value}>
        <SwatchSelectorItem aria-label="Variant one" value="i1">
          <img
            alt=""
            className="h-full w-full object-cover"
            height={80}
            src="https://picsum.photos/seed/one/80/80"
            width={80}
          />
        </SwatchSelectorItem>
        <SwatchSelectorItem aria-label="Variant two" value="i2">
          <img
            alt=""
            className="h-full w-full object-cover"
            height={80}
            src="https://picsum.photos/seed/two/80/80"
            width={80}
          />
        </SwatchSelectorItem>
        <SwatchSelectorItem aria-label="Variant three" value="i3">
          <img
            alt=""
            className="h-full w-full object-cover"
            height={80}
            src="https://picsum.photos/seed/three/80/80"
            width={80}
          />
        </SwatchSelectorItem>
        <SwatchSelectorItem aria-label="Variant four" value="i4">
          <img
            alt=""
            className="h-full w-full object-cover"
            height={80}
            src="https://picsum.photos/seed/four/80/80"
            width={80}
          />
        </SwatchSelectorItem>
      </SwatchSelector>
    );
  }

  return (
    <SwatchSelector onValueChange={setValue} size={args.size} value={value}>
      <SwatchSelectorItem aria-label="Green slate" color="#46574c" value="c1" />
      <SwatchSelectorItem aria-label="Near black" color="#0c1310" value="c2" />
      <SwatchSelectorItem aria-label="Sage" color="#94a996" value="c3" />
      <SwatchSelectorItem aria-label="Deep teal" color="#183646" value="c4" />
      <SwatchSelectorItem aria-label="Charcoal" color="#0d1511" value="c5" />
    </SwatchSelector>
  );
}

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

function WithUnavailableDemo() {
  const [value, setValue] = useState("c1");

  return (
    <SwatchSelector onValueChange={setValue} value={value}>
      <SwatchSelectorItem aria-label="Green slate" color="#46574c" value="c1" />
      <SwatchSelectorItem
        aria-label="Near black (unavailable)"
        color="#0c1310"
        unavailable
        value="c2"
      />
      <SwatchSelectorItem aria-label="Sage" color="#94a996" value="c3" />
      <SwatchSelectorItem
        aria-label="Deep teal (unavailable)"
        color="#183646"
        unavailable
        value="c4"
      />
      <SwatchSelectorItem aria-label="Charcoal" color="#0d1511" value="c5" />
    </SwatchSelector>
  );
}

/**
 * Shows unavailable (out of stock) items with tooltip.
 */
export const WithUnavailable: Story = {
  render: () => <WithUnavailableDemo />,
};

function SizesDemo() {
  const [value, setValue] = useState("c1");
  const sizes = ["xs", "sm", "base", "lg", "xl"] as const;

  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <div className="flex items-center gap-4" key={size}>
          <span className="w-12 text-gray-500 text-sm">{size}</span>
          <SwatchSelector onValueChange={setValue} size={size} value={value}>
            <SwatchSelectorItem
              aria-label="Green slate"
              color="#46574c"
              value="c1"
            />
            <SwatchSelectorItem
              aria-label="Near black"
              color="#0c1310"
              value="c2"
            />
            <SwatchSelectorItem aria-label="Sage" color="#94a996" value="c3" />
          </SwatchSelector>
        </div>
      ))}
    </div>
  );
}

/**
 * All sizes side by side.
 */
export const Sizes: Story = {
  render: () => <SizesDemo />,
};
