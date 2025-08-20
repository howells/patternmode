import { ChevronDown } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import { SplitButton } from "./component";
import {
	ComplexMenuExample,
	DefaultExample,
	DisabledExample,
	LoadingExample,
	SizesExample,
	WithIconsExample,
} from "./examples";

export const splitButtonConfig: ComponentConfig = {
	id: "split-button",
	name: "Split Button",
	description:
		"Two-part button component that combines a primary action button with a dropdown menu trigger for providing additional related options.",
	category: "controls",
	icon: ChevronDown,
	importStatement: `import { SplitButton } from "@patternmode/ui/split-button";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Different button variants with split functionality",
			component: DefaultExample,
		},
		{
			id: "with-icons",
			title: "With Icons",
			description: "Split button with left icon and custom dropdown content",
			component: WithIconsExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Available size variants for different contexts",
			component: SizesExample,
		},
		{
			id: "loading",
			title: "Loading",
			description: "Loading state with spinner and custom text",
			component: LoadingExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled state for both button and dropdown",
			component: DisabledExample,
		},
		{
			id: "complex-menu",
			title: "Complex Menu",
			description: "Structured menu with labels and separators",
			component: ComplexMenuExample,
		},
	],
	components: [
		{
			name: "Split Button",
			description: "Compound button with primary action and dropdown menu",
			component: SplitButton,
		},
	],
};
