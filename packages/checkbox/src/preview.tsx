"use client";

import { Field } from "@base-ui-components/react/field";
import { Label } from "@patternmode/label";
import React from "react";
import { Checkbox } from "./component";

export type CheckboxPreviewProps = {
	checked?: boolean | "indeterminate";
	disabled?: boolean;
};

export function CheckboxPreview({ checked, disabled }: CheckboxPreviewProps) {
	const [state, setState] = React.useState<
		boolean | "indeterminate" | undefined
	>(checked);
	const id = React.useId();
	return (
		<Field.Root>
			<Label htmlFor={id} className="flex items-center gap-2">
				<Checkbox
					id={id}
					checked={state}
					disabled={disabled}
					onCheckedChange={(v: boolean | "indeterminate") => setState(v)}
				/>
				{String(state ?? "unchecked")}
			</Label>
		</Field.Root>
	);
}

export const checkboxPreviewProps = [
	{
		name: "checked",
		type: "select",
		options: [true, false, "indeterminate"],
		defaultValue: false,
	},
	{ name: "disabled", type: "boolean", defaultValue: false },
];
