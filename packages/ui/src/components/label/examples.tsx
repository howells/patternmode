"use client";

import { Field } from "../field/component";
import { Label } from "./component";

export const BasicExample = () => {
	return (
		<Field>
			<Label htmlFor="email">Email Address</Label>
		</Field>
	);
};

export const RequiredExample = () => {
	return (
		<Field>
			<Label htmlFor="name">
				Full Name <span className="text-red-500">*</span>
			</Label>
		</Field>
	);
};

export const DisabledExample = () => {
	return (
		<Field>
			<Label htmlFor="disabled-field" disabled>
				Disabled Field
			</Label>
		</Field>
	);
};

export const CustomStyledExample = () => {
	return (
		<Field>
			<Label className="text-lg font-semibold text-blue-600">
				Important Field
			</Label>
		</Field>
	);
};
