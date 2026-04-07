import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { RADIUS_OPTIONS, type Radius } from "../../lib/radius";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import {
  AVATAR_IMAGE_OPTIONS,
  avatarImageControlArgType,
  buildStoryAvatarUrl,
  STORYBOOK_AVATAR_NAMES,
} from "../../stories/controls/avatar-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../avatar";
import { Heading } from "../heading";
import { HStack, Stack } from "../stack";
import { Text } from "../text";

type AvatarStoryArgs = React.ComponentProps<typeof Avatar> & {
  imageSrc?: string;
  name?: string;
};

const meta: Meta<AvatarStoryArgs> = {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    // Visual
    size: {
      ...sizeArgType,
      description: "Avatar size using shared ComponentSize scale",
    },
    radius: {
      control: "select",
      options: RADIUS_OPTIONS,
      description: "Border radius",
    },
    withRing: {
      control: "boolean",
      description: "Show ring around avatar",
    },

    // Content
    imageSrc: avatarImageControlArgType,
    name: {
      control: "text",
      description: "Name for fallback initials, color generation, and alt text",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    ringColor: { table: { disable: true } },
  },
  args: {
    size: "base",
    radius: "full",
    withRing: false,
    name: "John Doe",
    imageSrc: "None",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "user",
    },
    docs: {
      description: {
        component:
          "Represents users or entities. Supports images with fallback to initials, status indicators, badges, and grouping.",
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
    const typedArgs = args as Record<string, unknown>;
    const size = (typedArgs.size as ComponentSize) || "base";
    const radius = (typedArgs.radius as Radius) || "full";
    const withRing = typedArgs.withRing as boolean;
    const imageSrcKey = (typedArgs.imageSrc as string | undefined) || "";
    const imageSrc =
      imageSrcKey in AVATAR_IMAGE_OPTIONS
        ? AVATAR_IMAGE_OPTIONS[imageSrcKey as keyof typeof AVATAR_IMAGE_OPTIONS]
        : "";
    const name = (typedArgs.name as string | undefined) || "User";

    const hasImage = imageSrc && imageSrc.trim() !== "";

    return (
      <Avatar radius={radius} size={size} withRing={withRing}>
        {hasImage && <AvatarImage alt={name} key={imageSrc} src={imageSrc} />}
        <AvatarFallback name={name} size={size} />
      </Avatar>
    );
  },
};

/**
 * Size × Radius matrix showing avatar configurations.
 */
export const SizeRadiusMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing avatar sizes across radius options.",
      },
    },
  },
  render: () => {
    const RADIUS_ROWS: { key: Radius; label: string }[] = RADIUS_OPTIONS.map(
      (r) => ({ key: r, label: r }),
    );
    const SIZE_COLUMNS: { key: ComponentSize; label: string }[] = [
      "sm",
      "base",
      "lg",
      "xl",
    ].map((s) => ({ key: s as ComponentSize, label: s }));

    return (
      <VariantGrid<Radius, ComponentSize>
        columns={SIZE_COLUMNS}
        renderCell={(radius, size) => (
          <Avatar radius={radius} size={size}>
            <AvatarImage alt="User" src={buildStoryAvatarUrl("John Doe")} />
            <AvatarFallback name="John Doe" size={size} />
          </Avatar>
        )}
        rowLabels="Radius"
        rows={RADIUS_ROWS}
      />
    );
  },
};

/**
 * All sizes with images.
 */
export const AllSizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Avatar sizes from 2xs to 2xl with images.",
      },
    },
  },
  render: () => (
    <HStack className="flex-wrap" gap="base">
      {COMPONENT_SIZES.map((size, idx) => (
        <Stack align="center" gap="2xs" key={size}>
          <Avatar size={size}>
            <AvatarImage
              alt={STORYBOOK_AVATAR_NAMES[idx] || "User"}
              src={buildStoryAvatarUrl(
                STORYBOOK_AVATAR_NAMES[idx] || "User",
                128,
              )}
            />
            <AvatarFallback name="User" size={size} />
          </Avatar>
          <Text size="xs" variant="muted">
            {size}
          </Text>
        </Stack>
      ))}
    </HStack>
  ),
};

/**
 * All sizes with fallback initials.
 */
