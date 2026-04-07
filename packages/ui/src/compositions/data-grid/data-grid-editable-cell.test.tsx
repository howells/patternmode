import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataGridEditableCell } from "./data-grid-editable-cell";

afterEach(cleanup);

describe("DataGridEditableCell", () => {
  it("renders the value as text when not editing", () => {
    render(<DataGridEditableCell value="hello" onSave={vi.fn()} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("enters editing mode on double-click", async () => {
    render(<DataGridEditableCell value="hello" onSave={vi.fn()} />);
    const span = screen.getByText("hello");
    fireEvent.doubleClick(span);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onSave with the draft value on blur", async () => {
    const onSave = vi.fn();
    render(<DataGridEditableCell value="hello" onSave={onSave} />);

    fireEvent.doubleClick(screen.getByText("hello"));
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "world" } });
    fireEvent.blur(input);

    expect(onSave).toHaveBeenCalledWith("world");
    // Should exit editing mode
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("calls onSave on Enter key", async () => {
    const onSave = vi.fn();
    render(<DataGridEditableCell value="hello" onSave={onSave} />);

    fireEvent.doubleClick(screen.getByText("hello"));
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "updated" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSave).toHaveBeenCalledWith("updated");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("reverts draft and exits editing on Escape", async () => {
    const onSave = vi.fn();
    render(<DataGridEditableCell value="hello" onSave={onSave} />);

    fireEvent.doubleClick(screen.getByText("hello"));
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.keyDown(input, { key: "Escape" });

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("handles numeric values", () => {
    render(<DataGridEditableCell value={42} onSave={vi.fn()} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("syncs draft when value prop changes externally", () => {
    const { rerender } = render(
      <DataGridEditableCell value="initial" onSave={vi.fn()} />,
    );
    rerender(<DataGridEditableCell value="updated" onSave={vi.fn()} />);
    expect(screen.getByText("updated")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <DataGridEditableCell
        value="hello"
        onSave={vi.fn()}
        className="custom-class"
      />,
    );
    const span = screen.getByText("hello");
    expect(span.className).toContain("custom-class");
  });
});
