import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Check, ChevronRight, Trash2 } from "lucide-react";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { kbdControlArgType } from "../../stories/controls/kbd-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Center } from "../center/center-root";
import { MenuItem, type MenuItemProps } from "./menu-item";

type MenuItemStoryArgs = React.ComponentProps<typeof MenuItem> & {
  label?: string;
};

const meta: Meta<MenuItemStoryArgs> = {
  title: "MenuItem",
  component: MenuItem,
  decorators: [
    (Story) => (
      <Center className="min-h-48 bg-white p-12">
        <Story />
      </Center>
    ),
  ],
  argTypes: {
    icon: iconControlArgType,
    suffixIcon: iconControlArgType,
    kbd: kbdControlArgType,
    size: sizeArgType,
    variant: {
      control: "select",
      options: ["default", "input", "outline", "destructive"],
    },
    radius: {
      control: "select",
      options: ["none", "rounded", "full"],
    },
    inset: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    isActive: {
      control: "boolean",
    },
  },
  args: {
    size: "sm",
    variant: "default",
    disabled: false,
    inset: false,
    isActive: false,
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "menu",
    },
    backgrounds: { default: "white" },
    docs: {
      description: {
        component:
          "Standalone menu item for use in popovers, sheets, and custom menus. This is the base component that DropdownMenuItem, ContextMenuItem, and other menu items compose.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore all menu item options.
 */
export const Base: Story = {
  args: {
    label: "Menu item",
    icon: ICON_OPTIONS.Settings,
  },
  argTypes: {
    label: { control: "text" },
  },
  render: (args) => (
    <MenuItem
      disabled={args.disabled}
      icon={args.icon}
      inset={args.inset}
      isActive={args.isActive}
      kbd={args.kbd}
      radius={args.radius}
      size={args.size}
      suffixIcon={args.suffixIcon}
      variant={args.variant}
    >
      {args.label}
    </MenuItem>
  ),
};

// Configuration types
type MenuItemVariant = NonNullable<MenuItemProps["variant"]>;
type MenuItemState = "default" | "hover" | "active" | "disabled";

const VARIANTS: MenuItemVariant[] = [
  "default",
  "input",
  "outline",
  "destructive",
];
const DISPLAY_SIZES: ComponentSize[] = ["xs", "sm", "base", "lg"];

const STATE_COLUMNS: { key: MenuItemState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "active", label: "Active" },
  { key: "disabled", label: "Disabled" },
];

/**
 * Variant matrix showing all variants across different states.
 */
export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing all menu item variants across different states.",
      },
    },
  },
  render: () => {
    const rows = VARIANTS.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const renderCell = (variant: MenuItemVariant, state: MenuItemState) => {
      const stateProps = (() => {
        switch (state) {
          case "hover":
            // Destructive hover maintains red text
            return variant === "destructive"
              ? { className: "bg-destructive/10 text-destructive" }
              : { className: "bg-accent text-accent-foreground" };
          case "active":
            return { isActive: true };
          case "disabled":
            return { disabled: true };
          default:
            return {};
        }
      })();

      return (
        <MenuItem
          icon={variant === "destructive" ? Trash2 : ICON_OPTIONS.Settings}
          size="sm"
          variant={variant}
          {...stateProps}
        >
          Label
        </MenuItem>
      );
    };

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={rows}
      />
    );
  },
};

/**
 * Size matrix showing all sizes across variants.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing all menu item sizes across different variants.",
      },
    },
  },
  render: () => {
    const rows = DISPLAY_SIZES.map((size) => ({ key: size, label: size }));
    const columns = VARIANTS.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const renderCell = (size: ComponentSize, variant: MenuItemVariant) => (
      <MenuItem
        icon={variant === "destructive" ? Trash2 : ICON_OPTIONS.Settings}
        size={size}
        variant={variant}
      >
        Label
      </MenuItem>
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

// Feature configuration types
type FeatureConfig = "icon" | "kbd" | "suffix" | "icon-kbd" | "inset";

const FEATURE_ROWS: { key: FeatureConfig; label: string }[] = [
  { key: "icon", label: "With Icon" },
  { key: "kbd", label: "With Kbd" },
  { key: "suffix", label: "With Suffix Icon" },
  { key: "icon-kbd", label: "Icon + Kbd" },
  { key: "inset", label: "Inset (no icon)" },
];

/**
 * Feature matrix showing different content configurations across sizes.
 */
export const FeatureMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing different feature combinations (icon, kbd, suffix icon, inset) across sizes.",
      },
    },
  },
  render: () => {
    const columns = DISPLAY_SIZES.map((size) => ({ key: size, label: size }));

    const renderCell = (feature: FeatureConfig, size: ComponentSize) => {
      const item = (() => {
        switch (feature) {
          case "icon":
            return (
              <MenuItem icon={ICON_OPTIONS.Settings} size={size}>
                Settings
              </MenuItem>
            );
          case "kbd":
            return (
              <MenuItem kbd={["⌘", "K"]} size={size}>
                Command
              </MenuItem>
            );
          case "suffix":
            return (
              <MenuItem size={size} suffixIcon={ChevronRight}>
                Submenu
              </MenuItem>
            );
          case "icon-kbd":
            return (
              <MenuItem icon={ICON_OPTIONS.Copy} kbd={["⌘", "C"]} size={size}>
                Copy
              </MenuItem>
            );
          case "inset":
            return (
              <MenuItem inset size={size}>
                No icon
              </MenuItem>
            );
          default:
            return null;
        }
      })();
      return item;
    };

    return (
      <VariantGrid
        columns={columns}
        renderCell={renderCell}
        rowLabels="Feature"
        rows={FEATURE_ROWS}
      />
    );
  },
};

/**
 * Complete combination showing icon + kbd + suffix across variants.
 */
export const FullFeatureMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Menu items with all features enabled (icon, kbd, suffix) across variants.",
      },
    },
  },
  render: () => {
    const rows = VARIANTS.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));
    const columns = DISPLAY_SIZES.map((size) => ({ key: size, label: size }));

    const renderCell = (variant: MenuItemVariant, size: ComponentSize) => (
      <MenuItem
        icon={variant === "destructive" ? Trash2 : ICON_OPTIONS.Settings}
        kbd={["⌘", "K"]}
        size={size}
        suffixIcon={Check}
        variant={variant}
      >
        Label
      </MenuItem>
    );

    return (
      <VariantGrid
        columns={columns}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={rows}
      />
    );
  },
};
