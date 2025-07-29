import React from "react";
import { z } from "zod";
import { Button } from "../button/button";
import { Textarea } from "../textarea/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormLabel,
} from "@patternmode/ui";

// Define validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function FormExample() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Form submitted with data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form
        schema={formSchema}
        onValidSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormField name="name" label="Full Name" required>
          <FormControl placeholder="Enter your name" />
        </FormField>

        <FormField
          name="email"
          label="Email Address"
          required
          description="We'll never share your email with anyone else."
        >
          <FormControl type="email" placeholder="Enter your email" />
        </FormField>

        <FormField
          name="message"
          label="Message"
          required
          description="Tell us what you're thinking about."
        >
          <Textarea
            name="message"
            rows={3}
            placeholder="Enter your message..."
            className="resize-none"
          />
        </FormField>

        <Button type="submit" fullWidth textAlign="center">
          Submit Form
        </Button>
      </Form>
    </div>
  );
}
