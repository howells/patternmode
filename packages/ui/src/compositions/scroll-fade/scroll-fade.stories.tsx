import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { ScrollFade } from "./scroll-fade-root";

type ScrollFadeStoryArgs = React.ComponentProps<typeof ScrollFade>;

const ORIENTATIONS = ["vertical", "horizontal"] as const;
const POSITIONS = ["start", "end"] as const;
const THEMES = ["card", "background", "popover", "muted"] as const;

const meta: Meta<ScrollFadeStoryArgs> = {
  title: "ScrollFade",
  component: ScrollFade,
  argTypes: {
    size: {
      ...sizeArgType,
      description: "Size of the fade gradient",
    },
    orientation: {
      control: "select",
      options: ORIENTATIONS,
      description: "Orientation of the gradient (vertical or horizontal)",
    },
    position: {
      control: "select",
      options: POSITIONS,
      description:
        "Position of the fade (start = top/left, end = bottom/right)",
    },
    theme: {
      control: "select",
      options: THEMES,
      description: "Background theme the gradient fades to",
    },
  },
  args: {
    size: "base",
    orientation: "vertical",
    position: "end",
    theme: "background",
  },
  parameters: {
    builder: {
      category: "utility",
      icon: "layers",
    },
    docs: {
      description: {
        component:
          "A gradient fade overlay for scroll containers. Place inside a relatively positioned container to indicate more content is available.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story showing the scroll fade in a container.
 * Use controls to change orientation, position, size, and theme.
 */
export const Base: Story = {
  render: (args) => (
    <div className="relative h-32 w-64 overflow-hidden rounded-lg border bg-card">
      <div className="p-4">
        <p className="text-sm">Content that may overflow...</p>
        <p className="text-muted-foreground text-sm">More content below</p>
        <p className="text-muted-foreground text-sm">Even more content</p>
        <p className="text-muted-foreground text-sm">And more...</p>
      </div>
      <ScrollFade {...args} />
    </div>
  ),
};

type Position = (typeof POSITIONS)[number];
type Orientation = (typeof ORIENTATIONS)[number];

const POSITION_COLUMNS: { key: Position; label: string }[] = [
  { key: "start", label: "Start" },
  { key: "end", label: "End" },
];

const ORIENTATION_ROWS: { key: Orientation; label: string }[] = [
  { key: "vertical", label: "Vertical" },
  { key: "horizontal", label: "Horizontal" },
];

/**
 * Matrix showing orientation and position combinations.
 */
export const OrientationMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing all orientation (vertical/horizontal) and position (start/end) combinations.",
      },
    },
  },
  render: () => {
    const renderCell = (orientation: Orientation, position: Position) => (
      <div
        className={`relative overflow-hidden rounded-lg border bg-card ${
          orientation === "vertical" ? "h-24 w-32" : "h-16 w-40"
        }`}
      >
        <div className="p-2 text-muted-foreground text-xs">
          {orientation} / {position}
        </div>
        <ScrollFade
          orientation={orientation}
          position={position}
          size="base"
          theme="card"
        />
      </div>
    );

    return (
      <VariantGrid
        columns={POSITION_COLUMNS}
        renderCell={renderCell}
        rowLabels="Orientation"
        rows={ORIENTATION_ROWS}
      />
    );
  },
};

type Theme = (typeof THEMES)[number];

const THEME_COLUMNS: { key: Theme; label: string }[] = THEMES.map((t) => ({
  key: t,
  label: t.charAt(0).toUpperCase() + t.slice(1),
}));

const SIZE_ROWS: { key: ComponentSize; label: string }[] = [
  { key: "sm", label: "Small" },
  { key: "base", label: "Base" },
  { key: "lg", label: "Large" },
  { key: "xl", label: "Extra Large" },
];

/**
 * Size and theme matrix.
 */
export const SizeThemeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing different sizes and theme options for the fade gradient.",
      },
    },
  },
  render: () => {
    const renderCell = (size: ComponentSize, theme: Theme) => (
      <div className="relative h-20 w-24 overflow-hidden rounded-lg border bg-card">
        <ScrollFade
          orientation="vertical"
          position="end"
          size={size}
          theme={theme}
        />
      </div>
    );

    return (
      <VariantGrid
        columns={THEME_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};
