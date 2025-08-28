"use client";

import type { Size } from "@patternmode/config/sizes";
import { Check } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectPortal,
	SelectPositioner,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./component";

type SelectPreviewProps = {
	placeholder?: string;
	disabled?: boolean;
	hasError?: boolean;
	size?: Size;
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: unknown) => void;
};

export function SelectPreview(props: SelectPreviewProps) {
	return (
		<Select
			defaultValue={props.defaultValue}
			value={props.value}
			onValueChange={props.onValueChange}
			disabled={props.disabled}
		>
			<SelectTrigger hasError={props.hasError}>
				<SelectValue />
			</SelectTrigger>
			<SelectPortal>
				<SelectContent
					sideOffset={8}
					align="start"
					alignItemWithTrigger={false}
				>
					<SelectItem value="apple">
						<Select.ItemIndicator>
							<Check className="size-3" />
						</Select.ItemIndicator>
						<Select.ItemText>Apple</Select.ItemText>
					</SelectItem>
					<SelectItem value="banana">
						<Select.ItemIndicator>
							<Check className="size-3" />
						</Select.ItemIndicator>
						<Select.ItemText>Banana</Select.ItemText>
					</SelectItem>
					<SelectItem value="orange">
						<Select.ItemIndicator>
							<Check className="size-3" />
						</Select.ItemIndicator>
						<Select.ItemText>Orange</Select.ItemText>
					</SelectItem>
					<SelectSeparator />
					<SelectItem value="grape">
						<Select.ItemText>Grape</Select.ItemText>
						<Select.ItemIndicator>
							<Check className="size-3" />
						</Select.ItemIndicator>
					</SelectItem>
					<SelectItem value="strawberry">
						<Select.ItemText>Strawberry</Select.ItemText>
						<Select.ItemIndicator>
							<Check className="size-3" />
						</Select.ItemIndicator>
					</SelectItem>
					<SelectItem value="pineapple">
						<Select.ItemIndicator>
							<Check className="size-3" />
						</Select.ItemIndicator>
						<Select.ItemText>Pineapple</Select.ItemText>
					</SelectItem>
				</SelectContent>
			</SelectPortal>
		</Select>
	);
}

export const selectPreviewProps = [
	{ name: "placeholder", type: "string", defaultValue: "Select a fruit..." },
	{ name: "disabled", type: "boolean", defaultValue: false },
	{ name: "hasError", type: "boolean", defaultValue: false },
	{
		name: "size",
		type: "select",
		options: ["xs", "sm", "base", "lg"],
		defaultValue: "base",
	},
	{ name: "defaultValue", type: "string", defaultValue: "" },
];
