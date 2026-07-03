import { describe, expect, it } from "vitest";

import { getSwatchColorsBackground } from "./swatch-colors";

describe("getSwatchColorsBackground smooth blend", () => {
  it("centers smooth blend stops at the cumulative midpoint of their ratio share", () => {
    expect(
      getSwatchColorsBackground(
        [
          { color: "#315c4b", ratio: 90 },
          { color: "#e1ebe5", ratio: 10 },
        ],
        "smooth",
      ),
    ).toBe("linear-gradient(in oklab 90deg, #315c4b 45%, #e1ebe5 95%)");

    expect(
      getSwatchColorsBackground(
        [
          { color: "#111111", ratio: 90 },
          { color: "#222222", ratio: 5 },
          { color: "#333333", ratio: 5 },
        ],
        "smooth",
      ),
    ).toBe("linear-gradient(in oklab 90deg, #111111 45%, #222222 92.5%, #333333 97.5%)");
  });

  it("degenerates smooth blend to even spacing when ratios are equal", () => {
    expect(
      getSwatchColorsBackground(
        [
          { color: "#315c4b", ratio: 50 },
          { color: "#e1ebe5", ratio: 50 },
        ],
        "smooth",
      ),
    ).toBe("linear-gradient(in oklab 90deg, #315c4b 0%, #e1ebe5 100%)");

    expect(
      getSwatchColorsBackground(
        [
          { color: "#111111", ratio: 2 },
          { color: "#222222", ratio: 2 },
          { color: "#333333", ratio: 2 },
        ],
        "smooth",
      ),
    ).toBe("linear-gradient(in oklab 90deg, #111111 0%, #222222 50%, #333333 100%)");
  });

  it("falls back to even smooth spacing for missing or zero ratios", () => {
    expect(getSwatchColorsBackground(["#315c4b", "#d9a441", "#9b3d32"], "smooth")).toBe(
      "linear-gradient(in oklab 90deg, #315c4b 0%, #d9a441 50%, #9b3d32 100%)",
    );

    expect(
      getSwatchColorsBackground(
        [
          { color: "#111111", ratio: 0 },
          { color: "#222222", ratio: 0 },
        ],
        "smooth",
      ),
    ).toBe("linear-gradient(in oklab 90deg, #111111 0%, #222222 100%)");
  });
});