export const AllSizesFallback: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Avatar sizes showing fallback initials without images.",
      },
    },
  },
  render: () => {
    const names = [
      "Alex Chen",
      "Jamie Lee",
      "Taylor Kim",
      "Riley Park",
      "Jordan Wu",
      "Morgan Li",
      "Casey Tan",
      "Sam Green",
    ];

    return (
      <HStack className="flex-wrap" gap="base">
        {COMPONENT_SIZES.map((size, idx) => (
          <Stack align="center" gap="2xs" key={size}>
            <Avatar size={size}>
              <AvatarFallback name={names[idx] || "User"} size={size} />
            </Avatar>
            <Text size="xs" variant="muted">
              {size}
            </Text>
          </Stack>
        ))}
      </HStack>
    );
  },
};

/**
 * Radius options.
 */
export const RadiusOptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Different avatar border radius options: full (circle), rounded, and square.",
      },
    },
  },
  render: () => (
    <HStack align="center" gap="lg">
      {RADIUS_OPTIONS.map((radius) => (
        <Stack align="center" gap="2xs" key={radius}>
          <Avatar radius={radius} size="lg">
            <AvatarImage alt="Jane Doe" src={buildStoryAvatarUrl("Jane Doe")} />
            <AvatarFallback name="Jane Doe" size="lg" />
          </Avatar>
          <Text size="xs" variant="muted">
            {radius}
          </Text>
        </Stack>
      ))}
    </HStack>
  ),
};

/**
 * Avatars with decorative rings.
 */
export const WithRing: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Avatars with decorative rings.",
      },
    },
  },
  render: () => (
    <HStack align="center" gap="base">
      <Avatar size="lg" withRing>
        <AvatarImage alt="Sam Green" src={buildStoryAvatarUrl("Sam Green")} />
        <AvatarFallback name="Sam Green" size="lg" />
      </Avatar>
      <Avatar ringColor="ring-ring" size="lg" withRing>
        <AvatarImage alt="Alex Blue" src={buildStoryAvatarUrl("Alex Blue")} />
        <AvatarFallback name="Alex Blue" size="lg" />
      </Avatar>
      <Avatar ringColor="ring-purple-500" size="lg" withRing>
        <AvatarImage alt="Kim Purple" src={buildStoryAvatarUrl("Kim Purple")} />
        <AvatarFallback name="Kim Purple" size="lg" />
      </Avatar>
    </HStack>
  ),
};

/**
 * Avatar group with overlapping design.
 */
export const Group: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Multiple avatars grouped together with overlapping design. Supports limiting visible avatars and showing surplus count.",
      },
    },
  },
  render: () => {
    const users = [
      { name: "Alex Chen", img: buildStoryAvatarUrl("Alex Chen") },
      { name: "Jamie Lee", img: buildStoryAvatarUrl("Jamie Lee") },
      { name: "Taylor Kim", img: buildStoryAvatarUrl("Taylor Kim") },
      { name: "Riley Park", img: buildStoryAvatarUrl("Riley Park") },
      { name: "Jordan Wu", img: buildStoryAvatarUrl("Jordan Wu") },
    ];

    return (
      <Stack gap="xl">
        <Stack gap="sm">
          <Heading level="4" size="xs">
            Normal spacing
          </Heading>
          <AvatarGroup>
            {users.map((user) => (
              <Avatar key={user.name}>
                <AvatarImage alt={user.name} src={user.img} />
                <AvatarFallback name={user.name} />
              </Avatar>
            ))}
          </AvatarGroup>
        </Stack>

        <Stack gap="sm">
          <Heading level="4" size="xs">
            With max count (3 visible)
          </Heading>
          <AvatarGroup max={3}>
            {users.map((user) => (
              <Avatar key={user.name}>
                <AvatarImage alt={user.name} src={user.img} />
                <AvatarFallback name={user.name} />
              </Avatar>
            ))}
          </AvatarGroup>
        </Stack>

        <Stack gap="sm">
          <Heading level="4" size="xs">
            Large size with animation
          </Heading>
          <AvatarGroup animate size="lg">
            {users.map((user) => (
              <Avatar key={user.name}>
                <AvatarImage alt={user.name} src={user.img} />
                <AvatarFallback name={user.name} />
              </Avatar>
            ))}
          </AvatarGroup>
        </Stack>

        <Stack gap="sm">
          <Heading level="4" size="xs">
            Tight spacing
          </Heading>
          <AvatarGroup max={4} spacing="tight">
            {users.map((user) => (
              <Avatar key={user.name}>
                <AvatarImage alt={user.name} src={user.img} />
                <AvatarFallback name={user.name} />
              </Avatar>
            ))}
          </AvatarGroup>
        </Stack>
      </Stack>
    );
  },
};
