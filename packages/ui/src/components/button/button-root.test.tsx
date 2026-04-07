import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button-root";

describe("Button", () => {
  it("renders a button element by default", () => {
    render(<Button>Save changes</Button>);

    expect(
      screen.getByRole("button", { name: "Save changes" })
    ).toBeInTheDocument();
  });

  it("supports asChild composition", () => {
    render(
      <Button asChild>
        <a href="/docs">Open docs</a>
      </Button>
    );

    expect(screen.getByRole("link", { name: "Open docs" })).toHaveAttribute(
      "href",
      "/docs"
    );
  });
});
