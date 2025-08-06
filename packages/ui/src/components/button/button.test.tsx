import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./component";

describe("button Component", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("should display the correct text", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeDefined();
  });
});
