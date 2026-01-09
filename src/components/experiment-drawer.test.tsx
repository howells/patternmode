import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { ExperimentDrawer } from "./experiment-drawer";
import { type ExperimentMetadata } from "@/lib/experiments";

const mockExperiment: ExperimentMetadata = {
  id: "test-experiment",
  title: "Test Experiment",
  description: "A test experiment description",
  mechanics: ["Animation", "Interaction"],
  dependencies: ["motion", "@/lib/utils"],
  filePath: "/path/to/experiment.tsx",
  approved: true,
  featured: false,
  generatedAt: "2024-01-01T00:00:00.000Z",
};

// Mock clipboard API before all tests
const mockWriteText = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
  configurable: true,
});

describe("ExperimentDrawer", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockWriteText.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("returns null when experiment is null", () => {
    const { container } = render(
      <ExperimentDrawer experiment={null} open={true} onOpenChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders drawer content when open with experiment", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    expect(screen.getByText("Test Experiment")).toBeTruthy();
    expect(screen.getByText("A test experiment description")).toBeTruthy();
  });

  it("displays experiment title in preview area", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    expect(screen.getByText("Preview of Test Experiment")).toBeTruthy();
  });

  it("shows Code tab as active by default", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const codeTab = screen.getByRole("button", { name: "Code" });
    expect(codeTab.className).toContain("border-accent");
    expect(codeTab.className).toContain("text-accent");
  });

  it("displays experiment id as filename in Code tab", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    expect(screen.getByText("test-experiment.tsx")).toBeTruthy();
  });

  it("shows Copy Code button in Code tab", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const buttons = screen.getAllByRole("button");
    const copyCodeButton = buttons.find((btn) =>
      btn.textContent?.includes("Copy Code")
    );
    expect(copyCodeButton).toBeTruthy();
  });

  it("switches to Install tab when clicked", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(installTab.className).toContain("border-accent");
      expect(installTab.className).toContain("text-accent");
    });
  });

  it("displays dependencies in Install tab", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(screen.getByText("motion")).toBeTruthy();
      expect(screen.getByText("@/lib/utils")).toBeTruthy();
    });
  });

  it("displays setup checklist in Install tab", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(screen.getByText("Setup Checklist")).toBeTruthy();
      expect(screen.getByText("Install dependencies with pnpm")).toBeTruthy();
      expect(screen.getByText("Copy lib/motion.ts to your project")).toBeTruthy();
      expect(
        screen.getByText("Ensure shadcn CSS variables in globals.css")
      ).toBeTruthy();
    });
  });

  it("calls onOpenChange when close button is clicked", async () => {
    const handleOpenChange = vi.fn();
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    // Find the close button (the one with X icon, which is not a tab button)
    const buttons = screen.getAllByRole("button");
    const closeButton = buttons.find(
      (btn) =>
        !btn.textContent?.includes("Code") &&
        !btn.textContent?.includes("Install") &&
        !btn.textContent?.includes("Copy")
    );
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton!);

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("copies code to clipboard when Copy Code button is clicked", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const buttons = screen.getAllByRole("button");
    const copyButton = buttons.find((btn) =>
      btn.textContent?.includes("Copy Code")
    );
    expect(copyButton).toBeTruthy();
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith("// Code will be here");
    });
  });

  it("shows Copied! feedback after copying", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const buttons = screen.getAllByRole("button");
    const copyButton = buttons.find((btn) =>
      btn.textContent?.includes("Copy Code")
    );
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeTruthy();
    });
  });

  it("resets Copied! feedback after 2 seconds", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const buttons = screen.getAllByRole("button");
    const copyButton = buttons.find((btn) =>
      btn.textContent?.includes("Copy Code")
    );
    fireEvent.click(copyButton!);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeTruthy();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.queryByText("Copied!")).toBeNull();
      expect(screen.getByText("Copy Code")).toBeTruthy();
    });
  });

  it("copies pnpm add command for npm dependencies", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(screen.getByText("motion")).toBeTruthy();
    });

    // Find the copy buttons in the dependencies section (small icon buttons)
    const allButtons = screen.getAllByRole("button");
    const dependencyCopyButtons = allButtons.filter(
      (btn) =>
        btn.className.includes("text-accent") &&
        btn.className.includes("hover:text-accent/80")
    );

    // First one should be for "motion"
    expect(dependencyCopyButtons.length).toBeGreaterThan(0);
    fireEvent.click(dependencyCopyButtons[0]);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith("pnpm add motion");
    });
  });

  it("copies project copy comment for local dependencies", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(screen.getByText("@/lib/utils")).toBeTruthy();
    });

    // Find copy buttons for dependencies
    const allButtons = screen.getAllByRole("button");
    const dependencyCopyButtons = allButtons.filter(
      (btn) =>
        btn.className.includes("text-accent") &&
        btn.className.includes("hover:text-accent/80")
    );

    // Second one should be for "@/lib/utils" (local dependency)
    expect(dependencyCopyButtons.length).toBeGreaterThan(1);
    fireEvent.click(dependencyCopyButtons[1]);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(
        "// Copy @/lib/utils to your project"
      );
    });
  });

  it("renders with empty dependencies array", async () => {
    const experimentWithNoDeps: ExperimentMetadata = {
      ...mockExperiment,
      dependencies: [],
    };
    render(
      <ExperimentDrawer
        experiment={experimentWithNoDeps}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(screen.getByText("Dependencies")).toBeTruthy();
      expect(screen.getByText("Setup Checklist")).toBeTruthy();
    });
  });

  it("renders both tabs with correct inactive styling", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    expect(installTab.className).toContain("border-transparent");
    expect(installTab.className).toContain("text-muted-foreground");
  });

  it("switches back to Code tab from Install tab", async () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const installTab = screen.getByRole("button", { name: "Install" });
    fireEvent.click(installTab);

    await waitFor(() => {
      expect(installTab.className).toContain("border-accent");
    });

    const codeTab = screen.getByRole("button", { name: "Code" });
    fireEvent.click(codeTab);

    await waitFor(() => {
      expect(codeTab.className).toContain("border-accent");
      expect(screen.getByText("test-experiment.tsx")).toBeTruthy();
    });
  });

  it("renders code preview placeholder", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    expect(
      screen.getByText("// Component code will be displayed here")
    ).toBeTruthy();
  });

  it("has proper heading structure", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    // Drawer.Title renders as h2 by default
    const title = screen.getByText("Test Experiment");
    expect(title.tagName).toBe("H2");
  });

  it("does not render when closed", () => {
    render(
      <ExperimentDrawer
        experiment={mockExperiment}
        open={false}
        onOpenChange={() => {}}
      />
    );

    // When drawer is closed, content should not be in the document
    expect(screen.queryByText("Test Experiment")).toBeNull();
  });

  it("renders correct experiment data", () => {
    const customExperiment: ExperimentMetadata = {
      id: "custom-id",
      title: "Custom Title",
      description: "Custom description text",
      mechanics: [],
      dependencies: ["dep1", "dep2", "dep3"],
      filePath: "/custom/path.tsx",
      approved: true,
      featured: true,
      generatedAt: "2024-06-15T12:00:00.000Z",
    };

    render(
      <ExperimentDrawer
        experiment={customExperiment}
        open={true}
        onOpenChange={() => {}}
      />
    );

    expect(screen.getByText("Custom Title")).toBeTruthy();
    expect(screen.getByText("Custom description text")).toBeTruthy();
    expect(screen.getByText("Preview of Custom Title")).toBeTruthy();
    expect(screen.getByText("custom-id.tsx")).toBeTruthy();
  });
});
