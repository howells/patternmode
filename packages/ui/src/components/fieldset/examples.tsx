import { Field, FieldLabel, Fieldset, FieldsetLegend, Input } from "@patternmode/ui";
import React from "react";

// Default fieldset
export const /**
              *
              */
  DefaultExample = () => (
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
  ); export const /**
                   *
                   */
  FieldsetExample = DefaultExample;
