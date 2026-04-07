import { defineAnatomy } from "../../lib/anatomy";

/**
 * Field component anatomy.
 * Documents the composition structure for form fields with labels, inputs, and feedback.
 */
export const fieldAnatomy = defineAnatomy({
  slot: "field",
  label: "Field",
  description: "Form field container with label, input, and feedback",
  children: [
    {
      slot: "field-label",
      label: "FieldLabel",
      description: "Accessible label for the field",
    },
    {
      slot: "field-content",
      label: "FieldContent",
      description: "Container for input and messages",
      children: [
        {
          slot: "field-description",
          label: "FieldDescription",
          description: "Helper text or instructions",
        },
        {
          slot: "field-error",
          label: "FieldError",
          description: "Validation error messages",
        },
      ],
    },
  ],
});

/**
 * FieldGroup component anatomy.
 * Documents the composition structure for grouping multiple fields.
 */
export const fieldGroupAnatomy = defineAnatomy({
  slot: "field-group",
  label: "FieldGroup",
  description: "Container for grouping multiple fields",
  children: [
    {
      slot: "field",
      label: "Field",
      description: "Individual form field",
    },
  ],
});
