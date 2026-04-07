import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Combobox } from "./combobox-root";

const items = [
  { label: "Patternmode Default", value: "default" },
  { label: "Quiet Editorial", value: "quiet" },
  { label: "Accent Lift", value: "accent" },
];

describe("Combobox", () => {
  it("renders the selected label and filters choices", async () => {
    const user = userEvent.setup();

    render(<Combobox items={items} value="quiet" />);

    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search…"), "accent");

    expect(screen.getByText("Accent Lift")).toBeInTheDocument();
    expect(screen.queryByText("Patternmode Default")).not.toBeInTheDocument();
  });

  it("calls back with the selected value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Combobox items={items} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Patternmode Default"));

    expect(onValueChange).toHaveBeenCalledWith("default");
  });
});
