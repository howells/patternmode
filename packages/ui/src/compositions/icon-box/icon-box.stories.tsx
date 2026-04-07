import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  AlertCircle,
  Check,
  Heart,
  Info,
  Package,
  Search,
  Star,
  Zap,
} from "lucide-react";
import { SimpleGrid } from "../../components/simple-grid";
import { Stack } from "../../components/stack";
import { Text } from "../../components/text";
import { RADIUS_OPTIONS } from "../../lib/radius";
import { COMPONENT_SIZES } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { ICON_BOX_VARIANTS, type IconBoxVariant } from "../../lib/variant";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { IconBox } from "./icon-box-root";

const meta = {
  title: "IconBox",
  component: IconBox,
  args: {
    icon: ICON_OPTIONS.Package,
    size: "base",
    variant: "default",
  },
  argTypes: {
    icon: iconControlArgType,
    size: sizeArgType,
    variant: {
      control: "select",
      options: ICON_BOX_VARIANTS,
    },
    iconSize: sizeArgType,
    radius: {
      control: "select",
      options: RADIUS_OPTIONS,
    },
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "square",
    },

    docs: {
      description: {
        component:
          "IconBox wraps icons with a styled background container. Useful for empty states, feature highlights, and status indicators.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Base: Story = {};

export const Grid: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const icons = [
      { icon: Package, name: "default" },
      { icon: Star, name: "neutral" },
      { icon: Heart, name: "muted" },
      { icon: Zap, name: "primary" },
      { icon: Search, name: "secondary" },
      { icon: Check, name: "affirmative" },
      { icon: Info, name: "info" },
      { icon: AlertCircle, name: "warning" },
      { icon: AlertCircle, name: "destructive" },
    ];

    const iconSizeMap: Record<string, string> = {
      "2xs": "3xs",
      xs: "2xs",
      sm: "xs",
      base: "sm",
      lg: "sm",
      xl: "base",
      "2xl": "base",
      "3xl": "lg",
    };

    return (
      <Stack gap="lg">
        <SimpleGrid cols={9} gap="sm">
          <Text className="font-mono text-muted-foreground" size="xs">
            Variant
          </Text>
          {COMPONENT_SIZES.map((size) => (
            <Text
              className="text-center font-mono text-muted-foreground"
              key={size}
              size="xs"
            >
              {size}
            </Text>
          ))}
        </SimpleGrid>

        <SimpleGrid cols={9} gap="sm">
          <Text className="font-mono text-muted-foreground" size="xs">
            Icon size
          </Text>
          {COMPONENT_SIZES.map((size) => (
            <Text
              className="text-center font-mono text-muted-foreground"
              key={size}
              size="xs"
            >
              {iconSizeMap[size]}
            </Text>
          ))}
        </SimpleGrid>

        {icons.map(({ icon, name }) => (
          <SimpleGrid
            className="items-center border-border border-b pb-3"
            cols={9}
            gap="sm"
            key={name}
          >
            <Text className="font-mono" size="xs">
              {name}
            </Text>
            {COMPONENT_SIZES.map((size) => (
              <Stack align="center" key={size}>
                <IconBox
                  icon={icon}
                  size={size}
                  variant={name as IconBoxVariant}
                />
              </Stack>
            ))}
          </SimpleGrid>
        ))}
      </Stack>
    );
  },
};
