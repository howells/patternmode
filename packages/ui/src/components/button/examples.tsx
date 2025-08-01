"use client";

import type { ComponentExample } from "../../lib/component-config-types";

import { Button, iconRegistry } from "@patternmode/ui";

import React from "react";

// Pre-imported icons from registry
const { ArrowRight, Plus } = iconRegistry;

// Default button
export const DefaultExample = () => <Button>Click me</Button>;

// Secondary variant
export const SecondaryExample = () => (
  <Button variant="secondary">Secondary</Button>
);

// Destructive variant
export const DestructiveExample = () => (
  <Button variant="destructive">Delete</Button>
);

// Outline variant
export const OutlineExample = () => <Button variant="outline">Outline</Button>;

// Ghost variant
export const GhostExample = () => <Button variant="ghost">Ghost</Button>;

// Link variant
export const LinkExample = () => <Button variant="link">Link</Button>;

// With icons
export const WithIconsExample = () => (
  <Button leftIcon={Plus} rightIcon={ArrowRight}>
    With Icons
  </Button>
);

// Icon prop (useful for single-icon buttons)
export const IconPropExample = () => (
  <div className="flex items-center gap-2">
    <Button icon={Plus}>Add Item</Button>
    <Button size="icon" icon={Plus} />
    <Button size="icon-sm" icon={Plus} />
    <Button size="icon-xs" icon={Plus} />
  </div>
);

// Loading state
export const LoadingExample = () => <Button isLoading>Loading...</Button>;

// Different sizes
export const SizesExample = () => (
  <div className="flex items-center gap-2">
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon-xs">
      <Plus />
    </Button>
    <Button size="icon-sm">
      <Plus />
    </Button>
    <Button size="icon">
      <Plus />
    </Button>
    <Button size="icon-lg">
      <Plus />
    </Button>
  </div>
);

// Full width
export const FullWidthExample = () => (
  <Button fullWidth>Full Width Button</Button>
);

// Disabled state
export const DisabledExample = () => <Button disabled>Disabled</Button>;

// Rounded button
export const RoundedExample = () => (
  <div className="flex items-center gap-2">
    <Button rounded>Rounded</Button>
    <Button rounded size="icon">
      <Plus />
    </Button>
  </div>
);

// Loading with text
export const LoadingWithTextExample = () => (
  <Button isLoading loadingText="Saving...">
    Save Changes
  </Button>
);

// Text alignment
export const TextAlignExample = () => (
  <div className="flex flex-col gap-2">
    <Button fullWidth textAlign="left">
      Left Aligned
    </Button>
    <Button fullWidth textAlign="center">
      Center Aligned
    </Button>
    <Button fullWidth textAlign="right">
      Right Aligned
    </Button>
  </div>
);

// Keyboard shortcuts
export const KeyboardShortcutsExample = () => (
  <div className="flex gap-3 items-start">
    <Button kbd={["mod", "K"]} leftIcon={Plus}>
      Search
    </Button>
    <Button variant="secondary" kbd="Enter">
      Submit
    </Button>
    <Button variant="default" kbd="Ent">
      Button
    </Button>
    <Button
      variant="outline"
      kbd={["mod", "shift", "P"]}
      rightIcon={ArrowRight}
    >
      Command Palette
    </Button>
  </div>
);

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
    id: "SecondaryExample",
    title: "Secondary",
    description: "Secondary example",
    component: SecondaryExample,
  },
  {
    id: "DestructiveExample",
    title: "Destructive",
    description: "Destructive example",
    component: DestructiveExample,
  },
  {
    id: "OutlineExample",
    title: "Outline",
    description: "Outline example",
    component: OutlineExample,
  },
  {
    id: "GhostExample",
    title: "Ghost",
    description: "Ghost example",
    component: GhostExample,
  },
  {
    id: "LinkExample",
    title: "Link",
    description: "Link example",
    component: LinkExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
  {
    id: "IconPropExample",
    title: "Icon Prop",
    description: "Icon Prop example",
    component: IconPropExample,
  },
  {
    id: "LoadingExample",
    title: "Loading",
    description: "Loading example",
    component: LoadingExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "FullWidthExample",
    title: "Full Width",
    description: "Full Width example",
    component: FullWidthExample,
  },
  {
    id: "DisabledExample",
    title: "Disabled",
    description: "Disabled example",
    component: DisabledExample,
  },
  {
    id: "RoundedExample",
    title: "Rounded",
    description: "Rounded example",
    component: RoundedExample,
  },
  {
    id: "LoadingWithTextExample",
    title: "Loading With Text",
    description: "Loading With Text example",
    component: LoadingWithTextExample,
  },
  {
    id: "TextAlignExample",
    title: "Text Align",
    description: "Text Align example",
    component: TextAlignExample,
  },
  {
    id: "KeyboardShortcutsExample",
    title: "Keyboard Shortcuts",
    description: "Keyboard Shortcuts example",
    component: KeyboardShortcutsExample,
  },
];
