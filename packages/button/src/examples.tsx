"use client";

import { Button } from "./component";

// Primary button
export const PrimaryExample = () => <Button>Click me</Button>;

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

// Outline dashed variant
export const OutlineDashedExample = () => (
  <Button variant="outline-dashed">Outline Dashed</Button>
);

// Ghost variant
export const GhostExample = () => <Button variant="ghost">Ghost</Button>;

// Link variant
export const LinkExample = () => <Button variant="link">Link</Button>;

// Button as Link (using render prop)
export const ButtonAsLinkExample = () => (
  <div className="flex items-center gap-2">
    <Button render={(props) => <a href="/ui/components/button" {...props} />}>
      Go to Button docs
    </Button>
    <Button
      render={(props) => <a href="/ui/components/avatar" {...props} />}
      variant="secondary"
    >
      Go to Avatar docs
    </Button>
  </div>
);

// Simple button examples without icons

// Loading state
export const LoadingExample = () => <Button isLoading>Loading...</Button>;

// Different sizes
export const SizesExample = () => (
  <div className="flex items-center gap-2">
    <Button size="2xs">2X Small</Button>
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="base">Base</Button>
    <Button size="lg">Large</Button>
  </div>
);

// Full width
export const FullWidthExample = () => (
  <Button fullWidth>Full Width Button</Button>
);

// Disabled state
export const DisabledExample = () => <Button disabled>Disabled</Button>;

// Rounded button
export const RoundedExample = () => <Button rounded>Rounded</Button>;

// Loading with text
export const LoadingWithTextExample = () => (
  <Button isLoading loadingText="Saving...">
    Save Changes
  </Button>
);

// Text alignment
export const TextAlignExample = () => (
  <div className="flex gap-2">
    <Button fullWidth textAlign="left">
      Left Aligned
    </Button>
    <Button fullWidth textAlign="center">
      Center Aligned
    </Button>
  </div>
);

// Keyboard shortcuts
export const KeyboardShortcutsExample = () => (
  <div className="flex flex-col gap-2">
    <Button kbd={["mod", "K"]}>Search</Button>
    <Button kbd="Enter" variant="secondary">
      Submit
    </Button>
    <Button kbd="Ent" variant="primary">
      Button
    </Button>
    <Button kbd={["mod", "shift", "P"]} variant="outline">
      Command Palette
    </Button>
  </div>
);
