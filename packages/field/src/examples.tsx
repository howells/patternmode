"use client";

import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from ".";

// Default field
export const DefaultExample = () => (
  <Field>
    <FieldLabel>Email</FieldLabel>
    <FieldControl placeholder="Enter your email" type="email" />
  </Field>
);

// With description
export const WithDescriptionExample = () => (
  <Field>
    <FieldLabel>Username</FieldLabel>
    <FieldControl placeholder="Enter username" />
    <FieldDescription>Must be at least 3 characters long</FieldDescription>
  </Field>
);

// With error
export const WithErrorExample = () => (
  <Field invalid>
    <FieldLabel>Password</FieldLabel>
    <FieldControl placeholder="Enter password" type="password" />
    <FieldError>Password must be at least 8 characters</FieldError>
  </Field>
);

// Complete field
export const CompleteFieldExample = () => (
  <Field>
    <FieldLabel>Full Name</FieldLabel>
    <FieldControl placeholder="Enter your full name" required />
    <FieldDescription>This will be displayed on your profile.</FieldDescription>
    <FieldError match="valueMissing">Please enter your full name.</FieldError>
  </Field>
);
