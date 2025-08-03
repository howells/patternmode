"use client";

import React from "react";
import { Input } from "./component";

export const DefaultExample = () => {
  return <Input placeholder="Enter text..." />;
};

export const SizesExample = () => {
  return (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="base" placeholder="Base input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
};

export const TypesExample = () => {
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
};

export const StatesExample = () => {
  return (
    <div className="space-y-4">
      <Input placeholder="Normal input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Error input" hasError />
      <Input placeholder="Required input" required />
    </div>
  );
};

export const SearchExample = () => {
  return <Input type="search" placeholder="Search components..." />;
};

export const PasswordExample = () => {
  return <Input type="password" placeholder="Enter password" />;
};

export const NumberExample = () => {
  return (
    <div className="space-y-4">
      <Input type="number" placeholder="With stepper" />
      <Input type="number" placeholder="Without stepper" enableStepper={false} />
    </div>
  );
};

export const FileExample = () => {
  return <Input type="file" />;
};

export const PrefixSuffixTextExample = () => {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter domain" prefixText="https://" />
      <Input placeholder="Enter username" suffixText="@company.com" />
      <Input placeholder="Website" prefixText="https://" suffixText=".com" />
    </div>
  );
};

export const PrefixSuffixStylingExample = () => {
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
};

export const PrefixSuffixIconsExample = () => {
  // This example is meant to be used with the prop explorer
  // where the user can set prefixIcon and suffixIcon
  return <Input placeholder="Search and submit..." />;
};

export const MixedPrefixSuffixExample = () => {
  // This example is meant to be used with the prop explorer
  // where the user can set prefixText and suffixIcon
  return <Input placeholder="Enter your email" />;
};
