import type { ComponentConfig } from "@patternmode/config/component-types";
import { Activity } from "lucide-react";
import { Meter } from "./component";
import React from "react";
// Wrapper to satisfy generic ComponentType for docs/registry while providing a default value
const MeterDocComponent: React.ComponentType<Record<string, unknown>> = (props) =>
    React.createElement(Meter as React.ComponentType<any>, { value: 50, ...(props as any) });
import {
	CustomFormattingExample,
	CustomRangeExample,
	DefaultExample,
	NoAnimationExample,
	SystemMetricsExample,
	ValueOnlyExample,
	VariantsExample,
	WithLabelExample,
} from "./examples";

export const meterConfig: ComponentConfig = {
	id: "meter",
	name: "Meter",
	description:
		"A graphical meter component for displaying scalar values within a known range with visual progress indicators.",
	category: "feedback",
	icon: Activity,
	importStatement: `import { Meter } from "@patternmode/meter";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic meter with default styling",
			component: DefaultExample,
		},
		{
			id: "with-label",
			title: "With Label",
			description: "Meter with descriptive label",
			component: WithLabelExample,
		},
		{
			id: "variants",
			title: "Variants",
			description: "All available color variants for different states",
			component: VariantsExample,
		},
		{
			id: "custom-range",
			title: "Custom Range",
			description: "Meter with custom min/max values",
			component: CustomRangeExample,
		},
		{
			id: "no-animation",
			title: "No Animation",
			description: "Static meter without transition animations",
			component: NoAnimationExample,
		},
		{
			id: "value-only",
			title: "Value Only",
			description: "Meter showing only the value without label",
			component: ValueOnlyExample,
		},
		{
			id: "custom-formatting",
			title: "Custom Formatting",
			description: "Meters with custom value formatting functions",
			component: CustomFormattingExample,
		},
		{
			id: "system-metrics",
			title: "System Metrics",
			description: "Example usage for system monitoring dashboards",
			component: SystemMetricsExample,
		},
	],
	components: [
		{
			name: "Meter",
			description:
				"Graphical meter component for displaying scalar values within a range",
			component: MeterDocComponent,
		},
	],
};
