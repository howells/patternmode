"use client";

import React from "react";
import {
	RadioCardOption,
	RadioGroup,
	RadioItem,
	RadioOption,
} from "./component";

export const DefaultExample = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>("option1");
	return (
		<RadioGroup
			value={selectedValue}
			onValueChange={(v: unknown) => setSelectedValue(String(v))}
		>
			<div className="flex items-center space-x-2">
				<RadioOption value="option1" label="Option 1" />
			</div>
		</RadioGroup>
	);
};

export const SizesExample = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>("medium");
	return (
		<RadioGroup
			value={selectedValue}
			onValueChange={(v: unknown) => setSelectedValue(String(v))}
		>
			<div className="space-y-4">
				<RadioOption value="small" label="Small Radio" size="sm" />
				<RadioOption value="medium" label="Medium Radio" size="base" />
				<RadioOption value="large" label="Large Radio" size="lg" />
			</div>
		</RadioGroup>
	);
};

export const WithDescriptionExample = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>("pro");
	return (
		<RadioGroup
			value={selectedValue}
			onValueChange={(v: unknown) => setSelectedValue(String(v))}
		>
			<div className="space-y-4">
				<RadioOption
					value="basic"
					label="Basic Plan"
					description="Perfect for individuals getting started"
				/>
				<RadioOption
					value="pro"
					label="Pro Plan"
					description="Best for small teams and growing businesses"
				/>
				<RadioOption
					value="enterprise"
					label="Enterprise Plan"
					description="Advanced features for large organizations"
				/>
			</div>
		</RadioGroup>
	);
};

export const DisabledExample = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>("enabled");
	return (
		<RadioGroup
			value={selectedValue}
			onValueChange={(v: unknown) => setSelectedValue(String(v))}
		>
			<div className="space-y-4">
				<RadioOption
					value="enabled"
					label="Enabled Option"
					description="This option is available"
				/>
				<RadioOption
					value="disabled"
					label="Disabled Option"
					description="This option is not available"
					disabled
				/>
			</div>
		</RadioGroup>
	);
};

export const CardStyleExample = () => {
	const [selectedValue, setSelectedValue] =
		React.useState<string>("professional");
	return (
		<RadioGroup
			value={selectedValue}
			onValueChange={(v: unknown) => setSelectedValue(String(v))}
		>
			<div className="space-y-3">
				<RadioCardOption
					value="starter"
					title="Starter"
					description="Perfect for personal projects and small websites"
				/>
				<RadioCardOption
					value="professional"
					title="Professional"
					description="Ideal for growing businesses and medium-scale applications"
				/>
				<RadioCardOption
					value="enterprise"
					title="Enterprise"
					description="Advanced features for large-scale applications"
				/>
			</div>
		</RadioGroup>
	);
};

export const CustomStructureExample = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>("custom1");
	return (
		<RadioGroup
			value={selectedValue}
			onValueChange={(v: unknown) => setSelectedValue(String(v))}
		>
			<div className="space-y-4">
				<div className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-900 dark:text-zinc-50">
					<RadioItem value="custom1" size="base" />
					<div className="flex flex-col">
						<span className="font-medium">Custom Radio 1</span>
						<span className="text-sm text-zinc-500">
							Built with individual components
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-900 dark:text-zinc-50">
					<RadioItem value="custom2" size="base" />
					<div className="flex flex-col">
						<span className="font-medium">Custom Radio 2</span>
						<span className="text-sm text-zinc-500">
							Custom indicator usage
						</span>
					</div>
				</div>
			</div>
		</RadioGroup>
	);
};
