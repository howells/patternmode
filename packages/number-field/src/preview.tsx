"use client";

import React from "react";
import { NumberField } from "./component";

export type NumberFieldPreviewProps = {
	defaultValue?: number;
	disabled?: boolean;
	showSteppers?: boolean;
};

export function NumberFieldPreview({
	defaultValue = 0,
	disabled = false,
	showSteppers = true,
}: NumberFieldPreviewProps) {
	const [value, setValue] = React.useState<number>(defaultValue);
	return (
		<div className="p-6">
    <NumberField
        value={value}
        onValueChange={(v: number | null) => setValue(v ?? 0)}
        disabled={disabled}
        showSteppers={showSteppers}
        label="Amount"
    />
		</div>
	);
}

export const numberFieldPreviewProps = [
	{ name: "defaultValue", type: "number", defaultValue: 0 },
	{ name: "disabled", type: "boolean", defaultValue: false },
	{ name: "showSteppers", type: "boolean", defaultValue: true },
];
