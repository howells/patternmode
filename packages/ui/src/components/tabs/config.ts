import type { ComponentConfig } from "@patternmode/config/component-types";
import { Folders } from "lucide-react";
import {
	Tabs as TabsComponent,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "./component";
import {
	DefaultExample,
	NoDividerExample,
	SizesExample,
	SolidExample,
	SolidSizesExample,
	WithIconsExample,
} from "./examples";

export const tabsConfig: ComponentConfig = {
	id: "tabs",
	name: "Tabs",
	description:
		"Accessible tabbed interfaces built on Base UI's Tabs primitive for toggling between related panels with keyboard navigation and proper focus management.",
	category: "controls",
	featured: true,
	icon: Folders,
	importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@patternmode/ui/tabs";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic line variant tabs",
			component: DefaultExample,
		},
		{
			id: "solid",
			title: "Solid",
			description: "Button-style tabs in a container",
			component: SolidExample,
		},
		{
			id: "with-icons",
			title: "With Icons",
			description: "Tabs with left icons",
			component: WithIconsExample,
		},
		{
			id: "sizes",
			title: "Line Sizes",
			description: "Different sizes for line variant",
			component: SizesExample,
		},
		{
			id: "solid-sizes",
			title: "Solid Sizes",
			description: "Different sizes for solid variant",
			component: SolidSizesExample,
		},
		{
			id: "no-divider",
			title: "No Divider",
			description: "Line variant without bottom divider",
			component: NoDividerExample,
		},
	],
	components: [
		{
			name: "Tabs",
			description: "Root tabs component built on Base UI's Tabs primitive",
			component: TabsComponent,
			primary: true,
		},
		{
			name: "Tabs List",
			description: "Container for tab triggers with visual indicator",
			component: TabsList,
		},
		{
			name: "Tabs Trigger",
			description: "Individual tab trigger button for switching between panels",
			component: TabsTrigger,
		},
		{
			name: "Tabs Content",
			description:
				"Content panel that displays when its corresponding tab is active",
			component: TabsContent,
		},
	],
};
