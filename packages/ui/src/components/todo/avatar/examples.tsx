"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Avatar, AvatarFallback, AvatarImage, AvatarWithFallback, Grid, GridCell, HStack, Subheading, Text, VStack } from "@patternmode/ui";

import React from "react";

// For Next.js applications - this would be imported from 'next/image'
// const Image = dynamic(() => import('next/image'), { ssr: false });

// Basic avatar examples
export const DefaultExample = () => {
  return (
    <HStack gap={4} align="center">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar initials="JD" alt="John Doe" />
      <Avatar initials="AB" alt="Alice Brown" dynamicBackground />
    </HStack>
  );
};

// Size variants
export const SizeVariantsExample = () => {
  return (
    <HStack gap={4} align="end">
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=16&h=16&fit=crop&crop=face"
          alt="John Doe"
          size="2xs"
        />
        <Text size="2xs">2xs (16px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
          alt="John Doe"
          size="xs"
        />
        <Text size="2xs">xs (24px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          alt="John Doe"
          size="sm"
        />
        <Text size="2xs">sm (32px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          alt="John Doe"
          size="base"
        />
        <Text size="2xs">base (40px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="John Doe"
          size="lg"
        />
        <Text size="2xs">lg (48px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
          alt="John Doe"
          size="xl"
        />
        <Text size="2xs">xl (64px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
          alt="John Doe"
          size="2xl"
        />
        <Text size="2xs">2xl (80px)</Text>
      </VStack>
      <VStack gap={2} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
          alt="John Doe"
          size="3xl"
        />
        <Text size="2xs">3xl (96px)</Text>
      </VStack>
    </HStack>
  );
};

// Initials with different sizes
export const InitialsExample = () => {
  return (
    <HStack gap={4} align="end">
      <Avatar initials="AB" alt="Alice Brown" size="2xs" />
      <Avatar initials="CD" alt="Charlie Davis" size="xs" />
      <Avatar initials="EF" alt="Emma Foster" size="sm" />
      <Avatar initials="GH" alt="George Harris" size="base" />
      <Avatar initials="IJ" alt="Isabella Jones" size="lg" />
      <Avatar initials="KL" alt="Kevin Lee" size="xl" />
      <Avatar initials="MN" alt="Maria Nelson" size="2xl" />
      <Avatar initials="OP" alt="Oliver Parker" size="3xl" />
    </HStack>
  );
};

// Square variants
export const SquareVariantsExample = () => {
  return (
    <HStack gap={4} align="end">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        alt="John Doe"
        square
        size="sm"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        alt="Jane Smith"
        square
        size="base"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
        alt="Mike Johnson"
        square
        size="lg"
      />
      <Avatar initials="AB" alt="Alice Brown" square size="xl" />
      <Avatar
        initials="CD"
        alt="Charlie Davis"
        square
        size="2xl"
        dynamicBackground
      />
    </HStack>
  );
};

// Dynamic background colors
export const DynamicBackgroundExample = () => {
  const users = [
    { initials: "AB", name: "Alice Brown" },
    { initials: "CD", name: "Charlie Davis" },
    { initials: "EF", name: "Emma Foster" },
    { initials: "GH", name: "George Harris" },
    { initials: "IJ", name: "Isabella Jones" },
    { initials: "KL", name: "Kevin Lee" },
    { initials: "MN", name: "Maria Nelson" },
    { initials: "OP", name: "Oliver Parker" },
  ];

  return (
    <Grid columns={4} gap={4}>
      {users.map(user => (
        <GridCell key={user.initials}>
          <VStack gap={2} align="center">
            <Avatar
              initials={user.initials}
              alt={user.name}
              dynamicBackground
              size="lg"
            />
            <Text size="2xs">{user.name}</Text>
          </VStack>
        </GridCell>
      ))}
    </Grid>
  );
};

// With fallback using Base UI
export const WithFallbackExample = () => {
  return (
    <HStack gap={4} align="center">
      <AvatarWithFallback className="size-12">
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="John Doe"
        />
        <AvatarFallback>JD</AvatarFallback>
      </AvatarWithFallback>

      <AvatarWithFallback className="size-12">
        <AvatarImage src="/non-existent-image.jpg" alt="Broken Image" />
        <AvatarFallback>BI</AvatarFallback>
      </AvatarWithFallback>

      <AvatarWithFallback className="size-12">
        <AvatarFallback>FB</AvatarFallback>
      </AvatarWithFallback>
    </HStack>
  );
};

// User list example
export const UserListExample = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      initials: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      initials: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: null,
      initials: "MJ",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: null,
      initials: "SW",
    },
  ];

  return (
    <VStack gap={3}>
      {users.map(user => (
        <HStack
          key={user.id}
          gap={3}
          align="center"
          padding={3}
          className="rounded-lg border border-zinc-200 dark:border-zinc-800"
        >
          <Avatar
            src={user.avatar}
            initials={user.initials}
            alt={user.name}
            dynamicBackground={!user.avatar}
          />
          <VStack gap={0} className="flex-1 min-w-0">
            <Text className="font-medium truncate">
              {user.name}
            </Text>
            <Text size="xs" className="text-zinc-500 truncate">{user.email}</Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

// Avatar group/stack
export const AvatarGroupExample = () => {
  const users = [
    {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      initials: "JD",
    },
    {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      initials: "JS",
    },
    {
      name: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      initials: "MJ",
    },
    {
      name: "Sarah Wilson",
      avatar: null,
      initials: "SW",
    },
  ];

  return (
    <VStack gap={6}>
      <VStack gap={4}>
        <Subheading level={4}>Team Members (Small)</Subheading>
        <HStack gap={-2} className="debug-stack">
          {users.map((user, index) => (
            <Avatar
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              src={user.avatar}
              initials={user.initials}
              alt={user.name}
              size="sm"
              dynamicBackground={!user.avatar}
            />
          ))}
          <Avatar
            text="+3"
            alt="3 more members"
            size="sm"
          />
        </HStack>
      </VStack>

      <VStack gap={3}>
        <Subheading level={4}>
          Project Contributors (Large)
        </Subheading>
        <HStack gap={-3} className="debug-stack">
          {users.map((user, index) => (
            <Avatar
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              src={user.avatar}
              initials={user.initials}
              alt={user.name}
              size="lg"
              dynamicBackground={!user.avatar}
            />
          ))}
          <Avatar
            text="+5"
            alt="5 more contributors"
            size="lg"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

// Automatic Next.js Image optimization example
export const OptimizationExample = () => {
  return (
    <VStack gap={4}>
      <HStack gap={4} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="Optimized Avatar"
          size="lg"
        />
        <VStack gap={1}>
          <Subheading level={3}>Automatic Optimization</Subheading>
          <Text size="xs" className="text-zinc-500">
            Uses Next.js Image when available, falls back to img
          </Text>
        </VStack>
      </HStack>

      <HStack gap={4} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
          alt="Standard Avatar"
          size="lg"
        />
        <VStack gap={1}>
          <Subheading level={3}>Standard Image</Subheading>
          <Text size="xs">
            Force standard img element with optimized=
            {`{false}`}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

// Default export for prop explorer
export const AvatarExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "SizeVariantsExample",
    title: "Size Variants",
    description: "Example showing different size options",
    component: SizeVariantsExample,
  },
  {
    id: "InitialsExample",
    title: "Initials",
    description: "Initials example",
    component: InitialsExample,
  },
  {
    id: "SquareVariantsExample",
    title: "Square Variants",
    description: "Square Variants example",
    component: SquareVariantsExample,
  },
  {
    id: "DynamicBackgroundExample",
    title: "Dynamic Background",
    description: "Dynamic Background example",
    component: DynamicBackgroundExample,
  },
  {
    id: "WithFallbackExample",
    title: "With Fallback",
    description: "With Fallback example",
    component: WithFallbackExample,
  },
  {
    id: "UserListExample",
    title: "User List",
    description: "User List example",
    component: UserListExample,
  },
  {
    id: "AvatarGroupExample",
    title: "Avatar Group",
    description: "Avatar Group example",
    component: AvatarGroupExample,
  },
  {
    id: "OptimizationExample",
    title: "Optimization",
    description: "Optimization example",
    component: OptimizationExample,
  },
  {
    id: "AvatarExample",
    title: "Avatar",
    description: "Avatar example",
    component: AvatarExample,
  },
];
