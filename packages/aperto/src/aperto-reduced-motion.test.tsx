// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Aperto } from "./index";
import type { ApertoMediaItem } from "./index";

const MEDIA: ApertoMediaItem[] = [
  {
    alt: "Ceramic vessels on linen",
    src: "/first-large.jpg",
    title: "Studio table",
    type: "image",
  },
];

const getClone = () => document.querySelector('[data-slot="aperto-transition-media"]');

/*
 * Real Motion, no test double. Motion reads `prefers-reduced-motion` once
 * (`matches` and `addEventListener` only), so this file stubs it before
 * anything renders. Thumbnail and Expanded Media get different rects so the
 * clone has somewhere to fly.
 */
describe("Aperto under reduced motion", () => {
  beforeAll(() => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      addEventListener: () => {},
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      removeEventListener: () => {},
    }));
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function measure(this: Element) {
        return this instanceof HTMLElement && this.dataset.slot === "aperto-media"
          ? new DOMRect(200, 100, 600, 400)
          : new DOMRect(10, 10, 80, 80);
      },
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("finishes the opening flight", async () => {
    const user = userEvent.setup();
    render(
      <Aperto.Group media={MEDIA} motion="bouncy">
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    await waitFor(() => {
      expect(getClone()).not.toBeInTheDocument();
    });
    expect(screen.getByRole("dialog", { name: "Studio table" })).not.toHaveAttribute(
      "data-aperto-transition",
    );
  });

  it("finishes the closing flight and returns focus to the Thumbnail", async () => {
    const user = userEvent.setup();
    render(
      <Aperto.Group media={MEDIA} motion="bouncy">
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );
    const opener = screen.getByRole("button", { name: "Open Studio table" });
    await user.click(opener);
    await waitFor(() => {
      expect(getClone()).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(document.querySelector("[data-aperto-transition]")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(opener).toHaveFocus();
    });
  });
});
