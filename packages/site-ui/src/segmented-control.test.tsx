// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SegmentedControl } from "./segmented-control";

const ControlledDensity = ({ onChange }: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState("cozy");

  return (
    <SegmentedControl
      label="Density"
      onChange={(next) => {
        onChange(next);
        setValue(next);
      }}
      options={[
        { label: "Compact", value: "compact" },
        { label: "Cozy", value: "cozy" },
        { label: "Spacious", value: "spacious" },
      ]}
      value={value}
    />
  );
};

const renderDensity = () =>
  render(
    <SegmentedControl
      label="Density"
      onChange={() => {}}
      options={[
        { label: "Compact", value: "compact" },
        { label: "Cozy", value: "cozy" },
        { label: "Spacious", value: "spacious" },
      ]}
      value="cozy"
    />,
  );

describe(SegmentedControl, () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a labelled radiogroup with the selected option checked", () => {
    renderDensity();

    expect(screen.getByRole("radiogroup", { name: "Density" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Cozy" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Compact" })).toHaveAttribute("aria-checked", "false");
  });

  it("gives only the selected option a tab stop", () => {
    renderDensity();

    expect(screen.getByRole("radio", { name: "Cozy" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("radio", { name: "Compact" })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("radio", { name: "Spacious" })).toHaveAttribute("tabindex", "-1");
  });

  it("selects an option on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(
      <SegmentedControl
        label="Density"
        onChange={onChange}
        options={[
          { label: "Compact", value: "compact" },
          { label: "Cozy", value: "cozy" },
        ]}
        value="compact"
      />,
    );

    await user.click(screen.getByRole("radio", { name: "Cozy" }));

    expect(onChange).toHaveBeenCalledWith("cozy");
  });

  it("moves selection, focus and the tab stop with an arrow key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<ControlledDensity onChange={onChange} />);

    screen.getByRole("radio", { name: "Cozy" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenLastCalledWith("spacious");
    expect(screen.getByRole("radio", { name: "Spacious" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "Spacious" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("radio", { name: "Cozy" })).toHaveAttribute("tabindex", "-1");
  });

  it("wraps at both edges", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<ControlledDensity onChange={onChange} />);

    screen.getByRole("radio", { name: "Cozy" }).focus();
    await user.keyboard("{ArrowRight}{ArrowRight}");

    expect(onChange).toHaveBeenLastCalledWith("compact");
    expect(screen.getByRole("radio", { name: "Compact" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");

    expect(onChange).toHaveBeenLastCalledWith("spacious");
    expect(screen.getByRole("radio", { name: "Spacious" })).toHaveFocus();
  });

  it("keeps option keys distinct when values collide across types", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <SegmentedControl<number | string>
        label="Value"
        onChange={() => {}}
        options={[
          { label: "Numeric one", value: 1 },
          { label: "String one", value: "1" },
        ]}
        value={1}
      />,
    );

    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
  });
});
