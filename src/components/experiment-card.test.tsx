import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ExperimentMetadata } from "@/lib/experiments";
import { ExperimentCard } from "./experiment-card";

const mockExperiment: ExperimentMetadata = {
  id: "test-experiment",
  title: "Test Experiment",
  description: "A test experiment description",
  mechanics: ["Animation", "Interaction"],
  dependencies: [],
  filePath: "/path/to/experiment.tsx",
  approved: true,
  featured: false,
  generatedAt: "2024-01-01T00:00:00.000Z",
};

describe("ExperimentCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    render(<ExperimentCard experiment={mockExperiment} />);
    const titles = screen.getAllByText("Test Experiment");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("displays experiment title in preview area", () => {
    render(<ExperimentCard experiment={mockExperiment} />);
    const titles = screen.getAllByText("Test Experiment");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("displays experiment description in hover overlay", () => {
    render(<ExperimentCard experiment={mockExperiment} />);
    const descriptions = screen.getAllByText("A test experiment description");
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it("renders all mechanics tags", () => {
    render(<ExperimentCard experiment={mockExperiment} />);
    const animations = screen.getAllByText("Animation");
    const interactions = screen.getAllByText("Interaction");
    expect(animations.length).toBeGreaterThan(0);
    expect(interactions.length).toBeGreaterThan(0);
  });

  it("applies normal size classes by default", () => {
    const { container } = render(
      <ExperimentCard experiment={mockExperiment} />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("col-span-1");
    expect(card.className).toContain("row-span-1");
  });

  it("applies normal size classes when size prop is 'normal'", () => {
    const { container } = render(
      <ExperimentCard experiment={mockExperiment} size="normal" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("col-span-1");
    expect(card.className).toContain("row-span-1");
  });

  it("applies large size classes when size prop is 'large'", () => {
    const { container } = render(
      <ExperimentCard experiment={mockExperiment} size="large" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("col-span-2");
    expect(card.className).toContain("row-span-2");
  });

  it("calls onClick handler when card is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ExperimentCard experiment={mockExperiment} onClick={handleClick} />
    );

    const card = screen.getByRole("button", {
      name: "View Test Experiment experiment",
    });
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not throw error when onClick is not provided", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ExperimentCard experiment={mockExperiment} />
    );

    const card = container.firstChild as HTMLElement;
    await expect(user.click(card)).resolves.not.toThrow();
  });

  it("applies base styling classes", () => {
    const { container } = render(
      <ExperimentCard experiment={mockExperiment} />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("group");
    expect(card.className).toContain("relative");
    expect(card.className).toContain("overflow-hidden");
    expect(card.className).toContain("rounded-lg");
    expect(card.className).toContain("border");
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("cursor-pointer");
  });

  it("renders experiment with empty mechanics array", () => {
    const experimentWithNoMechanics: ExperimentMetadata = {
      ...mockExperiment,
      mechanics: [],
    };
    render(<ExperimentCard experiment={experimentWithNoMechanics} />);
    const titles = screen.getAllByText("Test Experiment");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("renders experiment with many mechanics tags", () => {
    const experimentWithManyMechanics: ExperimentMetadata = {
      ...mockExperiment,
      mechanics: ["Animation", "Interaction", "Physics", "Particles", "Audio"],
    };
    render(<ExperimentCard experiment={experimentWithManyMechanics} />);
    expect(screen.getAllByText("Animation").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Interaction").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Physics").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Particles").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Audio").length).toBeGreaterThan(0);
  });

  it("renders unique keys for mechanics tags", () => {
    const { container } = render(
      <ExperimentCard experiment={mockExperiment} />
    );
    const tags = container.querySelectorAll(".rounded-full");
    const keys = Array.from(tags).map((tag) => tag.textContent);
    const uniqueKeys = new Set(keys);
    expect(keys.length).toBe(uniqueKeys.size);
  });

  it("has proper accessibility attributes", () => {
    render(<ExperimentCard experiment={mockExperiment} />);
    const card = screen.getByRole("button", {
      name: "View Test Experiment experiment",
    });
    expect(card.getAttribute("tabIndex")).toBe("0");
    expect(card.getAttribute("aria-label")).toBe(
      "View Test Experiment experiment"
    );
  });

  it("triggers onClick when Enter key is pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ExperimentCard experiment={mockExperiment} onClick={handleClick} />
    );

    const card = screen.getByRole("button", {
      name: "View Test Experiment experiment",
    });
    card.focus();
    await user.keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick when Space key is pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ExperimentCard experiment={mockExperiment} onClick={handleClick} />
    );

    const card = screen.getByRole("button", {
      name: "View Test Experiment experiment",
    });
    card.focus();
    await user.keyboard(" ");

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClick for other keys", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ExperimentCard experiment={mockExperiment} onClick={handleClick} />
    );

    const card = screen.getByRole("button", {
      name: "View Test Experiment experiment",
    });
    card.focus();
    await user.keyboard("{Escape}");

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not trigger keyboard event when onClick is not provided", async () => {
    const user = userEvent.setup();
    render(<ExperimentCard experiment={mockExperiment} />);

    const card = screen.getByRole("button", {
      name: "View Test Experiment experiment",
    });
    card.focus();
    await expect(user.keyboard("{Enter}")).resolves.not.toThrow();
    await expect(user.keyboard(" ")).resolves.not.toThrow();
  });
});
