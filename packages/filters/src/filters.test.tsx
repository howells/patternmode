// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AddFilter } from "./add-filter";
import { FilterChip } from "./filter-chip";
import { FilterToolbar } from "./filter-toolbar";
import { SearchField } from "./search-field";
import { PageRange, ToolbarPages } from "./toolbar-pages";

const noop = () => {
  // Intentionally empty test callback.
};

const ControlledSearch = ({ onCommit }: { onCommit: (value: string) => void }) => {
  const [value, setValue] = useState("");

  return (
    <SearchField
      delayMs={100}
      label="Search items"
      onSearch={(next) => {
        onCommit(next);
        setValue(next);
      }}
      placeholder="Search"
      value={value}
    />
  );
};

const TwoScopedToolbars = ({
  onPickA,
  onPickB,
}: {
  onPickA: (id: string) => void;
  onPickB: (id: string) => void;
}) => {
  const scopeA = useRef<HTMLDivElement>(null);
  const scopeB = useRef<HTMLDivElement>(null);

  return (
    <>
      <div data-testid="grid-a" ref={scopeA}>
        <SearchField label="Search A" onSearch={noop} placeholder="A" scopeRef={scopeA} value="" />
        <AddFilter fields={[{ id: "a", label: "Alpha" }]} onPick={onPickA} scopeRef={scopeA} />
      </div>
      <div data-testid="grid-b" ref={scopeB}>
        <SearchField label="Search B" onSearch={noop} placeholder="B" scopeRef={scopeB} value="" />
        <AddFilter fields={[{ id: "b", label: "Beta" }]} onPick={onPickB} scopeRef={scopeB} />
      </div>
    </>
  );
};

describe("filters UI", () => {
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("renders a sentence filter chip and removes it on click", () => {
    const onRemove = vi.fn<() => void>();

    render(
      <FilterToolbar>
        <FilterChip field="Status" onRemove={onRemove} operator="is any of" value="Spec ready" />
      </FilterToolbar>,
    );

    expect(screen.getByText("Status")).toBeDefined();
    expect(screen.getByText("is any of")).toBeDefined();
    expect(screen.getByText("Spec ready")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Remove Status filter" }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("commits SearchField once on Enter without a duplicate debounce fire", () => {
    vi.useFakeTimers();
    const onSearch = vi.fn<(value: string) => void>();

    render(
      <SearchField
        delayMs={150}
        label="Search items"
        onSearch={onSearch}
        placeholder="Search"
        value=""
      />,
    );

    const input = screen.getByRole("searchbox", { name: "Search items" });
    fireEvent.change(input, { target: { value: "  oak  " } });
    fireEvent.keyDown(input, { key: "Enter" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenCalledExactlyOnceWith("oak");
  });

  it("preserves a trailing space in SearchField when controlled value echoes trimmed text", () => {
    vi.useFakeTimers();
    const onCommit = vi.fn<(value: string) => void>();

    render(<ControlledSearch onCommit={onCommit} />);

    const input = screen.getByRole("searchbox", { name: "Search items" });
    fireEvent.change(input, { target: { value: "oak " } });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(onCommit).toHaveBeenCalledWith("oak");
    expect(input instanceof HTMLInputElement && input.value).toBe("oak ");
  });

  it("scopes global shortcuts to the active grid and ignores open modals", () => {
    const onPickA = vi.fn<(id: string) => void>();
    const onPickB = vi.fn<(id: string) => void>();

    render(<TwoScopedToolbars onPickA={onPickA} onPickB={onPickB} />);

    fireEvent.pointerDown(screen.getByTestId("grid-b"));
    fireEvent.keyDown(document, { key: "/" });
    expect(document.activeElement).toBe(screen.getByRole("searchbox", { name: "Search B" }));

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const modal = document.createElement("div");
    modal.setAttribute("aria-modal", "true");
    document.body.append(modal);
    try {
      fireEvent.keyDown(document, { key: "/" });
      expect(document.activeElement).not.toBe(screen.getByRole("searchbox", { name: "Search B" }));
    } finally {
      modal.remove();
    }
  });

  it("renders page range and hides AddFilter when no fields remain", () => {
    const onPick = vi.fn<(id: string) => void>();
    const onNext = vi.fn<() => void>();

    const { container } = render(
      <>
        <AddFilter fields={[]} onPick={onPick} />
        <ToolbarPages
          next={{ onClick: onNext }}
          previous={null}
          range={<PageRange count={25} start={1} total={120} />}
        />
      </>,
    );

    expect(container.textContent).toContain("1–25 of 120");
    expect(screen.queryByRole("button", { name: "Filter" })).toBeNull();
    expect(screen.getByRole("button", { name: "Previous page" }).hasAttribute("disabled")).toBe(
      true,
    );
    expect(screen.getByRole("button", { name: "Next page" }).hasAttribute("disabled")).toBe(false);
  });
});
