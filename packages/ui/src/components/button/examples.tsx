"use client";

import { iconRegistry } from "../../icons/icon-registry";
import { HStack, Stack } from "../stack/component";
import { Button } from "./component";

// Pre-imported icons from registry
const { ArrowRight, Plus } = iconRegistry;

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
			variant="secondary"
			render={(props) => <a href="/ui/components/avatar" {...props} />}
		>
			Go to Avatar docs
		</Button>
		<Button
			variant="outline"
			render={(props) => <a href="https://example.com" {...props} />}
			rightIcon={ArrowRight}
			showRightIconOnHover
		>
			External Link
		</Button>
	</div>
);

// Show icons on hover
export const IconsOnHoverExample = () => (
	<div className="flex items-center gap-2">
		<Button leftIcon={Plus} showLeftIconOnHover>
			Hover to see left icon
		</Button>
		<Button rightIcon={ArrowRight} showRightIconOnHover>
			Hover to see right icon
		</Button>
		<Button
			render={(props) => <a href="/ui/components/button" {...props} />}
			rightIcon={ArrowRight}
			showRightIconOnHover
			variant="secondary"
		>
			Link with hover arrow
		</Button>
	</div>
);

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
		<Button size="2xs">2X Small</Button>
		<Button size="xs">Extra Small</Button>
		<Button size="sm">Small</Button>
		<Button size="base">Base</Button>
		<Button size="lg">Large</Button>
		<Button size="icon-xs" icon={Plus} />
		<Button size="icon-sm" icon={Plus} />
		<Button size="icon" icon={Plus} />
		<Button size="icon-lg" icon={Plus} />
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
	<HStack gap={2}>
		<Button fullWidth textAlign="left">
			Left Aligned
		</Button>
		<Button fullWidth textAlign="center">
			Center Aligned
		</Button>
	</HStack>
);

// Keyboard shortcuts
export const KeyboardShortcutsExample = () => (
	<Stack
		direction={{
			default: "vertical",
			lg: "horizontal",
		}}
	>
		<Button kbd={["mod", "K"]} leftIcon={Plus}>
			Search
		</Button>
		<Button variant="secondary" kbd="Enter">
			Submit
		</Button>
		<Button variant="primary" kbd="Ent">
			Button
		</Button>
		<Button
			variant="outline"
			kbd={["mod", "shift", "P"]}
			rightIcon={ArrowRight}
		>
			Command Palette
		</Button>
	</Stack>
);
