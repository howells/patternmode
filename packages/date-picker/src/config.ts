import type { ComponentConfig } from "@patternmode/config/component-types";
import { Calendar } from "lucide-react";
import { DatePicker } from "./component";
import {
	ControlledExample,
	DefaultExample,
	DisabledExample,
	ErrorStateExample,
	WithClockIconExample,
	WithCustomIconExample,
	WithPresetsExample,
	WithTimeExample,
} from "./examples";

export const datePickerConfig: ComponentConfig = {
	id: "date-picker",
	name: "Date Picker",
	description:
		"Date selection component with calendar interface, optional time picker, and preset date options.",
	category: "controls",
	icon: Calendar,
	importStatement: `import { DatePicker } from "@patternmode/date-picker";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic date picker with calendar interface",
			component: DefaultExample,
		},
		{
			id: "with-time",
			title: "With Time",
			description: "Date picker with time selection",
			component: WithTimeExample,
		},
		{
			id: "with-presets",
			title: "With Presets",
			description: "Date picker with quick preset options",
			component: WithPresetsExample,
		},
		{
			id: "with-custom-icon",
			title: "With Custom Icon",
			description: "Date picker with a custom icon",
			component: WithCustomIconExample,
		},
		{
			id: "with-clock-icon",
			title: "With Clock Icon",
			description: "Date picker with clock icon and time selection",
			component: WithClockIconExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled date picker state",
			component: DisabledExample,
		},
		{
			id: "error-state",
			title: "Error State",
			description: "Date picker with error styling",
			component: ErrorStateExample,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Controlled date picker with external state",
			component: ControlledExample,
		},
	],
	components: [
		{
			name: "Date Picker",
			description:
				"Date selection component with calendar interface and optional features.",
			component: DatePicker,
			primary: true,
		},
	],
};
