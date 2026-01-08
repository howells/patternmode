import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { ExperimentGrid } from "./experiment-grid";
import { type ExperimentMetadata } from "@/lib/experiments";

const mockExperiments: ExperimentMetadata[] = [
  {
    id: "exp-1",
    title: "Particle System",
    description: "Interactive particle effects",
    mechanics: ["particles", "mouse-follow"],
    dependencies: [],
    filePath: "/experiments/particles.tsx",
    approved: true,
    featured: false,
    generatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "exp-2",
    title: "Featured Experiment",
    description: "A featured experiment",
    mechanics: ["featured"],
    dependencies: [],
    filePath: "/experiments/featured.tsx",
    approved: true,
    featured: true,
    generatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "exp-3",
    title: "Another Experiment",
    description: "Another test experiment",
    mechanics: ["test"],
    dependencies: [],
    filePath: "/experiments/another.tsx",
    approved: true,
    featured: false,
    generatedAt: "2024-01-03T00:00:00Z",
  },
];

describe("ExperimentGrid", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all experiments", () => {
    render(<ExperimentGrid experiments={mockExperiments} />);

    const particleCard = screen.getByRole("button", { name: "View Particle System experiment" });
    const featuredCard = screen.getByRole("button", { name: "View Featured Experiment experiment" });
    const anotherCard = screen.getByRole("button", { name: "View Another Experiment experiment" });

    expect(particleCard).toBeTruthy();
    expect(featuredCard).toBeTruthy();
    expect(anotherCard).toBeTruthy();
  });

  it("renders empty grid when no experiments", () => {
    const { container } = render(<ExperimentGrid experiments={[]} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeTruthy();
    expect(grid?.children.length).toBe(0);
  });

  it("applies responsive grid classes", () => {
    const { container } = render(<ExperimentGrid experiments={mockExperiments} />);
    const grid = container.querySelector(".grid");

    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-4");
    expect(grid?.className).toContain("gap-4");
  });

  it("passes size=large to featured experiments", () => {
    const { container } = render(<ExperimentGrid experiments={mockExperiments} />);

    // Featured experiment should have col-span-2 and row-span-2
    const cards = container.querySelectorAll("[role='button']");
    const featuredCard = Array.from(cards).find(
      card => card.getAttribute("aria-label") === "View Featured Experiment experiment"
    ) as HTMLElement;

    expect(featuredCard?.className).toContain("col-span-2");
    expect(featuredCard?.className).toContain("row-span-2");
  });

  it("passes size=normal to non-featured experiments", () => {
    const { container } = render(<ExperimentGrid experiments={mockExperiments} />);

    // Non-featured experiments should have col-span-1 and row-span-1
    const cards = container.querySelectorAll("[role='button']");
    const normalCard = Array.from(cards).find(
      card => card.getAttribute("aria-label") === "View Particle System experiment"
    ) as HTMLElement;

    expect(normalCard?.className).toContain("col-span-1");
    expect(normalCard?.className).toContain("row-span-1");
  });

  it("calls onExperimentClick with correct experiment when card is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(
      <ExperimentGrid
        experiments={mockExperiments}
        onExperimentClick={mockOnClick}
      />
    );

    const particleCard = screen.getByRole("button", { name: "View Particle System experiment" });
    await user.click(particleCard);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockExperiments[0]);
  });

  it("does not error when onExperimentClick is not provided", async () => {
    const user = userEvent.setup();
    render(<ExperimentGrid experiments={mockExperiments} />);

    const particleCard = screen.getByRole("button", { name: "View Particle System experiment" });
    await expect(user.click(particleCard)).resolves.not.toThrow();
  });

  it("calls onExperimentClick with different experiments", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(
      <ExperimentGrid
        experiments={mockExperiments}
        onExperimentClick={mockOnClick}
      />
    );

    const particleCard = screen.getByRole("button", { name: "View Particle System experiment" });
    const featuredCard = screen.getByRole("button", { name: "View Featured Experiment experiment" });

    await user.click(particleCard);
    expect(mockOnClick).toHaveBeenCalledWith(mockExperiments[0]);

    await user.click(featuredCard);
    expect(mockOnClick).toHaveBeenCalledWith(mockExperiments[1]);

    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it("renders correct number of experiment cards", () => {
    const { container } = render(<ExperimentGrid experiments={mockExperiments} />);
    const cards = container.querySelectorAll("[role='button']");
    expect(cards.length).toBe(mockExperiments.length);
  });

  it("uses experiment id as key", () => {
    const { container } = render(<ExperimentGrid experiments={mockExperiments} />);
    const cards = container.querySelectorAll("[role='button']");

    // React keys aren't directly accessible in the DOM, but we can verify
    // that each card renders with unique content
    expect(cards.length).toBe(3);

    const particleCard = screen.getByRole("button", { name: "View Particle System experiment" });
    const featuredCard = screen.getByRole("button", { name: "View Featured Experiment experiment" });
    const anotherCard = screen.getByRole("button", { name: "View Another Experiment experiment" });

    expect(particleCard).toBeTruthy();
    expect(featuredCard).toBeTruthy();
    expect(anotherCard).toBeTruthy();
  });
});
