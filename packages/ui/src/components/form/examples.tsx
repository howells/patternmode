"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import {
  Button,
  Form,
  FormControl,
  FormField,
  Textarea,
} from "@patternmode/ui";
import React from "react";

import { z } from "zod";

export function FormExample() {
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form schema={formSchema} onValidSubmit={handleSubmit}>
      <FormField name="name" label="Full Name" required>
        <FormControl placeholder="Enter your name" />
      </FormField>

      <FormField
        name="email"
        label="Email Address"
        required
        description="We'll never share your email."
      >
        <FormControl type="email" placeholder="Enter your email" />
      </FormField>

      <FormField name="message" label="Message" required>
        <Textarea name="message" placeholder="Enter your message..." />
      </FormField>

      <Button type="submit" fullWidth textAlign="center">
        Submit Form
      </Button>
    </Form>
  );
}

// Export with the expected naming convention
export const DefaultExample = FormExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "FormExample",
    title: "Form",
    description: "Form example",
    component: FormExample,
  },
];
