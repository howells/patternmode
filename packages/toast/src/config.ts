import type { ComponentConfig } from "@patternmode/config/component-types";
import { Bell } from "lucide-react";
import { ToastProvider } from "./component";
import {
	ComplexPromiseExample,
	CustomDurationExample,
	DefaultExample,
	DismissExample,
	PromiseExample,
	ToastTypesExample,
	WithActionExample,
} from "./examples";

export const toastConfig: ComponentConfig = {
	id: "toast",
	name: "Toast",
	description:
		"A comprehensive toast notification system built on Sonner with Base UI-style API providing multiple toast types, Promise handling, and customizable positioning.",
	category: "feedback",
	featured: true,
	icon: Bell,
	importStatement: `import { Toast, ToastProvider, useToast, useToastManager } from "@patternmode/toast";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic toast notification",
			component: DefaultExample,
		},
		{
			id: "toast-types",
			title: "Toast Types",
			description: "Different toast variants (success, error, warning, info)",
			component: ToastTypesExample,
		},
		{
			id: "with-action",
			title: "With Action",
			description: "Toast with action button",
			component: WithActionExample,
		},
		{
			id: "promise",
			title: "Promise",
			description: "Toast for async operations",
			component: PromiseExample,
		},
		{
			id: "custom-duration",
			title: "Custom Duration",
			description: "Toasts with different durations",
			component: CustomDurationExample,
		},
		{
			id: "dismiss",
			title: "Dismiss",
			description: "Dismissing toasts programmatically",
			component: DismissExample,
		},
		{
			id: "complex-promise",
			title: "Complex Promise",
			description: "Advanced promise handling with actions",
			component: ComplexPromiseExample,
		},
	],
	components: [
		{
			name: "Toast Provider",
			description: "Provider component for toast context and notifications",
			component: ToastProvider,
			primary: true,
		},
	],
};
