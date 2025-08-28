"use client";

import React from "react";
import { RadioGroup, RadioOption } from "./component";

export type RadioPreviewProps = { defaultValue?: string; disabled?: boolean };

export function RadioPreview({
	defaultValue = "a",
	disabled = false,
}: RadioPreviewProps) {
	const [value, setValue] = React.useState(defaultValue);
	return (
		<div className="p-6">
			<RadioGroup
				value={value}
				onValueChange={(v: unknown) => setValue(String(v))}
			>
				<div className="space-y-2">
					<RadioOption value="a" label="Option A" disabled={disabled} />
					<RadioOption value="b" label="Option B" disabled={disabled} />
				</div>
			</RadioGroup>
		</div>
	);
}

export const radioPreviewProps = [
	{ name: "defaultValue", type: "string", defaultValue: "a" },
	{ name: "disabled", type: "boolean", defaultValue: false },
];
