"use client";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@patternmode/ui";

export function FieldExample({
  invalid = false,
  disabled = false,
  ...props
}: {
  invalid?: boolean;
  disabled?: boolean;
} & Record<string, unknown>) {
  return (
    <div className="space-y-6" {...props}>
      {/* Basic Field */}
      <Field disabled={disabled}>
        <FieldLabel>Email Address</FieldLabel>
        <FieldControl
          type="email"
          placeholder="Enter your email address"
          defaultValue="john@example.com"
        />
      </Field>

      {/* Field with Description */}
      <Field disabled={disabled}>
        <FieldLabel>Username</FieldLabel>
        <FieldControl placeholder="Choose a username" defaultValue="johndoe" />
        <FieldDescription>
          Your username will be visible to other users and must be unique.
        </FieldDescription>
      </Field>

      {/* Field with Error State */}
      <Field invalid={invalid || undefined} disabled={disabled}>
        <FieldLabel>Password</FieldLabel>
        <FieldControl type="password" placeholder="Enter your password" />
        {(invalid || undefined) && (
          <FieldError>
            Password must be at least 8 characters long and contain a number.
          </FieldError>
        )}
      </Field>

      {/* Field with both Description and Error */}
      <Field invalid={invalid || undefined} disabled={disabled}>
        <FieldLabel>Confirm Password</FieldLabel>
        <FieldControl type="password" placeholder="Confirm your password" />
        <FieldDescription>Re-enter your password to confirm.</FieldDescription>
        {(invalid || undefined) && (
          <FieldError>Passwords do not match.</FieldError>
        )}
      </Field>

      {/* Required Field */}
      <Field disabled={disabled}>
        <FieldLabel>Full Name *</FieldLabel>
        <FieldControl
          placeholder="Enter your full name"
          defaultValue="John Doe"
          required
        />
        <FieldDescription>
          Required field - please provide your full legal name.
        </FieldDescription>
      </Field>
    </div>
  );
}
