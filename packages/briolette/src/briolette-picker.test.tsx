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
  BRIOLETTE_TRAVEL_ANGLE,
  brioletteColorDistance,
  brioletteNeighborhoodDelta,
  brioletteUniverseColor,
  nextBrioletteDepth,
} from "./briolette-colors";
import {
  buildBrioletteFaces,
  mapBrioletteParents,
  morphBrioletteFaces,
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
  it("builds an 80-facet geodesic with unit centroids by default", () => {
    const faces = buildBrioletteFaces();

    expect(faces).toHaveLength(80);
    for (const face of faces) {
      expect(Math.hypot(face.center.x, face.center.y, face.center.z)).toBeCloseTo(1, 6);
    }
  });

  it("builds every density with the expected facet count and unit centroids", () => {
    for (const [frequency, count] of [
      [1, 20],
      [2, 80],
      [3, 180],
      [4, 320],
    ] as const) {
      const faces = buildBrioletteFaces(frequency);
      expect(faces).toHaveLength(count);
      for (const face of faces) {
        expect(Math.hypot(face.center.x, face.center.y, face.center.z)).toBeCloseTo(1, 6);
        expect(face.vertices).toHaveLength(3);
      }
      // Indices stay dense and ordered for palette parity and view anchoring.
      expect(faces.map((face) => face.index)).toEqual(faces.map((_, i) => i));
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

  it("maps finer facets onto nesting parents and morphs between them on-sphere", () => {
    const coarse = buildBrioletteFaces(1);
    const fine = buildBrioletteFaces(2);
    const parents = mapBrioletteParents(fine, coarse);

    expect(parents).toHaveLength(fine.length);
    // Frequency 1→2 nests perfectly: every coarse facet owns exactly 4 children.
    const childCounts = new Map<number, number>();
    for (const parent of parents) {
      expect(parent).toBeGreaterThanOrEqual(0);
      expect(parent).toBeLessThan(coarse.length);
      childCounts.set(parent, (childCounts.get(parent) ?? 0) + 1);
    }
    expect([...childCounts.values()].every((count) => count === 4)).toBe(true);

    const centers = parents.map((p) => coarse[p]?.center ?? { x: 0, y: 0, z: 1 });
    const collapsed = morphBrioletteFaces(fine, centers, 0);
    const expanded = morphBrioletteFaces(fine, centers, 1);
    for (const [i, face] of collapsed.entries()) {
      // At growth 0 every vertex sits at the parent centroid, still on-sphere.
      const origin = centers[i] ?? { x: 0, y: 0, z: 1 };
      for (const vertex of face.vertices) {
        expect(Math.hypot(vertex.x, vertex.y, vertex.z)).toBeCloseTo(1, 6);
        expect(
          Math.hypot(vertex.x - origin.x, vertex.y - origin.y, vertex.z - origin.z),
        ).toBeLessThan(0.000_001);
      }
    }
    expect(expanded[0]?.vertices).toEqual(fine[0]?.vertices);
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

  it("renders more facets as density rises", () => {
    const counts: Record<string, number> = {};
    for (const density of ["coarse", "base", "fine"] as const) {
      const { container, unmount } = render(
        <BriolettePicker density={density} onChange={() => {}} value={null} />,
      );
      counts[density] = container.querySelectorAll("polygon[data-face-index]").length;
      unmount();
    }

    expect(counts.coarse).toBeGreaterThan(0);
    expect(counts.base).toBeGreaterThan(counts.coarse ?? 0);
    expect(counts.fine).toBeGreaterThan(counts.base ?? 0);
  });

  it("exposes seam controls as CSS variables on the root", () => {
    const { container } = render(
      <BriolettePicker onChange={() => {}} seamColor="#1d1d1b" seamOpacity={0.4} value={null} />,
    );

    const root = container.querySelector<HTMLDivElement>("[data-slot='briolette-picker']");
    if (!root) {
      throw new Error("expected the picker root");
    }
    expect(root.style.getPropertyValue("--patternmode-briolette-seam-opacity")).toBe("0.4");
    expect(root.style.getPropertyValue("--patternmode-briolette-seam")).toBe("#1d1d1b");
    expect(root.style.getPropertyValue("--patternmode-briolette-seam-width")).toBe("1.25");
  });

  it("clamps seam opacity into 0..1 and keeps facets stroke-blendable", () => {
    const { container } = render(
      <BriolettePicker onChange={() => {}} seamOpacity={4} value={null} />,
    );

    const root = container.querySelector<HTMLDivElement>("[data-slot='briolette-picker']");
    expect(root?.style.getPropertyValue("--patternmode-briolette-seam-opacity")).toBe("1");
    const facet = container.querySelector<SVGPolygonElement>("polygon[data-face-index]");
    expect(facet?.style.getPropertyValue("--patternmode-briolette-facet")).toMatch(HEX_PATTERN);
  });

  it("drops a stale selection pin when density changes mid-selection", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    const { container, rerender } = render(
      <BriolettePicker density="base" onChange={onChange} value={null} />,
    );

    const facet = container.querySelector<SVGPolygonElement>("polygon[data-face-index]");
    if (!facet) {
      throw new Error("expected a facet polygon");
    }
    fireEvent.click(facet);
    const hex = onChange.mock.calls[0]?.[0] ?? null;

    rerender(<BriolettePicker density="fine" onChange={onChange} value={hex} />);

    // The value survives, but no facet claims the pin on the new geometry.
    expect(container.querySelector("polygon[data-selected]")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(hex ?? "");
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

  it("only starts a drag session for the primary button", () => {
    render(<BriolettePicker onChange={() => {}} value={null} />);
    const sphere = screen.getByTestId("briolette-sphere");

    // A right-click must not begin a rotation the context menu never ends.
    fireEvent.pointerDown(sphere, { button: 2, buttons: 2, clientX: 10, clientY: 10 });
    expect(sphere).not.toHaveAttribute("data-dragging");

    fireEvent.pointerDown(sphere, { button: 0, buttons: 1, clientX: 10, clientY: 10 });
    expect(sphere).toHaveAttribute("data-dragging");
  });

  it("ends the drag session when a move arrives with no button held", () => {
    render(<BriolettePicker onChange={() => {}} value={null} />);
    const sphere = screen.getByTestId("briolette-sphere");

    fireEvent.pointerDown(sphere, { button: 0, buttons: 1, clientX: 10, clientY: 10 });
    expect(sphere).toHaveAttribute("data-dragging");

    // A missed pointerup must not leave the sphere rotating on hover.
    fireEvent.pointerMove(sphere, { buttons: 0, clientX: 40, clientY: 40 });
    expect(sphere).not.toHaveAttribute("data-dragging");
  });

  it("focuses the keyboard surface on pointerdown", () => {
    render(<BriolettePicker onChange={() => {}} value={null} />);
    const stage = screen.getByRole("application");

    fireEvent.pointerDown(screen.getByTestId("briolette-sphere"), {
      button: 0,
      buttons: 1,
      clientX: 10,
      clientY: 10,
    });

    // preventDefault on pointerdown suppresses native click-to-focus, so the
    // picker focuses the stage itself — arrow keys work right after a click.
    expect(stage).toHaveFocus();
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

  it("consumes Escape only while a selection exists", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    const onHostKeyDown = vi.fn<() => void>();
    const { container, rerender } = render(
      // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- stands in for a host dialog listening for Escape.
      <div onKeyDown={onHostKeyDown}>
        <BriolettePicker onChange={onChange} value={null} />
      </div>,
    );

    // No selection: Escape passes through to the host (e.g. closes a dialog).
    fireEvent.keyDown(screen.getByRole("application"), { key: "Escape" });
    expect(onHostKeyDown).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();

    const facet = container.querySelector("polygon[data-face-index]");
    if (!facet) {
      throw new Error("expected a facet polygon");
    }
    fireEvent.click(facet);
    const hex = onChange.mock.calls[0]?.[0] ?? null;
    rerender(
      // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- stands in for a host dialog listening for Escape.
      <div onKeyDown={onHostKeyDown}>
        <BriolettePicker onChange={onChange} value={hex} />
      </div>,
    );

    // With a selection: Escape clears it and stops there — one press must not
    // clear the color *and* close a containing dialog.
    fireEvent.keyDown(screen.getByRole("application"), { key: "Escape" });
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(onHostKeyDown).toHaveBeenCalledTimes(1);
  });

  it("re-anchors around an externally supplied value", () => {
    // Reduced motion makes the centering glide snap, so the anchored facet
    // is front-facing synchronously.
    vi.stubGlobal("matchMedia", (query: string) => ({
      addEventListener: () => {},
      matches: true,
      media: query,
      removeEventListener: () => {},
    }));
    const onChange = vi.fn<(value: string | null) => void>();
    const { container, rerender } = render(<BriolettePicker onChange={onChange} value={null} />);

    rerender(<BriolettePicker onChange={onChange} value="#7a9c8b" />);

    const anchored = container.querySelector("polygon[data-selected]");
    if (!anchored) {
      throw new Error("expected the external value to anchor a facet");
    }
    // The anchored facet carries the supplied hex exactly; no onChange echo.
    expect(anchored.getAttribute("fill")).toBe("#7a9c8b");
    expect(container.querySelector(".patternmode-briolette__pin")).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("refines near the anchor, travels far from it, and respects maxDepth", () => {
    // First selection always opens at depth 1.
    expect(nextBrioletteDepth(null, 0.2)).toBe(1);
    expect(nextBrioletteDepth(null, Math.PI)).toBe(1);
    // Near clicks refine one level deeper, capped at the sphere's maximum.
    expect(nextBrioletteDepth(1, 0.4)).toBe(2);
    expect(nextBrioletteDepth(6, 0.4)).toBe(6);
    // Far clicks travel — a fresh depth-1 neighborhood, never a tighter one.
    expect(nextBrioletteDepth(4, BRIOLETTE_TRAVEL_ANGLE)).toBe(1);
    expect(nextBrioletteDepth(4, Math.PI / 2)).toBe(1);
    // Hosts can cap refinement shallower; the cap is clamped to sane bounds.
    expect(nextBrioletteDepth(2, 0.4, 2)).toBe(2);
    expect(nextBrioletteDepth(1, 0.4, 99)).toBe(2);
    expect(nextBrioletteDepth(1, 0.4, 0)).toBe(1);
  });

  it("anchors a value already present at mount", () => {
    // The URL-restore case: the picker mounts with a controlled value and
    // must pin it like any external change, not absorb it as the baseline.
    vi.stubGlobal("matchMedia", (query: string) => ({
      addEventListener: () => {},
      matches: true,
      media: query,
      removeEventListener: () => {},
    }));
    const onChange = vi.fn<(value: string | null) => void>();
    const { container } = render(<BriolettePicker onChange={onChange} value="#8d4220" />);

    const anchored = container.querySelector("polygon[data-selected]");
    if (!anchored) {
      throw new Error("expected the mount-time value to anchor a facet");
    }
    expect(anchored.getAttribute("fill")).toBe("#8d4220");
    expect(container.querySelector(".patternmode-briolette__pin")).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("selects the front-most facet with Enter", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    render(<BriolettePicker onChange={onChange} value={null} />);

    fireEvent.keyDown(screen.getByRole("application"), { key: "Enter" });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]?.[0]).toMatch(HEX_PATTERN);
  });
});
