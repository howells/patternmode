import { PanelLeft } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
import {
	Sidebar,
	SidebarBody,
	SidebarDivider,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarItem,
	SidebarToggle,
} from "./component";
import {
	CollapsibleExample,
	CollapsibleGroupsExample,
	DefaultExample,
	NavigationExample,
	WithGroupsExample,
} from "./examples";

export const sidebarConfig: ComponentConfig = {
	id: "sidebar",
	name: "Sidebar",
	description:
		"Collapsible sidebar component for navigation and supplementary content organization. Features collapsible state, grouped navigation items with collapsible groups, and responsive design with smooth animations.",
	category: "navigation",
	icon: PanelLeft,
	importStatement: `import { Sidebar, SidebarHeader, SidebarBody, SidebarFooter, SidebarGroup, SidebarItem, SidebarToggle, SidebarDivider } from "@patternmode/ui/sidebar";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description:
				"Basic sidebar with header, navigation groups, and collapsible sections",
			component: DefaultExample,
		},
		{
			id: "collapsible",
			title: "Collapsible Sidebar",
			description:
				"Sidebar with toggle functionality and collapsed state with collapsible groups",
			component: CollapsibleExample,
		},
		{
			id: "collapsible-groups",
			title: "Collapsible Groups",
			description:
				"Demonstration of collapsible group functionality with chevron controls",
			component: CollapsibleGroupsExample,
		},
		{
			id: "with-groups",
			title: "With Organized Groups",
			description:
				"Sidebar with organized navigation groups that can be collapsed and expanded",
			component: WithGroupsExample,
		},
		{
			id: "navigation",
			title: "Interactive Navigation",
			description:
				"Sidebar with interactive navigation, state management, and collapsible sections",
			component: NavigationExample,
		},
	],
	components: [
		{
			name: "Sidebar",
			description:
				"Root container for the collapsible sidebar with toggle support.",
			component: Sidebar,
			primary: true,
		},
		{
			name: "Sidebar Header",
			description: "Header section for branding, titles, or primary actions.",
			component: SidebarHeader,
		},
		{
			name: "Sidebar Body",
			description:
				"Scrollable body section containing main navigation content.",
			component: SidebarBody,
		},
		{
			name: "Sidebar Footer",
			description: "Footer section for secondary actions or user information.",
			component: SidebarFooter,
		},
		{
			name: "Sidebar Group",
			description:
				"Group container for organizing related navigation items with collapsible functionality.",
			component: SidebarGroup,
		},
		{
			name: "Sidebar Item",
			description: "Individual navigation item with link and icon support.",
			component: SidebarItem,
		},
		{
			name: "Sidebar Toggle",
			description: "Toggle button for collapsing and expanding the sidebar.",
			component: SidebarToggle,
		},
		{
			name: "Sidebar Divider",
			description: "Visual separator for dividing sections within the sidebar.",
			component: SidebarDivider,
		},
	],
};
