"use client";

import { Mail, Search as SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./component";

export const DefaultExample = () => <Input placeholder="Enter your name" />;

export const SizesExample = () => (
	<div className="space-y-3">
		<Input size="xs" placeholder="Extra small" />
		<Input size="sm" placeholder="Small" />
		<Input size="base" placeholder="Base" />
		<Input size="lg" placeholder="Large" />
	</div>
);

export const TypesExample = () => (
	<div className="space-y-3">
		<Input type="text" placeholder="Text" />
		<Input type="email" placeholder="Email" prefixIcon={Mail} />
		<Input type="password" placeholder="Password" />
		<Input type="search" placeholder="Search" />
		<Input type="number" placeholder="Quantity" />
	</div>
);

export const PasswordExample = () => (
	<Input type="password" placeholder="Enter password" />
);

export const SearchExample = () => (
	<Input type="search" placeholder="Search..." prefixIcon={SearchIcon} />
);

export const PrefixSuffixTextExample = () => (
	<Input placeholder="Amount" prefixText="$" suffixText="USD" />
);

export const PrefixSuffixIconsExample = () => (
	<Input placeholder="Email" prefixIcon={Mail} />
);

export const PrefixSuffixStylingExample = () => (
	<Input placeholder="Custom styling" prefixText="@" prefixStyling={false} />
);

export const MixedPrefixSuffixExample = () => (
	<Input placeholder="Email" prefixIcon={Mail} suffixText=",com" />
);

export const NumberExample = () => <Input type="number" placeholder="0" />;

export const FileExample = () => <Input type="file" />;

export const StatesExample = () => (
	<div className="space-y-3">
		<Input placeholder="Disabled" disabled />
		<Input placeholder="Error" hasError />
	</div>
);
