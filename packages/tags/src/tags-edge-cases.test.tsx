// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TagSelector } from "./index";
import type { TagItem } from "./types";

class ResizeObserverMock {
  disconnect = vi.fn<() => void>();
  observe = vi.fn<(target: Element) => void>();
  unobserve = vi.fn<(target: Element) => void>();
}

const OPTIONS: TagItem[] = [
  { id: "accessible", label: "Accessible" },
  { id: "command", label: "Command menu" },
  { id: "keyboard", label: "Keyboard first" },
];

const getItem = (index: number): TagItem => {
  const item = OPTIONS[index];
  if (item === undefined) {
    throw new Error(`Missing option at ${index}`);
  }
  return item;
};

const onCreateItemById = (label: string): TagItem => ({ id: label.toLowerCase(), label });

describe("TagSelector edge cases", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn<(options?: ScrollIntoViewOptions) => void>(),
      writable: true,
    });
    Object.defineProperty(Element.prototype, "getAnimations", {
      configurable: true,
      value: vi.fn<() => Animation[]>(() => []),
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("navigates and selects consumer-provided TagSelector.List options with keyboard", async () => {
    const user = userEvent.setup();
    const Composable = () => {
      const [value, setValue] = useState<TagItem[]>([]);
      return (
        <TagSelector.Root
          aria-label="Custom list"
          onChange={setValue}
          options={OPTIONS}
          value={value}
        >
          <TagSelector.Trigger />
          <TagSelector.Content>
            <TagSelector.Search />
            <TagSelector.List>
              <TagSelector.Option item={getItem(2)} />
            </TagSelector.List>
          </TagSelector.Content>
        </TagSelector.Root>
      );
    };

    render(<Composable />);
    await user.click(screen.getByRole("button", { name: "Custom list" }));
    await user.keyboard("{ArrowDown}{Enter}");

    expect(
      within(screen.getByRole("button", { name: "Custom list" })).getByText("Keyboard first"),
    ).toBeInTheDocument();
  });

  it("splits pasted tags using configured custom separators", async () => {
    const user = userEvent.setup();
    const onCreateItem = vi.fn<(label: string) => TagItem>((label) => ({
      id: label.toLowerCase(),
      label,
    }));
    const Controlled = () => {
      const [value, setValue] = useState<TagItem[]>([]);
      return (
        <TagSelector
          aria-label="Semicolon tags"
          onChange={setValue}
          onCreateItem={onCreateItem}
          options={OPTIONS}
          separators={[";"]}
          value={value}
        />
      );
    };

    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Semicolon tags" }));
    await user.paste("Indoor; Outdoor");

    expect(onCreateItem.mock.calls).toStrictEqual([["Indoor"], ["Outdoor"]]);
  });

  it("clears the search query when committing an already-selected tag", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState<TagItem[]>([getItem(0)]);
      return (
        <TagSelector
          aria-label="Project tags"
          onChange={setValue}
          options={OPTIONS}
          value={value}
        />
      );
    };

    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Project tags" }));
    const search = screen.getByRole("combobox", { name: "Search Project tags" });
    await user.type(search, "Accessible{Enter}");

    expect(search).toHaveValue("");
  });

  it("sets tabIndex=-1 on options and disables the trigger natively when disabled", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TagSelector aria-label="Tags" onChange={() => {}} options={OPTIONS} value={[]} />,
    );

    await user.click(screen.getByRole("button", { name: "Tags" }));
    expect(screen.getByRole("option", { name: "Accessible" })).toHaveAttribute("tabindex", "-1");

    rerender(
      <TagSelector aria-label="Tags" disabled onChange={() => {}} options={OPTIONS} value={[]} />,
    );
    expect(screen.getByRole("button", { name: "Tags" })).toBeDisabled();
  });

  it("does not open a disabled trigger", () => {
    render(
      <TagSelector aria-label="Tags" disabled onChange={() => {}} options={OPTIONS} value={[]} />,
    );
    const trigger = screen.getByRole("button", { name: "Tags" });

    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: "Enter" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("gives renderTag a non-button remove mark that removes the item", () => {
    const onChange = vi.fn<(value: TagItem[]) => void>();
    render(
      <TagSelector
        aria-label="Tags"
        onChange={onChange}
        options={OPTIONS}
        renderTag={({ item, removeProps }) => <span {...removeProps}>{item.label}</span>}
        value={[getItem(0)]}
      />,
    );
    const trigger = screen.getByRole("button", { name: "Tags" });

    expect(trigger.querySelector("button")).toBeNull();
    fireEvent.click(within(trigger).getByText("Accessible"));

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("drops the active option when options change and it is no longer listed", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TagSelector aria-label="Tags" onChange={() => {}} options={OPTIONS} value={[]} />,
    );
    await user.click(screen.getByRole("button", { name: "Tags" }));
    const search = screen.getByRole("combobox", { name: "Search Tags" });
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    expect(search).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Keyboard first" }).id,
    );

    rerender(
      <TagSelector aria-label="Tags" onChange={() => {}} options={[getItem(0)]} value={[]} />,
    );

    expect(search).not.toHaveAttribute("aria-activedescendant");
    await user.keyboard("{Enter}");
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });

  it("keeps earlier async creations when a second paste resolves before React commits value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: TagItem[]) => void>();
    render(
      <TagSelector
        aria-label="Tags"
        onChange={onChange}
        onCreateItem={onCreateItemById}
        options={OPTIONS}
        value={[]}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Tags" }));
    await user.paste("Indoor, Outdoor");
    await user.paste("Patio, Garden");

    expect(onChange).toHaveBeenLastCalledWith([
      { id: "indoor", label: "Indoor" },
      { id: "outdoor", label: "Outdoor" },
      { id: "patio", label: "Patio" },
      { id: "garden", label: "Garden" },
    ]);
  });
});
