// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { hexToOklab } from "@instruments/colorscope/math";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildBriolettePalette,
  BRIOLETTE_DEPTH_FALLOFF,
  BRIOLETTE_MAX_DEPTH,
  BRIOLETTE_MIN_DELTA,
  BRIOLETTE_NEIGHBORHOOD_DELTA,
  brioletteColorDistance,
  brioletteNeighborhoodDelta,
  brioletteUniverseColor,
} from "./briolette-colors";
import {
  buildBrioletteFaces,
  orientationFacingFront,
  projectBrioletteFaces,
} from "./briolette-geometry";
import { BriolettePicker } from "./briolette-picker";

const HEX_PATTERN = /^#[0-9a-f]{6}$/u;

const mean = (xs: number[]) => xs.reduce((sum, x) => sum + x, 0) / Math.max(xs.length, 1);

afterEach(() => {
  cleanup();
});

describe("briolette geometry", () => {
  it("builds an 80-facet geodesic with unit centroids", () => {
    const faces = buildBrioletteFaces();

    expect(faces).toHaveLength(80);
    for (const face of faces) {
      expect(Math.hypot(face.center.x, face.center.y, face.center.z)).toBeCloseTo(1, 6);
    }
  });

  it("culls backfaces and sorts visible facets back-to-front", () => {
    const faces = buildBrioletteFaces();
    const projected = projectBrioletteFaces(faces, { w: 1, x: 0, y: 0, z: 0 });

    expect(projected.length).toBeGreaterThan(30);
    expect(projected.length).toBeLessThan(faces.length);
    const depths = projected.map((face) => face.depth);
    expect(depths).toEqual(depths.toSorted((a, b) => a - b));
  });

  it("computes an orientation that brings any facet to the view axis", () => {
    const faces = buildBrioletteFaces();
    const orientation = { w: 1, x: 0, y: 0, z: 0 };

    for (const index of [0, 19, 41, 67]) {
      const face = faces[index];
      if (!face) {
        throw new Error("expected a facet");
      }
      const target = orientationFacingFront(orientation, face.center);
      const projected = projectBrioletteFaces(faces, target);
      const front = projected.at(-1);
      // The facet now closest to the viewer is the one we centered on.
      expect(front?.index).toBe(index);
    }
  });
});

