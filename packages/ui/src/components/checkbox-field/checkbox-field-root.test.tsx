import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CheckboxField } from "./checkbox-field-root";

describe("CheckboxField", () => {
  it("wires the label and description to the checkbox", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxField
        description="Required for package-level review confidence."
        label="Package-owned stories for every primitive"
      />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Package-owned stories for every primitive",
    });

    expect(checkbox).toHaveAccessibleDescription(
      "Required for package-level review confidence."
    );
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    await user.click(
      screen.getByText("Package-owned stories for every primitive")
    );

    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });
});
