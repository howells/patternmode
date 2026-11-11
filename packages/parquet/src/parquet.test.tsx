// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Parquet } from "./index";
import type { ParquetTile } from "./parquet-types";

const palette: ParquetTile[] = [
  { color: "#c2703e", label: "Terracotta", value: 0.5 },
  { color: "#2d5a27", label: "Forest", value: 0.3 },
  { color: "#1b2a4a", label: "Navy", value: 0.2 },
];

const tiles = (container: HTMLElement): NodeListOf<Element> =>
  container.querySelectorAll(".patternmode-parquet__tile");

describe(Parquet, () => {
  afterEach(cleanup);

  it("renders one tile per positive-weight color", () => {
    const { container } = render(<Parquet colors={palette} disableMotion />);
    expect(tiles(container)).toHaveLength(3);
  });

  it("renders a fixed slot count, collapsing the extras", () => {
    const { container } = render(<Parquet colors={palette} disableMotion slotCount={5} />);
    expect(tiles(container)).toHaveLength(5);
    expect(
      container.querySelectorAll('.patternmode-parquet__tile[aria-hidden="true"]'),
    ).toHaveLength(2);
  });

  it("ignores zero and negative weights", () => {
    const { container } = render(
      <Parquet
        colors={[
          { color: "#c2703e", value: 1 },
          { color: "#000000", value: 0 },
          { color: "#ffffff", value: -2 },
        ]}
        disableMotion
      />,
    );
    expect(tiles(container)).toHaveLength(1);
  });

  it("shows built-in labels with name and rounded percentage", () => {
    render(<Parquet colors={palette} disableMotion showLabels />);
    expect(screen.getByText("Terracotta")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("makes each built-in label reachable by keyboard and named for screen readers", () => {
    render(
      <Parquet colors={[...palette, { color: "#e8b4b8", value: 0.25 }]} disableMotion showLabels />,
    );

    const terracotta = screen.getByRole("img", { name: "Terracotta, 40%" });
    expect(terracotta).toHaveAttribute("tabindex", "0");
    // An unlabelled tile is still named by its share.
    expect(screen.getByRole("img", { name: "20%" })).toHaveAttribute("tabindex", "0");
  });

  it("leaves tiles out of the tab order without built-in labels", () => {
    const { container } = render(
      <Parquet colors={palette} disableMotion renderTile={(tile) => <span>{tile.label}</span>} />,
    );
    expect(container.querySelector("[tabindex]")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("marks light tiles for contrast", () => {
    const { container } = render(
      <Parquet colors={[{ color: "#ffffff", value: 1 }]} disableMotion />,
    );
    expect(container.querySelector(".patternmode-parquet__tile")).toHaveAttribute("data-light");
  });

  it("does not mark dark tiles as light", () => {
    const { container } = render(
      <Parquet colors={[{ color: "#1b2a4a", value: 1 }]} disableMotion />,
    );
    expect(container.querySelector(".patternmode-parquet__tile")).not.toHaveAttribute("data-light");
  });

  it("renders unparseable colors as not light, and passes that to renderTile", () => {
    const seen: boolean[] = [];
    const { container } = render(
      <Parquet
        colors={[
          { color: "var(--paper)", value: 3 },
          { color: "color-mix(in oklab, white 90%, black)", value: 2 },
          { color: "gold", value: 1 },
        ]}
        disableMotion
        renderTile={(_tile, meta) => {
          seen.push(meta.isLight);
          return null;
        }}
      />,
    );
    for (const tile of container.querySelectorAll(".patternmode-parquet__tile")) {
      expect(tile).not.toHaveAttribute("data-light");
    }
    expect(seen).toStrictEqual([false, false, false]);
  });

  it("lets a tile's isLight decide its tone", () => {
    const { container } = render(
      <Parquet
        colors={[
          { color: "var(--paper)", isLight: true, value: 2 },
          { color: "#ffffff", isLight: false, value: 1 },
        ]}
        disableMotion
      />,
    );
    const [paper, white] = container.querySelectorAll(".patternmode-parquet__tile");
    expect(paper).toHaveAttribute("data-light");
    expect(white).not.toHaveAttribute("data-light");
  });

  it("reads alpha hex colors by their channels", () => {
    const { container } = render(
      <Parquet colors={[{ color: "#ffffff80", value: 1 }]} disableMotion />,
    );
    expect(container.querySelector(".patternmode-parquet__tile")).toHaveAttribute("data-light");
  });

  it("renders a custom tile via renderTile", () => {
    render(
      <Parquet
        colors={palette}
        disableMotion
        renderTile={(tile, meta) => <span>{`${tile.label}:${Math.round(meta.percent)}`}</span>}
      />,
    );
    expect(screen.getByText("Terracotta:50")).toBeInTheDocument();
  });
});
