"use client";

import { z } from "zod";
import { Button } from "@patternmode/button";
import { Textarea } from "../textarea/component";
import { Form, FormControl, FormField } from "./component";

// Basic form with Zod validation
export const DefaultExample = () => {
	const formSchema = z.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Please enter a valid email"),
		message: z.string().min(10, "Message must be at least 10 characters"),
	});

	const handleSubmit = async (data: Record<string, unknown>) => {
		console.log("Form submitted:", data);
	};

	return (
		<Form schema={formSchema} onValidSubmit={handleSubmit}>
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

			<FormField name="message" label="Message" required>
				<Textarea name="message" placeholder="Enter your message..." />
			</FormField>

			<Button type="submit" className="w-full">
				Submit Form
			</Button>
		</Form>
	);
};

// Native HTML5 validation
export const HTML5ValidationExample = () => {
	const handleSubmit = async (data: Record<string, unknown>) => {
		console.log("Form submitted:", data);
	};

	return (
		<Form onValidSubmit={handleSubmit}>
			<FormField name="website" label="Website" required>
				<FormControl
					type="url"
					placeholder="https://example.com"
					pattern="https?://.*"
				/>
			</FormField>

			<FormField name="phone" label="Phone">
				<FormControl
					type="tel"
					placeholder="(555) 123-4567"
					pattern="[0-9\s\-\(\)]+"
				/>
			</FormField>

			<Button type="submit" className="w-full">
				Submit
			</Button>
		</Form>
	);
};

// Registration form with custom layout
export const RegistrationFormExample = () => {
	const registrationSchema = z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
	});

	const handleRegistration = async (data: Record<string, unknown>) => {
		console.log("Registration data:", data);
	};

	return (
		<Form schema={registrationSchema} onValidSubmit={handleRegistration}>
			<div className="grid grid-cols-2 gap-4">
				<FormField name="firstName" label="First Name" required>
					<FormControl placeholder="First name" />
				</FormField>
				<FormField name="lastName" label="Last Name" required>
					<FormControl placeholder="Last name" />
				</FormField>
			</div>

			<FormField name="email" label="Email" required>
				<FormControl type="email" placeholder="your@email.com" />
			</FormField>

			<FormField
				name="password"
				label="Password"
				description="Must be at least 8 characters"
				required
			>
				<FormControl type="password" placeholder="Enter password" />
			</FormField>

			<Button type="submit" className="w-full">
				Create Account
			</Button>
		</Form>
	);
};

// Horizontal layout form (for checkboxes)
export const HorizontalLayoutExample = () => {
	return (
		<Form>
			<FormField
				name="newsletter"
				label="Subscribe to newsletter"
				description="Receive updates about new features"
				orientation="horizontal"
			>
				<FormControl type="checkbox" />
			</FormField>

			<FormField
				name="terms"
				label="I agree to the terms and conditions"
				orientation="horizontal"
				required
			>
				<FormControl type="checkbox" />
			</FormField>

			<Button type="submit" className="w-full">
				Continue
			</Button>
		</Form>
	);
};
