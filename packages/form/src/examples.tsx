"use client";

import { Button } from "@patternmode/button";
import { Textarea } from "@patternmode/textarea";
import { z } from "zod";
import { Form, FormControl, FormField } from "./component";

// Basic form with Zod validation
export const DefaultExample = () => {
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  const handleSubmit = async (_data: Record<string, unknown>) => {
    /* noop */
  };

  return (
    <Form onValidSubmit={handleSubmit} schema={formSchema}>
      <FormField label="Full Name" name="name" required>
        <FormControl placeholder="Enter your name" />
      </FormField>

      <FormField
        description="We'll never share your email."
        label="Email Address"
        name="email"
        required
      >
        <FormControl placeholder="Enter your email" type="email" />
      </FormField>

      <FormField label="Message" name="message" required>
        <Textarea name="message" placeholder="Enter your message..." />
      </FormField>

      <Button className="w-full" type="submit">
        Submit Form
      </Button>
    </Form>
  );
};

// Native HTML5 validation
export const HTML5ValidationExample = () => {
  const handleSubmit = async (_data: Record<string, unknown>) => {
    /* noop */
  };

  return (
    <Form onValidSubmit={handleSubmit}>
      <FormField label="Website" name="website" required>
        <FormControl
          pattern="https?://.*"
          placeholder="https://example.com"
          type="url"
        />
      </FormField>

      <FormField label="Phone" name="phone">
        <FormControl
          pattern="[0-9\s\-\(\)]+"
          placeholder="(555) 123-4567"
          type="tel"
        />
      </FormField>

      <Button className="w-full" type="submit">
        Submit
      </Button>
    </Form>
  );
};

// Registration form with custom layout
export const RegistrationFormExample = () => {
  const registrationSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const handleRegistration = (/* data: Record<string, unknown> */) => {
    /* noop */
  };

  return (
    <Form onValidSubmit={handleRegistration} schema={registrationSchema}>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="First Name" name="firstName" required>
          <FormControl placeholder="First name" />
        </FormField>
        <FormField label="Last Name" name="lastName" required>
          <FormControl placeholder="Last name" />
        </FormField>
      </div>

      <FormField label="Email" name="email" required>
        <FormControl placeholder="your@email.com" type="email" />
      </FormField>

      <FormField
        description="Must be at least 8 characters"
        label="Password"
        name="password"
        required
      >
        <FormControl placeholder="Enter password" type="password" />
      </FormField>

      <Button className="w-full" type="submit">
        Create Account
      </Button>
    </Form>
  );
};

// Horizontal layout form (for checkboxes)
export const HorizontalLayoutExample = () => {
  return (
    <Form>
      <FormField
        description="Receive updates about new features"
        label="Subscribe to newsletter"
        name="newsletter"
        orientation="horizontal"
      >
        <FormControl type="checkbox" />
      </FormField>

      <FormField
        label="I agree to the terms and conditions"
        name="terms"
        orientation="horizontal"
        required
      >
        <FormControl type="checkbox" />
      </FormField>

      <Button className="w-full" type="submit">
        Continue
      </Button>
    </Form>
  );
};
