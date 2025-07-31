import React from "react";
import { Fieldset, FieldsetLegend } from "@patternmode/ui";
import { Field, FieldLabel } from "@patternmode/ui";
import { Input } from "@patternmode/ui";

// Default fieldset
export const DefaultExample = () => (
  <Fieldset>
    <FieldsetLegend>Personal Information</FieldsetLegend>
    <div className="space-y-4">
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <Input />
      </Field>
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <Input />
      </Field>
    </div>
  </Fieldset>
);export const FieldsetExample = DefaultExample;
