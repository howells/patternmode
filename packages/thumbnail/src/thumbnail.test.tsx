// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { Thumbnail } from "./index";

afterEach(cleanup);

/*
 * Read from `import.meta.dirname` rather than from `new URL(…, import.meta.url)`.
 * Under the jsdom environment `import.meta.url` is an `http://localhost` URL, not
 * a `file:` one, so the URL form throws before a single test runs.
 */
const styles = readFileSync(path.join(import.meta.dirname, "styles.css"), "utf-8");

/*
 * jsdom applies no stylesheet, so the visual half of the contract cannot be
 * asserted by rendering. It is asserted against the sheet itself instead — the
 * three rules below are the ones whose loss is invisible in a code review and
 * obvious on a screen, and every one of them has a specific failure it prevents.
 */
describe("the frame's edge", () => {
  it("is painted by an overlay, not by an inset shadow on the frame", () => {
    /*
     * The bug this forbids: `box-shadow: inset` on the frame is painted behind
     * its children, so an image that fills the box hides the edge completely.
     * It looks correct in a skeleton state — which is exactly when it gets
     * reviewed — and disappears the moment a real photograph loads.
     */
    expect(styles).toMatch(
      /\.patternmode-thumbnail::after\s*\{[^}]*box-shadow:\s*inset 0 0 0 1px var\(--patternmode-thumbnail-frame\)/u,
    );
    expect(styles).toMatch(/\.patternmode-thumbnail::after\s*\{[^}]*position:\s*absolute/u);
  });

  it("is translucent rather than a solid colour", () => {
    // A solid edge disappears against a dark photograph and cuts a hard line
    // across a pale one. Proportional darkening is what makes one value work
    // across a grid of unrelated pictures.
    expect(styles).toMatch(/--patternmode-thumbnail-frame:\s*rgb\(0 0 0 \/ 0\.\d+\)/u);
  });

  it("inverts to a highlight in the dark", () => {
    // On a dark surface the thing that reads as a shadow inside an opening is a
    // light edge. Black-on-dark is invisible, which is what a single fixed
    // value would ship.
    expect(styles).toMatch(
      /@media \(prefers-color-scheme: dark\)[\s\S]*--patternmode-thumbnail-frame:\s*rgb\(255 255 255 \/ 0\.\d+\)/u,
    );
  });

  it("clips, so the radius reaches the media", () => {
    // A `border-radius` on the frame does nothing to a child `<img>` unless the
    // frame clips. Without this the corners are square and only the hairline
    // curves.
    expect(styles).toMatch(/\.patternmode-thumbnail\s*\{[^}]*overflow:\s*hidden/u);
  });
});

describe("Thumbnail", () => {
  it("renders an image from src, with the alt it was given", () => {
    render(<Thumbnail alt="A green velvet chair" src="/thumb.jpg" />);
    expect(screen.getByRole("img", { name: "A green velvet chair" })).toHaveAttribute(
      "src",
      "/thumb.jpg",
    );
  });

  it("defaults alt to empty, so a row that already names the thing does not say it twice", () => {
    const { container } = render(<Thumbnail src="/thumb.jpg" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("renders the media it is given instead of an img of its own", () => {
    render(
      <Thumbnail src="/ignored.jpg">
        <canvas aria-label="A rendered swatch" data-testid="own-media" />
      </Thumbnail>,
    );
    expect(screen.getByTestId("own-media")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders nothing inside when given neither src nor children", () => {
    // An empty frame is a legitimate state — a row whose subject has no
    // photograph — and it must not draw a broken image icon to say so.
    const { container } = render(<Thumbnail />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("marks itself sized, and unsized when sizing is handed back", () => {
    const { container, rerender } = render(<Thumbnail src="/a.jpg" />);
    const frame = () => container.querySelector('[data-slot="thumbnail"]');
    expect(frame()).toHaveAttribute("data-sized", "true");

    rerender(<Thumbnail size={null} src="/a.jpg" />);
    expect(frame()).toHaveAttribute("data-sized", "false");
  });

  it("carries its knobs as custom properties rather than as inline geometry", () => {
    /*
     * An inline `width` or `box-shadow` beats every rule in every layer, so a
     * consumer could not retune it from a stylesheet at all. Custom properties
     * keep the override path open.
     */
    const { container } = render(<Thumbnail fit="contain" radius={6} size={48} src="/a.jpg" />);
    const frame = container.querySelector<HTMLElement>('[data-slot="thumbnail"]');
    expect(frame?.style.getPropertyValue("--patternmode-thumbnail-size")).toBe("48px");
    expect(frame?.style.getPropertyValue("--patternmode-thumbnail-radius")).toBe("6px");
    expect(frame?.style.getPropertyValue("--patternmode-thumbnail-fit")).toBe("contain");
    expect(frame?.style.width).toBe("");
  });

  it("lifts only when asked", () => {
    const { container, rerender } = render(<Thumbnail src="/a.jpg" />);
    const frame = () => container.querySelector('[data-slot="thumbnail"]');
    expect(frame()).not.toHaveAttribute("data-raised");

    rerender(<Thumbnail raised src="/a.jpg" />);
    expect(frame()).toHaveAttribute("data-raised", "true");
  });
});
