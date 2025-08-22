"use client";

import { Button } from "@patternmode/button";
import type { FormProps } from "./component";
import { Form, FormControl, FormField } from "./component";

export function FormPreview(props: FormProps) {
	const handleSubmit = async (data: Record<string, unknown>) => {
		console.log("Form submitted:", data);
	};

	return (
		<Form onValidSubmit={handleSubmit} {...props}>
			<FormField name="name" label="Full Name" required>
				<FormControl placeholder="Enter your name" />
			</FormField>

			<FormField
				name="email"
				label="Email Address"
				required
				description="We'll never share your email."
			>
				<FormControl type="email" placeholder="Enter your email" />
			</FormField>

			<Button type="submit" className="w-full">
				Submit Form
			</Button>
		</Form>
	);
}

// Preview props for prop explorer
export const formPreviewProps = [
	// Note: Form component mainly accepts onValidSubmit callback and schema
	// Most visual customization happens through FormField and FormControl components
	// Schema prop is complex (Zod schema) and not suitable for prop explorer
];
