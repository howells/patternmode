"use client";

import { Button } from "@patternmode/ui";
import { Field, FieldControl, FieldLabel } from "@patternmode/ui";
import { Fieldset, FieldsetLegend } from "@patternmode/ui";

export function FieldsetExample({
  disabled = false,
  ...props
}: {
  disabled?: boolean;
} & Record<string, unknown>) {
  return (
    <Fieldset disabled={disabled} {...props}>
      <FieldsetLegend>Account Settings</FieldsetLegend>
      <div className="space-y-4">
        <Field disabled={disabled}>
          <FieldLabel>Full Name</FieldLabel>
          <FieldControl
            placeholder="Enter your full name"
            defaultValue="John Doe"
          />
        </Field>

        <Field disabled={disabled}>
          <FieldLabel>Email Address</FieldLabel>
          <FieldControl
            type="email"
            placeholder="Enter your email address"
            defaultValue="john@example.com"
          />
        </Field>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            disabled={disabled}
            className="rounded border-zinc-200 dark:border-zinc-700"
            defaultChecked
          />
          <label className="text-sm text-zinc-700 dark:text-zinc-300">
            Send me email notifications
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="default" disabled={disabled}>
            Save Changes
          </Button>
          <Button variant="outline" disabled={disabled}>
            Cancel
          </Button>
        </div>
      </div>
    </Fieldset>
  );
}
