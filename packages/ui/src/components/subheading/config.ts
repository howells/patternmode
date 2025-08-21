import type { ComponentConfig } from "@patternmode/config/component-types";
import { Type } from "lucide-react";
import { Subheading } from "./component";
import {
	ColorInheritanceExample,
	DefaultExample,
	LevelsExample,
	SectionStructureExample,
	WithContentExample,
} from "./examples";

export const subheadingConfig: ComponentConfig = {
	id: "subheading",
	name: "Subheading",
	description:
		"Secondary heading component for section subtitles and supplementary titles.",
	category: "typography",
	icon: Type,
	importStatement: `import { Subheading } from "@patternmode/ui/subheading";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic subheading component",
			component: DefaultExample,
		},
		{
			id: "levels",
			title: "Heading Levels",
			description: "All subheading levels from h1 to h6",
			component: LevelsExample,
		},
		{
			id: "with-content",
			title: "With Content",
			description: "Subheadings with accompanying content",
			component: WithContentExample,
		},
		{
			id: "section-structure",
			title: "Section Structure",
			description: "Example of proper heading hierarchy in content",
			component: SectionStructureExample,
		},
		{
			id: "color-inheritance",
			title: "Color Inheritance",
			description: "Subheadings inheriting colors from parent elements",
			component: ColorInheritanceExample,
		},
	],
	components: [
		{
			name: "Subheading",
			description: "Secondary heading component with subtle styling",
			component: Subheading,
		},
	],
};
