"use client";

import { Mail, Search as SearchIcon } from "lucide-react";
import { Input } from "./component";

export const DefaultExample = () => <Input placeholder="Enter your name" />;

export const SizesExample = () => (
  <div className="space-y-3">
    <Input placeholder="Extra small" size="xs" />
    <Input placeholder="Small" size="sm" />
    <Input placeholder="Base" size="base" />
    <Input placeholder="Large" size="lg" />
  </div>
);

export const TypesExample = () => (
  <div className="space-y-3">
    <Input placeholder="Text" type="text" />
    <Input placeholder="Email" prefixIcon={Mail} type="email" />
    <Input placeholder="Password" type="password" />
    <Input placeholder="Search" type="search" />
    <Input placeholder="Quantity" type="number" />
  </div>
);

export const PasswordExample = () => (
  <Input placeholder="Enter password" type="password" />
);

export const SearchExample = () => (
  <Input placeholder="Search..." prefixIcon={SearchIcon} type="search" />
);

export const PrefixSuffixTextExample = () => (
  <Input placeholder="Amount" prefixText="$" suffixText="USD" />
);

export const PrefixSuffixIconsExample = () => (
  <Input placeholder="Email" prefixIcon={Mail} />
);

export const PrefixSuffixStylingExample = () => (
  <Input placeholder="Custom styling" prefixStyling={false} prefixText="@" />
);

export const MixedPrefixSuffixExample = () => (
  <Input placeholder="Email" prefixIcon={Mail} suffixText=",com" />
);

export const NumberExample = () => <Input placeholder="0" type="number" />;

export const FileExample = () => <Input type="file" />;

export const StatesExample = () => (
  <div className="space-y-3">
    <Input disabled placeholder="Disabled" />
    <Input hasError placeholder="Error" />
  </div>
);
