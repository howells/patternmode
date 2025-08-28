"use client";

import { useId } from "react";
import { Label } from "./component";

export const BasicExample = () => {
	const id = useId();
	return (
		<div>
			<Label htmlFor={id}>Email Address</Label>
			<input id={id} className="mt-2 w-full rounded border p-2" />
		</div>
	);
};

export const RequiredExample = () => {
	const id = useId();
	return (
		<div>
			<Label htmlFor={id}>
				Full Name <span className="text-red-500">*</span>
			</Label>
			<input id={id} className="mt-2 w-full rounded border p-2" />
		</div>
	);
};

export const DisabledExample = () => {
	const id = useId();
	return (
		<div>
			<Label htmlFor={id} disabled>
				Disabled Field
			</Label>
			<input id={id} disabled className="mt-2 w-full rounded border p-2" />
		</div>
	);
};

export const CustomStyledExample = () => {
	const id = useId();
	return (
		<div>
			<Label htmlFor={id} className="text-lg  text-blue-600">
				Important Field
			</Label>
			<input id={id} className="mt-2 w-full rounded border p-2" />
		</div>
	);
};
