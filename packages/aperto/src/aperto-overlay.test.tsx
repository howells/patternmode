// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Aperto } from "./index";
import type { ApertoMediaItem } from "./index";

const media: ApertoMediaItem = {
  alt: "A mountain at sunrise",
  src: "/large.jpg",
  title: "Morning ridge",
  type: "image",
};

describe("ApertoOverlay", () => {
  afterEach(() => {
    cleanup();
  });

  it("does not intercept page clicks while it fades out after close", async () => {
    const user = userEvent.setup();
    render(<Aperto media={media} />);
    await user.click(screen.getByRole("button", { name: "Open Morning ridge" }));
    expect(document.querySelector('[data-slot="aperto-overlay"]')).not.toHaveStyle({
      pointerEvents: "none",
    });

    await user.keyboard("{Escape}");

    // Real Motion holds the exiting overlay in the DOM for its fade.
    expect(document.querySelector('[data-slot="aperto-overlay"]')).toHaveStyle({
      pointerEvents: "none",
    });
  });
});
