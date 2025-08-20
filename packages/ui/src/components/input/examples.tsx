"use client";

import { Input } from "./component";

export const DefaultExample = () => {
	return <Input placeholder="Enter text..." />;
};

export const SizesExample = () => {
	return (
		<div className="space-y-4 w-full max-w-96">
			<Input size="xs" placeholder="Extra small input" />
			<Input size="sm" placeholder="Small input" />
			<Input size="base" placeholder="Base input" />
			<Input size="lg" placeholder="Large input" />
		</div>
	);
};

export const TypesExample = () => {
	return (
		<div className="space-y-4 w-full max-w-96">
			<Input type="text" placeholder="Text input" />
			<Input type="email" placeholder="Email input" />
			<Input type="password" placeholder="Password input" />
			<Input type="search" placeholder="Search input" />
			<Input type="number" placeholder="Number input" />
			<Input type="tel" placeholder="Phone input" />
			<Input type="url" placeholder="URL input" />
		</div>
	);
};

export const StatesExample = () => {
	return (
		<div className="space-y-4 w-full max-w-96">
			<Input placeholder="Normal input" />
			<Input placeholder="Disabled input" disabled />
			<Input placeholder="Error input" hasError />
			<Input placeholder="Required input" required />
		</div>
	);
};

export const SearchExample = () => {
	return (
		<Input
			type="search"
			placeholder="Search components..."
			className="w-full max-w-96"
		/>
	);
};

export const PasswordExample = () => {
	return (
		<Input
			type="password"
			placeholder="Enter password"
			className="w-full max-w-96"
		/>
	);
};

export const NumberExample = () => {
	return (
		<div className="space-y-4 w-full max-w-96">
			<Input
				type="number"
				placeholder="With stepper"
				className="w-full max-w-96"
			/>
			<Input
				type="number"
				placeholder="Without stepper"
				enableStepper={false}
				className="w-full max-w-96"
			/>
		</div>
	);
};

export const FileExample = () => {
	return <Input type="file" className="w-full max-w-96" />;
};

export const PrefixSuffixTextExample = () => {
	return (
		<div className="space-y-4 w-full max-w-96">
			<Input
				placeholder="Enter domain"
				prefixText="https://"
				className="w-full max-w-96"
			/>
			<Input
				placeholder="Enter username"
				suffixText="@company.com"
				className="w-full max-w-96"
			/>
			<Input
				placeholder="Website"
				prefixText="https://"
				suffixText=".com"
				className="w-full max-w-96"
			/>
		</div>
	);
};

export const PrefixSuffixStylingExample = () => {
	return (
		<div className="space-y-4 w-full max-w-96">
			<Input placeholder="Styled" prefixText="$" suffixText="USD" />
			<Input
				placeholder="Unstyled"
				prefixText="$"
				suffixText="USD"
				prefixStyling={false}
				suffixStyling={false}
			/>
		</div>
	);
};

export const PrefixSuffixIconsExample = () => {
	// This example is meant to be used with the prop explorer
	// where the user can set prefixIcon and suffixIcon
	return (
		<Input placeholder="Search and submit..." className="w-full max-w-96" />
	);
};

export const MixedPrefixSuffixExample = () => {
	// This example is meant to be used with the prop explorer
	// where the user can set prefixText and suffixIcon
	return <Input placeholder="Enter your email" className="w-full max-w-96" />;
};
