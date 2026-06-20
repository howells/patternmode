import { describe, expect, it } from "vitest";

import { packSquarified } from "./parquet-packing";
import type { PackedRect } from "./parquet-packing";

const area = (rect: PackedRect): number => rect.w * rect.h;

const overlaps = (a: PackedRect, b: PackedRect): boolean => {
  const epsilon = 1e-6;
  return (
    a.x < b.x + b.w - epsilon &&
    a.x + a.w > b.x + epsilon &&
    a.y < b.y + b.h - epsilon &&
    a.y + a.h > b.y + epsilon
  );
};

describe("packSquarified", () => {
  it("returns no rectangles for an empty input", () => {
    expect(packSquarified([], { gap: 0, height: 100, width: 100 })).toEqual([]);
  });

  it("returns no rectangles for non-positive dimensions", () => {
    expect(packSquarified([1, 2], { gap: 4, height: 100, width: 0 })).toEqual([]);
  });

  it("fills the whole rectangle with a single weight", () => {
    const [rect] = packSquarified([1], { gap: 0, height: 80, width: 100 });
    expect(rect.index).toBe(0);
    expect(rect.x).toBeCloseTo(0);
    expect(rect.y).toBeCloseTo(0);
    expect(rect.w).toBeCloseTo(100);
    expect(rect.h).toBeCloseTo(80);
  });

  it("allocates area proportional to each weight", () => {
    const rects = packSquarified([3, 1], { gap: 0, height: 100, width: 100 });
    const big = rects.find((rect) => rect.index === 0);
    const small = rects.find((rect) => rect.index === 1);
    if (big === undefined || small === undefined) {
      throw new Error("expected a rectangle for each weight");
    }
    const total = 100 * 100;
    expect(area(big)).toBeCloseTo((3 / 4) * total, 1);
    expect(area(small)).toBeCloseTo((1 / 4) * total, 1);
  });

  it("covers the rectangle area with no gap", () => {
    const rects = packSquarified([5, 3, 2, 1, 1], { gap: 0, height: 90, width: 120 });
    const covered = rects.reduce((sum, rect) => sum + area(rect), 0);
    expect(covered).toBeCloseTo(120 * 90, 0);
  });

  it("produces non-overlapping tiles within bounds", () => {
    const rects = packSquarified([5, 3, 2, 1, 1, 4], { gap: 6, height: 140, width: 200 });
    for (const rect of rects) {
      expect(rect.x).toBeGreaterThanOrEqual(-1e-6);
      expect(rect.y).toBeGreaterThanOrEqual(-1e-6);
      expect(rect.x + rect.w).toBeLessThanOrEqual(200 + 1e-6);
      expect(rect.y + rect.h).toBeLessThanOrEqual(140 + 1e-6);
    }
    for (let i = 0; i < rects.length; i += 1) {
      for (let j = i + 1; j < rects.length; j += 1) {
        expect(overlaps(rects[i], rects[j])).toBe(false);
      }
    }
  });

  it("ignores zero, negative, and non-finite weights", () => {
    const rects = packSquarified([2, 0, -1, Number.NaN, 3], {
      gap: 0,
      height: 100,
      width: 100,
    });
    expect(rects.map((rect) => rect.index).toSorted((a, b) => a - b)).toEqual([0, 4]);
  });
});
