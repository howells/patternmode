// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Swatch } from "./index";

afterEach(() => {
  cleanup();
});

describe("Swatch transparency backdrop", () => {
  it("renders no backdrop unless one is asked for", () => {
    const { container } = render(<Swatch aria-label="Opaque" color="rgb(49 92 75 / 40%)" />);

    /* Deliberately NOT inferred from the value. Alpha cannot be detected across
       gradients, `color-mix()`, CSS variables or child media, so a component
       that guessed would be right sometimes and silently wrong the rest. */
    expect(container.querySelector(".patternmode-swatch__backdrop")).toBeNull();
    expect(screen.getByLabelText("Opaque")).not.toHaveAttribute("data-transparency-backdrop");
  });

  it("puts the backdrop behind the fill so alpha composites over it", () => {
    const { container } = render(
      <Swatch aria-label="Translucent" color="rgb(49 92 75 / 40%)" transparencyBackdrop />,
    );

    expect(screen.getByLabelText("Translucent")).toHaveAttribute(
      "data-transparency-backdrop",
      "true",
    );

    const backdrop = container.querySelector(".patternmode-swatch__backdrop");
    const fill = container.querySelector(".patternmode-swatch__fill");
    if (!backdrop || !fill) {
      throw new Error("expected both the backdrop and the fill layers");
    }

    /* Order is the whole feature: behind the fill, the backdrop shows through a
       translucent value; in front of it, it would hide the colour entirely.
       jsdom applies no stylesheet, so DOM order is what is assertable here —
       that the chequers are actually visible through a 40% fill was confirmed
       in a browser. */
    expect(backdrop.compareDocumentPosition(fill)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
