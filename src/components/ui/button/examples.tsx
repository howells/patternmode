"use client";

import { ArrowRight, Loader2, Plus } from "lucide-react";
import React from "react";
import { Button } from "./button";

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

// Custom styling
export const CustomStyleExample = () => (
  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
    Custom Style
  </Button>
);

// As link with render prop
export const AsLinkExample = () => (
  <Button render={<a href="https://example.com" />}>Link Button</Button>
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
