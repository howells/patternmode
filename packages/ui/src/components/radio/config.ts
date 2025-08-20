import { Circle } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import {
	Radio,
	RadioCard,
	RadioCardOption,
	RadioGroup,
	RadioIndicator,
	RadioItem,
	RadioLabel,
	RadioOption,
} from "./component";
import {
	CardStyleExample,
	CustomStructureExample,
	DefaultExample,
	DisabledExample,
	SizesExample,
	WithDescriptionExample,
} from "./examples";

export const radioConfig: ComponentConfig = {
	id: "radio",
	name: "Radio",
	description:
		"Radio button input for single selections within a group of options. Provides accessible radio button functionality with proper keyboard navigation and form integration.",
	category: "controls",
	icon: Circle,
	importStatement: `import { Radio, RadioGroup, RadioItem, RadioOption, RadioLabel, RadioCard, RadioCardOption, RadioIndicator } from "@patternmode/ui/components/radio";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic radio option with label",
			component: DefaultExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Radio options in different sizes",
			component: SizesExample,
		},
		{
			id: "with-description",
			title: "With Description",
			description: "Radio options with additional description text",
			component: WithDescriptionExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled radio options",
			component: DisabledExample,
		},
		{
			id: "card-style",
			title: "Card Style",
			description: "Card-style radio options for rich content",
			component: CardStyleExample,
		},
		{
			id: "custom-structure",
			title: "Custom Structure",
			description: "Custom radio layout using individual components",
			component: CustomStructureExample,
		},
	],
	components: [
		{
			name: "Radio",
			description: "Root radio component built on Base UI's Radio primitive.",
			component: Radio,
			primary: true,
		},
		{
			name: "Radio Group",
			description:
				"Group component for managing mutually exclusive radio button selections.",
			component: RadioGroup,
		},
		{
			name: "Radio Item",
			description: "Styled radio button with visual circle and dot indicator.",
			component: RadioItem,
		},
		{
			name: "Radio Option",
			description:
				"Complete radio option with integrated label and description.",
			component: RadioOption,
		},
		{
			name: "Radio Label",
			description: "Label component for radio buttons with proper styling.",
			component: RadioLabel,
		},
		{
			name: "Radio Card",
			description: "Card-style radio button for enhanced presentation.",
			component: RadioCard,
		},
		{
			name: "Radio Card Option",
			description:
				"Complete card-style radio option with title and description.",
			component: RadioCardOption,
		},
		{
			name: "Radio Indicator",
			description: "Visual indicator component for showing selection state.",
			component: RadioIndicator,
		},
	],
};
