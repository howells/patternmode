import type { ComponentConfig } from "@patternmode/config/component-types";
import { MoreHorizontal } from "lucide-react";
import { ButtonGroup } from "./component";
import {
	AlignmentExample,
	CustomGapExample,
	DefaultExample,
	IconSizeExample,
	MixedVariantsExample,
	SizeExample,
	VariantExample,
	WrappingExample,
} from "./examples";

export const buttonGroupConfig: ComponentConfig = {
	id: "button-group",
	name: "Button Group",
	description:
		"Container for grouping buttons with shared styling and consistent spacing. Child buttons inherit props from the parent group.",
	category: "ui",
	icon: MoreHorizontal,
	importStatement: `import { ButtonGroup } from "@patternmode/ui/button-group";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic button group with default styling",
			component: DefaultExample,
		},
		{
			id: "variant",
			title: "Variant Inheritance",
			description: "Buttons inherit variant from group",
			component: VariantExample,
		},
		{
			id: "size",
			title: "Size Variants",
			description: "Different size options for button groups",
			component: SizeExample,
		},
		{
			id: "icon-size",
			title: "Icon Button Groups",
			description: "Groups of icon-only buttons",
			component: IconSizeExample,
		},
		{
			id: "alignment",
			title: "Alignment Options",
			description: "Different horizontal alignment options",
			component: AlignmentExample,
		},
		{
			id: "wrapping",
			title: "Wrapping Buttons",
			description: "Buttons that wrap to new lines",
			component: WrappingExample,
		},
		{
			id: "custom-gap",
			title: "Custom Spacing",
			description: "Custom gap between buttons",
			component: CustomGapExample,
		},
		{
			id: "mixed-variants",
			title: "Mixed Variants",
			description: "Individual buttons can override group variant",
			component: MixedVariantsExample,
		},
	],
	components: [
		{
			name: "Button Group",
			description:
				"Container for grouping buttons with shared props and consistent spacing",
			component: ButtonGroup,
			primary: true,
		},
	],
};
