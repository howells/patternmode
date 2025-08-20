import { Palette } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import { ThemeToggle } from "./component";
import {
	DarkThemeExample,
	DefaultExample,
	DisabledExample,
	LoadingExample,
	RoundedExample,
	SizesExample,
	VariantsExample,
} from "./examples";

export const themeToggleConfig: ComponentConfig = {
	id: "theme-toggle",
	name: "Theme Toggle",
	description:
		"Toggle button for switching between light and dark themes with smooth animations.",
	category: "controls",
	icon: Palette,
	importStatement: `import { ThemeToggle } from "@patternmode/ui/theme-toggle";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic theme toggle with default styling",
			component: DefaultExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Different size variants from xs to lg",
			component: SizesExample,
		},
		{
			id: "variants",
			title: "Variants",
			description: "Different visual styles and backgrounds",
			component: VariantsExample,
		},
		{
			id: "rounded",
			title: "Rounded",
			description: "Rounded vs normal border radius",
			component: RoundedExample,
		},
		{
			id: "loading",
			title: "Loading State",
			description: "Loading spinner during theme transition",
			component: LoadingExample,
		},
		{
			id: "dark-theme",
			title: "Dark Theme",
			description: "Theme toggle in dark background context",
			component: DarkThemeExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled state for both light and dark themes",
			component: DisabledExample,
		},
	],
	components: [
		{
			name: "Theme Toggle",
			description: "Toggle button for switching between light and dark themes",
			component: ThemeToggle,
		},
	],
};
