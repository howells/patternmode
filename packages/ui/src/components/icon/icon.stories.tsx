import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  Bell,
  Check,
  Heart,
  type LucideIcon,
  Mail,
  Search,
  Settings,
  Star,
  User,
} from "lucide-react";
import type React from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Icon } from "./icon-root";

type IconStoryArgs = React.ComponentProps<typeof Icon>;

const meta: Meta<IconStoryArgs> = {
  title: "Icon",
  component: Icon,
  argTypes: {
    // Visual
    icon: iconControlArgType,
    size: {
      ...sizeArgType,
      description: "Icon size using shared ComponentSize scale",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    icon: ICON_OPTIONS.ChevronRight,
    size: "base",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "shapes",
    },
    docs: {
      description: {
        component:
          "Icon component renders Lucide React icons with consistent sizing. Supports the full component size scale from 2xs to 3xl.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconStoryArgs>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args: IconStoryArgs) => <Icon icon={args.icon} size={args.size} />,
};

// Sample icons for gallery
const SAMPLE_ICONS: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "heart", label: "Heart", icon: Heart },
  { key: "star", label: "Star", icon: Star },
  { key: "bell", label: "Bell", icon: Bell },
  { key: "mail", label: "Mail", icon: Mail },
  { key: "user", label: "User", icon: User },
  { key: "search", label: "Search", icon: Search },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "check", label: "Check", icon: Check },
];

/**
 * Size matrix showing all icon sizes.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All icon sizes from 2xs to 3xl using a single icon.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    return (
      <VariantGrid<ComponentSize, "default">
        columns={[{ key: "default", label: "Icon" }]}
        renderCell={(size) => <Icon icon={Heart} size={size} />}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Icon gallery showing common icons at all sizes.
 */
export const Gallery: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Gallery of common icons across all sizes.",
      },
    },
  },
  render: () => {
    const SIZE_COLS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    // Create a map for icon lookup
    const iconMap = new Map(SAMPLE_ICONS.map((i) => [i.key, i.icon]));

    return (
      <VariantGrid<string, ComponentSize>
        columns={SIZE_COLS}
        renderCell={(iconKey, size) => {
          const IconComponent = iconMap.get(iconKey);
          if (!IconComponent) {
            return null;
          }
          return <Icon icon={IconComponent} size={size} />;
        }}
        rowLabels="Icon"
        rows={SAMPLE_ICONS}
      />
    );
  },
};
