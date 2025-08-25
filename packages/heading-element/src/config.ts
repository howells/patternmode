import type { ComponentConfig } from "@patternmode/config/component-types";
import { Heading } from "lucide-react";
import { HeadingElement } from "./component";
import {
	AllLevelsExample,
	DefaultExample,
	WithCustomClassExample,
} from "./examples";

export const headingElementConfig: ComponentConfig = {
	id: "heading-element",
	name: "Heading Element",
	description:
		"Semantic heading element component with proper HTML heading structure (h1-h6).",
	category: "typography",
	icon: Heading,
	importStatement: `import { HeadingElement } from "@patternmode/heading-element";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic heading element with default styling",
			component: DefaultExample,
		},
		{
			id: "all-levels",
			title: "All Levels",
			description: "Heading elements from h1 to h6",
			component: AllLevelsExample,
		},
		{
			id: "with-custom-class",
			title: "Custom Styling",
			description: "Heading with custom CSS classes",
			component: WithCustomClassExample,
		},
	],
	components: [
		{
			name: "Heading Element",
			description: "Semantic heading element with configurable level",
			component: HeadingElement,
			primary: true,
		},
	],
};
