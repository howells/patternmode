"use client";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@patternmode/field";
import { Fieldset, FieldsetLegend } from "./component";

// Default fieldset
export const DefaultExample = () => (
  <Fieldset>
    <FieldsetLegend>Personal Information</FieldsetLegend>
    <div className="space-y-4">
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <FieldControl placeholder="Enter your first name" />
      </Field>
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <FieldControl placeholder="Enter your last name" />
      </Field>
    </div>
  </Fieldset>
);

// Contact information fieldset
export const ContactFieldsetExample = () => (
  <Fieldset>
    <FieldsetLegend>Contact Details</FieldsetLegend>
    <div className="space-y-4">
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <FieldControl placeholder="your@email.com" type="email" />
      </Field>
      <Field>
        <FieldLabel>Phone Number</FieldLabel>
        <FieldControl placeholder="(555) 123-4567" type="tel" />
      </Field>
      <Field>
        <FieldLabel>Address</FieldLabel>
        <FieldControl placeholder="Street address" />
      </Field>
    </div>
  </Fieldset>
);

// Settings fieldset with descriptions
export const SettingsFieldsetExample = () => (
  <Fieldset>
    <FieldsetLegend>Notification Preferences</FieldsetLegend>
    <div className="space-y-4">
      <Field>
        <FieldLabel>Email Notifications</FieldLabel>
        <FieldControl type="checkbox" />
        <FieldDescription>
          Receive email updates about your account
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>SMS Notifications</FieldLabel>
        <FieldControl type="checkbox" />
        <FieldDescription>Receive text message alerts</FieldDescription>
      </Field>
    </div>
  </Fieldset>
);

// Disabled fieldset
export const DisabledFieldsetExample = () => (
  <Fieldset disabled>
    <FieldsetLegend>Billing Information</FieldsetLegend>
    <div className="space-y-4">
      <Field>
        <FieldLabel>Credit Card</FieldLabel>
        <FieldControl disabled placeholder="**** **** **** 1234" />
      </Field>
      <Field>
        <FieldLabel>Expiry Date</FieldLabel>
        <FieldControl disabled placeholder="MM/YY" />
      </Field>
    </div>
  </Fieldset>
);
