import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { CardFan } from "./card-fan-root";

type CardFanStoryArgs = React.ComponentProps<typeof CardFan>;

// Editorial card images from apps/web/public/editorial-cards/stack/
const EDITORIAL_IMAGES = {
  left: "/editorial-cards/stack/1.jpg",
  center: "/editorial-cards/stack/2.jpg",
  right: "/editorial-cards/stack/3.jpg",
};

// Fallback placeholder images for when editorial images aren't available
const PLACEHOLDER_IMAGES = {
  left: "https://picsum.photos/seed/left/200/200",
  center: "https://picsum.photos/seed/center/200/200",
  right: "https://picsum.photos/seed/right/200/200",
};

const meta: Meta<CardFanStoryArgs> = {
  title: "CardFan",
  component: CardFan,
  argTypes: {
    images: {
      control: "object",
      description: "Object with left, center, and right image URLs",
    },
    variant: {
      control: "radio",
      options: ["spread", "stack"],
      description:
        'Layout variant: "spread" tight fan with right on top, "stack" center prominent',
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl"],
      description: "Thumbnail size scale",
    },
    animateOnMount: {
      control: "boolean",
      description: "Animate cards fanning out on mount",
    },
    animateOnHover: {
      control: "boolean",
      description: "Subtle micro-animation on hover",
    },
  },
  args: {
    images: EDITORIAL_IMAGES,
    variant: "spread",
    size: "xl",
    animateOnMount: false,
    animateOnHover: false,
  },
  parameters: {
    builder: {
      category: "display",
      icon: "layers",
    },
    docs: {
      description: {
        component:
          "Three cards displayed in a fan or stack arrangement. Use `spread` for a fanned look with rotation, or `stack` for a neat pile with offset.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with controllable images.
 */
export const Base: Story = {
  args: {
    images: EDITORIAL_IMAGES,
  },
};

/**
 * Both variants side by side.
 */
export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Compare the "spread" and "stack" variants. Spread fans cards with rotation, stack offsets them neatly.',
      },
    },
  },
  render: () => (
    <div className="flex gap-16">
      <div className="flex flex-col items-center gap-4">
        <CardFan images={EDITORIAL_IMAGES} variant="spread" />
        <span className="text-muted-foreground text-sm">Spread</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <CardFan images={EDITORIAL_IMAGES} variant="stack" />
        <span className="text-muted-foreground text-sm">Stack</span>
      </div>
    </div>
  ),
};

/**
 * Multiple examples showing different content.
 */
export const Examples: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Multiple card fans with different image sets.",
      },
    },
  },
  render: () => (
    <div className="flex gap-12">
      <div className="flex flex-col items-center gap-2">
        <CardFan images={EDITORIAL_IMAGES} />
        <span className="text-muted-foreground text-sm">Project A</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CardFan images={PLACEHOLDER_IMAGES} />
        <span className="text-muted-foreground text-sm">Project B</span>
      </div>
    </div>
  ),
};

/**
 * With custom render function for Next.js Image.
 */
export const CustomRenderer: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Uses a custom renderImage prop for framework-specific optimizations (e.g., Next.js Image component).",
      },
    },
  },
  render: () => (
    <CardFan
      images={EDITORIAL_IMAGES}
      renderImage={({ src, alt, className, draggable, fill }) => (
        <img
          alt={alt}
          className={className}
          draggable={draggable}
          height={200}
          src={src}
          style={
            fill ? { position: "absolute", inset: 0, objectFit: "cover" } : {}
          }
          width={200}
        />
      )}
    />
  ),
};

/**
 * Animated on mount and hover.
 */
export const Animated: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Cards animate on mount (fan out from stacked) and breathe outward on hover.",
      },
    },
  },
  render: () => (
    <div className="flex gap-16">
      <div className="flex flex-col items-center gap-4">
        <CardFan
          animateOnHover
          animateOnMount
          images={EDITORIAL_IMAGES}
          variant="spread"
        />
        <span className="text-muted-foreground text-sm">Spread (hover me)</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <CardFan
          animateOnHover
          animateOnMount
          images={EDITORIAL_IMAGES}
          variant="stack"
        />
        <span className="text-muted-foreground text-sm">Stack (hover me)</span>
      </div>
    </div>
  ),
};
