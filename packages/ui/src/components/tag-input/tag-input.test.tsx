import type { TagOption } from "./component";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TagInput, useTagInput } from "./component";
import "@testing-library/jest-dom";

const mockOptions: TagOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const europeanCities: TagOption[] = [
  { value: "paris", label: "Paris" },
  { value: "london", label: "London" },
  { value: "berlin", label: "Berlin" },
  { value: "rome", label: "Rome" },
];

describe("tagInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("basic Functionality", () => {
    it("renders with placeholder", () => {
      render(
        <TagInput
          options={mockOptions}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByPlaceholderText("Add tags...")).toBeInTheDocument();
    });

    it("displays selected tags", () => {
      render(
        <TagInput
          options={mockOptions}
          value={["react", "vue"]}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Vue")).toBeInTheDocument();
    });

    it("shows selectedPlaceholder when tags are selected", () => {
      render(
        <TagInput
          options={mockOptions}
          value={["react"]}
          placeholder="Add tags..."
          selectedPlaceholder="Add more tags..."
        />,
      );

      expect(screen.getByPlaceholderText("Add more tags...")).toBeInTheDocument();
    });

    it("handles disabled state", () => {
      render(
        <TagInput
          options={mockOptions}
          disabled
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      expect(input).toBeDisabled();
    });
  });

  describe("dropdown Functionality", () => {
    it("opens dropdown when typing", async () => {
      const user = userEvent.setup();
      render(
        <TagInput
          options={mockOptions}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "re");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });
    });

    it("filters options based on input", async () => {
      const user = userEvent.setup();
      render(
        <TagInput
          options={mockOptions}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "vue");

      await waitFor(() => {
        expect(screen.getByText("Vue")).toBeInTheDocument();
        expect(screen.queryByText("React")).not.toBeInTheDocument();
      });
    });

    it("shows empty message when no options match", async () => {
      const user = userEvent.setup();
      render(
        <TagInput
          options={mockOptions}
          placeholder="Add tags..."
          emptyMessage="No matches found"
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "xyz");

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
    });

    it("excludes already selected options from dropdown", async () => {
      const user = userEvent.setup();
      render(
        <TagInput
          options={mockOptions}
          value={["react"]}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add more tags...");
      await user.type(input, "re");

      await waitFor(() => {
        // Should show "No options found" since React is already selected and excluded
        expect(screen.getByText("No options found.")).toBeInTheDocument();
      });
    });
  });

  describe("tag Selection", () => {
    it("selects tag from dropdown", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "re");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      await user.click(screen.getByText("React"));

      expect(onValueChange).toHaveBeenCalledWith(["react"]);
    });

    it("clears input after selection", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "react");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      await user.click(screen.getByText("React"));

      expect(input).toHaveValue("");
    });

    it("selects tag with Enter key", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "react");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(onValueChange).toHaveBeenCalledWith(["react"]);
    });
  });

  describe("tag Removal", () => {
    it("removes tag when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          value={["react"]}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const dismissButton = screen.getByRole("button", { name: /remove/i });
      await user.click(dismissButton);

      expect(onValueChange).toHaveBeenCalledWith([]);
    });

    it("removes last tag with backspace on empty input", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          value={["react", "vue"]}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add more tags...");
      await user.click(input);
      await user.keyboard("{Backspace}");

      expect(onValueChange).toHaveBeenCalledWith(["react"]);
    });

    it("does not remove tags with backspace when input has content", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          value={["react"]}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add more tags...");
      await user.type(input, "vue");
      await user.keyboard("{Backspace}");

      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe("max Tags Functionality", () => {
    it("shows max tags indicator when limit reached", () => {
      render(
        <TagInput
          options={mockOptions}
          value={["react", "vue"]}
          maxTags={2}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByText("Max 2 tags")).toBeInTheDocument();
    });

    it("hides input when max tags reached", () => {
      render(
        <TagInput
          options={mockOptions}
          value={["react", "vue"]}
          maxTags={2}
          placeholder="Add tags..."
        />,
      );

      expect(screen.queryByPlaceholderText("Add tags...")).not.toBeInTheDocument();
    });

    it("prevents dropdown from opening when max tags reached", async () => {
      const user = userEvent.setup();
      render(
        <TagInput
          options={mockOptions}
          value={["react", "vue"]}
          maxTags={2}
          placeholder="Add tags..."
        />,
      );

      // Try to click on the container
      const container = screen.getByTestId("tag-input");
      await user.click(container);

      // Should not show dropdown options
      expect(screen.queryByText("Angular")).not.toBeInTheDocument();
    });
  });

  describe("tag Creation", () => {
    it("shows create option when allowCreate is true and input doesn't match existing options", async () => {
      const user = userEvent.setup();
      const onCreate = vi.fn().mockReturnValue({ value: "custom", label: "Custom" });

      render(
        <TagInput
          options={mockOptions}
          allowCreate={true}
          onCreate={onCreate}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "custom");

      await waitFor(() => {
        expect(screen.getByText("Create \"Custom\"")).toBeInTheDocument();
      });
    });

    it("creates new tag when create option is selected", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const onCreate = vi.fn().mockReturnValue({ value: "custom", label: "Custom" });

      render(
        <TagInput
          options={mockOptions}
          allowCreate={true}
          onCreate={onCreate}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "custom");

      await waitFor(() => {
        expect(screen.getByText("Create \"Custom\"")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Create \"Custom\""));

      expect(onCreate).toHaveBeenCalledWith("custom");
      expect(onValueChange).toHaveBeenCalledWith(["custom"]);
    });

    it("creates new tag with Enter key", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const onCreate = vi.fn().mockReturnValue({ value: "custom", label: "Custom" });

      render(
        <TagInput
          options={mockOptions}
          allowCreate={true}
          onCreate={onCreate}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "custom");

      await waitFor(() => {
        expect(screen.getByText("Create \"Custom\"")).toBeInTheDocument();
      });

      await user.keyboard("{Enter}");

      expect(onCreate).toHaveBeenCalledWith("custom");
      expect(onValueChange).toHaveBeenCalledWith(["custom"]);
    });

    it("validates input before showing create option", async () => {
      const user = userEvent.setup();
      const onValidate = vi.fn().mockReturnValue(false);
      const onCreate = vi.fn().mockReturnValue({ value: "x", label: "X" });

      render(
        <TagInput
          options={mockOptions}
          allowCreate={true}
          onCreate={onCreate}
          onValidate={onValidate}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "x");

      expect(onValidate).toHaveBeenCalledWith("x");

      await waitFor(() => {
        expect(screen.queryByText("Create \"X\"")).not.toBeInTheDocument();
      });
    });

    it("doesn't show create option for existing tags", async () => {
      const user = userEvent.setup();
      const onCreate = vi.fn().mockReturnValue({ value: "react", label: "React" });

      render(
        <TagInput
          options={mockOptions}
          allowCreate={true}
          onCreate={onCreate}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "react");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.queryByText("Create \"React\"")).not.toBeInTheDocument();
      });
    });

    it("uses default onCreate when none provided", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          allowCreate={true}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "Custom Tag");

      await waitFor(() => {
        expect(screen.getByText("Create \"Custom Tag\"")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Create \"Custom Tag\""));

      expect(onValueChange).toHaveBeenCalledWith(["custom-tag"]);
    });

    it("doesn't create duplicate tags", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={europeanCities}
          value={["paris"]}
          allowCreate={true}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add more tags...");
      await user.type(input, "paris");

      await waitFor(() => {
        // Should show existing Paris option, not create option
        expect(screen.queryByText("Create \"Paris\"")).not.toBeInTheDocument();
      });
    });

    it("prevents creating tags that would result in duplicate values", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={europeanCities}
          value={["paris"]}
          allowCreate={true}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add more tags...");
      // Type "Paris" which would create value "paris" (duplicate)
      await user.type(input, "Paris");

      await waitFor(() => {
        expect(screen.queryByText("Create \"Paris\"")).not.toBeInTheDocument();
      });
    });
  });

  describe("keyboard Navigation", () => {
    it("navigates dropdown with arrow keys", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <TagInput
          options={mockOptions}
          onValueChange={onValueChange}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "a");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      // Navigate down to the second option
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      // Should have selected the second matching option
      expect(onValueChange).toHaveBeenCalled();
    });

    it("closes dropdown on Escape", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          options={mockOptions}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "react");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("React")).not.toBeInTheDocument();
      });
    });
  });

  describe("custom Rendering", () => {
    it("uses custom renderTag function", () => {
      const renderTag = vi.fn().mockReturnValue(<div>Custom Tag</div>);

      render(
        <TagInput
          options={mockOptions}
          value={["react"]}
          renderTag={renderTag}
          placeholder="Add tags..."
        />,
      );

      expect(renderTag).toHaveBeenCalled();
      expect(screen.getByText("Custom Tag")).toBeInTheDocument();
    });

    it("uses custom renderItem function", async () => {
      const user = userEvent.setup();
      const renderItem = vi.fn().mockReturnValue(<div>Custom Item</div>);

      render(
        <TagInput
          options={mockOptions}
          renderItem={renderItem}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "react");

      await waitFor(() => {
        expect(renderItem).toHaveBeenCalled();
        expect(screen.getByText("Custom Item")).toBeInTheDocument();
      });
    });

    it("uses custom filterOptions function", async () => {
      const user = userEvent.setup();
      const filterOptions = vi.fn().mockReturnValue([mockOptions[0]]);

      render(
        <TagInput
          options={mockOptions}
          filterOptions={filterOptions}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "test");

      expect(filterOptions).toHaveBeenCalledWith(mockOptions, "test");
    });
  });

  describe("edge Cases", () => {
    it("handles empty options array", () => {
      render(
        <TagInput
          options={[]}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByPlaceholderText("Add tags...")).toBeInTheDocument();
    });

    it("handles undefined value prop", () => {
      render(
        <TagInput
          options={mockOptions}
          value={undefined}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByPlaceholderText("Add tags...")).toBeInTheDocument();
    });

    it("handles null options gracefully", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          options={null as any}
          placeholder="Add tags..."
        />,
      );

      const input = screen.getByPlaceholderText("Add tags...");
      await user.type(input, "test");

      // Should not crash
      expect(input).toBeInTheDocument();
    });

    it("handles malformed options", () => {
      const malformedOptions = [
        { value: "test", label: "Test" },
        null,
        undefined,
        { value: "valid", label: "Valid" },
      ] as TagOption[];

      render(
        <TagInput
          options={malformedOptions}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByPlaceholderText("Add tags...")).toBeInTheDocument();
    });

    it("handles very long tag labels", () => {
      const longLabelOption = [
        { value: "long", label: "This is a very long tag label that might cause layout issues if not handled properly" },
      ];

      render(
        <TagInput
          options={longLabelOption}
          value={["long"]}
          placeholder="Add tags..."
        />,
      );

      expect(screen.getByText("This is a very long tag label that might cause layout issues if not handled properly")).toBeInTheDocument();
    });
  });

  describe("wrapping Behavior", () => {
    it("applies wrap class when wrap is true", () => {
      const { container } = render(
        <TagInput
          options={mockOptions}
          value={["react", "vue", "angular"]}
          wrap={true}
          placeholder="Add tags..."
        />,
      );

      const wrapper = container.querySelector("[data-testid=\"tag-input\"] > div");
      expect(wrapper).toHaveClass("flex-wrap");
    });

    it("applies scroll class when wrap is false", () => {
      const { container } = render(
        <TagInput
          options={mockOptions}
          value={["react", "vue", "angular"]}
          wrap={false}
          placeholder="Add tags..."
        />,
      );

      const wrapper = container.querySelector("[data-testid=\"tag-input\"] > div");
      expect(wrapper).toHaveClass("overflow-x-auto");
    });
  });
});

