import type { ComponentConfig } from "@patternmode/config/component-types";
import { PanelRight } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from "./component";
import { DefaultExample, FormExample, SettingsExample } from "./examples";

export const drawerConfig: ComponentConfig = {
	id: "drawer",
	name: "Drawer",
	description:
		"A collection of components for creating slide-out drawers and bottom sheets with smooth animations.",
	category: "overlay",
	icon: PanelRight,
	importStatement: `import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@patternmode/drawer";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic drawer with header, content, and footer",
			component: DefaultExample,
		},
		{
			id: "form",
			title: "Form",
			description: "Drawer containing a form with input fields",
			component: FormExample,
		},
		{
			id: "settings",
			title: "Settings",
			description: "Settings drawer with various controls",
			component: SettingsExample,
		},
	],
	components: [
		{ component: Drawer, name: "Drawer", description: "Root component" },
		{
			component: DrawerTrigger,
			name: "Drawer Trigger",
			description: "Trigger element",
		},
		{
			component: DrawerContent,
			name: "Drawer Content",
			description: "Content container",
		},
		{
			component: DrawerHeader,
			name: "Drawer Header",
			description: "Header container",
		},
		{ component: DrawerTitle, name: "Drawer Title", description: "Title text" },
		{
			component: DrawerDescription,
			name: "Drawer Description",
			description: "Description text",
		},
		{
			component: DrawerFooter,
			name: "Drawer Footer",
			description: "Footer container",
		},
		{
			component: DrawerClose,
			name: "Drawer Close",
			description: "Close button",
		},
		{
			component: DrawerPortal,
			name: "Drawer Portal",
			description: "Portal element",
		},
		{
			component: DrawerOverlay,
			name: "Drawer Overlay",
			description: "Overlay element",
		},
	],
};
