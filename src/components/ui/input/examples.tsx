import React from "react";
import { Input } from "./input";

export function InputExample() {
  return <Input placeholder="Enter text..." />;
}

export function SizesExample() {
  return (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="base" placeholder="Base input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
}

export function TypesExample() {
  return (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="search" placeholder="Search input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </div>
  );
}

export function StatesExample() {
  return (
    <div className="space-y-4">
      <Input placeholder="Normal input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Error input" hasError />
      <Input placeholder="Required input" required />
    </div>
  );
}

export function SearchExample() {
  return <Input type="search" placeholder="Search components..." />;
}

export function PasswordExample() {
  return <Input type="password" placeholder="Enter password" />;
}

export function NumberExample() {
  return (
    <div className="space-y-4">
      <Input type="number" placeholder="With stepper" />
      <Input type="number" placeholder="Without stepper" enableStepper={false} />
    </div>
  );
}

export function FileExample() {
  return <Input type="file" />;
}

export function PrefixSuffixTextExample() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter domain" prefixText="https://" />
      <Input placeholder="Enter username" suffixText="@company.com" />
      <Input placeholder="Website" prefixText="https://" suffixText=".com" />
    </div>
  );
}

export function PrefixSuffixStylingExample() {
  return (
    <div className="space-y-4">
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
}

export function PrefixSuffixIconsExample() {
  // This example is meant to be used with the prop explorer
  // where the user can set prefixIcon and suffixIcon
  return <Input placeholder="Search and submit..." />;
}

export function MixedPrefixSuffixExample() {
  // This example is meant to be used with the prop explorer
  // where the user can set prefixText and suffixIcon
  return <Input placeholder="Enter your email" />;
}