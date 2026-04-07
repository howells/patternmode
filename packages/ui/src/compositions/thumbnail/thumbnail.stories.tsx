import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Image } from "lucide-react";
import { Flex } from "../../components/flex";
import { Icon } from "../../components/icon";
import { HStack } from "../../components/stack";
import { Text } from "../../components/text";
import type { ThumbnailSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Thumbnail, type ThumbnailProps } from "./thumbnail";

/** ThumbnailSize values for the story grid */
const THUMBNAIL_SIZES: ThumbnailSize[] = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
];

type ThumbnailStoryArgs = ThumbnailProps;

const meta: Meta<ThumbnailStoryArgs> = {
  title: "Thumbnail",
  component: Thumbnail,
  argTypes: {
    variant: {
      control: "select",
      options: ["card", "bare"],
      description: "Visual style variant",
    },
    size: {
      ...sizeArgType,
      description: "Thumbnail size - ComponentSize scale or pixel number",
    },
    color: {
      control: "color",
      description: "Background color",
    },
    selected: {
      control: "boolean",
      description: "Selection state (card variant)",
    },
    muted: {
      control: "boolean",
      description: "Muted opacity with hover restore",
    },
    dotted: {
      control: "boolean",
      description: "Dotted border style",
    },
    padded: {
      control: "boolean",
      description: "Show inner padding gap",
    },
    className: { table: { disable: true } },
  },
  args: {
    variant: "card",
    size: "base",
    selected: false,
    muted: false,
    dotted: false,
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "image",
    },
    docs: {
      description: {
        component:
          "Base visual thumbnail for colors and images. Supports card variant (with border, shadow, selection) and bare variant (simple container).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<ThumbnailStoryArgs>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args: ThumbnailStoryArgs) => (
    <Thumbnail {...args}>
      <Icon
        className="text-muted-foreground"
        icon={Image}
        size={typeof args.size === "number" ? "base" : args.size}
      />
    </Thumbnail>
  ),
};

/**
 * Card variant with selection states.
 */
export const CardVariant: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Card variant showing default, selected, muted, and dotted states.",
      },
    },
  },
  render: () => (
    <HStack gap="lg">
      <Thumbnail color="#a2b09f" size={58} />
      <Thumbnail color="#4c7573" selected size={58} />
      <Thumbnail color="#394a4b" muted size={58} />
      <Thumbnail color="#7b8b88" dotted size={58} />
    </HStack>
  ),
};

/**
 * Bare variant - simple container for data grids.
 */
export const BareVariant: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Bare variant - simple container without border/shadow styling.",
      },
    },
  },
  render: () => (
    <HStack gap="lg">
      <Thumbnail size="lg" variant="bare">
        <Icon className="text-muted-foreground" icon={Image} size="lg" />
      </Thumbnail>
      <Thumbnail size="xl" variant="bare">
        <Icon className="text-muted-foreground" icon={Image} size="xl" />
      </Thumbnail>
      <Thumbnail size="2xl" variant="bare">
        <Icon className="text-muted-foreground" icon={Image} size="2xl" />
      </Thumbnail>
    </HStack>
  ),
};

/**
 * Size matrix showing scale-based sizes.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All thumbnail sizes using ThumbnailSize scale.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ThumbnailSize; label: string }[] =
      THUMBNAIL_SIZES.map((s) => ({ key: s, label: s }));

    return (
      <VariantGrid<ThumbnailSize, "card" | "bare">
        columns={[
          { key: "card", label: "Card" },
          { key: "bare", label: "Bare" },
        ]}
        renderCell={(size, variant) => (
          <Thumbnail size={size} variant={variant}>
            <Icon className="text-muted-foreground" icon={Image} size={size} />
          </Thumbnail>
        )}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Pixel-based sizes for precise control.
 */
export const PixelSizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Using pixel numbers for exact size control.",
      },
    },
  },
  render: () => (
    <HStack align="flex-end" gap="lg">
      <Flex align="center" direction="column" gap="xs">
        <Thumbnail color="#a2b09f" size={44} />
        <Text size="xs" variant="muted">
          44px
        </Text>
      </Flex>
      <Flex align="center" direction="column" gap="xs">
        <Thumbnail color="#4c7573" size={58} />
        <Text size="xs" variant="muted">
          58px
        </Text>
      </Flex>
      <Flex align="center" direction="column" gap="xs">
        <Thumbnail color="#394a4b" size={72} />
        <Text size="xs" variant="muted">
          72px
        </Text>
      </Flex>
      <Flex align="center" direction="column" gap="xs">
        <Thumbnail color="#7b8b88" size={88} />
        <Text size="xs" variant="muted">
          88px
        </Text>
      </Flex>
    </HStack>
  ),
};

/**
 * Custom border color for decorative use.
 */
export const CustomBorderColor: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Using borderColor for decorative thumbnails (e.g., white borders).",
      },
    },
  },
  render: () => (
    <div className="rounded-xl bg-gray-100 p-6">
      <HStack gap="sm">
        <Thumbnail borderColor="white" color="#a2b09f" size={58} />
        <Thumbnail borderColor="white" color="#4c7573" size={58} />
        <Thumbnail borderColor="white" color="#394a4b" size={58} />
        <Thumbnail borderColor="white" color="#7b8b88" size={58} />
      </HStack>
    </div>
  ),
};

/**
 * With actual image content.
 */
export const WithImage: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Thumbnail containing an actual image.",
      },
    },
  },
  render: () => (
    <HStack gap="lg">
      <Thumbnail size={88}>
        <img
          alt="Sample"
          className="size-full object-cover"
          height={200}
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop"
          width={200}
        />
      </Thumbnail>
      <Thumbnail selected size={88}>
        <img
          alt="Sample selected"
          className="size-full object-cover"
          height={200}
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop"
          width={200}
        />
      </Thumbnail>
    </HStack>
  ),
};
