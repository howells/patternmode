import type { ComponentConfig } from "@patternmode/config/component-types";
import { MoreHorizontal } from "lucide-react";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuIconWrapper,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuSubmenu,
	ContextMenuSubmenuContent,
	ContextMenuSubmenuTrigger,
	ContextMenuTrigger,
} from "./component";
import {
	DefaultExample,
	WithSectionsExample,
	WithShortcutsExample,
} from "./examples";

export const contextMenuConfig: ComponentConfig = {
	id: "context-menu",
	name: "Context Menu",
	description:
		"Right-click contextual menu component with hierarchical action items and keyboard shortcuts.",
	category: "controls",
	icon: MoreHorizontal,
	importStatement: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@patternmode/context-menu";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic context menu with simple items",
			component: DefaultExample,
		},
		{
			id: "with-shortcuts",
			title: "With Shortcuts",
			description: "Context menu with keyboard shortcuts displayed",
			component: WithShortcutsExample,
		},
		{
			id: "with-sections",
			title: "With Sections",
			description: "Organized context menu with separators",
			component: WithSectionsExample,
		},
	],
	components: [
		{
			name: "Context Menu",
			description: "Root container for context menu functionality.",
			component: ContextMenu,
			primary: true,
		},
		{
			name: "Context Menu Trigger",
			description: "Element that opens the context menu when right-clicked.",
			component: ContextMenuTrigger,
		},
		{
			name: "Context Menu Content",
			description: "Container for menu items with positioning and styling.",
			component: ContextMenuContent,
		},
		{
			name: "Context Menu Item",
			description:
				"Individual interactive menu item with support for shortcuts.",
			component: ContextMenuItem,
		},
		{
			name: "Context Menu Separator",
			description: "Visual divider between menu sections.",
			component: ContextMenuSeparator,
		},
		{
			name: "Context Menu Checkbox Item",
			description:
				"Menu item with checkbox functionality for toggleable options.",
			component: ContextMenuCheckboxItem,
		},
		{
			name: "Context Menu Radio Item",
			description:
				"Menu item with radio button for mutually exclusive selection.",
			component: ContextMenuRadioItem,
		},
		{
			name: "Context Menu Radio Group",
			description: "Container for grouping radio items together.",
			component: ContextMenuRadioGroup,
		},
		{
			name: "Context Menu Label",
			description: "Label for menu groups providing section headers.",
			component: ContextMenuLabel,
		},
		{
			name: "Context Menu Group",
			description: "Groups related menu items for better organization.",
			component: ContextMenuGroup,
		},
		{
			name: "Context Menu Submenu",
			description: "Root component for nested submenu functionality.",
			component: ContextMenuSubmenu,
		},
		{
			name: "Context Menu Submenu Trigger",
			description: "Trigger element for opening nested submenus.",
			component: ContextMenuSubmenuTrigger,
		},
		{
			name: "Context Menu Submenu Content",
			description: "Container for submenu items with proper positioning.",
			component: ContextMenuSubmenuContent,
		},
		{
			name: "Context Menu Icon Wrapper",
			description: "Wrapper for icons in menu items with consistent styling.",
			component: ContextMenuIconWrapper,
		},
	],
};
