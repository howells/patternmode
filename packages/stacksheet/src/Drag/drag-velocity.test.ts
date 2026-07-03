import { describe, expect, it } from "vitest";

import { appendVelocitySample, getReleaseVelocity, VELOCITY_WINDOW_MS } from "./drag-velocity";
import type { VelocitySample } from "./drag-velocity";

const buildSamples = (entries: [time: number, offset: number][]): VelocitySample[] => {
  const samples: VelocitySample[] = [];
  for (const [time, offset] of entries) {
    appendVelocitySample(samples, { offset, time });
  }
  return samples;
};

describe("getReleaseVelocity", () => {
  it("computes velocity from a steady drag", () => {
    // 100px over 100ms → 1 px/ms
    const samples = buildSamples([
      [1000, 0],
      [1050, 50],
      [1100, 100],
    ]);
    expect(getReleaseVelocity(samples, 1100)).toBeCloseTo(1);
  });

  it("reports the flick velocity after a pause, not the whole-gesture average", () => {
    // Slow drag to 40px, pause, then a fast 60px flick in the final 40ms.
    const samples = buildSamples([
      [0, 0],
      [200, 40],
      // pause 800ms
      [1000, 40],
      [1020, 70],
      [1040, 100],
    ]);
    // Whole-gesture average would be 100/1040 ≈ 0.096 px/ms.
    // Window velocity is 60px / 40ms = 1.5 px/ms.
    expect(getReleaseVelocity(samples, 1040)).toBeCloseTo(1.5);
  });

  it("returns 0 when the pointer paused before release", () => {
    const samples = buildSamples([
      [0, 0],
      [50, 80],
    ]);
    // Released long after the last movement — no recent samples.
    expect(getReleaseVelocity(samples, 50 + VELOCITY_WINDOW_MS + 200)).toBe(0);
  });

  it("returns 0 with fewer than two recent samples", () => {
    expect(getReleaseVelocity([], 100)).toBe(0);
    expect(getReleaseVelocity([{ offset: 10, time: 100 }], 100)).toBe(0);
  });

  it("reports negative velocity for movement against the dismiss direction", () => {
    const samples = buildSamples([
      [1000, 100],
      [1050, 40],
    ]);
    expect(getReleaseVelocity(samples, 1050)).toBeCloseTo(-1.2);
  });
});

describe("appendVelocitySample", () => {
  it("prunes samples that fall outside the sliding window", () => {
    const samples = buildSamples([
      [0, 0],
      [10, 5],
      [500, 50],
      [520, 60],
      [540, 70],
    ]);
    expect(samples.every((sample) => sample.time >= 540 - VELOCITY_WINDOW_MS)).toBe(true);
    expect(samples.map((sample) => sample.offset)).toEqual([50, 60, 70]);
  });

  it("caps retained samples as a memory guard", () => {
    const samples: VelocitySample[] = [];
    for (let i = 0; i < 100; i += 1) {
      appendVelocitySample(samples, { offset: i, time: 1000 + i });
    }
    expect(samples.length).toBeLessThanOrEqual(20);
    expect(samples.at(-1)?.offset).toBe(99);
  });
});
