"use client";

import { Button } from "@patternmode/button";
import type { FormProps } from "./component";
import { Form, FormControl, FormField } from "./component";

export function FormPreview(props: FormProps) {
  const handleSubmit = async (_data: Record<string, unknown>) => {
    /* noop */
  };

  return (
    <Form onValidSubmit={handleSubmit} {...props}>
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

      <Button className="w-full" type="submit">
        Submit Form
      </Button>
    </Form>
  );
}

// Preview props for prop explorer
export const formPreviewProps: readonly unknown[] = [
  // Note: Form component mainly accepts onValidSubmit callback and schema
  // Most visual customization happens through FormField and FormControl components
  // Schema prop is complex (Zod schema) and not suitable for prop explorer
];
