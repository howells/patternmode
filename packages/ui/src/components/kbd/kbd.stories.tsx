import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import {
  KBD_OPTIONS,
  kbdControlArgType,
} from "../../stories/controls/kbd-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Kbd, KbdGroup } from "../kbd";

type KbdStoryArgs = React.ComponentProps<typeof Kbd> & {
  keys?: string[];
};

const meta: Meta<KbdStoryArgs> = {
  title: "Kbd",
  component: Kbd,
  argTypes: {
    keys: {
      ...kbdControlArgType,
      description: "Select a keyboard shortcut to display",
    },
    size: sizeArgType,
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "destructive",
        "brand",
        "ghost",
      ],
    },
  },
  args: {
    keys: KBD_OPTIONS["⌘+K (Command)"],
    size: "sm",
    variant: "default",
  },
  parameters: {
    builder: {
      category: "typography",
      icon: "keyboard",
    },
    docs: {
      description: {
        component:
          "Kbd displays keyboard shortcuts and key combinations. Use KbdGroup to display multiple keys together.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore all kbd options.
 */
export const Base: Story = {
  render: (args) => (
    <KbdGroup size={args.size ?? undefined}>
      {(args.keys ?? []).map((key: string) => (
        <Kbd key={key} variant={args.variant ?? undefined}>
          {key}
        </Kbd>
      ))}
    </KbdGroup>
  ),
};

// Configuration types
type KbdVariant = NonNullable<React.ComponentProps<typeof Kbd>["variant"]>;

const VARIANTS: KbdVariant[] = [
  "default",
  "primary",
  "secondary",
  "destructive",
  "brand",
  "ghost",
];
const DISPLAY_SIZES: ComponentSize[] = ["xs", "sm", "base", "lg"];

/**
 * Size and variant matrix showing all combinations.
 */
export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing all kbd sizes and variants.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({ key: size, label: size }));
    const columns = VARIANTS.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const renderCell = (size: ComponentSize, variant: KbdVariant) => (
      <KbdGroup size={size}>
        <Kbd variant={variant}>⌘</Kbd>
        <Kbd variant={variant}>K</Kbd>
      </KbdGroup>
    );

    return (
      <VariantGrid
        columns={columns}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};
