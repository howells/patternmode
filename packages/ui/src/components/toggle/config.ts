import { ToggleLeft } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
import { Toggle } from "./component";
import {
	DefaultExample,
	DisabledExample,
	MuteExample,
	PlayPauseExample,
	SizesExample,
	ToolbarExample,
	VariantsExample,
	WithIconAndTextExample,
	WithIconExample,
} from "./examples";

export const toggleConfig: ComponentConfig = {
	id: "toggle",
	name: "Toggle",
	description:
		"A two-state button component that toggles between pressed (on) and unpressed (off) states. Unlike a checkbox, Toggle is designed for immediate actions rather than form submission.",
	category: "controls",
	icon: ToggleLeft,
	importStatement: `import { Toggle } from "@patternmode/ui/toggle";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic toggle button with text content",
			component: DefaultExample,
		},
		{
			id: "with-icon",
			title: "With Icon",
			description: "Toggle button with an icon only",
			component: WithIconExample,
		},
		{
			id: "with-icon-and-text",
			title: "With Icon and Text",
			description:
				"Toggle button with both icon and text, changing based on state",
			component: WithIconAndTextExample,
		},
		{
			id: "variants",
			title: "Variants",
			description:
				"Different visual style variants - default, outline, and ghost",
			component: VariantsExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description:
				"Toggle buttons in different sizes - small, default, and large",
			component: SizesExample,
		},
		{
			id: "play-pause",
			title: "Play/Pause",
			description:
				"Media control toggle switching between play and pause states",
			component: PlayPauseExample,
		},
		{
			id: "mute",
			title: "Mute",
			description: "Audio mute toggle with volume icons",
			component: MuteExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description:
				"Toggle buttons in disabled state, both pressed and unpressed",
			component: DisabledExample,
		},
		{
			id: "toolbar",
			title: "Toolbar",
			description: "Toggle buttons used in a formatting toolbar context",
			component: ToolbarExample,
		},
	],
	components: [
		{
			name: "Toggle",
			description:
				"Two-state button for immediate toggle actions with visual feedback.",
			component: Toggle,
			primary: true,
		},
	],
};