describe("briolette palette", () => {
  it("paints the universe with a wide spread of valid colors", () => {
    const faces = buildBrioletteFaces();
    const palette = buildBriolettePalette(faces, null);

    expect(palette).toHaveLength(80);
    for (const hex of palette) {
      expect(hex).toMatch(HEX_PATTERN);
    }
    expect(new Set(palette).size).toBeGreaterThan(40);
  });

  it("keeps the anchor facet exactly on the selected color and spreads distinct neighbors", () => {
    const faces = buildBrioletteFaces();
    const palette = buildBriolettePalette(faces, {
      anchorFaceIndex: 12,
      anchorHex: "#7a9c8b",
      depth: 1,
    });

    expect(palette[12]).toBe("#7a9c8b");
    for (const hex of palette) {
      expect(hex).toMatch(HEX_PATTERN);
    }
    expect(new Set(palette).size).toBeGreaterThan(60);
  });

  it("tails off aggressively — near facets stay close, far facets diverge", () => {
    const faces = buildBrioletteFaces();
    const anchorIndex = 12;
    const anchorDir = faces[anchorIndex]?.center;
    const palette = buildBriolettePalette(faces, {
      anchorFaceIndex: anchorIndex,
      anchorHex: "#7a9c8b",
      depth: 1,
    });
    if (!anchorDir) {
      throw new Error("expected an anchor facet");
    }

    const distances = faces
      .filter((face) => face.index !== anchorIndex)
      .map((face) => ({
        angle: Math.acos(
          Math.max(
            -1,
            Math.min(
              1,
              face.center.x * anchorDir.x +
                face.center.y * anchorDir.y +
                face.center.z * anchorDir.z,
            ),
          ),
        ),
        delta: brioletteColorDistance("#7a9c8b", palette[face.index] ?? "#000000"),
      }));

    const near = distances.filter((d) => d.angle < 0.5).map((d) => d.delta);
    const far = distances.filter((d) => d.angle > 1.4).map((d) => d.delta);

    // Similarity tails off: near facets stay related, far facets clearly differ.
    expect(mean(near)).toBeLessThan(mean(far));
    expect(mean(far)).toBeGreaterThan(0.12);
  });

  it("never collapses to a single color, even at extremes and deep refinement", () => {
    const faces = buildBrioletteFaces();
    const anchorIndex = 41;
    const anchorDir = faces[anchorIndex]?.center;
    if (!anchorDir) {
      throw new Error("expected an anchor facet");
    }
    const frontVisible = faces.filter(
      (face) =>
        face.center.x * anchorDir.x + face.center.y * anchorDir.y + face.center.z * anchorDir.z >
        0.2,
    );

    // Saturated, neutral, and gamut-corner anchors are the worst cases for
    // clamping flattening the spread — white and yellow especially.
    for (const anchorHex of ["#af5399", "#ffffff", "#0a0a0a", "#808080", "#ffff00"]) {
      for (const depth of [1, 4, BRIOLETTE_MAX_DEPTH]) {
        const palette = buildBriolettePalette(faces, {
          anchorFaceIndex: anchorIndex,
          anchorHex,
          depth,
        });
        const distinct = new Set(frontVisible.map((face) => palette[face.index])).size;
        // Every visible facet must remain a distinct choice.
        expect(distinct).toBe(frontVisible.length);
      }
    }
  });

  it("blooms neutral anchors into tinted neighbors instead of a grey ramp", () => {
    const faces = buildBrioletteFaces();
    const anchorIndex = 41;
    const palette = buildBriolettePalette(faces, {
      anchorFaceIndex: anchorIndex,
      anchorHex: "#808080",
      depth: 1,
    });

    const chromas = palette
      .filter((_, index) => index !== anchorIndex)
      .map((hex) => {
        const lab = hexToOklab(hex);
        return lab ? Math.hypot(lab.a, lab.b) : 0;
      });

    // Rim facets of a grey anchor must gain real colorfulness.
    expect(Math.max(...chromas)).toBeGreaterThan(0.05);
  });

  it("keeps the far hemisphere smooth — no chaotic jumps near the antipode", () => {
    const faces = buildBrioletteFaces();
    const anchorIndex = 41;
    const anchorDir = faces[anchorIndex]?.center;
    if (!anchorDir) {
      throw new Error("expected an anchor facet");
    }
    const palette = buildBriolettePalette(faces, {
      anchorFaceIndex: anchorIndex,
      anchorHex: "#af5399",
      depth: 1,
    });

    const back = faces.filter(
      (face) =>
        face.center.x * anchorDir.x + face.center.y * anchorDir.y + face.center.z * anchorDir.z <
        -0.85,
    );
    const jumps: number[] = [];
    for (const a of back) {
      for (const b of back) {
        const closeness =
          a.center.x * b.center.x + a.center.y * b.center.y + a.center.z * b.center.z;
        if (a.index < b.index && closeness > 0.92) {
          jumps.push(brioletteColorDistance(palette[a.index] ?? "", palette[b.index] ?? ""));
        }
      }
    }

    // Geometrically adjacent facets near the antipode stay perceptually adjacent.
    expect(jumps.length).toBeGreaterThan(0);
    expect(Math.max(...jumps)).toBeLessThan(0.1);
  });

  it("tightens the neighborhood delta with depth but floors it", () => {
    expect(brioletteNeighborhoodDelta(1)).toBe(BRIOLETTE_NEIGHBORHOOD_DELTA);
    expect(brioletteNeighborhoodDelta(2)).toBeCloseTo(
      BRIOLETTE_NEIGHBORHOOD_DELTA * BRIOLETTE_DEPTH_FALLOFF,
      10,
    );
    expect(brioletteNeighborhoodDelta(1)).toBeGreaterThan(brioletteNeighborhoodDelta(3));
    expect(brioletteNeighborhoodDelta(BRIOLETTE_MAX_DEPTH)).toBe(BRIOLETTE_MIN_DELTA);
  });

  it("maps opposite poles to light and dark colors", () => {
    const light = brioletteUniverseColor({ x: 0, y: 1, z: 0 });
    const dark = brioletteUniverseColor({ x: 0, y: -1, z: 0 });

    expect(light).toMatch(HEX_PATTERN);
    expect(dark).toMatch(HEX_PATTERN);
    expect(light).not.toBe(dark);
  });
});

describe("BriolettePicker", () => {
  it("renders the labelled sphere stage and placeholder value", () => {
    render(<BriolettePicker aria-label="Accent color" onChange={() => {}} value={null} />);

    expect(screen.getByRole("application", { name: "Accent color" })).toBeInTheDocument();
    expect(screen.getByTestId("briolette-sphere")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("—");
  });

  it("selects a facet color and unsets when the same facet is clicked again", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    const { container, rerender } = render(<BriolettePicker onChange={onChange} value={null} />);

    const facet = container.querySelector<SVGPolygonElement>("polygon[data-face-index]");
    if (!facet) {
      throw new Error("expected a facet polygon");
    }
    const { faceIndex } = facet.dataset;
    fireEvent.click(facet);

    expect(onChange).toHaveBeenCalledTimes(1);
    const hex = onChange.mock.calls[0]?.[0] ?? null;
    expect(hex).toMatch(HEX_PATTERN);

    rerender(<BriolettePicker onChange={onChange} value={hex} />);
    const samefacet = container.querySelector(`polygon[data-face-index="${faceIndex}"]`);
    if (!samefacet) {
      throw new Error("expected the clicked facet to remain visible");
    }
    expect(samefacet).toHaveAttribute("data-selected");
    fireEvent.click(samefacet);

    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it("clears the selection with Escape", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    const { container, rerender } = render(<BriolettePicker onChange={onChange} value={null} />);

    const facet = container.querySelector("polygon[data-face-index]");
    if (!facet) {
      throw new Error("expected a facet polygon");
    }
    fireEvent.click(facet);
    const hex = onChange.mock.calls[0]?.[0] ?? null;
    rerender(<BriolettePicker onChange={onChange} value={hex} />);

    fireEvent.keyDown(screen.getByRole("application"), { key: "Escape" });

    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it("selects the front-most facet with Enter", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    render(<BriolettePicker onChange={onChange} value={null} />);

    fireEvent.keyDown(screen.getByRole("application"), { key: "Enter" });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]?.[0]).toMatch(HEX_PATTERN);
  });
});
