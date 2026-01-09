import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ExperimentMetadata } from "@/lib/experiments";
import {
  getApprovedExperiments,
  markFeatured,
  selectRandomExperiments,
} from "@/lib/experiments";
import { GET } from "./route";

// Mock the experiments module
vi.mock("@/lib/experiments", () => ({
  getApprovedExperiments: vi.fn(),
  selectRandomExperiments: vi.fn(),
  markFeatured: vi.fn(),
}));

const mockGetApprovedExperiments = vi.mocked(getApprovedExperiments);
const mockSelectRandomExperiments = vi.mocked(selectRandomExperiments);
const mockMarkFeatured = vi.mocked(markFeatured);

const createMockExperiment = (
  overrides: Partial<ExperimentMetadata> = {}
): ExperimentMetadata => ({
  id: `exp-${Date.now()}-${Math.random()}`,
  title: "Test Experiment",
  description: "A test experiment",
  mechanics: ["hover", "scroll"],
  dependencies: ["framer-motion"],
  filePath: "/experiments/test.tsx",
  approved: true,
  featured: false,
  generatedAt: new Date().toISOString(),
  ...overrides,
});

describe("GET /api/experiments", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns experiments with count on success", async () => {
    const approvedExperiments = [
      createMockExperiment({ id: "exp-1" }),
      createMockExperiment({ id: "exp-2" }),
      createMockExperiment({ id: "exp-3" }),
    ];
    const randomExperiments = [
      createMockExperiment({ id: "exp-1" }),
      createMockExperiment({ id: "exp-2" }),
    ];
    const featuredExperiments = [
      createMockExperiment({ id: "exp-1", featured: true }),
      createMockExperiment({ id: "exp-2", featured: false }),
    ];

    mockGetApprovedExperiments.mockResolvedValue(approvedExperiments);
    mockSelectRandomExperiments.mockReturnValue(randomExperiments);
    mockMarkFeatured.mockReturnValue(featuredExperiments);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.experiments).toEqual(featuredExperiments);
    expect(data.count).toBe(2);
  });

  it("calls getApprovedExperiments to fetch approved experiments", async () => {
    mockGetApprovedExperiments.mockResolvedValue([]);
    mockSelectRandomExperiments.mockReturnValue([]);
    mockMarkFeatured.mockReturnValue([]);

    await GET();

    expect(mockGetApprovedExperiments).toHaveBeenCalledTimes(1);
  });

  it("calls selectRandomExperiments with approved experiments and count of 12", async () => {
    const approvedExperiments = [
      createMockExperiment({ id: "exp-1" }),
      createMockExperiment({ id: "exp-2" }),
    ];

    mockGetApprovedExperiments.mockResolvedValue(approvedExperiments);
    mockSelectRandomExperiments.mockReturnValue(approvedExperiments);
    mockMarkFeatured.mockReturnValue(approvedExperiments);

    await GET();

    expect(mockSelectRandomExperiments).toHaveBeenCalledWith(
      approvedExperiments,
      12
    );
  });

  it("calls markFeatured with the random selection", async () => {
    const randomExperiments = [
      createMockExperiment({ id: "exp-1" }),
      createMockExperiment({ id: "exp-2" }),
    ];

    mockGetApprovedExperiments.mockResolvedValue([]);
    mockSelectRandomExperiments.mockReturnValue(randomExperiments);
    mockMarkFeatured.mockReturnValue(randomExperiments);

    await GET();

    expect(mockMarkFeatured).toHaveBeenCalledWith(randomExperiments);
  });

  it("returns empty array when no experiments exist", async () => {
    mockGetApprovedExperiments.mockResolvedValue([]);
    mockSelectRandomExperiments.mockReturnValue([]);
    mockMarkFeatured.mockReturnValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.experiments).toEqual([]);
    expect(data.count).toBe(0);
  });

  it("returns 500 status with empty array on error", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    mockGetApprovedExperiments.mockRejectedValue(new Error("Database error"));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.experiments).toEqual([]);
    expect(data.count).toBe(0);

    consoleSpy.mockRestore();
  });

  it("logs error when fetch fails", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const error = new Error("Failed to read manifest");
    mockGetApprovedExperiments.mockRejectedValue(error);

    await GET();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to load experiments:",
      error
    );

    consoleSpy.mockRestore();
  });

  it("handles selectRandomExperiments error", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    mockGetApprovedExperiments.mockResolvedValue([]);
    mockSelectRandomExperiments.mockImplementation(() => {
      throw new Error("Selection error");
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.experiments).toEqual([]);
    expect(data.count).toBe(0);

    consoleSpy.mockRestore();
  });

  it("handles markFeatured error", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    mockGetApprovedExperiments.mockResolvedValue([]);
    mockSelectRandomExperiments.mockReturnValue([]);
    mockMarkFeatured.mockImplementation(() => {
      throw new Error("Marking error");
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.experiments).toEqual([]);
    expect(data.count).toBe(0);

    consoleSpy.mockRestore();
  });

  it("returns correct Content-Type header", async () => {
    mockGetApprovedExperiments.mockResolvedValue([]);
    mockSelectRandomExperiments.mockReturnValue([]);
    mockMarkFeatured.mockReturnValue([]);

    const response = await GET();

    expect(response.headers.get("content-type")).toContain("application/json");
  });
});
