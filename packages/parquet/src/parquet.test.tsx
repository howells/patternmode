// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Parquet } from "./index";
import type { ParquetTile } from "./parquet-types";

afterEach(cleanup);

const palette: ParquetTile[] = [
  { color: "#c2703e", label: "Terracotta", value: 0.5 },
  { color: "#2d5a27", label: "Forest", value: 0.3 },
  { color: "#1b2a4a", label: "Navy", value: 0.2 },
];

const tiles = (container: HTMLElement): NodeListOf<Element> =>
  container.querySelectorAll(".patternmode-parquet__tile");

describe("Parquet", () => {
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
