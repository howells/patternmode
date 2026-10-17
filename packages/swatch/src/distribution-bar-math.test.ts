import { describe, expect, it } from "vitest";

import {
  getDistributionBoundaryPercent,
  getDistributionTotal,
  moveDistributionBoundary,
  removeDistributionSegment,
  updateDistributionSegment,
} from "./index";

describe("DistributionBar math", () => {
  it("moves a boundary while preserving the distribution total", () => {
    const segments = [
      { color: "#315c4b", id: "a", value: 48 },
      { color: "#d9a441", id: "b", value: 30 },
      { color: "#9b3d32", id: "c", value: 22 },
    ];

    const next = moveDistributionBoundary(segments, 0, 8, 6);

    expect(next.map((segment) => segment.value)).toStrictEqual([56, 22, 22]);
    expect(getDistributionTotal(next)).toBe(100);
    expect(getDistributionBoundaryPercent(next, 0)).toBe(56);
  });

  it("clamps a moved boundary so adjacent segments keep a minimum value", () => {
    const segments = [
      { color: "#315c4b", id: "a", value: 48 },
      { color: "#d9a441", id: "b", value: 30 },
      { color: "#9b3d32", id: "c", value: 22 },
    ];

    const next = moveDistributionBoundary(segments, 1, 40, 8);

    expect(next.map((segment) => segment.value)).toStrictEqual([48, 44, 8]);
    expect(getDistributionTotal(next)).toBe(100);
  });

  it("removes a segment and redistributes its value across remaining segments", () => {
    const segments = [
      { color: "#315c4b", id: "a", value: 50 },
      { color: "#d9a441", id: "b", value: 30 },
      { color: "#9b3d32", id: "c", value: 20 },
    ];

    const next = removeDistributionSegment(segments, "b");

    expect(next.map((segment) => segment.value)).toStrictEqual([71.4, 28.6]);
    expect(getDistributionTotal(next)).toBe(100);
  });

  it("updates a segment without changing the distribution values", () => {
    const segments = [
      { color: "#315c4b", id: "a", label: "Evergreen", value: 48 },
      { color: "#d9a441", id: "b", label: "Saffron", value: 30 },
    ];

    const next = updateDistributionSegment(segments, "a", {
      color: "#e1ebe5",
      id: "sage",
      label: "Sage",
    });

    expect(next).toStrictEqual([
      { color: "#e1ebe5", id: "sage", label: "Sage", value: 48 },
      { color: "#d9a441", id: "b", label: "Saffron", value: 30 },
    ]);
  });
});