describe("useTagInput Hook", () => {
  const TestComponent = ({ initialValues }: { initialValues?: string[] }) => {
    const tagInput = useTagInput(initialValues);

    return (
      <div>
        <div data-testid="values">{tagInput.values.join(",")}</div>
        <div data-testid="count">{tagInput.count}</div>
        <button onClick={() => tagInput.addTag("test")}>Add Test</button>
        <button onClick={() => tagInput.removeTag("test")}>Remove Test</button>
        <button onClick={() => tagInput.clearTags()}>Clear All</button>
        <div data-testid="has-test">{tagInput.hasTag("test").toString()}</div>
      </div>
    );
  };

  it("initializes with empty array by default", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("values")).toHaveTextContent("");
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("initializes with provided values", () => {
    render(<TestComponent initialValues={["react", "vue"]} />);

    expect(screen.getByTestId("values")).toHaveTextContent("react,vue");
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });

  it("adds tags", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.click(screen.getByText("Add Test"));

    expect(screen.getByTestId("values")).toHaveTextContent("test");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("has-test")).toHaveTextContent("true");
  });

  it("removes tags", async () => {
    const user = userEvent.setup();
    render(<TestComponent initialValues={["test", "other"]} />);

    await user.click(screen.getByText("Remove Test"));

    expect(screen.getByTestId("values")).toHaveTextContent("other");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("has-test")).toHaveTextContent("false");
  });

  it("clears all tags", async () => {
    const user = userEvent.setup();
    render(<TestComponent initialValues={["test", "other"]} />);

    await user.click(screen.getByText("Clear All"));

    expect(screen.getByTestId("values")).toHaveTextContent("");
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("prevents duplicate tags", async () => {
    const user = userEvent.setup();
    render(<TestComponent initialValues={["test"]} />);

    await user.click(screen.getByText("Add Test"));

    expect(screen.getByTestId("values")).toHaveTextContent("test");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
