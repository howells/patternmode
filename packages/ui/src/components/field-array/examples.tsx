"use client";

import React from "react";
import { Avatar } from "@patternmode/avatar";
import { Button } from "@patternmode/button";
import { Checkbox } from "@patternmode/checkbox";
import { Fieldset } from "../fieldset/component";
import { Grid, GridCell } from "@patternmode/grid";
import { Input } from "@patternmode/input";
import { ScrollArea } from "../scroll-area/component";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@patternmode/select";
import { HStack, Stack, VStack } from "@patternmode/stack";
import { Textarea } from "@patternmode/textarea";
import type { FieldSchema } from "./component";
import { FieldArray } from "./component";

const EMPTY_OPTIONS_ARRAY: any[] = [];

// Example 1: Simple contact list
export function ContactListExample() {
	const [contacts, setContacts] = React.useState([
		{ name: "John Doe", email: "john@example.com", phone: "+1 (555) 123-4567" },
		{
			name: "Jane Smith",
			email: "jane@example.com",
			phone: "+1 (555) 987-6543",
		},
	]);

	const contactSchema: FieldSchema[] = [
		{
			key: "name",
			type: "input",
			defaultValue: "",
			label: "Full Name",
			placeholder: "Enter full name...",
			required: true,
		},
		{
			key: "email",
			type: "input",
			defaultValue: "",
			label: "Email Address",
			placeholder: "Enter email address...",
			required: true,
			props: { type: "email" },
		},
		{
			key: "phone",
			type: "input",
			defaultValue: "",
			label: "Phone Number",
			placeholder: "Enter phone number...",
			props: { type: "tel" },
		},
	];

	return (
		<Stack className="w-96 max-w-full">
			<ScrollArea className="h-96">
				<FieldArray
					items={contacts}
					onItemsChange={setContacts}
					schema={contactSchema}
					minItems={1}
					maxItems={10}
					addButtonText="Add Contact"
					showItemLabels={true}
					itemLabel="Contact"
					componentMap={{
						input: ({ value, onChange, ...props }: any) => (
							<Input
								value={value || ""}
								onChange={(e) => onChange(e.target.value)}
								{...props}
							/>
						),
					}}
				/>
			</ScrollArea>
		</Stack>
	);
}

// Example 2: FAQ Builder
export function FAQBuilderExample() {
	const [faqs, setFaqs] = React.useState([
		{
			question: "What is FieldArray?",
			answer:
				"FieldArray is a generic component for managing dynamic lists of structured data with configurable field schemas.",
		},
		{
			question: "How do I customize field types?",
			answer:
				"Use the componentMap prop to provide custom components for different field types, or extend the default component map.",
		},
	]);

	const faqSchema: FieldSchema[] = [
		{
			key: "question",
			type: "input",
			defaultValue: "",
			label: "Question",
			placeholder: "Enter the question...",
			required: true,
		},
		{
			key: "answer",
			type: "textarea",
			defaultValue: "",
			label: "Answer",
			placeholder: "Enter the answer...",
			required: true,
		},
	];

	return (
		<Stack className="w-96 max-w-full">
			<ScrollArea className="h-96">
				<FieldArray
					items={faqs}
					onItemsChange={setFaqs}
					schema={faqSchema}
					minItems={1}
					addButtonText="Add FAQ Item"
					showItemLabels={true}
					itemLabel="FAQ"
					componentMap={{
						input: ({ value, onChange, ...props }: any) => (
							<Input
								value={value || ""}
								onChange={(e) => onChange(e.target.value)}
								{...props}
							/>
						),
						textarea: ({ value, onChange, ...props }: any) => (
							<Textarea
								value={value || ""}
								onChange={(e) => onChange(e.target.value)}
								{...props}
							/>
						),
					}}
				/>
			</ScrollArea>
		</Stack>
	);
}

