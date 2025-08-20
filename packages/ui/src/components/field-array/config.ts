import { List } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import { FieldArray } from "./component";
import {
	ContactListExample,
	CustomRenderExample,
	FAQBuilderExample,
	ProductVariantsExample,
} from "./examples";
import { fieldArrayPreviewProps } from "./preview";

export const fieldArrayConfig: ComponentConfig = {
	id: "field-array",
	name: "Field Array",
	category: "forms",
	icon: List,
	description:
		"Generic field array component for managing dynamic lists of structured data with configurable schemas.",
	importStatement: 'import { FieldArray } from "@patternmode/ui/field-array";',
	component: FieldArray,
	previewProps: fieldArrayPreviewProps,
	components: [
		{
			name: "FieldArray",
			description: "Main field array component for managing dynamic data lists",
			component: FieldArray,
		},
	],
	examples: [
		{
			id: "contact-list",
			title: "Contact List",
			description: "Manage a dynamic list of contacts with validation",
			component: ContactListExample,
		},
		{
			id: "faq-builder",
			title: "FAQ Builder",
			description: "Build a dynamic FAQ section with questions and answers",
			component: FAQBuilderExample,
		},
		{
			id: "product-variants",
			title: "Product Variants",
			description:
				"Manage product variants with different field types including numbers and checkboxes",
			component: ProductVariantsExample,
		},
		{
			id: "custom-render",
			title: "Custom Render",
			description: "Example with custom rendering and select fields",
			component: CustomRenderExample,
		},
	],
};
