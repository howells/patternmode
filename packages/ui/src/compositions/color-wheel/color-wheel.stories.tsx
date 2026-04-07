import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";

import type { ColorWheelValue } from "./color-wheel-root";
import { ColorWheel } from "./color-wheel-root";
import { hslToHex } from "./color-wheel-utils";

type Story = StoryObj<typeof ColorWheel>;

const meta: Meta<typeof ColorWheel> = {
  title: "ColorWheel",
  component: ColorWheel,
  parameters: {
    docs: {
      description: {
        component:
          "Concentric saturation/lightness pad with a hue arc that hugs the pad circle.",
      },
    },
  },
};

export default meta;

function ControlledWheel() {
  const [value, setValue] = useState<ColorWheelValue>({
    h: 16,
    s: 48,
    l: 69,
  });

  const hex = hslToHex(value.h, value.s, value.l);

  return (
    <div className="flex flex-col items-center gap-4">
      <ColorWheel onChange={setValue} value={value} />
      <div className="flex items-center gap-2 text-sm">
        <span
          className="size-5 rounded-full border border-black/10"
          style={{ backgroundColor: hex }}
        />
        <span className="font-mono text-gray-600">{hex}</span>
        <span className="text-gray-400">
          H:{Math.round(value.h)} S:{Math.round(value.s)} L:
          {Math.round(value.l)}
        </span>
      </div>
    </div>
  );
}

export const Base: Story = {
  render: () => <ControlledWheel />,
};
