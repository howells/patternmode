import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";

import { SwatchGroup, SwatchGroupItem } from "../swatch-group";

type SwatchGroupStoryArgs = React.ComponentProps<typeof SwatchGroup> & {
  swatchType?: "color" | "image";
};

const meta: Meta<SwatchGroupStoryArgs> = {
  title: "SwatchGroup",
  component: SwatchGroup,
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
    defaultValue: { table: { disable: true } },
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
          "Row of selectable circular swatches for colors or images. Single selection.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => {
    if (args.swatchType === "image") {
      return (
        <SwatchGroup
          aria-label="Choose pattern"
          defaultValue="i1"
          size={args.size}
        >
          <SwatchGroupItem aria-label="Variant one" value="i1">
            <img
              alt=""
              className="h-full w-full object-cover"
              height={80}
              src="https://picsum.photos/seed/one/80/80"
              width={80}
            />
          </SwatchGroupItem>
          <SwatchGroupItem aria-label="Variant two" value="i2">
            <img
              alt=""
              className="h-full w-full object-cover"
              height={80}
              src="https://picsum.photos/seed/two/80/80"
              width={80}
            />
          </SwatchGroupItem>
          <SwatchGroupItem aria-label="Variant three" value="i3">
            <img
              alt=""
              className="h-full w-full object-cover"
              height={80}
              src="https://picsum.photos/seed/three/80/80"
              width={80}
            />
          </SwatchGroupItem>
          <SwatchGroupItem aria-label="Variant four" value="i4">
            <img
              alt=""
              className="h-full w-full object-cover"
              height={80}
              src="https://picsum.photos/seed/four/80/80"
              width={80}
            />
          </SwatchGroupItem>
        </SwatchGroup>
      );
    }

    return (
      <SwatchGroup aria-label="Choose color" defaultValue="c1" size={args.size}>
        <SwatchGroupItem aria-label="Green slate" color="#46574c" value="c1" />
        <SwatchGroupItem aria-label="Near black" color="#0c1310" value="c2" />
        <SwatchGroupItem aria-label="Sage" color="#94a996" value="c3" />
        <SwatchGroupItem aria-label="Deep teal" color="#183646" value="c4" />
        <SwatchGroupItem aria-label="Charcoal" color="#0d1511" value="c5" />
      </SwatchGroup>
    );
  },
};
