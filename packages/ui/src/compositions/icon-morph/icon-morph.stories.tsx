import "@patternmode/tailwind-config/shared-styles.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Layers, Pause, Play, Search, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { IconMorph } from "./icon-morph-root";

const ICONS = [Target, Layers, Search, Sparkles] as const;
const TOGGLE_ICONS = { play: Play, pause: Pause } as const;

type IconMorphStoryArgs = React.ComponentProps<typeof IconMorph>;

const meta: Meta<typeof IconMorph> = {
  title: "IconMorph",
  component: IconMorph,
  argTypes: {
    size: {
      control: "select",
      options: ["3xs", "2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      description: "Icon size scale",
    },
    className: {
      control: "text",
      description: "Additional CSS classes (e.g., text color)",
    },
  },
  args: {
    size: "base",
    className: "text-gray-500",
  },
  parameters: {
    builder: {
      category: "display",
      icon: "sparkles",
    },
    docs: {
      description: {
        component:
          "Icon with blur-crossfade morph animation between icon changes. Drop-in replacement for Icon when animated transitions are needed.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const _BaseDemo = (args: IconMorphStoryArgs) => {
  const [index, setIndex] = useState(0);
  const Icon = ICONS[index % ICONS.length] ?? ICONS[0];

  return (
    <div className="space-y-4">
      <button
        className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50"
        onClick={() => setIndex((i) => (i + 1) % ICONS.length)}
        type="button"
      >
        <IconMorph {...args} icon={Icon} morphKey={String(index)} />
        <span className="text-gray-600 text-sm">Click to morph</span>
      </button>
      <p className="text-gray-400 text-xs">Current: {Icon.displayName}</p>
    </div>
  );
};

/**
 * Base story - click to cycle through icons with morph animation.
 */
export const Base: Story = {
  args: {
    size: "base",
    className: "text-gray-500",
    icon: Target,
    morphKey: "0",
  } satisfies IconMorphStoryArgs,
};

const _PlayPauseToggleDemo = (args: IconMorphStoryArgs) => {
  const [playing, setPlaying] = useState(false);
  const Icon = playing ? TOGGLE_ICONS.pause : TOGGLE_ICONS.play;

  return (
    <button
      className="flex size-12 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800"
      onClick={() => setPlaying((p) => !p)}
      type="button"
    >
      <IconMorph
        {...args}
        className="text-white"
        icon={Icon}
        morphKey={playing ? "pause" : "play"}
        size="lg"
      />
    </button>
  );
};

/**
 * Play/Pause toggle - common use case for media controls.
 */
export const PlayPauseToggle: Story = {
  args: {
    size: "base",
    className: "text-gray-500",
    icon: Play,
    morphKey: "play",
  } satisfies IconMorphStoryArgs,
  parameters: {
    docs: {
      description: {
        story:
          "Common toggle pattern for media controls with smooth icon transitions.",
      },
    },
  },
};