// Example 3: Product Variants
export function ProductVariantsExample() {
	const [variants, setVariants] = React.useState([
		{ name: "Small", price: 19.99, stock: 50, available: true },
		{ name: "Medium", price: 24.99, stock: 30, available: true },
		{ name: "Large", price: 29.99, stock: 0, available: false },
	]);

	const variantSchema: FieldSchema[] = [
		{
			key: "name",
			type: "input",
			defaultValue: "",
			label: "Variant Name",
			placeholder: "e.g., Small, Red, XL...",
			required: true,
		},
		{
			key: "price",
			type: "number",
			defaultValue: 0,
			label: "Price ($)",
			placeholder: "0.00",
			required: true,
			props: { step: "0.01", min: "0" },
		},
		{
			key: "stock",
			type: "number",
			defaultValue: 0,
			label: "Stock Quantity",
			placeholder: "0",
			props: { min: "0" },
		},
		{
			key: "available",
			type: "checkbox",
			defaultValue: true,
			label: "Available for Purchase",
		},
	];

	return (
		<Stack className="w-96 max-w-full">
			<ScrollArea className="h-96">
				<FieldArray
					items={variants}
					onItemsChange={setVariants}
					schema={variantSchema}
					minItems={1}
					maxItems={20}
					addButtonText="Add Variant"
					showItemLabels={true}
					itemLabel="Variant"
					componentMap={{
						input: ({ value, onChange, ...props }: any) => (
							<Input
								value={value || ""}
								onChange={(e) => onChange(e.target.value)}
								{...props}
							/>
						),
						number: ({ value, onChange, ...props }: any) => (
							<Input
								type="number"
								value={value || ""}
								onChange={(e) => onChange(Number(e.target.value) || 0)}
								{...props}
							/>
						),
						checkbox: ({ value, onChange, label, ...props }: any) => (
							<HStack gap={2} align="center" className="cursor-pointer">
								<Checkbox
									checked={!!value}
									onCheckedChange={(checked) => onChange(!!checked)}
									{...props}
								/>
								<span className="text-sm">{label}</span>
							</HStack>
						),
					}}
				/>
			</ScrollArea>
		</Stack>
	);
}

// Example 5: Custom Render Function
export function CustomRenderExample() {
	type TeamMember = {
		name: string;
		role: string;
		department: string;
	};

	const [team, setTeam] = React.useState<TeamMember[]>([
		{ name: "Alice Johnson", role: "admin", department: "Engineering" },
		{ name: "Bob Wilson", role: "user", department: "Design" },
	]);

	const teamSchema: FieldSchema[] = [
		{
			key: "name",
			type: "input",
			defaultValue: "",
			label: "Full Name",
			required: true,
		},
		{
			key: "role",
			type: "select",
			defaultValue: "user",
			label: "Role",
			options: [
				{ label: "User", value: "user" },
				{ label: "Admin", value: "admin" },
				{ label: "Manager", value: "manager" },
			],
		},
		{
			key: "department",
			type: "input",
			defaultValue: "",
			label: "Department",
		},
	];

	return (
		<Stack className="w-96 max-w-full">
			<ScrollArea className="h-96">
				<FieldArray
					items={team}
					onItemsChange={setTeam}
					schema={teamSchema}
					minItems={1}
					addButtonText="Add Team Member"
					showItemLabels={true}
					itemLabel="Member"
					componentMap={{
						input: ({ value, onChange, ...props }: any) => (
							<Input
								value={value || ""}
								onChange={(e) => onChange(e.target.value)}
								{...props}
							/>
						),
						select: ({
							value,
							onChange,
							options = EMPTY_OPTIONS_ARRAY,
							...props
						}: any) => (
							<Select value={value || ""} onValueChange={onChange} {...props}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{options.map((option: any) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						),
					}}
					renderItem={(item, _index, { updateItem, removeItem }) => (
						<Fieldset>
							<HStack justify="between" align="center">
								<HStack gap={3} align="center">
									<Avatar
										initials={
											item.name && typeof item.name === "string"
												? item.name
														.split(" ")
														.map((n: string) => n[0])
														.join("")
												: "?"
										}
										size="base"
										dynamicBackground
									/>
									<VStack gap={1}>
										<div className="font-medium text-sm">
											{item.name || "Unnamed Member"}
										</div>
										<div className="text-xs text-zinc-500">
											{item.role} • {item.department}
										</div>
									</VStack>
								</HStack>
								<Button
									variant="ghost"
									size="sm"
									onClick={removeItem}
									className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
								>
									Remove
								</Button>
							</HStack>

							<Grid columns={{ sm: 1, md: 3 }} gap={4}>
								{teamSchema.map((field) => (
									<GridCell key={field.key}>
										<VStack gap={1}>
											<label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
												{field.label}
											</label>
											{field.type === "select" ? (
												<Select
													value={item[field.key] || ""}
													onValueChange={(value) =>
														updateItem({ [field.key]: value })
													}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{field.options?.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											) : (
												<Input
													value={item[field.key] || ""}
													onChange={(e) =>
														updateItem({ [field.key]: e.target.value })
													}
													placeholder={field.placeholder}
												/>
											)}
										</VStack>
									</GridCell>
								))}
							</Grid>
						</Fieldset>
					)}
				/>
			</ScrollArea>
		</Stack>
	);
}
