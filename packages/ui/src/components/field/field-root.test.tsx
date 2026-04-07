import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "../input";
import { FieldContent } from "./field-content";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";
import { FieldLabel } from "./field-label";
import { Field } from "./field-root";

describe("Field", () => {
  it("wires generated ids into label, description, and error content", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input />
          <FieldDescription>We use this for release notes.</FieldDescription>
          <FieldError>Required field.</FieldError>
        </FieldContent>
      </Field>
    );

    const input = screen.getByLabelText("Email");

    expect(input).toHaveAccessibleDescription(
      "We use this for release notes. Required field."
    );
    expect(screen.getByText("Required field.")).toHaveAttribute(
      "role",
      "alert"
    );
  });
});
