import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ExperimentMetadata } from "@/lib/experiments";
import HomePage from "./page";

const mockExperiments: ExperimentMetadata[] = [
  {
    id: "exp-1",
    title: "Particle System",
    description: "Interactive particle effects",
    mechanics: ["particles", "mouse-follow"],
    dependencies: ["motion"],
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
];

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, "location", {
  value: { reload: mockReload },
  writable: true,
});

describe("HomePage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockReload.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the header with title and description", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "UI Experiments" })
    ).toBeTruthy();
    expect(screen.getByText("AI-generated motion components")).toBeTruthy();
  });

  it("renders Refresh button in header", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    render(<HomePage />);

    expect(screen.getByRole("button", { name: /Refresh/i })).toBeTruthy();
  });

  it("renders Theme button in header", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    render(<HomePage />);

    expect(screen.getByRole("button", { name: /Theme/i })).toBeTruthy();
  });

  it("calls window.location.reload when Refresh button is clicked", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    const user = userEvent.setup();
    render(<HomePage />);

    const refreshButton = screen.getByRole("button", { name: /Refresh/i });
    await user.click(refreshButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("fetches experiments from /api/experiments on mount", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/experiments");
    });
  });

  it("displays empty state when no experiments", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByText("No experiments yet. Generate your first one!")
      ).toBeTruthy();
    });
  });

  it("renders ExperimentGrid when experiments are loaded", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
      expect(
        screen.getByRole("button", {
          name: "View Featured Experiment experiment",
        })
      ).toBeTruthy();
    });
  });

  it("opens drawer when experiment card is clicked", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
    });

    const experimentCard = screen.getByRole("button", {
      name: "View Particle System experiment",
    });
    // Use fireEvent instead of userEvent to avoid vaul pointer event issues
    fireEvent.click(experimentCard);

    await waitFor(() => {
      // Drawer should now be open with experiment title (h2 heading in drawer)
      expect(
        screen.getByRole("heading", { name: "Particle System" })
      ).toBeTruthy();
    });
  });

  it("displays experiment details in drawer when opened", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
    });

    const experimentCard = screen.getByRole("button", {
      name: "View Particle System experiment",
    });
    fireEvent.click(experimentCard);

    await waitFor(() => {
      // Description appears in both card and drawer - check there are at least 2
      const descriptions = screen.getAllByText("Interactive particle effects");
      expect(descriptions.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("shows close button in drawer", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
    });

    // Open drawer
    const experimentCard = screen.getByRole("button", {
      name: "View Particle System experiment",
    });
    fireEvent.click(experimentCard);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Particle System" })
      ).toBeTruthy();
    });

    // Verify close button exists
    expect(screen.getByRole("button", { name: "Close drawer" })).toBeTruthy();
  });

  it("has proper semantic structure with main and header elements", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    render(<HomePage />);

    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("banner")).toBeTruthy(); // header element
  });

  it("renders container classes for responsive layout", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: [] }),
    });

    const { container } = render(<HomePage />);

    const containers = container.querySelectorAll(".container");
    expect(containers.length).toBeGreaterThan(0);
  });

  it("displays correct experiment in drawer when card is clicked", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "View Featured Experiment experiment",
        })
      ).toBeTruthy();
    });

    // Click second experiment
    const secondCard = screen.getByRole("button", {
      name: "View Featured Experiment experiment",
    });
    fireEvent.click(secondCard);

    await waitFor(() => {
      // Should show Featured Experiment title, not Particle System
      expect(
        screen.getByRole("heading", { name: "Featured Experiment" })
      ).toBeTruthy();
      expect(
        screen.queryByRole("heading", { name: "Particle System" })
      ).toBeNull();
    });
  });

  it("renders ExperimentDrawer component", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
    });

    // Open drawer
    const experimentCard = screen.getByRole("button", {
      name: "View Particle System experiment",
    });
    fireEvent.click(experimentCard);

    await waitFor(() => {
      // Drawer content should have Code and Install tabs
      expect(screen.getByRole("button", { name: "Code" })).toBeTruthy();
      expect(screen.getByRole("button", { name: "Install" })).toBeTruthy();
    });
  });

  it("shows preview placeholder in drawer", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
    });

    // Open drawer
    const experimentCard = screen.getByRole("button", {
      name: "View Particle System experiment",
    });
    fireEvent.click(experimentCard);

    await waitFor(() => {
      expect(screen.getByText("Preview of Particle System")).toBeTruthy();
    });
  });

  it("passes experiment to drawer when selected", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ experiments: mockExperiments }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "View Particle System experiment" })
      ).toBeTruthy();
    });

    // Open drawer for first experiment
    const experimentCard = screen.getByRole("button", {
      name: "View Particle System experiment",
    });
    fireEvent.click(experimentCard);

    await waitFor(() => {
      // Should show exp-1's filename
      expect(screen.getByText("exp-1.tsx")).toBeTruthy();
    });
  });
});
