import React from "react";
import { Field, FieldLabel, FieldDescription, FieldError } from "@patternmode/ui";
import { Input } from "@patternmode/ui";

// Default field
export const DefaultExample = () => (
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="Enter your email" />
  </Field>
);

// With description
export const WithDescriptionExample = () => (
  <Field>
    <FieldLabel>Username</FieldLabel>
    <Input placeholder="Enter username" />
    <FieldDescription>Must be at least 3 characters long</FieldDescription>
  </Field>
);

// With error
export const WithErrorExample = () => (
  <Field invalid>
    <FieldLabel>Password</FieldLabel>
    <Input type="password" placeholder="Enter password" />
    <FieldError>Password must be at least 8 characters</FieldError>
  </Field>
);export const FieldExample = DefaultExample;
