// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import {
  DistributionBar,
  DistributionDisplay,
  getDistributionBoundaryPercent,
  getDistributionTotal,
  getSwatchColorsBackground,
} from "./index";
import type { DistributionSegment } from "./index";

/*
 * Characterises the rendered output of the weighted-distribution arithmetic in
 * Swatch. The two components disagree on an all-zero distribution, and both
 * outputs are pinned on purpose:
 * - DistributionDisplay / DistributionBar draw every segment at 0% width and
 *   label it 0%.
 * - Swatch `colors` (step blend) falls back to equal bands.
 */

const segmentWidths = (container: HTMLElement): string[] =>
  [...container.querySelectorAll<HTMLElement>(".patternmode-distribution-bar__segment")].map(
    (element) => element.style.width,
  );

const legendText = (container: HTMLElement): string[] =>
  [...container.querySelectorAll(".patternmode-distribution-bar__legend > span")].map(
    (element) => element.textContent ?? "",
  );

const segments = (values: number[]): DistributionSegment[] =>
  values.map((value, index) => ({ color: `#00000${index}`, id: `s${index}`, value }));

describe("DistributionDisplay output", () => {
  afterEach(cleanup);

  it("draws unrounded widths and rounded labels from the segment total", () => {
    const { container } = render(<DistributionDisplay segments={segments([1, 1, 1])} />);

    expect(segmentWidths(container)).toStrictEqual([
      `${(1 / 3) * 100}%`,
      `${(1 / 3) * 100}%`,
      `${(1 / 3) * 100}%`,
    ]);
    expect(legendText(container)).toStrictEqual(["s0 33%", "s1 33%", "s2 33%"]);
    expect(screen.getByRole("figure")).toHaveAttribute("aria-label", "s0 33%, s1 33%, s2 33%");
  });

  it("treats invalid and negative weights as zero", () => {
    const { container } = render(
      <DistributionDisplay segments={segments([Number.NaN, -4, 3, Number.POSITIVE_INFINITY, 1])} />,
    );

    expect(segmentWidths(container)).toStrictEqual(["0%", "0%", "75%", "0%", "25%"]);
    expect(legendText(container)).toStrictEqual(["s0 0%", "s1 0%", "s2 75%", "s3 0%", "s4 25%"]);
  });

  it("includes emptyValue in the total and renders the unassigned remainder", () => {
    const { container } = render(
      <DistributionDisplay emptyValue={25} segments={segments([45, 30])} />,
    );

    expect(segmentWidths(container)).toStrictEqual(["45%", "30%", "25%"]);
    expect(legendText(container)).toStrictEqual(["s0 45%", "s1 30%", "unassigned 25%"]);
  });

  it("summarises assigned and unassigned weight", () => {
    const { container } = render(
      <DistributionDisplay emptyValue={1} legend="summary" segments={segments([1, 1])} />,
    );

    expect(legendText(container)).toStrictEqual(["67% assigned", "33% unassigned"]);
  });

  it("renders an all-zero distribution at 0% everywhere", () => {
    const { container } = render(
      <DistributionDisplay legend="summary" segments={segments([0, 0])} />,
    );

    expect(segmentWidths(container)).toStrictEqual(["0%", "0%"]);
    expect(legendText(container)).toStrictEqual(["100% assigned"]);
    expect(screen.getByRole("figure")).toHaveAttribute("aria-label", "s0 0%, s1 0%");
  });

  it("labels interactive segments with their rounded share", () => {
    render(
      <DistributionDisplay
        onSegmentSelect={() => {
          // Selection is not under test.
        }}
        segments={segments([2, 1])}
      />,
    );

    expect(screen.getByRole("button", { name: "s0 67%" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "s1 33%" })).toBeInTheDocument();
  });
});

describe("distribution boundaries", () => {
  it("positions boundaries at the cumulative share rounded to one decimal", () => {
    const values = segments([1, 1, 1]);

    expect(getDistributionTotal(values)).toBe(3);
    expect(getDistributionBoundaryPercent(values, 0)).toBe(33.3);
    expect(getDistributionBoundaryPercent(values, 1)).toBe(66.7);
  });

  it("puts every boundary at 0 for an all-zero distribution", () => {
    expect(getDistributionBoundaryPercent(segments([0, 0, 0]), 0)).toBe(0);
    expect(getDistributionBoundaryPercent(segments([0, 0, 0]), 1)).toBe(0);
  });
});

describe("Swatch colors step blend", () => {
  it("bands weighted stops cumulatively and ends the last band at 100%", () => {
    expect(
      getSwatchColorsBackground([
        { color: "#111", ratio: 1 },
        { color: "#222", ratio: 1 },
        { color: "#333", ratio: 1 },
      ]),
    ).toBe("linear-gradient(90deg, #111 0% 33.33%, #222 33.33% 66.67%, #333 66.67% 100%)");
  });

  it("gives missing ratios a weight of 1 and invalid ratios a weight of 0", () => {
    expect(
      getSwatchColorsBackground([
        "#111",
        { color: "#222", ratio: 3 },
        { color: "#333", ratio: -1 },
      ]),
    ).toBe("linear-gradient(90deg, #111 0% 25%, #222 25% 100%, #333 100% 100%)");
  });

  it("falls back to equal bands for an all-zero palette", () => {
    expect(
      getSwatchColorsBackground([
        { color: "#111", ratio: 0 },
        { color: "#222", ratio: 0 },
        { color: "#333", ratio: Number.NaN },
        { color: "#444", ratio: 0 },
      ]),
    ).toBe("linear-gradient(90deg, #111 0% 25%, #222 25% 50%, #333 50% 75%, #444 75% 100%)");
  });
});

describe("DistributionBar keyboard adjustment", () => {
  it("drops the settle transition while a boundary is moved by key, until focus leaves", async () => {
    const user = userEvent.setup();
    render(
      <DistributionBar
        aria-label="Finish distribution"
        segments={[
          { color: "#315c4b", id: "evergreen", label: "Evergreen", value: 60 },
          { color: "#d9a441", id: "saffron", label: "Saffron", value: 40 },
        ]}
      />,
    );
    const bar = screen.getByRole("group", { name: "Finish distribution" });
    await user.keyboard("{Tab}");
    expect(bar).not.toHaveAttribute("data-key-adjusting");
    await user.keyboard("{ArrowRight}");
    expect(bar).toHaveAttribute("data-key-adjusting", "true");
    await user.keyboard("{Tab}");
    expect(bar).not.toHaveAttribute("data-key-adjusting");
  });
});
