import { PieChart } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import { DonutChart } from "./component";
import {
	CustomColorsExample,
	DefaultExample,
	InteractiveExample,
	PieVariantExample,
	SmallSizeExample,
	WithLabelExample,
} from "./examples";

export const donutChartConfig: ComponentConfig = {
	id: "donut-chart",
	name: "Donut Chart",
	description:
		"A donut and pie chart component for visualizing proportional data with interactive features.",
	category: "charts",
	icon: PieChart,
	importStatement: `import { DonutChart } from "@patternmode/ui/donut-chart";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic donut chart with percentage values",
			component: DefaultExample,
		},
		{
			id: "pie-variant",
			title: "Pie Variant",
			description: "Solid pie chart without center hole",
			component: PieVariantExample,
		},
		{
			id: "with-label",
			title: "With Label",
			description: "Donut chart with center label showing total",
			component: WithLabelExample,
		},
		{
			id: "custom-colors",
			title: "Custom Colors",
			description: "Chart with custom color scheme",
			component: CustomColorsExample,
		},
		{
			id: "interactive",
			title: "Interactive",
			description: "Interactive chart with click handling",
			component: InteractiveExample,
		},
		{
			id: "small-size",
			title: "Small Size",
			description: "Compact chart for dashboards",
			component: SmallSizeExample,
		},
	],
	components: [
		{
			name: "Donut Chart",
			description:
				"Donut and pie chart component for proportional data visualization",
			component: DonutChart,
		},
	],
};
