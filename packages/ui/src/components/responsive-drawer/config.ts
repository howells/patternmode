import { PanelLeft } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import {
	ResponsiveDrawer,
	ResponsiveDrawerBody,
	ResponsiveDrawerClose,
	ResponsiveDrawerContent,
	ResponsiveDrawerDescription,
	ResponsiveDrawerFooter,
	ResponsiveDrawerHeader,
	ResponsiveDrawerTitle,
	ResponsiveDrawerTrigger,
} from "./component";
import {
	ControlledExample,
	DefaultExample,
	FormExample,
	SimpleExample,
} from "./examples";

export const responsiveDrawerConfig: ComponentConfig = {
	id: "responsive-drawer",
	name: "Responsive Drawer",
	description:
		"Responsive drawer component that adapts behavior based on screen size. On mobile devices, it renders as a bottom drawer using Vaul library. On desktop, it displays as a side sheet using Base UI Dialog. Provides consistent API across both implementations.",
	category: "overlay",
	icon: PanelLeft,
	importStatement: `import { ResponsiveDrawer, ResponsiveDrawerTrigger, ResponsiveDrawerContent, ResponsiveDrawerHeader, ResponsiveDrawerTitle, ResponsiveDrawerDescription, ResponsiveDrawerBody, ResponsiveDrawerFooter, ResponsiveDrawerClose } from "@patternmode/ui/responsive-drawer";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic responsive drawer with navigation menu",
			component: DefaultExample,
		},
		{
			id: "form",
			title: "Form Example",
			description: "Drawer containing a form with inputs and actions",
			component: FormExample,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Controlled drawer with external state management",
			component: ControlledExample,
		},
		{
			id: "simple",
			title: "Simple Actions",
			description: "Simple drawer with quick action buttons",
			component: SimpleExample,
		},
	],
	components: [
		{
			name: "Responsive Drawer",
			description: "Root container that adapts behavior based on screen size.",
			component: ResponsiveDrawer,
			primary: true,
		},
		{
			name: "Responsive Drawer Trigger",
			description: "Trigger element that opens the drawer.",
			component: ResponsiveDrawerTrigger,
		},
		{
			name: "Responsive Drawer Content",
			description: "Main content container with platform-appropriate styling.",
			component: ResponsiveDrawerContent,
		},
		{
			name: "Responsive Drawer Header",
			description: "Header section for title and description.",
			component: ResponsiveDrawerHeader,
		},
		{
			name: "Responsive Drawer Title",
			description: "Title with appropriate typography and accessibility.",
			component: ResponsiveDrawerTitle,
		},
		{
			name: "Responsive Drawer Description",
			description: "Description providing additional context.",
			component: ResponsiveDrawerDescription,
		},
		{
			name: "Responsive Drawer Body",
			description: "Scrollable content area for main drawer content.",
			component: ResponsiveDrawerBody,
		},
		{
			name: "Responsive Drawer Footer",
			description: "Footer section for action buttons.",
			component: ResponsiveDrawerFooter,
		},
		{
			name: "Responsive Drawer Close",
			description: "Close trigger that dismisses the drawer.",
			component: ResponsiveDrawerClose,
		},
	],
};
