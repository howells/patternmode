// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Badge, Tag, TagSelector } from "./index";
import type { TagItem } from "./types";

class ResizeObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const options: TagItem[] = [
  { id: "accessible", label: "Accessible" },
  { id: "command", label: "Command menu" },
  { id: "keyboard", label: "Keyboard first" },
  { id: "duplicate-a", label: "Duplicate" },
  { id: "duplicate-b", label: "Duplicate" },
  { disabled: true, id: "locked", label: "Locked" },
];

const ControlledTagSelector = ({
  defaultValue = [],
  onCreateItem,
  ...props
}: {
  defaultValue?: TagItem[];
  filterOption?: (item: TagItem, query: string) => boolean;
  name?: string;
  onCreateItem?: (label: string) => Promise<TagItem> | TagItem;
  options?: TagItem[];
  searchValue?: string;
  serializeItem?: (item: TagItem) => string;
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TagSelector
      aria-label="Project tags"
      onChange={setValue}
      onCreateItem={onCreateItem}
      options={props.options ?? options}
      placeholder="Select tags"
      value={value}
      {...props}
    />
  );
};

describe("TagSelector", () => {
  it("uses the shadcn badge base and lets tags extend badge variants", () => {
    render(
      <>
        <Badge variant="outline">Badge</Badge>
        <Tag variant="destructive">Needs review</Tag>
      </>,
    );

    expect(screen.getByText("Badge")).toHaveAttribute("data-slot", "badge");
    expect(screen.getByText("Badge")).toHaveAttribute("data-variant", "outline");
    const tag = screen.getByText("Needs review").closest("[data-slot='tag']");
    expect(tag).toHaveAttribute("data-slot", "tag");
    expect(tag).toHaveAttribute("data-variant", "destructive");
  });

  it("exports TagSelector as the public selector API without a TagsInput alias", async () => {
    const publicApi = await import("./index");

    expect(publicApi.TagSelector).toBeDefined();
    expect("TagsInput" in publicApi).toBe(false);
  });

  it("renders selected TagItems in a ScrollFrame-backed trigger and opens popover content", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <ControlledTagSelector defaultValue={[options[0] as TagItem, options[1] as TagItem]} />,
    );

    const trigger = screen.getByRole("button", { name: "Project tags" });
    expect(trigger).toHaveAttribute("data-slot", "tag-selector-trigger");
    expect(within(trigger).getByTestId("tag-selector-selected-scroll")).toHaveAttribute(
      "data-slot",
      "scrollframe",
    );
    expect(within(trigger).getByText("Accessible")).toBeInTheDocument();
    expect(within(trigger).getByText("Command menu")).toBeInTheDocument();

    await user.click(trigger);

    expect(
      container.ownerDocument.querySelector('[data-slot="tag-selector-list"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search Project tags" })).toBeInTheDocument();
  });

  it("keeps selected options visible and toggles them by id", async () => {
    const user = userEvent.setup();

    render(<ControlledTagSelector defaultValue={[options[0] as TagItem]} />);

    await user.click(screen.getByRole("button", { name: "Project tags" }));

    const selectedOption = screen.getByRole("option", { name: "Accessible" });
    expect(selectedOption).toHaveAttribute("aria-selected", "true");

    await user.click(selectedOption);
    expect(
      within(screen.getByRole("button", { name: "Project tags" })).queryByText("Accessible"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Command menu" }));
    expect(
      within(screen.getByRole("button", { name: "Project tags" })).getByText("Command menu"),
    ).toBeInTheDocument();
  });

  it("creates items through the create option after matching options", async () => {
    const user = userEvent.setup();
    const onCreateItem = vi.fn((label: string) => ({
      id: label.toLowerCase().replaceAll(/\s+/gu, "-"),
      label,
    }));

    render(<ControlledTagSelector onCreateItem={onCreateItem} />);

    await user.click(screen.getByRole("button", { name: "Project tags" }));
    await user.type(screen.getByRole("textbox", { name: "Search Project tags" }), "a");

    const optionTexts = screen
      .getAllByRole("option")
      .map((option) => option.textContent?.replaceAll(/\s+/gu, " ").trim());
    expect(optionTexts.at(-1)).toBe('Create "a"');

    await user.click(screen.getByRole("option", { name: 'Create "a"' }));

    expect(onCreateItem).toHaveBeenCalledWith("a");
    expect(
      within(screen.getByRole("button", { name: "Project tags" })).getByText("a"),
    ).toBeInTheDocument();
  });

  it("resolves exact draft matches to existing options and leaves ambiguous labels explicit", async () => {
    const user = userEvent.setup();
    const onCreateItem = vi.fn((label: string) => ({
      id: `new-${label}`,
      label,
    }));

    render(<ControlledTagSelector onCreateItem={onCreateItem} />);

    await user.click(screen.getByRole("button", { name: "Project tags" }));
    const search = screen.getByRole("textbox", { name: "Search Project tags" });

    await user.type(search, "Accessible{Enter}");
    expect(onCreateItem).not.toHaveBeenCalled();
    expect(
      within(screen.getByRole("button", { name: "Project tags" })).getByText("Accessible"),
    ).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "Duplicate{Enter}");
    expect(onCreateItem).not.toHaveBeenCalled();
    expect(
      within(screen.getByRole("button", { name: "Project tags" })).queryByText("Duplicate"),
    ).not.toBeInTheDocument();
  });

  it("creates multiple pasted labels through onCreateItem and serializes selected ids", async () => {
    const user = userEvent.setup();
    const onCreateItem = vi.fn((label: string) => ({
      id: label.toLowerCase(),
      label,
    }));

    render(
      <ControlledTagSelector
        defaultValue={[options[0] as TagItem]}
        name="tags"
        onCreateItem={onCreateItem}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Project tags" }));
    await user.paste("Indoor, Outdoor");

    expect(onCreateItem).toHaveBeenCalledTimes(2);
    expect(screen.getAllByDisplayValue(/accessible|indoor|outdoor/u)).toHaveLength(3);
  });

  it("supports controlled search, custom filtering, and custom renderers", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(
      <TagSelector
        aria-label="Project tags"
        filterOption={(item, query) => item.id.startsWith(query)}
        onChange={() => {}}
        onSearchChange={onSearchChange}
        options={options}
        renderOption={({ item, optionProps }) => (
          <button {...optionProps}>Custom option {item.label}</button>
        )}
        renderTag={({ item }) => (
          <span>
            Custom tag {item.label}
            <span>Remove custom {item.label}</span>
          </span>
        )}
        searchValue="key"
        value={[options[1] as TagItem]}
      />,
    );

    expect(screen.getByText("Custom tag Command menu")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Project tags" }));
    expect(screen.getByText("Custom option Keyboard first")).toBeInTheDocument();
    expect(screen.queryByText("Custom option Accessible")).not.toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Search Project tags" }), "s");
    expect(onSearchChange).toHaveBeenCalled();
  });

  it("keeps disabled options visible but unavailable", async () => {
    const user = userEvent.setup();

    render(<ControlledTagSelector />);

    await user.click(screen.getByRole("button", { name: "Project tags" }));
    await user.type(screen.getByRole("textbox", { name: "Search Project tags" }), "locked");
    expect(screen.getByRole("option", { name: "Locked" })).toBeDisabled();
  });

  it("supports TagSelector parts for composable layouts", async () => {
    const user = userEvent.setup();

    const ComposableExample = () => {
      const [value, setValue] = useState<TagItem[]>([]);

      return (
        <TagSelector.Root
          aria-label="Project tags"
          onChange={setValue}
          options={options}
          value={value}
        >
          <TagSelector.Trigger placeholder="Pick tags" />
          <TagSelector.Content>
            <TagSelector.Search />
            <TagSelector.List>
              <TagSelector.Empty>No tags</TagSelector.Empty>
            </TagSelector.List>
          </TagSelector.Content>
        </TagSelector.Root>
      );
    };

    render(<ComposableExample />);

    await user.click(screen.getByRole("button", { name: "Project tags" }));
    await user.click(screen.getByRole("option", { name: "Accessible" }));

    expect(
      within(screen.getByRole("button", { name: "Project tags" })).getByText("Accessible"),
    ).toBeInTheDocument();
  });
});
