import type { ComponentConfig } from "@patternmode/config/component-types";
import { Package } from "lucide-react";
import { IconContainer } from "./component";
import {
	CenteredExample,
	CustomColorsExample,
	DefaultExample,
	ExtraLargeExample,
	LargeSizeExample,
	SemanticVariantsExample,
	SizeVariantsExample,
	WithCustomColorExample,
	WithVariantExample,
} from "./examples";

export const iconContainerConfig: ComponentConfig = {
	id: "icon-container",
	name: "Icon Container",
	description:
		"Container component for icons with consistent padding and background styling. Provides semantic variants, custom colors, and multiple sizes for displaying icons with visual emphasis.",
	category: "visual",
	icon: Package,
	importStatement: `import { IconContainer } from "@patternmode/ui/icon-container";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic icon container with default neutral styling",
			component: DefaultExample,
		},
		{
			id: "with-variant",
			title: "With Variant",
			description: "Icon container with semantic success variant",
			component: WithVariantExample,
		},
		{
			id: "with-custom-color",
			title: "With Custom Color",
			description: "Icon container with custom purple color",
			component: WithCustomColorExample,
		},
		{
			id: "large-size",
			title: "Large Size",
			description: "Larger icon container with warning variant",
			component: LargeSizeExample,
		},
		{
			id: "extra-large",
			title: "Extra Large",
			description: "Extra large container with custom icon size",
			component: ExtraLargeExample,
		},
		{
			id: "semantic-variants",
			title: "Semantic Variants",
			description: "Showcase of different semantic color variants",
			component: SemanticVariantsExample,
		},
		{
			id: "custom-colors",
			title: "Custom Colors",
			description: "Showcase of different Tailwind custom colors",
			component: CustomColorsExample,
		},
		{
			id: "size-variants",
			title: "Size Variants",
			description: "Comparison of different container sizes",
			component: SizeVariantsExample,
		},
		{
			id: "centered",
			title: "Centered",
			description: "Horizontally centered icon container",
			component: CenteredExample,
		},
	],
	components: [
		{
			name: "Icon Container",
			description: "Container component for icons with background and padding",
			component: IconContainer,
		},
	],
};
